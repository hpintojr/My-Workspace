# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T04:42Z (ChatGPT completed the owner-authorized Commission migration correction and returned the lock)
previous_holder: chatgpt (2026-07-12T04:30Z through 2026-07-12T04:42Z. In this stretch ChatGPT:
                  1) Read this lock, Claude's full schema-drift map, the PR #99 precedent, the existing
                     staged migration/guard, and all six authoritative Commission source/policy files.
                  2) Created disposable Neon branch br-little-rain-aj8nppg1
                     (qa/commission-schema-correction-20260712-chatgpt) from production main in project
                     jolly-lab-80341970. All DDL/DML testing was confined to that child branch.
                  3) Derived and tested the exact corrected schema: source-aligned CommissionLedgerEntry
                     enums/columns plus new CommissionHold, CommissionEligibilityDecision, and
                     AgentCommissionProfile tables, while retaining the staged payout tables.
                  4) Reset the child branch from parent and reapplied the exact final DDL from scratch;
                     verified enum values, columns/types/defaults/nullability, constraints, indexes, and
                     FKs from PostgreSQL catalogs; then passed an app-style profile-upsert, eligibility-
                     supersession, ledger, hold/release, clearance, and payout-link lifecycle smoke test.
                     Synthetic branch-only records were deleted after verification.
                  5) Shipped PR #100 changing exactly the migration file and its existing regression guard.
                     The guard remains wired into check:lead-flow-alignment and now rejects the obsolete
                     schema while requiring the app-used shape. All 4 checks were green before squash merge.
                  6) Squash-merged PR #100 as 1da5be86c720b04314ddc0248bd20e022bf532fc.
                     Vercel deployment dpl_EEBBDYGCKAezVi9FiyFtsUL2UDLf reached READY on production and
                     was aliased to crm-mcd.vercel.app and crm.mercurycalldesk.com. /api/status returned
                     HTTP 200 on main at that exact commit.
                  7) Ran one final read-only production information_schema check confirming
                     CommissionLedgerEntry, CommissionHold, CommissionEligibilityDecision, and
                     AgentCommissionProfile are still absent from production, proving no migration ran.
                  8) Deleted disposable Neon branch br-little-rain-aj8nppg1 and wrote
                     `01 Daily Logs/[G] 2026-07-12 MCD CRM PR100 Commission Schema Migration Correction.md`.
                  No production database DDL/DML occurred. No feature flags changed. No Servicing,
                  Commissions, Finance, payout, or client-onboarding activation occurred.)
intent: Claude resumes as execution-lock holder. PR #100 is complete and the staged migration is now
        source-aligned and safety-branch-tested, but it remains unapplied to production. Applying that
        migration, changing any feature flag, or activating Commissions/Servicing/Finance/payout/client
        onboarding still requires a new, explicit Hamilton authorization. Until then, continue only work
        allowed below and preserve the inactive-state boundaries. Claude must access hpintojr/My-Workspace
        exclusively through the Composio MCP connector per the [C] ChatGPT-to-Claude Handoff Protocol —
        Composio Mandate document in this project folder.
```

## Authorized without further owner approval

- Add read-only Next.js pages under `src/app/admin/leads/…` or `src/app/admin/…` (server
  component + `requireRole(ADMIN_ROLES)` + `features.leads` gate + `dynamic = "force-dynamic"`).
- Add read-only API GET endpoints that only read existing audit or Lead data and never mutate.
- Add navigation links between existing admin surfaces.
- Extend `scripts/check-lead-flow-alignment.ts` with `assertContains` guard assertions.
- Add focused per-page guard scripts mirroring `scripts/check-owner-decision-prep-guard.ts`,
  wired into `check:lead-flow-alignment` and the production build path.
- Add anchor `id` attributes for hash-linked deep navigation on existing pages.
- Add or improve read-only summaries, tables, timelines, or matrices sourced from existing data.
- Squash-merge each PR only when all four CI checks are `success` (Vercel Preview Comments,
  policy-check, Typecheck and contract guards, build). Never merge on a red or in-progress check.
- Write a `[C]`/`[G]` handoff log to `hpintojr/My-Workspace` `01 Daily Logs/` after every merged PR
  or significant read-only investigation. Include PR head, merge commit, production commit from
  `/api/status`, smoke-test results, and the safety-boundary reaffirmation.
- Read-only investigation of production DB (SELECT/information_schema only, no branch/DDL) and
  read-only GitHub source review, to map schema drift or other discrepancies for owner review.
- Disposable Neon safety-branch creation and DDL testing (never production itself) to validate a
  proposed migration correction before editing a repo migration file, when the specific correction
  is otherwise authorized.
- The specific Commission migration correction authorized on 2026-07-12 is complete in PR #100.
  Read-only verification of its repository/deployment state is allowed; applying it is not.

## Not authorized — still requires Hamilton before any action

- Applying `20260701092000_add_client_service_and_ledger` or any other migration to production.
- Prisma schema changes beyond separately and explicitly authorized work.
- Any other production-schema or production-data branch change.
- Feature flag changes.
- Live external workflow activation or live external API calls.
- Live import or export submission.
- Real Lead ownership, approval, suppression, contact-gate, or routing business-rule changes.
- Servicing, Commissions, Finance, payout, or client-onboarding activation.
- Changes to CLAUDE.md's Protected Workspace Command Registry.
- Committing private customer information or credentials.
- Claiming a root cause without direct evidence (build, query, diff, live test).
- Mutating or correcting production audit-trail data (e.g. a corrupted `AuditLog.reason` field),
  even when the root cause has been directly confirmed via read-only query.

## Lock return protocol

At the end of an owner-authorized continuation, the current holder must:

1. Update this file: set `holder:` to the returning party, set `since:` to the return timestamp,
   move the outgoing holder's details into `previous_holder`, and record the intent for whoever
   picks it up next.
2. Write a handoff/handback log to `hpintojr/My-Workspace` `01 Daily Logs/` covering every PR merged,
   the latest production commit, remaining backlog, and observations for the next holder.
3. Commit both to `main` on `hpintojr/My-Workspace`.

Latest daily logs:

- `01 Daily Logs/[C] 2026-07-11 MCD CRM Owner Production Decision.md`.
- `01 Daily Logs/[C] 2026-07-12 MCD CRM Structure Scaffolding Assessment and Safety-Branch Migration Test.md`.
- `01 Daily Logs/[C] 2026-07-12 MCD CRM PR99 Migration Correction and Commission Schema Drift Finding.md`.
- `01 Daily Logs/[C] 2026-07-12 MCD CRM Commission Schema Drift Full Read-Only Map.md`.
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR100 Commission Schema Migration Correction.md`.

Latest production commit: `1da5be86c720b04314ddc0248bd20e022bf532fc` on `crm.mercurycalldesk.com`
(PR #100, squash-merged and deployed 2026-07-12; Vercel deployment
`dpl_EEBBDYGCKAezVi9FiyFtsUL2UDLf` confirmed READY and aliased; `/api/status` returned HTTP 200 with
that exact `main` commit).

## MILESTONE 2026-07-12: Lead Flow acceptance runbook complete, owner production decision recorded PASS

All 18 items on the acceptance runbook are resolved; see `01 Daily Logs/[C] 2026-07-11 MCD CRM Owner
Production Decision.md` for full detail. This approval covers normal Lead Flow use only. Servicing,
Commissions, Finance, payout, and client-onboarding activation remain separately gated.

## Commission schema drift — corrected in the staged migration by PR #100, not applied to production

PR #99 removed the already-live Client/Service portion from the stale mixed migration. PR #100 then
corrected the remaining Commission portion to match the application's raw SQL and added the three
missing tables:

- `CommissionLedgerEntry` now uses the app-required fields `grossCollectedCents`,
  `refundOffsetCents`, `commissionableCents`, `proposedAgentShareCents`, `calculationNote`,
  `createdById`, `clearedAt`, `eligibleAt`, and `holdReason`.
- `CommissionLedgerEntryType` has the five source-backed values including `MANUAL_ADJUSTMENT`.
- `CommissionLedgerEntryStatus` has exactly `PENDING_VERIFICATION`, `ON_HOLD`, and `ELIGIBLE`.
- `CommissionHold`, `CommissionEligibilityDecision`, and `AgentCommissionProfile` are now defined
  with their source-derived columns, enums, constraints, and focused indexes.
- `scripts/check-commission-payout-migration-guard.ts` protects the corrected shape and is wired into
  `check:lead-flow-alignment` and the production build path.
- The exact final DDL passed catalog verification and lifecycle writes on disposable Neon branch
  `br-little-rain-aj8nppg1`, which was deleted after successful merge/deployment verification.

The migration remains staged only. A post-merge read-only production query returned zero matching
Commission tables, confirming it was not applied. Any future production application requires a new,
explicit Hamilton authorization and must remain separate from feature activation.
