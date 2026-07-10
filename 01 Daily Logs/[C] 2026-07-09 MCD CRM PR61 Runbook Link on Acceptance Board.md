# MCD CRM — PR #61 Runbook Link on Acceptance Board

**Date:** 2026-07-09  
**Repository:** `hpintojr/crm.mcd`  
**Scope:** Lead Flow production acceptance support (navigation/discoverability slice)

## PR #61

```txt
PR: #61 — feat(admin): link acceptance runbook from acceptance board
Status: merged to main (squash)
Head before merge: a3fb8a28e991749fcf26933cd3cc2d01fb807280
Merge commit: da570d7cddfe63e5e7cb8b72465ec4fef6b1ae67
Production domain: crm.mercurycalldesk.com
Production /api/status commit: da570d7cddfe63e5e7cb8b72465ec4fef6b1ae67
Production environment: production
```

## Built

```txt
1. src/app/admin/leads/testing/page.tsx: added an Acceptance runbook link in the
   top action row of the Production Lead Flow acceptance board, positioned between
   Acceptance report and Controlled test data.
2. scripts/check-lead-flow-alignment.ts: added guard assertions covering the new
   /admin/leads/acceptance-runbook href and the "Acceptance runbook" label on the
   acceptance board so the entrypoint cannot silently disappear.
```

## Safety

```txt
No Prisma schema changes.
No Neon migration.
No feature flag changes.
No GHL workflow activation.
No live GHL API calls.
No live import/export submission.
No Lead claim / DNC / ownership / approval / suppression / two-way-contact business-rule changes.
No Servicing activation.
No Commission activation.
No Finance activation.
No payout activation.
No client-onboarding activation.
Navigation only. The acceptance-recording server action and revalidatePath calls are unchanged.
```

## Verification

```txt
GitHub checks for PR #61 head a3fb8a28e991749fcf26933cd3cc2d01fb807280 all completed
with conclusion=success:
- Vercel Preview Comments -> success
- policy-check -> success
- Typecheck and contract guards -> success
- build -> success

Vercel preview URL:
  https://crm-mcd-git-pr-61-runbook-on-57dbc7-hamiltons-projects-f65eeb81.vercel.app

Preview smoke tests:
  /api/status -> 200, environment=preview, branch=pr-61-runbook-on-acceptance-board,
    commitSha=a3fb8a28e991749fcf26933cd3cc2d01fb807280.
  /admin/leads/testing -> 200 sign-in boundary (redirect to /login), not 404/500.
  /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 Unauthorized without CRON_SECRET (expected).

Production smoke tests on crm.mercurycalldesk.com:
  /api/status -> 200, environment=production, branch=main,
    commitSha=da570d7cddfe63e5e7cb8b72465ec4fef6b1ae67.
  /admin/leads/testing -> 200 sign-in boundary, not 404/500.
  /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 Unauthorized without CRON_SECRET (expected).
```

## Current state after PR #61

```txt
PR #34 through PR #61 merged and deployed.
Custom domain crm.mercurycalldesk.com is on latest production commit
  da570d7cddfe63e5e7cb8b72465ec4fef6b1ae67.
Lead acceptance runbook is now reachable from every top-level admin surface that
  previously exposed the acceptance command center, plus the acceptance board itself
  (the actual evidence-recording surface): readiness, operating status, acceptance
  board, acceptance report, Lead review, audit history, controlled test data,
  controlled GHL harness, integration monitor, main admin command center, and
  the acceptance command center.
```

## Remaining gate

```txt
Authenticated production acceptance still remains:
- production smoke acceptance result recording
- click-to-call behavior
- no-answer ownership boundary
- two-way-contact claim gate
- 45-day timer
- Warm Reply timer
- DNC blackout
- GHL appointment/opportunity controlled events
- aging sweep controlled data behavior
- owner production decision
```
