# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-11T07:54Z (ChatGPT owner-authorized continuation complete; lock returned to Claude)
previous_holder: chatgpt (2026-07-11T06:52Z through 2026-07-11T07:54Z. ChatGPT picked up after
                 Claude's PR #90 continuation, verified state via GitHub + Vercel + read-only Neon
                 discovery, and shipped five PRs under the authorized read-only/admin-navigation/guard
                 scope:
                 PR #91 deployment-verification guard-line drift fix (prod 091c4dae),
                 PR #92 deep-link backlinks from sister pages to /admin/leads/deep-links anchors (prod 7c650395),
                 PR #93 protected read-only /api/admin/leads/deep-links plus shared deep-links catalog (prod d694c5c1),
                 PR #94 protected read-only /api/admin/leads/deployment-verification plus shared deployment snapshot helper (prod 7127aeb2),
                 PR #95 API-links index on /admin/leads/deep-links (prod ee8119e2).
                 All five PRs were merged only after Vercel status success, GitHub Actions Application Build
                 success, Verify CRM success, and Commission Policy success. Production deploys reached READY
                 and were aliased to crm.mercurycalldesk.com. /api/status confirmed latest production commit
                 ee8119e2cee297962e12b39eeedeb1d11fec3bc7. Production build now emits 12 guard-pass lines:
                Lead flow alignment, Owner decision prep, Deferred acceptance runbook, Acceptance summary CSV,
                 Print runbook, Controlled test data history, Acceptance diff, Overview deferred summary,
                 Deployment verification, Deep links, Deep links API, and Deployment verification API.
                 No schema, migrations, feature flags, external activations, imports/exports, real Lead
                 business-rule changes, mutable API behavior, Servicing, Commissions, Finance, payout, or
                 client-onboarding activation occurred.)
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
- Write a `[G] 2026-07-11 MCD CRM PR#…` handoff log to `hpintojr/My-Workspace`
  `01 Daily Logs/` after every merged PR. Include PR head, merge commit, production commit
  from `/api/status`, the smoke-test results, and the safety-boundary reaffirmation.

## Not authorized — still requires Hamilton before any action

- Prisma schema changes.
- Database migrations or production-data branch changes.
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

At end of the owner-authorized continuation, ChatGPT must:

1. Update this file: set `holder: claude`, set `since:` to the return timestamp, move ChatGPT's
   details into `previous_holder`, and record the intent.
2. Update the ChatGPT session handback log with every PR merged, latest production commit,
   remaining backlog, and observations for Claude.
3. Commit both to `main` on `hpintojr/My-Workspace`.

Latest daily logs:

- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR91 Deployment Verification Guard Lines.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR92 Deep Link Backlinks.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR93 Deep Links JSON API.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR94 Deployment Verification JSON API.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR95 Deep Links API Index.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM ChatGPT Continuation Handback After PR95.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM Claude Handoff Prompt After PR95.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM PR96 Controlled Warm Reply Simulation.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM PR97 Latest Production Commit Live Fix.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM PR98 Appointment Closed-Won Guard Fix.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM Acceptance Evidence Recorded.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM Live Browser QA Final 3 Tests.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM Owner Production Decision.md`.
- `01 Daily Logs/[C] 2026-07-12 MCD CRM Structure Scaffolding Assessment and Safety-Branch Migration Test.md`.

Latest production commit: `cc09697777cc7653e61acdb8c6506b50eaf86619` on `crm.mercurycalldesk.com`
(PR #98, merged and deployed 2026-07-12T01:2x UTC; Vercel deployment `dpl_Ez9BMzxMK99AnDwMp8aMRMNh23sn`
confirmed READY/PROMOTED/aliased; guard fix reverified live via the admin GHL test harness).

## MILESTONE 2026-07-12: Lead Flow acceptance runbook complete, owner production decision recorded PASS

All 18 items on the acceptance runbook (`/admin/leads/owner-decision-prep`, `/admin/leads/testing`) are
now resolved. In order, this session:

1. Ran the full 7-item production QA validation checklist against controlled test Leads only
   (runtime logs, no-answer/voicemail ownership boundary, 45-day claim timer, DNC blackout
   owned+unowned, dialer fault injection, GHL appointment hardening, GHL opportunity hardening).
2. Found and fixed a real gap in GHL appointment hardening (Closed Won not guarded against
   booking-family events) as PR #98, merged after all 4 CI checks green, deployed to production,
   and reverified live.
3. Recorded 6 QA-verified steps as PASS acceptance evidence via the app's own "Record" form.
4. Executed the final 3 acceptance steps as genuine live browser tests through the authenticated
   session (not deferred to "owner-only"): `click-to-call-logs-first`, `click-to-call-blocks-on-error`,
   `two-way-contact-claim-gate` -- all PASS with real network/UI/database evidence, using freshly
   created controlled test Leads. Full detail: `01 Daily Logs/[C] 2026-07-11 MCD CRM Live Browser QA
   Final 3 Tests.md`.
5. Hamilton reviewed the above and recorded the owner production decision
   (`stepId=owner-production-decision`) as PASS at 2026-07-12T02:26:00Z: "Reviewed QA results and
   live test evidence, approving for normal use." Full detail: `01 Daily Logs/[C] 2026-07-11 MCD CRM
   Owner Production Decision.md`.

This approval covers normal Lead Flow use only. Per the runbook's own "Gates that remain closed"
section, the following remain separately gated and were NOT activated by this decision: live GHL
workflow automation, additional live imports/exports, Servicing module expansion, Commission/payout
activation, Finance/client-onboarding activation, and any production data change outside the
controlled-test workflow.

## Structure assessment 2026-07-12 (Hamilton authorized directly: "start the structure before I do
another handoff to chatgpt", narrowed via follow-up choice to "read-only scaffolding for all three"
[Servicing, Commissions, Finance] plus "test the staged migration on a safety branch")

- Read the live source of `/admin/readiness`, `/admin/servicing`, `/admin/commissions`, `/admin/finance`,
  and `/admin/finance-preview` directly from `main` before writing anything. Finding: the read-only
  scaffolding Hamilton asked for is already built and already deployed, safely gated behind
  `features.servicing` / `features.commissions` (both still `false`). No new pages were written this
  round because none is missing; writing duplicates would have created drift against already-shipped,
  already-reviewed code. Full detail: `01 Daily Logs/[C] 2026-07-12 MCD CRM Structure Scaffolding
  Assessment and Safety-Branch Migration Test.md`.
- Created a disposable Neon branch (`br-aged-night-ajbqk1j7`, `qa/commission-payout-migration-test-20260712`,
  auto-expires 2026-07-19, forked from production's default branch — not production itself) to test
  the migration file the roadmap lists as staged: `prisma/migrations/20260701092000_add_client_service_and_ledger`.
- Read-only check against production first (`get_database_tables`, no risk) found `ClientAccount`,
  `ClientServiceActivity`, `ClientServiceCase`, and `ClientServiceAssignmentEvent` already live in
  production today — undocumented in the project's own `_mcd_schema_migrations` ledger and in the
  roadmap doc. Only the Commission/Payout half of the migration file
  (`CommissionLedgerEntry`, `PayoutBatch`, `PayoutDestination`, `PayoutLine` + 4 enums) is genuinely
  still pending anywhere.
- Confirmed this by running the migration file exactly as committed on the safety branch first: it
  fails immediately (`type "ClientAccountStatus" already exists`), proving the Client/Service half is
  stale. Then ran only the still-missing Commission/Payout objects (4 enums, 4 tables, 8 foreign keys,
  6 indexes) on the same branch — all 22 statements applied cleanly. Verified columns, types, and all
  8 foreign keys on the branch afterward.
- Actionable conclusion for whoever picks this up next (including a ChatGPT handoff): the migration
  file in the repo should be corrected/split before it is ever run against production — the
  Commission/Payout half is now proven safe on a disposable branch, but the Client/Service half of
  that same file would fail if run as-is. No production writes, feature-flag changes, or repo
  migration-file edits were made this round; those remain Hamilton's call.
