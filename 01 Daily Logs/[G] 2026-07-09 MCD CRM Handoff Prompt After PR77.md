# MCD CRM Handoff Prompt After PR77

Use this prompt to continue the MCD CRM work from the current verified state.

```text
Continue as the executor for Hamilton's MCD CRM project.

Before doing anything, read the workspace ground truth in `hpintojr/My-Workspace`:
- `02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md`
- `01 Daily Logs/[G] 2026-07-09 MCD CRM ChatGPT Session Handback.md`
- `01 Daily Logs/[G] 2026-07-09 MCD CRM PR77 Acceptance Overview Board Runbook Links.md`

Current production state:
- Repo: `hpintojr/crm.mcd`
- Production domain: `crm.mercurycalldesk.com`
- Latest production commit: `a5c33b1c534899e9199f5c24474ec8d217409a01`
- Latest shipped PR: #77 — `feat(leads): link acceptance overview from board and runbook`
- Lock holder was returned to Claude after PR #77.

Completed by ChatGPT in this continuation:
- PR #66 added stable runbook section anchors.
- PR #67 added explicit acceptance runbook mapping, acceptance history, history CSV export, command center/report/board links, acceptance board anchors, and guard coverage.
- PR #68 added the read-only acceptance findings catalog and JSON endpoint.
- PR #69 added the read-only acceptance handoff packet and JSON endpoint.
- PR #70 added the read-only acceptance evidence gaps page and JSON endpoint.
- PR #71 added the read-only acceptance evidence matrix page and JSON endpoint.
- PR #72 added the read-only acceptance closed gates page and JSON endpoint.
- PR #73 added the read-only acceptance overview/cockpit page and JSON endpoint.
- PR #74 added protected `/admin/leads/acceptance` alias to the overview and surfaced the overview from `/admin/leads`.
- PR #75 linked the overview from acceptance history and findings.
- PR #76 linked the overview from acceptance command center and acceptance report.
- PR #77 linked the overview from acceptance board and runbook.

Verification standard used for every shipped PR:
- Vercel success.
- Commission Policy success.
- Verify CRM success.
- Application Build success.
- Preview smoke passed.
- Production smoke passed on `crm.mercurycalldesk.com`.
- `/api/cron/leads/aging` continued returning `401` without auth.

Safety boundary still in force:
- Do not make Prisma schema changes.
- Do not run Neon migrations or mutate Neon production branches/data.
- Do not change feature flags.
- Do not activate live GHL workflows or make live GHL API calls.
- Do not submit live imports or exports.
- Do not change Lead claim, DNC, ownership, approval, suppression, or two-way-contact business rules.
- Do not activate Servicing, Commissions, Finance, payout, or client onboarding.
- Do not commit secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
- Do not claim root cause without direct evidence from build, query, diff, or live test.

Hamilton-only item:
- Authenticated production acceptance remains Hamilton-only. ChatGPT did not record acceptance outcomes. Unless Hamilton has since recorded them, the acceptance gate remains unrecorded from ChatGPT's side.

Start here:
- Hamilton should sign in at `crm.mercurycalldesk.com` and open `/admin/leads/acceptance` or `/admin/leads/acceptance-overview`.
- The overview is now linked from `/admin/leads`, `/admin/leads/acceptance-history`, `/admin/leads/acceptance-findings`, `/admin/leads/acceptance-command-center`, `/admin/leads/acceptance-report`, `/admin/leads/testing`, and `/admin/leads/acceptance-runbook`.

If continuing development, stay inside the authorized safe lane unless Hamilton explicitly expands scope:
- Read-only admin pages under `src/app/admin/leads/...` or `src/app/admin/...` with `requireRole(ADMIN_ROLES)`, `features.leads`, and `dynamic = "force-dynamic"`.
- Read-only GET endpoints that only read `db.auditLog` or `db.lead` and never mutate.
- Navigation links between existing admin surfaces.
- Guard assertions in `scripts/check-lead-flow-alignment.ts`.
- Anchor IDs and read-only summaries/tables/timelines/matrices from existing data.

For any new PR:
- Retake/update the execution lock before committing.
- Use a branch off current `main`.
- Keep the diff small and inside the safe lane.
- Squash-merge only after all required checks are green.
- Smoke preview and production.
- Write a PR-specific daily log in `hpintojr/My-Workspace/01 Daily Logs/`.
- Update the ChatGPT session handback and `LOCK.md` with the latest production commit.
```
