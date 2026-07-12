# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-11T07:54Z (ChatGPT owner-authorized continuation complete; lock returned to Claude)
intent: Claude resumes from ChatGPT's PR #95 handback. Authenticated production acceptance and owner
        production decision remain Hamilton-only. Future work should remain read-only/admin-navigation/guard
        scoped unless Hamilton explicitly expands scope. Claude must access hpintojr/My-Workspace exclusively
        via the Composio MCP connector per the [C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate
        document in this project folder.
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

## Not authorized — still requires Hamilton before any action

- Prisma schema changes.
- Database migrations or production-data branch changes (disposable Neon safety-branch DDL tests
  remain fine per the 2026-07-12 precedent, but nothing touching production itself).
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
- Drafting or applying a corrected Commission-table migration (see finding below) — confirmed
  in scope but not yet authorized as of 2026-07-12.

Latest daily logs:

- `01 Daily Logs/[C] 2026-07-11 MCD CRM Owner Production Decision.md`.
- `01 Daily Logs/[C] 2026-07-12 MCD CRM Structure Scaffolding Assessment and Safety-Branch Migration Test.md`.
- `01 Daily Logs/[C] 2026-07-12 MCD CRM PR99 Migration Correction and Commission Schema Drift Finding.md`.
- `01 Daily Logs/[C] 2026-07-12 MCD CRM Commission Schema Drift Full Read-Only Map.md`.

Latest production commit: `159738a9d7fda42c61a229b23cbbe39cdba57e38` on `crm.mercurycalldesk.com`
(PR #99, merged and deployed 2026-07-12; Vercel deployment `dpl_7XbE2TCBHhqPPJTtjzqwfXdVDbWg`
confirmed READY/PROMOTED/aliased).

## MILESTONE 2026-07-12: Lead Flow acceptance runbook complete, owner production decision recorded PASS

All 18 items on the acceptance runbook are resolved; see `01 Daily Logs/[C] 2026-07-11 MCD CRM Owner
Production Decision.md` for full detail. This approval covers normal Lead Flow use only. Servicing,
Commissions, Finance, payout, and client-onboarding activation remain separately gated.

## Commission schema drift — fully mapped 2026-07-12, fix not yet authorized

PR #99 (merged, live in production) corrected the migration file to remove the already-live
Client/Service portion, keeping only the Commission/Payout portion. A follow-up read of the actual
application code (`commission-ledger-actions.ts`, `commission-read-model.ts`, and, after Hamilton
approved further read-only investigation, also `commission-review-actions.ts`,
`commission-hold-release.ts`, `commission-ledger-policy.ts`) found that the Commission/Payout portion
of that migration still does not match what the app needs:

- `CommissionLedgerEntry` needs different columns (`grossCollectedCents`, `refundOffsetCents`,
  `commissionableCents`, `proposedAgentShareCents`, `calculationNote`, `createdById`, `clearedAt`,
  `eligibleAt`, `holdReason`) and different enum names/values (`CommissionLedgerEntryType` with 5
  values including `MANUAL_ADJUSTMENT`; `CommissionLedgerEntryStatus` with exactly 3 values
  `PENDING_VERIFICATION`/`ON_HOLD`/`ELIGIBLE`) than what's in the merged migration.
- Three tables the app depends on do not exist in any migration file at all: `CommissionHold`,
  `CommissionEligibilityDecision`, `AgentCommissionProfile`. Their required columns and enums are
  fully mapped directly from source in `01 Daily Logs/[C] 2026-07-12 MCD CRM Commission Schema Drift
  Full Read-Only Map.md`.
- Confirmed via `prisma/schema.prisma` (full, authoritative read) that this whole feature area is
  built on raw SQL, not Prisma's typed client — schema.prisma has no models for Client/Service or
  Commission at all, by design. So there is no "hidden newer schema.prisma" to reconcile against;
  the migration file itself is simply the only spec, and it's out of date for Commission.
- `PayoutBatch`/`PayoutDestination`/`PayoutLine` (already in the merged migration) were not found
  referenced by any file read this round — no drift evidence against those three specifically.

**Not yet authorized:** drafting and safety-branch-testing a corrected Commission-table migration.
This is scoped, larger, schema/migration work and needs Hamilton's explicit sign-off before any
migration-file edit, per the "Not authorized" list above.
