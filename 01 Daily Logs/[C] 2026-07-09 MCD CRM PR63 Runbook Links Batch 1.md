# MCD CRM — PR #63 Runbook Links on Operating Status, Audit, Lead Review

**Date:** 2026-07-09  
**Repository:** `hpintojr/crm.mcd`  
**Scope:** Lead Flow production acceptance support (navigation/discoverability slice)

## PR #63

```txt
PR: #63 — feat(admin): link acceptance runbook from operating-status, audit, Lead review
Status: merged to main (squash)
Head before merge: bd0a7c737756a3f2cac006a8f311830f361c9cf1
Merge commit: 05d08d7ce1f2b1aae72e8c852373c85b053b97c9
Production /api/status commit: 05d08d7ce1f2b1aae72e8c852373c85b053b97c9
```

## Built

```txt
1. src/app/admin/operating-status/page.tsx: Lead acceptance runbook link after
   Lead command center in the header row.
2. src/app/admin/audit/page.tsx: Lead acceptance runbook link after Lead command
   center in both occurrences (header + rollout acceptance evidence section).
3. src/app/admin/leads/page.tsx: Lead acceptance runbook anchor after Lead command
   center in the Lead review header.
4. scripts/check-lead-flow-alignment.ts: six guard assertions covering the runbook
   href and label across all three pages.
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
  https://crm-mcd-git-pr-63-runbook-li-533aae-hamiltons-projects-f65eeb81.vercel.app

Preview smoke tests:
  /api/status -> 200 preview, branch=pr-63-runbook-links-batch-1,
    commitSha=bd0a7c737756a3f2cac006a8f311830f361c9cf1.
  /admin/operating-status, /admin/audit, /admin/leads,
    /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 without CRON_SECRET (expected).

Production smoke tests on crm.mercurycalldesk.com:
  /api/status -> 200 production, branch=main,
    commitSha=05d08d7ce1f2b1aae72e8c852373c85b053b97c9.
  /admin/operating-status, /admin/audit, /admin/leads,
    /admin/leads/acceptance-runbook -> 200 sign-in boundary, not 404/500.
```

## Current state after PR #63

```txt
PR #34 through PR #63 merged and deployed.
Lead acceptance runbook is now reachable from: command center, readiness,
  acceptance command center, runbook, printable checklist, acceptance board,
  operating status, audit history, and Lead review. Remaining surfaces yet to
  wire (still linked to command center only): acceptance report, controlled
  test data, controlled GHL harness, integration monitor. These will land in
  PR #64.
```
