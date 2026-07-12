# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-12T06:38Z (ChatGPT completed PR #102 Servicing Acceptance Preflight)
previous_holder: chatgpt (2026-07-12T06:25Z through 2026-07-12T06:38Z. In this stretch ChatGPT:
                  1) Took the lock after Hamilton instructed ChatGPT to keep coding. Claude had recorded
                     no additional work after PR #101.
                  2) Inspected the existing Servicing acceptance board, Client Account onboarding, launch,
                     case, ownership/House workflows, raw-SQL read models, and production Client/Service
                     table and enum contracts.
                  3) Ran read-only production preflight queries confirming all four Client/Service tables,
                     zero Servicing acceptance records, zero Client Accounts, zero Service Cases, and two
                     aggregate verified Closed Won onboarding candidates. No candidate identity was exposed.
                  4) Built a shared read-only Servicing acceptance snapshot with schema checks, Lead Flow
                     prerequisite evidence, feature-gate separation, latest Servicing acceptance outcomes,
                     aggregate operational queues, and hard decisions: BLOCKED_SCHEMA,
                     BLOCKED_LEAD_ACCEPTANCE, UNSAFE_GATE_COMBINATION, OWNER_AUTHORIZATION_REQUIRED, or
                     CONTROLLED_WINDOW_OPEN.
                  5) Added protected `/admin/servicing/acceptance-command-center` and
                     `/api/admin/servicing/acceptance-readiness` with aggregate counts only and no-store JSON.
                  6) Shared the nine Servicing acceptance-step definitions with the existing board, added
                     stable step anchors/deep links, and linked the preflight from the board and Operating Status.
                  7) Added `scripts/check-servicing-acceptance-preflight-guard.ts`, wired into
                     `check:lead-flow-alignment` and production build. The guard rejects mutation primitives
                     in the preflight files and added `Servicing acceptance preflight guard passed.` to
                     deployment verification.
                  8) Shipped PR #102. All four gates were green: Commission Policy, Verify CRM, Application
                     Build, and Vercel Ready/success with zero unresolved toolbar threads. Squash-merged as
                     3ef0117798e110d795a8784946680bf8a99d07bb.
                  9) Verified Vercel production deployment dpl_7VqiqbgwAAvuQNdHfGboVcuxjYgG READY and
                     aliased to crm-mcd.vercel.app and crm.mercurycalldesk.com. `/api/status` returned HTTP
                     200 on main at the exact merge commit. Live unauthenticated
                     `/admin/servicing/acceptance-command-center` returned the secure sign-in boundary.
                 10) Ran a final read-only production query confirming the state remained unchanged:
                     two aggregate onboarding candidates, zero Client Accounts, zero Service Cases, and
                     zero Servicing acceptance records.
                 11) Wrote `01 Daily Logs/[G] 2026-07-12 MCD CRM PR102 Servicing Acceptance Preflight.md`.
                     No migration, production DDL/DML, feature flag, acceptance write, Client/Service
                     mutation, GHL call, Commission/Finance activation, payout, or money movement occurred.)
intent: Claude resumes as execution-lock holder with PR #102 live. Use
        `/admin/servicing/acceptance-command-center` as the source-derived preflight before any Servicing
        test decision. Current expected decision is OWNER_AUTHORIZATION_REQUIRED: schema and Lead Flow
        prerequisites are ready, Commission/Finance remain closed, and two aggregate onboarding candidates
        exist, but SERVICING_ENABLED is still closed and no test records have been used. A controlled
        Servicing window remains a separate Hamilton-only authorization. Do not enable the gate, identify or
        use candidates, create Client Accounts or Service Cases, or record acceptance results without that
        authorization. Commission migration/application and all platform-hardening settings remain separate.
        Claude must access hpintojr/My-Workspace exclusively through the Composio MCP connector.
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
- Read-only verification of PR #100's staged Commission migration, PR #101's readiness surface, and PR #102's Servicing preflight is allowed; applying or activating is not.

## Not authorized — still requires Hamilton before any action

- Applying `20260701092000_add_client_service_and_ledger` or any other migration to production.
- Prisma schema changes beyond separately and explicitly authorized work.
- Any other production-schema or production-data branch change.
- Feature flag changes, including `SERVICING_ENABLED`.
- Live external workflow activation or live external API calls.
- Live import or export submission.
- Identifying or using the aggregate Servicing onboarding candidates.
- Creating, launching, reassigning, or otherwise mutating Client Accounts.
- Creating, responding to, resolving, or otherwise mutating Service Cases.
- Recording Servicing acceptance outcomes.
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
- `01 Daily Logs/[G] 2026-07-12 MCD CRM PR102 Servicing Acceptance Preflight.md`.

Latest production commit: `3ef0117798e110d795a8784946680bf8a99d07bb` on `crm.mercurycalldesk.com`
(PR #102, squash-merged and deployed 2026-07-12; Vercel deployment
`dpl_7VqiqbgwAAvuQNdHfGboVcuxjYgG` confirmed READY and aliased; `/api/status` returned HTTP 200 with
that exact `main` commit).

## MILESTONE 2026-07-12: Lead Flow accepted; Project and Servicing readiness control planes live

All 18 Lead Flow acceptance items and the owner production decision are PASS. PR #101 provides the
cross-module Project Readiness control plane. PR #102 now provides a protected aggregate-only Servicing
acceptance preflight at `/admin/servicing/acceptance-command-center` with JSON at
`/api/admin/servicing/acceptance-readiness`.

## Client Servicing state

- The onboarding, launch, service-case, healthy-account protection, and House-transfer workflows are built.
- Production catalog verification confirms all four required Client/Service tables are present.
- Lead Flow prerequisite is complete.
- Commission and Finance remain closed.
- Production currently has two aggregate eligible onboarding candidates, zero Client Accounts, zero Service Cases, and zero Servicing acceptance records.
- Expected Servicing preflight decision: `OWNER_AUTHORIZATION_REQUIRED`.
- A controlled Servicing acceptance window, use of any candidate, and the feature-gate change still require explicit Hamilton authorization.

## Commission schema state — corrected migration, cleanly staged, not applied

- PR #100 corrected the staged migration to match application raw SQL and added the missing Commission tables.
- Production has 0 of 7 Commission/Payout tables; current and legacy Commission enum types are absent.
- Expected Project Readiness state: `STAGED_ONLY`, not partial drift.
- Production migration apply, controlled Commission acceptance, and feature activation must remain separate owner decisions.

## Platform-hardening decisions still open

- Preview/production environment and secret isolation.
- Least-privilege database role and RLS decision.
- Structured error tracking/observability.
- Authenticated login E2E smoke automation and credentials.
- Neon autoscaling, backup retention, and recovery policy review.
- Repository hygiene for old superseded draft PRs (#1 and #6–#17).
