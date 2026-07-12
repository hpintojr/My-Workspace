# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T06:40Z (Hamilton directed ChatGPT to take over while Claude usage is unavailable until Monday 9:00 AM Pacific and to complete as much as possible end to end without human intervention)
previous_holder: claude (2026-07-12T06:38Z through 2026-07-12T06:40Z. No additional Claude work was recorded after PR #102.)
intent: ChatGPT continues autonomous implementation, PR, CI, merge, deployment verification, and handoff during this interval. PRs #103-#112 are complete and deployed. Continue only with evidence-backed code hardening that does not require production mutations or settings changes. The next source-backed audit is the public `/api/signup` boundary: verify duplicate/concurrency handling, response disclosure, GHL side-effect ordering, and sanitized observability without invoking the production endpoint or changing applicant eligibility. Do not apply the staged Commission migration, change production feature flags, identify or use the two Servicing onboarding candidates, mutate production Leads/Client Accounts/Service Cases/acceptance records, call live GHL, activate payment providers, release payouts, store financial-account data, or move money.
```

## Authorized without further owner approval

- Add protected read-only Next.js pages and API GET endpoints.
- Add navigation, source-derived summaries, deep links, and operational matrices.
- Add regression guards and wire them into CI/build.
- Add GitHub Actions for non-mutating smoke tests and repository validation.
- Add opt-in or disposable-branch database test harnesses that never target production.
- Run read-only production database/catalog queries.
- Improve operator UX, observability, and expected-error handling without changing business-rule outcomes or mutating production records during deployment.
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
- Real Lead ownership, approval, suppression, contact-gate, routing, import, or export actions.
- Live GHL workflow activation or external production API calls.
- Payment-provider execution, payout release, financial-account storage, or money movement.
- Committing private customer information or credentials.
- Changing CLAUDE.md's Protected Workspace Command Registry.

## Autonomous work completed after PR #102

- **PR #103 — Production Smoke automation**
  - Exact production SHA convergence, status contract, public login, and protected page/API boundaries.
- **PR #104 — Lead aging cron resilience**
  - Added bounded read-only database readiness retries while keeping the mutating sweep single-execution.
- **PR #105 — Global HTTP security headers**
  - Added and deployed the global browser/security response-header baseline.
- **PR #106 — Auth telemetry hygiene**
  - Reclassified expected credential outcomes without changing authentication, MFA, lockout, or audit behavior.
- **PR #107 — Certification precondition UX**
  - Disabled invalid approvals and redirected expected prerequisite failures to clear operator feedback.
- **PR #108 — Manager claim action boundary**
  - Aligned direct claim rendering with the existing Agent/controlled-test manager service rules.
- **PR #109 — Lead aging readiness window**
  - Expanded only the read-only `SELECT 1` probe to five attempts with 1/2/4/8-second backoff and a 90-second route budget.
  - Preserved exactly one mutating sweep execution outside all retry logic.
- **PR #110 — Opt-in route tracing**
  - Replaced unconditional authentication and page/layout progress logs with a server-only `ROUTE_TRACE_ENABLED=true` diagnostic path.
  - Preserved errors, warnings, Auth.js unexpected failures, cron/integration failure logs, authorization, and AuditLog behavior.
  - Verified complete preview and production builds emitted no default `[route-trace]` events.
- **PR #111 — Minimal public deployment status**
  - Reduced `/api/status` to service, environment, branch, and exact commit SHA.
  - Removed public commit messages, deployment hostnames, regions, and request timestamps.
  - Added `X-Robots-Tag: noindex, nofollow, noarchive` and strengthened Production Smoke to reject metadata regression.
- **PR #112 — Centralized global security headers**
  - Removed the weaker duplicate response-header copy from middleware while preserving the NextAuth wrapper and matcher.
  - Kept `next.config.mjs` as the sole global header source and strengthened the guard against future middleware drift.

Daily logs:

- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR106 Auth Telemetry Hygiene.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR107 Certification Precondition UX.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR108 Manager Claim Action Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR109 Lead Aging Readiness Window.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR110 Opt-In Route Tracing.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR111 Minimal Public Status.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR112 Centralized Security Headers.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM Autonomous Hardening and Repository Cleanup.md`

## Repository hygiene

The obsolete draft PRs #1, #6, #7, #8, #9, #11, #12, #13, #14, #15, #16, and #17 were confirmed superseded, commented, and closed without merge.

## Current production baseline

- Latest production commit: `b15b5189192efb2a04cb4b8a85c953a8baa04716` (PR #112).
- Vercel deployment: `dpl_6KoiZEi97uFKooHVSf6p5err1G47`, READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #112 merge SHA, no-store, noindex, and the complete global security-header baseline intact.
- Unauthenticated `/admin/project-readiness` still resolves to the branded `/login` surface with the complete global header baseline.
- Vercel reported no runtime errors in the latest one-hour window after deployment.
- PR #109 did not invoke the production cron; the expanded readiness window awaits a later independent scheduled or specifically authorized run.
- Lead Flow: 18/18 acceptance PASS and owner decision recorded.
- Project Readiness: live at `/admin/project-readiness`.
- Servicing preflight: live at `/admin/servicing/acceptance-command-center`; expected decision `OWNER_AUTHORIZATION_REQUIRED`.
- Production Servicing state: two aggregate onboarding candidates, zero Client Accounts, zero Service Cases, zero Servicing acceptance records.
- Commission/Payout production schema: cleanly staged only; 0 of 7 tables and no current or legacy Commission enum types.

## Current branch state

- PR #112 branch `agent/centralize-security-headers` is merged.
- No new implementation branch is currently active.

## Lock return protocol

At the end of this execution interval, ChatGPT must update this file, write a complete `[G]` handoff log, record every merged PR and the latest verified production commit, and return the holder to Claude unless Hamilton directs otherwise.
