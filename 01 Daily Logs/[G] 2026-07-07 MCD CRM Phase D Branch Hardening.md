---
author: chatgpt
type: daily
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
scope: branch-only hardening for Claude review
---

# [G] 2026-07-07 — MCD CRM Phase D Branch Hardening

## Authority

- Official execution holder and primary architect remain **Claude**.
- This work occurred under Hamilton's existing temporary authorization for ChatGPT to prepare branch-only changes for Claude review.
- No merge to `main`, production deployment, secret provisioning, schema migration, live import, or destructive data action was performed.

## Current review target

```txt
PR: #32 — Phase D: reconcile lead-import API with current production fixes
Branch: chatgpt/phase-d-reconciled-20260706
Latest head at this checkpoint: 75d7d3d0d073964e0c4ac8dca38bcb94c1db109c
Latest preview build: successful (completed in 50 seconds)
```

## Branch-only hardening completed

### Import replay integrity

- Exact staged-row retries are immutable no-ops.
- Reusing a row/key identity with a changed declared row hash or changed canonical JSON content is rejected before any write.
- The replay check covers key-order-only JSON changes, changed hashes, changed content, row-number mismatches, and idempotency-key mismatches.

### Audit and reconciliation visibility

- Added payload-free audit outcome helpers for import exceptions.
- Preview and submit routes now use audited wrappers.
- Row-level outcomes are captured without payload/contact data for preview exceptions, imported rows, submit-time duplicates, and import errors.
- If audit storage is unavailable after a durable import outcome, the wrapper records a non-sensitive `IntegrationError` when possible and does not misreport the import itself as failed.
- Added read-only `/admin/lead-imports` for OWNER, SUPER_ADMIN, and COMPLIANCE_MANAGER. It shows batch status, aggregate counts, exception outcomes, and related internal record IDs only; it has no import, approval, contact, or payload display controls.

### Import API resilience

- Missing `LEAD_IMPORT_KEY_ID` or `LEAD_IMPORT_HMAC_SECRET` is now a typed configuration condition.
- The shared import route guard returns controlled `503 LEAD_IMPORT_UNAVAILABLE` instead of exposing a raw configuration exception.
- Create-batch and row-upload routes now return stable generic messages for unexpected internal errors while preserving actionable validation/state errors.

### Existing safeguards retained

- Signed empty-body batch status GET support and no-store status response.
- Build guard against sibling Next.js dynamic-route collisions.
- GitHub Actions verification workflow, subject to Claude confirming Actions are enabled.
- First supervised import runbook and aggregate-only evidence requirements.

## Validation

```txt
- Latest Vercel preview build completed successfully in 50 seconds.
- Existing static route/import checks, Prisma generation, Next.js compilation, and type validation ran through the deployment build.
- The audit outcome check and immutable replay check passed in the build path.
```

## Remaining for Claude

1. Review the cumulative PR #32 diff and decide whether all branch hardening belongs in the Phase D merge.
2. Confirm GitHub Actions are enabled and verify the workflow runs.
3. Merge PR #32 with the approved method.
4. Validate the production deployment, actual authorized MFA flow, and environment-variable presence without exposing values.
5. Run the first supervised approved `mcd-leads export --run <id>` and reconcile batch, Lead, LeadActivity, AuditLog, and exception evidence.
6. Only after that, close or supersede PR #30.

## Known constraints / deferred items

- The connector blocked two attempts to add a narrow concurrent-create recovery wrapper. No partial file was created.
- The connector blocked a runbook wording update; the existing runbook remains intact.
- No client-side `mcd_lead_ops` changes were attempted because that separate local repository was not available for review.
