# My Workspace — AI Assistant Context

Read in order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
Current project handoff files
```

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
1. Claude builds local mcd_lead_ops Phase A -- done.
2. MiniCRM builds lead-import API and review controls -- Phase D code-complete, open as PR #30,
   not yet merged.
3. Apply lead foundation migration after API contract is ready -- still pending.
```

## Execution ownership — 2026-07-03

Claude is paused (usage conservation) after Phase D. ChatGPT is temporary execution owner for
Phase D secrets/PR #30/first live test and holds direct repo/Neon/Vercel access Claude does not
have. Full task list, guardrails, and required logging format:

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT Handoff — Phase D Secrets, PR 30, and Backlog.md
```

Any AI session picking up this workspace should check that file's "Handback to Claude" sections
in `01 Daily Logs/[G] *.md` entries before assuming Claude's prior state is still current.

Use [C] in AI-authored files unless Hamilton says otherwise; ChatGPT-authored daily logs use [G]
instead so provenance is visible at a glance. Never commit secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.