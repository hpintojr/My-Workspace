---
type: daily-log
date: 2026-07-01
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
---

# MCD CRM — July 1 Build Log

## Completed in source

- Continued using GitHub `main` as the production source branch and Vercel as the deployment path.
- Confirmed the base Neon schema remains the live foundation for users, agents, activation, onboarding, certification, webhooks, integration errors, and audit records.
- Completed the admin and account operations layer: applicant review, certification, command center, audit history, audit export endpoint, user administration, account-security view, integration error views, and module-readiness view.
- Added middleware response-security headers plus branded error and not-found screens.
- Expanded the secure GHL document-completion flow: secret validation, location allowlist, idempotency, completion gates, invited-user provisioning, activation link issuance, and audit logging.

## Lead operations staged behind feature flags

- Added lead domain models, admin intake/review controls, atomic claim rules, agent-capacity logic, workspace routing, notes, call logging, callbacks, dispositions, DNC suppression, release controls, and audit events.
- Added the approved lead-protection policy: referral protection on documented entry; cold-lead protection starts only after two-way contact; 45-day OpenPool timing applies only when no demo is booked.
- Added DNC and suppression policy helpers covering calls, SMS, sales/marketing email, and social outreach.
- `LEADS_ENABLED` remains `false` because lead tables are not yet applied in production Neon.

## Revenue and servicing foundation staged in source

- Added package schedule, revenue-split, reconciliation, funding-validation, booking-attribution, payout-timing, service-cadence, service-health, and partner servicing/House-transfer policy helpers.
- Added source models and migrations for client accounts, servicing activity, commission ledger entries, payout destinations, payout batches, and payout lines.
- No live payout, ledger, Stripe Connect, client account, or finance workflow was enabled.

## Migration state

Already applied to Neon production:

- Base authentication, agent, onboarding, certification, webhook, integration-error, and audit schema.

Staged in GitHub only:

1. `20260701091000_add_lead_engine`
2. `20260701091100_add_lead_integrity`
3. `20260701092000_add_client_service_and_ledger`

## Business-rule corrections recorded

- Healthy current-paying accounts are not reassigned merely for inactivity.
- Service is measured by triggered client events and documented resolution.
- Departing agents in good standing remain commission eligible only while they continue servicing assigned accounts.
- Retirees keep commission eligibility; terminated agents lose future eligibility and accounts move to House.
- Finance approval is required before any payout action.

## Verification / next sequence

1. Verify the current Vercel `main` deployment is READY after the final lead action and workspace commits.
2. Verify secure owner activation and `/admin` access.
3. Test lead migrations on a Neon safety branch.
4. Obtain explicit approval before applying lead migrations to production Neon.
5. Run controlled lead intake, claim race, callback, DNC, release, and GHL appointment relay tests.
6. Enable `LEADS_ENABLED=true` only after those tests pass.
7. Confirm the GHL portal-invite custom field and workflow mapping.
8. Stabilize lead operations before applying client/service/ledger migrations.
