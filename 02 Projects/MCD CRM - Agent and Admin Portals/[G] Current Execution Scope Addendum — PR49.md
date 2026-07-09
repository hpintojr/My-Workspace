# MCD CRM — Current Execution Scope Addendum — PR49

**Updated:** 2026-07-09  
**Owner:** ChatGPT  
**Applies to:** `hpintojr/crm.mcd`, `hpintojr/My-Workspace`, and local `mcd_lead_ops`

## Current release state after PR49

```txt
Latest production commit: 1f7f292f51d3fe61963534b8166c0ef1d9ccd64f
Latest production deployment: dpl_AK8cdf1NUTVgmFdXbhBEkGQfgd8E
Custom domain: crm.mercurycalldesk.com
/api/status: production, main, commit 1f7f292f51d3fe61963534b8166c0ef1d9ccd64f
```

PR #34 through PR #49 are merged to `main`, deployed to Vercel production, and smoke-tested on the custom domain.

## Completed approved sequence

```txt
1. Controlled Test Data Foundation — DONE in PR #45.
2. Controlled GHL Event Harness — DONE in PR #46.
3. Acceptance Evidence Integration — DONE in PR #47.
4. OpenCRM-inspired agent-friendly UI mode — DONE in PR #48.
5. NextCRM-inspired activity/audit UX improvements — DONE in PR #49.
```

## PR #49 release details

```txt
PR #49 — feat(admin): improve activity and audit UX
Head before merge: 443c7f58c0272a72e3d31d092aa162123e451358
Merge commit: 1f7f292f51d3fe61963534b8166c0ef1d9ccd64f
Preview deployment: dpl_2zBgTr77iAzo6Qz7HDPGC2XxKRe6
Production deployment: dpl_AK8cdf1NUTVgmFdXbhBEkGQfgd8E
State: READY
```

## Production verification

```txt
Custom domain: crm.mercurycalldesk.com
/api/status -> 200 OK, production, main, commit 1f7f292f51d3fe61963534b8166c0ef1d9ccd64f
/admin/audit?action=controlled -> sign-in boundary when unauthenticated, not 404/500
```

## Safety boundary

```txt
No secret values were inspected or recorded.
No local process wrote directly to Neon/Postgres.
No schema changes were introduced in PR #36 through PR #49.
No feature flags were changed in PR #36 through PR #49.
No GHL workflow activation occurred.
No live GHL API calls were introduced.
No live import/export submission occurred.
No Lead ownership, claim, DNC, or two-way-contact business rules were changed by PR #49.
No imports, payouts, servicing, commissions, finance actions, or client onboarding were enabled.
GHL workflow activation, Servicing, Commissions, and Finance remain gated.
```

## Current remaining gated work

```txt
Authenticated production acceptance remains recommended before broader live Lead Flow use.
Owner production decision should be recorded before expanding normal Lead Flow use.
Live GHL workflow activation remains gated.
Servicing, Commissions, and Finance remain gated.
```

## Supporting handoff logs

```txt
01 Daily Logs/[G] 2026-07-09 MCD CRM PR45 Controlled Test Data Foundation.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR46 Controlled GHL Event Harness.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR47 Acceptance Evidence Integration.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR48 Agent Friendly UI Mode.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR49 Activity Audit UX.md
```

## Note

The main current-scope document should still be refreshed when GitHub file fetch/update access stabilizes. This addendum captures the same PR49 release state and is safe to use as the latest handoff reference until the main scope document can be overwritten with the current blob SHA.
