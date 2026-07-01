# MCD CRM — Implementation Status Snapshot
**Updated:** 2026-07-01

## Production foundation

| Area | Status | Notes |
|---|---|---|
| GitHub → Vercel deployment | Active | `main` is the production source branch. |
| Production domain | Active | `crm.mercurycalldesk.com`. |
| Neon base schema | Applied | Auth, users, agents, onboarding, certifications, webhooks, integration errors, audit logs. |
| Auth / activation / MFA | Implemented | Credentials, Argon2 hashing, activation tokens, TOTP, protected role routes. |
| Signup and onboarding | Implemented | Public signup, GHL stub-safe upsert, admin review, document gate tracking, provisioning. |
| GHL document webhook | Implemented | Secret, location allowlist, idempotency, audit, invited-user creation. |
| Admin operations | Implemented | Command center, certifications, integrations, audit view/export, user management, readiness view. |

## Staged modules — do not enable yet

| Module | Source | Production DB | Flag |
|---|---|---|---|
| Leads | Models, migrations, API actions, queue, workspace | Not applied | `LEADS_ENABLED=false` |
| Booking | Attribution and inbound relay helpers | Depends on leads | Disabled |
| Commissions | Package/revenue/payout timing logic | Ledger not applied | `COMMISSIONS_ENABLED=false` |
| Client servicing | Cadence, health, violation policy, client models | Not applied | `SERVICING_ENABLED=false` |
| Finance / payouts | Eligibility rules, batch/destination models | Not applied | `FINANCE_ENABLED=false` |

## Controlled Neon rollout order

1. `20260701091000_add_lead_engine`
2. `20260701091100_add_lead_integrity`
3. Controlled lead operations test suite.
4. Enable `LEADS_ENABLED` only after test evidence and explicit approval.
5. `20260701092000_add_client_service_and_ledger`
6. Controlled funding, servicing, ledger, and payout-readiness tests.
7. Enable servicing, commission, and finance flags separately.

## Key rule implementations

- Cold protection begins after documented two-way contact, not claim time.
- Documented referrals are protected on entry.
- DNC is immediate internal suppression.
- Healthy current-paying accounts are not reassigned merely for inactivity.
- Departing agents in good standing retain commissions only while servicing their assigned accounts.
- Retirees retain commission eligibility; terminated agents lose future eligibility and accounts transfer to House.
- Finance does not auto-pay.

## Still required before operational release

- Verify latest `main` Vercel deployment.
- Secure owner activation and admin sign-in test.
- Controlled Neon migration and feature-flag rollout.
- GHL custom-field and workflow mapping for activation-link delivery.
- Verified outbound GHL booking API integration.
- Stripe Connect Express integration and live payout-webhook contract.
- Python ingestion / Sequenzy nurture worker.
- Retention, legal hold, and privacy-request operations.
