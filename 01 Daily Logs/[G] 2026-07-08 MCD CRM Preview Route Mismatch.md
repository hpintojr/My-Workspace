# MCD CRM Preview Route Mismatch

**Date:** 2026-07-08

## Result

The controlled preview-only attempt stopped safely at the first CRM API call.

- Local run staged successfully: `RUN_2026_07_08_e8a9beed`.
- Local preview artifacts were created in the local reports folder.
- Initial configured host `crm.mercurycalldesk.com` returned HTTP 404 with an HTML page-not-found response for `/api/lead-imports`.
- The Vercel production alias exposed the signed import route correctly: GET returned method-not-allowed, proving the route exists.
- Retrying preview-only against the Vercel production alias reached the route but returned HTTP 401 `LEAD_IMPORT_UNAUTHORIZED`.
- Local no-secret key-label check: key id is present, length is 20, and prefix is `mcd-`.
- No CRM batch ID was created.
- No owner acquisition record was posted.
- No rows were uploaded to CRM.
- No CRM preview was requested.
- No submit was performed.
- `LEADS_ENABLED` was not changed.

## Current diagnosis

The local importer and route path are prepared, but signed HMAC authentication does not yet match between local `mcd_lead_ops` and the deployed MiniCRM production environment.

The server reads `LEAD_IMPORT_KEY_ID` and `LEAD_IMPORT_HMAC_SECRET`. The local importer reads its private local transport settings from ignored local environment storage. These values must represent the same credential pair without exposing the actual values in GitHub or chat.

## Next action

Perform a no-secret credential-label/presence check and reconcile the local/Vercel signed import credential pair privately. After the pair matches, retry the preview-only script using the existing local run rather than restaging new rows.

## Stop point

Do not run export, submit, broad intake, or feature-flag activation. No raw lead rows, private values, or provider details should be copied into GitHub or chat.
