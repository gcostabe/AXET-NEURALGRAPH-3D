import asyncio
import base64
import glob
import json
import logging
import os
import shutil
import subprocess
import tempfile
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

from app.config import settings
from app.llm.base import Message
from app.llm.factory import get_llm_client

logger = logging.getLogger(__name__)

VIDEO_EXTENSIONS = {".mp4", ".mov", ".mkv", ".avi", ".webm", ".m4v"}

# Chaves de configuração salvas no AppSetting
VIDEO_SETTING_MODE_KEY = "video_processing_mode"  # "multimodal_ocr" | "audio_only"
VIDEO_SETTING_FRAME_INTERVAL_KEY = "video_frame_interval_seconds"
VIDEO_SETTING_WHISPER_MODEL_KEY = "video_whisper_model"
VIDEO_SETTING_LANGUAGE_KEY = "video_whisper_language"
VIDEO_SETTING_MAX_FRAMES_KEY = "video_max_frames"

# Estado em memória do job ativo de processamento de vídeo
_active_video_job: dict[str, Any] = {
    "status": "idle",  # "idle" | "running" | "completed" | "failed"
    "current_video": None,
    "mode": None,
    "progress": 0,
    "stage": None,
    "detail": None,
    "started_at": None,
    "finished_at": None,
    "logs": [],
    "error": None,
}


def get_video_job_status() -> dict[str, Any]:
    return dict(_active_video_job)


def _log_video_event(message: str, stage: str | None = None, progress: int | None = None):
    now_iso = datetime.now(timezone.utc).strftime("%H:%M:%S")
    entry = f"[{now_iso}] {message}"
    logger.info(f"[video_processor] {entry}")
    _active_video_job["logs"].append(entry)
    if stage:
        _active_video_job["stage"] = stage
    if progress is not None:
        _active_video_job["progress"] = progress
    _active_video_job["detail"] = message


def list_available_videos(root_dir: Path) -> list[dict[str, Any]]:
    """Varre o diretório de fontes buscando todos os arquivos de vídeo e checando se já possuem .md gerado."""
    if not root_dir.exists():
        return []

    videos = []
    # Usar os.walk com exclusão de diretórios ocultos para performance instantânea
    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if not d.startswith(".")]
        parent = Path(dirpath)
        md_in_dir = [
            f for f in filenames if f.endswith(".md") and not f.startswith(".")
        ]

        for fname in filenames:
            if fname.startswith("."):
                continue
            ext = os.path.splitext(fname)[1].lower()
            if ext in VIDEO_EXTENSIONS:
                p = parent / fname
                stem = p.stem.lower()

                # Checa se há arquivos .md correspondentes neste diretório
                matching_mds = [
                    str((parent / m).relative_to(root_dir))
                    for m in md_in_dir
                    if (
                        stem in m.lower()
                        or "resumo" in m.lower()
                        or "rag_run" in m.lower()
                        or m.lower().startswith(stem)
                    )
                ]

                try:
                    stat = p.stat()
                    size_mb = round(stat.st_size / (1024 * 1024), 2)
                    mod_time = datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc).isoformat()
                except OSError:
                    size_mb = 0.0
                    mod_time = datetime.now(timezone.utc).isoformat()

                videos.append({
                    "name": fname,
                    "relative_path": str(p.relative_to(root_dir)),
                    "absolute_path": str(p),
                    "parent_dir": str(parent.relative_to(root_dir)),
                    "size_mb": size_mb,
                    "modified_at": mod_time,
                    "has_markdown": len(matching_mds) > 0,
                    "markdown_files": matching_mds,
                })

    videos.sort(key=lambda x: (x["has_markdown"], x["name"]))
    return videos


def extract_audio_with_ffmpeg(video_path: Path, output_wav: Path) -> bool:
    """Extrai áudio mono 16kHz WAV de alta fidelidade para Whisper usando ffmpeg."""
    cmd = [
        "ffmpeg",
        "-y",
        "-i", str(video_path),
        "-vn",
        "-acodec", "pcm_s16le",
        "-ar", "16000",
        "-ac", "1",
        str(output_wav),
    ]
    try:
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        return output_wav.exists() and output_wav.stat().st_size > 0
    except Exception as exc:
        logger.error(f"Erro ao extrair áudio com ffmpeg: {exc}")
        return False


def extract_frames_with_ffmpeg(
    video_path: Path,
    output_dir: Path,
    interval_seconds: int = 10,
    max_frames: int = 25,
) -> list[tuple[float, Path]]:
    """Extrai frames periódicos do vídeo (amostragem inteligente de tela para OCR/Visão)."""
    output_dir.mkdir(parents=True, exist_ok=True)
    pattern = str(output_dir / "frame_%04d.jpg")

    cmd = [
        "ffmpeg",
        "-y",
        "-i", str(video_path),
        "-vf", f"fps=1/{interval_seconds},scale=1280:-1",
        "-q:v", "3",
        pattern,
    ]
    try:
        subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
    except Exception as exc:
        logger.error(f"Erro ao extrair frames com ffmpeg: {exc}")
        return []

    frame_files = sorted(output_dir.glob("frame_*.jpg"))
    if not frame_files:
        # Fallback para vídeos curtos ou quando o filtro periódico não gerou frames: extrai frame 0
        fallback_cmd = [
            "ffmpeg",
            "-y",
            "-i", str(video_path),
            "-vframes", "1",
            "-vf", "scale=1280:-1",
            "-q:v", "3",
            str(output_dir / "frame_0001.jpg"),
        ]
        try:
            subprocess.run(fallback_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
            frame_files = sorted(output_dir.glob("frame_*.jpg"))
        except Exception:
            pass

    if not frame_files:
        return []

    # Se houver mais frames que o limite, reduz por amostragem uniforme
    if len(frame_files) > max_frames:
        step = len(frame_files) / max_frames
        selected = [frame_files[int(i * step)] for i in range(max_frames)]
    else:
        selected = frame_files

    result = []
    for idx, f in enumerate(selected):
        approx_seconds = idx * interval_seconds
        result.append((approx_seconds, f))

    return result


def transcribe_audio_file(audio_path: Path, language: str = "es", model_size: str = "small") -> tuple[str, list[dict]]:
    """Transcreve o áudio via whisper-cli (se disponível no sistema) ou biblioteca faster-whisper."""
    # 1. Tenta whisper-cli (local binário compilado com Metal/CPU)
    whisper_cli = shutil.which("whisper-cli") or shutil.which("whisper")
    if whisper_cli:
        try:
            logger.info(f"Usando binário {whisper_cli} para transcrição...")
            txt_output = audio_path.with_suffix("")
            cmd = [
                whisper_cli,
                "-f", str(audio_path),
                "-l", language,
                "--output-txt",
                "-of", str(txt_output),
            ]
            subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
            res_txt = Path(f"{txt_output}.txt")
            if res_txt.exists():
                text = res_txt.read_text(encoding="utf-8", errors="ignore").strip()
                if text:
                    return text, [{"start": 0, "end": 0, "text": text}]
        except Exception as e:
            logger.warning(f"Falha ao executar {whisper_cli}: {e}. Tentando faster-whisper...")

    # 2. Fallback via faster-whisper em Python
    try:
        from faster_whisper import WhisperModel
        logger.info(f"Carregando faster-whisper (model={model_size}, device=auto)...")
        model = WhisperModel(model_size, device="cpu", compute_type="int8")
        segments_gen, info = model.transcribe(str(audio_path), language=language, beam_size=5)
        
        segments = []
        text_lines = []
        for seg in segments_gen:
            segments.append({
                "start": round(seg.start, 2),
                "end": round(seg.end, 2),
                "text": seg.text.strip(),
            })
            text_lines.append(f"[{round(seg.start, 1)}s -> {round(seg.end, 1)}s] {seg.text.strip()}")

        full_text = "\n".join(text_lines)
        return full_text, segments
    except Exception as exc:
        logger.error(f"Erro na transcrição via faster-whisper: {exc}")
        return f"[Falha na transcrição automática: {exc}]", []


def _encode_image_base64(image_path: Path) -> str:
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


async def generate_video_markdown(
    video_name: str,
    transcription_text: str,
    frames: list[tuple[float, Path]],
    mode: str = "multimodal_ocr",
    llm_model: str = "",
) -> str:
    """Invoca a LLM (multimodal com visão/OCR ou somente texto) para gerar o relatório completo em Markdown."""
    llm = get_llm_client()

    if mode == "multimodal_ocr" and frames:
        _log_video_event(f"Montando payload multimodal com {len(frames)} frames de tela para OCR...", progress=65)

        system_prompt = (
            "Você é o Consultor Técnico Especialista Sênior em Ecossistema REEF (MAPFRE / NTT DATA).\n"
            "Sua missão é analisar minuciosamente esta gravação técnica de sistema e gerar um documento formal, "
            "profundo e de alto valor em Markdown para a base de conhecimento do RAG.\n\n"
            "DIRETRIZ CRUCIAL — LEITURA VISUAL E OCR DA TELA:\n"
            "Além da fala transcrita, você tem acesso a capturas sequenciais da tela do vídeo. "
            "Examine com atenção os frames visuais e capture e documente tudo o que aparece na tela que NÃO foi dito "
            "ou que detalha a fala do apresentador:\n"
            "1. Telas, abas, módulos e caminhos de menu do sistema (ex: REEF, TRON, Módulo de Sinistros, Emissão, Terceiros, Tesouraria).\n"
            "2. Nomes exatos de campos de tela (labels), tipos de dados, checkboxes, listas suspensas e botões de ação.\n"
            "3. Tabelas e Grids de dados: colunas visíveis, opções de paginação, filtros e registros de exemplo exibidos.\n"
            "4. Mensagens do sistema, alertas em vermelho/amarelo, validações de campos e regras de bloqueio exibidas.\n"
            "5. Códigos técnicos visíveis (tabelas de banco, queries, IDs de produto, ramos, causas, moedas, logs).\n"
            "6. Diagramas de arquitetura, fluxo e slides explicativos apresentados.\n\n"
            "ESTRUTURA OBRIGATÓRIA DO DOCUMENTO EM MARKDOWN:\n"
            "Comece com um cabeçalho temático real e específico do assunto principal demonstrado no vídeo "
            "(NUNCA use título genérico como 'Relatório de Ingestão').\n"
            "Inclua as seguintes seções:\n"
            "## 1. Síntese Executiva & Objetivo de Negócio\n"
            "## 2. Telas e Módulos do Sistema Demonstrados (detalhando componentes visuais identificados)\n"
            "## 3. Campos, Grids e Estruturas de Dados Capturados na Interface (tabela de campos/colunas)\n"
            "## 4. Regras Operacionais, Validações e Controles Técnicos\n"
            "## 5. Fluxo Passo a Passo da Operação Realizada no Vídeo\n"
            "## 6. Dúvidas, Riscos e Pontos Críticos Abordados\n\n"
            "Mantenha o texto primoroso, em português (ou no idioma principal dos termos técnicos), sem alucinações."
        )

        content_parts: list[dict[str, Any]] = [
            {
                "type": "text",
                "text": (
                    f"# Arquivo de Vídeo: {video_name}\n\n"
                    f"### TRANSCRIÇÃO DE ÁUDIO (WHISPER):\n"
                    f"{transcription_text}\n\n"
                    f"### FRAMES CAPTURADOS DA TELA PARA LEITURA VISUAL & OCR:\n"
                    f"Abaixo estão os {len(frames)} frames sequenciais capturados do vídeo durante a demonstração. "
                    f"Analise cada imagem para extrair os dados de interface, tabelas e formulários:"
                ),
            }
        ]

        for sec, frame_path in frames:
            b64_data = _encode_image_base64(frame_path)
            content_parts.append({
                "type": "text",
                "text": f"--- [Frame aos {int(sec)} segundos de vídeo] ---",
            })
            content_parts.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{b64_data}",
                },
            })

        messages: list[Message] = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": content_parts},
        ]

    else:
        # Modo Somente Áudio
        _log_video_event("Gerando Markdown estruturado a partir da transcrição de áudio (Sem OCR visual)...", progress=70)
        system_prompt = (
            "Você é o Consultor Técnico Especialista Sênior em Ecossistema REEF (MAPFRE / NTT DATA).\n"
            "Sua missão é analisar esta transcrição de áudio de uma sessão técnica/reunião de sistema e "
            "estruturar uma documentação técnica completa e formal em formato Markdown.\n\n"
            "ESTRUTURA DO MARKDOWN:\n"
            "Crie um título H1 temático específico do assunto do vídeo (ex: '# Análise Funcional — <Tema>').\n"
            "Seções:\n"
            "## 1. Síntese Executiva\n"
            "## 2. Escopo Funcional e Negócio\n"
            "## 3. Regras e Controles Técnicos Mencionados\n"
            "## 4. Passo a Passo do Procedimento Narrado\n"
            "## 5. Dúvidas e Decisões Tomadas\n"
        )
        user_prompt = f"# Arquivo de Vídeo: {video_name}\n\n### Transcrição de Áudio:\n{transcription_text}"
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ]

    markdown_body = await llm.complete(messages, temperature=0.2)
    return markdown_body


async def process_single_video_pipeline(
    video_abs_path: Path,
    sources_root: Path,
    mode: str = "multimodal_ocr",
    frame_interval_seconds: int = 10,
    language: str = "es",
    whisper_model: str = "small",
) -> Path:
    """Executa o pipeline completo para um único vídeo e grava o .md no diretório correspondente."""
    video_name = video_abs_path.name
    now_str = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")

    _active_video_job["status"] = "running"
    _active_video_job["current_video"] = video_name
    _active_video_job["mode"] = mode
    _active_video_job["started_at"] = datetime.now(timezone.utc).isoformat()
    _active_video_job["finished_at"] = None
    _active_video_job["logs"] = []
    _active_video_job["error"] = None

    _log_video_event(f"Iniciando processamento do vídeo: {video_name} (Modo: {mode})", stage="init", progress=5)

    with tempfile.TemporaryDirectory(prefix="rag_video_proc_") as tmp_dir_str:
        tmp_dir = Path(tmp_dir_str)
        wav_path = tmp_dir / "audio_extracted.wav"
        frames_dir = tmp_dir / "frames"

        # 1. Extração de áudio
        _log_video_event("Extraindo faixa de áudio via ffmpeg...", stage="audio_extraction", progress=15)
        ok_audio = extract_audio_with_ffmpeg(video_abs_path, wav_path)
        if not ok_audio:
            raise RuntimeError(f"Falha ao extrair áudio do vídeo {video_name} usando ffmpeg.")

        # 2. Transcrição de áudio
        _log_video_event(f"Transcrevendo áudio via Whisper (modelo: {whisper_model}, idioma: {language})...", stage="transcription", progress=30)
        transcript_text, segments = transcribe_audio_file(wav_path, language=language, model_size=whisper_model)
        _log_video_event(f"Transcrição concluída ({len(segments)} segmentos detectados).", stage="transcription", progress=45)

        # 3. Extração de frames visuais de tela (se multimodal_ocr)
        frames: list[tuple[float, Path]] = []
        if mode == "multimodal_ocr":
            _log_video_event(f"Amostrando frames de tela a cada {frame_interval_seconds}s via ffmpeg...", stage="frame_extraction", progress=55)
            frames = extract_frames_with_ffmpeg(
                video_abs_path,
                frames_dir,
                interval_seconds=frame_interval_seconds,
                max_frames=settings.video_max_frames,
            )
            _log_video_event(f"{len(frames)} frames extraídos com sucesso para análise visual e OCR.", stage="frame_extraction", progress=60)

        # 4. Geração do Markdown cognitivo via LLM
        _log_video_event("Invocando IA para consolidar síntese e análise visual...", stage="multimodal_analysis", progress=75)
        md_content = await generate_video_markdown(
            video_name=video_name,
            transcription_text=transcript_text,
            frames=frames,
            mode=mode,
            llm_model=settings.llm_model,
        )

        # 5. Adiciona cabeçalho padronizado e metadados
        header_meta = (
            f"# Relatório de Análise Avançada de Vídeo\n\n"
            f"**Arquivo de origem:** `{video_name}`\n"
            f"**Data de processamento:** {datetime.now(timezone.utc).strftime('%d/%m/%Y %H:%M:%S UTC')}\n"
            f"**Modo de processamento:** {'Multimodal (Visão/OCR de tela + Áudio)' if mode == 'multimodal_ocr' else 'Somente Áudio (Whisper)'}\n"
            f"**Modelo de transcrição:** Whisper ({whisper_model}) — idioma: {language}\n"
            f"**Modelo de interpretação IA:** {settings.llm_model}\n"
            f"**Frames analisados:** {len(frames)}\n\n"
            f"---\n\n"
        )
        final_markdown = header_meta + md_content

        # 6. Salva o .md no diretório do vídeo
        parent_dir = video_abs_path.parent
        target_md_path = parent_dir / f"resumo_run_{now_str}.md"
        target_md_path.write_text(final_markdown, encoding="utf-8")
        _log_video_event(f"Documento Markdown gravado com sucesso: {target_md_path.name}", stage="markdown_generation", progress=90)

        # 7. Dispara indexação imediata do novo .md no RAG
        _log_video_event(f"Indexando novo documento na base vetorial e grafo...", stage="indexing", progress=95)
        try:
            from app.ingestion.watcher import SourcesWatcherService
            # Se watcher estiver ativo ele capturará o arquivo no disco, mas também fazemos parse direto
            from app.ingestion.parser import parse_markdown_file
            from app.ingestion.vector_store import get_client, ensure_collection, upsert_chunks
            from app.ingestion.chunker import chunk_by_headers
            from app.ingestion.embedder import get_embedder
            from app.knowledge.analyzer import process_document_cognitive_evolution

            parsed = parse_markdown_file(target_md_path, sources_root)
            chunks = chunk_by_headers(parsed.body, parsed.title)
            if chunks:
                embedder = get_embedder()
                vectors = embedder.embed([c.text for c in chunks])
                payloads = [
                    {
                        "source_path": parsed.source_path,
                        "content_hash": parsed.content_hash,
                        "title": parsed.title,
                        "tags": parsed.tags,
                        "breadcrumb": chunk.breadcrumb,
                        "chunk_index": chunk.chunk_index,
                        "text": chunk.text,
                    }
                    for chunk in chunks
                ]
                qclient = get_client()
                ensure_collection(qclient)
                upsert_chunks(qclient, vectors, payloads)

            # Grava no Grafo de Conhecimento e PostgreSQL
            from app.auth.database import AsyncSessionLocal
            async with AsyncSessionLocal() as db:
                await process_document_cognitive_evolution(parsed, db)

            _log_video_event("Documento indexado com sucesso no Qdrant e no Grafo de Conhecimento!", stage="done", progress=100)
        except Exception as e:
            logger.warning(f"Aviso ao indexar documento imediatamente: {e}. O watcher ou reindexador completará a indexação.")

        _active_video_job["status"] = "completed"
        _active_video_job["finished_at"] = datetime.now(timezone.utc).isoformat()
        _log_video_event("Processamento do vídeo finalizado com sucesso!", stage="done", progress=100)
        return target_md_path
