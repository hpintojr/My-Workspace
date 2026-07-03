# MCD CRM — Project Control, Scope Reconciliation & Rebuild Plan

**Status:** Active control document  
**Date:** 2026-07-03  
**Project authority:** `hpintojr/My-Workspace`  
**Implementation repository:** `hpintojr/crm.mcd`  
**Live platform:** Vercel project `crm-mcd` with Neon project `mcd-crm-production`

## 1. Repository and environment roles

```txt
My-Workspace
= product scope, operating rules, project decisions, daily logs, build sequence, and handoffs.

crm.mcd
= Next.js MiniCRM implementation and deployment source.

Vercel crm-mcd
= live/Preview application hosting.

Neon mcd-crm-production
= MiniCRM database service of record.

mcd_lead_ops (local repository)
= permitted lead intake, staging, research, preview, operator approval, and signed export preparation.
= never writes directly to Neon/Postgres.
```

The workspace is the authority for what is being built. The live codebase and hosted environments must be measured against this scope, not the other way around.

## 2. Product definition

Mercury Call Desk MiniCRM is the private operating system for agent onboarding, lead ownership, compliance, source lineage, controlled sales progression, proposals, client servicing, and later finance visibility.

```txt
MiniCRM = permanent system of record.
GHL = private booked-demo and post-demo backend.
Email provider = delivery/event source mirrored to MiniCRM.
Agents = never receive GHL access.
Local lead operations = staging/export helper, never the CRM database.
```

## 3. Scope hierarchy

Read in this order before implementation work:

1. `[C] Local Lead Operations and MiniCRM Export Scope.md`
2. `[C] Lead Foundation Design Addendum.md`
3. `[C] Lead Management Scope Review and Build Plan.md`
4. `[C] Lead Pool and Source Taxonomy.md`
5. `MCD CRM - Agent and Admin Portals Overview.md`
6. Current daily logs in `01 Daily Logs/`
7. This control document

When documents conflict, apply this precedence:

```txt
Current dated incident/recovery facts
→ locked safety/compliance rules
→ final local operations/export scope
→ build-plan detail
→ older status notes
```

## 4. Confirmed current facts — 2026-07-03

### Live-app recovery

- `crm.mcd/main` still contains competing Next.js route folders at `src/app/admin/leads/[id]` and `src/app/admin/leads/[leadId]`.
- The collision is the confirmed source of the broad protected-route failure.
- `recovery/e59-route-fix` is the known-good fix path: retain the canonical `[leadId]` route and remove the competing `[id]` route.
- Production must remain protected from unrelated work until the recovery path is reviewed, preview-tested, and explicitly approved.

### Database foundation

- Neon production already contains the core `Lead`, `LeadActivity`, `LeadCallback`, `LeadClaimEvent`, `LeadNote`, and `LeadSuppression` tables.
- Neon production also contains the lead taxonomy fields for immutable original source, intake method, referral/UTM lineage, website status/opportunity, and dedupe key.
- The July 2 workspace note that described those taxonomy fields as pending is now historical.
- The current database does not yet contain the scope-required import-batch/import-row or proposal/quote records.

### Existing proven modules

- Phase 1 partner onboarding has been production-validated with controlled test data.
- Partner activation, MFA portal access, onboarding-document gates, and account provisioning have been validated.
- GHL appointment lifecycle relay has been validated for booked, confirmed, cancelled, no-show, completed, and rescheduled states.
- Lead, servicing, commission, and finance modules remain feature-gated; their existence in code or schema is not authorization to enable them.

## 5. Locked MiniCRM design requirements

### Lead identity and contacts

```txt
Lead = company-level prospect/opportunity, source, pool, lifecycle, owner, and commercial history.
LeadContact = one or more people and contact routes linked to a lead.
```

Do not keep the permanent design limited to one name/email/phone set on the Lead record. Add LeadContact before campaign/reply routing goes live.

### Provenance and intake

Each lead preserves immutable `originalSource`, intake method, permitted-use basis, source evidence/reference where allowed, campaign fields, referral context, UTM data, and audit history.

Original source never changes except through an audited Admin correction.

### Separate operating concepts

```txt
Original source  = first known discovery origin
Intake method    = how the record entered MiniCRM
Campaign         = outreach/ad/list/program context
Pool             = current operational lane
Lifecycle        = current sales progression stage
Owner            = accountable agent, manager, or House
Protection       = referral/two-way contact/manager lock state
Suppression      = global or channel-specific contact restriction
Proposal         = quote, version, scope, terms, value, expiry, and outcome
```

### Canonical pools

```txt
Cold Pool / Prospects
Nurture / Marketing Email Pool
Hot Leads
Open Pool
Shark Tank
Referral
House
```

No record enters Open Pool because an agent is merely inactive. Every release requires a reason, actor, timestamp, prior owner, and protection check.

### Website opportunity and proposals

```txt
No website listed
→ review required
→ verified no website
→ offer review
→ MCD package incentive or website-only proposal
```

Website-only proposals must remain in the approved $500–$3,000 range unless owner policy changes. A manager approves scope, price, and expiry before an agent represents the offer.

### Contactability and suppression

Before contact, the system checks:

```txt
Global DNC/compliance hold
Channel-specific suppression
Required consent or campaign eligibility
Timezone and approved contact window
Current owner and workflow lock
```

Email unsubscribe is not automatically a global DNC. An explicit all-contact stop is global suppression. Suppression never erases source or activity history.

## 6. Required modules and order

### Track 0 — Recovery and operating safety

1. Review the recovery branch against `main`.
2. Confirm a Preview passes `/login`, `/admin`, `/portal`, and role-boundary checks.
3. Confirm no new dynamic-route collision exists.
4. Merge/deploy only after explicit owner approval.
5. Record the production outcome in the workspace daily log.

### Track 1 — Lead foundation reconciliation

1. Treat the currently live Lead and taxonomy schema as baseline.
2. Create the missing data design for `LeadContact`, import batches/rows, proposal/quote records, channel permissions, campaign events, and controlled pool-movement history.
3. Reconcile Prisma source, checked-in SQL migrations, and Neon before adding a new migration.
4. Preserve backward compatibility and leave feature gates disabled.

### Track 2 — Secure import and Admin review API

Build the approved import contract:

```txt
POST /api/lead-imports
POST /api/lead-imports/{batchId}/rows
POST /api/lead-imports/{batchId}/preview
POST /api/lead-imports/{batchId}/submit
GET  /api/lead-imports/{batchId}
```

Required controls: local-import key ID, HMAC signature, timestamp/body hash, five-minute replay window, idempotency, rate limits, operator/source-adapter manifest, MiniCRM-side validation, duplicate/suppression checks, and audit history.

Imported rows begin in `PENDING_REVIEW`; they are never auto-assigned, auto-campaigned, or auto-sent.

### Track 3 — Controlled local export

Only after Track 2 passes synthetic acceptance tests:

- connect `mcd_lead_ops` to the signed MiniCRM import API;
- retain dry-run, explicit operator approval, bounded retries, manifest, and reconciliation reporting;
- run one manually approved synthetic batch before any real pilot batch.

### Track 4 — Agent workflow

- My Leads and protected Open Pool claim flow.
- Lead timeline, notes, disposition, callback, and suppression-request flow.
- Server-side ownership enforcement.
- Website-opportunity indicator only after offer policy approval.

### Track 5 — Campaign events and reply triage

No sending until sender-domain, SPF/DKIM/DMARC, footer, unsubscribe, suppression, provider webhook, inbox-placement, capacity, and approved-content gates pass.

- positive reply/inbound request → one idempotent Hot Lead transition;
- ambiguous reply → Reply Triage;
- unsubscribe → email suppression;
- explicit stop/DNC → global suppression;
- bounce/complaint → compliant route restriction and Admin review.

### Track 6 — Proposal, demo, and GHL handoff

- proposal/quote records and Shark Tank controls;
- manager-controlled website incentive and website-only sales path;
- controlled Demo Booked handoff to GHL with idempotency and visible history;
- no agent GHL access.

### Track 7 — Client servicing, commissions, and finance

Release only after their dedicated schema, role, policy, audit, and acceptance gates pass. The CRM never creates an automatic payout.

## 7. Non-negotiable safety gates

- Do not connect local tools directly to Neon/Postgres.
- Do not enable prohibited directory/social scraping, browser automation, bot evasion, mailbox probing, or contact-limit circumvention.
- Do not enable a feature merely because code or tables exist.
- Do not run broad production migrations or bundle unrelated changes.
- Do not write or expose secrets, credentials, customer data, SSNs, tax IDs, raw bank data, or GHL internals.
- Do not send email, SMS, or social outreach without the applicable compliance, suppression, provider, and owner approvals.
- Do not merge to production without explicit Preview acceptance and a documented rollback path.

## 8. Immediate next actions

1. Use `recovery/e59-route-fix` as the sole recovery candidate and complete the documented Preview test set.
2. Update the live-app handoff only after that recovery result is accepted.
3. Open a dedicated no-migration design branch for the gap analysis between the live lead schema and the full scope described above.
4. Define and test the secure import-batch API contract before wiring `mcd_lead_ops` export.
5. Keep `LEADS_ENABLED`, campaign sending, proposal delivery, commissions, finance, and any production external workflow disabled until their own acceptance tests pass.
