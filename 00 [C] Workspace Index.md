# Workspace Index

Updated: 2026-07-02

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
Admin operations: deployed.
Partner portal and read-only GHL-backed schedule: deployed.
Appointment lifecycle relay: booked, confirmed, cancelled, no-show, completed, and rescheduled validated.
Lead and Task modules: staged/feature-gated until the lead-foundation migration and controlled tests are complete.
Local lead operations: final Claude scope is established for local staging/research/preview and signed MiniCRM export. No direct Neon access.
```

### Local lead operation rules

```txt
Allowed inputs: user-provided files, referrals, web forms, PPC leads, approved/licensed provider data, owned-account exports, and permitted business-website research.
Blocked: directory/social scraping, browser/headless/anti-bot bypasses, direct Neon writes, SMTP mailbox probing, and provider-limit circumvention.
Pools: Cold, Nurture, Hot Leads, Open Pool, Shark Tank, Referral, House.
Sources: Google Maps, Instagram, Referral, PPC, Email, SMS, LinkedIn, Web Form, Facebook, Other.
Original source is immutable. Intake method, campaign, pool, lifecycle, owner, suppression, quote, and website opportunity are separate.
```

### Read next

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Foundation Design Addendum.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Management Scope Review and Build Plan.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Pool and Source Taxonomy.md
01 Daily Logs/[C] 2026-07-02 MCD Local Lead Operations Scope Finalized.md
01 Daily Logs/[C] 2026-07-02 MCD CRM Portal Schedule and Lead Pool Progress.md
01 Daily Logs/[C] 2026-07-02 MCD CRM Admin Operations Status.md
01 Daily Logs/[C] 2026-07-01 MCD CRM Phase 1 End-to-End Onboarding Validated.md
Repo: hpintojr/crm.mcd
```

### Current next actions

```txt
1. Claude builds local Phase A: CLI, SQLite staging, permitted import adapters, policy engine, preview reports, manifests, and synthetic tests.
2. MiniCRM builds the lead-import API, server-side duplicate/suppression checks, audit, Admin review, and reconciliation.
3. Apply lead-foundation migration only after the API contract is ready.
4. Add proposal/quote records, including MCD package, website-only, and MCD-with-included-website paths.
5. Add approved provider event/reply routing after campaign safeguards and suppression webhooks are tested.
6. Add GHL Demo Booked handoff after ownership and appointment context are safely mapped.
```

## Workspace rules

```txt
Keep each business/codebase separate.
Use [C] for AI-authored files unless Hamilton says otherwise.
Never commit secrets, credentials, customer data, SSNs, tax data, or raw bank data.
Keep current handoffs concise; use daily logs for dated detail.
```