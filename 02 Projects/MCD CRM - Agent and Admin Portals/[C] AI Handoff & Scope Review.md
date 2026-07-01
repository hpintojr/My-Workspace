# MCD CRM — AI Handoff & Scope Review (READ FIRST)
**Updated:** 2026-07-01  
**Purpose:** The operational entry point for anyone working on the Mercury Call Desk Mini CRM. It identifies the governing business documents, documents the actual implementation state, separates deployed features from staged features, and defines the safe next sequence.

---

## 1. Operating protocol

```txt
Human owner (Hamilton) → owns business decisions, legal review, GHL/Stripe/Cloudflare setup, and final production approvals.
ChatGPT               → implements directly in GitHub main and validates Vercel builds.
Claude / reviewer     → reviews, refactors, validates security and acceptance criteria.
```

### Current delivery model

- **Source of truth:** `hpintojr/crm.mcd`, branch `main`.
- **Deployment path:** GitHub `main` → Vercel production.
- **No local-machine workflow** is required for normal development or operations.
- **Production database changes are separate from code deployment.** Stage, review, test on a Neon safety branch, then obtain explicit approval before applying to the production Neon branch.
- Every change that affects sensitive data, access, lead ownership, DNC, onboarding, finance, or payout status must create an `AuditLog` record.
- Do not call a staged module “live” merely because its source code exists. It is live only after: schema applied, feature flag enabled, production build verified, and controlled test completed.

---

## 2. Authoritative document map

```txt
Business truth — highest priority:
  02 Projects/MCD - Mercury Call Desk/[C] Partner Program Business Terms — Approved 2026-06-30.md
  02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
  02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/

Product scope for this project:
  [C] Master Product Scope v1.1.md
  [C] v1.2 Business-Terms Reconciliation & GHL Flows.md
  [C] GHL Backend Integration Spec.md
  [C] Agent Registration, Knowledge Base & Training Integration.md
  [C] Automated Agent Onboarding Flow (GHL-first).md
  [C] Build Specs — Index & Roadmap.md
  [C] Implementation Status — 2026-07-01.md

Code:
  hpintojr/crm.mcd
  Production: https://crm.mercurycalldesk.com
```

Conflict rule: **Approved Business Terms → Owner decisions → onboarding library → v1.2 reconciliation → v1.1 scope → implementation convenience.**

---

## 3. Current platform state

### Platform and deployment

```txt
Stack: Next.js 15 App Router · TypeScript strict · Tailwind · Prisma · Neon Postgres · Vercel
Production URL: https://crm.mercurycalldesk.com
Default Vercel URL: https://crm-mcd.vercel.app
Neon project: mcd-crm-production (jolly-lab-80341970)
Neon production branch: br-flat-cloud-aj9r0d6b
```

- The custom production domain was verified previously with HTTPS and an HTTP 200 response.
- The base production schema is applied and includes `User`, `Agent`, `ActivationToken`, onboarding documents, certifications, webhook events, integration errors, and audit logs.
- Several 2026-07-01 commits successfully reached Vercel `READY` during implementation.
- **Required follow-up:** verify the current `main` head deployment before enabling any staged feature. Some final lead-action and workspace commits were still rebuilding during the documentation update.
- Do not treat Vercel’s project-level `live` metadata as the deployment source of truth; verify the actual deployment state and production alias instead.

### Current production environment convention

- Environment values live in Vercel only; no secrets are committed.
- `AUTH_SECRET`, `AUTH_URL`, `AUTH_TRUST_HOST`, database URLs, and GHL settings are expected to be configured in Vercel.
- Stripe Connect and Cloudflare R2 remain intentionally unconfigured or unused until their respective stages are tested.
- Feature flags default to disabled:
  - `LEADS_ENABLED=false`
  - `COMMISSIONS_ENABLED=false`
  - `SERVICING_ENABLED=false`
  - `FINANCE_ENABLED=false`

---

## 4. Implemented application state

### Live base foundation — implemented and schema-backed

- Public partner signup with zod validation, honeypot protections, GHL stub-safe contact upsert, submitted `Agent` creation, four onboarding document gates, and audit logging.
- Auth.js / NextAuth v5 credentials flow with JWT sessions, Argon2 password hashing, activation links stored only as hashes, lockout behavior, TOTP enrollment, role checks, and protected routes.
- Public `/login`, `/signup`, and `/activate` flows.
- Admin applicant review: confirmation call, approve, correction request, reject, GHL approval-tag action, document state visibility, integration error handling, and audit logging.
- Inbound GHL document webhook processing with shared-secret verification, location allowlist, idempotency, document completion tracking, user provisioning, activation-token creation, and audit events.
- Certification administration and lead-eligibility gating through `Agent.canClaimLeads`.
- Admin command center, audit viewer, integration error views, user-administration controls, account-security view, module-readiness view, and a protected CSV audit export.
- Middleware-level response security headers and branded application/not-found fallback pages.

### Implemented in source but intentionally feature-gated

#### Leads and agent work

- Lead, lead-activity, claim-event, note, callback, and suppression domain models.
- Admin lead intake and validation queue.
- Atomic agent claim path with capacity controls.
- Protected agent queue and query-based workspace shell.
- Agent call logging, notes, callbacks, dispositions, DNC suppression, controlled release, and timeline/action-panel code.
- Internal suppression and DNC rules; DNC blocks calls, SMS, sales/marketing email, and social DMs while transactional/billing/security/outage communications may continue.
- Cold-lead protection is correctly based on **documented two-way contact**, not the claim time. Referral protection is based on documented referral entry. Demo-booked records do not return to OpenPool.
- Cold records are intended to return to OpenPool after 45 days from documented two-way contact when no demo is booked.

**Status:** source and migrations are staged; production Neon lead tables are **not applied**; `LEADS_ENABLED` remains `false`.

#### Booking and GHL event relay

- Booking-attribution policy helpers and validated Mini CRM attribution fields.
- Inbound appointment relay designed to update lead state for booked, confirmed, rescheduled, cancelled, no-show, and completed events once leads are enabled.
- Opportunity/funding event contracts and validation helpers.

**Not complete:** outbound GHL appointment creation has not been implemented because the exact production GHL endpoint behavior must be verified rather than guessed.

#### Funding, commissions, servicing, and payout readiness

- Versioned package wholesale schedule and approved revenue-share calculations.
- Setup-fee target handling and recurring 50/50 net-profit calculation helpers.
- Funding-event normalization and reconciliation helpers.
- Payout-timing and payout-eligibility rules that require approval, a usable Stripe destination, no hold, and no dispute/chargeback risk.
- Client-service cadence policy, triggered health logic, 60-day violation logic, and three-day escalation policy.
- Partner servicing/commission policy helpers reflecting House transfers, retirement, good-standing exits, and termination consequences.
- Client-account, service-activity, commission-ledger, payout-destination, payout-batch, and payout-line Prisma models plus source-controlled migration SQL.

**Status:** source and migrations are staged; no commission ledger, client account, Stripe payout, or finance action is active in production.

---

## 5. Source-controlled migration state

```txt
Already applied to production Neon:
  Base auth / agent / onboarding / certification / webhook / audit schema.

Staged in source only — DO NOT enable until applied through Neon safety-branch flow:
  prisma/migrations/20260701091000_add_lead_engine/migration.sql
  prisma/migrations/20260701091100_add_lead_integrity/migration.sql
  prisma/migrations/20260701092000_add_client_service_and_ledger/migration.sql
```

Required migration order:

1. Lead engine base tables and enums.
2. Lead foreign-key integrity constraints.
3. Client accounts, servicing history, commission ledger, payout references.
4. Regenerate Prisma client / verify production build.
5. Controlled production tests with synthetic records.
6. Enable only the corresponding feature flag after verification.

---

## 6. Non-negotiable compliance and security rules

- Never store SSNs, tax IDs, raw routing numbers, raw bank numbers, card data, or account credentials in the CRM.
- W-9 / tax data belongs in the secure provider/e-sign system; payout banking belongs in Stripe Connect or equivalent provider onboarding.
- Agents never receive GHL credentials, direct GHL links, other-client data, confidential wholesale pricing, commission mechanics, scripts, or ICP data unless an approved entitlement explicitly allows it.
- All external data is zod-validated. All protected actions enforce authorization server-side.
- GHL inbound webhooks use shared secret + location allowlist + idempotency. Do not add fictitious HMAC behavior.
- Healthy, current-paying accounts are **not** reassigned because of routine inactivity alone. Service performance is measured through triggered client requests, support issues, payment events, renewals, escalations, and documented resolutions.
- Agents leaving in good standing continue commissions only while they continue servicing assigned clients. Clients move to House when servicing is relinquished. Retirees keep commissions; terminated agents lose future commission rights and clients move to House.
- Never auto-pay. Finance approval, cleared funds, eligibility timing, compliance status, and payout-provider readiness are all required.

---

## 7. Immediate next sequence

1. **Verify the current `main` Vercel deployment** after the final agent-workspace/DNC route commits.
2. **Create the first owner account** through the secure activation flow. Collect only the owner email; do not collect or write a raw password.
3. **Run the controlled Neon migration workflow** for the lead engine and integrity migration. Verify on the Neon safety branch first; obtain explicit approval before production apply.
4. Run controlled tests for: lead import, admin approval, atomic claim race, DNC suppression, callback, release, and inbound appointment relay.
5. Enable `LEADS_ENABLED=true` only after those tests pass.
6. Confirm GHL activation-delivery mapping: which custom field carries the activation URL and which GHL workflow/tag sends the invitation. Keep provisioning non-blocking if delivery fails and log an integration error.
7. Apply client/service/ledger migration only after lead operations are stable, then test funding reconciliation with synthetic events.
8. Add verified GHL appointment creation and Stripe Connect Express only after their APIs, destination readiness, and finance approval controls are tested.

---

## 8. Open owner/legal decisions

```txt
[ ] California attorney review of agreements before signature.
[ ] Advanced-partner minimum-margin floor / schedule.
[ ] Final GHL custom-field IDs and GHL workflow/tag for portal activation delivery.
[ ] Final GHL appointment-creation endpoint and calendar configuration verification.
[ ] Stripe Connect Express onboarding and webhook credential activation.
[ ] Cloudflare R2 document mirror activation.
[ ] Field-level encryption plan for personal/contact PII.
[ ] Transactional email provider and activation-notification fallback.
[ ] National / state outbound compliance process and calling-hours policy review.
[ ] Launch-checklist items that satisfy the first-payout gate.
[ ] Retention, legal-hold, CCPA/CPRA deletion/access workflow.
```

Resolved operating decisions:

```txt
[x] Auth = Auth.js v5 with credentials, activation, role gates, and TOTP.
[x] CRM source = GitHub main → Vercel production; no local workflow required.
[x] Database = Neon PostgreSQL; migration safety branch before production apply.
[x] GHL = backend-only; agents have no GHL login.
[x] Calling = manual B2B business-line dialing; no auto-dialer.
[x] Internal DNC / opt-out = immediate suppression and audit trail.
[x] Payout provider direction = Stripe Connect Express; no raw banking data in CRM.
```
