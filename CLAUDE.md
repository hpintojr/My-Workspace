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
Blocked: directory/social scraping, Google Maps content export, LinkedIn scraping, browser bypasses, direct database access, SMTP mailbox probing, provider-limit circumvention.
No campaign sending until suppression, sender setup, provider events, and approvals are complete.
```

## Current next work

```txt
1. Claude builds local mcd_lead_ops Phase A.
2. MiniCRM builds lead-import API and review controls.
3. Apply lead foundation migration after API contract is ready.
```

Use [C] in AI-authored files unless Hamilton says otherwise. Never commit secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.