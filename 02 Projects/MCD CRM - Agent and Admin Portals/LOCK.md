# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: chatgpt
scope: Mercury Call Desk GHL location lEdLVFW0uqKMhmkgFrsX + Stripe Sandbox test configuration + hpintojr/My-Workspace coordination; no crm.mcd production code, database, or deployment changes
since: 2026-07-13T18:46:11.541Z (Hamilton issued a new, scope-specific browser mandate for GHL foundation and Stripe Sandbox core-flow validation)
previous_holder: claude (holder under the PR #138 handback; superseded for this narrowly authorized external-configuration interval)
intent: ChatGPT may inspect and configure the Mercury Call Desk GHL foundation through the browser (fields, tags, custom values, pipeline/workflow drafts and only the narrowly needed controlled-test activation), and configure Stripe Sandbox test webhook/event handling required to validate lead capture → commission calculation → GHL tag write-back. No UI/frontend work, no crm.mcd production code/DB/deployment changes, no real customer data, no live Stripe configuration, no payout release, no financial-account storage, and no money movement. Return holder to Claude with a complete [G] handoff when this bounded work ends.
```

## Authorized without further owner approval

- Add protected read-only Next.js pages and API GET endpoints.
- Add navigation, source-derived summaries, deep links, and operational matrices.
- Add regression guards and wire them into CI/build.
- Add GitHub Actions for non-mutating smoke tests and repository validation.
- Add opt-in disposable-database/browser test harnesses that never target production.
- Run read-only production database/catalog queries.
- Improve operator UX, observability, request/response boundaries, expected-error handling, and retire unused bypass routes without changing supported business-rule outcomes or mutating production records during deployment.
- Create branches, PRs, run CI, squash-merge after all required checks pass, and verify Vercel production deployments.
- Write `[G]` daily logs after each merged PR or significant investigation.

## Not authorized without a more specific Hamilton instruction

- Applying `20260701092000_add_client_service_and_ledger` or any other production migration.
- Changing production feature flags, including `SERVICING_ENABLED`, `COMMISSIONS_ENABLED`, or `FINANCE_ENABLED`.
- Identifying or using aggregate Servicing onboarding candidates.
- Mutating production Client Accounts, Service Cases, Servicing/Commission acceptance, real Lead state, imports, exports, controlled tests, or ownership/routing.
- Live GHL workflow activation or external production API calls.
- Payment-provider execution, payout release, financial-account storage, or money movement.
- Committing private customer information or credentials.
- Changing CLAUDE.md's Protected Workspace Command Registry.

## Autonomous work completed after PR #102

- PRs #103-#126: production smoke, cron/auth/security hardening, public/authenticated request boundaries, GHL replay/request protection, import retirement, Integration Health, Admin report/CSV boundaries, and signed/Admin Lead-import boundaries.
- **PR #127 — Route Boundary Registry:** fail-closed recursive route scanner and protected control plane.
- **PR #128 — Signed Lead Import Domain Error Mapping:** centralized exact typed error mapping; registry 11 → 6 findings.
- **PR #129 — Shared Route JSON Boundary:** centralized public/cron response construction; registry 6 → 2 findings.
- **PR #130 — Zero-Finding Route Boundary Registry:** centralized final body reads; registry 0 findings and 0 frozen debt.
- **PR #131 — Build Guard Registry:** reviewed manifest, non-shell runner, and mechanically verified deployment evidence.
- **PR #132 — Protected Build Guard Registry Control Plane:** Admin-only static manifest page/API; initial build exposed stale PR #131 assertions.
- **PR #133 — Build Guard Registry Drift Repair:** manifest-declared counts and derived versioning; delivered PR #132 safely.
- **PR #134 — Authenticated E2E Foundation:** disposable PostgreSQL, Playwright, synthetic Owner/Agent sessions, role boundaries, logout, and safety guard.
- **PR #135 — Authenticated MFA and Lockout E2E:** generic credential errors, MFA required/invalid/valid TOTP, and five-attempt lockout.
- **PR #136 — Persisted Authentication Security Evidence:** read-only proof of counters, lock timestamps, MFA reasons, login/logout ordering, and AuditLog consistency.
- **PR #137 — Live Session Authorization Enforcement:** proved issued sessions immediately lose access after User suspension or Owner→Agent role change, while the role-changed session can reach the Agent portal using current database authorization.
- **PR #138 — Account-State Recovery and Inactive Login Denial:** proved five-failure active lockout, bounded expired-lock recovery with reset state, and correct-password session denial for synthetic SUSPENDED and DISABLED Users; persisted User/AuditLog evidence is read-only.

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
- `01 Daily Logs/[G] 2026-07-13 MCD CRM PR136 Persisted Authentication Security Evidence.md`
- `01 Daily Logs/[G] 2026-07-13 MCD CRM PR137 Live Session Authorization Enforcement.md`
- `01 Daily Logs/[G] 2026-07-13 MCD CRM PR138 Account State Recovery and Inactive Login Denial.md`

## Current production baseline

- Latest production commit: `c7aadba2433c869fbfd1dd7175d0fd721b149085` (PR #138).
- Vercel deployment: `dpl_E8fA5JUTMzrA7WKhq4NnXX1CrjjS`, READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #138 merge SHA, no-store, noindex, and complete security headers.
- No protected production route was authenticated or invoked; all browser, status/role mutations, and persisted assertions ran only against localhost and disposable PostgreSQL.
- Vercel reported no error or fatal runtime logs during verification.
- Lead Flow: 18/18 acceptance PASS.
- Route Boundary Registry: 0 findings and 0 frozen debt.
- Build Guard Registry: 46 deployment-visible entries, 45 Lead-flow executions, one build-prelude entry; manifest version `2026-07-13-pr138`.
- Authenticated E2E: eight synthetic identities, ten browser scenarios, expired-lock recovery, inactive correct-password denial, and persisted User/AuditLog evidence PASS.
- Production Servicing remains two aggregate candidates with zero Client Accounts, Service Cases, or Servicing acceptance records.
- Commission/Payout production schema remains staged only: 0 of 7 tables and no Commission enum types.

## Current branch state

- PR #138 branch `agent/authenticated-e2e-account-state-edges` is merged.
- No implementation branch is active.
- Next planned scope: read-only current-deployment runtime reliability and configuration/state verification.

## Lock return protocol

At the end of this execution interval, ChatGPT must update this file, write a complete `[G]` handoff log, record every merged PR and latest verified production commit, and return the holder to Claude unless Hamilton directs otherwise.
