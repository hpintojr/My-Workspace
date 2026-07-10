# MCD CRM — PR #65 Where-To-Record Matrix on Acceptance Runbook

**Date:** 2026-07-09  
**Repository:** `hpintojr/crm.mcd`  
**Scope:** Lead Flow production acceptance support (read-only content addition)

## PR #65

```txt
PR: #65 — feat(leads): add Where to record each step matrix on acceptance runbook
Status: merged to main (squash)
Head before merge: 645027669fe797471c3bce9cc3364dd51ffd8f03
Merge commit: 4cba96ac145a77218f9fd62a2d31ce75c955a57c
Production /api/status commit: 4cba96ac145a77218f9fd62a2d31ce75c955a57c
```

## Built

```txt
1. src/app/admin/leads/acceptance-runbook/page.tsx: new section between the
   closed-gates panel and the step list, containing a summary table with three
   columns:
     - Step: the 11 runbook step titles
     - Perform on: each step's first action (surface where the check runs)
     - Record on: always /admin/leads/testing (the acceptance board)
   The section is tagged with data-acceptance-runbook-matrix="lead-flow" and
   explicitly names LEAD_PRODUCTION_ACCEPTANCE_RECORDED as the audit action-type
   so operators know all outcomes land in one filterable audit stream.
2. scripts/check-lead-flow-alignment.ts: five guard assertions for the matrix
   section title, sentinel data attribute, audit action-type reference, and
   the Perform on / Record on column headers.
```

## Safety

```txt
No schema, no Neon migration, no feature-flag changes, no GHL workflow activation,
no live GHL API calls, no live import/export submission, no Lead business-rule
changes, no Servicing/Commissions/Finance/payout/client-onboarding activation.
Content only. No new DB reads, no server actions, no revalidation.
```

## Verification

```txt
All four PR checks completed with conclusion=success:
- Vercel Preview Comments -> success
- policy-check -> success
- Typecheck and contract guards -> success
- build -> success

Vercel preview URL:
  https://crm-mcd-git-pr-65-runbook-re-0e6519-hamiltons-projects-f65eeb81.vercel.app

Preview smoke tests:
  /api/status -> 200 preview, branch=pr-65-runbook-record-matrix,
    commitSha=645027669fe797471c3bce9cc3364dd51ffd8f03.
  /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 without CRON_SECRET (expected).

Production smoke tests on crm.mercurycalldesk.com:
  /api/status -> 200 production, branch=main,
    commitSha=4cba96ac145a77218f9fd62a2d31ce75c955a57c.
  /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
```

## Current state after PR #65

```txt
PR #34 through PR #65 merged and deployed.

Runbook system now provides:
- 11-step step-by-step page (PR #59)
- Runbook discoverability from every top-level admin surface (PR #60, #61, #63, #64)
- Print-friendly checklist companion (PR #62)
- Where-to-record matrix on the runbook (PR #65)

Read-only acceptance tooling is complete. The remaining work is the authenticated
production acceptance run itself, driven by an operator on crm.mercurycalldesk.com.
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
