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
                 discovery, and shipped five PRs under the authorized read-only/admin-navigation/guard scope:
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
- Write a `[G] 2026-07-11 MCD CRM PR#… …` handoff log to `hpintojr/My-Workspace`
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

Latest production commit: `b6984858be64da1ea1798a3fa5e991b052658024` on `crm.mercurycalldesk.com`.
