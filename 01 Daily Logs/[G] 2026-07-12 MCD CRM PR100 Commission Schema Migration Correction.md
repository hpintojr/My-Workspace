# [G] 2026-07-12 MCD CRM PR #100 — Commission Schema Migration Correction

**Holder:** ChatGPT  
**Scope:** `hpintojr/crm.mcd` + `hpintojr/My-Workspace`  
**Owner authorization:** Hamilton's explicit handoff recorded in `02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md`  
**Completed:** 2026-07-12T04:41Z

## Outcome

PR #100 corrected the staged Commission migration so it now matches the raw SQL that the live application code actually reads and writes. The correction was tested end to end on a disposable Neon child branch, protected by a strengthened regression guard, passed all four required CI checks, and was squash-merged.

This work **did not apply the migration to the production database**. The production deployment contains only the corrected migration file and guard script. Commissions, Servicing, Finance, payout, and client onboarding remain inactive and owner-gated.

## Source reconciliation

The final schema was derived from authoritative reads of:

- `src/lib/commission-ledger-actions.ts`
- `src/lib/commission-read-model.ts`
- `src/lib/commission-review-actions.ts`
- `src/lib/commission-hold-release.ts`
- `src/lib/commission-ledger-policy.ts`
- `src/lib/commission-policy.ts`
- `01 Daily Logs/[C] 2026-07-12 MCD CRM Commission Schema Drift Full Read-Only Map.md`

The old migration still used obsolete `CommissionEntryType` / `CommissionEntryStatus` enums, old amount columns, and omitted three tables required by the app.

The corrected migration now defines:

- `CommissionLedgerEntryType`: `RECURRING`, `SETUP_FEE`, `REFUND_OFFSET`, `CHARGEBACK_HOLD`, `MANUAL_ADJUSTMENT`
- `CommissionLedgerEntryStatus`: `PENDING_VERIFICATION`, `ON_HOLD`, `ELIGIBLE`
- `CommissionHoldReason`
- `CommissionEligibilityStatus`
- `CommissionEligibilityReason`
- `CommissionProfileStatus`
- corrected `CommissionLedgerEntry`
- new `CommissionHold`
- new `CommissionEligibilityDecision`
- new `AgentCommissionProfile`
- the existing payout tables and `PayoutBatchStatus`, retained within the staged migration

The corrected ledger includes the source-used fields `grossCollectedCents`, `refundOffsetCents`, `commissionableCents`, `proposedAgentShareCents`, `calculationNote`, `createdById`, `clearedAt`, `eligibleAt`, and `holdReason`.

## Neon safety-branch validation

- **Project:** `jolly-lab-80341970` (`mcd-crm-production`)
- **Production parent branch:** `br-flat-cloud-aj9r0d6b` (`main`)
- **Disposable branch:** `br-little-rain-aj8nppg1`
- **Branch name:** `qa/commission-schema-correction-20260712-chatgpt`

Process:

1. Created the child branch from production `main`.
2. Read existing production-parent key types and FK conventions through read-only catalog queries.
3. Applied a draft on the child branch, reviewed the resulting catalog, and refined audit/actor ID handling to match existing repository conventions.
4. Reset the child branch from its parent.
5. Applied the **exact final DDL** from scratch in one transaction.
6. Verified PostgreSQL catalog output for enum values/order, columns, types, nullability, defaults, primary/unique constraints, indexes, foreign keys, and delete/update actions.
7. Ran an app-style lifecycle smoke test with clearly prefixed synthetic branch-only data:
   - `AgentCommissionProfile` upsert using `ON CONFLICT ("agentId")`
   - eligibility decision supersession and current-decision lookup
   - ledger intake with the exact application enum casts
   - hold application and release
   - ledger clearance and transition to `ELIGIBLE`
   - payout batch/destination/line FK chain
8. Confirmed the expected joined read model values.
9. Deleted all synthetic records.
10. Generated a parent/child schema diff and confirmed it was limited to the intended Commission/Payout schema.
11. Deleted disposable branch `br-little-rain-aj8nppg1` after merge and production verification.

No DDL or DML was applied to the production parent branch.

## Repository changes

Working branch: `fix/commission-schema-drift-migration`

PR: https://github.com/hpintojr/crm.mcd/pull/100

PR head: `5584b07a47b8537250260b6748459b0f4452f463`

Changed exactly two files:

1. `prisma/migrations/20260701092000_add_client_service_and_ledger/migration.sql`
2. `scripts/check-commission-payout-migration-guard.ts`

The existing guard was strengthened rather than adding unrelated machinery. It remains wired into `check:lead-flow-alignment` and therefore the production build path. It now requires the source-backed enums, tables, key ledger columns, uniqueness needed by the profile upsert, current-decision protection, and key foreign keys; it rejects the obsolete Commission shape and the already-live Client/Service DDL removed by PR #99.

A negative regression test intentionally replaced a required ledger column with its obsolete predecessor and the guard failed as expected; the correct file then passed again.

No application behavior, feature flags, Prisma models, deployment configuration, or unrelated source files changed.

## CI and merge

All four required checks were green before merge:

- Vercel Preview Comments / Ready preview — zero unresolved feedback threads
- `policy-check` — success
- `Typecheck and contract guards` — success
- `build` — success

PR #100 was squash-merged only after those checks completed successfully.

**Squash merge commit:** `1da5be86c720b04314ddc0248bd20e022bf532fc`

## Production deployment verification

- **Vercel deployment:** `dpl_EEBBDYGCKAezVi9FiyFtsUL2UDLf`
- **State:** `READY`
- **Target:** production
- **Git SHA:** `1da5be86c720b04314ddc0248bd20e022bf532fc`
- **Aliases:** `crm-mcd.vercel.app`, `crm.mercurycalldesk.com`
- **Build evidence:** `Commission schema migration guard passed`, Prisma generation succeeded, and the Next.js production build compiled successfully.

Live `https://crm.mercurycalldesk.com/api/status` returned HTTP 200 with:

- `environment: production`
- `branch: main`
- `commitSha: 1da5be86c720b04314ddc0248bd20e022bf532fc`

A final read-only query against Neon production `main` checked `information_schema.tables` for:

- `CommissionLedgerEntry`
- `CommissionHold`
- `CommissionEligibilityDecision`
- `AgentCommissionProfile`

It returned zero rows. This independently confirms the repository/deployment merge did not apply the staged migration to production.

## Safety boundary reaffirmation

- No production database migration was run.
- No production schema or data was changed.
- No feature flag was changed.
- Commissions, Servicing, Finance, payout, and client onboarding were not activated.
- No live external workflow was activated.
- The disposable Neon branch was deleted.

## Remaining owner-gated action

The staged migration file is now source-aligned and safety-branch-tested, but **applying it to production remains a separate Hamilton-only decision**. Activation of any Commission, Servicing, Finance, payout, or client-onboarding surface remains separately gated even after any future schema application.

Before any future production migration, the next holder must reread `LOCK.md`, obtain Hamilton's explicit authorization, use the controlled migration workflow, and verify production schema and application behavior before considering any feature activation.
