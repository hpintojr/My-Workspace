---
type: daily-log
date: 2026-07-01
project: MCD CRM - Agent and Admin Portals
---

# 2026-07-01 — MCD CRM production foundation launched

## Production verified

- Repository: `hpintojr/crm.mcd`
- Production branch: `main`
- Vercel project: `crm-mcd`
- Live domain: `https://crm.mercurycalldesk.com`
- Database: dedicated Neon production project with the CRM schema applied.
- First OWNER account: activated successfully with password and TOTP MFA; protected `/admin` access confirmed.
- The production domain returned HTTP 200 and Vercel reported no runtime errors during final verification.

## Shipped slices

- Slice 00: public partner signup, submitted-agent creation, onboarding-document gates, audit record, and stub-safe GHL contact creation.
- Slice 01: Auth.js credentials login, JWT sessions, server-side role gates, activation flow, account lockout, Argon2id password hashing, and MFA for privileged roles.
- Slice 02: applicant review queue, confirmation-call gate, approve/correction/rejection actions, audit records, GHL approval tagging, and integration-error visibility.

## Cleanup before the next release

- Remove the temporary owner-bootstrap production configuration now that the first owner is active.
- Restore the normal Vercel build command: `npm run build`.
- Redeploy once and confirm the protected admin page remains available.
- Never store activation links, secrets, database URLs, or temporary bootstrap values in the workspace, GitHub, screenshots, or chat logs.

## Next sequence

1. Slice 03: secure inbound GHL document webhooks, idempotency, onboarding-document completion, invited-user provisioning, and activation delivery.
2. Run a controlled end-to-end applicant test: signup → GHL → e-sign → webhook → activation.
3. Slice 04: agent portal plus Stripe Connect onboarding. Stripe and R2 remain intentionally deferred.

## Guardrails

- GHL remains backend-only; agents never get GHL logins.
- Never store SSNs, raw tax IDs, raw bank data, confidential pricing, or secrets in the CRM or workspace.
- Audit all sensitive authentication, admin, integration, onboarding, and payout actions.
