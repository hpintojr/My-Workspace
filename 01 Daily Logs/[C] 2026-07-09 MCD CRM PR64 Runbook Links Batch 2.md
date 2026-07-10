# MCD CRM — PR #64 Runbook Links on Acceptance-Report, Controlled Test Data, GHL Harness, Integrations

**Date:** 2026-07-09  
**Repository:** `hpintojr/crm.mcd`  
**Scope:** Lead Flow production acceptance support (navigation slice — completes runbook discoverability)

## PR #64

```txt
PR: #64 — feat(admin): link acceptance runbook from acceptance-report, controlled-test-data, GHL harness, integrations
Status: merged to main (squash)
Head before merge: e62c29219e70524cba3fb06ad6229daa58001ce9
Merge commit: c383f25e6dd5f466f6513922241fdf96bc2ca4b8
Production /api/status commit: c383f25e6dd5f466f6513922241fdf96bc2ca4b8
```

## Built

```txt
1. src/app/admin/leads/acceptance-report/page.tsx: Acceptance runbook link after
   Command center in the header action row.
2. src/app/admin/leads/controlled-test-data/page.tsx: Acceptance runbook link
   after Command center in the header action row.
3. src/app/admin/integrations/test-events/page.tsx: Acceptance runbook link
   after Command center in the header action row.
4. src/app/admin/integrations/page.tsx: Lead acceptance runbook link after
   Lead command center in the header row (Open command center card action left
   as-is).
5. scripts/check-lead-flow-alignment.ts: eight guard assertions covering hrefs
   and labels across the four pages.
```

## Safety

```txt
No schema, no Neon migration, no feature-flag changes, no GHL workflow activation,
no live GHL API calls, no live import/export submission, no Lead business-rule
changes, no Servicing/Commissions/Finance/payout/client-onboarding activation.
Navigation only.
```

## Verification

```txt
All four PR checks completed with conclusion=success:
- Vercel Preview Comments -> success
- policy-check -> success
- Typecheck and contract guards -> success
- build -> success

Vercel preview URL:
  https://crm-mcd-git-pr-64-runbook-li-e6c404-hamiltons-projects-f65eeb81.vercel.app

Preview smoke tests:
  /api/status -> 200 preview, branch=pr-64-runbook-links-batch-2,
    commitSha=e62c29219e70524cba3fb06ad6229daa58001ce9.
  /admin/leads/acceptance-report, /admin/leads/controlled-test-data,
    /admin/integrations/test-events, /admin/integrations,
    /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.

Production smoke tests on crm.mercurycalldesk.com:
  /api/status -> 200 production, branch=main,
    commitSha=c383f25e6dd5f466f6513922241fdf96bc2ca4b8.
  /admin/leads/acceptance-report, /admin/leads/controlled-test-data,
    /admin/integrations/test-events, /admin/integrations -> 200 sign-in
    boundary, not 404/500.
```

## Current state after PR #64

```txt
PR #34 through PR #64 merged and deployed.
Runbook discoverability arc is now complete: every admin surface that linked
the acceptance command center also links the acceptance runbook. Surfaces
covered end-to-end: command center, readiness, operating status, audit,
Lead review, acceptance command center, acceptance runbook, printable
checklist, acceptance board, acceptance report, controlled test data,
controlled GHL harness, integration monitor. No further discoverability
slices remain.
```
