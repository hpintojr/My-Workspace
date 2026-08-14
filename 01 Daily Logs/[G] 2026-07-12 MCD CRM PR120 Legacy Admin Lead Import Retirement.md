# [G] 2026-07-12 — MCD CRM PR #120 Legacy Admin Lead Import Retirement

## Scope

Retire the unused `POST /api/admin/leads` writer so it cannot bypass the supported guarded Lead import lifecycle.

## Evidence

The current Admin import UI uses:

- `POST /api/admin/leads/import/preview`
- `POST /api/admin/leads/import`

Repository search found no current caller for the legacy endpoint. The old route independently parsed an unbounded request, previewed and committed through one route, created Leads row by row, used read-then-create duplicate checks, could leave a partial batch after a later failure, exposed created Lead IDs, and bypassed the current batch/replay/concurrency/provenance/response guards.

## Implementation

PR: `hpintojr/crm.mcd#120`

Title: **Retire the legacy Admin Lead import writer**

Squash merge commit: `1f9a7525a50fd261715ac551a06d8c469654fcc8`

Changes:

- Replaced the legacy writer with a side-effect-free authenticated HTTP 410 route.
- Preserved the Lead feature gate and Admin role boundary.
- The route no longer reads or parses the body.
- The route performs no database or import operation.
- The response identifies only the supported replacement paths:
  - `/api/admin/leads/import/preview`
  - `/api/admin/leads/import`
- Uses the shared no-store/noindex/request-ID response contract.
- Added `scripts/check-legacy-admin-lead-import-retirement.ts`.
- The guard verifies absence of body parsing, Prisma/database access, import preview, Lead creation, suppression checks, activity/audit writes, and created-ID output.
- The guard verifies that `AdminLeadImportForm` continues using the supported preview/commit lifecycle.
- Added documentation and deployment-verification version `2026-07-12-pr120`.

## Validation

Final PR head: `cbfbd939d628ade9486b88960dacba5e3d79ad16`

Required checks:

- Commission Policy: PASS
- Verify CRM: PASS
- Application Build: PASS
- Vercel preview: READY
- Review threads: none

The final preview passed every existing import guard plus:

- `Legacy Admin Lead import retirement guard passed.`

It also passed Prisma generation, Next.js compilation, TypeScript validation, static generation, and serverless packaging.

No import endpoint was invoked.

## Production

Deployment: `dpl_4peQcaeHLYvnvn2xGUer1DB8aLLk`

State: **READY**

Aliases include:

- `crm.mercurycalldesk.com`
- `crm-mcd.vercel.app`

Live `/api/status` returned HTTP 200 with:

- environment `production`;
- branch `main`;
- exact commit `1f9a7525a50fd261715ac551a06d8c469654fcc8`;
- no-store/noindex response metadata;
- complete security headers.

Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

No retired or supported import endpoint was invoked. No Lead, suppression record, import batch, audit record, activity, feature flag, migration, external workflow, payment, or payout was read or mutated.

## Next evidence-backed scope

Add a protected aggregate integration-health control plane. It must expose counts, status categories, configuration readiness, and timestamps only—never webhook payloads, event IDs, location IDs, error messages, references, emails, phone numbers, or customer identifiers.
