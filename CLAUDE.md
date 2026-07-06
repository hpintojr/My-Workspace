# My Workspace — AI Assistant Context

Read in order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
02 Projects/<active project>/… Overview.md
[C] AI Operating Protocol — Handoff, Changelog, Indexing.md   <-- READ THIS BEFORE TOUCHING ANY REPO
```

## Non-negotiable operating rules

```txt
1. This GitHub repo (hpintojr/My-Workspace) is the single source of truth. Edit it ONLY through the
   GitHub connector/MCP (API). Never through the local D:\GitHub\My Workspace folder.
2. Before doing ANY work on a project repo, read that project's Overview + the AI Operating Protocol.
3. ONE executor holds the lock at a time (see the Operating Protocol). Others may read/verify, not commit.
4. Never claim a root cause you have not proven with direct evidence (a build, a query, a diff, a live test).
5. Never commit secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
6. Use [C] in Claude-authored files. ChatGPT-authored logs use [G]. Provenance must be visible at a glance.
```

## Execution ownership — updated 2026-07-06

```txt
Primary executor: Claude (Opus / 5.x). Claude holds the lock by default and does the building.
Other AIs (ChatGPT, Gemini): review and verification only, unless Claude explicitly hands them the lock
in writing via the lock file. This replaces the 2026-07-03 "Claude paused / ChatGPT execution owner"
arrangement, which caused three days of back-and-forth and duplicated work.
```

## MCD CRM — current state (2026-07-06)

```txt
STATUS: UNBLOCKED. The admin/portal "login/MFA hang" is FIXED in production.
Real cause was NOT auth: it was a Next.js dynamic-route slug collision
(admin/servicing/[id] vs admin/servicing/[clientAccountId]) that hung every server-rendered page,
plus a Vercel Deployment-Protection (SSO) wall that was blocking all *.vercel.app preview URLs.
Both resolved. Full detail + the 13-layer review:
  02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md
```

## MCD CRM — the rules that don't change

```txt
MiniCRM is the system of record. GHL is backend-only. Agents never get GHL logins.
Phase 1 partner onboarding is production-validated.
Lead/Task modules stay feature-gated until the lead foundation is live.
Local lead workflow: permitted inputs -> local SQLite staging -> operator review -> signed MiniCRM export.
No local process writes directly to Neon/Postgres.
Permitted lead inputs only: user files, referrals, web forms, PPC leads, licensed provider data,
owned-account exports, permitted business-site research. Scraping adapters are declined and stubbed.
```

## Current next work (authoritative)

```txt
1. [DONE 2026-07-06] Fix servicing slug collision. Merged to production as PR #31 (squash f338cc4).
2. [NEXT] PR #30 (Phase D lead-import batch API): rebase onto new main, redeploy preview, re-test login
   on preview (should now pass), then merge. Hamilton sets the two production secrets
   (LEAD_IMPORT_KEY_ID / LEAD_IMPORT_HMAC_SECRET) — Claude does not provision secrets.
3. Run the first live `mcd-leads export --run <id>` as a supervised live test; log the result.
4. Then the 13-layer cleanup backlog (DB least-privilege/RLS, preview-vs-prod secret separation,
   add a CI check, compute headroom) and backlog items #38-41 — none scoped with Hamilton yet.
```
