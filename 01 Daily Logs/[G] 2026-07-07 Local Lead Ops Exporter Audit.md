---
type: daily-log
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
status: local-exporter-audit-complete-patch-pending
crm_pr: 33
---

# [G] 2026-07-07 — Local Lead Ops exporter audit

## Confirmed current behavior

```text
- mcd_lead_ops is a live local signed importer, not a stub.
- Export remains gated by an APPROVED local run.
- Current lifecycle is create batch -> upload rows -> preview -> submit.
- The local folder is not currently a Git repository, so local source changes cannot yet be committed or pushed from that folder.
- A local .env file is present; no secret values were read or logged.
```

## Critical defects to correct before supervised production use

```text
1. run_row_checks currently drops source/provenance and most mapped business fields from the normalized record.
   As a result, the exporter would omit originalSource, intakeMethod, sourceDetail, and newly mapped research fields.
2. CSV CLI intake does not pass source_use_basis into CsvImportAdapter, so CSV rows default to OPERATOR_ENTERED.
3. The policy function defaults has_written_permitted_use_basis to true, so a licensed-provider claim has no explicit local confirmation gate.
4. Google Maps is currently sent as sourceRecordUrl; it must map to googleMapsUrl only.
5. Export must insert the signed private owner-acquisition call after batch creation and before row upload.
6. Tests and comments still refer to the retired MiniCrmApiNotAvailable stub behavior.
7. Preview-report language incorrectly says the MiniCRM preview API does not exist.
```

## Required local implementation

```text
- Add business_address, location_raw, google_rating, google_rating_observed_at, and google_maps_url
  to the canonical local record and normalization pipeline.
- Preserve required safe provenance values through normalization and export.
- Parse Location into city/state only for a clear City ST form; retain raw location otherwise.
- Require an explicit non-secret configuration confirmation for licensed-provider permitted use.
- Keep actual owner acquisition identifiers in ignored local configuration only.
- Use neutral run-event details for the private owner-acquisition call; never log its body or values.
- Replace stale tests/docs so the suite verifies the real signed lifecycle.
```

## Current CRM PR status

```text
CRM draft PR #33 has a passing latest CI run:
- Verify CRM: passed
- Application Build: passed
- Commission Policy: passed

The PR remains DRAFT and is not authorized to merge until the local exporter patch,
isolated database lifecycle test, preview review, and final Claude leakage audit are complete.
```

## Production gate unchanged

```text
No local intake, approval, export, production migration, or Raw_Leads.csv import is authorized
until CRM PR #33 is fully verified and the local exporter has been updated and tested against
the deployed import contract.
```