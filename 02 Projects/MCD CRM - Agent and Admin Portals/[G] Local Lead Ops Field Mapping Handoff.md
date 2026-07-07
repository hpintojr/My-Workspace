---
type: implementation-handoff
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
status: pending-local-mcd-lead-ops-update
---

# Local Lead Ops Field Mapping Handoff

This is the required local `mcd_lead_ops` follow-up for CRM draft PR #33. Do not run it against production until the CRM PR is merged, its migration is verified, and the first supervised-import gate is reopened.

## CSV mapping

```text
Business Name     -> business_name
Phone             -> business_phone
Address           -> business_address
Industry          -> industry
Location          -> location (parse to city/state only when unambiguous)
Rating            -> google_rating
Google Maps Link  -> google_maps_url
```

Rules:

```text
- A blank Rating means no rating, not zero.
- A nonblank rating must be numeric, 0.0–5.0, and no more than one decimal place.
- Set google_rating_observed_at once at intake in UTC.
- Map Google Maps Link only to google_maps_url, never source_evidence_url or sourceRecordUrl.
- Preserve ambiguous Location locally for review; never invent city/state.
```

## Shared row values

```yaml
original_source: OTHER
source_detail: LICENSED_PROVIDER_DATA
```

Do not include vendor identity, purchase terms, acquisition codes, or acquisition references in row payloads, source_detail, normal preview reports, console logs, or source-controlled configuration.

## Private batch request

After signed batch creation returns the real batch ID, and before row upload, send one signed request to the dedicated owner-acquisition route.

Private body shape:

```yaml
sourceCode: <owner-only code from ignored local config>
acquisitionReference: <owner-only reference from ignored local config>
```

Requirements:

```text
- Read actual values only from ignored local owner configuration.
- Do not print the private request body or values.
- 201 RECORDED and 200 UNCHANGED are successful outcomes.
- Stop before row upload on 401, 404, 409, 413, 422, 503, or 5xx.
- A 409 requires preserving the batch ID and investigating before retrying.
```

## MiniCRM row payload

```text
businessAddress
industry
city
state
googleRating
googleRatingObservedAt
googleMapsUrl
```

## Required local checks

```text
1. A permitted sample CSV stages without changing raw inputs.
2. Preview shows aggregate outcomes without private acquisition values.
3. Invalid ratings are rejected; blanks remain absent.
4. Location parsing handles City ST and leaves other formats for review.
5. The signed private batch call occurs before row upload.
6. Normal create/upload/preview/submit/status behavior remains unchanged.
```