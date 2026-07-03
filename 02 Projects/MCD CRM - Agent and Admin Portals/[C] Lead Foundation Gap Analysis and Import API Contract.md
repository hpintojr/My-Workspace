# MCD CRM — Lead Foundation Gap Analysis and Import API Contract

**Status:** Design baseline; no migration authorized by this document  
**Date:** 2026-07-03  
**Authority:** `hpintojr/My-Workspace`  
**Implementation repository reviewed:** `hpintojr/crm.mcd` at `recovery/e59-route-fix`

## 1. Purpose

This document turns the locked MiniCRM scope into an implementation-ready gap analysis. It is intentionally a **no-write, no-migration design baseline**. It must be used only after the route-recovery PR has passed its controlled Preview acceptance and before any lead-foundation migration is drafted.

## 2. Verified existing baseline

### Existing Neon tables

```txt
Lead
LeadActivity
LeadCallback
LeadClaimEvent
LeadNote
LeadSuppression
```

`Lead` already includes the July 2 taxonomy additions:

```txt
originalSource
intakeMethod
sourceDetail / sourceRecordUrl
campaign and UTM fields
referral fields
website status / website opportunity fields
dedupeKey
```

Neon also has foreign keys from the activity, callback, claim, note, and suppression tables back to Lead and, where applicable, Agent.

### Existing implementation behavior

`src/app/api/admin/leads/route.ts` currently provides an Admin-session-only two-step import:

```txt
POST /api/admin/leads
commit: false → in-memory validation preview
commit: true  → sequential Lead creation for currently valid rows
```

The route blocks disabled source types, normalizes values, detects batch duplicates, checks active suppression during commit, checks an existing `dedupeKey`, creates a Lead in `PENDING_REVIEW`, and writes LeadActivity/AuditLog records.

This is useful internal Admin tooling. It is **not** the final contract for `mcd_lead_ops`.

## 3. Confirmed gaps against locked scope

### 3.1 Lead and contact model

| Required scope | Current baseline | Required next design |
|---|---|---|
| Business-level Lead | Present | Preserve as the company/opportunity record. |
| Multiple people/contact routes | Missing | Add `LeadContact` before campaign or reply routing. |
| Primary contact convenience fields | Present on Lead | Keep only as compatibility/display fields while contact records become authoritative. |
| Contactability per channel | Missing | Store business contact route, channel, consent/eligibility, suppression state, evidence, and timestamps separately. |

`LeadContact` must support more than a single name/email/phone pair. It should distinguish contact role, business versus personal route, normalized identifiers, source/evidence, and contact status.

### 3.2 Import controls and audit trail

| Required scope | Current baseline | Required next design |
|---|---|---|
| Persistent import batch | Missing | `ImportBatch` owned by an authenticated Admin or local-import key. |
| Persistent row outcomes | Missing | `ImportRecord` with raw-safe payload reference, normalized snapshot, status, issues, and reconciliation fields. |
| Preview result set | In memory only | Persist deterministic decisions by batch and row number. |
| Existing-record duplicate decision in preview | Not durable | Preview against current Lead/Contact/suppression state and retain outcome. |
| HMAC local-import authentication | Missing | Key ID, timestamp, body hash, signature, five-minute replay window, key rotation/revocation. |
| Idempotent export | Missing | Idempotency keys from local run ID + row number + row hash; server-side uniqueness. |
| Batch reconciliation | Missing | Return row counts, statuses, created Lead IDs, and retry-safe error state. |
| Admin review lane | Only Lead PENDING_REVIEW exists | Add batch and row review status plus reviewer/audit event. |

### 3.3 Current Admin route limitations

The existing route must not be wired directly to the local CLI because it:

```txt
- requires browser-session Admin authentication;
- has no local-import HMAC key or replay protection;
- does not create an ImportBatch or ImportRecord ledger;
- stores preview only in the response, not as an auditable result set;
- checks existing duplicates only while committing, not as a durable preview decision;
- writes each Lead before writing its activity/audit transaction, so an activity/audit failure can leave a Lead without the companion records;
- is not a row-level idempotent/reconciliation API;
- rejects email-only records because Lead.businessPhone is currently required;
- does not create LeadContact records;
- does not expose the approved batch lifecycle required by the local scope.
```

This route may remain Admin-only tooling during the transition, but it must not become the production export endpoint through shortcuts or shared browser credentials.

### 3.4 Lifecycle, pool, and movement history

The existing database lifecycle enum has:

```txt
RAW
PENDING_REVIEW
AVAILABLE
CLAIMED
CONTACTED
NURTURING
DEMO_BOOKED
CLOSED_WON
CLOSED_LOST
DISQUALIFIED
SUPPRESSED
```

The locked scope requires additional explicit business transitions, including validation, hot intent, demo no-show, proposal sent, and contract sent. Do not add enum values opportunistically. First define the state-transition policy, actors, audit events, and allowed pool changes.

The existing `LeadClaimEvent` stores lead, agent, action, reason, and timestamp. It does not fully model:

```txt
prior owner
new owner
actor
prior pool / next pool
explicit governed release reason
protection/referral restriction decision
capacity decision
```

Add a dedicated, append-only pool/ownership movement history or expand the existing event design only after the exact event contract is accepted.

### 3.5 Suppression and contactability

The existing `LeadSuppression` model uses one identifier and broad suppression types. The locked scope requires both global and channel-specific control.

Design target:

```txt
Suppression scope: ALL | EMAIL | SMS | CALL | SOCIAL
Restriction basis: DNC | UNSUBSCRIBE | INVALID_ROUTE | COMPLIANCE_HOLD | LEGAL_HOLD | OTHER
Identifier / related LeadContact
Effective date, source, actor, evidence/reference, lift state
```

An email unsubscribe must block marketing email immediately but must not silently become a global DNC. An explicit all-contact stop must create global suppression. Every change remains auditable.

### 3.6 Campaign events and reply routing

Current LeadActivity is a generic event log. It lacks a provider-event identity contract.

Before campaign activation, add a provider-neutral event model that retains:

```txt
provider
provider event/message ID
Lead and LeadContact IDs
campaign identifier
channel
event type
received/occurred timestamps
idempotency/retry state
classification outcome
actor/reviewer when human triage occurs
```

No reply retry may create duplicate activity, duplicate Hot transition, or duplicate notification.

### 3.7 Proposals and website offers

There is no proposal/quote table. Website status fields on Lead are not a replacement.

Required proposal record capability:

```txt
proposal type: MCD_PACKAGE | MCD_WITH_INCLUDED_WEBSITE | WEBSITE_ONLY
owner and original closing attribution
version
scope/terms reference
amount/currency
manager approval state
sent/active/expiry timestamps
accepted/declined/expired/cancelled/superseded state
website-offer constraints where applicable
```

Website-only offers must enforce the current $500–$3,000 policy guardrail and manager approval of price, scope, and expiry.

## 4. Target import API contract

The local tool may use only this dedicated API family once implemented:

```txt
POST /api/lead-imports
POST /api/lead-imports/{batchId}/rows
POST /api/lead-imports/{batchId}/preview
POST /api/lead-imports/{batchId}/submit
GET  /api/lead-imports/{batchId}
```

### Authentication and request integrity

```txt
- local-import key ID
- HMAC secret stored only outside Git and outside local reports
- timestamped request signature
- request body hash
- five-minute replay window
- idempotency key per local run ID + row number + row hash
- rate limit by key
- key status: active, revoked, rotated
- audit client version, adapter, manifest hash, operator identity, and request result
```

### Batch lifecycle

```txt
DRAFT
ROWS_RECEIVED
PREVIEWED
REVIEW_REQUIRED
APPROVED_FOR_SUBMISSION
SUBMITTED
PARTIALLY_ACCEPTED
COMPLETED
FAILED
RECONCILIATION_REQUIRED
```

### Row lifecycle

```txt
RECEIVED
VALID
DUPLICATE_IN_BATCH
POSSIBLE_EXISTING_DUPLICATE
SUPPRESSED
REVIEW_REQUIRED
REJECTED
PENDING_ADMIN_REVIEW
APPROVED
IMPORTED
IMPORT_ERROR
```

No row is assigned to an agent, added to a campaign, or sent to an external provider as a consequence of import alone.

## 5. Proposed delivery slices after route recovery acceptance

### Slice A — No-migration contract and tests

- Define TypeScript domain types and Zod contracts for the batch API.
- Define HMAC verification, timestamp/replay, idempotency, and audit interfaces.
- Write synthetic fixtures and unit tests for permitted sources, suppression, duplicate handling, no-website review, and replay behavior.
- Do not enable `LEADS_ENABLED` or run a migration in this slice.

### Slice B — Focused lead-foundation migration

After Slice A is accepted, create one reviewed additive migration that introduces only the accepted models/enums/indexes. Run it first on a dedicated Neon branch, compare the resulting schema, then use the controlled production process with an explicit rollback/restore plan.

Do not run a blanket `prisma migrate deploy` until Prisma schema, migration history, and Neon constraints are reconciled. Existing database foreign keys and Prisma’s scalar-only representation must be considered before generating migration SQL.

### Slice C — API and Admin review flow

- Implement batch creation, bounded row upload, preview, submit, status/reconciliation.
- Add Admin batch/row review UI.
- Preserve source lineage and audit decisions.
- Run synthetic end-to-end acceptance tests.

### Slice D — Controlled local export

- Connect `mcd_lead_ops` HMAC client.
- Verify idempotent replay behavior.
- Run a synthetic batch.
- Run one explicitly approved small pilot only after owner approval.

## 6. Required synthetic acceptance tests

1. Permitted manual/licensed row stages and previews.
2. Blocked acquisition source is rejected before export.
3. Blank website becomes `NO_WEBSITE_LISTED`, not verified no website.
4. Verified no-website remains human-reviewed.
5. Duplicate in batch is retained as a row decision, not silently dropped.
6. Existing Lead/LeadContact duplicate is returned as review-required or duplicate.
7. Suppressed identifier is rejected by preview.
8. Replay of the same signed request returns the original idempotent result without a duplicate Lead.
9. Imported record begins `PENDING_REVIEW` and has no owner/campaign action.
10. Email-only valid business route follows the accepted LeadContact design without fake phone values.
11. Local report/manifest and MiniCRM audit contain no secrets.
12. No external email, SMS, social action, GHL update, commission, or payout occurs during import.

## 7. Explicit non-goals for this phase

```txt
- no production route-recovery merge;
- no production migration;
- no campaign sending;
- no automated agent assignment;
- no direct local Neon/Postgres access;
- no GHL Demo Booked handoff changes;
- no proposal delivery;
- no commission or finance behavior;
- no scraper/browser-automation implementation.
```

## 8. Decision gate

Begin implementation only when all are true:

```txt
1. recovery PR has passed Preview acceptance and is explicitly approved for merge;
2. this contract is accepted or revised by the owner;
3. migration scope contains only accepted additive changes;
4. tests and rollback plan exist before any Neon write;
5. relevant feature flags remain false until the new flow passes controlled acceptance.
```
