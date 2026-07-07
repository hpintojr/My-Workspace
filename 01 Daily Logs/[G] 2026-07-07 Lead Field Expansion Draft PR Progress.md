---
type: daily-log
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
status: draft-pr-in-progress
crm_pr: 33
branch: chatgpt/lead-fields-owner-provenance-20260707
---

# [G] 2026-07-07 — Lead field expansion draft PR progress

## Draft PR opened

```txt
crm.mcd PR #33
Draft: lead research fields and owner-only acquisition provenance
Status: DRAFT — do not merge
```

The draft is deliberately open only to consolidate implementation and automated checks. It is not production authorization.

## Implemented on the draft branch

```txt
Lead research contract and storage:
- Business Address
- Google Rating, limited to 0.0–5.0 and one decimal place
- Google Rating observed timestamp, required whenever a rating is supplied
- Google Maps outbound URL

Privacy boundary:
- Separate OwnerLeadAcquisitionProvenance table, one record per LeadImportBatch
- Separate signed owner-acquisition route
- Dedicated OWNER-only server read path and page
- Generic signed route responses; no private values returned
- Exact private metadata retries are idempotent; changed values conflict
- First private metadata write allowed only while batch status is DRAFT
- Private values excluded from shared Lead payloads, ordinary import reviews, audit metadata, and agent/admin displays

Safeguards:
- Google Maps is stored only as an outbound manual-research link; no fetch, scrape, embed, or review-content rendering
- Prisma schema now reconciles with the additive migration
- Migration preserves new Lead research fields and creates the private batch-provenance table
- Isolated DB lifecycle harness added for research fields and provenance
- Static CI guard added for schema, validation, private-route, and no-fetch invariants
```

## Still blocked / required before review-ready

```txt
- Latest PR CI and preview must complete successfully.
- Isolated test database must run the existing migration and both lead-import lifecycle harnesses.
- Local mcd_lead_ops must be updated and tested for:
  - address, rating, observed-at, and Maps mappings;
  - city/state parsing from Location;
  - separate signed owner-acquisition request made immediately after batch creation;
  - no private acquisition data in row payloads or normal preview output.
- Claude final leakage audit remains intentionally deferred until implementation is feature-complete.
- No production migration, deployment, CSV intake, approval, export, or import has occurred.
```

## Gate remains unchanged

```txt
Do not merge PR #33 until every item in [G] 2026-07-07 Lead Field Expansion Merge Status - Not Ready.md is evidenced.
```