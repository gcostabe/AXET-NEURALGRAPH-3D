# CURRENT TASK

Task ID: TASK-20260924-1438-FIX-WINDOWS-BAT-CRLF-PARSING

Created: 2026-09-24 14:38

Last Updated: 2026-09-24 14:41

Status: COMPLETED

Resume Authorization: YES

---

## User Request

"ao tentar instalar no windows clicando no instalar_windowns.bat" acompanhado de captura de tela mostrando erros de execução no Windows Terminal / Prompt de Comando do Windows:
- `'-3D' não é reconhecido como um comando interno ou externo...`
- `'iente' não é reconhecido como um comando interno...`
- `A sintaxe do nome do arquivo, do nome do diretório ou do rótulo do volume está incorreta.`
- `'á' não é reconhecido como um comando interno...`
- `'SL2' não é reconhecido como um comando interno...`
- `'neq' não é reconhecido como um comando interno...`
- `'o' não é reconhecido como um comando interno...`
- `'Windows' não é reconhecido como um comando interno...`
- `'quer' não é reconhecido como um comando interno...`

---

## Root Cause Analysis

1. **Quebras de Linha Unix (LF em vez de CRLF)**:
   Os scripts batch (`instalar_windows.bat`, `iniciar_windows.bat`, `atualizar_base.bat`) estavam salvos com quebras de linha Unix `\n` (LF) em vez de `\r\n` (CRLF do Windows).
   No Windows `cmd.exe`, o interpretador de lotes lê arquivos diretamente do disco com buffers que esperam 2 bytes (`\r\n`) por quebra de linha. Quando encontra `\n` (1 byte), o ponteiro de arquivo sofre drift progressivo de bytes a cada linha.
   Consequentemente, o interpretador salta para o meio das palavras e tenta executar pedaços de texto como comandos:
   - `-3D` (da palavra `AXET-NEURALGRAPH-3D` na linha 3/6)
   - `iente` (da palavra `Ambiente` na linha 7)
   - `á` (da palavra `está` na linha 14)
   - `SL2` (da palavra `WSL2` na linha 15)
   - `neq` (do operador `neq 0` na linha 17)
   - `o` (da palavra `O comando` na linha 18)
   - `Windows` (da palavra `Windows` na linha 19)
   - `quer` (da palavra `qualquer` na linha 21)

2. **Caracteres Especiais / Emojis Multibyte em Arquivos Batch**:
   Caracteres UTF-8 multibyte (como o emoji `🧠` de 4 bytes e travessão `—` de 3 bytes) agravavam o descompasso de leitura de bytes no interpretador nativo do `cmd.exe`.
   Foram simplificados banners para ASCII / caracteres limpos e compatíveis com qualquer console Windows.

3. **Resolução de Diretório do Desktop (OneDrive vs Padrão)**:
   No Windows 10/11 com OneDrive ativo, a Área de Trabalho pode estar em `%USERPROFILE%\OneDrive\Desktop`. Foi adicionada detecção com fallback automático para garantir a criação do atalho.

4. **Regras de Git (.gitattributes)**:
   Criado `.gitattributes` com `*.bat text eol=crlf` e `*.cmd text eol=crlf` para blindar checkouts e pulls futuros em qualquer sistema operacional.

---

## Objective

1. **Corrigir Formatação e Quebra de Linha CRLF**:
   - `instalar_windows.bat`, `iniciar_windows.bat` e `atualizar_base.bat` convertidos explicitamente para `CRLF` (`\r\n`).
2. **Sanitizar Caracteres em Scripts Batch**:
   - Removidos caracteres multibyte e emojis para compatibilidade total com o `cmd.exe`.
3. **Robustecer Detecção de Diretório e Desktop**:
   - Suporte transparente para Desktop padrão e OneDrive Desktop.
4. **Adicionar `.gitattributes`**:
   - Garantir preservação perene de `CRLF` para `.bat` e `.cmd`.
5. **Comitar e Sincronizar**:
   - Subir correção para os remotes `origin` e `axet`.

---

## Execution Cursor

Phase: COMPLETED

Current Step: Scripts batch corrigidos, convertidos para CRLF, verificados e sincronizados via Git.

Last Safe Checkpoint: CHECKPOINT-089.

---

## Planned Steps

- [x] Identificar e diagnosticar a causa raiz dos erros exibidos no print.
- [x] Criar `.gitattributes` com política de final de linha CRLF para `.bat`/`.cmd`.
- [x] Reformular e sanitizar `instalar_windows.bat`, `iniciar_windows.bat` e `atualizar_base.bat` com CRLF e sintaxe blindada.
- [x] Verificar integridade e codificação binária dos 3 arquivos .bat (0 LF isolados, 100% CRLF).
- [x] Registrar CHECKPOINT-089 em `execution_journal.md`.
- [x] Git commit e push para `origin` e `axet`.
- [x] Fornecer explicação clara ao usuário sobre a causa do erro e como reexecutar.
