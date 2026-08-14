# MCD CRM — PR #133 Build Guard Registry Drift Repair

## Date

2026-07-13

## Repository

`hpintojr/crm.mcd`

## Pull request

PR #133 — **Repair Build Guard Registry drift checks**

## Root cause

PR #132 advanced the Build Guard Registry to version `2026-07-13-pr132`, 45 deployment-visible entries, and 44 Lead-flow executions. Three executable checks still contained PR-specific version or fixed-count assumptions from PR #131. The merged PR #132 production build therefore failed before deployment.

## Delivered repair

- Added manifest-declared counts:
  - `expectedDeploymentVisibleCount: 45`
  - `expectedLeadFlowCount: 44`
- Replaced PR-specific version/count assertions in:
  - `scripts/check-deployment-verification-guard.ts`
  - `scripts/check-build-guard-registry.ts`
  - `scripts/check-build-guard-control-plane.ts`
- Required a dated PR-version format and exact agreement between declared counts and filtered manifest entries.
- Derived `LEAD_DEPLOYMENT_VERIFICATION_VERSION` directly from `BUILD_GUARD_REGISTRY_VERSION`.
- Added regression checks rejecting a copied deployment version literal and stale PR #131 deployment-guard wording.
- Preserved exact guard order, pass lines, compatibility evidence, package discovery metadata, and final self-check position.
- Restored PR #132's omitted navigation/documentation contracts:
  - `/admin/build-guards` and `/api/admin/build-guards` in the documentation index.
  - Build Guard Registry control-plane link in the README.
  - Explicit `Protected control plane` documentation section.

## Validation

- Vercel preview: READY.
- Verify CRM: PASS.
- Commission Policy: PASS.
- Application Build: PASS.
- Lead-import prelude checks: PASS.
- Manifest runner: 44/44 registered guards PASS.
- Route Boundary Registry: 0 findings.
- Prisma generation: PASS.
- Next.js compilation, type checking, page-data collection, and serverless output: PASS.
- Review threads: none.

## Merge and production verification

- Squash merge SHA: `9dba97967fa05e599bd8c9e76c5ab67b781c149f`.
- Vercel production deployment: `dpl_AERgCF3XQP8u37dEPnTSEhkUxVRY`.
- Deployment state: READY.
- Aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200; environment `production`; branch `main`; exact merge SHA.
- Response retained no-store, noindex, HSTS, CSP, anti-framing, MIME, permissions, opener, and referrer-policy headers.
- Error/fatal runtime log query for the deployment returned no entries during the verification window.

## Current operational state

- Build Guard Registry control plane is deployed at `/admin/build-guards` with JSON at `/api/admin/build-guards`.
- Registry inventory: 45 deployment-visible entries, 44 Lead-flow executions, one build-prelude entry.
- Version and expected counts are now manifest-driven rather than duplicated across executable checks.

## Safety boundary

No protected application endpoint other than public `/api/status` was invoked. No production database record was read or mutated, no migration or feature flag was changed, and no import, export, controlled test, cron, signup, activation, webhook, GHL, Servicing, Commission, Finance, payment, or payout action was performed.
