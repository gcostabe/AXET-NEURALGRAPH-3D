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
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    def do_GET(self):
        if self.path.startswith("/pick-folder"):
            try:
                cmd = "osascript -e 'POSIX path of (choose folder with prompt \"Selecione a pasta raiz de documentos (.md):\")'"
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
    server = HTTPServer(("127.0.0.1", PORT), PickerHandler)
    print(f"Host Folder Picker escutando em http://127.0.0.1:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
