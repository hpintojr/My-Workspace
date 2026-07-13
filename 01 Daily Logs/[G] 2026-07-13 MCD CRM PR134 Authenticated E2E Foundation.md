# MCD CRM — PR #134 Authenticated E2E Foundation

## Date

2026-07-13

## Repository

`hpintojr/crm.mcd`

## Pull request

PR #134 — **Add a disposable authenticated E2E foundation**

## Delivered scope

- Added a GitHub Actions browser workflow backed by a disposable PostgreSQL 17 service database named `crm_e2e` on `127.0.0.1`.
- Added localhost-only Playwright configuration and Chromium execution.
- Added an idempotent synthetic authentication seed for:
  - `e2e.owner@mercurycalldesk.test` as an active Owner;
  - `e2e.agent@mercurycalldesk.test` as an active Agent with a linked Agent profile and Lead claiming disabled.
- Added fail-closed seed sentinels requiring explicit disposable-database opt-in, localhost PostgreSQL targets, an `e2e` database-name token, no Vercel environment, and synthetic passwords.
- Added real browser coverage for:
  - unauthenticated Admin and Agent redirects;
  - Owner credentials login and server-side role routing;
  - protected Build Guard Registry access;
  - logout and post-logout denial;
  - Agent portal routing;
  - Agent denial at the Admin boundary while preserving the Agent session.
- Added a source guard rejecting repository secrets, production/preview/Neon hosts, enabled business gates, migrations, GHL targets, and production-sensitive endpoints.
- Added failure-only Playwright traces, screenshots, videos, and HTML report retention.
- Added operator documentation and package scripts.
- Advanced the Build Guard Registry to version `2026-07-13-pr134` with 46 deployment-visible entries, 45 Lead-flow executions, and one build-prelude entry.

## Validation

- Vercel preview: READY.
- Verify CRM: PASS.
- Commission Policy: PASS.
- Application Build: PASS.
- Authenticated E2E: PASS.
- PostgreSQL container initialization: PASS.
- Prisma disposable schema creation: PASS.
- Synthetic Owner/Agent seed: PASS.
- Chromium installation: PASS.
- Browser session, role-boundary, and logout scenarios: PASS.
- Failure artifact upload was skipped because no test failed.
- Review threads: none.

## Merge and production verification

- Squash merge SHA: `e2dce3f00db54cb98f62a2fbe76e5d5e6edaabca`.
- Vercel production deployment: `dpl_641k9gGXbfLNmNJvSR6VTFPKZyK9`.
- Deployment state: READY.
- Aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200; environment `production`; branch `main`; exact merge SHA.
- Response retained no-store, noindex, HSTS, CSP, anti-framing, MIME, permissions, opener, and referrer-policy headers.
- Error/fatal runtime query for the deployment returned no entries during the verification window.

## Production safety

The authenticated browser workflow runs only on localhost against its disposable PostgreSQL service. No production or preview authentication was attempted, no production account was used, and no production database, import, export, controlled test, cron, signup, activation, webhook, GHL, Servicing, Commission, Finance, payment, or payout action was invoked.
