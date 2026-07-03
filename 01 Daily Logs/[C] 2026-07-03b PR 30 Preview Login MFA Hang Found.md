---
type: daily-log
date: 2026-07-03
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
---

# PR #30 preview: login hangs at MFA step — merge blocked

## What happened

Before approving the merge of PR #30 (Phase D lead-import batch API), Hamilton live-tested login
on its preview deployment the same way the earlier outage recovery was verified on preview first.
Vercel Deployment Protection was already checked earlier the same day and ruled out as a blocker
(the preview loads the app's real `/login` page directly, no SSO wall) using the connected Vercel
MCP tools -- also confirmed at that point that `LEAD_IMPORT_KEY_ID`/`LEAD_IMPORT_HMAC_SECRET`
were already provisioned on Vercel for both preview and production, and that `DATABASE_URL`/
`DIRECT_URL`/`AUTH_SECRET` are correctly scoped to preview for this branch (a separate
branch-scoped override only affects a different branch, `rebuild/v1-foundation`).

Using the Claude in Chrome extension, navigated to the preview
(`crm-7waczkaxf-hamiltons-projects-f65eeb81.vercel.app`, dpl_3s9yvHJve3WFkaXsHE6Udr2MCQVw,
redeploy of dpl_2QNCija6Ba3tVzBjeo7rWX8eLh85, commit 15ee69c, PR #30) and confirmed the login page
itself renders cleanly. Hamilton then entered his real credentials in that same tab.

```txt
Email + password: accepted, flow correctly advanced to an Authentication code (MFA) field.
Right after that: the entire tab froze. Hamilton saw a disabled-cursor (red circle with a slash)
  across the whole page and could not click anything.
Claude's own browser-automation calls against that same tab (screenshot, JS execution, network-
  request reads) all timed out at the same point -- consistent with a genuinely hung page/JS
  main thread, not just a stuck loading spinner on one button.
Vercel runtime logs for that deployment were empty for the time window -- no server-side error
  captured. Inconclusive on its own (could be a client-only hang, or log lag).
Control check: Hamilton then logged into BOTH /admin and /portal on live production
  (crm.mercurycalldesk.com) successfully with the same credentials, immediately after. Production
  MFA login works fine.
```

## Why this matters

PR #30's actual diff only adds files under `src/app/api/lead-imports/` plus the Prisma schema/
migration -- nothing touching auth, middleware, or `/login`/`/admin`/`/portal`. That an
apparently-unrelated change could break login mirrors the 2026-07-02/07-03 outage (a dynamic-route
slug collision that broke everything, not just the page that changed), so the instinct to treat
"the diff doesn't touch this" as reassurance is exactly what to avoid here.

## Decision

PR #30 is blocked from merging until this is root-caused and fixed, regardless of Tier A/B
readiness otherwise. Documented as an "ACTIVE BLOCKER" section at the top of
`[C] ChatGPT Handoff — Phase D Secrets, PR 30, and Backlog.md`, with investigation steps:
reproduce independently with real devtools open, and critically, test whether a preview of
`main` (not just this branch) also hangs on MFA -- if it does, the bug is preview-environment-
wide and not caused by PR #30; if only this branch's preview hangs, treat it like the earlier
route-collision incident and look for build-level side effects, not just the obvious diff.

## Handback to Claude

Status: Blocked -- needs ChatGPT to root-cause the hang (see investigation steps in the handoff
file) before PR #30 can be merged and Tier B (secrets mirror + live export test) can proceed.
Next: when resuming, check the handoff file's "ACTIVE BLOCKER" section first and the newest
`01 Daily Logs/[G] *.md` entry for what ChatGPT found, before assuming this is resolved.
Question for Hamilton: none new -- this log only records the finding and the merge hold.
