# My Workspace — AI Assistant Context

Read in order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
Current project handoff files
```

## Tooling rule — 2026-07-04

Claude reads and writes this workspace (`hpintojr/My-Workspace`) only through the GitHub connector/MCP (direct API calls), never through the local `D:\GitHub\My Workspace` folder. Do not use local Read/Write/Edit tools against this repo going forward -- fetch current content via the API, edit, and commit back via the API. The local folder is Hamilton's own synced copy; it is not a working path for Claude anymore.

## MCD CRM

MiniCRM is the system of record. GHL is backend-only. Agents do not receive GHL logins.

```txt
Phase 1 onboarding is production-validated.
Lead/Task modules remain feature-gated until lead foundation is live.
Local lead workflow uses permitted inputs, local staging, review, and signed MiniCRM export.
No local process may write directly to Neon/Postgres.
```

## Local lead rules

```txt
Allowed: user files, referrals, web forms, PPC leads, licensed provider data, owned-account exports, permitted business-site research.
```

## Current next work

```txt
1. Claude built local mcd_lead_ops Phase A -- done.
2. Claude built the full lead-import batch API (Phase D: schema, production Neon migration,
   service layer, 5 route handlers) -- code-complete, open as PR #30 in hpintojr/crm.mcd, not
   yet merged. This supersedes the earlier "wire HMAC into the existing commit route" plan below.
3. PR #30 is currently BLOCKED from merging -- root cause still open. Claude's independent
   13-layer rescope found the specific "clientAccountId vs id" route-collision theory does not
   hold up (that pairing already exists on main/production at the same commit that is live and
   working), so do not merge on the assumption that fixing it clears the block. See the ChatGPT
   handoff file and the new rescope doc below for full detail.
4. Apply lead foundation migration after the API contract is ready -- still pending.
```

## Execution ownership — 2026-07-03

Claude is paused (usage conservation) after Phase D. ChatGPT is temporary execution owner for
the Phase D secrets/PR #30/first live test and the paused backlog, and holds direct repo/Neon/
Vercel access. Claude also has direct GitHub, Vercel, and Neon access via connector as of today
(verified, not assumed) — used for oversight/verification, not to replace ChatGPT as execution
owner while conserving usage. Full task list, guardrails, and required logging format:

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT Handoff — Phase D Secrets, PR 30, and Backlog.md
```

Independent read-only 13-layer production rescope (Claude, 2026-07-03/04), covering routing,
auth, database privilege/RLS, secrets scoping, CI/CD, and a realistic launch timeline:

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[C] Independent 13-Layer Production Rescope.md
```

Any AI session picking up this workspace should check that file's "Handback to Claude" sections
in `01 Daily Logs/[G] *.md` entries before assuming Claude's or ChatGPT's prior state is current.

**This repo (hpintojr/My-Workspace on GitHub) is the single source of truth, not the local
D:\GitHub\My Workspace folder alone.** Both Claude and ChatGPT edit it directly via API/MCP,
never via local file writes. If a local working copy shows unresolved git conflict markers,
treat GitHub as the tiebreaker and reconcile into the local copy, don't commit the markers.

Use [C] in AI-authored files unless Hamilton says otherwise; ChatGPT-authored daily logs use [G]
instead so provenance is visible at a glance. Never commit secrets, credentials, customer data,
SSNs, tax IDs, or raw bank data.
