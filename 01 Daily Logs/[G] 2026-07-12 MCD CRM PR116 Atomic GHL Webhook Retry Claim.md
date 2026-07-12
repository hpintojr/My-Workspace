# MCD CRM — PR #116 Atomic GHL Webhook Retry Claim

**Date:** 2026-07-12  
**Repository:** `hpintojr/crm.mcd`  
**PR:** #116 — Claim failed GHL webhook retries atomically  
**Merge commit:** `ca559be251e6c48e6e21849acb8a5d9f7cb00329`

## Evidence

The shared `recordInboundEvent()` helper handled duplicate failed events through a read-then-update sequence: it loaded the existing `WebhookEvent`, checked for status `ERROR`, then unconditionally changed it back to `RECEIVED`. Two concurrent retries could both observe `ERROR`, both return `firstTime: true`, and both repeat downstream side effects.

## Implemented

- Replaced the failed-event read-then-update flow with one conditional `WebhookEvent.updateMany` compare-and-set operation.
- Retry claims require both:
  - the exact `ghlEventId`;
  - current status `ERROR`.
- Only the delivery receiving `count = 1` changes the event to `RECEIVED`, clears `processedAt`, refreshes event metadata, and returns `firstTime: true, retry: true`.
- Concurrent losing deliveries receive `count = 0`, return `firstTime: false`, and remain duplicates without downstream processing.
- First deliveries and duplicates in non-ERROR states retain their existing behavior.
- All six shared consumers inherit the atomic claim:
  - appointments;
  - documents;
  - funding;
  - invoices;
  - opportunities;
  - inbound replies.
- Added `check-ghl-webhook-replay-claim.ts` to protect ordering, require exactly one conditional update, forbid the former status read, and verify all consumers stop on duplicates.
- Added documentation, index/build wiring, and deployment-verification version `2026-07-12-pr116`.

## Validation

All required PR checks completed successfully:

- Verify CRM / Typecheck and contract guards;
- Commission Policy;
- Application Build;
- Vercel preview deployment.

Final preview deployment `dpl_2xUWvxmMpbxcKJCGVj3BXwLAtxF2` was READY. The full build passed `GHL webhook replay claim guard passed.`, Prisma generation, TypeScript validation, and Next.js packaging.

Production deployment `dpl_4HAzRLQNnkr9PoxSDu5zRd6Dn66q` is READY and aliased to `crm.mercurycalldesk.com`.

Production `/api/status` returned HTTP 200 with environment `production`, branch `main`, and exact commit `ca559be251e6c48e6e21849acb8a5d9f7cb00329`; the complete security-header baseline remained intact.

No GHL webhook endpoint was invoked, no external API was called, and Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

No production WebhookEvent, Lead, Agent, User, Appointment, onboarding document, callback, audit record, integration record, feature flag, migration, GHL workflow, Commission/Finance state, payment provider, or payout was read or mutated.
