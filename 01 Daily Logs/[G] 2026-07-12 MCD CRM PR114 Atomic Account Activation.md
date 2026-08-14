# MCD CRM — PR #114 Atomic Account Activation

**Date:** 2026-07-12  
**Repository:** `hpintojr/crm.mcd`  
**PR:** #114 — Make account activation tokens atomically single use  
**Merge commit:** `ba61547bb753c8ac126a1879909400d973ba6cb0`

## Evidence

The public activation completion route loaded an unused token before its transaction, then updated the User and token through a transaction array. Concurrent completion requests could both load the same unused token and both update password/MFA state, allowing the later request to overwrite the first.

The activation request body was unbounded, the prepare response returned an unused account email, responses lacked a uniform no-store/noindex/request-ID contract, and the raw activation token remained in browser history/referrer context.

## Implemented

- Added an 8 KiB declared and actual UTF-8 request-body limit.
- Added bounded discriminated request validation:
  - non-empty activation token, maximum 512 characters;
  - password 12–256 characters with at least one non-whitespace character;
  - bounded Base32 TOTP secret;
  - six-digit TOTP code.
- Added centralized `Cache-Control: no-store`, `X-Request-Id`, and `X-Robots-Tag: noindex, nofollow, noarchive` JSON responses.
- Removed the unused account email from the prepare API response.
- Added sanitized handling for lookup, QR/audit, password-hashing, and completion failures without exposing raw exception messages.
- Made completion atomically single use in one interactive transaction:
  - conditionally consumes the exact unused/unexpired token with `updateMany`;
  - requires exactly one consumed row;
  - re-reads the current User and rejects Disabled state;
  - updates password/MFA and records `MFA_ENROLLED` and `ACTIVATION_COMPLETED` audits in the same transaction.
- Concurrent losing requests receive the same invalid/expired response and cannot overwrite winning credentials.
- Added force-dynamic, noindex, and `no-referrer` activation page metadata.
- Removes the token query from browser history after hydration and uses `referrerPolicy: no-referrer` for activation API requests.
- Clears password, confirmation, and TOTP client state after successful completion.
- Added `check-account-activation-boundary.ts`, documentation, build wiring, and deployment-verification version `2026-07-12-pr114`.

## Validation

The first final-head preview identified a TypeScript narrowing issue in the regression script only. The application code and guard runtime passed; the test was corrected with explicit discriminated-union narrowing before merge.

All required checks then completed successfully:

- Verify CRM / Typecheck and contract guards;
- Commission Policy;
- Application Build;
- Vercel preview deployment.

Corrected preview deployment `dpl_DdcwaUZFRgwm9purfbotHTMhCwig` was READY. A safe tokenless GET of `/activate` returned HTTP 200 with:

- “Activation link unavailable”;
- `<meta name="referrer" content="no-referrer">`;
- `<meta name="robots" content="noindex, nofollow, noarchive">`;
- dynamic no-store behavior;
- complete global security headers.

Production deployment `dpl_3YmsYEr1WpJmm5XgHcqvsNDLFsCC` is READY and aliased to `crm.mercurycalldesk.com`.

Production `/api/status` returned HTTP 200 with environment `production`, branch `main`, and exact commit `ba61547bb753c8ac126a1879909400d973ba6cb0`.

A safe tokenless production GET of `/activate` confirmed the unavailable state, noindex/noarchive, no-referrer metadata, and complete security-header baseline.

No activation token was used, no POST was sent to `/api/activate`, no password or MFA state changed, and Vercel reported no runtime errors in the latest one-hour window.

## Safety boundary

No migration, feature flag, production activation record, User, Agent, Lead, Client Account, Service Case, acceptance record, GHL workflow, Commission/Finance state, payment provider, payout, credential, or protected customer record was changed or accessed.
