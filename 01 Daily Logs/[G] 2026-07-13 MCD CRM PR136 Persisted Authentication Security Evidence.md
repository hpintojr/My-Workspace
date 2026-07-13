# MCD CRM — PR #136 Persisted Authentication Security Evidence

## Date

2026-07-13

## Repository

`hpintojr/crm.mcd`

## Pull request

PR #136 — **Assert persisted authentication security evidence**

## Delivered scope

- Added `scripts/assert-auth-e2e-security-state.ts` as a read-only verifier after the real browser suite.
- Repeated the full disposable safety boundary: explicit opt-in, Vercel rejection, PostgreSQL only, localhost-only hosts, and an `e2e` database-name token.
- Selected only the four synthetic User records and their authentication AuditLog rows.
- Verified Owner persistence:
  - wrong-password evidence;
  - successful login reset of `failedLogins` and `lockedUntil`;
  - persisted `lastLoginAt`;
  - ordered `LOGIN_FAILED` → `LOGIN_SUCCESS` → `LOGOUT` evidence.
- Verified normal Agent login persistence and absence of lockout.
- Verified MFA persistence:
  - `MFA_REQUIRED` and `MFA_INVALID` reason metadata;
  - `LOGIN_SUCCESS` after valid TOTP;
  - no password-lock counter increase from MFA challenge failures.
- Verified lockout persistence:
  - exactly five failed logins;
  - future `lockedUntil`;
  - five AuditLog counters exactly `[1,2,3,4,5]`;
  - exactly one `ACCOUNT_LOCKED` row;
  - exact timestamp agreement between User and AuditLog;
  - no successful timestamp or `LOGIN_SUCCESS` row.
- Strengthened the ordinary Application Build guard to reject any write, raw SQL, transaction, business-table access, external call, or non-local target in the verifier.
- Advanced the Build Guard Registry to `2026-07-13-pr136`; counts remain 46 deployment-visible entries, 45 Lead-flow executions, and one build-prelude entry.

## Validation

- Vercel preview: READY.
- Verify CRM: PASS.
- Commission Policy: PASS.
- Application Build: PASS.
- Authenticated E2E: PASS.
- Six browser scenarios: PASS.
- Persisted authentication security state: PASS.
- Failure-artifact upload: skipped because the run was clean.
- Review threads: none.

## Merge and production verification

- Squash merge SHA: `db5e849dd4de1969373652967ba2c1b18a90734b`.
- Vercel production deployment: `dpl_AedTKpYmK71U3Na2UHFtxoJbrBUb`.
- Deployment state: READY.
- Aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200; environment `production`; branch `main`; exact merge SHA.
- Response retained no-store, noindex, HSTS, CSP, anti-framing, MIME, permissions, opener, and referrer-policy headers.
- Error/fatal runtime query returned no entries during the verification window.

## Production safety

The persisted verifier ran only against the disposable localhost PostgreSQL service. It performed reads only and did not access production or preview users, sessions, databases, protected routes, Leads, Agents, Client/Service records, Commission/Payout records, integrations, imports, exports, controlled tests, cron, signup, activation, webhooks, GHL, payments, or money movement.
