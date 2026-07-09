# MCD CRM — Current Execution Scope

**Updated:** 2026-07-09  
**Owner:** ChatGPT  
**Applies to:** `hpintojr/crm.mcd`, `hpintojr/My-Workspace`, and local `mcd_lead_ops`

## Current release state

The Lead Flow production-readiness scope is live in production through PR #47. PR #34 through PR #47 are merged to `main`, deployed to Vercel production, and smoke-tested on the custom domain.

```txt
Latest production commit: efe406c0545e73173215ab1ea41a5cf417f9acca
Latest production deployment: dpl_FET94cR9TGb3qruoMN3X3mMUZNK2
Custom domain: crm.mercurycalldesk.com
/api/status: production, main, commit efe406c0545e73173215ab1ea41a5cf417f9acca
```

Current safety boundary:

```txt
No secret values were inspected or recorded.
No local process wrote directly to Neon/Postgres.
No schema changes were introduced in PR #36 through PR #47.
No feature flags were changed in PR #36 through PR #47.
No GHL workflow activation occurred.
No live GHL API calls were introduced by the controlled harness.
No imports, payouts, servicing, commissions, finance actions, or client onboarding were enabled.
GHL workflow activation, Servicing, Commissions, and Finance remain gated.
```

## Approved open-source CRM reuse direction

Hamilton approved the open-source reuse direction on 2026-07-09.

```txt
Approve Mercury CRM as the base.
Approve NextCRM as primary code-reference/source-mining repo.
Approve OpenCRM as lightweight UI and agent-mode reference.
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

## Execution boundary

Controlled test data, the controlled GHL event harness, and acceptance evidence integration are now deployed. Broad live feature expansion remains paused until authenticated production acceptance is recorded and owner decision is captured.

```txt
Current coding sequence:
1. Controlled Test Data Foundation. DONE in PR #45.
2. Controlled GHL Event Harness. DONE in PR #46.
3. Acceptance Evidence Integration. DONE in PR #47.
4. OpenCRM-inspired agent-friendly UI mode. NEXT.
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

```txt
PR #34 — feat(leads): align cold lead workspace with two-way-contact claim rules
Merge commit: 487ff615170f2c9530da61e477935d969d814e69
Production deployment: dpl_Hwq4jTsjmpdjJ8AmMffe8hYDAL9o
State: READY

PR #35 — feat(ops): add deployment status endpoint and smoke checklist
Merge commit: 85241b306e9799983226450a6876e71e52665995
Production deployment: dpl_DysALSqTjpxL9HjVV696tXFrwNaa
State: READY

PR #36 — feat(leads): add production acceptance board
Merge commit: 23fef7ba6da8bc55fc6789d0f7c342f87488f818
Production deployment: dpl_D7FKurVxw7FURpoe9g8SdNFJLrWV
State: READY

PR #37 — feat(admin): wire readiness to production lead acceptance
Merge commit: e42ec797ac3db2fb70aea76a41e899080105e69d
Production deployment: dpl_7hGG8cpY2PCb6TEZyzwcKDuwctw1
State: READY

PR #38 — fix(leads): treat status commit as acceptance baseline
Merge commit: fd00ac36f46ff68da0833cd12bc8cf56743c3353
Production deployment: dpl_4SeTvkSLtvzPSBZ8msa4oXCjxGCm
State: READY

PR #39 — feat(admin): show acceptance outcomes in audit evidence
Merge commit: ce8f41565d8cbad60f3a6158b5b5c26bd5691d8e
Production deployment: dpl_5hatvT92UEQWqoE2m8HXjooqGMCL
State: READY

PR #40 — feat(leads): add production acceptance report exports
Merge commit: ed41e5ccc3b103ca91387f9556c31fd7e9056036
Production deployment: dpl_7d6XEke2AM35Yxz4PXk6ZPKLnDPi
State: READY

PR #41 — feat(leads): add production acceptance report page
Merge commit: 6d1e43efe418548004f079afac42b0d949fc7ba8
Production deployment: dpl_7cpza67E9eSdxZ2VRqLqTH3xQ4EH
State: READY

PR #42 — feat(admin): wire Lead acceptance report navigation
Merge commit: 895e8d23e8f4664db490833562da6542c3b88c5c
Production deployment: dpl_6PE3NdiYMpU3Mbfg8No8TgZijVkd
State: READY

PR #43 — refactor(leads): share production acceptance model on board
Merge commit: edffe63920def161740be2fab2408c23c34d6e87
Production deployment: dpl_8zMYPcmSjtoiK3cp3Lg47xPbXhNJ
State: READY

PR #44 — feat(leads): add aging sweep dry-run preview
Merge commit: 5965cc58cd009cb0c518e3e855355e15099d29a1
Production deployment: dpl_6FzQ3zXJyNTtMaSEn49pEYXFFnJ4
State: READY

PR #45 — feat(leads): add controlled test data foundation
Head before merge: 2a7cdcca3f220c7cc1073377bec37dfe262bbca5
Merge commit: a52e072a5d173a59750a94eb6cbb42e772165f14
Preview deployment: dpl_5Mt2mGKzYNPrMUKfx4tBN6P13jdT
Production deployment: dpl_GxcBthxFyCgtG61oLLHA2vDGFkES
State: READY

PR #46 — feat(integrations): add controlled GHL event harness
Head before merge: 870ea65579ebe0c46afaafd35cba05b350fd8162
Merge commit: a0aadedd6111340cfde92760e23efa55fc61a8a9
Preview deployment: dpl_AAKn2oHLSJBcRw5W3ddcHXjzyMWB
Production deployment: dpl_5dUWRus7x4rextXn3cYUBrF1Ggd4
State: READY

PR #47 — feat(leads): integrate controlled acceptance evidence
Head before merge: 6003a32b0386981aa5f8e231085e49913475daec
Merge commit: efe406c0545e73173215ab1ea41a5cf417f9acca
Preview deployment: dpl_7qH6wDzM97C32cEDD6tkcwBzgCJg
Production deployment: dpl_FET94cR9TGb3qruoMN3X3mMUZNK2
State: READY
```

## Latest production verification

```txt
Custom domain: crm.mercurycalldesk.com
Latest /api/status -> 200, production, main, commit efe406c0545e73173215ab1ea41a5cf417f9acca
/admin/leads/testing -> sign-in boundary, not 404/500
/admin/leads/acceptance-report -> sign-in boundary, not 404/500
/api/admin/leads/acceptance-report -> sign-in boundary, not 404/500
/api/admin/leads/acceptance-report.csv -> sign-in boundary, not 404/500
/api/admin/leads/aging-preview -> sign-in boundary, not 404/500
/admin/leads/controlled-test-data -> sign-in boundary, not 404/500
/admin/integrations/test-events -> sign-in boundary, not 404/500
/api/cron/leads/aging -> 401 Unauthorized without Authorization
/api/cron/leads/aging?dryRun=true -> 401 Unauthorized without Authorization
```

## Current controlled test plan

Confirmed:

```txt
1. PR #34 through PR #47 are merged to main and deployed READY.
2. /api/status works on crm.mercurycalldesk.com and reports commit efe406c0545e73173215ab1ea41a5cf417f9acca.
3. Protected admin/portal routes resolve to sign-in instead of 404/500 when unauthenticated.
4. Controlled test data foundation exists at /admin/leads/controlled-test-data.
5. Controlled GHL event harness exists at /admin/integrations/test-events.
6. Controlled acceptance evidence is integrated into /admin/leads/acceptance-report, JSON report, and CSV export.
7. Controlled GHL harness only accepts PR #45 controlled test Leads.
8. Production Neon first batch remains expected COLD / AVAILABLE state unless separately changed by authenticated acceptance testing.
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
8. Confirm controlled GHL appointment events do not mutate suppressed/DNC Leads.
9. Confirm controlled GHL appointment cancellation/no-show creates or expedites one owner callback.
10. Confirm controlled GHL Opportunity Won/Lost cancels scheduled callbacks on terminal outcomes.
11. Confirm controlled GHL Opportunity Lost does not roll back Closed Won.
12. Confirm DNC suppresses and cancels callbacks.
13. Review aging sweep dry-run output and controlled data behavior.
14. Record owner production decision before expanding normal Lead Flow use.
```

## Next approved scope

```txt
1. OpenCRM-inspired agent-friendly UI mode.
2. NextCRM-inspired activity/audit UX improvements.
```

Agent-friendly UI mode is now the next approved coding scope. Live GHL workflow activation, Servicing, Commissions, and Finance work remain gated.

## Explicitly out of scope without separate approval

```txt
Storing provider identity or commercial records in MiniCRM.
Scraping, fetching, embedding, or ingesting Google Maps/review content.
Auto-enabling GHL workflows, servicing, commission, or finance feature flags.
Additional live import/submit/export without a run-specific owner approval reference.
Additional production data changes outside explicit controlled-test actions.
Recording secrets, contact payloads, signed headers, raw source files, customer PII, tax IDs, or payment data in GitHub/My-Workspace.
Copying Twenty code or vendoring Twenty files without explicit license review.
```

## Acceptance gates

PR #34 through PR #47 are merged and deployed. The latest production deployment is READY, the custom domain is on the latest production commit, unauthenticated custom-domain smoke checks passed, controlled test data, the controlled GHL event harness, and acceptance evidence integration are deployed, and the open-source CRM reuse direction is approved. Broader live lead operations, authenticated business-rule acceptance, external GHL workflow activation, Servicing, Commissions, and Finance remain gated until separately approved and tested.

## Supporting daily logs and planning docs

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[G] Open Source CRM Reuse Assessment — 2026-07-09.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR40 Acceptance Report Exports.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR41 Acceptance Report Page.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR42 Lead Acceptance Navigation.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR43 Shared Acceptance Model.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR44 Aging Dry Run Preview.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR45 Controlled Test Data Foundation.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR46 Controlled GHL Event Harness.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR47 Acceptance Evidence Integration.md
```
