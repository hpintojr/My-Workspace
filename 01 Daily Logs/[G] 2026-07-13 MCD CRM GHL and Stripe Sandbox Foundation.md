# [G] 2026-07-13 MCD CRM GHL and Stripe Sandbox Foundation

## Scope

Browser-only administrative foundation for the Mercury Call Desk GoHighLevel sub-account and the connected Stripe Sandbox. No application code, database schema, Vercel configuration, frontend/UI work, live Stripe configuration, payout release, financial-account storage, real customer data, or money movement was changed.

## Completed

### GoHighLevel — Mercury Call Desk only

- Created folders:
  - `MCD CRM - Contact`
  - `MCD CRM - Opportunity`
- Added contact fields:
  - `MCD Stripe Customer ID`
  - `MCD Last Stripe Event ID`
  - `MCD Sync Error`
  - `MCD Lead Status` (New, Contacted, Qualified, Nurture, Unqualified, Closed Won, Closed Lost)
  - `MCD Sync Status` (Pending, Synced, Error)
- Added opportunity fields:
  - `MCD Commission Status` (Not Eligible, Pending Payment, Payment Received, Calculated, Pending Approval, Approved, Paid, Disputed, Reversed)
  - `MCD Gross Revenue`
  - `MCD Commission Amount`
  - `MCD Commission Rate (%)`
  - `MCD Stripe Payment ID`
- Created pipeline `MCD CRM - Revenue & Commission` with stages:
  `Lead Captured`, `Contacted`, `Qualified`, `Proposal Sent`, `Closed Won`, `Payment Pending`, `Payment Received`, `Commission Calculated`, `Commission Approved`, `Commission Paid`.
- Created tags:
  `mcd:lead:new`, `mcd:lead:contacted`, `mcd:lead:qualified`, `mcd:lead:lost`, `mcd:deal:won`, `mcd:payment:received`, `mcd:commission:calculated`, `mcd:commission:approved`, `mcd:commission:paid`, `mcd:sync:error`.
- Added custom values:
  - `MCD CRM: Stripe Mode = test`
  - `MCD CRM: Currency = USD`
- Created the draft-only workflow `MCD - Stripe Test Intake (Draft)`. It has no trigger, actions, enrollment, or publication.

### Stripe

- Confirmed the account is **Mercury Call Desk — Stripe [Test]** and shows the Stripe Sandbox/Test mode banner.
- Confirmed the Test Workbench has no configured webhook destinations.
- No live-mode settings, payout schedule/bank information, payment method, destination, event delivery, or money movement was changed.

## Blockers / owner decisions

1. GoHighLevel marks its Inbound Webhook trigger as a premium trigger with additional per-execution charges. Its generated receiver was inspected but not saved; explicit approval to incur those controlled-test executions is required.
2. Commission calculation cannot be implemented or validated until the owner specifies:
   - the commission base (gross vs. net, tax/shipping/fees treatment);
   - agent/manager split and rate or tier source;
   - timing (payment captured, paid invoice, payout, or another event);
   - refund, partial-refund, dispute, chargeback, reversal, and clawback rules;
   - approval/paid authority and currency/rounding policy.
3. After (1) and (2), Stripe Sandbox should be configured with the minimum event set and a controlled synthetic customer/payment test run should prove:
   `lead captured → Stripe test payment → payment-received field/tag → commission field/status/tag → audit/error write-back`.
4. Payout schedule/banking configuration remains out of scope until action-time owner confirmation, even in a test-oriented setup.

## Handback

This browser foundation is evidence only; it does not claim end-to-end validation. The authoritative lock holder returns to Claude after the coordination documents are updated.
