# MCD Controlled Leads Launch Started

**Date:** 2026-07-08

## Completed remote checks

- Production login page returns successfully.
- Unauthenticated `/portal/leads` request resolves to the login surface, confirming public/anonymous access is blocked.
- Vercel production runtime error check returned no grouped runtime errors for the last hour.
- Production aggregate counts are still clean: zero lead import batches, zero lead import rows, zero leads, zero private acquisition records, and zero lead suppression rows.

## Local importer readiness checkpoint

- `config/sources/licensed_provider_csv.example.yaml` exists.
- The config uses `adapter: csv_import`, neutral `original_source: OTHER`, `source_detail: LICENSED_PROVIDER_DATA`, and `source_use_basis: LICENSED_PROVIDER`.
- The config maps business address, raw location, Google rating, and Google Maps link fields.
- `has_written_permitted_use_basis` is still `false`, so real intake/export must not proceed until the owner privately confirms permitted use.
- Dry-run result: adapter would stage 50 rows, with no DB write performed.

## Private environment readiness checkpoint

Presence check only; no private values were disclosed.

- Signed MiniCRM transport settings are present.
- Opaque owner-acquisition settings are present.

## Current posture

The CRM production release is live, but lead operations are still in controlled-launch mode. No live intake, approval, submit, export, or `Raw_Leads.csv` import has been performed.

## Next action

Move to permitted-use confirmation:

1. Owner must privately confirm written permitted-use basis before real intake.
2. After confirmation, update the local source config to mark permitted use as true.
3. Run one final no-write dry-run.
4. Stop before CRM preview until the owner explicitly approves the selected source and run.

## Boundaries

- Do not store provider identity, purchase terms, commercial records, private values, or raw lead rows in MiniCRM, GitHub, or My-Workspace.
- Do not submit any CRM batch or enable `LEADS_ENABLED` without a run-specific owner approval reference.
