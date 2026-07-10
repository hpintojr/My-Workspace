# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-10T22:38Z (ChatGPT returned the owner-authorized continuation lock after PR #80)
previous_holder: chatgpt (2026-07-10T22:20Z through 2026-07-10T22:38Z continuation window.
                  Read the six required workspace files first, confirmed the lock and boundaries,
                  invoked GitHub, Vercel, and Neon read-only context, then shipped PR #80 in
                  hpintojr/crm.mcd. PR #80 added a protected read-only deferred acceptance runbook
                  at /admin/leads/acceptance-runbook/deferred for the five deferred steps: 4
                  runtime logs, 8 Cold Lead second call attempt / dialer-block failure path,
                  14 Warm Reply Triage timer, 15 controlled GHL appointment harness, and 16
                  controlled GHL opportunity harness. It added a read-only helper
                  src/lib/lead-acceptance-deferred.ts, linked the deferred view from the
                  acceptance overview, full runbook, and acceptance board, and hardened the
                  acceptance-board row anchors with scroll-mt-6 plus data-acceptance-board-step-id.
                  Guard extended in scripts/check-lead-flow-alignment.ts. PR head:
                  72badb873d5abd64d5f7427226a72c09c888fd81. Squash merge / latest production
                  commit: 0b16e2d5422b353a3153d5fee14d3d51bcd60b74. All four required checks were
                  green before merge: Vercel Preview Comments, policy-check, Typecheck and contract
                  guards, and build. Vercel production deployment dpl_4HjYpetikX4JtMG1pjuV1CECrQkS
                  reached READY and /api/status on crm.mercurycalldesk.com returned production/main
                  at commit 0b16e2d5422b353a3153d5fee14d3d51bcd60b74. Safety boundaries were upheld:
                  no Prisma schema changes, no Neon migrations or branch mutations, no feature flag
                  changes, no live GHL workflow activation or live GHL API calls, no live import/export,
                  no real-Lead business-rule changes, and no Servicing/Commissions/Finance/payout or
                  client-onboarding activation.)
intent: Claude resumes as the default executor. Authenticated production acceptance and the owner
        production decision remain Hamilton-only. Continue only inside the Authorized without further
        owner approval list below unless Hamilton explicitly expands scope.
```

## Authorized without further owner approval

- Add read-only Next.js pages under `src/app/admin/leads/…` or `src/app/admin/…` (server
  component + `requireRole(ADMIN_ROLES)` + `features.leads` gate + `dynamic = "force-dynamic"`).
- Add read-only API GET endpoints that only read `db.auditLog` / `db.lead` and never mutate.
- Add navigation links between existing admin surfaces.
- Extend `scripts/check-lead-flow-alignment.ts` with `assertContains` guard assertions.
- Add anchor `id` attributes for hash-linked deep navigation on existing pages.
- Add or improve read-only summaries, tables, timelines, or matrices sourced from existing data.
- Squash-merge each PR only when all four CI checks are `success` (Vercel Preview Comments,
  policy-check, Typecheck and contract guards, build). Never merge on a red or in-progress check.
- Write a `[G] 2026-07-09 MCD CRM PR#… …` handoff log to `hpintojr/My-Workspace`
  `01 Daily Logs/` after every merged PR. Include PR head, merge commit, production commit
  from `/api/status`, the smoke-test results, and the safety-boundary reaffirmation.

## Not authorized — still requires Hamilton before any action

- Prisma schema changes.
- Neon migrations or Neon branch mutations that touch production data.
- Feature flag changes.
- Live GHL workflow activation or live GHL API calls.
- Live import or export submission.
- Lead claim, DNC, ownership, approval, suppression, or two-way-contact business-rule changes.
- Servicing, Commissions, Finance, payout, or client-onboarding activation.
- Changes to CLAUDE.md's Protected Workspace Command Registry.
- Committing secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
- Claiming a root cause without direct evidence (build, query, diff, live test).

## Lock return protocol

At end of the owner-authorized continuation, ChatGPT must:

1. Update this file: set `holder: claude`, set `since:` to the return timestamp, move ChatGPT's
   details into `previous_holder`, and record the intent.
2. Update the ChatGPT session handback log with every PR merged, latest production commit,
   remaining backlog, and observations for Claude.
3. Commit both to `main` on `hpintojr/My-Workspace`.

Latest daily log: `01 Daily Logs/[G] 2026-07-10 MCD CRM ChatGPT PR80 Session Handback.md`.
Latest production commit: `0b16e2d5422b353a3153d5fee14d3d51bcd60b74` on `crm.mercurycalldesk.com`.
