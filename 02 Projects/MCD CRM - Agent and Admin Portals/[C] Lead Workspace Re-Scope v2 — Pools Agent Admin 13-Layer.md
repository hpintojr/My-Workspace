# MCD CRM — Lead Workspace Re-Scope v2

**Date:** 2026-07-08  
**Status:** Scope checkpoint before new code work  
**Applies to:** `hpintojr/crm.mcd`, My-Workspace, Neon production data, Vercel production app

## 0. Current phase

We are in **Phase 2: Lead Workspace Re-Scope and Agent/Admin Experience Design**.

Phase 1 is complete: signed import, preview, owner/admin review, submit, production feature flag, and portal visibility were validated.

No new `/portal/leads` code changes should be made until this scope is confirmed.

## 1. Why this re-scope is required

The first live imported batch displayed under **Open Pool**, but that conflicts with the original product model and the later approved business rules.

Imported leads are not automatically Open Pool. Imported or manually created raw prospects start as **Cold** after validation/review.

Open Pool has a specific business meaning: it is a controlled release bucket for leads that have already aged out or become available under defined rules. It is not the label for every unassigned lead.

## 2. Original scope that must be preserved

The Master Product Scope defines four separate concepts that should not be collapsed into one UI label:

### 2.1 Lead lifecycle

```text
RAW
PENDING_REVIEW
VALIDATED
ELIGIBLE
NURTURE_ACTIVE
OPEN_POOL
CLAIMED
WORKING
DEMO_BOOKED
HANDOFF_TO_GHL
CLOSED_WON
CLOSED_LOST
INVALID
DNC
SUPPRESSED
ARCHIVED
```

### 2.2 Lead pool

```text
HOT
NURTURED
COLD
PRIVATE_AGENT
MANAGER_REVIEW
```

### 2.3 Ownership state

```text
UNASSIGNED
CLAIMED_BY_AGENT
ASSIGNED_BY_MANAGER
LOCKED_FOR_CALLBACK
REASSIGNED
```

### 2.4 Activity state

```text
NO_ACTIVITY
ATTEMPTED_CONTACT
CONTACTED
QUALIFIED
CALLBACK_SCHEDULED
DEMO_BOOKED
UNRESPONSIVE
DISQUALIFIED
```

## 3. Approved business-rule overlay from v1.2

The v1.2 business reconciliation made the lead rules more concrete:

```text
Cold lead protection: begins only after documented two-way contact is logged in CRM.
Self-sourced referral: protected immediately on accurate CRM entry + documented source.
OpenPool: cold lead with no demo booked after 45 days opens to all authorized partners.
Shark Tank: pitched/contract-priced lead that stalls becomes assignable only to top-tier closers/managers.
Booking credit: credited partner earns only when deal closes and MCD receives cleared payment.
House transfer: MCD may move any account to House for client protection, noncompliance, abandonment, or operating need.
```

This means the UI must distinguish **pool**, **lifecycle**, **ownership**, and **activity** instead of showing one generic list.

## 4. Correct lead-bucket model for the agent/admin experience

### 4.1 Cold Leads

**Meaning:** New imported or manually created leads that passed review/validation but have not been meaningfully worked.

**Typical state:**

```text
pool = COLD
lifecycle = VALIDATED or ELIGIBLE
ownership = UNASSIGNED
activity = NO_ACTIVITY
```

**Agent experience:**

- Agents can view permitted Cold Leads.
- Agents can click to call on mobile through `tel:`.
- Agents can open website and Google Maps/public listing.
- Agents can add a quick note or log a call attempt.
- Agents can mark wrong number, out of business, bad fit, DNC, or callback.
- Agent possession/protection should not begin merely from viewing the card.
- Cold lead protection begins only after documented two-way contact or a qualifying owner-approved action.

### 4.2 Working Cold / Touched Cold

**Meaning:** A Cold Lead with at least one logged touch: call attempt, note, voicemail, callback, or initial contact.

**Typical state:**

```text
pool = COLD
activity = ATTEMPTED_CONTACT, CONTACTED, or CALLBACK_SCHEDULED
ownership = UNASSIGNED, LOCKED_FOR_CALLBACK, or CLAIMED_BY_AGENT depending on final policy
```

**Policy question:** decide whether a call attempt creates a short reservation or only a note. Two-way contact must create protection.

### 4.3 Hot Leads

**Meaning:** The original scope defined Hot as prospects who replied, requested info, submitted a form, engaged with a booking link, requested contact, or were escalated.

**Typical state:**

```text
pool = HOT
lifecycle = ELIGIBLE or WORKING
activity = CONTACTED or QUALIFIED
```

**Agent experience:** highest urgency, smaller active capacity, faster SLA.

### 4.4 Nurtured Leads

**Meaning:** Prospects in approved marketing sequences who have not yet shown direct purchase intent.

**Typical state:**

```text
pool = NURTURED
lifecycle = NURTURE_ACTIVE
activity = NO_ACTIVITY, ATTEMPTED_CONTACT, or UNRESPONSIVE
```

**Agent experience:** claimable in batches or routed by campaign/reply rules.

### 4.5 Open Pool

**Meaning:** A controlled release state, not a raw-import state. Under v1.2, OpenPool means a cold lead with no demo booked after 45 days opens to all authorized partners.

**Typical state:**

```text
lifecycle = OPEN_POOL
ownership = UNASSIGNED
pool may remain COLD/NURTURED/HOT as historical context, or be displayed as Open Pool as a lifecycle/release state
```

**Rule:** do not place newly imported leads here automatically.

### 4.6 Private Agent Leads

**Meaning:** Self-sourced or referral leads protected immediately upon accurate CRM entry and documented source.

**Typical state:**

```text
pool = PRIVATE_AGENT
ownership = CLAIMED_BY_AGENT or ASSIGNED_BY_MANAGER
```

**Agent experience:** visible only to owner/assigned agent/managers.

### 4.7 Manager Review

**Meaning:** Leads that need human review due to source quality, duplicate risk, suppression concern, low score, compliance issue, or exception.

**Typical state:**

```text
pool = MANAGER_REVIEW
lifecycle = PENDING_REVIEW or REVIEW_REQUIRED
ownership = UNASSIGNED
```

### 4.8 Peak Interest

**Meaning:** Business concept requested by owner after initial build. Lead has shown meaningful interest or qualification but has not yet moved into formal proposal.

**Implementation note:** Peak Interest may be an activity/lifecycle state, not necessarily a Prisma enum yet. Proposed mapping:

```text
pool = HOT or PRIVATE_AGENT
lifecycle = WORKING
activity = QUALIFIED
```

### 4.9 Proposal Pending / Proposal Sent

**Meaning:** Lead is beyond Peak Interest and preparing for a formal proposal/checkout/contract.

**Typical state:**

```text
lifecycle = WORKING or HANDOFF_TO_GHL
activity = QUALIFIED or DEMO_BOOKED depending on the exact point
```

### 4.10 Shark Tank

**Meaning:** A pitched/contract-priced lead that stalls and becomes assignable only to top-tier closers/managers.

**Implementation note:** Current Prisma already has `SHARK_TANK` in `LeadPool`; keep this manager-gated.

### 4.11 House / Servicing

**Meaning:** Client/account service and protected House Account workflow after client conversion or transfer. This is not a normal prospecting lead bucket.

## 5. Corrected page strategy for `/portal/leads`

The current two-column layout with **Open Pool** and **My active records** is not sufficient.

Recommended structure:

### Top: Work Queue tabs/cards

```text
Cold Leads
Hot Leads
Nurtured
Open Pool
Callbacks
My Leads
Manager Review (admin/manager only)
Shark Tank (qualified roles only)
```

Each tab should show count, urgency, and SLA meaning.

### Middle: Lead acquisition table/card list

Each lead row/card should include:

- Business name.
- Industry/category.
- City/state.
- Phone as click-to-call.
- Website link.
- Google Maps/public listing link.
- Business address.
- Google rating and observed date.
- Source/original source.
- Pool/lifecycle/activity/ownership badges.
- Last touch / next action.
- Quick status: New, Attempted, Contacted, Callback, Qualified, DNC, Bad Fit.

### Right side or drawer: Lead detail panel

Only open this when a lead is selected. Do not permanently waste half the page on empty My Active Records.

Detail panel should include:

- Full contact info.
- Sales research fields.
- Click-to-call button.
- Open website.
- Open Maps/public listing.
- Quick note.
- Call outcome form.
- Callback scheduler.
- Activity timeline.
- Claim/take-possession action only when allowed.

## 6. Agent action model

### 6.1 Actions allowed before ownership

- View Cold Lead card.
- Click phone number to call.
- Open website.
- Open Google Maps/public listing.
- Add quick note.
- Log call attempt.
- Mark wrong number / out of business / DNC / bad fit.
- Schedule callback.

### 6.2 Actions that create possession/protection

- Documented two-way contact.
- Qualified/meaningful interest.
- Manager assignment.
- Self-sourced referral entry.
- Callback lock if final policy approves that behavior.

### 6.3 Actions that move lead forward

- Convert to Peak Interest.
- Book demo.
- Trigger GHL handoff when demo is booked.
- Move to Proposal / Checkout flow after formal proposal readiness.

## 7. Admin experience re-scope

Admin needs separate screens or filters for:

- Import reconciliation.
- Cold Lead intake/review.
- Lead quality review.
- Duplicate/suppression review.
- Pool distribution.
- Agent claim/capacity monitoring.
- Callback overdue monitoring.
- Shark Tank / closer assignment.
- OpenPool 45-day release audit.
- Referral/source-protection disputes.
- DNC/suppression compliance.
- Commission/attribution lineage.

Admin must be able to see why a lead is in a bucket, who touched it, who owns it, when protection started, and what timer controls it.

## 8. Current production data correction needed

The 50 imported leads were temporarily moved to `AVAILABLE` / `OPEN` to validate the portal visibility and feature flag. That should not remain the final classification.

After scope approval, correct the data to the Cold Lead model:

```text
pool = COLD
lifecycle = VALIDATED or ELIGIBLE, depending on final enum mapping
ownerAgentId = null
claimedAt = null
openPoolReleaseAt = null or a future 45-day release timer, depending on policy
```

Add audit evidence for the correction. Preserve import row status, source lineage, and related records.

## 9. 13-layer production compliance checklist for this re-scope

This lead-workspace change must pass the 13-layer production stack before code moves forward.

| Layer | Requirement for this re-scope |
|---|---|
| 1. Version control & Git hygiene | Use branch + PR. No direct-to-main patching for lead workspace. |
| 2. Environments | Test in preview before production. Do not test preview against live data unless intentionally approved. |
| 3. Secrets management | Keep production and preview HMAC/database/env separation on the hardening list. Do not expose secrets in chat, logs, docs, or screenshots. |
| 4. Database / migrations / backups | Any enum/schema migration must use Neon branch migration flow or be avoided with existing fields where possible. Confirm rollback path. |
| 5. Auth & access control | Agent, Sales Manager, Compliance Manager, Finance, Owner, and House roles must remain separated. Server-side checks required. |
| 6. Routing & rendering | Run dynamic-route collision check before merge. No sibling `[id]`/`[leadId]` style collisions. |
| 7. Data validation & input safety | All notes, dispositions, lead transitions, DNC actions, and callbacks must validate server-side. |
| 8. Error handling / observability | Add structured logging around lead transitions, claim attempts, DNC, callbacks, and pool moves. |
| 9. CI/CD checks | Add route-collision, typecheck, and at least lead-workspace smoke checks before broad release. |
| 10. Performance / scaling | Query counts by bucket efficiently; avoid loading every lead detail on first page. |
| 11. Security posture | No raw exports for agents. No cross-agent visibility. No provider/commercial provenance in agent UI. RLS/least-privilege remains a hardening item. |
| 12. Testing | Test login → portal → lead list → call action → note → disposition → callback → DNC → claim/convert rules. |
| 13. Documentation & handoff | Keep this scope, daily log, README, and developer handoff synchronized before build work starts. |

## 10. Build order after approval

1. Correct the current batch classification from Open to Cold after final mapping is approved.
2. Redesign `/portal/leads` around tabs/buckets instead of Open Pool + My Active split.
3. Add richer lead card data.
4. Add `tel:` click-to-call and copy number behavior.
5. Add website and Google Maps/public listing links.
6. Add quick note and disposition logging before claim.
7. Add possession/protection rules based on two-way contact and business rules.
8. Add admin review and distribution views.
9. Add tests and 13-layer release checks.
10. Deploy through controlled PR/review, not direct patch.

## 11. Current stop point

This scope replaces the temporary assumption that imported leads belong under Open Pool.

Do not make new code changes until Hamilton confirms the bucket mapping and agent/admin UX flow.
