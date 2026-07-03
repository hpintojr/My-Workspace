# My Workspace

A GitHub-based workspace for active project handoffs, daily logs, operating context, and project-control documentation.

## Start Here

```txt
1. README.md
2. 00 [C] Workspace Index.md
3. CLAUDE.md
4. Current project-control and handoff files listed below
```

## Current Active Focus

### Benny & Penny's Adventures

The customer portal, digital delivery, gifting, readable-slot controls, Google Places address work, checkout safeguards, email DNS, and cart-recovery foundations are built. Active work is recovery validation, actual product assets/files, policy copy, inbox placement, and LuLu research.

```txt
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

### Benny & Penny's Adventures Book Series

The 10-book production kit is canonical. The series remains in drafting/production preparation.

```txt
02 Projects/Benny & Penny's Adventures Book Series/[C] AI Index & Commands.md
02 Projects/Benny & Penny's Adventures Book Series/README.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/00-OFFICIAL-CATALOG.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md
```

### bennyandpenny.com — Portfolio

Hamilton's separate technology portfolio and public brand site. The accessibility program and real-device share-card validation remain active.

```txt
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
```

### MCD - Mercury Call Desk

The sales-partner program and brand/onboarding work. This project is separate from the MiniCRM codebase.

```txt
02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md
02 Projects/MCD - Mercury Call Desk/MCD - Mercury Call Desk Overview.md
02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/00_READ_ME_FIRST.md
```

### MCD CRM - Agent and Admin Portals

**My-Workspace is the project-control and full-scope source of truth.** `hpintojr/crm.mcd` is the separate implementation repository and live application source. The MiniCRM remains the permanent system of record; GHL is backend-only and agents do not receive GHL access.

#### Current rebuild control — 2026-07-03

```txt
Project control / scope: hpintojr/My-Workspace
Implementation / live app: hpintojr/crm.mcd
Hosting: Vercel crm-mcd
Database: Neon mcd-crm-production
Local lead operations: D:\GitHub\mcd_lead_ops, separate local repository

Recovery: crm.mcd/main still has the [id] / [leadId] route collision.
Known-good recovery candidate: recovery/e59-route-fix.

Lead baseline: Neon contains core Lead tables and taxonomy fields.
Remaining lead-foundation scope: multi-contact support, import batches/rows,
channel contactability/suppression, campaign-event history, proposals/quotes,
and the secure signed import API required by mcd_lead_ops.

Feature gates remain disabled until each dedicated Preview and acceptance gate passes.
```

#### Read first

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[C] Project Control, Scope Reconciliation & Rebuild Plan.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Foundation Design Addendum.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Management Scope Review and Build Plan.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Pool and Source Taxonomy.md
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
01 Daily Logs/[C] 2026-07-03 MCD CRM Scope Reconciliation and Rebuild Control.md
```

#### Rebuild sequence

```txt
1. Accept recovery/e59-route-fix through the documented Preview tests.
2. Reconcile the live lead schema with the locked full scope in a dedicated design branch.
3. Build and test the signed import-batch API.
4. Connect mcd_lead_ops only after API acceptance, using HMAC and idempotency.
5. Build Agent workflow, campaign event/reply routing, proposals, and controlled GHL handoff in separate accepted tracks.
6. Keep servicing, commissions, finance, and all production external actions gated until their own release criteria pass.
```

## Workspace rules

- Keep every business and codebase separate.
- Never commit secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
- Use `[C]` in AI-authored file names unless Hamilton directs otherwise.
- GHL is backend-only for MCD; never surface its pricing, other-client data, or links to agents.
- Keep active handoffs concise; use daily logs for dated detail and history.
