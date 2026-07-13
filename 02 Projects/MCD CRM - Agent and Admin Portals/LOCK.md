# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T06:40Z (Hamilton directed ChatGPT to take over and complete as much as possible end to end without human intervention)
previous_holder: claude (2026-07-12T06:38Z through 2026-07-12T06:40Z. No additional Claude work was recorded after PR #102.)
intent: ChatGPT continues autonomous implementation, PR, CI, merge, deployment verification, and handoff. PRs #103-#135 are complete and deployed. Continue only with evidence-backed code hardening, regression coverage, read-only dashboards, operator UX, and disposable-database/browser test harnesses that do not require production mutations, external workflow calls, production migrations, real credentials, or settings changes. Current next scope: add disposable post-browser assertions for persisted authentication state and audit evidence, including failed-login reset after successful Owner login, MFA-required/invalid/success evidence, exact lockout counters and future lock timestamp, and login/logout audit sequencing where source contracts support it. Do not target production or preview databases, invoke production imports/exports/controlled tests/cron/signup/activation/webhooks, apply the staged Commission migration, change production feature flags, identify or use the two Servicing onboarding candidates, mutate production Leads/Client Accounts/Service Cases/acceptance records, call live GHL, activate payment providers, release payouts, store financial-account data, or move money.
```

## Authorized without further owner approval

- Add protected read-only Next.js pages and API GET endpoints.
- Add navigation, source-derived summaries, deep links, and operational matrices.
- Add regression guards and wire them into CI/build.
- Add GitHub Actions for non-mutating smoke tests and repository validation.
- Add opt-in or disposable-database/browser test harnesses that never target production.
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

- PRs #103-#126: production smoke, cron/auth/security hardening, public and authenticated request boundaries, GHL replay/request protection, import retirement, Integration Health, Admin report/CSV boundaries, and signed/Admin Lead-import boundaries.
- **PR #127 — Route Boundary Registry:** fail-closed recursive route scanner and protected source-derived control plane.
- **PR #128 — Signed Lead Import Domain Error Mapping:** centralized exact typed error mapping; registry 11 → 6 findings.
- **PR #129 — Shared Route JSON Boundary:** centralized public/cron response construction; registry 6 → 2 findings.
- **PR #130 — Zero-Finding Route Boundary Registry:** centralized final body reads; registry 0 findings and 0 frozen debt.
- **PR #131 — Build Guard Registry:** reviewed manifest, non-shell sequential runner, and mechanically verified deployment evidence.
- **PR #132 — Protected Build Guard Registry Control Plane:** Admin-only static manifest page/API; initial merged build exposed stale PR #131 assertions.
- **PR #133 — Build Guard Registry Drift Repair:** manifest-declared counts and derived versioning; restored navigation; delivered PR #132 safely to production.
- **PR #134 — Authenticated E2E Foundation:** localhost-only Playwright workflow with disposable PostgreSQL 17, synthetic Owner/Agent accounts, real credentials sessions, Admin/Agent role boundaries, logout invalidation, failure artifacts, and a fail-closed source safety guard.
- **PR #135 — Authenticated MFA and Lockout E2E:** added isolated synthetic MFA and lockout identities; proved generic credential errors, MFA required/invalid/valid TOTP behavior, and five-attempt lockout with the correct password blocked. The first run exposed only an ambiguous Next.js route-announcer alert selector; failure artifacts were used to scope assertions to the login form, and the clean rerun passed all six scenarios.

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
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR130 Zero Finding Route Boundary Registry.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR131 Build Guard Registry.md`
- `01 Daily Logs/[G] 2026-07-13 MCD CRM PR132 Build Guard Control Plane.md`
- `01 Daily Logs/[G] 2026-07-13 MCD CRM PR133 Build Guard Registry Drift Repair.md`
- `01 Daily Logs/[G] 2026-07-13 MCD CRM PR134 Authenticated E2E Foundation.md`
- `01 Daily Logs/[G] 2026-07-13 MCD CRM PR135 Authenticated MFA and Lockout E2E.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM Autonomous Hardening and Repository Cleanup.md`

## Repository hygiene

The obsolete draft PRs #1, #6, #7, #8, #9, #11, #12, #13, #14, #15, #16, and #17 were confirmed superseded, commented, and closed without merge.

## Current production baseline

- Latest production commit: `a29426406f3e6c5492133555b61532ab3b096ea7` (PR #135).
- Vercel deployment: `dpl_94E7BvBPYF4WQp5rrd6Xi444J2mY`, READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #135 merge SHA, no-store, noindex, and the complete security-header baseline intact.
- No protected production application route was authenticated or invoked during PR #135 production verification; all credential and browser activity ran only against localhost and disposable PostgreSQL.
- Vercel reported no error or fatal runtime logs for the new deployment during the verification window.
- Lead Flow: 18/18 acceptance PASS and owner decision recorded.
- Route Boundary Registry: 0 findings and 0 frozen debt.
- Build Guard Registry: 46 deployment-visible entries, 45 Lead-flow executions, and one build-prelude entry; current manifest version is `2026-07-13-pr135` and counts are manifest-driven.
- Authenticated E2E: four synthetic identities and six browser scenarios PASS, including generic credential failures, Owner/Agent routing, logout invalidation, MFA required/invalid/valid TOTP, and five-attempt lockout.
- Project Readiness, Build Guard Registry, Route Boundary Registry, Integration Health, and Servicing preflight remain deployed and protected.
- Production Servicing: two aggregate onboarding candidates, zero Client Accounts, zero Service Cases, zero Servicing acceptance records.
- Commission/Payout production schema: staged only; 0 of 7 tables and no current or legacy Commission enum types.

## Current branch state

- PR #135 branch `agent/authenticated-e2e-mfa-lockout` is merged.
- No new implementation branch is currently active.
- Next planned branch: `agent/authenticated-e2e-security-state`.

## Lock return protocol

At the end of this execution interval, ChatGPT must update this file, write a complete `[G]` handoff log, record every merged PR and latest verified production commit, and return the holder to Claude unless Hamilton directs otherwise.
