"""
AXET-NEURALGRAPH-3D - Native Windows Services Supervisor
Orquestra Qdrant, aXet Gateway e Backend FastAPI nativamente sem virtualização.
"""
import atexit
import os
import signal
import subprocess
import sys
import time
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]

# Localização flexível do Qdrant (desenvolvimento ou runtime embutido)
if (ROOT_DIR / "qdrant" / "qdrant.exe").exists():
    BIN_QDRANT = ROOT_DIR / "qdrant" / "qdrant.exe"
    QDRANT_CONFIG = ROOT_DIR / "qdrant" / "config" / "config.yaml"
else:
    BIN_QDRANT = ROOT_DIR / "bin" / "qdrant" / "qdrant.exe"
    QDRANT_CONFIG = ROOT_DIR / "bin" / "qdrant" / "config" / "config.yaml"

GATEWAY_SCRIPT = ROOT_DIR / "gateway" / "local_ai_gateway.py"
BACKEND_DIR = ROOT_DIR / "backend"

CHILD_PROCESSES = []


def cleanup():
    """Encerra todos os processos filhos de forma limpa."""
    for p in CHILD_PROCESSES:
        if p.poll() is None:
            try:
                p.terminate()
            except Exception:
                pass
    time.sleep(0.5)
    for p in CHILD_PROCESSES:
        if p.poll() is None:
            try:
                p.kill()
            except Exception:
                pass


atexit.register(cleanup)


def signal_handler(sig, frame):
    print("\n[INFO] Encerrando serviços nativos AXET...")
    cleanup()
    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


def is_port_open(port: int, host: str = "127.0.0.1") -> bool:
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex((host, port)) == 0


def main():
    print("=" * 79)
    print("  [NTT DATA] - AXET-NEURALGRAPH-3D (Modo Nativo Bare-Metal)")
    print("  Orquestrando Qdrant (:6333), aXet Gateway (:8766) e Backend (:8000)")
    print("=" * 79)
    print()

    # 1. Qdrant
    if is_port_open(6333):
        print("[1/3] Qdrant já ativo na porta 6333.")
    else:
        print("[1/3] Iniciando Qdrant Vector DB nativo na porta 6333...")
        qdrant_cmd = [str(BIN_QDRANT)]
        if QDRANT_CONFIG.exists():
            qdrant_cmd.extend(["--config-path", str(QDRANT_CONFIG)])
        p_qdrant = subprocess.Popen(
            qdrant_cmd,
            cwd=str(ROOT_DIR),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        CHILD_PROCESSES.append(p_qdrant)

    # Prepara ambiente para Python
    env = os.environ.copy()
    py_paths = [
        str(BACKEND_DIR),
        str(ROOT_DIR / "python" / "Lib" / "site-packages"),
        str(ROOT_DIR / "packages"),
    ]
    if "PYTHONPATH" in env:
        py_paths.append(env["PYTHONPATH"])
    env["PYTHONPATH"] = ";".join(py_paths)
    env["POSTGRES_HOST"] = "sqlite"
    env["ENVIRONMENT"] = "local"

    # 2. Gateway
    if is_port_open(8766):
        print("[2/3] aXet AI Gateway já ativo na porta 8766.")
    else:
        print("[2/3] Iniciando aXet AI Gateway na porta 8766...")
        p_gateway = subprocess.Popen(
            [sys.executable, str(GATEWAY_SCRIPT)],
            cwd=str(ROOT_DIR),
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        CHILD_PROCESSES.append(p_gateway)

    # 3. Backend FastAPI
    if is_port_open(8000):
        print("[3/3] Backend FastAPI já ativo na porta 8000.")
    else:
        print("[3/3] Iniciando Backend FastAPI cognitivo na porta 8000...")
        p_backend = subprocess.Popen(
            [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"],
            cwd=str(BACKEND_DIR),
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        CHILD_PROCESSES.append(p_backend)

    # 4. Aguardar porta 8000
    print("\nAguardando inicialização do backend na porta 8000...")
    ready = False
    for _ in range(30):
        time.sleep(0.6)
        if is_port_open(8000):
            ready = True
            break

    if not ready:
        print("[ERRO] Tempo limite atingido para a porta 8000.")
        sys.exit(1)

    print()
    print("=" * 79)
    print("  [OK] AXET-NEURALGRAPH-3D NATIVO PRONTO E CONECTADO!")
    print("  Backend: http://localhost:8000/")
    print("  Gateway: http://localhost:8766/")
    print("  Qdrant:  http://localhost:6333/dashboard")
    print("=" * 79)
    print()
    print("[STATUS] Os serviços estão ativos. O aplicativo Desktop já pode ser usado.")
    print("Pressione Ctrl+C para encerrar todos os serviços a qualquer momento.")
    print()

    # Loop de supervisão
    try:
        while True:
            time.sleep(1)
            # Se algum processo filho morreu inesperadamente
            for p in list(CHILD_PROCESSES):
                if p.poll() is not None:
                    print(f"[AVISO] Processo PID {p.pid} foi encerrado.")
                    CHILD_PROCESSES.remove(p)
    except KeyboardInterrupt:
        print("\nEncerrando serviços...")
    finally:
        cleanup()


if __name__ == "__main__":
    main()
