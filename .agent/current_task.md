# CURRENT TASK

Task ID: TASK-20260924-1015-CHAT-CONV-SWITCH-SEARCHBAR-ZOOM

Created: 2026-09-24 10:18

Last Updated: 2026-09-24 10:25

Status: COMPLETED

Resume Authorization: NO

---

## User Request

"1 - ao iniciar uma nova conversa no chat ele responde mas ao terminar de escrever sai da conversa ativa e ponteira sozinho na conversa anterior.
2 - Mova o campo de pesquisa do graph 3d para o canto inferior esquerdo como esta na imagem
3 - Atualize a tela neuralGraph 3d com este zoom na area do cerebro e nodes que esta na imagem."
E em seguida: "nao teste autonomamente me passe pra testar"

---

## Objective

1. **Correção do Fluxo de Nova Conversa no Chat (`frontend/app/chat/page.tsx`)**:
   - Evitar que o parâmetro de query da URL `?c=UUID` antigo cause reabertura da conversa anterior ao término da escrita em `onDone`.
   - Adicionar controle de carga inicial para que `?c=` só seja lido na montagem da tela.
   - Limpar a URL ao clicar em "Nova Conversa".
   - Atualizar a URL com o novo ID de conversa recebido em `onConversation` via `window.history.replaceState`.

2. **Reposicionamento do Campo de Busca no Grafo 3D (`frontend/components/NeuralGraph3D.tsx`)**:
   - Remover a barra de busca "Localizar nó no espaço..." do HUD superior.
   - Posicionar no canto inferior esquerdo, diretamente acima do botão colapsável de opções de visualização (`!showVisualControls`), conforme marcado na imagem pelo usuário.
   - Configurar o dropdown de resultados para abrir para cima (`bottom-full mb-1.5`) para não ultrapassar a borda inferior.

3. **Ajuste de Zoom e Enquadramento do Cérebro 3D (`frontend/components/NeuralGraph3D.tsx`)**:
   - Reduzir o recuo da câmera em `fitDistance` de `boundingDist * 1.35` para `boundingDist * 0.92`.
   - Ajustar o vetor de câmera inicial para `new THREE.Vector3(fitDistance * 0.32, fitDistance * 0.34, fitDistance * 0.78)` para replicar o ângulo e a proximidade da imagem.
   - Atualizar a referência de posição padrão da câmera (`defaultCameraPosRef`).

4. **Compilação e Deploy no Docker**:
   - Validar build local com `npm run build` (0 erros).
   - Reconstruir e subir o container Docker do frontend (`docker compose build frontend && docker compose up -d frontend`).
   - Respeitar estritamente a instrução do usuário ("nao teste autonomamente me passe pra testar"), transferindo a validação diretamente para o usuário.
   - Registrar CHECKPOINT-082 no journal, comitar e enviar push simultâneo para `origin` e `axet`.

---

## Execution Cursor

Phase: COMPLETED

Current Step: Handover to user for testing.

Last Safe Checkpoint: CHECKPOINT-082.

---

## Planned Steps

- [x] Corrigir lifecycle de nova conversa e parâmetro `?c=` em `frontend/app/chat/page.tsx`.
- [x] Mover campo de busca para o canto inferior esquerdo em `frontend/components/NeuralGraph3D.tsx`.
- [x] Calibrar zoom da câmera e ângulo 3D em `frontend/components/NeuralGraph3D.tsx`.
- [x] Compilar frontend (`npm run build`) e reconstruir container Docker (`docker compose build frontend && docker compose up -d frontend`).
- [x] Respeitar instrução "nao teste autonomamente me passe pra testar" (subagente de browser suspenso).
- [x] Registrar CHECKPOINT-082 em `.agent/execution_journal.md`, comitar e enviar push dual.

