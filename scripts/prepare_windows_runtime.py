"""
AXET-NEURALGRAPH-3D - Preparador de Runtime Embutido para Instalador MSI (Windows)
Prepara o arquivo src-tauri/resources/axet-runtime.zip com Python 3.11 Embeddable,
Qdrant nativo, dependências pip (com PyTorch CPU otimizado), Backend, Gateway e Supervisor.
"""
import io
import os
import shutil
import subprocess
import sys
import urllib.request
import zipfile
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
SRC_TAURI_DIR = ROOT_DIR / "src-tauri"
RESOURCES_DIR = SRC_TAURI_DIR / "resources"
STAGE_DIR = RESOURCES_DIR / "staging_runtime"
OUTPUT_ZIP = RESOURCES_DIR / "axet-runtime.zip"

PYTHON_EMBED_URL = "https://www.python.org/ftp/python/3.11.9/python-3.11.9-embed-amd64.zip"
QDRANT_RELEASE_URL = "https://github.com/qdrant/qdrant/releases/download/v1.19.1/qdrant-x86_64-pc-windows-msvc.zip"


def log(msg: str):
    print(f"[MSI-RUNTIME] {msg}", flush=True)


def prepare_python():
    py_dir = STAGE_DIR / "python"
    py_exe = py_dir / "python.exe"
    site_packages_target = py_dir / "Lib" / "site-packages"

    if not py_exe.exists():
        py_dir.mkdir(parents=True, exist_ok=True)
        log(f"Baixando Python 3.11 Embeddable de {PYTHON_EMBED_URL}...")
        zip_bytes = urllib.request.urlopen(PYTHON_EMBED_URL, timeout=60).read()
        with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
            zf.extractall(py_dir)

    # Configuração de isolamento e caminhos do Python Embed (python311._pth)
    pth_file = py_dir / "python311._pth"
    if pth_file.exists():
        content = pth_file.read_text(encoding="utf-8")
        lines = content.splitlines()
        new_lines = []
        for line in lines:
            if line.strip() == "#import site":
                new_lines.append("import site")
            else:
                new_lines.append(line)
        for req_path in ["Lib/site-packages", ".", "../backend", "../packages"]:
            if req_path not in new_lines:
                new_lines.append(req_path)
        pth_file.write_text("\n".join(new_lines) + "\n", encoding="utf-8")
        log("python311._pth configurado com 'import site' e caminhos de pacotes.")

    site_packages_target.mkdir(parents=True, exist_ok=True)

    # 1. Se houver ambiente virtual local (.venv_windows), copia diretamente
    venv_site_packages = ROOT_DIR / ".venv_windows" / "Lib" / "site-packages"
    if venv_site_packages.exists() and (venv_site_packages / "fastapi").exists():
        log(f"Copiando dependências de {venv_site_packages}...")
        for item in venv_site_packages.iterdir():
            target_item = site_packages_target / item.name
            if target_item.exists():
                continue
            if item.is_dir():
                shutil.copytree(item, target_item, dirs_exist_ok=True)
            else:
                shutil.copy2(item, target_item)
        log("Dependências copiadas da venv local.")
    else:
        # 2. Em ambiente CI (GitHub Actions) ou instalação limpa, instala via pip com PyTorch CPU
        log("Instalando dependências via pip com índice PyTorch CPU otimizado...")
        req_file = ROOT_DIR / "backend" / "requirements.txt"
        cmd = [
            sys.executable,
            "-m",
            "pip",
            "install",
            "--no-cache-dir",
            "--target",
            str(site_packages_target),
            "-r",
            str(req_file),
            "aiosqlite",
            "--extra-index-url",
            "https://download.pytorch.org/whl/cpu",
        ]
        res = subprocess.run(cmd)
        if res.returncode != 0:
            log("AVISO: Falha na instalação de alguns pacotes opcionais; continuando...")


def prepare_qdrant():
    qdrant_dir = STAGE_DIR / "qdrant"
    qdrant_dir.mkdir(parents=True, exist_ok=True)
    local_bin = ROOT_DIR / "bin" / "qdrant"

    if (local_bin / "qdrant.exe").exists():
        log("Copiando qdrant.exe e DLLs locais...")
        for file in local_bin.iterdir():
            if file.is_file():
                shutil.copy2(file, qdrant_dir / file.name)
    else:
        log(f"Baixando Qdrant de {QDRANT_RELEASE_URL}...")
        zip_bytes = urllib.request.urlopen(QDRANT_RELEASE_URL, timeout=60).read()
        with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
            zf.extractall(qdrant_dir)

    # Configuração padrão do Qdrant
    config_dir = qdrant_dir / "config"
    config_dir.mkdir(parents=True, exist_ok=True)
    config_file = config_dir / "config.yaml"
    config_content = """storage:
  storage_path: ./storage
  snapshots_path: ./snapshots

service:
  host: 127.0.0.1
  http_port: 6333
  grpc_port: 6334

telemetry_disabled: true
"""
    config_file.write_text(config_content, encoding="utf-8")
    log("Qdrant configurado com sucesso!")


def prepare_application_code():
    log("Copiando código do Backend, Gateway e Supervisor...")
    # Backend
    dest_backend = STAGE_DIR / "backend"
    dest_backend.mkdir(parents=True, exist_ok=True)
    shutil.copytree(ROOT_DIR / "backend" / "app", dest_backend / "app", dirs_exist_ok=True)

    # Gateway
    dest_gateway = STAGE_DIR / "gateway"
    dest_gateway.mkdir(parents=True, exist_ok=True)
    for f in (ROOT_DIR / "gateway").iterdir():
        if f.is_file() and f.suffix in (".py", ".toml", ".json", ".example"):
            shutil.copy2(f, dest_gateway / f.name)

    # Supervisor
    dest_scripts = STAGE_DIR / "scripts"
    dest_scripts.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT_DIR / "scripts" / "supervisor_windows.py", dest_scripts / "supervisor_windows.py")

    # .env padrão para ambiente local e bare-metal
    env_content = """SOURCES_ROOT=./data/sources
SOURCES_ROOT_HOST_PATH=./data/sources
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_COLLECTION=rag_documents
POSTGRES_HOST=sqlite
POSTGRES_PORT=5432
POSTGRES_DB=rag_local_reef
POSTGRES_USER=rag_user
POSTGRES_PASSWORD=changeme
EMBEDDING_MODE=local
EMBEDDING_MODEL_LOCAL=BAAI/bge-m3
LLM_PROVIDER=openai
LLM_GATEWAY_URL=http://localhost:8766/codex
LLM_GATEWAY_API_KEY=axet-local-adapter
LLM_MODEL=gpt-5.6-terra-high
GATEWAY_HOST_URL=http://localhost:8766
JWT_SECRET=nttdata-axet-neuralgraph-local-secret-key-2026
JWT_ACCESS_TOKEN_TTL_MINUTES=1440
JWT_REFRESH_TOKEN_TTL_DAYS=7
BOOTSTRAP_ADMIN_EMAIL=gcostabe@emeal.nttdata.com
ENVIRONMENT=local
CORS_ALLOWED_ORIGINS=http://localhost:3001,http://127.0.0.1:3001,http://localhost:3000,http://127.0.0.1:3000,tauri://localhost,http://tauri.localhost,https://tauri.localhost
"""
    (STAGE_DIR / ".env").write_text(env_content, encoding="utf-8")
    log("Código e configurações copiados com sucesso!")


def create_archive():
    log(f"Compactando runtime embutido em {OUTPUT_ZIP}...")
    if OUTPUT_ZIP.exists():
        OUTPUT_ZIP.unlink()

    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for root, dirs, files in os.walk(STAGE_DIR):
            for file in files:
                full_path = Path(root) / file
                rel_path = full_path.relative_to(STAGE_DIR)
                zf.write(full_path, arcname=str(rel_path))

    size_mb = OUTPUT_ZIP.stat().st_size / (1024 * 1024)
    log(f"Arquivo axet-runtime.zip criado com sucesso! Tamanho: {size_mb:.2f} MB")

    # Limpeza da pasta de staging para manter o repositório enxuto
    log("Limpando pasta de staging temporária...")
    shutil.rmtree(STAGE_DIR, ignore_errors=True)

    # Garante que o README do resources existe
    readme = RESOURCES_DIR / "README.txt"
    if not readme.exists():
        readme.write_text("# AXET Embedded Resources\n", encoding="utf-8")


def main():
    log("Iniciando preparação do runtime embutido para o instalador MSI (Zero-Touch)...")
    RESOURCES_DIR.mkdir(parents=True, exist_ok=True)
    prepare_python()
    prepare_qdrant()
    prepare_application_code()
    create_archive()
    log("CONCLUÍDO: O pacote axet-runtime.zip está pronto para ser empacotado no MSI pelo WiX Toolset!")


if __name__ == "__main__":
    main()
