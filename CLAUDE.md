# My Workspace — AI Assistant Context

This is the persistent operating guide for ChatGPT, Claude, Gemini, and other AI assistants working in this workspace.

## Core rule

Move Hamilton's projects forward:

```txt
Set the goal → identify the blocker → solve the next problem → ship or verify the result.
```

Be direct, concrete, professional, and action-oriented. Keep current handoffs concise. Use historical daily logs only when they are needed to reconstruct a decision or investigate a regression.

## User context

```txt
Name: Hamilton Pinto Jr.
Nickname: Hamster
Timezone: Pacific Time
Role: consultant, technology advisor, project manager, and builder
Preferred style: polished, direct, concrete, and practical
```

## Required read order

When Hamilton asks to read or continue the workspace:

```txt
1. README.md
2. 00 [C] Workspace Index.md
3. CLAUDE.md
4. The current project files named in README.md and the index
```

## Workspace update rules

When Hamilton says **update my workspace** or **end of day**:

```txt
1. Update the relevant active project handoff/status file.
2. Update README.md when the active focus or next actions changed.
3. Update 00 [C] Workspace Index.md when project status or read order changed.
4. Add or update the dated daily log.
5. Update this file when a durable operating rule or high-level handoff changed.
```

Use `[C]` in AI-authored filenames unless Hamilton says otherwise. Never commit secrets, credentials, customer information, SSNs, tax IDs, raw bank details, paid media, family photos, or other private source assets.

## Project separation

Keep these projects separate:

```txt
Benny & Penny's Adventures store
Benny & Penny's Adventures Book Series
bennyandpenny.com portfolio
MCD - Mercury Call Desk sales-partner program
MCD CRM - Agent and Admin Portals software build
XBeton
```

Do not merge codebases, product claims, customer data, or operational rules across projects.

## Current project pointers

### Benny & Penny's Adventures

Customer portal, digital delivery, gifting, readable slots, Google Places address work, checkout safeguards, email DNS, and cart-recovery foundations are built. Current focus is recovery-flow validation, actual product assets/files, policy copy, inbox placement, and LuLu research.

Read first:

```txt
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

### Benny & Penny's Adventures Book Series

The numbered production kit is the source of truth. The series is still in drafting/production preparation; never treat “cover-ready” or “coming soon” labels as a completed product.

Read first:

```txt
02 Projects/Benny & Penny's Adventures Book Series/[C] AI Index & Commands.md
02 Projects/Benny & Penny's Adventures Book Series/README.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/00-OFFICIAL-CATALOG.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md
```

### bennyandpenny.com — Portfolio

Hamilton's technology portfolio and brand site. Maintain the shared accessibility program and do not change positioning, audience, navigation, or branding without reading project truth and getting approval.

Read first:

```txt
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
```

### MCD - Mercury Call Desk

The AI receptionist/call-desk sales-partner program. The underlying platform vendor is confidential and must never be disclosed to agents, prospects, or public materials. Do not publish confidential pricing, commission math, scripts, ICP, or non-approved claims.

Read first:

```txt
02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md
02 Projects/MCD - Mercury Call Desk/MCD - Mercury Call Desk Overview.md
02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/00_READ_ME_FIRST.md
```

Standing sales-program rules:

```txt
No non-compete. Use confidentiality, IP, and approved non-solicit language only.
Attorney review remains required before real partner contracting.
Outbound work is subject to TCPA and related compliance requirements.
```

### MCD CRM - Agent and Admin Portals

The MiniCRM is a controlled Agent Portal and Admin Portal. It is the system of record for lead source/ownership, operations, compliance, later servicing, and commission lineage. GoHighLevel is a private backend. Agents never receive GHL logins.

#### Core security and integration rules

```txt
Stack: Next.js + TypeScript + Prisma + Neon/Postgres + Vercel.
GHL: one-way backend by default; GHL workflow webhooks relay into MiniCRM, and MiniCRM writes only controlled data at approved handoffs.
Never expose GHL links, true pricing, other-client data, or confidential operational details to agents.
No SSN/tax-ID input inside MiniCRM. W-9 is e-sign only; retain completion/audit state, not raw tax data.
No raw bank data. Use a secure payout provider and store only approved token/completion metadata.
DNC/opt-out is a total sales and marketing blackout; log it promptly and prevent all calls, SMS, sales email, marketing email, and social DMs.
Every sensitive action must be audited. Finance approves payouts; no automatic payout or clawback.
```

#### Current production state — 2026-07-02

```txt
Phase 1 onboarding is production-validated end to end with a controlled partner.
Workflow: signup → GHL contact/tag → owner confirmation/approval → four e-sign documents → completion relays → countersigned Sales Agreement → user provisioning → IONOS activation email → password/MFA → active Partner Portal.
Admin applicant view shows account, onboarding, activation, last login, certification, and lead access. Repeated approval/e-sign is locked out.
Optional Company / Legal Entity Name is supported separately from the individual legal signer. It does not alter the current signing flow.
```

#### Portal and calendar state

```txt
Sidebar: Dashboard, Tasks, Inbox, Leads, Proposals, Schedule, Training, Resources, Settings, theme toggle, Sign Out.
Schedule is a read-only MiniCRM workspace. GHL controls booking, changes, cancellations, guest invitations, and Google Meet creation.
GHL appointment lifecycle relays validated: Booked, Confirmed, Cancelled, No-show, Completed, Rescheduled.
Events update the existing MiniCRM appointment instead of creating duplicates.
Join meeting is visible only for Scheduled and Confirmed appointments.
Appointment source timezone is preserved. The portal displays time in the signed-in viewer's browser/device timezone.
Company demo calendar: mercurycalldesk@gmail.com in GHL with Google Meet. The host calendar may receive an event directly without a separate invitation email.
Agent Gmail/calendar integration is a later graduation-stage feature when an agent is ready to book and close independently. Agents remain MiniCRM users and do not receive GHL logins.
```

#### Lead naming conventions — locked

These are distinct from lifecycle, assignment, protection, referral status, campaign tags, DNC/suppression, and House assignment.

```txt
Cold Pool / Prospects
Fresh scraped and validated business prospects that have not yet entered branded email nurture or had documented two-way contact.

Nurture / Marketing Email Pool
Prospects receiving authorized branded email campaigns. Opens/deliveries alone do not create a Hot Lead.

Hot Leads
A prospect that replies to branded email or otherwise shows active intent. Stop automated nurture, alert/route for prompt human follow-up, and preserve source/campaign lineage.

Open Pool
Booked-demo no-shows and other records eligible for controlled release. Qualifying agents can claim under the governed first-come process.

Shark Tank
Stalled prospects carrying an active proposal or contract-priced quote. Quote windows may run roughly 30–90 days. Keep the record in Shark Tank while the quote is active; apply the approved closer/sign-first rule.

Referral
Self-sourced or accurately entered referral. Protected; do not move it into Open Pool or Shark Tank by routine reassignment.

House
Company-controlled/reassigned record. Mercury Call Desk may move accounts to House under approved business terms.
```

#### Lead and workflow guardrails

```txt
Cold-lead protection begins only after documented two-way contact.
Every import, claim, release, reassignment, note, activity, disposition, callback, booking, and suppression event must be auditable.
Do not turn on lead assignment, open-pool claiming, marketing-email routing, servicing, commission, or finance functions until migrations and controlled tests are complete.
Do not make a GHL demo handoff until lead ownership and appointment context are safely attached.
```

#### Current next scope

```txt
1. Verify the callback Task workspace deployment.
2. Build controlled Lead Management: imports/review, assignment, activities, notes, dispositions, callbacks, and DNC/suppression.
3. Apply Cold Pool, Nurture, Hot Leads, Open Pool, Shark Tank, Referral, and House rules without weakening ownership protections.
4. Map the GHL Demo Booked handoff after ownership and appointment context are ready.
5. Create GHL attribution fields before Phase 2 payment, opportunity, invoice, and servicing relays.
6. Complete California counsel review before real partner contracting.
```

Read first for MCD CRM continuation:

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

## Workspace commands

```txt
read my workspace = README → index → CLAUDE → current project files
update my workspace = update active handoff, README, index, daily log, and this file when a durable rule changed
good morning = recap current state and propose the next action
where did we leave off = reconstruct the latest active handoff
check todos = prioritize current work
start [project] = read that project's current overview/status and give next actions
end of day / wrap up = update active handoff and dated daily log
```

## Final rule

Do not carry stale implementation detail into new chats. Use the current handoff and project documents as the source of truth, and keep this file focused on durable operating rules and the active state.
