# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T05:50Z (ChatGPT completed the full-scope audit and PR #101 Project Readiness control plane)
previous_holder: chatgpt (2026-07-12T05:27Z through 2026-07-12T05:50Z. In this stretch ChatGPT:
                  1) Took the lock after Hamilton said to continue coding, then paused a narrow Commission
                     readiness idea when Hamilton requested a full-project scope review.
                  2) Audited the full PR history, current README/Workspace, top-level admin status pages,
                     Lead/Servicing/Commission/Finance state, CI/deployment contracts, and the 13-layer
                     production review. Identified fragmented and stale cross-module readiness reporting
                     as the highest-value owner-authorized end-to-end workstream.
                  3) Built a protected read-only Project Readiness control plane at
                     `/admin/project-readiness` with matching `/api/admin/project-readiness` JSON. The
                     shared snapshot reports deployed Vercel metadata, feature gates, latest acceptance
                     outcomes, integration errors, failed webhooks, Client/Service schema presence,
                     Commission/Payout schema state, exact enum ordering, and legacy drift indicators.
                  4) Linked the control plane from Command Center, Operating Status, and Module Readiness;
                     refreshed stale Operating Status, README, and Workspace content; and repaired the
                     deployment-verification guard list to include Appointment Closed Won, Commission
                     schema migration, and Project Readiness pass lines.
                  5) Added `scripts/check-project-readiness-guard.ts`, wired into
                     `check:lead-flow-alignment` and the production build. The guard protects the page/API/
                     helper/docs/navigation contracts and rejects mutation primitives in the readiness code.
                  6) Shipped PR #101. All 4 required gates were green: Commission Policy, Typecheck and
                     contract guards, Application Build, and Vercel Ready/success with zero unresolved
                     toolbar threads. Squash-merged as 728bc8ac5cc324cc6c1b54523368a8891f00439b.
                  7) Verified Vercel production deployment dpl_6EZu9dPvUotdvPo2ekWNxf2y9dWY READY and
                     aliased to crm-mcd.vercel.app and crm.mercurycalldesk.com. `/api/status` returned HTTP
                     200 on main at the exact merge commit. Live unauthenticated `/admin/project-readiness`
                     returned the secure sign-in boundary, not 404/500.
                  8) Ran a read-only Neon production catalog check: all four Client/Service tables are
                     present; all seven Commission/Payout tables plus current and legacy Commission types
                     are absent. Expected control-plane interpretation is Client/Service SOURCE_ALIGNED and
                     Commission STAGED_ONLY, with no partial/legacy drift.
                  9) Wrote `01 Daily Logs/[G] 2026-07-12 MCD CRM PR101 Project Readiness Control Plane.md`.
                  No production DDL/DML occurred. No feature flags changed. No live GHL calls or workflow
                  activations occurred. Servicing, Commissions, Finance, payout, and client onboarding were
                  not activated. No money movement occurred.)
intent: Claude resumes as execution-lock holder with PR #101 live. Use `/admin/project-readiness` as the
        source-derived preflight for future module decisions. The closest owner-gated operational step is
        a controlled Client Servicing acceptance window because its workflow and production schema exist.
        A Commission production migration apply remains a separate Hamilton-only decision and must not be
        combined with Commission acceptance or feature activation. Platform hardening items requiring
        settings/secrets/owner decisions remain preview-production isolation, least-privilege/RLS,
        structured error tracking, authenticated login smoke, and Neon scaling/backups. Claude must access
        hpintojr/My-Workspace exclusively through the Composio MCP connector per the protocol document.
```

## Authorized without further owner approval

- Add read-only Next.js pages under `src/app/admin/leads/…` or `src/app/admin/…` (server
  component + `requireRole(ADMIN_ROLES)` + appropriate feature-gate boundary + `dynamic = "force-dynamic"`).
- Add read-only API GET endpoints that only read existing audit, integration, schema-catalog, or Lead data and never mutate.
- Add navigation links between existing admin surfaces.
- Extend guard scripts with source-backed `assertContains` or read-only assertions.
- Add focused per-page guard scripts wired into `check:lead-flow-alignment` and the production build path.
- Add anchor `id` attributes for hash-linked deep navigation on existing pages.
- Add or improve read-only summaries, tables, timelines, or matrices sourced from existing data.
- Squash-merge each PR only when all four CI checks are `success` (Vercel Preview Comments/status,
  policy-check, Typecheck and contract guards, build). Never merge on a red or in-progress check.
- Write a `[C]`/`[G]` handoff log to `hpintojr/My-Workspace` `01 Daily Logs/` after every merged PR
  or significant read-only investigation. Include PR head, merge commit, production commit from
  `/api/status`, smoke-test results, and the safety-boundary reaffirmation.
- Read-only investigation of production DB (`SELECT`/catalog only, no DDL/DML) and read-only GitHub source review.
- Disposable Neon safety-branch creation and DDL testing (never production itself) only when the specific correction is authorized.
- Read-only verification of PR #100's staged Commission migration and PR #101's readiness surface is allowed; applying or activating is not.

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
- Mutating or correcting production audit-trail data, even when the root cause is confirmed read-only.
- Payment-provider execution, payout release, financial-account storage, or money movement.

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
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR101 Project Readiness Control Plane.md`.

Latest production commit: `728bc8ac5cc324cc6c1b54523368a8891f00439b` on `crm.mercurycalldesk.com`
(PR #101, squash-merged and deployed 2026-07-12; Vercel deployment
`dpl_6EZu9dPvUotdvPo2ekWNxf2y9dWY` confirmed READY and aliased; `/api/status` returned HTTP 200 with
that exact `main` commit).

## MILESTONE 2026-07-12: Lead Flow acceptance complete and Project Readiness control plane live

All 18 Lead Flow acceptance items and the owner production decision are PASS. PR #101 now provides a
single protected, source-derived preflight at `/admin/project-readiness` and JSON at
`/api/admin/project-readiness` for deployment, gates, acceptance, integration health, and schema state.
Normal Lead Flow use is approved; external GHL configuration and all other module activations remain separate.

## Client Servicing state

- The onboarding, launch, service-case, healthy-account protection, and House-transfer workflows are built.
- Production catalog verification confirms `ClientAccount`, `ClientServiceActivity`,
  `ClientServiceCase`, and `ClientServiceAssignmentEvent` are present.
- Expected Project Readiness state: `SOURCE_ALIGNED`.
- A controlled Servicing acceptance window and feature-gate change still require explicit Hamilton authorization.

## Commission schema state — corrected migration, cleanly staged, not applied

- PR #100 corrected the staged migration to match application raw SQL and added the missing Commission tables.
- Production catalog verification after PR #101 confirms 0 of 7 Commission/Payout tables are present.
- Current and legacy Commission enum types are absent.
- Expected Project Readiness state: `STAGED_ONLY`, not partial drift.
- Production migration apply, controlled Commission acceptance, and feature activation must remain separate owner decisions.

## Platform-hardening decisions still open

- Preview/production environment and secret isolation.
- Least-privilege database role and RLS decision.
- Structured error tracking/observability.
- Authenticated login E2E smoke automation and credentials.
- Neon autoscaling, backup retention, and recovery policy review.
- Repository hygiene for old superseded draft PRs (#1 and #6–#17).
