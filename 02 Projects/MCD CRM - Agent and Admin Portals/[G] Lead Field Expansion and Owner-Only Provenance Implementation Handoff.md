---
type: implementation-handoff
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
requested_by: Hamilton Pinto Jr.
next_holder: claude
status: ready-for-implementation-and-audit
---

# Lead Field Expansion and Owner-Only Provenance — Implementation Handoff

## Decision

Before the first production import of `Raw_Leads.csv`, add first-class support for the following sales-facing fields:

```txt
Business Address
Google Rating
Google Maps Link
```

Also add a separate, **application-enforced Owner-only acquisition-provenance record** for this source batch:

```txt
owner acquisition source code: RAW072026
owner acquisition reference: OP_ACQ_072026_001
```

`OP_ACQ` means **Owner Private Acquisition**.

## Non-negotiable privacy rule

The real commercial supplier identity, invoice/order information, licensing terms, cost, account credentials, and raw purchase details must never be added to:

```txt
Lead.sourceDetail
Lead.sourceReference
Lead.sourceRecordUrl
Lead notes
Lead activity metadata
AuditLog metadata or reason text
campaign fields
GitHub issues, pull requests, workspace logs, or source-controlled configuration
```

The user-selected codes above are opaque internal identifiers. They are not vendor names.

## Important distinction: shared source vs owner-only provenance

Do **not** turn `RAW072026` into a new shared `LeadOriginalSource` enum value or place it in `Lead.originalSource`.

Why:

```txt
- originalSource is a shared lead field in the current import contract;
- sourceDetail is currently persisted to the normal Lead record;
- those fields may be presented in future non-owner admin/agent UI;
- using RAW072026 there would violate the Owner-only rule.
```

The existing shared `originalSource` may remain `OTHER` for contract compatibility, but shared source fields must be hidden from non-owner lead UI while this transition is implemented. The owner-only codes belong only in a separate private provenance record.

## Required data design

### 1. Sales-facing Lead fields

Add the following optional fields to `Lead`, with appropriate migration and validation:

```txt
businessAddress : String?  // maximum 500 characters
googleRating    : Float?   // accept 0.0 through 5.0 inclusive
googleMapsUrl   : String?  // valid public URL, maximum 2000 characters
```

Use clear labels in the app:

```txt
Business address
Google rating
Google Maps
```

The Google Maps URL is a normal sales-research link. Agents may open it to review public ratings/reviews and prepare a reputation-management conversation.

### 2. Owner-only import provenance

Create a separate model related one-to-one with `LeadImportBatch`, for example:

```txt
OwnerLeadAcquisitionProvenance
- id
- leadImportBatchId (unique relation to LeadImportBatch)
- sourceCode             // RAW072026
- acquisitionReference   // OP_ACQ_072026_001
- createdAt
- updatedAt
```

Requirements:

```txt
- no relationship/data must be selected by Agent, Admin, Super Admin, Sales Manager,
  Compliance Manager, Finance Manager, or import-review pages;
- only an authenticated application user with role OWNER may query or render it;
- all non-OWNER API/server-action paths must reject access before database lookup;
- the import review pages must remain payload-free and must not display this model;
- no provenance code may be copied into AuditLog metadata/reason text;
- ensure ORM selects are explicit rather than broad include/select calls in non-owner code.
```

### 3. Infrastructure boundary

Application role enforcement can prevent regular app roles, including `SUPER_ADMIN`, from viewing the record. It cannot by itself prevent someone with direct database administration or deployment-secret access from querying the database. Do not claim otherwise.

For stronger protection later, evaluate a separate owner-held encryption key or a dedicated private vault. That is not required to safely complete this first import, provided the app-level owner-only rule above is implemented and vendor identity/purchase terms stay out of MiniCRM.

## Required importer changes

### `mcd_lead_ops`

Extend local models, run metadata, source config, normalization, and export mapping so the first CSV can be staged without manual spreadsheet alteration.

Expected source-config shape (exact schema may vary):

```yaml
adapter: csv_import
file_path: data/inbound/Raw_Leads.csv
original_source: OTHER
source_detail: null
owner_acquisition:
  source_code: RAW072026
  acquisition_reference: OP_ACQ_072026_001
column_mapping:
  business_name: "Business Name"
  business_phone: "Phone"
  business_address: "Address"
  industry: "Industry"
  location: "Location"
  google_rating: "Rating"
  google_maps_url: "Google Maps Link"
```

Rules:

```txt
- Do not map the Google Maps URL into shared sourceRecordUrl.
- Map it to the new first-class googleMapsUrl field.
- Parse Location into city/state only when a safe format is recognized (for example, City, ST or City ST).
- Preserve the original Location value for local review when parsing is uncertain; do not invent a state.
- Validate Google Rating as numeric and within 0–5. Rows outside that range must become a review/reject outcome, not silently coercion.
- Do not emit the owner provenance codes inside per-lead rows, local preview reports, normal sourceDetail, console output, or exported audit text.
- Send owner-only provenance once at batch creation through a dedicated server contract field/endpoint, not in each Lead payload.
```

### `crm.mcd`

Update all of these coherently:

```txt
- Prisma schema and migration
- lead taxonomy/type definitions
- Zod import payload schemas
- signed import endpoint contract
- LeadImportBatch create/serialization internals
- batch service persistence
- local MiniCRM export client request body
- any lead detail/list read models and UI
- import review projections to exclude private provenance
- audit projections to exclude private provenance
- typecheck and contract guards
```

## Role and UI requirements

```txt
OWNER:
- can view the private provenance record through a dedicated owner-only page/route or an owner-only section;
- can view Business Address, Google Rating, and Google Maps Link.

AGENT:
- can view Business Address, Google Rating, and Google Maps Link for assigned/available leads under normal lead permissions;
- must not see original acquisition code, acquisition reference, vendor information, pricing, invoice, license, or purchase terms.

All non-owner admin roles, including SUPER_ADMIN:
- can view operational lead fields needed for their role;
- must not see the private provenance record or owner-only source codes.
```

Do not rely on hiding values with CSS or a front-end conditional. Enforce on the server and verify it with authorization tests.

## Acceptance tests required before merge

1. Prisma migration applies cleanly to an isolated test database.
2. Typecheck and current build/contract guards pass.
3. A signed import containing address, rating, and Maps URL validates and reaches a Lead record correctly.
4. Rating validation rejects values below 0, above 5, and non-numeric values.
5. A valid Maps URL is stored as `googleMapsUrl`, not `sourceRecordUrl`.
6. An Owner can retrieve the provenance codes from the dedicated Owner-only path.
7. AGENT, ADMIN-equivalent roles, `SUPER_ADMIN`, `COMPLIANCE_MANAGER`, and `FINANCE_MANAGER` receive denial/no-data from every private provenance route/action.
8. Import-review list/detail pages do not select or render private provenance values.
9. AuditLog records do not contain `RAW072026` or `OP_ACQ_072026_001`.
10. Batch replay/idempotency behavior remains intact after the added batch metadata.
11. Existing import tests and all route-collision guards still pass.
12. A preview deployment is reviewed before production merge.

## Production gate

Do not run `mcd-leads intake`, approve, or export `Raw_Leads.csv` until this implementation is merged and the migration/deployment is verified.

After merge:

```txt
1. Update local mcd_lead_ops from the approved implementation.
2. Configure the source mapping without vendor identity.
3. Intake -> preview -> inspect aggregate outcomes -> approval -> supervised export.
4. Keep imported rows PENDING_REVIEW with no automatic agent assignment, call, SMS, email, or campaign enrollment.
5. Reconcile final batch, Lead, LeadActivity, and AuditLog counts read-only.
```

## Claude review request

Claude is asked to:

```txt
1. Implement this as a focused branch/PR against crm.mcd and any required mcd_lead_ops counterpart.
2. Audit for leakage paths, especially schemas, API serializers, server actions, batch review pages,
   logs, audit metadata, and broad ORM selections.
3. Verify all acceptance tests above.
4. Merge only after preview and production safety checks pass.
5. Update the My-Workspace daily log with the PR number, merge commit, migration evidence, and
   confirmation that no live import occurred during implementation.
```
