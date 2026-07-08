# MCD CRM Preview Route Mismatch

**Date:** 2026-07-08

## Result

The controlled preview-only attempt stopped safely at the first CRM API call.

- Local run staged successfully: `RUN_2026_07_08_e8a9beed`.
- Local preview artifacts were created in the local reports folder.
- The first CRM API request returned HTTP 404 with an HTML page-not-found response.
- No CRM batch ID was created.
- No owner acquisition record was posted.
- No rows were uploaded to CRM.
- No CRM preview was requested.
- No submit was performed.
- `LEADS_ENABLED` was not changed.

## Current diagnosis

The local importer is prepared, but the configured MiniCRM base URL must be verified before retrying. The response shape indicates the request reached a web page surface rather than the signed import API route.

## Next action

Confirm the local MiniCRM base URL host without exposing secrets. After the host is verified or corrected, retry the preview-only script using the existing local run rather than restaging new rows.

## Stop point

Do not run export, submit, broad intake, or feature-flag activation. No raw lead rows, private values, or provider details should be copied into GitHub or chat.
