# MCD CRM — PR #113 Public Signup Boundary

**Date:** 2026-07-12  
**Repository:** `hpintojr/crm.mcd`  
**PR:** #113 — Harden the public partner signup boundary  
**Merge commit:** `b9fa939455f2f8aad92c24ea65fc508b81e6dbe0`

## Evidence

The public `POST /api/signup` route checked for duplicate email, called GHL, and created the local Agent afterward. Concurrent submissions could both pass the lookup and trigger the external side effect before the database unique constraint rejected one request. Accepted responses also disclosed the internal Agent ID, GHL state, and whether a submitted email already existed through different status codes.

## Implemented

- Added a 16 KiB declared and actual UTF-8 request-body limit.
- Added `Cache-Control: no-store`, `X-Request-Id`, and `X-Robots-Tag: noindex, nofollow, noarchive` to every signup JSON response.
- Trimmed submitted fields and canonicalized personal email to lowercase during validation and before persistence.
- Replaced the preflight duplicate lookup with one durable reservation transaction that creates:
  - one `SUBMITTED` Agent;
  - the existing four pending onboarding-document rows;
  - an initial `AGENT_SIGNUP` AuditLog with GHL state `pending`.
- Moved the GHL contact upsert after the durable reservation and kept it outside all database transactions.
- Treats Prisma unique conflicts as idempotent accepted retries; duplicate/concurrent requests do not perform a second GHL call.
- New, duplicate/retry, and honeypot accepted outcomes use the same HTTP 202 response: `{ "ok": true }`.
- Removed Agent ID, GHL state, stub state, and integration details from the public response.
- Replaced raw GHL error storage with a sanitized `IntegrationError` containing only operation, request ID, and opaque internal reference.
- If post-GHL persistence finalization fails, the already-durable application remains accepted and only sanitized database error metadata is logged.
- Added `check-public-signup-boundary.ts`, documentation, build wiring, and deployment-verification version `2026-07-12-pr113`.

## Validation

All required PR checks completed successfully:

- Verify CRM / Typecheck and contract guards;
- Commission Policy;
- Application Build;
- Vercel preview deployment.

Final preview deployment `dpl_8Mkad3Xk7cQohQBTfqE1oYnM49iQ` was READY. The full build passed `Public signup boundary guard passed.` and TypeScript validation.

Production deployment `dpl_9AXSq1r5Bfw9oheJMthceThd5eRN` is READY and aliased to `crm.mercurycalldesk.com`.

Production `/api/status` returned HTTP 200 with environment `production`, branch `main`, and exact commit `b9fa939455f2f8aad92c24ea65fc508b81e6dbe0`.

A safe GET of production `/signup` returned HTTP 200 with the expected Partner sign-up form, `noindex, nofollow` metadata, and the complete global HTTP security-header baseline.

No POST was sent to `/api/signup`, no Agent/application record was created, and no GHL call was made during implementation or deployment verification.

Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

No migration, production feature flag, existing Agent, Lead, Client Account, Service Case, acceptance record, GHL workflow, Commission/Finance state, payment provider, payout, credential, or protected customer record was changed or accessed.
