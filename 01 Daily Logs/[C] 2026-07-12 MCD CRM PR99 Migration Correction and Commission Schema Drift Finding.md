# [C] 2026-07-12 MCD CRM PR#99 Migration Correction + Deeper Commission Schema Drift Finding

**Holder:** claude · **Scope:** `hpintojr/crm.mcd` + `hpintojr/My-Workspace` · **Authorization:** Hamilton, in chat — "go ahead and start coding," narrowed via AskUserQuestion to "Both — fix migration file, then find more."

## Part 1 — PR #99: corrected the migration file, shipped and verified in production

Corrected `prisma/migrations/20260701092000_add_client_service_and_ledger/migration.sql` to remove the
Client/Service portion confirmed already-live in production (see prior log, safety-branch test on
`br-aged-night-ajbqk1j7`), keeping only the Commission/Payout portion (4 enums, 4 tables, 8 foreign keys,
6 indexes) confirmed still-missing and confirmed clean on that same branch. Added a new explanatory
header comment documenting exactly why and citing the branch test.

Added `scripts/check-commission-payout-migration-guard.ts`, wired into `check:lead-flow-alignment` and
its own standalone script, to prevent the Client/Service DDL from silently being re-added to this file
in the future. Confirmed via `GITHUB_SEARCH_CODE` that no other code references this migration file by
name before editing it.

First CI run failed: the guard's own naive substring search flagged the file's own explanatory comment
(which quotes the forbidden `CREATE TYPE "ClientAccountStatus"` string for documentation) as a false
positive. Fixed by stripping SQL comment lines before checking for the real DDL. Second CI run passed
all 4 checks (Vercel Preview Comments, policy-check, Typecheck and contract guards, build).

Merged PR #99 via squash-merge (merge commit `159738a9d7fda42c61a229b23cbbe39cdba57e38`). Confirmed via
`VERCEL_GET_DEPLOYMENT` (`dpl_7XbE2TCBHhqPPJTtjzqwfXdVDbWg`): `readyState: READY`, `readySubstate:
PROMOTED`, aliased to `crm-mcd.vercel.app` and `crm.mercurycalldesk.com`, git SHA matches the merge
commit. No production database write occurred — this PR only changed a repo file that documents/guards
a migration not yet run against production.

## Part 2 — Important finding: the corrected migration still does not match current application code

While waiting on the CI/deploy cycle above, read the two application files that actually use the
Commission ledger schema end-to-end: `src/lib/commission-ledger-actions.ts` and
`src/lib/commission-read-model.ts`. Both are live source on `main`, read-only.

**The corrected `CommissionLedgerEntry` table (the one just merged in PR #99) does not match what this
application code queries and inserts.** Specifically:

- The migration's enums are `CommissionEntryType` / `CommissionEntryStatus`. The application code casts
  to `"CommissionLedgerEntryType"` / `"CommissionLedgerEntryStatus"` — different type names — and uses a
  `'PENDING_VERIFICATION'` status value that does not exist in the migration's enum at all.
- The migration's dollar-amount columns are `amountCollectedCents`, `processingFeeCents`, `taxCents`,
  `wholesaleCents`, `netCommissionableCents`, `partnerShareCents`, `mcdShareCents`. The application code
  reads and writes `grossCollectedCents`, `refundOffsetCents`, `commissionableCents`,
  `proposedAgentShareCents`, `calculationNote`, `createdById` — none of which appear in the migration file.
- The application code also queries three entire tables that do not exist in this migration file (or its
  original, uncorrected version): `"CommissionHold"` (with its own `CommissionHoldReason` enum cast),
  `"CommissionEligibilityDecision"`, and `"AgentCommissionProfile"`.

**What this means:** PR #99 correctly solved the problem it set out to solve — the Client/Service portion
of the file really was stale and really would have failed against production, and that half is now
removed. But the remaining Commission/Payout portion, while it runs cleanly as SQL (confirmed on the
safety branch), describes a schema that is a generation behind the app code that's supposed to use it.
Applying this migration to production as merged would create tables the app does not actually read or
write correctly, and would still be missing `CommissionHold`, `CommissionEligibilityDecision`, and
`AgentCommissionProfile` entirely. In other words: this migration is not "ready to apply" in the way the
prior log's "actionable conclusion" implied — that conclusion was accurate only for the narrow claim that
the DDL executes without SQL errors, not for the broader claim that it would make Commissions functional.

**Not investigated yet, and worth checking before any further migration work:** whether `prisma/schema.prisma`
already contains a newer Commission model shape (matching the app code) that has simply never had a
migration generated for it — the same pattern found with Client/Service. A prior attempt to read
`schema.prisma` in full was silently truncated by the fetch tool before reaching the Commission models, so
this has not been confirmed either way yet.

## Safety boundary reaffirmation

Zero writes to the production database this round. The only production-facing change was PR #99's merge,
which is a repo-file correction (migration SQL + guard script) already reviewed via 4 green CI checks and
verified deployed; it does not itself alter any live database schema, since it is a `.sql` migration file
that nothing has run against production. No feature flags changed. No further schema-file edits were made
after this finding surfaced — that's flagged here for Hamilton rather than acted on unilaterally, since a
correct fix would mean adding 3 new tables and changing column/enum names, a materially larger schema
change than the one already authorized.
