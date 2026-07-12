# [C] 2026-07-12 MCD CRM Next-Slice Structure Assessment + Safety-Branch Migration Test

**Holder:** claude · **Scope:** `hpintojr/crm.mcd` + `hpintojr/My-Workspace` · **Authorization:** Hamilton, in chat — "whatever is next directly within the scope lets continue with i need you to start the structure before I do another handoff to chatgpt," narrowed by his choices on: (1) "Just the read-only scaffolding for all three" (Servicing + Commissions + Finance), and (2) "Yes, test on a safety branch" for the staged client/service/ledger migration.

## Part 1 — Read-only scaffolding for Servicing, Commissions, and Finance: already built, not missing

Read the live source of all five relevant admin pages directly from `main` before writing anything new, to avoid duplicating existing work. Finding: **the read-only scaffolding Hamilton asked for already exists and is already deployed to production**, gated safely behind the (currently all-`false`) feature flags:

- `/admin/readiness` — a dynamic acceptance dashboard that already tracks Leads (18 steps), Servicing (9 steps), and Commissions (8 steps) acceptance progress side by side, shows each module's feature-gate state (`Controlled test enabled` vs `Staged / locked`), and links to each module's own testing/command-center pages.
- `/admin/servicing` — full Client Servicing Health workspace (client health, open service cases, onboarding/launch queues, House-transfer/retain-servicing actions). Renders a safe "staged and locked" boundary message while `features.servicing` is `false`; the real workspace is fully built behind the flag.
- `/admin/commissions` — full Commission eligibility workspace (agent commission profiles, eligibility review queue, ledger review). Same pattern: safe boundary text while `features.commissions` is `false`.
- `/admin/finance` — a static readiness-boundary page (six-point checklist, explicitly "no payment instruction, financial-account storage, or money-movement action").
- `/admin/finance-preview` — a live, working Commission Preview calculator (`CommissionPreviewForm`), explicitly labeled "does not create a ledger entry, approve a payout, or move money."

Conclusion: no new scaffolding was written this round because none is missing. Writing duplicate pages would have created drift against the already-shipped, already-reviewed implementation. If Hamilton wants something different from what's already live (e.g., additional detail on any one page), that's a scoped follow-up, not a gap in "structure."

## Part 2 — Safety-branch migration test (Neon), with an important drift finding

Created a disposable Neon branch (not production) to test the migration file the roadmap doc lists as still staged: `prisma/migrations/20260701092000_add_client_service_and_ledger`.

- **Branch:** `br-aged-night-ajbqk1j7` (`qa/commission-payout-migration-test-20260712`), forked from production's default branch, auto-expires `2026-07-19T00:00:00Z`. Not deleted manually — left to self-expire; can be deleted sooner on request.

**Finding — the migration file is only partially still-pending.** Before running anything, I checked production's actual live tables (`get_database_tables`, read-only, no risk) and cross-checked the project's own migration ledger (`_mcd_schema_migrations`). Production **already has** `ClientAccount`, `ClientServiceActivity`, `ClientServiceCase`, and `ClientServiceAssignmentEvent` (plus their enums) — live, today — even though neither the `_mcd_schema_migrations` ledger nor the roadmap doc mentions this. The commission/payout side (`CommissionLedgerEntry`, `PayoutBatch`, `PayoutDestination`, `PayoutLine` and their 4 enums) does **not** yet exist anywhere.

Ran the migration file exactly as committed, as a transaction, on the safety branch first — confirmed it fails immediately: `type "ClientAccountStatus" already exists`. This is expected once you know the Client/Service portion is already live; it is not a sign anything is broken, just that the migration file is stale for that half.

Then isolated and ran only the genuinely-still-missing statements (4 enums, 4 tables, 8 foreign keys, 6 indexes — the full Commission/Payout half) on the same branch. **All 22 statements applied cleanly, zero errors.** Verified on the branch afterward: table exists with all 26 expected columns and correct types, all 8 foreign keys present and pointing at the right tables (`ClientAccount`, `Agent`, `PayoutBatch`, `CommissionLedgerEntry`).

**Actionable conclusion:** when Servicing/Commissions eventually go live, the actual remaining schema work is *only* the Commission/Payout tables — a corrected, minimal migration (not the file as currently committed) is what should be applied to production, and it is now proven safe on a disposable branch. The committed migration file should be corrected or split so a future `prisma migrate deploy` doesn't fail the same way against production.

**Not done, and not authorized without separate approval:** applying anything to production, changing any feature flag, and updating the migration file in the repo (that's a schema-file change requiring Hamilton's sign-off per `LOCK.md`, even though the branch test proves it's now safe).

## Safety boundary reaffirmation

Zero writes to the production database. All schema changes happened only on the disposable branch `br-aged-night-ajbqk1j7`, which self-expires 2026-07-19. No feature flags changed, no migration file in the repo modified, no Servicing/Commissions/Finance activation. This is read-only investigation plus a sandboxed schema test, exactly as approved.
