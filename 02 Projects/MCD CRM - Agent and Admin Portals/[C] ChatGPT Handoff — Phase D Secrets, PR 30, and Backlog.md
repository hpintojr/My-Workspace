---
type: handoff
date: 2026-07-03
project: MCD CRM - Agent and Admin Portals
execution_owner: ChatGPT
overseen_by: Hamilton
resumes: Claude, once Tier A + Tier B below are closed
---

# ChatGPT Handoff — Phase D Secrets, PR #30, and Backlog

**Execution owner starting now: ChatGPT** (direct repo/Neon/Vercel access). Claude is paused to
conserve usage. Hamilton is overseeing and is the only one who can approve the items marked
Hamilton-only below. Read this whole file before doing anything.

## ACTIVE BLOCKER — 2026-07-03, do not merge PR #30 until this is resolved

Hamilton live-tested login on PR #30's preview deployment
(`crm-7waczkaxf-hamiltons-projects-f65eeb81.vercel.app`, dpl_3s9yvHJve3WFkaXsHE6Udr2MCQVw,
redeploy of dpl_2QNCija6Ba3tVzBjeo7rWX8eLh85, commit 15ee69c) before approving the merge, the same
way the earlier outage recovery was verified on preview first. Result:

```txt
Email + password accepted, flow correctly advanced to the Authentication code (MFA) field.
Immediately after that, the entire tab froze -- Hamilton saw a disabled-cursor (red circle with
  a slash) across the whole page, could not click anything. Claude's own browser-automation tool
  calls against that same tab (screenshot, JS exec, network-request read) also all timed out,
  consistent with a genuinely hung page, not just a stuck loading spinner on one button.
Vercel runtime logs for that deployment were empty for the time window -- no server-side error
  was captured. Inconclusive: could mean the hang is client-side only, or that logs lag.
Confirmed control: Hamilton logged into BOTH /admin and /portal on live production
  (crm.mercurycalldesk.com) successfully, same credentials, right after. Production MFA login
  works fine. The hang is specific to this preview deployment/branch.
```

This is a real, reproducible break in the login/MFA flow on this preview, not a config or
protection-wall issue (deployment protection was already ruled out earlier the same day -- this
preview loads the app's real login page fine, no SSO wall in the way). Do not merge PR #30 until
this is root-caused and fixed, regardless of how ready Tier A/B otherwise look.

Also checked and ruled out: this is not a repeat of the separate 2026-07-03 Auth.js login-hang
incident (PR #27/#28/#29, see `01 Daily Logs/[C] 2026-07-03 MCD CRM Login Hang Incident Resolved.md`)
resurfacing because PR #30's branch is stale. Verified via GitHub API that
`feature/lead-import-batch-api`'s merge-base with `main` is PR #27's own merge commit (3e9dfea0),
and that `src/app/(auth)/login/complete/page.tsx` is byte-identical on both branches. The branch
already has PR #27's fix. See "Investigation steps" below for what to check instead.

### Investigation steps

```txt
ALREADY CHECKED, RULED OUT -- do not re-check: whether PR #30's branch is stale/missing PR #27's
  Auth.js stall-recovery fix (the recoverCompletedSession() poll that fixed Incident 2, see
  01 Daily Logs/[C] 2026-07-03 MCD CRM Login Hang Incident Resolved.md). Verified via GitHub API:
  feature/lead-import-batch-api's merge-base with main is commit 3e9dfea0 -- PR #27's own merge
  commit -- so the branch was created AFTER PR #27 landed and includes it. Also confirmed
  src/app/(auth)/login/complete/page.tsx is byte-identical (same blob sha) on both branches. This
  is not a repeat of Incident 2 for the obvious reason; something else is going on.
```

```txt
1. Reproduce independently, ideally with real browser devtools open (not just automation) --
   confirm the hang happens for a plain login attempt on this preview URL, past the MFA-code
   step, with Network + Console tabs open to see exactly what request (if any) is in flight when
   it locks up. Do this with no browser-automation tool attached to the same tab this time --
   Claude's own automation was running against the same tab during the original reproduction, so
   rule out tool interference as a confound before treating this as purely an app bug.
2. If it still reproduces cleanly: diff PR #30's full commit range against its merge-base (3e9dfea0)
   to see the complete file list -- confirm it's really only src/app/api/lead-imports/* and the
   Prisma schema/migration, nothing else. If that holds, the likely remaining suspects are build-
   level, not literal-diff-level (matching how the earlier [id]/[leadId] route collision broke
   things nothing in the diff obviously touched): Prisma client regeneration from the new schema
   affecting a shared import path, or a Next.js route-manifest side effect from adding 5 new
   dynamic API routes under app/api/lead-imports/[batchId]/.
3. Check Vercel runtime logs again once you can reproduce in real time -- pull them during/right
   after the hang, not minutes later, in case of log lag.
4. Report back in the daily log (see logging protocol below) with the root cause before touching
   the merge -- do not merge on a guess, and do not spend a whole session guessing at fixes
   without new evidence (see the "stuck after ~2 attempts" rule below).
```

## Read first

```txt
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] AI Handoff & Scope Review.md
```

## Where things actually stand — 2026-07-03

```txt
Phase D (lead-import batch API) is code-complete: Prisma schema + production Neon migration
  (project jolly-lab-80341970, already applied -- LeadImportBatch/LeadImportRow tables exist
  live), service layer, 5 route handlers under src/app/api/lead-imports/. Open as PR #30 in
  hpintojr/crm.mcd (feature/lead-import-batch-api -> main). Vercel preview build verified READY.
Not merged yet. Hamilton asked to review/merge #30 himself -- do not merge it for him.
Not live until two Vercel production env vars exist: LEAD_IMPORT_KEY_ID, LEAD_IMPORT_HMAC_SECRET
  (32-64 char strings, same keyId/secret pair used on both sides -- see naming note below).
mcd_lead_ops (D:\GitHub\mcd_lead_ops, local Python repo, not part of crm.mcd) now has a real
  MiniCrmClient HTTP implementation (previously a stub that always refused export). It has never
  been exercised against a live server -- no credentials existed until this handoff.
Backlog items below (#38-41) are NOT SCOPED with Hamilton yet -- see Tier C.
```

## Naming note — same secret, different variable name each side

```txt
Vercel (crm.mcd project)      ->  LEAD_IMPORT_KEY_ID / LEAD_IMPORT_HMAC_SECRET
mcd_lead_ops .env (local)     ->  MCD_LEAD_IMPORT_KEY_ID / MCD_LEAD_IMPORT_HMAC_SECRET
mcd_lead_ops also needs:      ->  MINICRM_API_BASE_URL=https://crm.mercurycalldesk.com
```

Both sides must hold the exact same keyId and the exact same secret string. Generate once, set
twice. Never write the actual secret value into any workspace doc, daily log, or chat message --
refer to it by variable name only.

## Tier A — Hamilton only, do not act without his explicit go-ahead in this thread

```txt
1. Merge PR #30 into main -- BLOCKED as of 2026-07-03, see "ACTIVE BLOCKER" above. Do not merge
   even with Hamilton's go-ahead until the login/MFA hang is root-caused and fixed; if he says
   "merge it" before that's resolved, flag the open blocker back to him rather than merging.
2. Generate and set LEAD_IMPORT_KEY_ID / LEAD_IMPORT_HMAC_SECRET in Vercel production env --
   already done (both keys exist, targeting preview + production).
```

## Tier B — once Tier A is done, ChatGPT executes directly

All of Tier B is also blocked until the login/MFA hang above is resolved -- step 2 explicitly
depends on PR #30 being merged, which is on hold.

```txt
1. Mirror the same keyId/secret into mcd_lead_ops's .env under the MCD_-prefixed names above,
   plus MINICRM_API_BASE_URL.
2. Confirm the Vercel deployment carrying PR #30's code is live in production (not just preview).
3. Run one real export end-to-end against a small/synthetic run (mcd-leads export --run <id>) as
   a supervised live test -- this integration has never been exercised live. Watch for: HMAC 401s
   (keyId/secret mismatch), row validation errors, batch status landing anywhere other than
   COMPLETED or a sane PARTIALLY_ACCEPTED.
4. Report the batch's final status and any rows that landed on REVIEW_REQUIRED /
   POSSIBLE_EXISTING_DUPLICATE / PENDING_ADMIN_REVIEW / IMPORT_ERROR -- there is no admin UI to
   resolve these yet (see backlog #39), so a non-COMPLETED result isn't automatically a failure,
   just log it accurately.
```

## Tier C — backlog, scope not yet confirmed with Hamilton

These four items were put on hold before any implementation scope was discussed with Hamilton.
Do not write code against them from assumption -- draft a short scope proposal per item and get
an explicit yes from Hamilton (or wait for Claude) before building.

```txt
38. Point mcd_lead_ops at a real recurring source config -- needs Hamilton to name the actual
    recurring source (CSV drop location, referral list, or a specific licensed-provider API).
    config/sources/ only has a disabled example today.
39. Improve Admin operational visibility for lead-import batches -- no admin-review UI exists
    yet for rows that land on PENDING_ADMIN_REVIEW / POSSIBLE_EXISTING_DUPLICATE. Needs a design
    decision on where this lives (new /admin/leads/imports page? extend the existing leads review
    queue?) before building.
40. Prevent duplicate document dispatch after approval -- this is on the Phase 1 partner
    onboarding side (e-sign documents), not the lead-import side. Confirm exact repro/trigger
    with Hamilton before changing the approval-relay code path.
41. Add optional company/entity metadata -- confirm whether this means the Lead model (import
    side) or is already covered by the existing partner "Company / Legal Entity Name" field
    (already shipped for onboarding per 2026-07-02 status). Don't duplicate work.
```

## Hard rules — carried forward, do not renegotiate these

```txt
Never print, paste, or commit: DATABASE_URL, DIRECT_URL, AUTH_SECRET, any GHL shared secret,
  LEAD_IMPORT_HMAC_SECRET / MCD_LEAD_IMPORT_HMAC_SECRET, MFA secrets, password hashes, customer
  SSNs/tax IDs/bank data. Check presence/scope only -- never fetch or display raw values.
Do not merge or reopen PR #28 (proven regression, already closed). Do not touch PR #29 --
  Hamilton's call, not yours.
Do not merge PR #30 -- Tier A, Hamilton only.
Neon changes: snapshot/branch first, additive-only (no drops/renames) unless Hamilton explicitly
  approves a breaking change in this thread.
crm.mcd code changes: prefer a PR over a direct push to main. The 2026-07-02/07-03 production
  outage was caused by an unreviewed same-day stack of direct commits (a dynamic-route slug
  collision, [id] vs [leadId]). This is a strong recommendation from that incident, not a hard
  platform rule, but treat it as the default.
If stuck after roughly two attempts on the same error, or a decision needs business/product
  judgment: stop, write the blocker into the daily log's Handback section below, and surface it
  to Hamilton directly. Do not keep retrying variations of the same fix across a whole session --
  that is exactly the loop this handoff exists to prevent.
```

## Logging protocol — required, this is how Claude gets a clean handback

Every work session (or natural milestone, whichever comes first) ends with one new file:

```txt
01 Daily Logs/[G] YYYY-MM-DD <short title>.md
```

`[G]` (not `[C]`) marks it as ChatGPT-authored, so Claude can tell at a glance which log entries
happened while it was paused. Use this frontmatter and section shape, matching the rest of the
log folder:

```txt
---
type: daily-log
date: YYYY-MM-DD
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
repository: <hpintojr/crm.mcd | local mcd_lead_ops | hpintojr/My-Workspace>
---

# <short title>

## What was executed
(plain prose -- what you actually did, in order)

## What changed
(files touched, migrations applied, env vars set -- names only, never values -- PR numbers,
commit SHAs)

## Verified
(build/typecheck/deploy result, test run, live-call result -- be specific: "Vercel READY",
"batch <id> landed COMPLETED", etc. -- not "should work")

## Open issues / blockers
(anything unresolved, anything that needed a judgment call you did not make)

## Handback to Claude
Status: Continuing | Blocked -- needs Hamilton | Done, no action needed | Done -- Claude resumes
Next: <exactly what Claude should read/do first when it resumes>
Question for Hamilton (if any): <plain question, nothing implied>
```

After writing the log, update these two pointers so anyone landing on the workspace top-down
gets the current truth without reading every daily log:

```txt
1. MCD CRM - Agent and Admin Portals Overview.md -- add or replace the "Pending handoff" section
   with the current owner and current blocker (mirror the shape of the existing 2026-07-02
   section in that file).
2. 00 [C] Workspace Index.md and README.md -- update the "Current next actions" / pending-handoff
   line under MCD CRM - Agent and Admin Portals to point at the newest daily log.
```

Do not rewrite or delete earlier daily logs or earlier Overview.md sections -- stack new dated
sections on top, the same convention already used in that file.
