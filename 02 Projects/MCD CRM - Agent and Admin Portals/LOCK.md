# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T04:30Z (Hamilton authorized handoff to ChatGPT to code the Commission migration fix)
previous_holder: claude (2026-07-11T07:54Z through 2026-07-12T04:30Z. In this stretch Claude:
                 1) Completed the Lead Flow acceptance runbook (18/18 PASS) and recorded Hamilton's
                    owner production decision.
                 2) Read live scaffolding for Servicing/Commissions/Finance and confirmed the
                    read-only structure Hamilton asked for already existed — no duplicate pages built.
                 3) Safety-branch-tested the staged migration `20260701092000_add_client_service_and_ledger`
                    (Neon branch br-aged-night-ajbqk1j7) and found its Client/Service portion was
                    already live in production via an untracked path, while its Commission/Payout
                    portion was still genuinely pending and DDL-clean.
                 4) Shipped PR #99 (merge commit 159738a9d7fda42c61a229b23cbbe39cdba57e38, confirmed
                    READY/PROMOTED in production via Vercel dpl_7XbE2TCBHhqPPJTtjzqwfXdVDbWg) correcting
                    that migration file to drop the already-live Client/Service portion and keep only
                    the Commission/Payout portion, plus a regression guard script.
                 5) On closer read of the actual application code, found the Commission/Payout portion
                    of that same migration STILL does not match what the app needs — wrong column names,
                    wrong enum names/values on `CommissionLedgerEntry`, and three tables the app depends
                    on (`CommissionHold`, `CommissionEligibilityDecision`, `AgentCommissionProfile`)
                    missing from every migration file entirely.
                 6) With Hamilton's explicit approval, did a full read-only investigation (production
                    DB read-only queries + full authoritative reads of 5 commission-related app files)
                    and produced a complete, source-derived schema map of exactly what all 4 Commission
                    tables need — see `01 Daily Logs/[C] 2026-07-12 MCD CRM Commission Schema Drift Full
                    Read-Only Map.md`. Also confirmed via a full authoritative read of `schema.prisma`
                    that Client/Service and Commission features are deliberately built on raw SQL, not
                    Prisma's typed client — schema.prisma has no models for either area, so there is no
                    hidden newer schema.prisma to reconcile against; the migration file is the only spec
                    and it's simply out of date for Commission.
                 No production database writes occurred in this entire stretch beyond the two disposable
                 Neon safety-branch tests (never production itself). No feature flags changed. No
                 Servicing/Commissions/Finance/payout/client-onboarding activation occurred.)
intent: ChatGPT picks up to draft and safety-branch-test (NOT apply to production) a corrected
        Commission-table migration matching the schema mapped in the read-only investigation log
        referenced above. Specifically: redefine `CommissionLedgerEntry` (columns and enum values per
        the map) and add `CommissionHold`, `CommissionEligibilityDecision`, `AgentCommissionProfile`
        (schemas per the map). Test end-to-end on a new disposable Neon branch before touching the repo
        migration file, exactly as Claude did for PR #99. Ship as a PR with a regression guard, merge
        only on 4 green CI checks, write a `[G]` handoff log per PR. Applying anything to production,
        changing feature flags, or activating Commissions/Servicing remain Hamilton-only and are not
        authorized by this handoff. Claude must access hpintojr/My-Workspace exclusively via the
        Composio MCP connector per the [C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate
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
- Disposable Neon safety-branch creation and DDL testing (never production itself) to validate a
  proposed migration correction before editing the repo migration file.
- Drafting and safety-branch-testing a corrected Commission-table migration (redefined
  `CommissionLedgerEntry` + new `CommissionHold`/`CommissionEligibilityDecision`/
  `AgentCommissionProfile` tables) per the schema mapped in `01 Daily Logs/[C] 2026-07-12 MCD CRM
  Commission Schema Drift Full Read-Only Map.md`, and shipping that correction as a PR through the
  normal 4-green-CI + squash-merge + guard-script process — this specific item newly authorized by
  Hamilton on 2026-07-12 as the handoff scope for ChatGPT.

## Not authorized — still requires Hamilton before any action

- Prisma schema changes beyond the specific Commission-table migration correction just authorized.
- Applying any migration to production, or any other production-data branch change.
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

At the end of the owner-authorized continuation, the current holder must:

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

Latest production commit: `159738a9d7fda42c61a229b23cbbe39cdba57e38` on `crm.mercurycalldesk.com`
(PR #99, merged and deployed 2026-07-12; Vercel deployment `dpl_7XbE2TCBHhqPPJTtjzqwfXdVDbWg`
confirmed READY/PROMOTED/aliased).

## MILESTONE 2026-07-12: Lead Flow acceptance runbook complete, owner production decision recorded PASS

All 18 items on the acceptance runbook are resolved; see `01 Daily Logs/[C] 2026-07-11 MCD CRM Owner
Production Decision.md` for full detail. This approval covers normal Lead Flow use only. Servicing,
Commissions, Finance, payout, and client-onboarding activation remain separately gated.

## Commission schema drift — fully mapped 2026-07-12, now handed to ChatGPT to code the fix

PR #99 (merged, live in production) corrected the migration file to remove the already-live
Client/Service portion, keeping only the Commission/Payout portion. A follow-up read-only
investigation (approved by Hamilton) found that the Commission/Payout portion of that migration still
does not match what the app needs:

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

Hamilton has now authorized ChatGPT to draft and safety-branch-test the corrected migration (see
`intent` above and the newly added "Authorized without further owner approval" item). Applying
anything to production remains not authorized.
