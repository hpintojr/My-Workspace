# MCD CRM — PR48 Agent Friendly UI Mode

**Date:** 2026-07-09  
**Owner:** ChatGPT  
**Repository:** `hpintojr/crm.mcd`  
**Pull Request:** `#48 — feat(leads): add agent-friendly workspace mode`  
**Branch:** `pr-48-agent-friendly-ui-mode`  
**Head commit before merge:** `38cc04f3a7d0ab08fcbba6c09876fcddf3397f01`  
**Merge commit:** `e449d2ec77e507e41f7874aa556158f5ccc470a5`  
**Base commit:** `efe406c0545e73173215ab1ea41a5cf417f9acca`  
**Preview deployment:** `dpl_J96FHNj9RYp5fLunS2gxua1qGWBv`  
**Production deployment:** `dpl_BbMyamvsRWQeCHFYLou7mQ16eYUA`  
**Custom domain:** `crm.mercurycalldesk.com`

## Scope delivered

```txt
PR #48 implements the OpenCRM-inspired agent-friendly UI mode.
```

Delivered:

```txt
- Added `mode=agent` option to /portal/leads.
- Added Agent-friendly mode toggle card.
- Added larger click targets when agent-friendly mode is enabled.
- Added always-visible row actions for Cold Leads and owned records.
- Added Review action for Cold Leads and owned records.
- Added Disposition/Outcome action links for Cold Leads and owned records.
- Added semantic labels for operator/AI-assisted workflows:
  - data-agent-surface
  - data-agent-row
  - data-agent-action
- Preserved existing claim, DNC, click-to-call, ownership, and two-way-contact business rules.
- Extended lead-flow guard coverage for the agent-friendly UI contract.
```

## Safety boundary

```txt
No Prisma schema migration.
No Neon migration.
No feature flag changes.
No GHL workflow activation.
No live GHL API calls.
No live import/export submission.
No claim-rule changes.
No DNC-rule changes.
No ownership-rule changes.
No two-way-contact-rule changes.
No Servicing, Commissions, Finance, payout, or client-onboarding activation.
```

## Verification

Preview verification:

```txt
Vercel check for head commit 38cc04f3a7d0ab08fcbba6c09876fcddf3397f01: success.
Preview deployment: dpl_J96FHNj9RYp5fLunS2gxua1qGWBv
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
Branch: pr-48-agent-friendly-ui-mode
Commit: 38cc04f3a7d0ab08fcbba6c09876fcddf3397f01
/portal/leads?mode=agent -> sign-in boundary when unauthenticated, not 404/500
```

Production verification:

```txt
Production deployment: dpl_BbMyamvsRWQeCHFYLou7mQ16eYUA
Custom domain: crm.mercurycalldesk.com
/api/status -> 200 OK
Environment: production
Branch: main
Commit: e449d2ec77e507e41f7874aa556158f5ccc470a5
/portal/leads?mode=agent -> sign-in boundary when unauthenticated, not 404/500
```

## Remaining gated work

```txt
PR #49 — NextCRM-inspired activity/audit UX improvements is next.
Live GHL workflow activation remains gated.
Servicing, Commissions, and Finance remain gated.
```
