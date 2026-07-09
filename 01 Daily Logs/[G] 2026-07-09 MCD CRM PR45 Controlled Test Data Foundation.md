# MCD CRM — PR45 Controlled Test Data Foundation

**Date:** 2026-07-09  
**Owner:** ChatGPT  
**Repository:** `hpintojr/crm.mcd`  
**Pull Request:** `#45 — feat(leads): add controlled test data foundation`  
**Branch:** `pr-45-controlled-test-data`  
**Head commit:** `2a7cdcca3f220c7cc1073377bec37dfe262bbca5`  
**Base commit:** `5965cc58cd009cb0c518e3e855355e15099d29a1`  
**Preview deployment:** `dpl_5Mt2mGKzYNPrMUKfx4tBN6P13jdT`  
**Preview URL:** `crm-dzk24xra4-hamiltons-projects-f65eeb81.vercel.app`

## Scope delivered

```txt
PR #45 implements the Controlled Test Data Foundation blocker.
```

Delivered:

```txt
- Added controlled-test Lead marker contract in `src/lib/controlled-test-leads.ts`.
- Added admin page `/admin/leads/controlled-test-data`.
- Added read-only JSON summary `/api/admin/leads/controlled-test-data`.
- Added create action for synthetic COLD / AVAILABLE controlled test Leads.
- Added archive action for controlled test Leads after acceptance use.
- Added immutable Lead activity and admin AuditLog evidence for create/archive actions.
- Linked controlled test data from `/admin/leads/testing`.
- Extended `scripts/check-lead-flow-alignment.ts` guard coverage.
```

## Marker contract

```txt
Controlled source: MCD_CONTROLLED_TEST_DATA
Controlled campaign: MCD Controlled Test Data
Controlled campaign external ID: MCD_CONTROLLED_TEST_NO_GHL_EXPORT
Source reference prefix: mcd-controlled-test:
Create audit action: LEAD_CONTROLLED_TEST_CREATED
Archive audit action: LEAD_CONTROLLED_TEST_ARCHIVED
```

## Safety boundary

```txt
No Prisma schema migration.
No Neon migration.
No feature flag changes.
No GHL workflow activation.
No live import/export submission.
No Servicing, Commissions, Finance, payout, or client-onboarding activation.
No Twenty code copied.
Controlled Leads use synthetic 555 test phone numbers.
GHL export is blocked by default through controlled source/campaign markers.
```

## Verification

```txt
Vercel check for head commit 2a7cdcca3f220c7cc1073377bec37dfe262bbca5: success.
Build log confirmed:
- all guard scripts passed
- Lead flow alignment guard passed
- Prisma Client generated
- Next.js compiled successfully
- type checking passed
```

Preview smoke:

```txt
/api/status -> 200 OK
Environment: preview
Branch: pr-45-controlled-test-data
Commit: 2a7cdcca3f220c7cc1073377bec37dfe262bbca5
/admin/leads/controlled-test-data -> sign-in boundary when unauthenticated, not 404/500
```

## Build issue fixed during PR

```txt
Initial preview failed on a TypeScript null-narrowing issue in the controlled-test archive action.
Fix commit: 2a7cdcca3f220c7cc1073377bec37dfe262bbca5
Result: Vercel success.
```

## Remaining gated work

```txt
PR #46 — Controlled GHL Event Harness remains next.
PR #47 — Acceptance Evidence Integration remains after the harness.
OpenCRM-inspired UI mode and NextCRM-inspired audit/activity UX remain deferred until the controlled data + GHL harness blockers are complete.
```
