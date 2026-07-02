# My Workspace

A GitHub-based workspace for active project handoffs, daily logs, and operating context.

## Start Here

Read in this order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
Current project files listed in the applicable project section
```

## Current Active Focus

### Benny & Penny's Adventures

The customer portal, digital delivery, gifting, readable-slot controls, Google Places address work, checkout safeguards, email DNS, and cart-recovery foundations are built. Current focus is final end-to-end recovery validation, replacement of placeholder product assets and digital files, policy copy, inbox placement, and LuLu research.

Read first:

```txt
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

### Benny & Penny's Adventures Book Series

The 10-book production kit is the canonical source of truth. The series is still in drafting/production preparation; do not treat “cover-ready” labels as finished deliverables.

Read first:

```txt
02 Projects/Benny & Penny's Adventures Book Series/[C] AI Index & Commands.md
02 Projects/Benny & Penny's Adventures Book Series/README.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/00-OFFICIAL-CATALOG.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md
```

### bennyandpenny.com — Portfolio

Hamilton's separate technology portfolio and public brand site. The shared WCAG program remains active; current validation is real-device share-card testing and accessibility verification.

Read first:

```txt
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
01 Daily Logs/[C] 2026-06-20 Portfolio Mobile Chrome Share Preview Fix.md
```

### MCD - Mercury Call Desk

The sales-partner program and brand/onboarding work. This project is separate from the MiniCRM codebase.

Read first:

```txt
02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md
02 Projects/MCD - Mercury Call Desk/MCD - Mercury Call Desk Overview.md
02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/00_READ_ME_FIRST.md
```

### MCD CRM - Agent and Admin Portals

Secure MiniCRM for agent workflow and Admin oversight. GoHighLevel remains a private backend; agents do not receive GHL access.

#### Current build status — 2026-07-02

```txt
Phase 1 onboarding: validated in production end to end with a controlled partner.
Admin: account, onboarding, activation, last-login, certification, and lead-access status are visible; repeat approval/e-sign action is prevented.
Partner portal: sidebar is live with Dashboard, Tasks, Inbox, Leads, Proposals, Schedule, Training, Resources, Settings, theme toggle, and Sign Out.
Schedule: GHL booking lifecycle relays are validated for Booked, Confirmed, Cancelled, No-show, Completed, and Rescheduled.
Schedule timezone: source timezone is preserved; the portal displays appointments in the signed-in viewer's browser/device timezone.
Meet links: shown only for Scheduled and Confirmed appointments.
Company / Legal Entity Name: optional field supported separately from the individual legal signer.
Tasks: callback queue deployment is underway.
```

#### Current lead-pool conventions

```txt
Cold Pool / Prospects: fresh scraped and validated business leads.
Nurture / Marketing Email Pool: branded email campaign leads.
Hot Leads: a prospect replying to email or demonstrating active intent; remove from nurture and route for human follow-up.
Open Pool: booked-demo no-shows and other records eligible for controlled release.
Shark Tank: stalled prospects carrying active 30–90-day proposal/contract-priced quotes.
Referral: protected self-sourced/referral record.
House: company-controlled or reassigned record.
```

#### Read first

```txt
01 Daily Logs/[C] 2026-07-02 MCD CRM Portal Schedule and Lead Pool Progress.md
01 Daily Logs/[C] 2026-07-02 MCD CRM Admin Operations Status.md
01 Daily Logs/[C] 2026-07-01 MCD CRM Phase 1 End-to-End Onboarding Validated.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] AI Handoff & Scope Review.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] GHL Production Build-Out Runbook.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Implementation Status — 2026-07-01.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] v1.2 Business-Terms Reconciliation & GHL Flows.md
```

#### Next scope

1. Verify the callback Task workspace deployment.
2. Build controlled Lead Management: import/review, assignment, activities, notes, dispositions, callbacks, and DNC/suppression handling.
3. Implement Cold Pool, Nurture, Hot Leads, Open Pool, Shark Tank, Referral, and House rules in the MiniCRM without weakening lead ownership protections.
4. Safely map GHL Demo Booked handoff after lead ownership and appointment context are ready.
5. Create GHL attribution fields before Phase 2 payment, opportunity, invoice, and servicing relays.

## Workspace rules

- Keep every business and codebase separate.
- Never commit secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
- Use `[C]` in AI-authored file names unless Hamilton directs otherwise.
- GHL is backend-only for MCD; never surface its pricing, other-client data, or links to agents.
- Keep active handoffs concise; use daily logs for dated detail and history.
