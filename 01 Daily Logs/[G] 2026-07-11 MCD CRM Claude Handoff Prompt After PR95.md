# [G] 2026-07-11 MCD CRM Claude Handoff Prompt After PR #95

## Purpose

This file preserves the exact handoff prompt Hamilton can give Claude after ChatGPT completed the 2026-07-11 continuation window (PRs #91-#95 merged and deployed).

## Current state

- Latest shipped PR: `hpintojr/crm.mcd` PR #95 — API links index on `/admin/leads/deep-links`.
- Latest production commit: `ee8119e2cee297962e12b39eeedeb1d11fec3bc7`.
- Production deployment: `dpl_AozZyceZReVL7Lu2UYTTtDGrf91i`.
- Production domain verified: `crm.mercurycalldesk.com`.
- `/api/status` reports production/main at `ee8119e2cee297962e12b39eeedeb1d11fec3bc7`.
- Session handback log: `01 Daily Logs/[G] 2026-07-11 MCD CRM ChatGPT Continuation Handback After PR95.md`.
- Lock returned to Claude in `02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md`.

## Handoff prompt for Claude

```text
Claude, pick up the MCD CRM workspace from the latest ChatGPT handback.

Start by reading from hpintojr/My-Workspace through the Composio MCP connector only:
- `02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md`
- `02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`
- `01 Daily Logs/[G] 2026-07-11 MCD CRM ChatGPT Continuation Handback After PR95.md`
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR91 Deployment Verification Guard Lines.md`
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR92 Deep Link Backlinks.md`
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR93 Deep Links JSON API.md`
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR94 Deployment Verification JSON API.md`
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR95 Deep Links API Index.md`

Current lock state:
- Holder should be `claude`.
- Latest production commit should be `ee8119e2cee297962e12b39eeedeb1d11fec3bc7` on `crm.mercurycalldesk.com`.

What ChatGPT shipped most recently:
- PR #91 fixed `/admin/leads/deployment-verification` guard-line drift. Prod commit `091c4dae`.
- PR #92 added backlinks from owner decision prep, acceptance diff, and deployment verification pages to their matching `/admin/leads/deep-links#<slug>` anchors. Prod commit `7c650395`.
- PR #93 added protected read-only `GET /api/admin/leads/deep-links`, a shared server-only deep-link catalog, and a focused API guard. Prod commit `d694c5c1`.
- PR #94 added protected read-only `GET /api/admin/leads/deployment-verification`, a shared deployment verification snapshot helper, and a focused API guard. Prod commit `7127aeb2`.
- PR #95 added a visible API-links index on `/admin/leads/deep-links` for `/api/status`, `/api/admin/leads/deep-links`, and `/api/admin/leads/deployment-verification`. Prod commit `ee8119e2`.

Evidence for PR #95:
- Vercel status: success.
- GitHub Actions `Application Build`: success.
- GitHub Actions `Verify CRM`: success.
- GitHub Actions `Commission Policy`: success.
- Production deployment `dpl_AozZyceZReVL7Lu2UYTTtDGrf91i` reached READY and is aliased to `crm.mercurycalldesk.com`.
- `/api/status` reports production/main at `ee8119e2cee297962e12b39eeedeb1d11fec3bc7`.
- `/admin/leads/deep-links` resolves to the sign-in boundary unauthenticated, not 404/500.

Production build now emits 12 guard-pass lines:
- Lead flow alignment guard passed.
- Owner decision prep guard passed.
- Deferred acceptance runbook guard passed.
- Acceptance summary CSV guard passed.
- Print runbook guard passed.
- Controlled test data history guard passed.
- Acceptance diff guard passed.
- Overview deferred summary guard passed.
- Deployment verification guard passed.
- Deep links guard passed.
- Deep links API guard passed.
- Deployment verification API guard passed.

Safety boundary that remained in force across all five PRs:
- Read-only / admin-navigation / guard scope only.
- No runtime data mutation paths changed.
- No mutable API behavior added.
- No Prisma schema changes.
- No Neon migrations or production-data branch changes.
- No feature-flag changes.
- No live external workflow activation or live external API calls.
- No live import/export submission.
- No real Lead claim / DNC / ownership / approval / suppression / two-way-contact / routing business-rule changes.
- No Servicing / Commissions / Finance / payout / client-onboarding activation.
- No secrets or credentials committed.

Still outstanding:
- Authenticated production acceptance: Hamilton/operator-only.
- Five deferred steps remain: runtime error log check, click-to-call blocks on error, warm reply timer, GHL appointment hardening, GHL opportunity hardening.
- Owner production decision remains Hamilton-only.
- Continue only inside read-only/admin-navigation/guard scope unless Hamilton explicitly expands scope.

Recommended next action:
- Do not start Servicing, Commissions, Finance, feature flags, migrations, or GHL live workflow activation without Hamilton's explicit approval.
- Preferred next non-code action is Hamilton/operator use of `/admin/leads/acceptance-overview#deferred-blockers`, `/admin/leads/acceptance-runbook/deferred`, `/admin/leads/deep-links`, and `/admin/leads/deployment-verification` to clear the five deferred acceptance steps.
```
