---
author: claude
type: daily
date: 2026-07-06
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
---

# [C] 2026-07-06 — Servicing Slug Collision Fixed (production) + Scope Rebuilt

## What I changed
- **Fixed the production page hang.** Root cause: a Next.js dynamic-route slug collision — `src/app/admin/servicing/[id]` (added 2026-07-02) sitting beside the original `[clientAccountId]`. Two sibling dynamic segments with different names poison route resolution and hang every server-rendered page to the 300s timeout.
- Committed fix on branch `fix/servicing-slug-collision` (commit `53dec9b`): deleted `[id]/page.tsx`, ported its unique payment-clearance server action + Source Lead link into `[clientAccountId]/page.tsx`.
- Opened **PR #31**, verified the branch preview renders `/admin`, `/portal`, `/admin/servicing` (~200-1000ms, no hang), then **squash-merged to `main` as `f338cc4`**. Production redeployed READY; live domain verified healthy.
- Earlier in the session, Hamilton turned OFF Vercel Authentication ("Require Log In"), which removed the SSO wall that was strangling every `*.vercel.app` preview URL.
- **Workspace (this repo):** rewrote `CLAUDE.md`; added `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`; added `02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md`; added `LOCK.md`; updated the MCD CRM Overview banner.

## Evidence
- Rebuilt last-known-good `a80b8159` as a fresh preview → `/admin` + `/portal` respond (redirect to login), no hang. That commit has `[clientAccountId]` but NOT `[id]`. Later commits (with `[id]`) hang. Clean bisection.
- Fix-branch preview `dpl_AGdsnZqVnxx1VdEo45tSXU47SmZa` build READY; live probes returned redirects in 226-1064ms vs 8000ms+ aborts before.
- Production deploy `dpl_4WjZNdG9pk6U6QwVSvYRHdZMqVo5` (commit f338cc4) READY + promoted; `crm.mercurycalldesk.com/login` and `/api/auth/session` respond instantly.
- Neon `mcd-crm-production` healthy: 10/112 connections, instant queries.

## Still open
- PR #30 (Phase D lead import) not yet merged — see Start here.
- 13-layer cleanup items (no CI gate, preview/prod share secrets + DB, RLS off, 0.25 CU fixed, no error tracking, no login smoke test) — all documented in the Scope & 13-Layer Review, none blocking.
- Backlog #38-41 not scoped with Hamilton.
- Three open questions for Hamilton at the end of the Scope doc (preview isolation, RLS timing, pilot size).

## Start here next
Read `02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md`. Next action: rebase PR #30 onto new main, redeploy its preview, re-test login on the preview (should pass now), then merge. Hamilton sets the two production import secrets before the first live `mcd-leads export`.

## Handback
Lock: `holder: claude` (see LOCK.md). Claude is primary executor per Hamilton's 2026-07-06 decision. Site is UNBLOCKED and production is healthy. This was the first session to reach a proven conclusion — cause was routing + a Vercel setting, never auth.
