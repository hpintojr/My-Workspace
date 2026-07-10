# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-10T07:28Z
previous_holder: chatgpt (2026-07-10 owner-authorized continuation — shipped PR #66, PR #67,
                 PR #68, PR #69, PR #70, PR #71, PR #72, PR #73, PR #74, PR #75, PR #76,
                 and PR #77. PR #66 added stable runbook section anchors. PR #67 bundled the
                 read-only acceptance-navigation backlog with explicit 18-step to 11-runbook-section
                 mapping, acceptance history, history CSV export, command center/report/board links,
                 acceptance-board anchors, and guard coverage. PR #68 added a read-only in-app
                 acceptance findings catalog, JSON endpoint, command center/report/history links, and
                 guard coverage. PR #69 added a read-only acceptance handoff packet, protected JSON
                 endpoint, findings-catalog link, and guard coverage. PR #70 added a read-only
                 acceptance evidence gaps page, protected JSON endpoint, handoff-packet link, and guard
                 coverage. PR #71 added a read-only acceptance evidence matrix page, protected JSON
                 endpoint, handoff/gaps links, and guard coverage. PR #72 added a read-only acceptance
                 closed-gates page, protected JSON endpoint, handoff/gaps/matrix links, and guard
                 coverage. PR #73 added a read-only acceptance overview/cockpit page, protected JSON
                 endpoint, handoff/gaps/matrix/gates links, and guard coverage. PR #74 added a
                 protected /admin/leads/acceptance alias to the overview, a Lead review overview link,
                 and guard coverage. PR #75 added overview links from acceptance history and findings
                 plus guard coverage. PR #76 added overview links from acceptance command center and
                 report plus guard coverage. PR #77 added overview links from acceptance board and
                 runbook plus guard coverage. All required CI green; preview and production smoke tests
                 passed. Latest production commit: a5c33b1c534899e9199f5c24474ec8d217409a01.)
intent: Claude resumes as default executor. Authenticated production acceptance remains Hamilton-only.
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

Latest daily log: `01 Daily Logs/[G] 2026-07-09 MCD CRM PR77 Acceptance Overview Board Runbook Links.md`.
Latest production commit: `a5c33b1c534899e9199f5c24474ec8d217409a01` on `crm.mercurycalldesk.com`.