# CURRENT TASK

Task ID: TASK-20260924-0535-STRICT-ADMIN-WHITELIST

Created: 2026-09-24 05:35

Last Updated: 2026-09-24 05:35

Status: IN_PROGRESS

Resume Authorization: YES

---

## User Request

"garanta que todo novo usuário diferente do login gcostabe@emeal.nttdata.com somentee se loguem como user comum sem acesso adm"

---

## Objective

1. Restringir estritamente o papel de Administrador (`UserRole.ADMIN`) exclusivamente ao login `gcostabe@emeal.nttdata.com` (e ao seu alias de e-mail corporativo Okta `gustavo.costa.berbert@nttdata.com`).
2. Remover completamente quaisquer heurísticas genéricas anteriores (como `"gustavo" in email` ou `startswith("admin@")` ou `"gcostabe" in email`), substituindo-as por validação estrita baseada em whitelist oficial.
3. No endpoint de registro `/auth/register`:
   - Todo novo usuário diferente de `gcostabe@emeal.nttdata.com` / `gustavo.costa.berbert@nttdata.com` é cadastrado compulsoriamente como `UserRole.USER` com status `PENDING`.
4. No endpoint de autenticação Okta `/auth/okta/poll`:
   - Todo usuário autenticado cujo login/e-mail corporativo for diferente da whitelist recebe compulsoriamente o papel `UserRole.USER`.
   - Usuários existentes não autorizados que porventura possuam `ADMIN` são automaticamente rebaixados para `USER`.
5. No endpoint de login padrão `/auth/login`:
   - Usuários não autorizados são validados para garantir que nunca emitam JWT com role `ADMIN`.
6. No endpoint de alteração de papel `/admin/users/{user_id}/role`:
   - Bloquear promoção de qualquer usuário para `ADMIN` caso seu e-mail/login não pertença à whitelist autorizada.
7. Atualizar configurações padrão:
   - `backend/app/config.py`: `bootstrap_admin_email = "gcostabe@emeal.nttdata.com"`
   - `.env` e `.env.example`: `BOOTSTRAP_ADMIN_EMAIL=gcostabe@emeal.nttdata.com`
8. Sanitizar a base Postgres em execução:
   - Rebaixar `admin@example.com` para `USER`.
   - Garantir que apenas `gcostabe@emeal.nttdata.com` e `gustavo.costa.berbert@nttdata.com` possuam `ADMIN`.
9. Reiniciar containers, validar testes funcionais e executar commit e push dual para ambos os repositórios remotos.

---

## Execution Cursor

Phase: IMPLEMENTATION

Current Step: Updating backend auth logic, settings, and database sanitization.

Last Safe Checkpoint: CHECKPOINT-078.

---

## Planned Steps

- [ ] Criar função de validação estrita `is_authorized_admin(email_or_login)` em `backend/app/auth/security.py` ou `backend/app/api/auth.py`.
- [ ] Atualizar `backend/app/api/auth.py` (`/register`, `/login`, `/okta/poll`) com a validação estrita de RBAC.
- [ ] Atualizar `backend/app/api/admin.py` (`change_role`) para impedir promoção de contas não autorizadas.
- [ ] Atualizar `backend/app/config.py`, `.env` e `.env.example` definindo `BOOTSTRAP_ADMIN_EMAIL=gcostabe@emeal.nttdata.com`.
- [ ] Executar sanitização no banco PostgreSQL (`docker compose exec postgres psql...`).
- [ ] Reiniciar backend e validar autenticações de teste (novo usuário comum vs login de admin).
- [ ] Registrar checkpoint CHECKPOINT-079 em `.agent/execution_journal.md`.
- [ ] Realizar commit e push para ambos os repositórios (`origin` e `axet`).
