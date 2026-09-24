# CURRENT TASK

Task ID: TASK-20260924-1512-ELIMINATE-CMD-PARENTHESES-BLOCKS

Created: 2026-09-24 15:12

Last Updated: 2026-09-24 15:14

Status: COMPLETED

Resume Authorization: YES

---

## User Request

"o .bat continua abrindo e fechando e nao gerando no final o atalho"

---

## Root Cause Analysis

1. **Bug Crítico de Parênteses no Lexer do `cmd.exe`**:
   O interpretador nativo do Prompt de Comando do Windows (`cmd.exe`) possui um analisador léxico primitivo baseado em contagem de parênteses para blocos compostos (`if (...)`).
   Dentro de blocos `if (...)`, linhas com textos contendo parênteses simples como:
   - `(versao 2004+)` na linha 19
   - `(Se o Windows solicitar confirmacao de Administrador, clique em SIM/Permitir)` na linha 37
   faziam o `cmd.exe` interpretar o caractere `)` do texto como o fechamento prematuro do bloco `if`. Ao encontrar a linha com o fechamento real do bloco `)` mais abaixo, o Windows disparava o erro fatal `) was unexpected at this time.` em tempo de análise estática antes de rodar o script, fechando a janela instantaneamente.

2. **Detecção do Desktop via Registro do Windows**:
   Em máquinas com OneDrive ou OneDrive corporativo (ex: NTT DATA), a Área de Trabalho não fica em `%USERPROFILE%\Desktop`, mas sim sob a pasta redirecionada pelo Explorer. Consultar a chave do registro `HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders /v Desktop` garante 100% de precisão para identificar onde a Área de Trabalho real do usuário está alocada.

---

## Objective

1. Reformular o fluxo de controle de `instalar_windows.bat` eliminando completamente blocos de parênteses multinível, utilizando labels e `goto` lineares padrão de batch scripting.
2. Implementar consulta ao Registro do Windows para obter o caminho real do Desktop em qualquer configuração de OneDrive ou idioma.
3. Garantir que todas as saídas de erro e término terminem em `pause` obrigatório.
4. Gravar com quebras de linha Windows CRLF (`\r\n`).
5. Comitar e fazer push para `origin` e `axet`.

---

## Execution Cursor

Phase: COMPLETED

Current Step: Controle de fluxo linear sem blocos aninhados implementado, validado e sincronizado no Git.

Last Safe Checkpoint: CHECKPOINT-092.

---

## Planned Steps

- [x] Detectar causa do erro sintático fatal no cmd.exe (parênteses dentro de blocos if).
- [x] Reescrever `instalar_windows.bat` com arquitetura de labels e goto.
- [x] Implementar detecção do Desktop via registro do Windows.
- [x] Validar que o depth de parênteses no arquivo é estritamente 0 ao término de cada linha.
- [x] Registrar CHECKPOINT-092 em `execution_journal.md`.
- [x] Comitar e fazer push para `origin` e `axet`.
