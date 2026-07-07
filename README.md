# My Workspace

A GitHub-based workspace for active project handoffs, daily logs, and operating context. This GitHub repo (hpintojr/My-Workspace) is the single source of truth — not just a local checkout of it. Both Claude and ChatGPT read and write here directly.

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

#### Current build state — 2026-07-07

```txt
Phase 1 onboarding: production-validated end to end with a controlled partner.
Admin operations, partner portal, and read-only GHL-backed schedule: deployed.
The prior route-collision servicing incident and Auth.js login-hang incident are resolved.

Phase D lead import: PR #32 was reviewed and accepted by Claude, then merged to production as squash d25ac9f.
The signed batch import API, immutable replay/concurrency protections, and read-only Admin review screens
(/admin/lead-imports and /admin/lead-imports/[batchId]) are deployed.

Production Vercel is green. Hamilton-provided evidence confirms LEAD_IMPORT_KEY_ID and
LEAD_IMPORT_HMAC_SECRET are present for Preview and Production; values were never inspected or recorded.
Production Neon currently has zero import batches, import rows, Leads, LeadActivities, and import-related audit records.
No live import has run.

Local lead operations Phase A lives at D:\GitHub\mcd_lead_ops. Its export makes real signed requests,
but must remain local, explicit, and operator-approved. The next gate is mirroring the import variables
locally, selecting a small permitted approved run, and completing one supervised export.

Current execution holder: ChatGPT for post-merge verification and first supervised-export readiness.
```

#### Lead rules and source tracking

```txt
Pools: Cold Pool / Prospects, Nurture / Marketing Email Pool, Hot Leads, Open Pool, Shark Tank, Referral, House.
Original source is permanent. Intake method, campaign, pool, lifecycle, owner, quote, and suppression are separate fields.
Allowed local inputs: user files, referrals, web forms, PPC leads, approved/licensed provider data, owned-account exports, and permitted business-website research.
No website listed requires review before becoming a verified no-website opportunity.
No imported lead is automatically assigned to an agent or enrolled in outreach.
```

#### Read first

```txt
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md
01 Daily Logs/[C] 2026-07-07 Reviewed and Merged PR 32 to Production Lock Released.md
01 Daily Logs/[G] 2026-07-07 MCD CRM Post-Merge Export Readiness.md
```

#### Current next actions

```txt
1. Locally confirm MCD_LEAD_IMPORT_KEY_ID, MCD_LEAD_IMPORT_HMAC_SECRET, and
   MINICRM_API_BASE_URL=https://crm.mercurycalldesk.com. Do not disclose values.
2. Choose a small permitted run that has completed preview and explicit operator approval.
3. Run: mcd-leads export --run <approved-run-id>
4. Log only batch ID, aggregate counts, final status, and non-sensitive reconciliation outcomes.
5. Verify the resulting production batch, Lead, LeadActivity, and AuditLog evidence read-only.
6. Continue the remaining 13-layer items: environment separation, RLS/runtime role, error tracking,
   authorized login smoke test, and Neon autoscaling headroom.
```

## Workspace rules

- Keep every business and codebase separate.
- Never commit secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
- Use `[C]` in AI-authored file names unless Hamilton directs otherwise; ChatGPT-authored daily logs use `[G]` so provenance is visible at a glance.
- GHL is backend-only for MCD; never surface its pricing, other-client data, or links to agents.
- Keep active handoffs concise; use daily logs for dated detail and history.
- This repo (hpintojr/My-Workspace on GitHub) is the single source of truth. If a local checkout ever shows unresolved git conflict markers, GitHub is the tiebreaker — reconcile the local copy from it, never commit the raw markers.