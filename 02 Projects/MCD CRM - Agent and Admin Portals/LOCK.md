# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T06:40Z (Hamilton directed ChatGPT to take over while Claude usage is unavailable until Monday 9:00 AM Pacific and to complete as much as possible end to end without human intervention)
previous_holder: claude (2026-07-12T06:38Z through 2026-07-12T06:40Z. No additional Claude work was recorded after PR #102.)
intent: ChatGPT continues autonomous implementation, PR, CI, merge, deployment verification, and handoff. PRs #103-#118 are complete and deployed. Continue only with evidence-backed code hardening, regression coverage, read-only dashboards, and operator UX that do not require production mutations, external workflow calls, migrations, or settings changes. Current next scope: harden the Admin controlled-GHL-test-event request boundary without invoking the endpoint or changing preview/apply semantics. Do not apply the staged Commission migration, change production feature flags, identify or use the two Servicing onboarding candidates, mutate production Leads/Client Accounts/Service Cases/acceptance records, call live GHL, activate payment providers, release payouts, store financial-account data, or move money.
```

## Authorized without further owner approval

- Add protected read-only Next.js pages and API GET endpoints.
- Add navigation, source-derived summaries, deep links, and operational matrices.
- Add regression guards and wire them into CI/build.
- Add GitHub Actions for non-mutating smoke tests and repository validation.
- Add opt-in or disposable-branch database test harnesses that never target production.
- Run read-only production database/catalog queries.
- Improve operator UX, observability, request boundaries, and expected-error handling without changing business-rule outcomes or mutating production records during deployment.
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
  - Only one concurrent retry can reopen an `ERROR` WebhookEvent.
- **PR #117 — Inbound GHL webhook request boundary**
  - Secret verification occurs before body reads across all six inbound GHL routes.
  - Added declared/actual 1 MiB limits, no-store/noindex/request-ID responses, post-schema location verification, and sanitized failure evidence.
  - No webhook was invoked during validation.
- **PR #118 — Authenticated portal write request boundary**
  - Added declared/actual 16 KiB limits and centralized no-store/noindex/request-ID responses.
  - Applied to portal actions, DNC, call-start, release, and logout compatibility metadata.
  - All four Lead write routes authorize before body parsing.
  - Known call-start failures use approved messages; unexpected errors remain visible to telemetry.
  - No portal POST endpoint was invoked during validation.

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
- `01 Daily Logs/[G] 2026-07-12 MCD CRM Autonomous Hardening and Repository Cleanup.md`

## Repository hygiene

The obsolete draft PRs #1, #6, #7, #8, #9, #11, #12, #13, #14, #15, #16, and #17 were confirmed superseded, commented, and closed without merge.

## Current production baseline

- Latest production commit: `31dc8068b562041a7fc455a3ed6c8af2a8f65113` (PR #118).
- Vercel deployment: `dpl_BHci8wpkkANCkL7E4MLF5Z57uF4k`, READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #118 merge SHA, no-store, noindex, and the complete security-header baseline intact.
- No signup, activation, portal write, controlled-test, cron, or GHL webhook POST route was invoked during preview or production verification.
- Vercel reported no runtime errors in the latest one-hour window after deployment.
- PR #109 did not invoke the production cron; the expanded readiness window awaits a later independent scheduled or specifically authorized run.
- Lead Flow: 18/18 acceptance PASS and owner decision recorded.
- Project Readiness: live at `/admin/project-readiness`.
- Servicing preflight: live at `/admin/servicing/acceptance-command-center`; expected decision `OWNER_AUTHORIZATION_REQUIRED`.
- Production Servicing state: two aggregate onboarding candidates, zero Client Accounts, zero Service Cases, zero Servicing acceptance records.
- Commission/Payout production schema: cleanly staged only; 0 of 7 tables and no current or legacy Commission enum types.

## Current branch state

- PR #118 branch `agent/portal-write-request-boundary` is merged.
- No new implementation branch is currently active.
- Next planned branch: Admin controlled-GHL-test-event request boundary, source-only validation and no endpoint invocation.

## Lock return protocol

At the end of this execution interval, ChatGPT must update this file, write a complete `[G]` handoff log, record every merged PR and the latest verified production commit, and return the holder to Claude unless Hamilton directs otherwise.
