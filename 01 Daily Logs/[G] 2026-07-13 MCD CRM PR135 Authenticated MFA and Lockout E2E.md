# MCD CRM — PR #135 Authenticated MFA and Lockout E2E

## Date

2026-07-13

## Repository

`hpintojr/crm.mcd`

## Pull request

PR #135 — **Extend authenticated E2E coverage to MFA and lockout**

## Delivered scope

- Added two isolated synthetic accounts:
  - `e2e.mfa@mercurycalldesk.test`, active Owner with MFA enabled and a fixed test-only Base32 TOTP secret;
  - `e2e.lockout@mercurycalldesk.test`, active Agent dedicated to failed-password state.
- Extended the disposable seed to require four synthetic passwords and the MFA secret while preserving all localhost/PostgreSQL/`e2e` database-name/Vercel rejection sentinels.
- Added browser proof that an unknown account and a known account with a wrong password receive the same generic public error.
- Added real MFA browser proof for:
  - missing-code challenge;
  - deliberately invalid current TOTP;
  - valid freshly generated TOTP and successful Owner routing.
- Added real lockout browser proof for:
  - five generic failed-password responses;
  - correct password blocked by the 15-minute lockout state.
- Set Playwright to one worker and zero retries because lockout is intentionally stateful.
- Strengthened the source guard to protect the application source contract of five attempts, a 15-minute lockout, MFA error codes, TOTP verification, lock reset on success, four synthetic identities, and all prior environment prohibitions.
- Advanced manifest version to `2026-07-13-pr135`; counts remain 46 deployment-visible entries, 45 Lead-flow executions, and one build-prelude entry.

## Validation and evidence-driven repair

The first browser run reached all scenarios and captured failure artifacts. The application responses were correct, but three assertions used `getByRole("alert")`, which matched both the login form error and Next.js's empty route-announcer alert. The selector was scoped to `form [role='alert']` and the workflow was rerun from a fresh disposable database.

Final validation:

- Vercel preview: READY.
- Verify CRM: PASS.
- Commission Policy: PASS.
- Application Build: PASS.
- Authenticated E2E: PASS.
- PostgreSQL container, Prisma schema, four-user seed, and Chromium: PASS.
- All six browser scenarios: PASS.
- Final failure-artifact upload: skipped because the rerun was clean.
- Review threads: none.

## Merge and production verification

- Squash merge SHA: `a29426406f3e6c5492133555b61532ab3b096ea7`.
- Vercel production deployment: `dpl_94E7BvBPYF4WQp5rrd6Xi444J2mY`.
- Deployment state: READY.
- Aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200; environment `production`; branch `main`; exact merge SHA.
- Response retained no-store, noindex, HSTS, CSP, anti-framing, MIME, permissions, opener, and referrer-policy headers.
- Error/fatal runtime query returned no entries during the verification window.

## Production safety

All authentication attempts ran only against localhost and disposable PostgreSQL. No production or preview user, session, database, protected route, import, export, controlled test, cron, signup, activation, webhook, GHL, Servicing, Commission, Finance, payment, or payout action was used.
