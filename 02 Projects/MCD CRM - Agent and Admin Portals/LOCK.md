# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-10T23:18Z (ChatGPT owner-authorized continuation complete; lock returned)
previous_holder: chatgpt (2026-07-10T22:38Z owner-authorized continuation after Hamilton said
                 "keep coding". ChatGPT shipped PR #80, #81, #82, and #83 under the authorized
                 read-only/admin-navigation/guard scope. PR #80 added the deferred acceptance
                 runbook; PR #81 added the acceptance summary CSV; PR #82 added the print
                 acceptance runbook; PR #83 added controlled test data history. All four required
                 checks were green before each squash merge. Production deploys succeeded and
                 /api/status confirmed latest production commit
                 5b4782611d8122150b70c386dc9eb27c334d7a0f. Smoke tests confirmed the protected
                 new routes returned the sign-in boundary unauthenticated, not 404/500. No Prisma
                 schema changes, no Neon mutations, no feature flags, no live GHL calls, no live
                 imports/exports, and no real Lead business-rule changes.)
intent: Claude resumes the default execution lock. Authenticated production acceptance and owner
        production decision remain Hamilton-only. Next safe read-only backlog candidate is
        /admin/leads/acceptance-diff, but the deferred acceptance steps and owner decision remain
        the business gate.
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
- Write a `[G] 2026-07-10 MCD CRM PR#… …` handoff log to `hpintojr/My-Workspace`
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

Latest daily logs:
- `01 Daily Logs/[G] 2026-07-10 MCD CRM PR83 Controlled Test Data History.md`.
- `01 Daily Logs/[G] 2026-07-10 MCD CRM ChatGPT Continuation Handback 2.md`.
Latest production commit: `5b4782611d8122150b70c386dc9eb27c334d7a0f` on `crm.mercurycalldesk.com`.
