# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T06:40Z (Hamilton directed ChatGPT to take over while Claude usage is unavailable until Monday 9:00 AM Pacific and to complete as much as possible end to end without human intervention)
previous_holder: claude (2026-07-12T06:38Z through 2026-07-12T06:40Z. No additional Claude work was recorded after PR #102.)
intent: ChatGPT continues autonomous implementation, PR, CI, merge, deployment verification, and handoff. PRs #103-#125 are complete and deployed. Continue only with evidence-backed code hardening, regression coverage, read-only dashboards, and operator UX that do not require production mutations, external workflow calls, production migrations, or settings changes. Current next scope: harden the supported Admin Lead-import preview and commit request boundaries so authorization occurs before bounded JSON parsing, responses use the shared request-ID/no-store/noindex contract, and unexpected errors remain generic while preserving the existing 500-row import service and business outcomes. Do not invoke imports or exports. Do not apply the staged Commission migration, change production feature flags, identify or use the two Servicing onboarding candidates, mutate production Leads/Client Accounts/Service Cases/acceptance records, call live GHL, activate payment providers, release payouts, store financial-account data, or move money.
```

## Authorized without further owner approval

- Add protected read-only Next.js pages and API GET endpoints.
- Add navigation, source-derived summaries, deep links, and operational matrices.
- Add regression guards and wire them into CI/build.
- Add GitHub Actions for non-mutating smoke tests and repository validation.
- Add opt-in or disposable-database test harnesses that never target production.
- Run read-only production database/catalog queries.
- Improve operator UX, observability, request/response boundaries, expected-error handling, and retire unused bypass routes without changing supported business-rule outcomes or mutating production records during deployment.
- Create branches, PRs, run CI, squash-merge after all required checks pass, and verify Vercel production deployments.
- Close clearly superseded draft PRs only after confirming they are not current work.
- Write `[G]` daily logs after each merged PR or significant investigation.

## Not authorized without a more specific Hamilton instruction

- Applying `20260701092000_add_client_service_and_ledger` or any other migration to production.
- Changing production feature flags, including `SERVICING_ENABLED`, `COMMISSIONS_ENABLED`, or `FINANCE_ENABLED`.
- Identifying or using the aggregate Servicing onboarding candidates.
- Creating, launching, reassigning, or otherwise mutating production Client Accounts.
- Creating, responding to, resolving, or otherwise mutating production Service Cases.
- Recording production Servicing or Commission acceptance outcomes.
- Real Lead ownership, approval, suppression, contact-gate, routing, import, export, or controlled-test apply actions.
- Live GHL workflow activation or external production API calls.
- Payment-provider execution, payout release, financial-account storage, or money movement.
- Committing private customer information or credentials.
- Changing CLAUDE.md's Protected Workspace Command Registry.

## Autonomous work completed after PR #102

- **PR #103 — Production Smoke automation**
- **PR #104 — Lead aging cron resilience**
- **PR #105 — Global HTTP security headers**
- **PR #106 — Auth telemetry hygiene**
- **PR #107 — Certification precondition UX**
- **PR #108 — Manager claim action boundary**
- **PR #109 — Lead aging readiness window**
- **PR #110 — Opt-in route tracing**
- **PR #111 — Minimal public deployment status**
- **PR #112 — Centralized global security headers**
- **PR #113 — Public signup boundary**
- **PR #114 — Atomic account activation**
- **PR #115 — Framework header suppression**
- **PR #116 — Atomic GHL webhook retry claim**
- **PR #117 — Inbound GHL webhook request boundary**
- **PR #118 — Authenticated portal write request boundary**
- **PR #119 — Admin controlled test request boundary**
- **PR #120 — Legacy Admin Lead import retirement**
- **PR #121 — Aggregate Integration Health control plane**
- **PR #122 — Protected Admin read report response boundary**
- **PR #123 — Lead acceptance JSON report response boundary**
  - Standardized nine non-download Lead acceptance and dry-run report APIs on the shared request-ID/no-store/noindex contract.
  - Preserved every helper, calculation, AuditLog query, result field, and aging dry-run behavior.
- **PR #124 — Protected CSV download response boundary**
  - Centralized attachment content type, filename, no-store/noindex, and request-ID headers across four privileged CSV exports.
  - Preserved export columns, query bounds, role restrictions, filenames, and export AuditLog evidence.
- **PR #125 — Signed Lead-import response boundary**
  - Standardized all six signed lifecycle routes on bounded request IDs and no-store/noindex JSON responses.
  - Preserved HMAC, replay, concurrency, schemas, response bodies/statuses, import outcomes, and private acquisition rules.
  - Activated PR #124's previously omitted CSV guard in the authoritative build and deployment-verification contracts.
  - Replaced a deleted Neon CI endpoint with a temporary PostgreSQL 17 service container.
  - The disposable database builds the Prisma schema, applies the exact committed research-field trigger, and passes both lifecycle and research/private-provenance harnesses without Neon or production access.

## Daily logs

- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR106 Auth Telemetry Hygiene.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR107 Certification Precondition UX.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR108 Manager Claim Action Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR109 Lead Aging Readiness Window.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR110 Opt-In Route Tracing.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR111 Minimal Public Status.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR112 Centralized Security Headers.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR113 Public Signup Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR114 Atomic Account Activation.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR115 Framework Header Suppression.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR116 Atomic GHL Webhook Retry Claim.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR117 GHL Webhook Request Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR118 Portal Write Request Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR119 Admin Controlled Test Request Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR120 Legacy Admin Lead Import Retirement.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR121 Integration Health Control Plane.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR122 Admin Read Report Response Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR123 Lead Acceptance Report Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR125 Signed Lead Import Response Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM Autonomous Hardening and Repository Cleanup.md`

## Repository hygiene

The obsolete draft PRs #1, #6, #7, #8, #9, #11, #12, #13, #14, #15, #16, and #17 were confirmed superseded, commented, and closed without merge.

## Current production baseline

- Latest production commit: `991bb0a2bce200b3a30da4d62a5c7d4dc16789b6` (PR #125).
- Vercel deployment: `dpl_8h85PUVycYfpVWd9tTevKQVcPUic`, READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #125 merge SHA, no-store, noindex, and the complete security-header baseline intact.
- No protected report, aging preview, CSV/download, signed or Admin import, authenticated Integration Health snapshot, signup, activation, portal write, controlled-test, cron, or GHL webhook POST route was invoked during preview or production verification.
- Vercel reported no runtime errors in the latest one-hour window after deployment.
- The isolated Lead-import integration suite uses only a temporary PostgreSQL service container; no Neon or production database is used.
- PR #109 did not invoke the production cron; the expanded readiness window awaits a later independent scheduled or specifically authorized run.
- Lead Flow: 18/18 acceptance PASS and owner decision recorded.
- Project Readiness: live at `/admin/project-readiness`.
- Integration Health: live at `/admin/integrations/health`, protected aggregate-only.
- Servicing preflight: live at `/admin/servicing/acceptance-command-center`; expected decision `OWNER_AUTHORIZATION_REQUIRED`.
- Production Servicing state: two aggregate onboarding candidates, zero Client Accounts, zero Service Cases, zero Servicing acceptance records.
- Commission/Payout production schema: cleanly staged only; 0 of 7 tables and no current or legacy Commission enum types.

## Current branch state

- PR #125 branch `agent/lead-import-response-boundary` is merged.
- No new implementation branch is currently active.
- Next planned branch: `agent/admin-lead-import-request-boundary`.

## Lock return protocol

At the end of this execution interval, ChatGPT must update this file, write a complete `[G]` handoff log, record every merged PR and the latest verified production commit, and return the holder to Claude unless Hamilton directs otherwise.
