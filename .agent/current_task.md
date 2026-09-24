# CURRENT TASK

Task ID: TASK-20260924-1448-FIX-BAT-SYNTAX-PREVENT-FAST-EXIT

Created: 2026-09-24 14:48

Last Updated: 2026-09-24 14:51

Status: COMPLETED

Resume Authorization: YES

---

## User Request

"o bat esta abrindo e fechando muito rapido e naos esta criando o atalho na area de trabalho"

---

## Root Cause Analysis

1. **Erro de Sintaxe de Bloco / Parênteses Vazios no `cmd.exe`**:
   No script batch, uma tentativa anterior de comando continha parênteses aninhados com redirecionamento de saída ou tokens vazios (`for /f ... in ()`), o que é interpretado pelo `cmd.exe` como erro de sintaxe fatal antes mesmo de executar o script. No Windows Explorer, quando ocorre erro de sintaxe ao dar duplo clique, o Prompt de Comando fecha instantaneamente em menos de 0.1 segundo.
2. **Manipulação de `SCRIPT_DIR`**:
   O uso de `cd /d "%~dp0"` e `set "SCRIPT_DIR=%CD%"` é infinitamente superior ao fatiamento de strings (`%SCRIPT_DIR:~0,-1%`), pois garante o diretório correto sem barra invertida final e trata caminhos com espaços de forma nativa e sem escapes.
3. **Ausência de Pausas Preventivas**:
   Adicionada pausa defensiva no final de cada branch de erro e ao término de `instalar_windows.bat`, além de pré-selecionar a opção padrão `1` caso o usuário apenas pressione Enter.
4. **Criação Direta do Atalho**:
   A gravação do atalho agora é feita linha a linha (`echo ...> file` e `echo ...>> file`), eliminando completamente o bloco de parênteses aninhados e garantindo a criação sem riscos de colisão com caracteres de redirecionamento.

---

## Objective

1. Reescrever `instalar_windows.bat`, `iniciar_windows.bat` e `atualizar_base.bat` com sintaxe cmd.exe limpa, linear e imune a erros de parse.
2. Garantir criação confiável do atalho `.bat` na Área de Trabalho com suporte tanto a Desktop local quanto OneDrive Desktop.
3. Garantir 100% de quebras de linha Windows CRLF (`\r\n`).
4. Comitar e enviar para `origin` e `axet`.

---

## Execution Cursor

Phase: COMPLETED

Current Step: Scripts atualizados, validados com CRLF e sincronizados com os dois remotos Git.

Last Safe Checkpoint: CHECKPOINT-090.

---

## Planned Steps

- [x] Identificar a causa do fechamento prematuro (erro de sintaxe no parse do cmd.exe).
- [x] Refatorar `instalar_windows.bat` com sintaxe direta, sem blocos aninhados.
- [x] Refatorar `iniciar_windows.bat` e `atualizar_base.bat` com `cd /d "%~dp0"` e detecção robusta.
- [x] Garantir quebras de linha estritamente em CRLF nos 3 arquivos `.bat`.
- [x] Registrar CHECKPOINT-090 em `execution_journal.md`.
- [x] Comitar e fazer push para `origin` e `axet`.
