# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace (read-only navigation/content additions to the
       Lead acceptance runbook system, plus corresponding My-Workspace daily logs)
since: 2026-07-10T01:05Z
lock_window: ends 2026-07-10T03:57Z (2h 30m). After that, lock returns to Claude automatically
             per default executor rule in CLAUDE.md; if ChatGPT needs more time it must ask
             Hamilton before extending.
previous_holder: claude (2026-07-09 session — shipped PR #59 through PR #65: acceptance runbook,
                 discoverability across every admin surface, printable checklist, where-to-record
                 matrix; refreshed handoff pointers in CLAUDE.md, Workspace Index, and MCD CRM
                 Overview). Latest production commit: 4cba96ac145a77218f9fd62a2d31ce75c955a57c.
intent: continue the read-only acceptance-tooling arc autonomously while Hamilton is unavailable.
        Ship additional navigation/content slices that make the authenticated production
        acceptance run easier to execute later, without touching any business rules.
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
- Modifications to LOCK.md scope or window (write a proposed change and wait; do not self-extend).
- Committing secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
- Claiming a root cause without direct evidence (build, query, diff, live test).

## Lock return protocol

At end of window, or when the read-only backlog is exhausted, ChatGPT must:

1. Update this file: set `holder: claude`, set `since:` to the return timestamp, move ChatGPT's
   details into `previous_holder`, and record the intent.
2. Write a `[G] 2026-07-09 MCD CRM ChatGPT Session Handback.md` log summarizing every PR merged
   during the window, the latest production commit, remaining backlog ideas that were not shipped,
   and any observations Claude should know before picking up.
3. Commit both to `main` on `hpintojr/My-Workspace`.

Latest daily log at handover: `01 Daily Logs/[C] 2026-07-09 MCD CRM PR65 Where To Record Matrix.md`.
Latest production commit at handover: `4cba96ac145a77218f9fd62a2d31ce75c955a57c` on `crm.mercurycalldesk.com`.
