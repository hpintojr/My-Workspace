# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T06:40Z (Hamilton directed ChatGPT to take over while Claude usage is unavailable until Monday 9:00 AM Pacific and to complete as much as possible end to end without human intervention)
previous_holder: claude (2026-07-12T06:38Z through 2026-07-12T06:40Z. No additional Claude work was recorded after PR #102.)
intent: ChatGPT continues autonomous implementation, PR, CI, merge, deployment verification, and handoff. PRs #103-#129 are complete and deployed. Continue only with evidence-backed code hardening, regression coverage, read-only dashboards, and operator UX that do not require production mutations, external workflow calls, production migrations, or settings changes. Current next scope: extract the identical bounded public JSON body-read sequence from activation and signup into a source-only shared helper while preserving exact 413/400 bodies and pre-parse byte-limit ordering, reducing the Route Boundary Registry from two findings to zero. Do not invoke imports, exports, controlled tests, cron, signup, activation, or webhooks. Do not apply the staged Commission migration, change production feature flags, identify or use the two Servicing onboarding candidates, mutate production Leads/Client Accounts/Service Cases/acceptance records, call live GHL, activate payment providers, release payouts, store financial-account data, or move money.
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
- **PR #124 — Protected CSV download response boundary**
- **PR #125 — Signed Lead-import response boundary**
- **PR #126 — Admin Lead-import request boundary**
- **PR #127 — Route Boundary Registry**
  - Added a fail-closed source scanner for direct route body parsers, direct response constructors, and route-level error messages.
  - Established an exact reviewed baseline of 11 approved findings across 8 routes and zero frozen debt.
  - Added protected `/admin/route-boundaries` and `/api/admin/route-boundaries` control planes with role-only metadata and no database/runtime payload access.
- **PR #128 — Signed Lead Import Domain Error Mapping**
  - Centralized three named typed-domain mappings across five signed import routes.
  - Preserved exact public messages and HTTP statuses while keeping unknown failures generic.
  - Reduced the Route Boundary Registry from 11 findings across 8 routes to 6 approved findings across 4 routes, with zero raw-error findings and zero frozen debt.
- **PR #129 — Shared Route JSON Boundary**
  - Centralized direct JSON response construction for activation, signup, Lead-aging cron, and public status.
  - Preserved exact route payload/status/header contracts and request-ID behavior.
  - Reduced the Route Boundary Registry from 6 findings across 4 routes to 2 approved bounded raw-body reads across 2 routes.

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
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR126 Admin Lead Import Request Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR127 Route Boundary Registry.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR128 Signed Lead Import Domain Error Mapping.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR129 Shared Route JSON Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM Autonomous Hardening and Repository Cleanup.md`

## Repository hygiene

The obsolete draft PRs #1, #6, #7, #8, #9, #11, #12, #13, #14, #15, #16, and #17 were confirmed superseded, commented, and closed without merge.

## Current production baseline

- Latest production commit: `d6274810a5ebb118490c08e2542a25381c9a35d8` (PR #129).
- Vercel deployment: `dpl_88f59ZwNy92NRGhsDDqDmRjeJyrb`, READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #129 merge SHA, no-store, noindex, and the complete security-header baseline intact.
- No protected report, route-boundary snapshot, aging preview, CSV/download, signed or Admin import, authenticated Integration Health snapshot, signup, activation, portal write, controlled-test, cron, or GHL webhook POST route was invoked during preview or production verification.
- Vercel reported no error or fatal runtime logs for the new deployment during the verification window.
- The isolated Lead-import integration suite uses only a temporary PostgreSQL service container; no Neon or production database is used.
- Lead Flow: 18/18 acceptance PASS and owner decision recorded.
- Project Readiness: live at `/admin/project-readiness`.
- Route Boundary Registry: live at `/admin/route-boundaries`, protected and source-derived; current baseline is 2 approved findings across 2 routes.
- Integration Health: live at `/admin/integrations/health`, protected aggregate-only.
- Servicing preflight: live at `/admin/servicing/acceptance-command-center`; expected decision `OWNER_AUTHORIZATION_REQUIRED`.
- Production Servicing state: two aggregate onboarding candidates, zero Client Accounts, zero Service Cases, zero Servicing acceptance records.
- Commission/Payout production schema: cleanly staged only; 0 of 7 tables and no current or legacy Commission enum types.

## Current branch state

- PR #129 branch `agent/shared-route-json-boundary` is merged.
- No new implementation branch is currently active.
- Next planned branch: `agent/shared-public-json-body-boundary`.

## Lock return protocol

At the end of this execution interval, ChatGPT must update this file, write a complete `[G]` handoff log, record every merged PR and the latest verified production commit, and return the holder to Claude unless Hamilton directs otherwise.
