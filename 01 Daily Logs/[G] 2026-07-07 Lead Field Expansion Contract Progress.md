---
type: daily-log
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
branch: chatgpt/lead-fields-owner-provenance-20260707
status: in-progress
---

# [G] 2026-07-07 — Lead field expansion contract progress

## Completed on the focused CRM branch

```txt
- Created branch: chatgpt/lead-fields-owner-provenance-20260707
- Added signed-import row validation for:
  - businessAddress
  - googleRating (0.0–5.0; one decimal place maximum)
  - googleRatingObservedAt (required when a rating is supplied)
  - googleMapsUrl
- Added private, batch-level signed-contract input for:
  - sourceCode
  - acquisitionReference
  - optional providerName
- Documented that private acquisition data must never be present in row payloads,
  shared serializers, normal Lead fields, review screens, audit text, or logs.
```

## Not completed — production gate remains closed

```txt
- Prisma schema and additive migration
- Private provenance persistence and single OWNER-only read service
- Batch-service replay handling for private provenance
- Lead record persistence for Address/Rating/Maps fields
- Agent/admin lead UI presentation
- Local mcd_lead_ops mapping and batch-create payload update
- Authorization, migration, import, and regression tests
- Preview build and Claude leakage audit
```

No production migration, deployment, intake, approval, export, or CRM lead import has occurred.