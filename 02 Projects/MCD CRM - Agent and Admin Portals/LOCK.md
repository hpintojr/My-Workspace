# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T06:40Z (Hamilton directed ChatGPT to take over while Claude usage is unavailable until Monday 9:00 AM Pacific and to complete as much as possible end to end without human intervention)
previous_holder: claude (2026-07-12T06:38Z through 2026-07-12T06:40Z. No additional Claude work was recorded after PR #102.)
intent: ChatGPT continues autonomous implementation, PR, CI, merge, deployment verification, and handoff during this interval. PRs #103-#107 are complete. Continue with evidence-backed code hardening that does not require production mutations or settings changes. The next traced issue is the `/portal/leads` manager claim-action mismatch: the service correctly restricts managers to controlled-test Lead claims, but the UI renders the claim action for any claim-eligible selected Lead. Preserve the controlled-test admin path and all existing claim eligibility/atomicity rules; align UI and stale server-action handling only. Do not apply the staged Commission migration, change production feature flags, identify or use the two Servicing onboarding candidates, mutate production Leads/Client Accounts/Service Cases/acceptance records, call live GHL, activate payment providers, release payouts, store financial-account data, or move money unless Hamilton gives a specific subsequent instruction naming that action.
```

## Authorized without further owner approval

- Add protected read-only Next.js pages and API GET endpoints.
- Add navigation, source-derived summaries, deep links, and operational matrices.
- Add regression guards and wire them into CI/build.
- Add GitHub Actions for non-mutating smoke tests and repository validation.
- Add opt-in or disposable-branch database test harnesses that never target production.
- Run read-only production database/catalog queries.
- Improve operator UX and expected-error handling without changing business-rule outcomes or mutating production records during deployment.
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

Daily logs:

- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR106 Auth Telemetry Hygiene.md`
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR107 Certification Precondition UX.md`

## Current production baseline

- Latest production commit: `0c882fe3dadd85ec59b53cd234387be54fa2ec6e` (PR #107).
- Vercel deployment: `dpl_12C58zheLg4xhiETRzqxGUMLSSQC`, READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, production, main, exact PR #107 merge SHA, no-store and security headers intact.
- Lead Flow: 18/18 acceptance PASS and owner decision recorded.
- Project Readiness: live at `/admin/project-readiness`.
- Servicing preflight: live at `/admin/servicing/acceptance-command-center`; expected decision `OWNER_AUTHORIZATION_REQUIRED`.
- Production Servicing state: two aggregate onboarding candidates, zero Client Accounts, zero Service Cases, zero Servicing acceptance records.
- Commission/Payout production schema: cleanly staged only; 0 of 7 tables and no current or legacy Commission enum types.

## Current branch state

- `agent/manager-claim-action-boundary` exists from the PR #107 production baseline.
- No commits have been made to that branch yet.
- Direct evidence:
  - `src/lib/claims.ts` allows managers to claim only controlled-test Leads and requires reassignment controls for real Leads.
  - `src/app/portal/leads/page.tsx` currently renders the claim form whenever the Lead is claim-eligible, regardless of actor/agent claim permission.
  - Vercel recorded one expected `Use reassignment controls for manager lead assignment.` runtime error from this mismatch.

## Lock return protocol

At the end of this execution interval, ChatGPT must update this file, write a complete `[G]` handoff log, record every merged PR and the latest verified production commit, and return the holder to Claude unless Hamilton directs otherwise.
