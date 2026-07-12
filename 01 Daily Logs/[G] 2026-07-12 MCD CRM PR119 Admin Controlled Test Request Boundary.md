# [G] 2026-07-12 — MCD CRM PR #119 Admin Controlled Test Request Boundary

## Scope

Harden `POST /api/admin/integrations/test-events` without invoking preview/apply mode or changing controlled-test behavior.

## Evidence

The route already required an Admin role, but it still:

- parsed unbounded JSON;
- returned inconsistent response metadata;
- caught all service/database failures as raw public exception messages.

## Implementation

PR: `hpintojr/crm.mcd#119`

Title: **Harden the Admin controlled test request boundary**

Squash merge commit: `f3ed57f58e90f2db14c0fae180fcbc54c7882221`

Changes:

- Added `src/lib/authenticated-json-boundary.ts` as the generic authenticated 16 KiB JSON parser and no-store/noindex/request-ID response contract.
- Refactored `src/lib/portal-request-boundary.ts` into a compatibility adapter over the generic parser.
- Added `src/lib/admin-controlled-test-boundary.ts` with exact known-error mapping.
- Updated the Admin controlled-test route to:
  - require Admin authorization before body reads;
  - enforce declared and actual 16 KiB limits;
  - keep its existing Zod schema;
  - preserve exactly one preview service call and one apply service call;
  - return only approved known validation outcomes;
  - rethrow unexpected errors to runtime telemetry.
- Added `scripts/check-admin-controlled-test-boundary.ts`.
- Updated the portal boundary guard to protect the generic-parser/adapter relationship.
- Added documentation and deployment-verification version `2026-07-12-pr119`.

## Validation

Final PR head: `c85ee1776b14d0dfa68e4703226fc932429db03b`

Required checks:

- Commission Policy: PASS
- Verify CRM: PASS
- Application Build: PASS
- Vercel preview: READY
- Review threads: none

The preview build passed all existing guards plus:

- `Portal write request boundary guard passed.`
- `Admin controlled test request boundary guard passed.`

It also passed Prisma generation, Next.js compilation, TypeScript validation, static generation, and serverless packaging.

The endpoint was not invoked.

## Production

Deployment: `dpl_3xsrHHHaWFsvZBkGLUyVVBw4y8JU`

State: **READY**

Live `/api/status` returned HTTP 200 with:

- environment `production`;
- branch `main`;
- exact commit `f3ed57f58e90f2db14c0fae180fcbc54c7882221`;
- no-store/noindex response metadata;
- complete security headers.

Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

No controlled test was previewed or applied. No Lead, Appointment, Opportunity, callback, WebhookEvent, AuditLog, IntegrationError, feature flag, migration, GHL workflow, payment, or payout was read or mutated.

## Next evidence-backed scope

Retire the unused legacy `POST /api/admin/leads` writer. The current Admin import UI uses `/api/admin/leads/import/preview` and `/api/admin/leads/import`; repository search found no caller for the legacy endpoint. The legacy route independently performs unbounded, row-by-row, non-atomic imports and exposes created Lead IDs, bypassing the modern guarded lifecycle.
