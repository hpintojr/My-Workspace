---
type: implementation-handoff
date: 2026-07-14
project: MCD - Mercury Call Desk
audience: Claude or another implementation agent
status: Core CRM and GHL onboarding foundation verified; delivery architecture decision and one safety patch remain before live approval.
---

# CRM + GHL Implementation Handoff

## Start here

This document records observed, verified state as of 2026-07-14. Treat the approved Business Terms and Owner Setup tracker as controlling for commercial, compliance, and legal constraints. Do not mistake a pending source branch or draft pull request for production deployment.

## Verified live state

- Production CRM: `https://crm.mercurycalldesk.com`.
- Production CRM signup was verified: an application returned an accepted response, persisted as `SUBMITTED`, and linked to a contact in the **Mercury Call Desk** GoHighLevel location. No production test was run against the unrelated Loan Streamline Pro location.
- Signup correctly does **not** send onboarding paperwork. The intended compliance gate is: applicant submits -> administrator reviews/confirms -> administrator approval writes the `agent-approved` GHL tag -> GHL workflow starts onboarding documents.
- The GHL workflow **Agent Onboarding Documents** is published and triggered by `agent-approved`.
- Its actions are separate sends for: Sales Partner Agreement, NDA/Confidentiality and IP Agreement, W-9/Payout Intake, and New Hire Acknowledgment.
- Four published relay workflows track each of those individual document completions.

## Important behavior clarification

The reported "signup did not start the onboarding workflow" was expected behavior under the current design. A submitted applicant remains unapproved until the administrator completes the review/approval action. This gate must remain in place; do not trigger documents directly at signup.

## One-email onboarding requirement: current constraint

The owner wants one email containing four document links, not four emails/workflows.

HighLevel's native **Send Documents & Contracts** workflow action sends one document/template per action. It can therefore create four independently auditable document flows, but it does not provide a reliable browser-only configuration for one automatically composed email with four contact-specific secure signing links.

Two viable designs require an explicit owner choice:

1. **Native one-packet design:** consolidate the required material into one secure document/template and send one email/link. This is simplest, but changes independent document/W-9 audit structure and needs legal/operations review.
2. **Four independent documents + custom delivery coordinator:** create four signing requests through the HighLevel Documents & Contracts API, prove that stable secure signing URLs and status webhooks are available, then send one CRM email with the four links. This preserves document-level auditability, but needs a small backend proof of concept and must not be assumed to work until tested with synthetic data.

Do not run a live approval merely to test this: it would currently initiate four document sends. Use a synthetic test only after the delivery architecture is selected and the owner explicitly authorizes the action.

Reference material:

- HighLevel: [Workflow Action: Send Documents & Contracts](https://help.gohighlevel.com/support/solutions/articles/155000004887)
- HighLevel: [Automatically send document/contract templates](https://help.gohighlevel.com/support/solutions/articles/155000001301)
- HighLevel: [Documents & Contracts API](https://marketplace.gohighlevel.com/docs/ghl/proposals/documents-and-contracts-api/index.html)

## Pending CRM safety patch (not yet merged or deployed)

Repository: `hpintojr/crm.mcd`

- Branch: `codex/onboarding-handoff-failsafe-20260713`
- Commit: `69c1b99786e827cc686738f980f36396ff79fe9c`
- Changed file: `src/app/admin/page-v3.tsx`

The patch corrects a fail-open issue in the administrator approval flow. Before the patch, the screen could mark an applicant approved even if the GHL contact did not exist or the `agent-approved` tag write failed. The patch instead logs an audit/integration failure, leaves the applicant unapproved, and shows the administrator that onboarding did not start. It marks the applicant approved only after GHL accepts the tag write.

Validation already run against this branch:

- Prisma generation: passed.
- TypeScript check: passed.
- Public-signup boundary check: passed.
- Direct Next.js production build: passed.
- The repository's wrapper build reached an existing compatibility-evidence guard failure in `lead-deployment-verification.ts`; the branch changes only the admin approval page and did not introduce that baseline mismatch.

Claude should review this narrow branch, open/complete its PR, and deploy it before authorizing a real applicant approval.

## Stripe Connect / finance readiness (separate, draft work)

Repository: `hpintojr/crm.mcd`

- Draft PR: #139, **feat(finance): stage Stripe Connect readiness foundation**.
- Head branch: `codex/connect-readiness-foundation-20260713`.
- It is readiness-only. It does not create connected accounts, transfer funds, initiate payouts, run migrations, or enable financial-provider feature flags.

The owner's operating preference is manual administrator-triggered payouts with visibility in an admin commissions panel. Keep manual payout tracking as the default until the finance design, Stripe webhooks, reconciliation, and owner approval are complete.

## Remaining scope for the CRM

- Complete GHL custom fields, values, tags, pipelines, and workflow coverage for lead progression, commission calculation, payout state, lead protection, DNC, service cadence, and former-Partner access.
- Validate the agent experience: leads, proposals, commissions, schedules, pricing authority, and company-email inbox access from inside the CRM.
- Finish company-email provisioning/integration for the IONOS `@mercurycalldesk.com` test inboxes and map each inbox to the corresponding CRM user/contact conversation record. Never record credentials or access tokens in this repository.
- Add brand assets to the CRM portal/UI after core backend controls are proven.
- Complete compliance and legal gates before phone/SMS activation or live agent onboarding.

## Guardrails for Claude

- Read the required order in `[C] AI Index & Commands.md`, including the approved Business Terms, before making changes.
- Keep the administrator approval gate. Do not send onboarding documents at signup.
- Use the **Mercury Call Desk** GHL location only; do not alter unrelated sub-accounts.
- Do not perform financial actions, create real Stripe Connect accounts, migrate data, or send real documents without the owner's explicit action-time approval.
- Do not expose email tokens, credentials, signing URLs, applicant data, or other secrets in source control or chat handoffs.
- Do not change pricing, commissions, agreements, lead rules, or outbound compliance policy without explicit owner direction and the required legal review.

## Recommended next sequence

1. Review, merge, and deploy the fail-closed GHL approval patch.
2. Have the owner choose the onboarding delivery architecture: one consolidated packet, or four documents with a custom one-email coordinator proof of concept.
3. If the custom option is selected, use a non-production/synthetic applicant to prove document creation, signing URL availability, completion webhooks, and final CRM/GHL status write-back before implementing email composition.
4. Run one owner-authorized end-to-end synthetic approval: signup -> GHL contact -> approval tag -> document delivery -> completion relays -> CRM status/audit evidence.
5. Only then complete the remaining operating controls and agent-facing CRM portal features.
