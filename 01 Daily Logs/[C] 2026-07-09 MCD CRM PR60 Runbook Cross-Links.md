# MCD CRM — PR #60 Runbook Cross-Links from Command Center and Readiness

**Date:** 2026-07-09  
**Repository:** `hpintojr/crm.mcd`  
**Scope:** Lead Flow production acceptance support (navigation/discoverability slice)

## PR #60

```txt
PR: #60 — feat(admin): link acceptance runbook from command-center and readiness
Status: merged to main (squash)
Head before merge: a878da3bf3fd1d33e940edf5b22e6338798eb91f
Merge commit: 2c837e8c2d550f79e437c8408ac31115a3cacde0
Production domain: crm.mercurycalldesk.com
Production /api/status commit: 2c837e8c2d550f79e437c8408ac31115a3cacde0
Production environment: production
```

## Built

```txt
1. src/app/admin/command-center/page.tsx: added a feature-flag-gated Lead acceptance
   runbook link in the top action row immediately after Lead command center.
2. src/app/admin/readiness/page.tsx:
   - Added runbookHref?: string to ReadinessCard and AcceptanceModule types.
   - Populated runbookHref: "/admin/leads/acceptance-runbook" on the LEADS module
     (Servicing and Commission modules remain unchanged and simply don't render a
     runbook button because they don't have runbookHref yet).
   - Plumbed runbookHref through the acceptance card mapping.
   - Added an Acceptance runbook link into the card action-group conditional
     alongside Command center / Open report / CSV export.
   - Added a Lead acceptance runbook link to the readiness header next to
     Lead acceptance report.
3. scripts/check-lead-flow-alignment.ts: added guard assertions covering the new
   command-center runbook link, readiness runbook links, the readiness "Acceptance
   runbook" button label, and the LEADS module runbookHref data literal.
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
Navigation/discoverability only; no new data reads or mutations.
```

## Verification

```txt
GitHub checks for PR #60 head a878da3bf3fd1d33e940edf5b22e6338798eb91f all completed
with conclusion=success:
- Vercel Preview Comments -> success
- policy-check -> success
- Typecheck and contract guards -> success
- build -> success

Vercel preview URL:
  https://crm-mcd-git-pr-60-runbook-cr-bb1233-hamiltons-projects-f65eeb81.vercel.app

Preview smoke tests:
  /api/status -> 200, environment=preview, branch=pr-60-runbook-cross-links,
    commitSha=a878da3bf3fd1d33e940edf5b22e6338798eb91f.
  /admin/command-center -> 200 sign-in boundary (redirect to /login), not 404/500.
  /admin/readiness -> 200 sign-in boundary, not 404/500.
  /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 Unauthorized without CRON_SECRET (expected).

Production smoke tests on crm.mercurycalldesk.com:
  /api/status -> 200, environment=production, branch=main,
    commitSha=2c837e8c2d550f79e437c8408ac31115a3cacde0.
  /admin/command-center -> 200 sign-in boundary, not 404/500.
  /admin/readiness -> 200 sign-in boundary, not 404/500.
  /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 Unauthorized without CRON_SECRET (expected).
```

## Current state after PR #60

```txt
PR #34 through PR #60 merged and deployed.
Custom domain crm.mercurycalldesk.com is on latest production commit
  2c837e8c2d550f79e437c8408ac31115a3cacde0.
Lead acceptance runbook is now reachable from every top-level admin surface that
  previously exposed the acceptance command center: readiness, operating status,
  acceptance board, acceptance report, Lead review, audit history, controlled test
  data, controlled GHL harness, integration monitor, main admin command center,
  and the acceptance command center itself.
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
