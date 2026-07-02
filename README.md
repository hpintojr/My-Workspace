# My Workspace

A GitHub-based workspace for active project handoffs, daily logs, and operating context.

## Start Here

```txt
1. README.md
2. 00 [C] Workspace Index.md
3. CLAUDE.md
4. Current project files listed below
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

Secure MiniCRM for agent workflow and Admin oversight. GoHighLevel remains a private backend; agents do not receive GHL access.

#### Current build state — 2026-07-02

```txt
Phase 1 onboarding: production-validated end to end with a controlled partner.
Admin: account, onboarding, activation, last-login, certification, and lead-access status are visible; repeat approval/e-sign action is prevented.
Partner portal: sidebar has Dashboard, Tasks, Inbox, Leads, Proposals, Schedule, Training, Resources, Settings, theme toggle, and Sign Out.
Schedule: GHL lifecycle relays are validated for Booked, Confirmed, Cancelled, No-show, Completed, and Rescheduled.
Schedule timezone: source timezone is preserved; the portal renders in the signed-in viewer's browser/device timezone.
Meet links: shown only for Scheduled and Confirmed appointments.
Company / Legal Entity Name: optional field separate from individual signer.
Lead/Task modules: staged and feature-gated. The production database does not yet contain lead, callback, note, activity, claim, suppression, import, or proposal tables.
Local lead operations: final scope is approved for a Claude-built local staging, research, preview, and signed MiniCRM-export workflow. It must not connect directly to Neon.
Local lead operations Phase A: built and tested at D:\GitHub\mcd_lead_ops (separate repo). CLI, SQLite staging, permitted adapters, policy engine, preview reports, tests. Daily 7:00 AM scheduled task runs intake+preview+website-review only; export always refuses until MiniCRM's import API exists.
```

#### Lead rules and source tracking

```txt
Pools: Cold Pool / Prospects, Nurture / Marketing Email Pool, Hot Leads, Open Pool, Shark Tank, Referral, House.
Sources: Google Maps, Instagram, Referral, PPC, Email, SMS, LinkedIn, Web Form, Facebook, Other.
Original source is permanent. Intake method, campaign, pool, lifecycle, owner, quote, and suppression are separate fields.
Allowed local inputs: user files, referrals, web forms, PPC leads, approved/licensed provider data, owned-account exports, and permitted business-website research.
No website listed requires review before becoming a verified no-website opportunity.
Website-only quotes are planned in the approved $500–$3,000 range with scope and expiry controls.
```

#### Read first

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Foundation Design Addendum.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Management Scope Review and Build Plan.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Pool and Source Taxonomy.md
01 Daily Logs/[C] 2026-07-02 MCD Local Lead Operations Scope Finalized.md
01 Daily Logs/[C] 2026-07-02 MCD CRM Portal Schedule and Lead Pool Progress.md
01 Daily Logs/[C] 2026-07-02 MCD CRM Admin Operations Status.md
01 Daily Logs/[C] 2026-07-01 MCD CRM Phase 1 End-to-End Onboarding Validated.md
01 Daily Logs/[C] 2026-07-02 mcd_lead_ops Phase A Build.md
```

#### Next scope

1. Point `mcd_lead_ops` (D:\GitHub\mcd_lead_ops, Phase A done) at a real recurring source config so the daily job has data to process.
2. Define and build the MiniCRM lead-import API contract, server-side validation, audit, suppression, Admin review, and reconciliation.
3. Apply and validate the lead-foundation database migration only after the API contract is ready.
4. Build proposal/quote records for MCD package, website-only, and MCD-with-included-website offers.
5. Add campaign event/reply routing and then controlled GHL Demo Booked handoff.

## Workspace rules

- Keep every business and codebase separate.
- Never commit secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
- Use `[C]` in AI-authored file names unless Hamilton directs otherwise.
- GHL is backend-only for MCD; never surface its pricing, other-client data, or links to agents.
- Keep active handoffs concise; use daily logs for dated detail and history.
