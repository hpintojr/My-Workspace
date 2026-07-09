# MCD CRM — Current Execution Scope

**Updated:** 2026-07-08  
**Owner:** ChatGPT  
**Applies to:** `hpintojr/crm.mcd`, `hpintojr/My-Workspace`, and local `mcd_lead_ops`

## Current release state

The lead-research and opaque owner-acquisition release is live in production. The first supervised production import occurred, was corrected with owner approval, PR #34 has been merged, and PR #35 has now added the deployment-status smoke helper.

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

Verified on the new deployment URLs:

```txt
https://crm-dv36hh7jp-hamiltons-projects-f65eeb81.vercel.app/api/status -> 200, commit 85241b306e9799983226450a6876e71e52665995
https://crm-mcd-hamiltons-projects-f65eeb81.vercel.app/api/status -> 200, commit 85241b306e9799983226450a6876e71e52665995
```

## Custom-domain caveat — still unresolved

```txt
crm.mercurycalldesk.com still resolves to older deployment dpl_8Qj5PcUQrBGfnYWHxvzPcGNGqG5C.
That older deployment is commit a80b8159df8331af0c84d3a098f54e880edecca5.
https://crm.mercurycalldesk.com/api/status returned 404 because the older deployment does not include PR #35.
```

Treat custom-domain promotion as unresolved until the custom domain reports:

```txt
git.commitSha = 85241b306e9799983226450a6876e71e52665995
```

## What Hamilton can do in Vercel to point the domain correctly

Use the Vercel dashboard because the available connector tools do not expose alias/domain mutation.

1. Open Vercel.
2. Select team/project:

```txt
Team: Hamilton's projects
Project: crm-mcd
```

3. Open the production deployment for commit:

```txt
85241b306e9799983226450a6876e71e52665995
Deployment: dpl_DysALSqTjpxL9HjVV696tXFrwNaa
```

4. In the deployment page, use the production-domain or alias controls to promote/assign the deployment to:

```txt
crm.mercurycalldesk.com
```

5. If the dashboard shows `crm.mercurycalldesk.com` pinned/aliased to older deployment `dpl_8Qj5PcUQrBGfnYWHxvzPcGNGqG5C`, remove that alias/pin or reassign it to the latest production deployment.

6. If the Domains tab shows a Git branch or production-branch setting, make sure the domain is assigned to the project production branch `main`, not a stale deployment.

7. After saving, verify by opening:

```txt
https://crm.mercurycalldesk.com/api/status
```

Expected response:

```txt
ok = true
environment = production
git.branch = main
git.commitSha = 85241b306e9799983226450a6876e71e52665995
```

## Current controlled test plan

Confirmed:

```txt
1. PR #34 merged to main and deployed READY.
2. PR #35 merged to main and deployed READY.
3. /api/status works on the latest Vercel production deployment aliases.
4. /portal/workspace, /portal/leads, and /admin/leads/testing resolved to sign-in instead of 404/500 on the new deployment URL before PR #35.
5. /api/cron/leads/aging returned 401 without Authorization on the new deployment URL before PR #35.
6. Production Neon remains 50 COLD / AVAILABLE, 0 OPEN / AVAILABLE claimable from the corrected batch.
7. Hamilton confirmed agent login worked in preview before PR #34 merge.
```

Unresolved:

```txt
1. crm.mercurycalldesk.com still resolves to older deployment dpl_8Qj5PcUQrBGfnYWHxvzPcGNGqG5C.
2. Need owner-side Vercel alias/domain reassignment or verification.
3. Need controlled production acceptance on the custom domain after promotion.
```

Still recommended after custom-domain promotion:

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

PR #34 and PR #35 are merged and the latest Vercel production deployment is READY. Custom-domain alias promotion remains unresolved. Broader live lead operations, external GHL workflow activation, Servicing, Commissions, and Finance remain gated until separately approved and tested.
