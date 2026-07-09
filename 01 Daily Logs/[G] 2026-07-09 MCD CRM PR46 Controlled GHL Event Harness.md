# MCD CRM — PR46 Controlled GHL Event Harness

**Date:** 2026-07-09  
**Owner:** ChatGPT  
**Repository:** `hpintojr/crm.mcd`  
**Pull Request:** `#46 — feat(integrations): add controlled GHL event harness`  
**Branch:** `pr-46-controlled-ghl-event-harness`  
**Head commit before merge:** `870ea65579ebe0c46afaafd35cba05b350fd8162`  
**Merge commit:** `a0aadedd6111340cfde92760e23efa55fc61a8a9`  
**Base commit:** `a52e072a5d173a59750a94eb6cbb42e772165f14`  
**Preview deployment:** `dpl_AAKn2oHLSJBcRw5W3ddcHXjzyMWB`  
**Production deployment:** `dpl_5dUWRus7x4rextXn3cYUBrF1Ggd4`  
**Custom domain:** `crm.mercurycalldesk.com`

## Scope delivered

```txt
PR #46 implements the Controlled GHL Event Harness blocker.
```

Delivered:

```txt
- Added admin-only controlled harness page at /admin/integrations/test-events.
- Added JSON harness API at /api/admin/integrations/test-events.
- Added preview and apply modes.
- Added controlled-only simulation core in src/lib/controlled-ghl-test-events.ts.
- Supported appointment simulations: booked, confirmed, rescheduled, cancelled, no-show.
- Supported opportunity simulations: won, lost.
- Required PR #45 controlled-test Lead markers before any simulation can run.
- Rejected live/customer Leads from the harness path.
- Wrote immutable CONTROLLED_GHL_TEST_EVENT_APPLIED audit evidence on applied simulations.
- Linked the harness from /admin/integrations.
- Updated acceptance steps 15 and 16 to use /admin/integrations/test-events.
- Extended lead-flow guard coverage.
```

## Harness marker contract

```txt
Harness phase: CONTROLLED_GHL_HARNESS_20260709
Apply audit action: CONTROLLED_GHL_TEST_EVENT_APPLIED
Entity type: ControlledGhlTestEvent
Supported appointment events:
- APPOINTMENT_BOOKED
- APPOINTMENT_CONFIRMED
- APPOINTMENT_RESCHEDULED
- APPOINTMENT_CANCELLED
- APPOINTMENT_NO_SHOW
Supported opportunity events:
- OPPORTUNITY_WON
- OPPORTUNITY_LOST
```

## Safety boundary

```txt
No Prisma schema migration.
No Neon migration.
No feature flag changes.
No GHL workflow activation.
No live GHL API calls.
No live import/export submission.
No Servicing, Commissions, Finance, payout, or client-onboarding activation.
Harness only accepts controlled test Leads created/marked by PR #45.
```

## Verification

Preview verification:

```txt
Vercel check for head commit 870ea65579ebe0c46afaafd35cba05b350fd8162: success.
Preview deployment: dpl_AAKn2oHLSJBcRw5W3ddcHXjzyMWB
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
Branch: pr-46-controlled-ghl-event-harness
Commit: 870ea65579ebe0c46afaafd35cba05b350fd8162
/admin/integrations/test-events -> sign-in boundary when unauthenticated, not 404/500
```

Production verification:

```txt
Production deployment: dpl_5dUWRus7x4rextXn3cYUBrF1Ggd4
Custom domain: crm.mercurycalldesk.com
/api/status -> 200 OK
Environment: production
Branch: main
Commit: a0aadedd6111340cfde92760e23efa55fc61a8a9
/admin/integrations/test-events -> sign-in boundary when unauthenticated, not 404/500
```

## Build issue fixed during PR

```txt
Initial preview failed on a TypeScript event-type mismatch in /api/admin/integrations/test-events.
Fix commit: 870ea65579ebe0c46afaafd35cba05b350fd8162
Result: Vercel success.
```

## Remaining gated work

```txt
PR #47 — Acceptance Evidence Integration remains next.
OpenCRM-inspired UI mode and NextCRM-inspired audit/activity UX remain deferred until acceptance evidence integration is completed.
Live GHL workflow activation remains gated.
Servicing, Commissions, and Finance remain gated.
```
