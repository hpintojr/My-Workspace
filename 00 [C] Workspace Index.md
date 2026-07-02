# Workspace Index

Updated: 2026-07-02

## First read

1. README.md
2. 00 [C] Workspace Index.md
3. CLAUDE.md
4. The current project files listed below

## Portfolio

Project: bennyandpenny.com  
Repository: hpintojr/bennyandpenny  
Branch: main

Read next:

```txt
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
01 Daily Logs/[C] 2026-06-21 Portfolio Chrome iOS Share Preview Follow-Up.md
01 Daily Logs/[C] 2026-06-20 Portfolio Mobile Chrome Share Preview Fix.md
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
```

## Adventures Store

Project: bennyandpennyadventures.com  
Repository: hpintojr/bennyandpennyadventures

Read next:

```txt
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
02 Projects/Benny & Penny's Adventures/[C] Accessibility WCAG 2.2 AA Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
```

## Book Series

The Benny & Penny's Adventures book-production kit is the source of truth for the ten-book print, digital, audio, and multilingual series.

Read next:

```txt
02 Projects/Benny & Penny's Adventures Book Series/[C] AI Index & Commands.md
02 Projects/Benny & Penny's Adventures Book Series/README.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/00-OFFICIAL-CATALOG.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md
```

## MCD - Mercury Call Desk

AI receptionist / call-desk platform using a confidential third-party platform base. The Sales Partner Launch Kit is the canonical onboarding package. Keep public/agent content free of confidential vendor, wholesale pricing, commission math, and non-approved claims.

Read next:

```txt
02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md
02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/00_READ_ME_FIRST.md
02 Projects/MCD - Mercury Call Desk/04-brand-assets/00_READ_ME_FIRST.md
```

Standing rules: no non-compete; confidentiality, IP, and approved non-solicit only. Do not disclose the underlying vendor.

## MCD CRM - Agent and Admin Portals

Mercury Call Desk MiniCRM is the production foundation for controlled agent onboarding, agent operations, lead ownership, compliance, and later finance/service operations. It is separate from the MCD sales-partner program project.

### Current production status

```txt
Phase 1 onboarding: validated end to end with a controlled test partner.
Admin: status grid deployed; duplicate approval/e-sign action prevented.
Agent Portal: sidebar established with Dashboard, Tasks, Inbox, Leads, Proposals, Schedule, Training, Resources, Settings, theme toggle, and Sign Out.
Schedule: GHL appointment relay validated for Booked, Confirmed, Cancelled, No-show, Completed, and Rescheduled.
Timezone: appointment source timezone is preserved; portal displays in the signed-in viewer's browser timezone.
Company registration: optional Company / Legal Entity Name is supported separately from the individual legal signer.
Tasks: callback-queue deployment is in progress.
```

### Lead-pool conventions

```txt
Cold Pool / Prospects = fresh scraped and validated business records.
Nurture / Marketing Email Pool = branded email campaign records.
Hot Leads = prospect replies / active-intent records; stop nurture and route for human follow-up.
Open Pool = booked-demo no-shows and eligible released records.
Shark Tank = stalled prospects carrying an active 30–90-day proposal/contract-priced quote.
Referral = protected self-sourced/referral records.
House = company-controlled/reassigned records.
```

### MCD CRM read next

```txt
01 Daily Logs/[C] 2026-07-02 MCD CRM Portal Schedule and Lead Pool Progress.md
01 Daily Logs/[C] 2026-07-02 MCD CRM Admin Operations Status.md
01 Daily Logs/[C] 2026-07-01 MCD CRM Phase 1 End-to-End Onboarding Validated.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] AI Handoff & Scope Review.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] GHL Production Build-Out Runbook.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Implementation Status — 2026-07-01.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] v1.2 Business-Terms Reconciliation & GHL Flows.md
Repo: hpintojr/crm.mcd
```

### Current next actions

1. Verify the callback Task workspace production deployment.
2. Build controlled Lead Management: import/review, assignment, notes, activities, dispositions, callbacks, and suppression.
3. Apply the Cold Pool, Nurture, Hot Leads, Open Pool, Shark Tank, Referral, and House conventions without weakening ownership or DNC rules.
4. Add GHL demo handoff only after lead ownership and appointment context are safely mapped.
5. Create GHL attribution fields before Phase 2 payment, opportunity, invoice, and servicing relays.
6. Complete California counsel review before real partner contracting.

Standing rules: GHL is backend-only; agents have no GHL logins; never expose GHL, other-client data, true pricing, or confidential terms; never store SSNs or raw bank details; Finance approves payouts; sensitive actions are audited.

## Workspace rules

- Keep portfolio, store, book production, MCD business operations, and MCD CRM code separate.
- Use `[C]` for AI-authored files unless Hamilton directs otherwise.
- Do not store secrets, credentials, customer data, tax information, or raw bank data in this workspace.
- Keep historical logs as reference; keep active handoffs concise and current.
