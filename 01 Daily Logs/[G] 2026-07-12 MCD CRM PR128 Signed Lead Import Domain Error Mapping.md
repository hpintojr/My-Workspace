# PR #128 — Signed Lead Import Domain Error Mapping

Date: 2026-07-12/13 Pacific execution interval
Project: `hpintojr/crm.mcd`
PR: `https://github.com/hpintojr/crm.mcd/pull/128`
Merge commit: `5f496064d613504c61b748d41a42308489fa47b6`
Production deployment: `dpl_6nsuappa3URBFgmfCi4DeqRmqi4J`

## Evidence-backed gap

PR #127 established a fail-closed Route Boundary Registry with 11 reviewed findings. Five signed Lead-import route files still contained eight direct `error.message` occurrences for three named domain classes. The messages were intentionally public, but the mappings were duplicated across route handlers and appeared as route-level boundary exceptions.

## Implementation

- Added `src/lib/lead-import-domain-error-response.ts` as the single mapper for:
  - `LeadImportBatchNotFoundError` -> HTTP 404 / `LEAD_IMPORT_BATCH_NOT_FOUND`;
  - `LeadImportBatchStateError` -> HTTP 409 / `LEAD_IMPORT_INVALID_STATE`;
  - `LeadImportBatchReplayConflictError` -> HTTP 409 / `LEAD_IMPORT_REPLAY_CONFLICT`.
- Preserved each typed domain error's exact existing message.
- Returned `null` for every unknown error so unexpected failures remain generic `LEAD_IMPORT_INTERNAL_ERROR` route responses.
- Applied the mapper to signed batch creation, status, row upload, preview, and submit routes.
- Left Zod validation, success statuses, service calls, HMAC verification, replay protection, concurrency recovery, database writes, and AuditLog behavior unchanged.
- Reduced the Route Boundary Registry from 11 findings across 8 routes to 6 approved findings across 4 routes.
- Eliminated all route-level `RAW_ERROR_MESSAGE` findings and retained zero frozen debt.
- Added exact source regression coverage, documentation, build wiring, and deployment-verification evidence.

## Validation

- Commission Policy: PASS.
- Verify CRM: PASS.
- Application Build: PASS.
- Isolated Lead Import Integration: PASS using a disposable PostgreSQL service container only.
- Vercel preview: READY.
- Review threads: none.
- Squash merge completed as `5f496064d613504c61b748d41a42308489fa47b6`.
- Production deployment `dpl_6nsuappa3URBFgmfCi4DeqRmqi4J`: READY and aliased to `crm.mercurycalldesk.com`.
- Live `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #128 merge SHA.
- No-store, noindex, HSTS, CSP, anti-framing, MIME, referrer, permissions, opener, and framework-header suppression baselines remained intact.
- The new deployment had no error or fatal runtime logs during the verification window.

## Safety boundary

No signed import endpoint was invoked. No import batch was created, no rows were uploaded, no preview or submit was run, and no production Lead, import batch, suppression, AuditLog, feature flag, GHL workflow, Client Account, Service Case, Commission record, payment, or payout was read or mutated. No migration or settings change was performed.

## Next safe work

Centralize the four remaining direct JSON response constructors used by public activation, public signup, the secret-authenticated Lead-aging cron, and the minimal public status endpoint. Preserve each route's exact headers and payload/status contracts while reducing the Route Boundary Registry from 6 findings to the two required bounded `request.text()` findings.