# MCD CRM — Lead Foundation Core Schema Migration Plan

**Status:** Proposed only — not executed  
**Date:** 2026-07-03  
**Database authority:** Neon custom ledger `public._mcd_schema_migrations`  
**Target safety branch:** `lead-foundation-contract-v1`

## 1. Purpose

Define the smallest additive database change that allows the signed import contract to become a durable, auditable MiniCRM workflow without enabling any campaign, agent assignment, GHL, servicing, commission, or finance behavior.

This is **not** a production migration authorization.

## 2. Migration identity

```txt
Ledger ID: 20260703_002_lead_foundation_core
Description: Lead contacts and durable signed-import records
Execution method: reviewed SQL through the existing _mcd_schema_migrations process
Prisma role: schema representation and generated client only; not the applied-schema ledger
```

## 3. Included database changes

### 3.1 Existing Lead compatibility

```txt
ALTER Lead.businessPhone from required to nullable.
```

Reason: an approved B2B record may be email-only. The system must not create fake phone values. Existing lead fields remain available for compatibility and display during the staged transition to LeadContact.

No existing Lead row is modified by this schema change.

### 3.2 New LeadContact table

A Lead stays the company-level prospect/opportunity. `LeadContact` stores zero or more people or business contact routes attached to that Lead.

```txt
LeadContact
- id
- leadId → Lead
- contactType: PRIMARY | DECISION_MAKER | OPERATIONAL | BILLING | GENERAL | OTHER
- firstName / lastName
- email / normalizedEmail
- businessPhone / normalizedPhone
- isPrimary
- status: ACTIVE | INVALID | SUPPRESSED | ARCHIVED
- sourceRecordReference
- createdAt / updatedAt
```

Indexes:

```txt
leadId + isPrimary
normalizedEmail
normalizedPhone
status
```

No automatic contact backfill belongs in this migration. A later reviewed job may create a primary LeadContact from an existing Lead only when there is a real recorded contact route.

### 3.3 New LeadImportKey table

Tracks non-secret key metadata for local importer authorization and rotation.

```txt
LeadImportKey
- id
- keyId (unique public identifier)
- label
- status: ACTIVE | REVOKED | RETIRED
- secretFingerprint (optional; never the secret itself)
- createdAt / revokedAt / retiredAt
```

HMAC secret material remains in controlled deployment secrets, never in Neon, Git, reports, or the local manifest.

### 3.4 New LeadImportBatch table

A single approved local run becomes one durable batch.

```txt
LeadImportBatch
- id
- keyId → LeadImportKey.keyId
- localRunId
- operatorName
- sourceAdapter / sourceAdapterVersion
- manifestHash
- clientVersion
- status
- totalRows / validRows / rejectedRows / importedRows
- approvedByUserId / approvedAt / approvalReference
- submittedAt / completedAt / failedAt / errorMessage
- createdAt / updatedAt
```

Constraints/indexes:

```txt
UNIQUE(keyId, localRunId)
INDEX(status, createdAt)
INDEX(approvedByUserId)
```

### 3.5 New LeadImportRecord table

Each submitted row gets a permanent reconciliation result.

```txt
LeadImportRecord
- id
- batchId → LeadImportBatch
- rowNumber
- rowHash
- idempotencyKey (unique)
- status
- inputSnapshot (validated business-contact input only)
- normalizedSnapshot
- issues
- resolvedLeadId → Lead (optional)
- reviewedByUserId / reviewedAt / reviewNote
- importedAt / errorMessage
- createdAt / updatedAt
```

Constraints/indexes:

```txt
UNIQUE(batchId, rowNumber)
UNIQUE(idempotencyKey)
INDEX(status, createdAt)
INDEX(resolvedLeadId)
INDEX(reviewedByUserId)
```

### 3.6 New LeadImportRequest table

Provides durable replay/idempotency evidence for signed machine requests.

```txt
LeadImportRequest
- id
- keyId → LeadImportKey.keyId
- batchId → LeadImportBatch (optional for initial batch creation)
- method / path
- signedTimestampMs
- bodySha256
- signature
- requestIdempotencyKey (optional)
- status: RECEIVED | COMPLETED | REJECTED | FAILED
- responseStatusCode
- expiresAt
- createdAt
```

Constraints/indexes:

```txt
UNIQUE(keyId, signature)
INDEX(expiresAt)
INDEX(batchId, createdAt)
```

A legitimate retry returns the recorded deterministic result. A changed body, path, timestamp window, or signature fails verification before import processing.

## 4. Explicitly excluded from this migration

```txt
- proposal/quote tables
- campaign provider event history
- reply triage
- lifecycle enum expansion
- pool-movement redesign
- channel-specific suppression redesign
- automatic LeadContact backfill
- GHL handoff changes
- email/SMS/social sending
- servicing, commissions, or finance tables
```

## 5. Validation before execution

1. Verify every proposed table name is absent on `lead-foundation-contract-v1`.
2. Verify `Lead.businessPhone` is currently required and has no constraint beyond the column nullability change.
3. Verify all new foreign keys point to existing primary or unique keys.
4. Verify the Prisma schema representation exactly matches the SQL types, defaults, enums, unique constraints, and indexes.
5. Verify `_mcd_schema_migrations` receives the migration ID only in the same successful transaction as the schema change.
6. Run the query set below after execution on the isolated branch.

## 6. Post-execution acceptance queries

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('LeadContact', 'LeadImportKey', 'LeadImportBatch', 'LeadImportRecord', 'LeadImportRequest')
ORDER BY table_name;

SELECT is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'Lead'
  AND column_name = 'businessPhone';

SELECT id, description
FROM "_mcd_schema_migrations"
WHERE id = '20260703_002_lead_foundation_core';
```

## 7. Rollback/restore position

Before real data is added, a rejected migration may be removed on the isolated Neon branch. After import data exists, destructive rollback is not safe; use a Neon branch restore/rollback plan rather than dropping business records.

Production stays unchanged until:

```txt
- route-recovery acceptance is complete;
- the SQL and Prisma representations are reviewed together;
- isolated-branch validation passes;
- an explicit production execution/rollback plan is approved;
- feature flags remain disabled until the API and Admin-review acceptance suite passes.
```
