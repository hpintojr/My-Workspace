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
`[C] ChatGPT Handoff — Phase D Secrets, PR 30, and Backlog.md`.

## Update, same day: checked against the separate Incident 2 (PR #27/#28/#29)

After this was logged, discovered via the GitHub connector that a separate, already-resolved
production incident (`01 Daily Logs/[C] 2026-07-03 MCD CRM Login Hang Incident Resolved.md`) had
the exact same symptom -- sign-in stuck at "Signing in...". That incident's root cause was PR #27
adding a `recoverCompletedSession()` poll to work around a known Auth.js v5 stall bug; PR #28
(which reverted that fix) was confirmed to hang. Checked whether PR #30's branch was simply
missing PR #27's fix (branched before it merged): **ruled out** -- verified via
`GITHUB_COMPARE_TWO_COMMITS` that `feature/lead-import-batch-api`'s merge-base with `main` is
exactly PR #27's own merge commit (3e9dfea0), and that `src/app/(auth)/login/complete/page.tsx`
is byte-identical (same blob sha) on both branches. So PR #30's branch already has PR #27's fix --
this is not a simple repeat of Incident 2. Root cause is still open; revised investigation steps
are in the handoff file (reproduce without automation attached to the same tab, diff the branch's
full commit range against build-level side effects, not just the obvious file list).

## Handback to Claude

Status: Blocked -- needs ChatGPT to root-cause the hang (see investigation steps in the handoff
file) before PR #30 can be merged and Tier B (secrets mirror + live export test) can proceed.
Next: when resuming, check the handoff file's "ACTIVE BLOCKER" section first and the newest
`01 Daily Logs/[G] *.md` entry for what ChatGPT found, before assuming this is resolved.
Question for Hamilton: none new -- this log only records the finding and the merge hold.
