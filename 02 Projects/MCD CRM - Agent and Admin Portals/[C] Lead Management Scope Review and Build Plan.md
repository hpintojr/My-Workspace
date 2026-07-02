# MCD CRM — Lead Management Scope Review and Build Plan

**Status:** Active build plan  
**Date:** 2026-07-02  
**Applies to:** Lead sourcing, validation, nurture, replies, agent workflow, website incentive/offers, Open Pool, Shark Tank, and GHL demo handoff.

## Product outcome

The MiniCRM must operate as a controlled B2B lead system rather than a generic address book:

```txt
Acquire or receive a prospect
→ retain permanent source and evidence
→ normalize, validate, deduplicate, and check suppression
→ Admin review / routing
→ Cold, Nurture, Hot, Referral, Open Pool, Shark Tank, or House operation
→ agent action, note, disposition, and callback
→ demo booking
→ controlled GHL handoff
→ later proposal, payment, client servicing, and commission lineage
```

## Locked concepts

These must never be merged into one field:

```txt
Original source        where the prospect first came from
Intake method          how the record entered MiniCRM
Campaign               the sequence/list/ad/outreach batch touching it
Current pool           current operating lane
Lifecycle              current sales stage
Ownership              current agent/manager/House responsibility
Protection state       referral, two-way contact, manager hold, etc.
Suppression            global or channel-specific contact restriction
Website opportunity    whether a missing/weak website creates an offer path
```

## Source taxonomy

Original source is immutable after creation except for an Admin-only, audited correction.

```txt
Google Maps
Instagram
Referral
PPC
Email
SMS
LinkedIn
Web Form
Facebook
Other
```

Preserve associated source detail, source evidence/record reference, campaign/list, UTM values, referral information, and intake method.

### Important Google Maps boundary

Google Maps may remain a research/source label when a prospect is independently and lawfully identified, but the MiniCRM must not support batch scraping or storage of Google Maps content. Google’s Maps Platform terms specifically prohibit exporting/scraping Maps content, including copying and saving business names and addresses, and bulk downloading places information. Use permitted providers, independently sourced records, direct submissions, or manual research paths instead. citeturn843381view0

## Pool and lifecycle model

### Pools

```txt
Cold Pool / Prospects
Nurture / Marketing Email Pool
Hot Leads
Open Pool
Shark Tank
Referral
House
```

### Required lifecycle states

The current code needs a richer lifecycle than only `DEMO_BOOKED → CLOSED_*`:

```txt
RAW
PENDING_REVIEW
VALIDATED
AVAILABLE
CLAIMED
CONTACTED
NURTURING
HOT
DEMO_BOOKED
DEMO_NO_SHOW
PROPOSAL_SENT
CONTRACT_SENT
CLOSED_WON
CLOSED_LOST
DISQUALIFIED
SUPPRESSED
```

### Open Pool oversight resolved in the design

Existing business terms mention release of cold leads with no demo after 45 days. The later operating clarification defines Open Pool around booked-demo no-shows. Keep both as possible, governed release reasons:

```txt
NO_SHOW
45_DAY_NO_DEMO
MANAGER_RELEASE
```

No record becomes Open Pool merely because an agent is inactive. A release must be recorded, time-stamped, auditable, and policy-driven.

### Shark Tank improvement

Shark Tank needs a real proposal/quote record rather than only a pool value. Each quote must retain:

```txt
Quote type: MCD package | Website-only | MCD + included website
Amount/currency
Quote version
Sent date
Active/expiry date
Accepted/declined/expired state
Scope and approved terms reference
Current owner and original closing attribution
```

A lead enters Shark Tank only when it has an active proposal or contract-priced quote that is stalled but still active.

## Website incentive and website-only offer path

### Goal

Businesses with no usable website are valuable MCD prospects because a website may be included as an approved package incentive. When a prospect does not choose AI/CRM, the same opportunity may become a standalone website quote in the approved $500–$3,000 range.

### Important distinction

A missing website field does not prove a business has no website.

Use this sequence:

```txt
Website listed
No website listed
→ manual/reliable review
→ verified no website
→ website opportunity review
→ bundle incentive or website-only quote
```

### Website fields required

```txt
Website status
Website review date and reviewer
Review note
Website opportunity status
Offer track: bundle incentive | website-only
Quoted amount
Quote scope note
Quote sent/expiry/accepted/declined timestamps
```

The CRM must avoid automatically promising that a website is included. Only approved packages and approved quotes can make that claim.

### Agent controls

- Agents can see that a record has a website opportunity only after an approved offer policy exists.
- The quote amount, included scope, and website-only sale terms should be manager-approved before an agent sends them.
- Public or agent-facing copy must not promise custom functionality, SEO results, hosting, revisions, ownership, timelines, or ongoing support until those package rules are defined.

## Compliance and outreach improvements

### Email

Commercial email controls must be designed before campaign activation. The FTC states CAN-SPAM applies to commercial messages, including B2B messages, and requires truthful routing/subject information, a physical address, an opt-out mechanism, and prompt honoring of opt-outs. citeturn364899view0

Build requirements:

```txt
Campaign sender identity
Commercial footer template
Unsubscribe and suppression synchronization
Provider message/event IDs
Delivery, bounce, reply, and unsubscribe webhooks
Reply classification: positive, negative, unsubscribe, auto-reply, ambiguous
Manual review for ambiguous replies
```

### SMS and calls

Do not treat an SMS source label or a business phone number as permission for marketing SMS. Track channel-specific consent and channel-specific suppression separately from global DNC. Keep all SMS automation disabled until counsel, registration, consent evidence, and provider workflow are ready.

### Suppression improvement

Replace the current single broad suppression concept with both:

```txt
Global DNC / compliance hold
Channel suppression: Email | SMS | Call | Social | All
```

An email unsubscribe stops marketing email; it should not silently erase source, history, or a separately documented global DNC state.

## Data integrity and operational safeguards

### Import and validation

Before any lead reaches agents or campaigns:

```txt
Normalize company, email, phone, and website domain
Build a dedupe fingerprint
Check existing lead/customer records
Check active suppression
Validate contact route where a provider is used
Set timezone and confidence
Score transparently
Preserve source/campaign evidence
Require Admin review when validation is incomplete
```

Add `ImportBatch` and `ImportRecord` records so the system can explain what happened to every imported row: valid, duplicate, suppressed, review-required, imported, rejected, or error.

### Ownership and lineage

Keep permanent fields/events for:

```txt
Original source
Original claiming agent
Original booking agent
Original closing agent
Current owner
Every claim/release/reassignment
Every pool move
Every source correction
Every suppression or consent change
```

### Agent access

- Agents see only their owned leads plus released Open Pool records they are eligible to claim.
- Open Pool claims must be atomic and capacity-aware.
- Cold, Nurture, Hot, Referral, House, and Shark Tank records are not self-claimable unless explicitly released by policy/manager control.
- Agents cannot export the lead database, override suppression, alter original source, or change quote policy.

## Production discovery

The production Neon database currently contains the validated onboarding and appointment tables, but does **not** yet contain the Lead, callback, suppression, activity, note, or claim tables represented in the Prisma source. Therefore:

```txt
LEADS_ENABLED must remain false.
Task and Lead pages must not query lead tables until the lead-foundation migration is applied.
No production lead or callback test can occur yet.
```

## Build order

### Slice 1 — Lead foundation

```txt
Database migration:
- lead source / intake / pool / lifecycle / validation / suppression enums
- Lead records with permanent source and dedupe fields
- activities, notes, callbacks, claims, suppression
- import batch and row audit records
- proposal/quote foundation
- website status and website opportunity fields

App code:
- source/pool validation
- normalization/dedupe utilities
- feature-gated lead and task screens
- source and website status labels
```

### Slice 2 — Admin intake and review

```txt
Admin import batch creation
Row validation result list
Duplicate/suppression review
Source/campaign/website filters
Manual lead entry
Controlled manager assignment
```

### Slice 3 — Agent workflow

```txt
My Leads
Open Pool claims
Lead detail/timeline
Disposition + required note
Callback creation/completion
DNC and channel suppression request path
Website opportunity indicator
```

### Slice 4 — Email/reply routing

```txt
Campaign provider abstraction
Campaign event and reply webhooks
Reply triage
Positive reply → Hot Lead routing
Unsubscribe → channel suppression
Auto-reply / ambiguous response review
```

### Slice 5 — Proposal and GHL handoff

```txt
MCD and website-only proposal records
Shark Tank controls / quote-expiry tasks
Demo booking / controlled GHL handoff
GHL linkage and lifecycle relay
```

### Slice 6 — Reporting and later finance

```txt
Source-to-demo and source-to-revenue reporting
Website opportunity conversion reporting
Agent SLA and response reporting
Commission/client-service/funding integration after their separate migrations and tests
```

## Current implementation decisions

- Google Maps source tagging is allowed only for independently sourced/manual research records; batch Google Maps scraping/import is blocked.
- `originalSource` and `intakeMethod` are separate, and original source is immutable after creation.
- A lead with no recorded site is initially **No website listed**, not **Verified no website**.
- A website-only quote must remain inside the approved $500–$3,000 range and carry a manager-approved scope and expiry.
- Open Pool agent claims are restricted to released Open Pool records.
- Lead and Task features remain gated until the database foundation exists and controlled test cases pass.
