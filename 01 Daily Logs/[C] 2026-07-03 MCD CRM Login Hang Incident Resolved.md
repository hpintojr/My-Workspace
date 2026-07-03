---
type: log
date: 2026-07-03
project: MCD CRM - Agent and Admin Portals
---

## Access verification (2026-07-03)

Hamilton granted Claude direct GitHub, Vercel, and Neon access today via connector. Verified directly (not assumed):

```txt
GitHub: hpintojr/My-Workspace (this repo) and hpintojr/crm.mcd both visible and readable/writable.
Vercel: project crm-mcd (prj_MV118kD5yiJdDKoi4mAIS9sfpURF) visible -- deployments, env vars, domains, protection settings.
Neon: project jolly-lab-80341970 (mcd-crm-production) visible with all 5 branches, including the exact
  rehearsal branch a ChatGPT handoff had cited (lead-foundation-core-rehearsal-20260703b / br-calm-tooth-ajdixaj7,
  parented off production br-flat-cloud-aj9r0d6b, untouched).
```

Going forward, this repo (hpintojr/My-Workspace on GitHub) is the single source of truth for project status and daily logs -- not just the local D:\GitHub\My Workspace folder. Any agent (Claude or ChatGPT) picking up this project should read this repo first.

## Login-hang incident -- RESOLVED

Context: after the earlier 2026-07-02 route-collision outage (see prior daily log) was fixed and production advanced past the a80b815 rollback pin through PRs #24-27, a second, separate problem appeared: sign-in got stuck at "Signing in..." with inconsistent /admin and /portal access reported across builds and previews. A ChatGPT handoff (`mercury_call_desk_claude_handoff_2026-07-03.md`) proposed two unmerged experimental PRs (#28, #29) and asked for a fresh diagnostic pass.

Ground truth established today, verified directly against GitHub/Vercel (not inferred from any handoff doc):

```txt
Production (main @ 3e9dfea, PR #27 merged, live on crm.mercurycalldesk.com since 2026-07-03 16:13 UTC):
  CONFIRMED WORKING END TO END by Hamilton -- signs in, reaches both /admin and /portal.
PR #28 (hotfix/restore-a80-login-flow, head 532aca2): reverts the login form to the exact pre-fix
  a80b815-era code. Hamilton tested its preview directly, entered real credentials, and it hung after
  submit -- exactly as expected, since this PR deletes the fix (see below). Diffed and proven to be a
  regression, not a candidate fix. Recommend closing without merging. CLOSED 2026-07-03 (see PR comment).
PR #29 (hotfix/native-auth-post, head d9d97309): an independent rewrite of the same login flow using a
  native form POST instead of client-side signIn(). Branches from main directly (not from #28). Its commit
  history today shows 10 rapid pushes including several debug/test commits and one failed build
  (lint_or_type_error on commit fe63e623). Since production already works via PR #27's fix, this PR is very
  likely solving an already-solved problem. Recommend closing without merging unless a new, concrete
  production failure surfaces that #27's fix does not cover.
```

Root cause of the login-hang, confirmed via diff (not guesswork):

```txt
PR #26 (fix/login-completion-re...) first fixed a client-router-transition stall by routing the
  post-signIn redirect through a real server page (src/app/(auth)/login/complete/page.tsx) instead of a
  client-side router.replace().
PR #27 (fix(auth): recover stalled credentials callbacks) went further: it added a parallel
  recoverCompletedSession() poll (checks getSession() every 500ms, up to 12 times) alongside the normal
  signIn() call, because the signIn(..., redirect:false) promise itself can stall indefinitely even after
  the server has already written a valid session cookie -- a known Auth.js v5 beta gotcha. Whichever settles
  first (the direct signIn result, or the poll discovering a valid session) completes the redirect.
PR #28 deletes recoverCompletedSession entirely and deletes login/complete/page.tsx, reverting to the
  original code that just awaits signIn() with no stall recovery. That is exactly the code path known to
  hang -- which is what Hamilton observed when testing its preview.
```

Verdict: current `main` / production is the trusted, working state. Close #28 and #29 without merging. No further auth-flow changes needed unless a new concrete failure shows up on production itself.

## Lead-import route reconciliation (2026-07-03)

Checked current `main` against the local `/api/admin/leads/route.ts` rewrite Claude built on 2026-07-02 (see that day's log). Finding: PR #24 ("import verifier") and PR #25 ("response contract"), already merged, built a much larger, separate lead-import surface that supersedes that local rewrite:

```txt
src/app/api/admin/leads/import/preview/route.ts -- session-admin-gated (requireFeature("leads") +
  requireRole(ADMIN_ROLES)), calls previewLeadImport. Looks correct.
src/app/api/admin/leads/import/route.ts -- the live COMMIT endpoint. POST { rows: [...] } -> commitLeadImport().
  SECURITY GAP: this route has NO auth check of any kind -- no session role check, no feature flag check, no
  HMAC verification. It is a fully open POST endpoint on production right now.
src/lib/lead-import-auth.ts -- HMAC sign/verify primitives (verifyLeadImportRequest, signLeadImportRequest)
  already built and unit-testable, explicitly commented "for a future paid-data import route" -- but not
  wired into the commit route above. This is exactly the machine-to-machine auth mechanism mcd_lead_ops's
  Phase D export step needs.
```

Recommended next step (not yet done, needs Hamilton's go-ahead on provisioning a new secret): wire `verifyLeadImportRequest` into `src/app/api/admin/leads/import/route.ts` so the commit endpoint requires a valid HMAC signature, then point mcd_lead_ops's export step at it using `signLeadImportRequest` with a shared secret stored as a new Vercel env var. This closes the open endpoint and unblocks Phase D in one pass. See `[C] Local Lead Operations and MiniCRM Export Scope.md` for the export-step design this slots into.
