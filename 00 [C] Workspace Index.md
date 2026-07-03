# Workspace Index

Updated: 2026-07-03

## First read

```txt
1. README.md
2. 00 [C] Workspace Index.md
3. CLAUDE.md
4. Current project-control and handoff files
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

### Authority and boundaries

```txt
Project-control/full scope: hpintojr/My-Workspace
Implementation/live app: hpintojr/crm.mcd
Hosting: Vercel crm-mcd
Database: Neon mcd-crm-production
Local lead workspace: D:\GitHub\mcd_lead_ops

MiniCRM = system of record.
GHL = private backend only.
Local lead workspace = staging/research/approval/signed export only.
Local lead workspace must never connect directly to Neon/Postgres.
```

### Current technical status

```txt
Phase 1 onboarding: production-validated.
Appointment lifecycle relay: booked, confirmed, cancelled, no-show, completed, and rescheduled validated.

Recovery: crm.mcd/main has an [id] / [leadId] route collision.
Recovery candidate: recovery/e59-route-fix.

Neon: core Lead tables and lead taxonomy fields are present.
Remaining scope foundation: LeadContact, ImportBatch/ImportRecord, proposal/quote records,
channel-specific contactability/suppression, campaign-event/reply history, and signed import API.

Lead, campaigns, proposals, servicing, commissions, finance, and production external actions remain gated until their individual acceptance criteria pass.
```

### Read next

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[C] Project Control, Scope Reconciliation & Rebuild Plan.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Foundation Design Addendum.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Management Scope Review and Build Plan.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Pool and Source Taxonomy.md
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
01 Daily Logs/[C] 2026-07-03 MCD CRM Scope Reconciliation and Rebuild Control.md
```

### Current next actions

```txt
1. Use recovery/e59-route-fix as the recovery candidate; complete the required Preview verification.
2. Reconcile the live Lead implementation to the locked workspace scope in a no-migration design branch.
3. Define and test the HMAC-authenticated lead-import batch API before connecting mcd_lead_ops.
4. Connect one synthetic signed export only after the import API and Admin review workflow pass acceptance.
5. Build agent workflow, reply triage, proposals, and controlled GHL handoff in isolated milestones.
```

## Workspace rules

```txt
Keep each business/codebase separate.
Use [C] for AI-authored files unless Hamilton says otherwise.
Never commit secrets, credentials, customer data, SSNs, tax data, or raw bank data.
Keep current handoffs concise; use daily logs for dated detail.
```
