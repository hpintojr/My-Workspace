---
type: daily-log
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
repository: hpintojr/crm.mcd | local mcd_lead_ops | hpintojr/My-Workspace
---

# [G] 2026-07-07 — MCD CRM post-merge export readiness

## What was executed

1. Read the current workspace lock, Claude acceptance record, production merge log, Phase D local-export contract, and stale top-level project pointers.
2. Took the released MCD CRM execution lock for post-merge verification and supervised-import readiness only.
3. Reviewed Hamilton's Vercel screenshot. It shows `LEAD_IMPORT_HMAC_SECRET` and `LEAD_IMPORT_KEY_ID` are present for **Production and Preview**. Values were not opened, copied, or logged.
4. Confirmed the merged production commit `d25ac9f` has a successful Vercel status.
5. Performed a read-only Neon production count check.
6. Reviewed production runtime error aggregation for the last six hours.

## What changed

- `02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md`
  - Holder set to `chatgpt`.
  - Intent limited to post-merge verification and first supervised export readiness.
  - Explicitly prohibits a live export until an approved local run and operator approval reference exist.
- This daily log created.
- The MCD CRM overview, workspace index, README, and lock-review companion are being synchronized to the post-merge state.

## Verified

```txt
Production code:
- PR #32 accepted by Claude and merged as squash d25ac9f.
- Production Vercel status for d25ac9f: success.
- Claude's production verification recorded crm.mercurycalldesk.com, login, /admin/servicing,
  and /admin/lead-imports as resolving normally.

Vercel import configuration:
- Hamilton-provided screenshot shows LEAD_IMPORT_KEY_ID and LEAD_IMPORT_HMAC_SECRET present in
  both Production and Preview.
- No secret value was inspected or logged.

Production Neon read-only counts:
- LeadImportBatch: 0
- LeadImportRow: 0
- Lead: 0
- LeadActivity: 0
- Import-related AuditLog: 0

Production runtime health:
- No 5xx responses were returned in the last-six-hour runtime log count check.
- Runtime aggregation showed one CredentialsSignin event on the Auth route and one Node Buffer()
  deprecation warning. Neither establishes an import-path failure.
```

## Open issues / blockers

```txt
The local exporter remains at D:\GitHub\mcd_lead_ops and is not available through the connected
GitHub sources. ChatGPT cannot inspect its local SQLite runs, mirror environment variables, or
execute mcd-leads on Hamilton's machine.

Before the first supervised export, Hamilton must locally confirm:
- MCD_LEAD_IMPORT_KEY_ID matches the Vercel key ID.
- MCD_LEAD_IMPORT_HMAC_SECRET matches the Vercel secret.
- MINICRM_API_BASE_URL=https://crm.mercurycalldesk.com
- a small, permitted, previewed local run has a recorded operator approval reference.

Do not paste secret values, raw lead data, or signed request material into chat or workspace files.
```

## Handback to Claude

Status: Continuing — needs Hamilton local-run readiness

Next:
1. Hamilton identifies a small permitted local run ID and completes the local preview/approval gate.
2. Hamilton runs the supervised `mcd-leads export --run <approved-run-id>` locally.
3. Record only the batch ID, aggregate results, final batch status, and non-sensitive reconciliation counts.
4. ChatGPT then verifies the production batch, Lead, LeadActivity, and AuditLog evidence read-only.

Question for Hamilton: What approved local run ID should be used for the first supervised export?