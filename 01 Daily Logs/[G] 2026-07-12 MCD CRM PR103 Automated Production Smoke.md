# [G] 2026-07-12 MCD CRM PR #103 — Automated Production Smoke

**Holder:** ChatGPT  
**Owner direction:** Hamilton directed ChatGPT to take over while Claude usage is unavailable and complete as much as possible end to end without human intervention.  
**Completed:** 2026-07-12T06:53Z

## Outcome

ChatGPT shipped PR #103 end to end: automated read-only production smoke verification after every push to `main`, on manual dispatch, and every six hours.

**PR:** https://github.com/hpintojr/crm.mcd/pull/103  
**Head:** `89d6f5e17ea5ffee672c270dea1e283dcb705c26`  
**Squash merge:** `4cc23d2d5376fa6c0986c437e9955d3b050558d9`

## Implementation

Added `.github/workflows/production-smoke.yml` with:

- `main` push trigger;
- manual dispatch;
- six-hour schedule;
- read-only repository permission;
- concurrency cancellation for superseded smoke runs;
- Node 24 execution;
- exact triggering-SHA verification.

Added `scripts/run-production-smoke.ts`, which:

- polls `/api/status` until production serves the exact expected `main` commit;
- verifies HTTP 200, JSON, no-store caching, `crm-mcd`, production environment, `main`, a valid 40-character SHA, deployment URL, and region;
- verifies `/login` is branded and `noindex, nofollow`;
- verifies unauthenticated requests to Project Readiness and Servicing Preflight pages and JSON APIs resolve to `/login`;
- rejects protected-page/API markers in unauthenticated responses;
- writes a GitHub Actions step summary.

Protected boundaries:

- `/admin/project-readiness`
- `/api/admin/project-readiness`
- `/admin/servicing/acceptance-command-center`
- `/api/admin/servicing/acceptance-readiness`

Added `scripts/check-production-smoke-guard.ts`, documentation, package scripts, and deployment-verification evidence line:

- `Production smoke automation guard passed.`

The guard rejects mutation HTTP methods, database access, secret references, authorization/cookie injection, write permissions, `pull_request_target`, and OIDC write permission.

## Validation

All required PR gates passed:

- Commission Policy — success.
- Verify CRM / Typecheck and contract guards — success.
- Application Build — success.
- Vercel preview `dpl_AGjhkYok6kKKn9ygr715PaN3LcJT` — READY with zero unresolved toolbar threads.

Preview build evidence included:

- complete existing guard chain;
- `Production smoke automation guard passed.`;
- Prisma generation;
- Next.js compile and typecheck;
- static generation and serverless packaging.

## Production verification

**Deployment:** `dpl_93ECxjqUsXP8kQhxWhLpipx6YNLo`  
**State:** READY  
**Aliases:** `crm-mcd.vercel.app`, `crm.mercurycalldesk.com`  
**Production SHA:** `4cc23d2d5376fa6c0986c437e9955d3b050558d9`

Live `/api/status` returned HTTP 200 with:

- `environment: production`
- `branch: main`
- exact merge SHA
- no-store caching
- deployment URL and region

The connected GitHub tool exposes PR-triggered workflow runs but not push-triggered workflow enumeration. The workflow configuration and build contracts were verified in CI, and equivalent production status/security-boundary checks were also verified directly after deployment. Future `main` pushes and the six-hour schedule will execute the workflow automatically.

## Safety boundary reaffirmation

- GET requests only.
- No authentication credentials or session cookies.
- No protected data access.
- No production database access from the smoke runner.
- No Lead, Client, Service Case, acceptance, audit, feature flag, or integration mutation.
- No GHL calls.
- No migrations.
- No Commission, Finance, payout, payment-provider, or money movement action.
