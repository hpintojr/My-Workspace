# MCD CRM — PR #117 GHL Webhook Request Boundary

**Date:** 2026-07-12  
**Repository:** `hpintojr/crm.mcd`  
**PR:** #117 — Harden the inbound GHL webhook request boundary  
**Merge commit:** `e406ee508a44d9c636bdf13ef9b146418dc1d542`

## Evidence

All six inbound GHL routes parsed complete JSON request bodies before checking the shared webhook secret. Unauthenticated oversized requests could therefore consume body-read and parsing resources. The routes also lacked one body-size and response-metadata contract, and several catch paths returned or stored raw exception messages.

## Implemented

- Added one shared inbound request boundary in `src/lib/ghl-webhook.ts`.
- Verifies `x-mcd-webhook-secret` with constant-time comparison before reading a request body.
- Added a 1 MiB declared and actual UTF-8 body limit.
- Added generic 400/413 responses for unreadable, malformed, or oversized requests.
- Centralized JSON responses with:
  - `Cache-Control: no-store, max-age=0`;
  - bounded/generated `X-Request-Id`;
  - `X-Robots-Tag: noindex, nofollow, noarchive`.
- Kept each route’s existing Zod payload schema and performs approved-location verification immediately after schema success.
- Applied the shared boundary to appointments, documents, funding, invoices, opportunities, and inbound replies.
- Preserved existing success, duplicate, ignored, unmatched, conflict, queued, provisioning, and attribution result fields.
- Replaced raw catch-path exception messages with generic public errors and sanitized internal evidence: source, request ID, opaque reference, error class, and recognized database/network error code.
- Kept accepted raw payloads in the existing `WebhookEvent` replay ledger while removing unnecessary raw payload copies from failure records.
- Added `check-ghl-webhook-request-boundary.ts`, documentation/indexing, build wiring, and deployment-verification version `2026-07-12-pr117`.

## Validation

The actual final PR head was `09ef0c72aa01ba923fe4be8b88bf56780ac8041b`. All required checks completed successfully:

- Verify CRM / Typecheck and contract guards;
- Commission Policy;
- Application Build;
- Vercel preview deployment.

Final preview deployment `dpl_Fx1Y4JoCH1bMn8B5RG1jweMrHTCY` was READY. Its complete build passed `GHL webhook request boundary guard passed.`, Prisma generation, TypeScript validation, and Next.js packaging.

Production deployment `dpl_DCEFsVBAW38G1rRQDScViZrQALuP` completed on exact merge commit `e406ee508a44d9c636bdf13ef9b146418dc1d542` and passed the complete guard/build chain. Before the final release record was written, `main` and the production alias advanced to the compatible follow-on PR #118 at `7f7606d4f9a9fb82a20d911ac55d8b3fbabf97fb` (“Sanitize GHL webhook integration error evidence”).

Safe production `/api/status` verification confirmed the current production alias at PR #118. The latest one-hour Vercel runtime-error window was clean.

No GHL webhook route was invoked during preview or production verification.

## Safety boundary

No webhook was sent, no GHL API was called, and no production WebhookEvent, Lead, Agent, User, Appointment, onboarding document, callback, audit record, integration record, feature flag, migration, Commission/Finance state, payment provider, or payout was read or mutated.
