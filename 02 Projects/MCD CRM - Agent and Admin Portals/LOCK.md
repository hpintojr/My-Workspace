# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-11T03:31Z (ChatGPT owner-authorized continuation complete; lock returned)
previous_holder: chatgpt (2026-07-11T03:25Z owner-authorized continuation after Hamilton said
                 "keep coding". ChatGPT shipped PR #85 under the authorized read-only/admin-navigation
                 scope. PR #85 added the protected read-only owner decision prep page at
                 /admin/leads/owner-decision-prep and linked it from the acceptance overview. All four
                 required checks were green before squash merge. Production deploy succeeded and
                 /api/status confirmed latest production commit
                 68fc1f13aa8d15cd69f321af04c7964f001b0424. Smoke tests confirmed the protected owner
                 prep route returned the sign-in boundary unauthenticated, not 404/500. No out-of-scope
                 data changes, settings changes, external workflow activation, imports/exports, or real
                 Lead business-rule changes.)
intent: Claude resumes the default execution lock. Authenticated production acceptance and owner
        production decision remain Hamilton-only. Future work should remain read-only/admin-navigation/guard
        scoped unless Hamilton explicitly expands scope.
```

## Authorized without further owner approval

- Add read-only Next.js pages under `src/app/admin/leads/…` or `src/app/admin/…` (server
  component + `requireRole(ADMIN_ROLES)` + `features.leads` gate + `dynamic = "force-dynamic"`).
- Add read-only API GET endpoints that only read existing audit or Lead data and never mutate.
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
- Database migrations or production-data branch changes.
- Feature flag changes.
- Live external workflow activation or live external API calls.
- Live import or export submission.
- Lead claim, DNC, ownership, approval, suppression, or two-way-contact business-rule changes.
- Servicing, Commissions, Finance, payout, or client-onboarding activation.
- Changes to CLAUDE.md's Protected Workspace Command Registry.
- Committing secrets, credentials, customer data, or other sensitive data.
- Claiming a root cause without direct evidence (build, query, diff, live test).

## Lock return protocol

At end of the owner-authorized continuation, ChatGPT must:

1. Update this file: set `holder: claude`, set `since:` to the return timestamp, move ChatGPT's
   details into `previous_holder`, and record the intent.
2. Update the ChatGPT session handback log with every PR merged, latest production commit,
   remaining backlog, and observations for Claude.
3. Commit both to `main` on `hpintojr/My-Workspace`.

Latest daily logs:
- `01 Daily Logs/[G] 2026-07-10 MCD CRM PR85 Owner Decision Prep.md`.
- `01 Daily Logs/[G] 2026-07-10 MCD CRM ChatGPT Continuation Handback 4.md`.
Latest production commit: `68fc1f13aa8d15cd69f321af04c7964f001b0424` on `crm.mercurycalldesk.com`.