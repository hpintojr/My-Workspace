# [C] 2026-07-12 MCD CRM Commission Schema Drift — Full Read-Only Map

**Holder:** claude · **Scope:** `hpintojr/crm.mcd` + `hpintojr/My-Workspace` · **Authorization:** Hamilton, in chat, via AskUserQuestion — "Investigate further (read-only)" in response to the PR #99 commission-schema drift finding.

## What was checked

1. Production database, read-only (`get_database_tables` + `information_schema.columns` on the live Neon project, not a branch): confirmed `CommissionLedgerEntry`, `CommissionHold`, `CommissionEligibilityDecision`, `AgentCommissionProfile`, `PayoutBatch`, `PayoutDestination`, `PayoutLine` do not exist in production today. Also confirmed `ClientAccount`'s live columns (`clientName`, `packageCode`, `accountOwnerAgentId`, `originatingAgentId`, `currentOnPayments`, `status`, etc.) exactly match what the application code expects — so the Client/Service side has no additional drift beyond what the prior session already found and fixed in PR #99.
2. `prisma/schema.prisma` on `main`, fetched via the GitHub Contents API (not the CDN raw-content fetch that silently truncated it earlier in this session) — confirmed complete at 14,470 bytes. **It contains no `ClientAccount`, `ClientServiceActivity`, or any Commission/Payout model at all.** This clarifies the earlier open question: this is not a case of "schema.prisma has a newer shape no migration captured." Prisma's typed client is used only for the original Lead/Agent/User schema; Client/Service and Commission features are built entirely on raw SQL (`db.$queryRaw` / `db.$executeRaw` / `db.$transaction`) against tables that exist only in migration files and production reality, tracked via the custom `_mcd_schema_migrations` ledger instead of Prisma's own migration system. That's a deliberate, consistent pattern here, not an oversight.
3. Read five application files in full via the GitHub Contents API: `commission-ledger-actions.ts`, `commission-read-model.ts`, `commission-review-actions.ts`, `commission-hold-release.ts`, `commission-ledger-policy.ts`. Together these define, precisely, the schema the application needs for all four missing Commission tables.

## Full required schema, as used by the app's own raw SQL (not guessed)

**`CommissionLedgerEntry`** — needs columns: `id`, `clientAccountId`, `paymentRef`, `paymentOccurredAt`, `entryType`, `status`, `packageCode`, `earningAgentId`, `originatingAgentId`, `grossCollectedCents`, `refundOffsetCents`, `commissionableCents`, `proposedAgentShareCents`, `calculationNote`, `createdById`, `clearedAt`, `eligibleAt`, `holdReason`, `createdAt`, `updatedAt`.
Enums: `CommissionLedgerEntryType` (`RECURRING`, `SETUP_FEE`, `REFUND_OFFSET`, `CHARGEBACK_HOLD`, `MANUAL_ADJUSTMENT` — 5 values) and `CommissionLedgerEntryStatus` (`PENDING_VERIFICATION`, `ON_HOLD`, `ELIGIBLE` — exactly 3 values, confirmed by `commission-ledger-policy.ts`'s own exhaustive type union).

**`CommissionHold`** (new table, doesn't exist in any migration file) — `id`, `ledgerEntryId`, `clientAccountId`, `agentId`, `reason`, `note`, `active`, `appliedById`, `appliedAt`, `releasedById`, `releasedAt`, `releaseNote`, `createdAt`, `updatedAt`.
Enum: `CommissionHoldReason` (`PAYMENT_UNCLEARED`, `REFUND`, `CHARGEBACK`, `MANUAL_REVIEW`, `COMPLIANCE_REVIEW`, `SERVICE_OWNERSHIP`, `TERMINATED` — 7 values).

**`CommissionEligibilityDecision`** (new table) — `id`, `clientAccountId`, `agentId`, `status`, `reason`, `effectiveAt`, `reviewNote`, `recordedById`, `createdAt`, `supersededAt`.
Enums: `CommissionEligibilityStatus` and `CommissionEligibilityReason` — partially confirmed (`ELIGIBLE`, `PENDING` values seen), full value sets live in `commission-policy.ts`'s `evaluateCommissionEligibility()`, which was not read this round (schema-mapping purposes were already satisfied by the four files above; reading it would only be needed if/when actually drafting a migration).

**`AgentCommissionProfile`** (new table) — `id`, `agentId` (needs a unique constraint — the app does `ON CONFLICT ("agentId")`), `status`, `effectiveAt`, `retiredAt`, `terminatedAt`, `holdReason`, `reviewNote`, `lastReviewedAt`, `createdAt`, `updatedAt`.
Enum: `CommissionProfileStatus` (`ACTIVE`, `RETIRED`, `TERMINATED`, `ON_HOLD` — 4 values, confirmed).

## Conclusion

The picture is now fully mapped from the application's own source, not inferred. What the merged PR #99 migration builds (`CommissionLedgerEntry` with `amountCollectedCents`/`processingFeeCents`/`taxCents`/`wholesaleCents`/`netCommissionableCents`/`partnerShareCents`/`mcdShareCents`, enums `CommissionEntryType`/`CommissionEntryStatus`, and no `CommissionHold`/`CommissionEligibilityDecision`/`AgentCommissionProfile` at all) does not match what the app needs in any of those particulars. A correct migration would need: a redefined `CommissionLedgerEntry` (different columns and enum values), plus three entirely new tables. `PayoutBatch`/`PayoutDestination`/`PayoutLine` (already in the merged migration) were not found referenced by any commission-ledger or commission-review file read this session, so no drift evidence against those three specifically — they may be fine as committed, or may be used by a payout-processing file not yet read.

**Not done, and would require Hamilton's separate authorization per LOCK.md** (this is schema/migration work, materially larger than PR #99): drafting a corrected migration for `CommissionLedgerEntry` plus the three new tables, and safety-branch-testing it. This investigation only read production (via SELECT-only queries) and GitHub source files — no writes, no schema-file edits, no migration drafted.

## Safety boundary reaffirmation

Zero writes anywhere this round: production database was only queried via read-only `SELECT`/`information_schema` lookups (no branch created, no DDL run). No repo files were edited. No feature flags changed.
