# MCD CRM — Current Execution Scope

**Updated:** 2026-07-09  
**Owner:** ChatGPT  
**Applies to:** `hpintojr/crm.mcd`, `hpintojr/My-Workspace`, and local `mcd_lead_ops`

## Current release state

The Lead Flow production-readiness scope is live in production through PR #44. PR #34 through PR #44 are merged to `main`, deployed to Vercel production, and smoke-tested on the custom domain.

```txt
Latest production commit: 5965cc58cd009cb0c518e3e855355e15099d29a1
Latest production deployment: dpl_6FzQ3zXJyNTtMaSEn49pEYXFFnJ4
Custom domain: crm.mercurycalldesk.com
/api/status: production, main, commit 5965cc58cd009cb0c518e3e855355e15099d29a1
```

Current safety boundary:

```txt
No secret values were inspected or recorded.
No local process wrote directly to Neon/Postgres.
No new production data mutation was performed after the approved lead batch correction.
No schema changes were introduced in PR #36 through PR #44.
No feature flags were changed in PR #36 through PR #44.
No GHL workflow activation occurred.
No imports, payouts, servicing, commissions, or finance actions were enabled.
GHL workflow activation, Servicing, Commissions, and Finance remain gated.
```

## Approved open-source CRM reuse direction

Hamilton approved the open-source reuse direction on 2026-07-09.

```txt
Approve Mercury CRM as the base.
Approve NextCRM as primary code-reference/source-mining repo.
Approve OpenCRM as lightweight UI/agent-mode reference.
Approve Twenty as architecture reference only, no code copy without license review.
Pause new feature expansion until we add controlled test data + GHL test harness.
Continue handoff updates in hpintojr/My-Workspace after each repo-mining PR.
```

Approved source roles:

```txt
hpintojr/crm.mcd -> production base and source of truth.
pdovhomilja/nextcrm-app -> primary MIT code-reference/source-mining repo.
clawnify/open-crm -> MIT lightweight UI and agent-mode reference.
twentyhq/twenty -> architecture reference only; no code copy without license review.
```

New execution boundary:

```txt
Do not expand broad features until controlled test data and GHL controlled event test harness are built.
Next coding sequence:
1. Controlled Test Data Foundation.
2. Controlled GHL Event Harness.
3. Acceptance Evidence Integration.
4. OpenCRM-inspired agent-friendly UI mode.
5. NextCRM-inspired activity/audit UX improvements.
```

Full approval and reuse assessment:

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[G] Open Source CRM Reuse Assessment — 2026-07-09.md
```

## First production batch and correction

```txt
Batch ID: cmrbj55go0000la04pxcuuaci
Local run: RUN_2026_07_08_e8a9beed
Inserted Leads: 50
Initial imported state: OPEN / AVAILABLE
Final corrected state: COLD / AVAILABLE
Remaining OPEN / AVAILABLE claimable Leads: 0
Correction audit: 1 LEAD_BATCH_POOL_CORRECTED + 50 LEAD_POOL_CORRECTED records
```

The correction was owner-approved, rehearsed first on a Neon safety branch, then applied to production.

## Merged and deployed PRs

### PR #34 — Lead Flow Alignment

```txt
PR: #34 — feat(leads): align cold lead workspace with two-way-contact claim rules
Status: merged to main
Merge commit: 487ff615170f2c9530da61e477935d969d814e69
Production deployment: dpl_Hwq4jTsjmpdjJ8AmMffe8hYDAL9o
State: READY
```

Delivered:

```txt
Cold Lead workspace in /portal/leads.
Strict click-to-call logging before dialer open.
No claim, soft-lock, reservation, or ownership on call start.
Claim gate requiring two-way contact.
45-day responsibility timer on claim/assignment.
DNC blackout handling.
Secured aging cron route.
My Workspace dashboard.
Warm Reply timer alignment.
GHL appointment/opportunity relay hardening.
Acceptance board and lead-flow build guards.
```

### PR #35 — Deployment Status + Smoke Helper

```txt
PR: #35 — feat(ops): add deployment status endpoint and smoke checklist
Status: merged to main
Merge commit: 85241b306e9799983226450a6876e71e52665995
Production deployment: dpl_DysALSqTjpxL9HjVV696tXFrwNaa
State: READY
```

Delivered:

```txt
/api/status
docs/PRODUCTION_SMOKE_20260708.md
```

`/api/status` returns non-secret deployment metadata only.

### PR #36 — Production Acceptance Board

```txt
PR: #36 — feat(leads): add production acceptance board
Status: merged to main
Merge commit: 23fef7ba6da8bc55fc6789d0f7c342f87488f818
Production deployment: dpl_D7FKurVxw7FURpoe9g8SdNFJLrWV
State: READY
```

Delivered:

```txt
/admin/leads/testing production Lead Flow acceptance board.
Grouped 18-step acceptance sections.
Isolated audit evidence:
- actionType = LEAD_PRODUCTION_ACCEPTANCE_RECORDED
- entityType = LeadProductionAcceptanceStep
- phase = PRODUCTION_ACCEPTANCE_20260709
Lead-flow guard updated for production acceptance board.
```

### PR #37 — Readiness/Audit/Operating Status Wiring

```txt
PR: #37 — feat(admin): wire readiness to production lead acceptance
Status: merged to main
Merge commit: e42ec797ac3db2fb70aea76a41e899080105e69d
Production deployment: dpl_7hGG8cpY2PCb6TEZyzwcKDuwctw1
State: READY
```

Delivered:

```txt
/admin/readiness Lead card tracks production Lead Flow acceptance.
/admin/audit rollout evidence includes LEAD_PRODUCTION_ACCEPTANCE_RECORDED.
/admin/operating-status Lead phase copy updated to production Lead Flow acceptance.
Lead-flow guard protects readiness/audit/operating-status wiring.
```

### PR #38 — Production Status Baseline Wording

```txt
PR: #38 — fix(leads): treat status commit as acceptance baseline
Status: merged to main
Merge commit: fd00ac36f46ff68da0833cd12bc8cf56743c3353
Production deployment: dpl_4SeTvkSLtvzPSBZ8msa4oXCjxGCm
State: READY
```

Delivered:

```txt
Renamed exact expected commit concept to deployment-status baseline.
Kept PR #35 commit 85241b306e9799983226450a6876e71e52665995 as baseline.
Acceptance step requires production/main and current commit at or newer than baseline.
Stores statusBaselineCommit metadata instead of expectedCommit.
```

### PR #39 — Audit Acceptance Outcome Display

```txt
PR: #39 — feat(admin): show acceptance outcomes in audit evidence
Status: merged to main
Merge commit: ce8f41565d8cbad60f3a6158b5b5c26bd5691d8e
Production deployment: dpl_5hatvT92UEQWqoE2m8HXjooqGMCL
State: READY
```

Delivered:

```txt
Structured acceptance metadata parsing.
Pass / Fail / Deferred outcome badges in rollout evidence.
Module, phase, step title, step id/entity id, reviewer role, note, and commit/baseline evidence display.
Regular audit list remains below rollout acceptance evidence.
```

### PR #40 — Acceptance Report Exports

```txt
PR: #40 — feat(leads): add production acceptance report exports
Status: merged to main
Merge commit: ed41e5ccc3b103ca91387f9556c31fd7e9056036
Production deployment: dpl_7d6XEke2AM35Yxz4PXk6ZPKLnDPi
State: READY
```

Delivered:

```txt
Shared Lead Production Acceptance reporting model.
/api/admin/leads/acceptance-report JSON report.
/api/admin/leads/acceptance-report.csv CSV export.
Pass/fail/deferred/not-recorded counts.
Group-level counts.
Step-level evidence/outcomes/notes.
Owner-decision readiness fields.
CSV export creates only immutable export audit record when used.
```

### PR #41 — Acceptance Report Page

```txt
PR: #41 — feat(leads): add production acceptance report page
Status: merged to main
Merge commit: 6d1e43efe418548004f079afac42b0d949fc7ba8
Production deployment: dpl_7cpza67E9eSdxZ2VRqLqTH3xQ4EH
State: READY
```

Delivered:

```txt
/admin/leads/acceptance-report read-only admin report page.
Pass, fail, deferred, and not-recorded counts.
Owner-decision readiness.
Group-level acceptance summaries.
Step-level evidence, notes, recorded timestamps, reviewer roles, and commit evidence.
Links to JSON report, CSV export, and acceptance board.
```

### PR #42 — Lead Acceptance Report Navigation

```txt
PR: #42 — feat(admin): wire Lead acceptance report navigation
Status: merged to main
Merge commit: 895e8d23e8f4664db490833562da6542c3b88c5c
Production deployment: dpl_6PE3NdiYMpU3Mbfg8No8TgZijVkd
State: READY
```

Delivered:

```txt
/admin/leads/testing links to Acceptance Report and CSV export.
/admin/readiness Lead card links to report/export.
/admin/operating-status Lead phase links to report/export.
/admin/audit rollout evidence links to Lead report/CSV.
Acceptance saves revalidate /admin/leads/acceptance-report.
```

### PR #43 — Shared Acceptance Model on Board

```txt
PR: #43 — refactor(leads): share production acceptance model on board
Status: merged to main
Merge commit: edffe63920def161740be2fab2408c23c34d6e87
Production deployment: dpl_8zMYPcmSjtoiK3cp3Lg47xPbXhNJ
State: READY
```

Delivered:

```txt
/admin/leads/testing now uses the shared Lead Production Acceptance model.
Removed duplicate local 18-step acceptance contract from the board.
Board imports shared groups, steps, constants, and outcome parser.
Guard protects board/report/export alignment from one source of truth.
```

### PR #44 — Aging Sweep Dry-Run Preview

```txt
PR: #44 — feat(leads): add aging sweep dry-run preview
Status: merged to main
Head before merge: 1ba90e17d769be6fd1ab4bc048bf0646dc0e4964
Merge commit: 5965cc58cd009cb0c518e3e855355e15099d29a1
Production deployment: dpl_6FzQ3zXJyNTtMaSEn49pEYXFFnJ4
State: READY
```

Delivered:

```txt
runLeadAgingSweep({ dryRun: true }) support.
Dry-run returns wouldProcess, wouldReturnToOpenPool, wouldPromoteToSharkTank, cutoff, and preview rows.
Dry-run skips mutation transaction entirely.
/api/cron/leads/aging?dryRun=true authorized cron query support.
Cron dry-run still requires CRON_SECRET.
/api/admin/leads/aging-preview admin-only preview endpoint.
Admin preview always dry-runs and returns mutationPerformed:false.
Production acceptance step 17 points to aging preview.
Lead-flow guard protects dry-run contract.
```

## Latest production verification

```txt
Custom domain: crm.mercurycalldesk.com
Latest /api/status -> 200, production, main, commit 5965cc58cd009cb0c518e3e855355e15099d29a1
/admin/leads/testing -> sign-in boundary, not 404/500
/admin/leads/acceptance-report -> sign-in boundary, not 404/500
/api/admin/leads/acceptance-report -> sign-in boundary, not 404/500
/api/admin/leads/acceptance-report.csv -> sign-in boundary, not 404/500
/api/admin/leads/aging-preview -> sign-in boundary, not 404/500
/api/cron/leads/aging -> 401 Unauthorized without Authorization
/api/cron/leads/aging?dryRun=true -> 401 Unauthorized without Authorization
Latest runtime 5xx logs for dpl_6FzQ3zXJyNTtMaSEn49pEYXFFnJ4 -> no logs found for checked window 2026-07-09T18:59Z to 2026-07-09T19:09Z
```

## Current controlled test plan

Confirmed:

```txt
1. PR #34 through PR #44 are merged to main and deployed READY.
2. /api/status works on crm.mercurycalldesk.com and reports commit 5965cc58cd009cb0c518e3e855355e15099d29a1.
3. Protected admin/portal routes resolve to sign-in instead of 404/500 when unauthenticated.
4. /api/cron/leads/aging returns 401 without Authorization.
5. /api/cron/leads/aging?dryRun=true returns 401 without Authorization.
6. /api/admin/leads/aging-preview resolves to sign-in when unauthenticated.
7. Runtime 5xx logs for the latest production deployment show no entries for the checked window.
8. Production Neon remains 50 COLD / AVAILABLE, 0 OPEN / AVAILABLE claimable from the corrected batch.
9. Hamilton confirmed agent login worked in preview before PR #34 merge.
10. Hamilton reported seeing the production task list/acceptance board after custom-domain promotion.
```

Still recommended for authenticated production acceptance:

```txt
1. Record production smoke acceptance in /admin/leads/testing.
2. Confirm click-to-call logs activity before opening dialer.
3. Confirm click-to-call blocks the dialer if activity logging fails.
4. Confirm no-answer/voicemail leaves the Lead unowned.
5. Confirm callback/qualified/follow-up records two-way contact and unlocks claim.
6. Confirm claim sets ownerAgentId, claimedAt, and 45-day openPoolReleaseAt.
7. Confirm Warm Reply Triage assignment starts the 45-day timer.
8. Confirm GHL appointment events do not mutate suppressed/DNC Leads.
9. Confirm GHL appointment cancellation/no-show creates or expedites one owner callback.
10. Confirm GHL Opportunity Won/Lost cancels scheduled callbacks on terminal outcomes.
11. Confirm GHL Opportunity Lost does not roll back Closed Won.
12. Confirm DNC suppresses and cancels callbacks.
13. Review aging sweep dry-run output and controlled data behavior.
14. Record owner production decision before expanding normal Lead Flow use.
```

## Next approved blockers before feature expansion

```txt
1. Controlled Test Data Foundation.
2. Controlled GHL Event Harness.
```

These are now the approved next blockers before broader feature expansion, live GHL workflow activation, Servicing, Commissions, or Finance work.

## Explicitly out of scope without separate approval

```txt
Storing provider identity or commercial records in MiniCRM.
Scraping, fetching, embedding, or ingesting Google Maps/review content.
Auto-enabling GHL workflows, servicing, commission, or finance feature flags.
Additional live import/submit/export without a run-specific owner approval reference.
Additional production data changes.
Recording secrets, contact payloads, signed headers, raw source files, customer PII, tax IDs, or payment data in GitHub/My-Workspace.
Copying Twenty code or vendoring Twenty files without explicit license review.
```

## Acceptance gates

PR #34 through PR #44 are merged and deployed. The latest production deployment is READY, the custom domain is on the latest production commit, unauthenticated custom-domain smoke checks passed, aging dry-run preview support is deployed, and the open-source CRM reuse direction is approved. Broader live lead operations, authenticated business-rule acceptance, external GHL workflow activation, Servicing, Commissions, and Finance remain gated until separately approved and tested.

## Supporting daily logs and planning docs

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[G] Open Source CRM Reuse Assessment — 2026-07-09.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR40 Acceptance Report Exports.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR41 Acceptance Report Page.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR42 Lead Acceptance Navigation.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR43 Shared Acceptance Model.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR44 Aging Dry Run Preview.md
```
