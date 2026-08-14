# PR #125 — Signed Lead Import Response Boundary

Date: 2026-07-12/13 Pacific execution interval
Project: `hpintojr/crm.mcd`
PR: `https://github.com/hpintojr/crm.mcd/pull/125`
Merge commit: `991bb0a2bce200b3a30da4d62a5c7d4dc16789b6`
Production deployment: `dpl_8h85PUVycYfpVWd9tTevKQVcPUic`

## Evidence-backed gap

The six signed `/api/lead-imports/*` lifecycle routes already had HMAC verification, a one-megabyte body cap, replay protection, immutable provenance, and concurrency-safe services. Their routes still constructed JSON responses independently, omitted consistent request-ID/noindex metadata, and did not convert body-read failures into a controlled response.

A related audit found that PR #124's protected CSV guard existed but had not been wired into the authoritative build or deployment-verification evidence.

The isolated database workflow also referenced a deleted Neon branch, making its integration gate unusable.

## Implementation

- Added a shared `leadImportJson` response contract.
- Added sanitized `x-mcd-import-request-id` propagation with UUID fallback.
- Every signed import response now returns:
  - `Cache-Control: no-store, max-age=0`;
  - `X-Request-Id`;
  - `X-Robots-Tag: noindex, nofollow, noarchive`.
- HMAC configuration is resolved before request-body consumption.
- Body-read failures return generic HTTP 400 `LEAD_IMPORT_BODY_READ_ERROR`.
- Declared and actual one-megabyte limits remain intact.
- Signature verification still precedes JSON parsing and database access.
- Applied the boundary to batch creation, status, owner-acquisition provenance, row upload, preview, and submit.
- Strengthened the response-contract check across all six routes.
- Indexed and documented the signed import lifecycle.
- Activated the previously omitted protected CSV guard in the build and deployment-verification contract.
- Repaired stale acceptance-report guard assumptions after CSV response centralization.

## Isolated database repair

The prior GitHub Actions secret pointed to a deleted Neon endpoint. It was not replaced with another external database.

The integration workflow now:

- starts a temporary PostgreSQL 17 service container;
- proves its URL differs from the normal-runtime sentinel;
- builds the full Prisma schema in the temporary database;
- extracts and applies the exact committed `applyLeadImportResearchFields` trigger SQL;
- runs both the signed lifecycle and research/private-provenance database harnesses;
- emits compact failure tails and remains fail-closed.

No Neon or production database is used by the integration job.

## Validation

- Commission Policy: PASS.
- Verify CRM: PASS.
- Application Build: PASS.
- Isolated signed-import lifecycle harness: PASS.
- Isolated research/private-provenance harness: PASS.
- Vercel preview: READY.
- Review threads: none.
- Production deployment: READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, environment `production`, branch `main`, exact merge SHA.
- Security headers and no-store/noindex contract intact.
- Latest one-hour Vercel runtime-error window: clean.

## Safety boundary

No signed or Admin import endpoint was invoked. No batch was created, no rows were uploaded, no preview or submit was run, and no production Lead, import batch, AuditLog, feature flag, GHL workflow, Client Account, Service Case, Commission record, payment, or payout was read or mutated. No production migration or settings change was performed.

## Next safe work

Harden the supported Admin Lead-import preview and commit routes so authorization occurs before bounded JSON parsing, all responses use the shared authenticated response metadata, and unknown exceptions remain generic while preserving the existing 500-row import service and business outcomes.
