---
type: daily-log
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
status: implementation-started
branch: chatgpt/lead-fields-owner-provenance-20260707
---

# [G] 2026-07-07 — Lead field expansion implementation started

## Claude audit received and adopted

Claude's advisory audit confirms that the work is a correctly sequenced pre-import prerequisite, not scope drift. It also confirms the acquisition is licensed provider data and that Google Maps links are retained only for manual, human sales research during reputation-management conversations.

The implementation adopts Claude's additional merge gates:

```txt
1. Google Maps URL is stored only as a clickable outbound link. MiniCRM never fetches,
   parses, embeds, or renders Google Maps/review content server-side.
2. Google rating is provider-supplied, timestamped as observed at import, and represented
   as Decimal(2,1), never Float.
3. Owner-only acquisition provenance has one dedicated server-side OWNER read path and is
   excluded by default from shared Lead/Batch serializers and review projections.
4. The additive migration must be run and tested against an isolated test database only.
5. This is a focused branch/PR. No Raw_Leads.csv intake, approval, or export before merge
   and post-deploy verification.
```

## Branch created

```txt
crm.mcd branch: chatgpt/lead-fields-owner-provenance-20260707
```

## Implementation scope

```txt
Lead fields:
- businessAddress
- googleRating Decimal(2,1)
- googleRatingObservedAt
- googleMapsUrl

Owner-only batch acquisition provenance:
- source code RAW072026
- acquisition reference OP_ACQ_072026_001
- licensed-provider identity stored only in the private provenance model
```

## Boundary unchanged

```txt
- No production migration has run.
- No Preview or Production deployment has occurred for this change.
- No CSV intake, approval, export, or lead import has occurred.
- No secrets, raw lead payloads, vendor terms, invoice details, or HMAC material were logged.
```

## Next

Implement schema, migration, contracts, importer mapping, authorization tests, and preview checks. Request Claude's pre-merge leakage audit once the focused PR is ready.