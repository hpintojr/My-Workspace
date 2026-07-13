# [G] 2026-07-13 MCD CRM GHL and Stripe Sandbox Foundation

## Scope

Browser-only administrative foundation for the Mercury Call Desk GoHighLevel sub-account and connected Stripe Sandbox. No CRM.MCD application code, database schema, Vercel configuration, frontend/UI work, live Stripe configuration, payout release, financial-account storage, real customer data, or money movement was changed.

## Owner decisions recorded

- Hamilton approved controlled paid executions of GoHighLevel's premium Inbound Webhook trigger.
- Commission policy is 50% of Net Commissionable Profit: collected retail revenue less the published partner wholesale cost and the actual payment-processor fee.
- Payouts will be made manually outside Stripe and recorded/audited through the future Admin Commissions panel. Stripe Connect, bank accounts, payout schedules, and payout releases are out of scope.

## GoHighLevel — Mercury Call Desk only

- Created folders `MCD CRM - Contact` and `MCD CRM - Opportunity`.
- Added the initial contact, opportunity, tag, custom-value, and combined revenue/commission-pipeline foundation documented in the project record.
- Created `MCD - Stripe Test Intake (Draft)`.
- Saved its Inbound Webhook trigger using a mapping reference received from a real Stripe Sandbox `payment_intent.succeeded` event.
- Verified the workflow still shows **Draft** and its publish toggle remains off.
- The pre-existing Create Contact action is still unconfigured; no contact, opportunity, commission, tag, or payout record was created by this controlled mapping test.

## Stripe Sandbox

- Configured a Sandbox-only Workbench destination for the draft GHL intake.
- Limited the destination to `payment_intent.succeeded`.
- Triggered one controlled Sandbox payment-intent event successfully and used the received payload strictly as the GHL mapping reference.
- No live-mode settings, payout schedule, bank details, payment method, destination payout, or money movement was changed.

## Validation result

The first transport milestone is proven:

`Stripe Sandbox payment event → GHL inbound-webhook receipt → saved mapping reference on a Draft workflow`.

This is deliberately not a production-ready end-to-end commission flow. Direct Stripe-to-GHL webhook delivery does not provide the required production guarantees for Stripe-signature verification, idempotency, retrieval of the actual processor fee, or safe write-back sequencing.

## Required next work before any publish

1. Build a secure backend handler that verifies Stripe signatures, enforces idempotency, retrieves the balance transaction/actual processor fee, calculates the approved commission policy, and then writes controlled GHL field/tag updates.
2. Add the remaining finance-opportunity fields for wholesale cost, processor fee, net commissionable profit, cleared funds, payout due date, eligibility, manual payout method/reference/timestamps, and adjustments/offsets. The direct GHL custom-field settings route did not render in this browser session, so these were not claimed as completed.
3. Split the current combined pipeline into the approved agent-facing Sales pipeline and restricted Finance/Commission workflow before agent dashboards are built.
4. Keep the intake workflow Draft until the backend and a controlled full test prove:
   `lead capture → test payment → payment/commission calculation → GHL field/tag write-back → manual payout audit state`.

## Handback

The narrow browser-configuration interval is complete. The coordinating lock returns to Claude.