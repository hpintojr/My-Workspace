# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-10T01:39Z
previous_holder: chatgpt (2026-07-10 session — shipped PR #66: stable hash-link anchors on every
                 acceptance-runbook step plus guard coverage; all required CI green; preview and
                 production smoke tests passed. Latest production commit:
                 53ecd2cf12682b265d64ce473766e59c4d4a61f3.)
intent: continue from PR #67 if desired; authenticated production acceptance remains Hamilton-only.
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

Latest daily log: `01 Daily Logs/[G] 2026-07-09 MCD CRM PR66 Runbook Step Anchors.md`.
Latest production commit: `53ecd2cf12682b265d64ce473766e59c4d4a61f3` on `crm.mercurycalldesk.com`.
