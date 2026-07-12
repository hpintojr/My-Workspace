# [G] 2026-07-12 MCD CRM PR #106 — Auth Telemetry Hygiene

**Holder:** ChatGPT  
**Scope:** `hpintojr/crm.mcd` + `hpintojr/My-Workspace`  
**Owner direction:** Hamilton directed ChatGPT to continue autonomous end-to-end coding while Claude is unavailable.  
**Completed:** 2026-07-12T07:52Z

## Evidence

Vercel's seven-day runtime error aggregation showed expected Auth.js `CredentialsSignin` outcomes as the highest-frequency production error groups. These represented rejected credentials, MFA-required, MFA-invalid, and account-locked outcomes—not application crashes.

## Outcome

**PR:** https://github.com/hpintojr/crm.mcd/pull/106  
**Head:** `218a5a7889f5c99973d3fbc0b2947061713e65cf`  
**Squash merge:** `1e1fb17778dec131997c2259ea743bb738bc836b`

PR #106 added a typed Auth.js logger override that recognizes only `CredentialsSignin` outcomes. Expected credential rejections now emit compact informational telemetry containing only the error type and public error code. Unexpected Auth.js errors continue to use `console.error`.

Existing behavior remains unchanged:

- invalid passwords still increment `failedLogins`;
- lockout threshold and `lockedUntil` remain unchanged;
- `LOGIN_FAILED`, `ACCOUNT_LOCKED`, and `LOGIN_SUCCESS` audit records remain unchanged;
- `MFA_REQUIRED`, `MFA_INVALID`, and `ACCOUNT_LOCKED` codes remain available to the login client;
- email, password, TOTP, IP, user identity, and credential contents are not added to console telemetry.

## Regression protection

Added `scripts/check-auth-telemetry-hygiene.ts`, wired into `check:lead-flow-alignment` and the production build. The guard requires:

- expected CredentialsSignin classification;
- informational logging for expected credential outcomes;
- error logging for unexpected Auth.js failures;
- preservation of login failure, lockout, success, and MFA audit/control paths;
- exclusion of email/password/TOTP values from telemetry.

Deployment verification now includes:

- `Auth telemetry hygiene guard passed.`

## CI and preview

All required gates passed before merge:

- Commission Policy — success.
- Verify CRM / Typecheck and contract guards — success.
- Application Build — success.
- Vercel preview `dpl_AvDixmDNzEQvxBhHMxRSTHTotxKb` — READY, with zero unresolved toolbar threads.

The installed Auth.js package types accepted the logger implementation, and Next.js compile, type validation, static generation, and serverless packaging all passed.

## Production verification

- **Deployment:** `dpl_DHnrLuMcrsm4HFprQEvk4p7WQEET`
- **State:** READY
- **Target:** production
- **Aliases:** `crm-mcd.vercel.app`, `crm.mercurycalldesk.com`
- **Git SHA:** `1e1fb17778dec131997c2259ea743bb738bc836b`

Live `/api/status` returned HTTP 200 with `environment: production`, `branch: main`, and the exact merge SHA. The deployed response retained no-store caching, HSTS, CSP, anti-framing, MIME, referrer, permissions, opener, and legacy-browser security headers.

## Safety boundary

- No authentication outcome changed.
- No credential validation, MFA, lockout, session, or authorization rule changed.
- No production database data or schema changed.
- No feature flag changed.
- No GHL call or workflow activation occurred.
- No Servicing, Commission, Finance, payment, or payout action occurred.

## Next evidence-backed item

The next production error cluster is an expected certification precondition failure: the certification form offers approval choices for inactive or document-incomplete agents and then throws `Only an active agent can receive Lead eligibility.` The next autonomous slice will prevent invalid choices in the UI and convert stale precondition failures into clear, non-error navigation without weakening server-side enforcement.
