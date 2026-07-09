# MCD CRM — Current Execution Scope

**Updated:** 2026-07-08  
**Owner:** ChatGPT  
**Applies to:** `hpintojr/crm.mcd`, `hpintojr/My-Workspace`, and local `mcd_lead_ops`

## Current release state

The lead-research and opaque owner-acquisition release is live in production. The first supervised production import occurred, was corrected with owner approval, PR #34 has been merged, PR #35 has added the deployment-status smoke helper, the custom domain resolves to the latest production commit, the custom-domain unauthenticated smoke pass is complete, PR #36 is merged/deployed as the production acceptance board section, and PR #37 is merged/deployed as the Readiness/Audit/Operating Status wiring section.

- No secret values were inspected or recorded.
- No local process wrote directly to Neon/Postgres.
- No new production data mutation was performed after the approved lead batch correction.
- GHL workflow activation, Servicing, Commissions, and Finance remain gated.

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

## PR #34 Lead Flow Alignment — merged

```txt
PR: #34 — feat(leads): align cold lead workspace with two-way-contact claim rules
Status: merged to main
Head before merge: 43b99e0daacaace2767f93d6a95641fa8d1d8a9a
Merge commit: 487ff615170f2c9530da61e477935d969d814e69
Production deployment: dpl_Hwq4jTsjmpdjJ8AmMffe8hYDAL9o
State: READY
```

PR #34 delivered:

- Cold Lead workspace in `/portal/leads`.
- Strict click-to-call logging before dialer open.
- No claim, soft-lock, reservation, or ownership on call start.
- Claim gate requiring two-way contact.
- 45-day responsibility timer on claim/assignment.
- DNC blackout handling.
- Secured aging cron route.
- My Workspace dashboard.
- Warm Reply timer alignment.
- GHL appointment/opportunity relay hardening.
- Acceptance board and lead-flow build guards.

## PR #35 Deployment Status + Smoke Helper — merged

```txt
PR: #35 — feat(ops): add deployment status endpoint and smoke checklist
Status: merged to main
Head before merge: 4cf0ebbc524938a09c91e26a9078f054ec8dd538
Merge commit: 85241b306e9799983226450a6876e71e52665995
Production deployment: dpl_DysALSqTjpxL9HjVV696tXFrwNaa
State: READY
```

PR #35 delivered:

```txt
/api/status
docs/PRODUCTION_SMOKE_20260708.md
```

`/api/status` returns non-secret deployment metadata only:

```txt
ok
service
environment
git.branch
git.commitSha
git.commitMessage
deployment.url
deployment.region
timestamp
```

Verified on the latest production URLs:

```txt
https://crm-dv36hh7jp-hamiltons-projects-f65eeb81.vercel.app/api/status -> 200, commit 85241b306e9799983226450a6876e71e52665995
https://crm-mcd-hamiltons-projects-f65eeb81.vercel.app/api/status -> 200, commit 85241b306e9799983226450a6876e71e52665995
https://crm.mercurycalldesk.com/api/status -> 200, commit 85241b306e9799983226450a6876e71e52665995
```

## Custom-domain promotion — resolved

Custom domain now reports:

```txt
ok = true
service = crm-mcd
environment = production
git.branch = main
git.commitSha = e42ec797ac3db2fb70aea76a41e899080105e69d
deployment.url = crm-i658a16d1-hamiltons-projects-f65eeb81.vercel.app
region = iad1
```

Status:

```txt
crm.mercurycalldesk.com is now on the latest production deployment.
The previous older deployment dpl_8Qj5PcUQrBGfnYWHxvzPcGNGqG5C is no longer the active custom-domain target based on /api/status verification.
```

## Custom-domain unauthenticated smoke pass — complete

Checked on `crm.mercurycalldesk.com` after domain promotion and again after PR #36 and PR #37:

```txt
/api/status -> 200, production, commit e42ec797ac3db2fb70aea76a41e899080105e69d
/portal/workspace -> 200 sign-in boundary, not 404/500
/portal/leads -> 200 sign-in boundary, not 404/500
/admin/leads/testing -> 200 sign-in boundary, not 404/500
/admin/readiness -> 200 sign-in boundary, not 404/500
/admin/audit -> 200 sign-in boundary, not 404/500
/admin/operating-status -> 200 sign-in boundary, not 404/500
/api/cron/leads/aging -> 401 Unauthorized without Authorization
Vercel runtime error/fatal logs for dpl_7hGG8cpY2PCb6TEZyzwcKDuwctw1, checked window 2026-07-09T07:12Z to 2026-07-09T07:27Z -> no logs found
```

Owner-reported browser confirmation:

```txt
Hamilton reported seeing the task list/acceptance board on the production custom domain on 2026-07-09.
```

## PR #36 Production Acceptance Board — merged

```txt
PR: #36 — feat(leads): add production acceptance board
Status: merged to main
Head before merge: 8b6568b53df9282eed5fd15689a74b7e33882442
Merge commit: 23fef7ba6da8bc55fc6789d0f7c342f87488f818
Production deployment: dpl_D7FKurVxw7FURpoe9g8SdNFJLrWV
State: READY
```

PR #36 updated this scope section:

```txt
src/app/admin/leads/testing/page.tsx
scripts/check-lead-flow-alignment.ts
```

Built:

```txt
1. Converts /admin/leads/testing from the old PR #34 pre-merge board into a production Lead Flow acceptance board.
2. Adds grouped production acceptance sections:
   - Release and domain readiness
   - Authenticated Lead Flow acceptance
   - Relay, timer, and owner decision gates
3. Uses the expected production commit as explicit evidence.
4. Writes new isolated audit evidence under:
   - actionType = LEAD_PRODUCTION_ACCEPTANCE_RECORDED
   - entityType = LeadProductionAcceptanceStep
   - phase = PRODUCTION_ACCEPTANCE_20260709
5. Keeps old PR #34 acceptance audit rows from counting as production acceptance.
6. Updates the lead-flow build guard to require the production acceptance board strings instead of the old PR #34 pre-merge strings.
```

Safety:

```txt
No schema changes.
No feature flag changes.
No GHL workflow activation.
No imports, payouts, servicing, commissions, or finance changes.
No production data mutation except intentional immutable audit rows if an admin records Pass/Fail/Deferred on the board.
```

Verification state:

```txt
GitHub checks for PR #36 head 8b6568b53df9282eed5fd15689a74b7e33882442 all passed:
- Commission Policy -> success
- Verify CRM -> success
- Application Build -> success
Initial Vercel preview failed because the build guard still required the old PR #34 pre-merge board strings.
Guard was patched in commit 8b6568b53df9282eed5fd15689a74b7e33882442.
Replacement Vercel preview dpl_7dRwPe3jynLUPopcofFkVgPd11Cg reached READY.
Preview /api/status -> 200, preview environment, branch production-acceptance-board-20260709, commit 8b6568b53df9282eed5fd15689a74b7e33882442.
Preview /admin/leads/testing -> 200 sign-in boundary, not 404/500.
Preview /api/cron/leads/aging -> 401 Unauthorized without Authorization.
Production deployment dpl_D7FKurVxw7FURpoe9g8SdNFJLrWV reached READY.
Production /api/status -> 200, production, main, commit 23fef7ba6da8bc55fc6789d0f7c342f87488f818.
Production /admin/leads/testing -> 200 sign-in boundary, not 404/500.
Production /api/cron/leads/aging -> 401 Unauthorized without Authorization.
Runtime error/fatal logs for dpl_D7FKurVxw7FURpoe9g8SdNFJLrWV -> no logs found for checked window.
```

## PR #37 Production Acceptance Readiness/Audit/Operating Status Wiring — merged

```txt
PR: #37 — feat(admin): wire readiness to production lead acceptance
Status: merged to main
Head before merge: fd7774ce857d2e7ce20be04ff15722a99afc26d8
Merge commit: e42ec797ac3db2fb70aea76a41e899080105e69d
Production deployment: dpl_7hGG8cpY2PCb6TEZyzwcKDuwctw1
State: READY
```

PR #37 updated this scope section:

```txt
src/app/admin/readiness/page.tsx
src/app/admin/audit/page.tsx
src/app/admin/operating-status/page.tsx
scripts/check-lead-flow-alignment.ts
```

Built:

```txt
1. Updates /admin/readiness Lead card from the old PR #34 acceptance lane to the production Lead Flow acceptance lane.
2. Readiness now tracks:
   - actionType = LEAD_PRODUCTION_ACCEPTANCE_RECORDED
   - entityType = LeadProductionAcceptanceStep
   - totalSteps = 18
3. Updates /admin/audit rollout evidence to include LEAD_PRODUCTION_ACCEPTANCE_RECORDED.
4. Updates /admin/operating-status Lead phase copy from old Lead MVP language to production Lead Flow acceptance language.
5. Updates the lead-flow build guard so readiness/audit/operating-status cannot silently regress back to the old Lead acceptance lane.
```

Safety:

```txt
No schema changes.
No feature flag changes.
No production data mutation.
No GHL workflow activation.
No imports, payouts, servicing, commissions, or finance changes.
```

Verification state:

```txt
GitHub checks for PR #37 head fd7774ce857d2e7ce20be04ff15722a99afc26d8 all passed:
- Commission Policy -> success
- Verify CRM -> success
- Application Build -> success
Vercel preview dpl_3zLMzUoCoZrWa6QswbiBgyx42BLS reached READY.
Preview /api/status -> 200, preview environment, branch production-acceptance-readiness-20260709, commit fd7774ce857d2e7ce20be04ff15722a99afc26d8.
Preview /admin/readiness -> 200 sign-in boundary, not 404/500.
Preview /admin/audit -> 200 sign-in boundary, not 404/500.
Preview /admin/operating-status -> 200 sign-in boundary, not 404/500.
Production deployment dpl_7hGG8cpY2PCb6TEZyzwcKDuwctw1 reached READY.
Production /api/status -> 200, production, main, commit e42ec797ac3db2fb70aea76a41e899080105e69d.
Production /admin/readiness -> 200 sign-in boundary, not 404/500.
Production /admin/audit -> 200 sign-in boundary, not 404/500.
Production /admin/operating-status -> 200 sign-in boundary, not 404/500.
Production /api/cron/leads/aging -> 401 Unauthorized without Authorization.
Runtime error/fatal logs for dpl_7hGG8cpY2PCb6TEZyzwcKDuwctw1 -> no logs found for checked window.
```

## Current controlled test plan

Confirmed:

```txt
1. PR #34 merged to main and deployed READY.
2. PR #35 merged to main and deployed READY.
3. PR #36 merged to main and deployed READY.
4. PR #37 merged to main and deployed READY.
5. /api/status works on the latest Vercel production deployment aliases.
6. /api/status works on crm.mercurycalldesk.com and reports commit e42ec797ac3db2fb70aea76a41e899080105e69d.
7. /portal/workspace, /portal/leads, /admin/leads/testing, /admin/readiness, /admin/audit, and /admin/operating-status resolve to sign-in instead of 404/500 on the custom domain.
8. /api/cron/leads/aging returns 401 without Authorization on the custom domain.
9. Runtime error/fatal logs for the latest production deployment show no entries for the checked window.
10. Production Neon remains 50 COLD / AVAILABLE, 0 OPEN / AVAILABLE claimable from the corrected batch.
11. Hamilton confirmed agent login worked in preview before PR #34 merge.
12. Hamilton reported seeing the production task list/acceptance board after custom-domain promotion.
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
13. Confirm aging sweep behavior using controlled test data only.
```

## Explicitly out of scope without separate approval

- Storing provider identity or commercial records in MiniCRM.
- Scraping, fetching, embedding, or ingesting Google Maps/review content.
- Auto-enabling GHL workflows, servicing, commission, or finance feature flags.
- Additional live import/submit/export without a run-specific owner approval reference.
- Additional production data changes.
- Recording secrets, contact payloads, signed headers, raw source files, customer PII, tax IDs, or payment data in GitHub/My-Workspace.

## Acceptance gates

PR #34, PR #35, PR #36, and PR #37 are merged and deployed. The latest production deployment is READY, the custom domain is on the latest production commit, and unauthenticated custom-domain smoke checks passed. Broader live lead operations, authenticated business-rule acceptance, external GHL workflow activation, Servicing, Commissions, and Finance remain gated until separately approved and tested.
