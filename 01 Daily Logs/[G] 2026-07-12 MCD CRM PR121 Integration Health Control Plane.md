# [G] 2026-07-12 — MCD CRM PR #121 Integration Health Control Plane

## Scope

Add a protected aggregate Integration Health page and JSON API without exposing webhook, error, customer, or credential details.

## Evidence

The existing Integration Monitor is designed for detailed Admin investigation and displays event IDs, location IDs, IntegrationError messages, and references. Operators also needed a safe high-level health view that exposes aggregate operational signals only.

## Implementation

PR: `hpintojr/crm.mcd#121`

Title: **Add a protected aggregate Integration Health control plane**

Squash merge commit: `0e589831cb5f1d9e5d13002d3fc29b25448d65a7`

Changes:

- Added `src/lib/integration-health.ts`.
- Added protected page `/admin/integrations/health`.
- Added protected JSON API `/api/admin/integrations/health`.
- Added Admin authorization and force-dynamic behavior.
- The API uses no-store/noindex/request-ID responses and HTTP 503 on read failure.
- Reads only:
  - WebhookEvent type/status for the last 24 hours;
  - WebhookEvent created/processed timestamps;
  - IntegrationError source/resolution state and aggregate timestamps/counts;
  - GHL configuration booleans and approved-location count;
  - environment, branch, and shortened commit SHA.
- Reports READY, ATTENTION_REQUIRED, CONFIGURATION_INCOMPLETE, or READ_FAILED.
- Reports ACTIVE or QUIET traffic separately.
- Added aggregate status/category counts, unresolved/resolved error totals, activity timestamps, and configuration readiness.
- Added explicit privacy flags.
- Never selects or returns payloads, event IDs, location IDs, raw messages, references, Lead/Agent records, emails, phone numbers, customer identifiers, credentials, or secret values.
- Added navigation from `/admin/integrations`.
- Added `scripts/check-integration-health-control-plane.ts`.
- The guard rejects sensitive select clauses and mutation primitives.
- Added documentation and deployment-verification version `2026-07-12-pr121`.

## Validation

Final PR head: `7a9830ebbd37939e5782562c1458617d0aa74129`

Required checks:

- Commission Policy: PASS
- Verify CRM: PASS
- Application Build: PASS
- Vercel preview: READY
- Review threads: none

The final preview passed:

- every existing repository guard;
- `Integration health control plane guard passed.`;
- Prisma generation;
- Next.js compilation;
- TypeScript validation;
- static generation;
- serverless packaging.

Unauthenticated preview access to `/admin/integrations/health` resolved to the secure sign-in page. No authenticated snapshot was queried during verification.

## Production

Deployment: `dpl_H1YszkAkbuvAFuFh4J3ogTZ8ghzC`

State: **READY**

Aliases include:

- `crm.mercurycalldesk.com`
- `crm-mcd.vercel.app`

Live `/api/status` returned HTTP 200 with:

- environment `production`;
- branch `main`;
- exact commit `0e589831cb5f1d9e5d13002d3fc29b25448d65a7`;
- no-store/noindex response metadata;
- complete security headers.

Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

No authenticated Integration Health snapshot was queried during verification. No IntegrationError was resolved, no WebhookEvent was replayed, no controlled event was run, no GHL API was called, and no Lead, Agent, AuditLog, feature flag, migration, payment, or payout was mutated.

## Next evidence-backed scope

Audit and standardize the remaining protected Admin read-only JSON APIs so they use the shared no-store/noindex/request-ID response contract without changing their query or business behavior. Start with the controlled-test-data report.
