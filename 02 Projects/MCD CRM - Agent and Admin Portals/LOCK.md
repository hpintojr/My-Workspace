# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-11T06:52Z (Claude owner-authorized continuation complete; lock handed to ChatGPT)
previous_holder: claude (2026-07-11T04:17Z through 2026-07-11T06:52Z. Claude picked up after
                 ChatGPT's PR #86 continuation, verified state via Composio (GitHub + Vercel),
                 committed the ChatGPT-to-Claude Handoff Protocol with Composio mandate, and
                 shipped four PRs under the authorized read-only/admin-navigation/guard scope:
                 PR #87 focused guards for PR #80-#84 (prod 7799e5cc),
                 PR #88 deferred-blocker summary on /admin/leads/acceptance-overview (prod f4b0d0a0),
                 PR #89 /admin/leads/deployment-verification page (prod 34e4d664),
                 PR #90 /admin/leads/deep-links hub with 9 stable hash anchors (prod 7020d5bd).
                 All four PRs green on Vercel Preview Comments, policy-check, Typecheck and
                 contract guards, and build before merge. Production deploys reached READY and
                 were aliased to crm.mercurycalldesk.com. /api/status confirmed latest production
                 commit 7020d5bdfda99553a5a1c0fcfd542938e3cff21c. Ten focused guard-pass lines
                 now emit on every production build.
                 Mid-session event: GitHub Actions refused to start required workflows on the
                 private repo with the boilerplate 'recent account payments have failed or your
                 spending limit needs to be increased' annotation. Hamilton changed repo
                 visibility to public to remove the private-repo Actions minute cap. Claude
                 triggered re-run failed jobs via Composio; all three came back success on the
                 same head SHA. No secrets exposed by that visibility change; env vars live in
                 Vercel + Neon, not the repo. No runtime app behavior changes, data path
                 changes, settings changes, external workflow activation, imports/exports, or
                 real Lead business-rule changes across the four PRs.)
intent: ChatGPT resumes for owner-authorized continuation. Authenticated production acceptance
        and owner production decision remain Hamilton-only. Future work should remain
        read-only/admin-navigation/guard scoped unless Hamilton explicitly expands scope. When
        the lock returns to Claude, Claude must access hpintojr/My-Workspace exclusively via
        the Composio MCP connector per the [C] ChatGPT-to-Claude Handoff Protocol — Composio
        Mandate document in this project folder.
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

- `01 Daily Logs/[C] 2026-07-11 MCD CRM PR87 Focused Guards PR80-PR84.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM PR88 Overview Deferred Blockers.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM PR89 Deployment Verification Page.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM PR90 Deep Links Hub and Session Close.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM Claude Session Handback for ChatGPT.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM ChatGPT Handoff Prompt After PR90.md`.

Latest production commit: `7020d5bdfda99553a5a1c0fcfd542938e3cff21c` on `crm.mercurycalldesk.com`.
