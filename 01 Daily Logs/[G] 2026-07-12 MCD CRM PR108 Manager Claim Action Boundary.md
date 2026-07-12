# MCD CRM — PR #108 Manager Claim Action Boundary

Date: 2026-07-12
Executor: ChatGPT
Repository: `hpintojr/crm.mcd`

## Evidence

Vercel had recorded the expected runtime failure `Use reassignment controls for manager lead assignment.` on `/portal/leads`.

The underlying service in `src/lib/claims.ts` already enforced the correct rules:

- managers/admins may directly claim only controlled acceptance-test Leads;
- real Leads require Admin reassignment controls;
- the actor must have a manager-certified Agent profile;
- the Lead must have verified two-way contact, an eligible pool/lifecycle, no current owner, and no DNC/suppression;
- capacity is enforced;
- ownership acquisition uses an atomic `updateMany` and requires exactly one updated row;
- successful claims retain the 45-day release timer, claim event, Lead activity, and audit record.

The mismatch was in `src/app/portal/leads/page.tsx`, which rendered the direct claim form from Lead eligibility alone.

## Implementation

PR: https://github.com/hpintojr/crm.mcd/pull/108

- Added actor-side rendering gates:
  - certified Agents may directly claim eligible Leads;
  - managers/admins may directly claim only controlled test Leads;
  - managers reviewing real Leads receive clear reassignment guidance instead of a claim action.
- Preserved the service-side authorization and atomic claim implementation unchanged.
- Converted only known expected stale/race-condition failures into status feedback:
  - manager reassignment required;
  - certification required;
  - active capacity reached;
  - Lead no longer eligible or available.
- Unexpected failures are rethrown for production telemetry.
- Added successful-claim feedback.
- Added `scripts/check-manager-claim-boundary.ts` and wired it into `check:lead-flow-alignment` and the production build.
- Added the deployment-verification pass line and `docs/CLAIM_ACTION_BOUNDARY.md`.

## Verification

Preview head: `0ebca78868b021c24611793e7b97fee6ba2d9a65`

Preview deployment: `dpl_DgADyUue5dJjcsn6MaxUmUQLijse` — READY.

All required gates passed:

- Verify CRM — success
- Commission Policy — success
- Application Build — success
- Vercel Preview — READY, zero unresolved toolbar threads

The build output included:

- `Manager claim action boundary guard passed.`
- successful Prisma generation;
- successful Next.js compile and TypeScript validation;
- successful page generation and deployment packaging.

## Merge and production

Squash merge commit: `69d99abfde8e9bf254f087b773fdab54602159cb`

Production deployment: `dpl_2Tk6nyPoGCAsysQLGjba95gL9ddD` — READY and aliased to `crm.mercurycalldesk.com`.

Live `/api/status` verification:

- HTTP 200
- environment `production`
- branch `main`
- exact commit `69d99abfde8e9bf254f087b773fdab54602159cb`
- `Cache-Control: no-store`
- security header baseline intact

Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

No production Lead was claimed, reassigned, suppressed, approved, imported, or otherwise mutated during implementation or deployment. No feature flag, migration, GHL integration, Client/Service record, Commission/Finance state, payment, payout, or money movement was changed.
