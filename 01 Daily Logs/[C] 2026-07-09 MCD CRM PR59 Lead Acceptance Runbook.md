# MCD CRM — PR #59 Lead Acceptance Runbook

**Date:** 2026-07-09  
**Repository:** `hpintojr/crm.mcd`  
**Scope:** Lead Flow production acceptance support (read-only navigation/content slice)

## PR #59

```txt
PR: #59 — feat(leads): add read-only lead acceptance runbook
Status: merged to main (squash)
Head before merge: 9d231fc7d7e7fd39d165062aeaeae33155dc071e
Merge commit: 9181aa0083b9d08a47a30525f7da65a52ccc0cd4
Production domain: crm.mercurycalldesk.com
Production /api/status commit: 9181aa0083b9d08a47a30525f7da65a52ccc0cd4
Production environment: production
```

## Built

```txt
1. New route src/app/admin/leads/acceptance-runbook/page.tsx as a read-only admin page:
   - Server component, requireRole(ADMIN_ROLES), feature-flag gated (features.leads),
     dynamic = "force-dynamic".
   - No database mutations. No feature flag or business-rule changes.
   - Content: 11 numbered runbook steps for executing authenticated production Lead Flow
     acceptance using the command center, acceptance board, controlled test data,
     controlled GHL harness, aging preview, audit history, and acceptance report.
   - Explicit "Gates that remain closed" panel: live GHL workflow, additional live imports
     or exports, Servicing expansion, Commission or payout, Finance or client-onboarding,
     production data changes outside controlled-test actions.
2. src/app/admin/leads/acceptance-command-center/page.tsx: added "Acceptance runbook"
   link in the top action row next to "Acceptance report".
3. scripts/check-lead-flow-alignment.ts: added guard assertions covering the runbook
   page title, sentinel data-acceptance-runbook="lead-flow" attribute, gates panel,
   step titles (two-way-contact claim gate, Warm Reply 45-day timer, DNC suppression),
   controlled GHL harness copy, aging preview copy, and the acceptance-command-center
   link to the runbook.
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
Read-only content page; page.tsx does not mutate state.
```

## Verification

```txt
GitHub checks for PR #59 head 9d231fc7d7e7fd39d165062aeaeae33155dc071e all completed with
conclusion=success:
- Vercel Preview Comments -> success
- policy-check -> success
- Typecheck and contract guards -> success
- build -> success

Vercel preview URL:
  https://crm-mcd-git-pr-59-lead-accep-598b74-hamiltons-projects-f65eeb81.vercel.app

Preview smoke tests:
  /api/status -> 200, environment=preview, branch=pr-59-lead-acceptance-runbook,
    commitSha=9d231fc7d7e7fd39d165062aeaeae33155dc071e.
  /admin/leads/acceptance-runbook -> 200 sign-in boundary (redirect to /login), not 404/500.
  /admin/leads/acceptance-command-center -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 Unauthorized without CRON_SECRET (expected).

Production smoke tests on crm.mercurycalldesk.com:
  /api/status -> 200, environment=production, branch=main,
    commitSha=9181aa0083b9d08a47a30525f7da65a52ccc0cd4.
  /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
  /admin/leads/acceptance-command-center -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 Unauthorized without CRON_SECRET (expected).
```

## Current state after PR #59

```txt
PR #34 through PR #59 merged and deployed.
Custom domain crm.mercurycalldesk.com is on latest production commit
  9181aa0083b9d08a47a30525f7da65a52ccc0cd4.
Unauthenticated smoke checks are passing.
Lead acceptance runbook is now reachable from the acceptance command center for
  authenticated admins during authenticated production acceptance.
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
