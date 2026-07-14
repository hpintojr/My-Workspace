---
type: implementation-status
date: 2026-07-14
project: MCD - Mercury Call Desk
phase: 2 - CRM / GoHighLevel
status: Core signup, GHL handoff, administrator approval gate, and document workflow are deployed. Final onboarding-document delivery validation and remaining operating controls are pending.
---

# CRM Phase - Current Implementation Status

Read `2026-07-14 CRM + GHL Implementation Handoff.md` before changing production CRM, GoHighLevel, Stripe, or onboarding. It distinguishes verified production behavior from pending source branches and draft pull requests.

## Implemented and verified

- Production CRM signup creates a durable applicant record.
- The applicant handoff creates/links the contact in the Mercury Call Desk GoHighLevel location.
- The administrator review page preserves a manual compliance gate: signup alone does not release onboarding documents.
- Approved applicants receive the `agent-approved` GHL tag, which triggers the published **Agent Onboarding Documents** workflow.
- The current GHL workflow has independent document actions for the Sales Partner Agreement, Confidentiality/IP Agreement, W-9/Payout Intake, and New Hire Acknowledgment; four published relay workflows record individual completion.

## Pending before live onboarding

1. Merge and deploy the CRM patch that fails closed when the GHL contact/tag write cannot be completed.
2. Decide the one-email document experience. Native GHL workflow actions send a document/template per action; keeping four independently auditable documents while sending one email requires a custom delivery coordinator/API proof. A single consolidated packet is the native one-link alternative but requires legal and audit review.
3. Perform an owner-authorized synthetic test approval only after the above is complete. Do not use a real applicant or remove the administrator approval gate to test it.

## Finance and Stripe scope

Stripe Connect readiness is under review in a separate draft CRM pull request. It is intentionally readiness-only: no connected accounts, transfers, automatic payouts, production migrations, or enabled financial-provider feature flags are included. Manual administrator-initiated payout tracking remains the operating assumption until separately approved and validated.

## Remaining CRM operating scope

- Lead attribution, two-way-contact protection, OpenPool, Shark Tank, House Account, and assignment rules.
- DNC, account-health/service-cadence, residual-eligibility, commission evidence, and reporting controls.
- Restricted former-Partner access, retention controls, and document-safe/countersignature evidence.
- Company-email inbox routing and CRM-only customer/prospect email workflow.

## Non-negotiable controls

- Do not alter approved business terms, agreements, pricing, commission formulas, or compliance rules without owner authorization and legal review where required.
- Do not automatically approve applicants or release documents at signup.
- Do not perform live Stripe payout/Connect operations, migrations, or real-document test sends without explicit owner approval at the time of action.
