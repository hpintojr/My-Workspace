# MCD CRM — PR47 Acceptance Evidence Integration

**Date:** 2026-07-09  
**Owner:** ChatGPT  
**Repository:** `hpintojr/crm.mcd`  
**Pull Request:** `#47 — feat(leads): integrate controlled acceptance evidence`  
**Branch:** `pr-47-acceptance-evidence-integration`  
**Head commit before merge:** `6003a32b0386981aa5f8e231085e49913475daec`  
**Merge commit:** `efe406c0545e73173215ab1ea41a5cf417f9acca`  
**Base commit:** `a0aadedd6111340cfde92760e23efa55fc61a8a9`  
**Preview deployment:** `dpl_7qH6wDzM97C32cEDD6tkcwBzgCJg`  
**Production deployment:** `dpl_FET94cR9TGb3qruoMN3X3mMUZNK2`  
**Custom domain:** `crm.mercurycalldesk.com`

## Scope delivered

```txt
PR #47 implements the Acceptance Evidence Integration blocker.
```

Delivered:

```txt
- Added shared controlled evidence summary in src/lib/acceptance-evidence-summary.ts.
- Added PR #45 controlled test data counts and audit evidence to /api/admin/leads/acceptance-report.
- Added PR #46 controlled GHL harness counts and applied simulation evidence to /api/admin/leads/acceptance-report.
- Added controlled acceptance evidence section to /admin/leads/acceptance-report.
- Added links from the report to /admin/leads/controlled-test-data and /admin/integrations/test-events.
- Added controlled evidence summary and evidence rows to /api/admin/leads/acceptance-report.csv.
- Extended lead-flow guard coverage for the evidence model, JSON report, report page, and CSV export.
```

## Evidence included

```txt
Controlled test data:
- Total controlled Leads
- Active controlled Leads
- Archived controlled Leads
- Recent LEAD_CONTROLLED_TEST_CREATED audit evidence
- Recent LEAD_CONTROLLED_TEST_ARCHIVED audit evidence

Controlled GHL harness:
- Recent CONTROLLED_GHL_TEST_EVENT_APPLIED audit evidence
- Safe metadata only: phase, family, eventType, leadId, simulatedOnly, liveGhlWorkflowActivated, liveGhlExportSubmitted
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
CSV export still writes only the existing immutable export audit event.
```

## Verification

Preview verification:

```txt
Vercel check for head commit 6003a32b0386981aa5f8e231085e49913475daec: success.
Preview deployment: dpl_7qH6wDzM97C32cEDD6tkcwBzgCJg
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
Branch: pr-47-acceptance-evidence-integration
Commit: 6003a32b0386981aa5f8e231085e49913475daec
/admin/leads/acceptance-report -> sign-in boundary when unauthenticated, not 404/500
```

Production verification:

```txt
Production deployment: dpl_FET94cR9TGb3qruoMN3X3mMUZNK2
Custom domain: crm.mercurycalldesk.com
/api/status -> 200 OK
Environment: production
Branch: main
Commit: efe406c0545e73173215ab1ea41a5cf417f9acca
/admin/leads/acceptance-report -> sign-in boundary when unauthenticated, not 404/500
```

## Remaining gated work

```txt
PR #48 — OpenCRM-inspired agent-friendly UI mode is next.
NextCRM-inspired activity/audit UX remains after agent-friendly UI mode.
Live GHL workflow activation remains gated.
Servicing, Commissions, and Finance remain gated.
```
