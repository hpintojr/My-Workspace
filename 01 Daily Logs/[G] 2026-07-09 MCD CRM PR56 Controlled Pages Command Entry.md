# MCD CRM — PR56 Controlled Pages Command Entry

**Date:** 2026-07-09  
**Owner:** ChatGPT  
**Repository:** `hpintojr/crm.mcd`  
**Pull Request:** `#56 — feat(leads): link command center from controlled acceptance pages`  
**Branch:** `pr-56-controlled-pages-command-entrypoints`  
**Head commit before merge:** `09b247fac6369b56bf87290aa14df4966869de48`  
**Merge commit:** `f4efb00ea08b7bd6d1cf506a64963237edb03969`  
**Base commit:** `4f445b0bdecfdc37c21ac045fc77b5d7525abeb3`  
**Preview deployment:** `dpl_3xz7T26aVnCz2wEvcNGPFzeo5dd5`  
**Production deployment:** `dpl_Cq4bUhNE8N8T3VC8dhnWucpuLcGp`  
**Custom domain:** `crm.mercurycalldesk.com`

## Scope delivered

```txt
PR #56 wires the Lead acceptance command center into the controlled acceptance pages.
```

Delivered:

```txt
- Added Command center link to /admin/leads/controlled-test-data.
- Added Command center link to /admin/integrations/test-events.
- Revalidates /admin/leads/acceptance-command-center when controlled test Leads are created.
- Revalidates /admin/leads/acceptance-command-center when controlled test Leads are archived.
- Revalidates /admin/leads/acceptance-command-center when controlled GHL simulations are applied.
- Extended lead-flow guard coverage for controlled acceptance page entrypoints.
```

## Safety boundary

```txt
Navigation/cache-refresh only.
No Prisma schema migration.
No Neon migration.
No feature flag changes.
No GHL workflow activation.
No live GHL API calls.
No live import/export submission.
No Lead ownership, claim, DNC, approval, suppression, or two-way-contact business-rule changes.
No Servicing, Commissions, Finance, payout, or client-onboarding activation.
```

## Verification

Preview verification:

```txt
Preview deployment: dpl_3xz7T26aVnCz2wEvcNGPFzeo5dd5
/api/status -> 200 OK
Environment: preview
Branch: pr-56-controlled-pages-command-entrypoints
Commit: 09b247fac6369b56bf87290aa14df4966869de48
/admin/leads/controlled-test-data -> sign-in boundary when unauthenticated, not 404/500
/admin/integrations/test-events -> sign-in boundary when unauthenticated, not 404/500
Build log confirmed:
- all guard scripts passed
- Lead flow alignment guard passed
- Prisma Client generated
- Next.js compiled successfully
- type checking passed
```

Production verification:

```txt
Production deployment: dpl_Cq4bUhNE8N8T3VC8dhnWucpuLcGp
Custom domain: crm.mercurycalldesk.com
/api/status -> 200 OK
Environment: production
Branch: main
Commit: f4efb00ea08b7bd6d1cf506a64963237edb03969
/admin/leads/controlled-test-data -> sign-in boundary when unauthenticated, not 404/500
/admin/integrations/test-events -> sign-in boundary when unauthenticated, not 404/500
```

## Current state after PR56

```txt
PR #34 through PR #56 are merged to main and deployed READY.
Latest production commit: f4efb00ea08b7bd6d1cf506a64963237edb03969
Latest production deployment: dpl_Cq4bUhNE8N8T3VC8dhnWucpuLcGp
```

## Remaining gated work

```txt
Authenticated production acceptance remains recommended before broader live Lead Flow use.
Owner production decision should be recorded before expanding normal Lead Flow use.
Live GHL workflow activation remains gated.
Servicing, Commissions, and Finance remain gated.
```
