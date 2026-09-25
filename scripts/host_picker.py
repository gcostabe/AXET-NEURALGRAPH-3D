#!/usr/bin/env python3
"""Serviço bridge local no macOS para abrir a janela nativa do Finder (choose folder)
e retornar o caminho selecionado para o painel administrativo web, sem uploads.
"""

import json
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

PORT = 8765


class PickerHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    def do_POST(self):
        if self.path.startswith("/sync-onedrive"):
            return self.handle_sync_onedrive()
        elif self.path.startswith("/publish-snapshot"):
            return self.handle_publish_snapshot()
        self.send_response(404)
        self.end_headers()

    def handle_publish_snapshot(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body_bytes = self.rfile.read(content_length) if content_length > 0 else b"{}"
            payload = json.loads(body_bytes.decode("utf-8")) if body_bytes else {}
            filename = payload.get("filename")
            destination_dir = payload.get("destination_dir")

            if not destination_dir:
                raise ValueError("O campo 'destination_dir' é obrigatório.")

            from pathlib import Path
            import shutil

            project_root = Path(__file__).resolve().parent.parent
            exports_dir = project_root / "data" / "snapshots" / "exports"

            if not filename or filename == "latest":
                qpacks = sorted(exports_dir.glob("*.qpack"), key=lambda p: p.stat().st_mtime, reverse=True)
                if not qpacks:
                    raise FileNotFoundError("Nenhum pacote .qpack encontrado em data/snapshots/exports/.")
                src_path = qpacks[0]
                filename = src_path.name
            else:
                src_path = exports_dir / filename
                if not src_path.exists():
                    candidates = list((project_root / "data" / "snapshots").glob(f"**/{filename}"))
                    if candidates:
                        src_path = candidates[0]
                    else:
                        raise FileNotFoundError(f"Arquivo {filename} não encontrado no servidor.")

            dest = Path(destination_dir).expanduser().resolve()
            dest.mkdir(parents=True, exist_ok=True)

            target_file = dest / filename
            shutil.copy2(src_path, target_file)

            # Publica também como 'axet_knowledge_base_latest.qpack' para padronização
            latest_file = dest / "axet_knowledge_base_latest.qpack"
            shutil.copy2(src_path, latest_file)

            # Copia metadados se existirem
            meta_src = src_path.with_name(f"{src_path.name}.meta.json")
            if meta_src.exists():
                shutil.copy2(meta_src, dest / f"{filename}.meta.json")
                shutil.copy2(meta_src, dest / "axet_knowledge_base_latest.qpack.meta.json")

            data = {
                "status": "ok",
                "message": f"Pacote oficial publicado com sucesso no OneDrive!",
                "published_file": str(target_file),
                "latest_file": str(latest_file),
                "destination_dir": str(dest),
                "size_mb": round(target_file.stat().st_size / (1024 * 1024), 2),
            }
        except Exception as exc:
            data = {"status": "error", "message": f"Erro ao publicar snapshot no OneDrive: {exc}"}

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))

    def handle_sync_onedrive(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body_bytes = self.rfile.read(content_length) if content_length > 0 else b"{}"
            payload = json.loads(body_bytes.decode("utf-8")) if body_bytes else {}

            custom_source = payload.get("source_dir")
            target_subfolder = payload.get("target_subfolder")

            from pathlib import Path
            import subprocess
            import unicodedata

            project_root = Path(__file__).resolve().parent.parent
            dest_root = project_root / "data" / "sources"
            dest_root.mkdir(parents=True, exist_ok=True)

            source_path = None
            if custom_source:
                candidate = Path(custom_source).expanduser().resolve()
                if candidate.exists() and candidate.is_dir():
                    source_path = candidate

            if not source_path:
                default_path = Path("/Users/gcostabe/Library/CloudStorage/OneDrive-NTTDATAEMEAL/MAPFRE REEF VIDEOS/_Markdown")
                if default_path.exists():
                    source_path = default_path
                else:
                    raise FileNotFoundError(f"Pasta de origem não encontrada: {custom_source or default_path}")

            if target_subfolder:
                dest_dir = dest_root / target_subfolder
            else:
                norm_str = unicodedata.normalize("NFC", str(source_path))
                if "MAPFRE REEF VIDEOS" in norm_str or "Videos" in norm_str:
                    dest_dir = dest_root / "08. Videos Reef Market Place"
                elif "Formaciones Mapfre" in norm_str:
                    dest_dir = dest_root
                else:
                    dest_dir = dest_root / source_path.name

            dest_dir.mkdir(parents=True, exist_ok=True)

            cmd = [
                "rsync", "-av", "--update",
                "--include=*/",
                "--include=*.md",
                "--include=*.MD",
                "--exclude=*",
                f"{str(source_path)}/",
                f"{str(dest_dir)}/"
            ]
            out_bytes = subprocess.check_output(cmd, stderr=subprocess.STDOUT)
            out = out_bytes.decode("utf-8", errors="replace")

            source_mds = list(source_path.glob("**/*.md")) + list(source_path.glob("**/*.MD"))
            dest_mds = list(dest_dir.glob("**/*.md")) + list(dest_dir.glob("**/*.MD"))

            rel_subfolder = str(dest_dir.relative_to(dest_root))
            if rel_subfolder == ".":
                rel_subfolder = "."

            data = {
                "status": "ok",
                "message": f"Sincronização concluída com sucesso! {len(source_mds)} arquivos .md encontrados na origem e sincronizados para '{rel_subfolder}'.",
                "source_dir": str(source_path),
                "target_subfolder": rel_subfolder,
                "target_dir": str(dest_dir),
                "md_files_found": len(source_mds),
                "md_files_total_in_dest": len(dest_mds),
                "files_sample": [f.name for f in source_mds[:8]],
                "output": out[-400:]
            }
        except Exception as exc:
            data = {"status": "error", "message": f"Erro na sincronização: {exc}"}

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def do_GET(self):
        if self.path.startswith("/pick-folder"):
            try:
                import urllib.parse
                parsed = urllib.parse.urlparse(self.path)
                params = urllib.parse.parse_qs(parsed.query)
                prompt_text = params.get("prompt", ["Selecione a pasta raiz:"])[0]
                prompt_safe = prompt_text.replace('"', '\\"')

                cmd = f"osascript -e 'POSIX path of (choose folder with prompt \"{prompt_safe}\")'"
                path = subprocess.check_output(cmd, shell=True, text=True).strip()
                path = path.rstrip("/")
                data = {"path": path, "status": "ok"}
            except Exception as exc:
                data = {"path": None, "cancelled": True, "error": str(exc)}

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(data).encode())
        elif self.path.startswith("/sync-onedrive"):
            return self.handle_sync_onedrive()
        elif self.path.startswith("/health"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(b'{"status":"healthy"}')
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        pass


def main():
    server = HTTPServer(("0.0.0.0", PORT), PickerHandler)
    print(f"Host Folder Picker & Sync escutando em http://0.0.0.0:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()

