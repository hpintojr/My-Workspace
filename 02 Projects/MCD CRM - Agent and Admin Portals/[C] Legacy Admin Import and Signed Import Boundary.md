# MCD CRM — Legacy Admin Import and Signed Import Boundary

**Status:** Control decision — 2026-07-03

## Existing Admin import

The existing routes under `/api/admin/leads/import` are an internal Admin workflow. The commit helper enforces the Leads feature gate and an Admin role before writing Leads.

This legacy flow:

```txt
- accepts rows directly from an authenticated Admin session
- creates Leads immediately in PENDING_REVIEW
- checks current dedupe and suppression records
- writes lead activity and audit rows
- does not persist durable import batch, row, request-signature, or replay evidence
```

## Future signed importer

The local `mcd_lead_ops` process must not call the legacy Admin import route.

Its permitted future destination is the separate signed contract:

```txt
POST /api/lead-imports
POST /api/lead-imports/{batchId}/rows
POST /api/lead-imports/{batchId}/preview
POST /api/lead-imports/{batchId}/submit
```

That route family remains disabled until the durable schema, replay controls, Admin review workflow, and provider-neutral audit requirements are complete.

## Guardrail

```txt
Legacy Admin import ≠ local exporter API
No local direct database connection
No direct Lead creation from the local tool
No auto-assignment, campaign enrollment, email, SMS, GHL, servicing, commission, or finance action during import
```
