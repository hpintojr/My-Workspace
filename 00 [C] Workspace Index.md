# Workspace Index

Updated: 2026-07-07

## First read

```txt
1. README.md
2. 00 [C] Workspace Index.md
3. CLAUDE.md
4. Current project files listed below
```

## Portfolio

```txt
Project: bennyandpenny.com
Repository: hpintojr/bennyandpenny
Read next:
- 02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
- 02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
```

## Adventures Store

```txt
Project: bennyandpennyadventures.com
Repository: hpintojr/bennyandpennyadventures
Read next:
- 02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
- 02 Projects/Benny & Penny's Adventures/[C] Accessibility WCAG 2.2 AA Handoff.md
```

## Book Series

```txt
02 Projects/Benny & Penny's Adventures Book Series/[C] AI Index & Commands.md
02 Projects/Benny & Penny's Adventures Book Series/README.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/00-OFFICIAL-CATALOG.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md
```

## MCD - Mercury Call Desk

The agent program and brand/onboarding work. Do not disclose the underlying vendor, confidential pricing, or commission math.

```txt
02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md
02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/00_READ_ME_FIRST.md
```

## MCD CRM - Agent and Admin Portals

MiniCRM is the system of record for agent onboarding, lead ownership, compliance, source lineage, and later service/finance. GHL is backend-only; agents never receive GHL access.

### Current status

```txt
Phase 1 onboarding: production-validated.
Admin operations, partner portal, and read-only GHL-backed schedule: deployed.
The July dynamic-route servicing incident is fixed and protected by an automated route-collision guard.

Phase D lead import: PR #32 was reviewed by Claude and merged to production as squash d25ac9f.
Production Vercel is green. The signed import API and read-only Admin reconciliation screens are live.
Production Neon counts are still zero for LeadImportBatch, LeadImportRow, Lead, LeadActivity, and import-related AuditLog.
No live import has run.

Vercel presence evidence confirms LEAD_IMPORT_KEY_ID and LEAD_IMPORT_HMAC_SECRET exist for Preview and Production.
The matching local mcd_lead_ops variables and the first approved local run remain the active gate.

Current execution holder: ChatGPT, post-merge verification and first supervised-export readiness.
```

### Read next

```txt
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md
01 Daily Logs/[C] 2026-07-07 Reviewed and Merged PR 32 to Production Lock Released.md
01 Daily Logs/[G] 2026-07-07 MCD CRM Post-Merge Export Readiness.md
Repo: hpintojr/crm.mcd
Repo: mcd_lead_ops (local only, D:\GitHub\mcd_lead_ops)
```

### Current next actions

```txt
1. On the local mcd_lead_ops machine, confirm MCD_LEAD_IMPORT_KEY_ID,
   MCD_LEAD_IMPORT_HMAC_SECRET, and MINICRM_API_BASE_URL are present. Do not disclose values.
2. Select a small permitted run that has completed preview and explicit operator approval.
3. Run one supervised: mcd-leads export --run <approved-run-id>.
4. Log only batch ID, aggregate counts, final status, and non-sensitive reconciliation results.
5. ChatGPT verifies resulting production batch, lead, activity, and audit evidence read-only.
6. Then continue the post-Phase-D 13-layer backlog: preview/production separation, RLS/runtime role,
   error tracking, authorized login smoke testing, and Neon autoscaling headroom.
```

## Workspace rules

```txt
Keep each business/codebase separate.
Use [C] for AI-authored files unless Hamilton says otherwise; ChatGPT-authored daily logs use [G].
Never commit secrets, credentials, customer data, SSNs, tax data, or raw bank data.
This repo (hpintojr/My-Workspace on GitHub) is the single source of truth -- not just the local
D:\GitHub\My Workspace folder. If local shows unresolved conflict markers, GitHub wins; reconcile
the local copy from it rather than committing markers.
```