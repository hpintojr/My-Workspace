# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T06:40Z (Hamilton directed ChatGPT to take over while Claude usage is unavailable until Monday 9:00 AM Pacific and to complete as much as possible end to end without human intervention)
previous_holder: claude (2026-07-12T06:38Z through 2026-07-12T06:40Z. No additional Claude work was recorded after PR #102.)
intent: ChatGPT continues autonomous implementation, PR, CI, merge, deployment verification, and handoff during this interval. PRs #103-#108 are complete and deployed. Continue with evidence-backed code hardening that does not require production mutations or settings changes. Select the next scope from current source, build, and runtime evidence; keep all business-rule outcomes and protected production data unchanged unless Hamilton gives a specific subsequent instruction naming the action. Do not apply the staged Commission migration, change production feature flags, identify or use the two Servicing onboarding candidates, mutate production Leads/Client Accounts/Service Cases/acceptance records, call live GHL, activate payment providers, release payouts, store financial-account data, or move money.
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
  - Exact production SHA convergence, status contract, public login, protected page/API boundaries.
  - Runs on main push, manual dispatch, and six-hour schedule.
- **PR #104 — Lead aging cron resilience**
  - Bounded read-only DB readiness retries, structured retryable 503 responses, request IDs.
  - Mutating aging sweep remains single-execution and is never automatically replayed.
- **PR #105 — Global HTTP security headers**
  - CSP frame/base/form/object restrictions, anti-framing, nosniff, referrer, permissions, opener, DNS and legacy protections.
  - Production Smoke enforces the header baseline.
- **PR #106 — Auth telemetry hygiene**
  - Expected `CredentialsSignin` outcomes reclassified to compact informational telemetry.
  - Unexpected Auth.js failures remain errors; lockout, MFA and audit behavior unchanged.
- **PR #107 — Certification precondition UX**
  - Ineligible approval choices disabled; prerequisite summary added.
  - Stale expected precondition failures redirect to clear banners instead of production exceptions.
  - Server-side eligibility enforcement and audit behavior unchanged.
- **PR #108 — Manager claim action boundary**
  - Direct claim now renders only when both Lead-side gates and actor-side claim permission are satisfied.
  - Managers retain direct claim only for controlled acceptance-test Leads; real Leads show reassignment guidance.
  - Known stale claim failures return operator feedback while unexpected failures remain errors.
  - Existing capacity, two-way-contact gate, atomic `updateMany`, 45-day timer, claim events, and audit behavior remain unchanged.

Daily logs:

- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR106 Auth Telemetry Hygiene.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR107 Certification Precondition UX.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR108 Manager Claim Action Boundary.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM Autonomous Hardening and Repository Cleanup.md`

## Repository hygiene

The following obsolete draft PRs were confirmed superseded by current `main`, given an explanatory comment, and closed without merge:

- #1, #6, #7, #8, #9, #11, #12, #13, #14, #15, #16, and #17.

The GitHub open-PR queue was confirmed empty after cleanup and again before PR #108 opened.

## Current production baseline

- Latest production commit: `69d99abfde8e9bf254f087b773fdab54602159cb` (PR #108).
- Vercel deployment: `dpl_2Tk6nyPoGCAsysQLGjba95gL9ddD`, READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #108 merge SHA, no-store and the full security-header baseline intact.
- Vercel runtime errors: none found in the latest one-hour window after PR #108 deployed.
- Lead Flow: 18/18 acceptance PASS and owner decision recorded.
- Project Readiness: live at `/admin/project-readiness`.
- Servicing preflight: live at `/admin/servicing/acceptance-command-center`; expected decision `OWNER_AUTHORIZATION_REQUIRED`.
- Production Servicing state: two aggregate onboarding candidates, zero Client Accounts, zero Service Cases, zero Servicing acceptance records.
- Commission/Payout production schema: cleanly staged only; 0 of 7 tables and no current or legacy Commission enum types.

## Current branch state

- PR #108 branch `agent/manager-claim-action-boundary-v2` is merged.
- The earlier empty branch `agent/manager-claim-action-boundary` was never used and contains no work.
- No new implementation branch is currently active; select the next branch from current evidence.

## Lock return protocol

At the end of this execution interval, ChatGPT must update this file, write a complete `[G]` handoff log, record every merged PR and the latest verified production commit, and return the holder to Claude unless Hamilton directs otherwise.
