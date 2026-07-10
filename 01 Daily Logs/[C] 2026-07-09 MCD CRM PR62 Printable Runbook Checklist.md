# MCD CRM — PR #62 Printable Acceptance Runbook Checklist

**Date:** 2026-07-09  
**Repository:** `hpintojr/crm.mcd`  
**Scope:** Lead Flow production acceptance support (read-only checklist companion)

## PR #62

```txt
PR: #62 — feat(admin): add printable acceptance runbook checklist
Status: merged to main (squash)
Head before merge: f5798bf45128e639ff239cfcc0d165b1eee98ff2
Merge commit: 124d12486a65f131755caacf58d0a8ae7a5515b2
Production domain: crm.mercurycalldesk.com
Production /api/status commit: 124d12486a65f131755caacf58d0a8ae7a5515b2
Production environment: production
```

## Built

```txt
1. New route src/app/admin/leads/acceptance-runbook/checklist/page.tsx:
   - Server component, requireRole(ADMIN_ROLES), feature.leads gated, dynamic="force-dynamic".
   - Header shows date, operator email, and LEAD_STATUS_BASELINE_COMMIT.
   - Gates that remain closed panel identical to the runbook.
   - 11 rows mirroring the runbook steps, each with an evidence line, PASS/FAIL/DEFERRED
     choices, and a blank notes area.
   - Sign-off panel with reviewer and owner-decision fields.
   - Inline @media print CSS switches to black-on-white printable layout and hides
     on-screen navigation.
   - Content-only; no DB writes, no revalidations, no server actions.
2. src/app/admin/leads/acceptance-runbook/page.tsx: added Printable checklist link
   in the top action row after Acceptance report.
3. scripts/check-lead-flow-alignment.ts: added guard assertions for the checklist
   page title, sentinel data attribute, gates panel, sign-off panel, and the
   runbook -> checklist link.
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
Read-only content page. Recorded evidence still requires the acceptance board to enter the
immutable audit log; the checklist page states this explicitly.
```

## Verification

```txt
GitHub checks for PR #62 head f5798bf45128e639ff239cfcc0d165b1eee98ff2 all completed
with conclusion=success:
- Vercel Preview Comments -> success
- policy-check -> success
- Typecheck and contract guards -> success
- build -> success

Vercel preview URL:
  https://crm-mcd-git-pr-62-runbook-checklist-hamiltons-projects-f65eeb81.vercel.app

Preview smoke tests:
  /api/status -> 200, environment=preview, branch=pr-62-runbook-checklist,
    commitSha=f5798bf45128e639ff239cfcc0d165b1eee98ff2.
  /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
  /admin/leads/acceptance-runbook/checklist -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 Unauthorized without CRON_SECRET (expected).

Production smoke tests on crm.mercurycalldesk.com:
  /api/status -> 200, environment=production, branch=main,
    commitSha=124d12486a65f131755caacf58d0a8ae7a5515b2.
  /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
  /admin/leads/acceptance-runbook/checklist -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 Unauthorized without CRON_SECRET (expected).
```

## Current state after PR #62

```txt
PR #34 through PR #62 merged and deployed.
Custom domain crm.mercurycalldesk.com is on latest production commit
  124d12486a65f131755caacf58d0a8ae7a5515b2.
Lead acceptance runbook + printable checklist are live. Runbook links to the checklist
in the top action row; checklist links back to the runbook, command center, and
acceptance board. Print-friendly layout switches to black-on-white and hides
on-screen navigation when printed.
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
