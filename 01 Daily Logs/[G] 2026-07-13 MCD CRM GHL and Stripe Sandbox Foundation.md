# [G] 2026-07-13 MCD CRM GHL and Stripe Sandbox Foundation

## Scope

Browser-only administrative foundation for the Mercury Call Desk GoHighLevel sub-account and connected Stripe Sandbox, followed by a non-deploying CRM.MCD draft branch for Stripe Connect readiness. No production application code, database schema, Vercel configuration, frontend/UI work, live Stripe configuration, payout release, financial-account storage, real customer data, or money movement was changed.

## Owner decisions recorded

- Hamilton approved controlled paid executions of GoHighLevel's premium Inbound Webhook trigger.
- Commission policy is 50% of Net Commissionable Profit: collected retail revenue less the published partner wholesale cost and the actual payment-processor fee.
- Payouts will be made manually outside Stripe and recorded/audited through the future Admin Commissions panel. Stripe Connect is now staged as an optional Sandbox-only future route, but bank accounts, payout schedules, payout releases, provider execution, and money movement remain out of scope.

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



## Connect-ready commission foundation — draft PR #139

Hamilton later approved staging an efficient, extensible Stripe Connect option while retaining manual external payout as the current default.

- Created draft PR [#139 — Stripe Connect readiness foundation](https://github.com/hpintojr/crm.mcd/pull/139). It adds a pure, no-side-effect route/readiness policy, server-only readiness configuration names, policy coverage, and the agent/admin safety contract.
- The policy supports `MANUAL_EXTERNAL` and optional `STRIPE_CONNECT` routes. It requires server readiness, a Connected Account reference, onboarding and provider-capability state, Finance readiness, recorded manual approval, and an explicit execution flag before it can reach review readiness. It never permits a provider call.
- Stripe Connect Sandbox onboarding is available and reached the business-model selection step. No Connected Account, onboarding link, payout, transfer, live-mode setting, migration, feature gate, or provider action was created.
- PR #139 Vercel preview, Application Build, Verify CRM, and Commission Policy checks passed. The isolated Authenticated E2E run was still in progress at handback.
- The draft branch has not been merged or deployed. Production remains at PR #138; `COMMISSIONS_ENABLED=false`, `FINANCE_ENABLED=false`, and `STRIPE_CONNECT_TRANSFERS_ENABLED=false`.

## Updated required next work before any publish

1. Implement and test the secure backend Stripe event handler only in a separately authorized readiness scope: signature verification, event idempotency, finalized processor-fee reconciliation, ledger calculation, and controlled GHL field/tag write-back.
2. Run the synthetic Stripe Sandbox acceptance sequence, recording pass/fail/deferred evidence for signature rejection, duplicate events, fee reconciliation, ledger/hold logic, GHL write-back, and manual approval audit evidence.
3. Obtain new written authorization before applying the staged Commission/Payout migration, opening production gates, creating Connect accounts/onboarding links, adding transfer/payout APIs, or doing any live Stripe work.

## Handback

The Connect-readiness implementation interval is complete. The coordinating lock returns to Claude; draft PR #139 remains deliberately unmerged pending the remaining CI result and ordinary review.
