# MCD CRM — Lead Foundation Design Addendum

**Date:** 2026-07-02  
**Status:** Required before the lead database migration is applied

## 1. Business versus contact

A business lead can have more than one meaningful person: owner, manager, gatekeeper, marketing contact, billing contact, or referral contact. Do not permanently limit the model to a single first name, last name, email, and phone pair.

Use this structure:

```txt
Lead = company-level prospect/opportunity, ownership, source, pool, lifecycle, and commercial history
LeadContact = one or more people/contact routes attached to the lead
```

The initial Lead row may preserve a primary contact for speed, but the foundation must support a contact table before campaign/reply routing goes live.

## 2. Channel permission and quiet-time logic

Store contactability separately for each channel:

```txt
Email: marketing eligibility / unsubscribe status
SMS: consent evidence and marketing eligibility
Call: business-phone / DNC status
Social: channel-specific restriction
```

Do not message a lead solely because a phone or email exists. Before sending, the system must check:

```txt
Global DNC/compliance hold
Channel suppression
Required consent or campaign eligibility
Lead timezone / approved contact window
Current owner and active workflow lock
```

## 3. Campaign replies need idempotency and triage

Every provider event must retain its provider ID so retries do not create duplicate activities, duplicate Hot Leads, or duplicate agent notifications.

Reply outcomes:

```txt
Positive intent → Hot Lead
Negative / not interested → disposition and follow-up rules
Unsubscribe / stop → immediate channel suppression or global DNC as stated by prospect
Auto-reply → do not create Hot Lead
Ambiguous → manager/reply-triage queue
```

## 4. Website offer must be a real commercial record

Do not store the full website-sale process only as a lead tag. Use a proposal/quote record that supports:

```txt
MCD package
MCD package with included website incentive
Website-only offer
Quote version
Scope/terms reference
Price, expiry, status, acceptance/decline
```

The $500–$3,000 website-only range is a pricing guardrail, not a promise of a standardized deliverable. Define package inclusions, revisions, hosting, domain ownership, maintenance, custom-work boundaries, payment terms, and cancellation/refund policy before agents sell it.

## 5. Open Pool release logic

Use an explicit release reason rather than inferring release from an agent's inactivity:

```txt
NO_SHOW
INACTIVE_45_DAYS
MANAGER_RELEASE
```

Every release/reclaim must retain timestamp, actor, reason, prior owner, and any protected/referral restriction.

## 6. Import safety

An import batch needs dry-run outcomes before records are active:

```txt
Valid
Duplicate in batch
Existing-record duplicate
Suppressed
Review required
Rejected
Imported
Error
```

No source, campaign, or website-opportunity claim should be inferred from incomplete data.
