# CURRENT TASK

Task ID: TASK-20260926-0830-ABOUT-STYLING-MAPFRE-REMOVAL-SELF-REFLECTIVE-RAG

Created: 2026-09-26 08:30

Status: ACTIVE

Branch: feat/unified-desktop-dmg-msi / main

Worktree Directory: /Users/gcostabe/dev/RAG-LOCAL-REEF/worktrees/desktop

Production Directory (Main): /Users/gcostabe/dev/RAG-LOCAL-REEF

Resume Authorization: YES

---

## User Request

1. **Ajustes 1 (Popup About AXET/NeuralGraph)**:
   - Centralizar tudo com padrão único e coerente de fontes.
   - Unificar padrão de fonte e cores dos nomes dos criadores e da unidade de negócio para o mesmo padrão que descreve a versão.
2. **Ajustes 2 (Item 1 - Remoção MAPFRE)**:
   - Remover MAPFRE do popup "About AXET/NeuralGraph" e do rodapé da aplicação.
   - **Restrição estrita do usuário**: NUNCA alterar ou remover referências a "MAPFRE" de arquivos `.md` (documentação, base de fontes, manuais).
3. **Ajustes 2 (Item 2 - Correção do Self-Reflective RAG e Mutação Dinâmica de Grafo 3D)**:
   - Identificar por que a retificação em tempo real não gerou o card de aprendizado no chat (`message.learning`).
   - Identificar por que o novo nó/sinapse não apareceu no Grafo Neural 3D como `self-learned`.
   - Implementar correção fim-a-fim e validar.

---

## Architecture & Implementation Decisions

1. **Popup About Styling & Typography Unification (`AppHeader.tsx`)**:
   - Padrão de fonte da versão: texto limpo, elegante, centralizado, fonte única.
   - Alinhar nomes dos criadores (`Gustavo Costa Berbert: Solution Architect & Cognitive Intelligence` e `Marcio Miguel: Executive Leadership & Business Architecture`) e unidade de negócio (`Application Services - MAPPS`) com as mesmas classes de fonte, tamanho e paleta de cores.
   - Rodapé: `© 2026 NTT DATA. All rights reserved.` (sem menção a MAPFRE).
   - Atualizar também `src-tauri/src/main.rs`, `src-tauri/Info.plist`, `src-tauri/tauri.conf.json` e `scripts/bump_version.js` para copyright exclusivo da NTT DATA.

2. **Self-Reflective RAG - Correção da Heurística e Prompt (`chat.py` & `learning_synapse.py`)**:
   - Prompt do sistema (`SYSTEM_PROMPT`): remover restrição "(sem o interlocutor ter apontado)". Instruir o LLM a sempre emitir o bloco ````json:cognitive_learning```` ao retificar qualquer inconsistência factual ou premissa equivocada.
   - `SELF_CORRECTION_PATTERNS`: expandir expressões regulares para capturar `você está correto`, `houve uma inconsistência`, `retificando:`, `não era correto afirmar`, `de fato houve um equívoco`, etc.
   - Parser heurístico: se o LLM não gerar o bloco JSON mas usar frases de retificação/admissão de equívoco, extrair automaticamente o conceito, o equívoco e a correção canônica.

3. **Mutação Dinâmica do Grafo 3D (`learning_synapse.py` & `NeuralGraph3D.tsx`)**:
   - Em `persist_cognitive_learning`, além de `KnowledgeEntity`, registrar também em `KnowledgeDocument` com `source_path = source_uri` (`learning://...`), para que `get_knowledge_graph` retorne o nó no array `nodes`.
   - Definir `target_path` da aresta para um nó de documento real existente na conversa (`candidate_sources[0]` ou documento canônico), para que o Three.js encontre `srcIdx` e `tgtIdx` e desenhe a linha.
   - Em `NeuralGraph3D.tsx`, registrar `RETIFICA_CONCEITO` em `RELATION_COLORS` com cor âmbar neon (`#f59e0b`, `Retifica Conceito (Self-Learned)`), permitindo filtragem e destaque visual específico.

---

## Execution Cursor

Phase: COMPLETED - ABOUT POPUP STYLING, MAPFRE REMOVAL, AND SELF-REFLECTIVE RAG MUTATION
Step 1: Unified typography and removed MAPFRE in AppHeader.tsx, main.rs, Info.plist, tauri.conf.json, and bump_version.js [COMPLETED]
Step 2: Expanded self-correction regex & heuristic extraction in learning_synapse.py and chat.py [COMPLETED]
Step 3: Linked cognitive learning node into KnowledgeDocument and dynamic 3D graph edge in NeuralGraph3D.tsx [COMPLETED]
Step 4: Built desktop bundle v1.0.9 (DMG & /Applications/AXET-NeuralGraph.app updated) [COMPLETED]
Resume Authorization: NO
