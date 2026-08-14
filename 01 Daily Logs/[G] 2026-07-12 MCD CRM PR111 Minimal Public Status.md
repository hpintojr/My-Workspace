# MCD CRM — PR #111 Minimal Public Status

**Date:** 2026-07-12  
**Repository:** `hpintojr/crm.mcd`  
**PR:** #111 — Minimize the public deployment status payload  
**Merge commit:** `05852690d6eadd48446a8a77146bdc62de2154a2`

## Evidence

The intentionally unauthenticated `/api/status` deployment endpoint exposed more metadata than the Production Smoke workflow required: the full commit message, immutable deployment hostname, Vercel region, and a per-request timestamp.

## Implemented

- Reduced the public JSON contract to:
  - `ok`;
  - service name;
  - environment;
  - git branch;
  - exact 40-character commit SHA.
- Removed public commit messages, deployment hostnames, regions, and request timestamps.
- Added `X-Robots-Tag: noindex, nofollow, noarchive`.
- Preserved `Cache-Control: no-store` and the global HTTP security-header baseline.
- Updated Production Smoke to continue exact-SHA convergence checks and fail if removed metadata is reintroduced.
- Strengthened `check-production-smoke-guard.ts` to protect the reduced source contract.
- Updated `docs/PRODUCTION_SMOKE.md` and deployment-verification version `2026-07-12-pr111`.

## Validation

All required PR checks completed successfully:

- Verify CRM / Typecheck and contract guards;
- Commission Policy;
- Application Build;
- Vercel preview deployment.

Final preview deployment `dpl_6Yi1sQe1g7VYXpp6WBjborKzrkUJ` was READY. A direct preview request returned only service, preview environment, branch, and commit SHA, with removed metadata absent.

Production deployment `dpl_FWpazC9Bf41w8qLYAs5vXcvGdHim` is READY and aliased to `crm.mercurycalldesk.com`.

Production `/api/status` returned HTTP 200 with:

- environment `production`;
- branch `main`;
- exact commit `05852690d6eadd48446a8a77146bdc62de2154a2`;
- no commit message, deployment object, region, or timestamp;
- `Cache-Control: no-store, max-age=0`;
- `X-Robots-Tag: noindex, nofollow, noarchive`;
- full security-header baseline intact.

Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

No migration was applied. No production feature flag, Lead, Client Account, Service Case, acceptance record, GHL workflow, Commission/Finance state, payment provider, payout, credential, or protected customer record was changed or accessed.
