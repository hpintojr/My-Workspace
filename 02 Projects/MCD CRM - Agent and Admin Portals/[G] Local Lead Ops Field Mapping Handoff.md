---
type: implementation-handoff
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
status: pending-local-mcd-lead-ops-update
---

# Local Lead Ops Field Mapping Handoff

This is the required local `mcd_lead_ops` follow-up for CRM draft PR #33. Do not run it against production until the CRM PR is merged, its migration is verified, and the first supervised-import gate is reopened.

## CSV mapping

```txt
Business Name     -> business_name
Phone             -> business_phone
Address           -> business_address
Industry          -> industry
Location          -> location (parse to city/state only when unambiguous)
Rating            -> google_rating
Google Maps Link  -> google_maps_url
```

Rules:

```txt
- Treat a blank Rating as no rating, not zero.
- Validate a nonblank rating as a number from 0.0 to 5.0 with no more than one decimal place.
- On intake, set google_rating_observed_at once using the file intake timestamp in UTC.
- Map Google Maps Link only to google_maps_url.
- Do not map Google Maps Link to source_evidence_url or sourceRecordUrl.
- Preserve unparseable Location locally for review; never invent a city/state.
```

## Shared source vs private acquisition

The shared Lead import row must remain non-identifying:

```yaml
original_source: OTHER
source_detail: LICENSED_PROVIDER_DATA
```

Do not put the vendor name, `RAW072026`, or `OP_ACQ_072026_001` in:

```txt
- row payloads
- source_detail
- source_evidence_url
- run preview reports
- normal console logs
- source-controlled example configuration
```

## Separate private batch request

Immediately after the signed create-batch response returns the real `batchId`, and before uploading rows, make one signed request:

```txt
POST /api/lead-imports/{batchId}/owner-acquisition
```

Private request shape:

```yaml
sourceCode: RAW072026
acquisitionReference: OP_ACQ_072026_001
providerName: <private owner-controlled value>
```

Requirements:

```txt
- Read providerName only from a private local owner configuration file that is ignored by Git.
- Do not print the private request body or fields.
- Treat a 201 RECORDED or 200 UNCHANGED as success.
- Stop on 404, 409, 422, 401, 413, 503, or 5xx. Do not upload rows after any failed private-acquisition call.
- A 409 means an immutable-replay or invalid-state issue; preserve the batch ID and investigate.
```

## Client field mapping

The MiniCRM row payload must send these camelCase fields:

```txt
businessAddress
industry
city
state
googleRating
googleRatingObservedAt
googleMapsUrl
```

It must not send `sourceRecordUrl` for the Google Maps link.

## Required local checks

```txt
1. A sample permitted CSV stages without changing raw inputs.
2. Preview shows aggregate validation outcomes without private vendor values.
3. Rating rejects values below 0, above 5, nonnumeric, and more than one decimal place.
4. Blank rating imports as absent.
5. Location parsing correctly handles City ST and leaves other formats for review.
6. The signed private batch call occurs before row upload.
7. Normal create/upload/preview/submit/status flow remains unchanged after that call.
```
