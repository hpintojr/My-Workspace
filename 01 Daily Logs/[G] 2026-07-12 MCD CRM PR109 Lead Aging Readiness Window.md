# MCD CRM — PR #109 Lead Aging Readiness Window

Date: 2026-07-12
Executor: ChatGPT
Repository: `hpintojr/crm.mcd`

## Evidence

The July 12, 2026 12:00 UTC scheduled Lead-aging invocation failed safely during the read-only database readiness phase.

Vercel evidence showed:

- phase: `database-readiness`
- retryable: `true`
- database probe attempts: `3`
- error: sanitized `PrismaClientInitializationError`
- no mutating Lead-aging sweep execution

The prior route used three readiness attempts with only 250 ms and 500 ms backoff between attempts. The Neon pooler remained unavailable beyond that narrow window, so the daily cycle returned the existing retryable 503 without performing the sweep.

## Implementation

PR: https://github.com/hpintojr/crm.mcd/pull/109

- Expanded only the read-only `SELECT 1` readiness probe from three to five attempts.
- Added bounded exponential delays of 1, 2, 4, and 8 seconds.
- Added `export const maxDuration = 90` to the Next.js App Router route so the expanded window remains explicitly bounded.
- Kept `runLeadAgingSweep` outside the retry helper and awaited exactly once.
- Preserved the existing authorization, `LEADS_ENABLED` gate, daily schedule, dry-run and limit behavior, aging selection rules, timers, batch behavior, mutations, structured logging, request IDs, no-store headers, sanitized error contract, and retryable 503 behavior.
- Expanded `check-lead-aging-cron-resilience.ts` to verify:
  - recovery on the fifth attempt;
  - five-attempt typed exhaustion;
  - the route timing constants;
  - the 90-second route budget;
  - exactly one awaited mutating sweep;
  - no retry wrapper around the mutating sweep.
- Updated operator documentation and deployment-verification version.

## Verification

Preview head: `cd5ce32fd8d6fe413ecec4f0425fdb2da758c70f`

Final preview deployment: `dpl_3ucVCPUoFxmSG67vrjaAtW3XVLSJ` — READY.

Two earlier intermediate preview builds failed while sequential commits temporarily placed the guard ahead of the required documentation. The final head reconciled all files and passed.

All required PR gates passed:

- Verify CRM — success
- Commission Policy — success
- Application Build — success
- Vercel Preview — READY, zero unresolved toolbar threads

The final build passed the full guard chain, Prisma generation, Next.js compilation, TypeScript validation, static generation, and packaging.

## Merge and production

Squash merge commit: `6e11cd99bb39b0943bbb6907299bd25dcf701770`

Production deployment: `dpl_8UL8sGzdbApDgCjrtpf2TgtJBixW` — READY and aliased to `crm.mercurycalldesk.com`.

Live `/api/status` verification:

- HTTP 200
- environment `production`
- branch `main`
- exact commit `6e11cd99bb39b0943bbb6907299bd25dcf701770`
- `Cache-Control: no-store`
- security header baseline intact

The production cron was not invoked manually. The expanded readiness window will first be exercised by a later independently scheduled or specifically authorized run.

## Safety boundary

No Lead was selected or mutated. No cron invocation was initiated. No failed sweep was replayed. No scheduler, aging eligibility rule, feature flag, migration, GHL integration, Client/Service state, Commission/Finance state, payment, payout, or money movement was changed.
