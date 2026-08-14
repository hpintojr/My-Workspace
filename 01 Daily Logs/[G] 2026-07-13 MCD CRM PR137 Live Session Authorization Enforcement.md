# MCD CRM — PR #137 Live Session Authorization Enforcement

## Date

2026-07-13

## Repository

`hpintojr/crm.mcd`

## Pull request

PR #137 — **Prove live status and role enforcement for issued sessions**

## Source finding

The application uses JWT sessions for coarse middleware routing, but protected server pages and APIs call `requireUser`, which reloads the current User from PostgreSQL, rejects missing or non-`ACTIVE` status, and lets `requireRole` evaluate the freshly loaded database role. The suspected stale-authorization gap was therefore already closed in application code, but lacked browser and persistence regression proof.

## Delivered scope

- Added two dedicated synthetic identities:
  - `e2e.suspended-session@mercurycalldesk.test`, initially active Owner;
  - `e2e.role-change@mercurycalldesk.test`, initially active Owner with a pre-created, Lead-disabled Agent profile.
- Added `tests/e2e/auth/disposable-auth-state.ts` as the only permitted mid-test mutation helper.
  - repeats explicit disposable opt-in, Vercel rejection, localhost PostgreSQL, and `e2e` database-name sentinels;
  - allowlists exactly the two synthetic identities;
  - permits only `User.status` values `ACTIVE`/`SUSPENDED` and `User.role` values `OWNER`/`AGENT`;
  - updates only `User.status` or `User.role`.
- Added browser proof that:
  - an issued Owner session is denied on the next protected request after the underlying User becomes `SUSPENDED`;
  - an issued Owner session immediately loses Admin access after the underlying role changes to `AGENT`;
  - the same session reaches the Agent portal using the current database role and Agent profile without a new login.
- Extended persisted assertions to prove:
  - the suspended identity had Owner `LOGIN_SUCCESS` evidence before status changed, persisted `SUSPENDED`, and remained independent of lockout state;
  - the role-change identity persisted current role `AGENT`, remained active/unlocked, and retained Owner-role login evidence from session issuance.
- Strengthened the ordinary source guard around current-database authorization and the exact allowlist/field/value constraints of the disposable mutation helper.
- Advanced the Build Guard Registry to `2026-07-13-pr137`; counts remain 46 deployment-visible entries, 45 Lead-flow executions, and one build-prelude entry.

## Validation

- Vercel preview: READY.
- Verify CRM: PASS.
- Commission Policy: PASS.
- Application Build: PASS.
- Authenticated E2E: PASS.
- Six-user seed and two synthetic Agent profiles: PASS.
- Eight browser scenarios: PASS.
- Persisted authentication security assertions: PASS.
- Failure-artifact upload: skipped because the run was clean.
- Review threads: none.

## Merge and production verification

- Squash merge SHA: `640009d995928f0ba218cbdf29ca02eaa6654453`.
- Vercel production deployment: `dpl_3cnnVbeGcwcUVUKmecWuwirurrUe`.
- Deployment state: READY.
- Aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200; environment `production`; branch `main`; exact merge SHA.
- Response retained no-store, noindex, HSTS, CSP, anti-framing, MIME, permissions, opener, and referrer-policy headers.
- Error/fatal runtime query returned no entries during the verification window.

## Production safety

All issued sessions, User status/role mutations, browser navigations, and persisted assertions ran only against localhost and disposable PostgreSQL. No production or preview account, session, database, protected route, Lead, Agent business state, Client/Service record, Commission/Payout record, integration, migration, feature flag, external workflow, payment, or money movement was used.
