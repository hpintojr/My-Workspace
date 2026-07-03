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
1. Wire HMAC verification into the live lead-import commit route (src/lib/lead-import-auth.ts already
   built for this) and point mcd_lead_ops's export step at it -- pending Hamilton's go-ahead on a new
   production secret.
2. Point mcd_lead_ops at a real recurring source config.
3. Apply lead foundation migration after the API contract is ready.
```

## Access note (2026-07-03)

Claude now has direct GitHub, Vercel, and Neon access via connector, in addition to ChatGPT. This repo
(hpintojr/My-Workspace on GitHub) is the single source of truth for status and daily logs going forward --
read it first regardless of which agent is picking up the work.
