---
type: daily-log-addendum
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
repository: local mcd_lead_ops | hpintojr/My-Workspace
---

# [G] 2026-07-07 — MCD CRM local export client correction

## Correction

The earlier post-merge readiness log treated the local `mcd_lead_ops` copy as Phase A-only because its README and `.env.example` still contain stale wording that describes export as unavailable.

Hamilton inspected the actual local source at:

```txt
D:\GitHub\mcd_lead_ops\src\mcd_lead_ops\export\minicrm_client.py
```

That module is a real Phase D HMAC-signed MiniCRM client. It implements:

```txt
POST /api/lead-imports
POST /api/lead-imports/{batchId}/rows
POST /api/lead-imports/{batchId}/preview
POST /api/lead-imports/{batchId}/submit
GET  /api/lead-imports/{batchId}
```

It reads the correct local configuration names:

```txt
MCD_LEAD_IMPORT_KEY_ID
MCD_LEAD_IMPORT_HMAC_SECRET
MINICRM_API_BASE_URL
```

## What remains to verify locally

```txt
- jobs/export.py invokes MiniCrmClient for the approved export path.
- config loader supplies the three variables to that client.
- CLI exposes export for an approved local run.
- Hamilton has a small permitted source/run with completed preview and explicit approval.
```

## Safety unchanged

```txt
- Do not paste .env contents, secret values, signed headers, or raw lead data into chat or workspace files.
- Do not run export until the local job/CLI link is confirmed and a permitted, approved run exists.
- The uploaded roofing CSV contains Google Maps URLs; do not use it as the first live import unless its source/use basis is independently documented and approved.
```