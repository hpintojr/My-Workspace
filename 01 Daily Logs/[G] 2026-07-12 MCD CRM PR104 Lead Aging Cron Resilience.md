# [G] 2026-07-12 MCD CRM PR #104 — Lead Aging Cron Resilience

**Holder:** ChatGPT  
**Owner direction:** Hamilton directed ChatGPT to continue autonomous end-to-end work while Claude is unavailable.  
**Completed:** 2026-07-12T07:03Z

## Evidence and root cause

A read-only Vercel seven-day runtime error review found two `PrismaClientInitializationError` failures on `/api/cron/leads/aging` because the Neon pooler was temporarily unreachable. The existing cron route called `runLeadAgingSweep` directly and had no bounded readiness retry or structured response handling.

Other runtime error groups were primarily expected credentials/business validation rejection noise or a dependency deprecation warning; the aging failures were the concrete operational outage target.

## Outcome

ChatGPT shipped PR #104 end to end.

**PR:** https://github.com/hpintojr/crm.mcd/pull/104  
**Head:** `e67157aa441f18a347e2c038974a74b95d6ff5c3`  
**Squash merge:** `6542d01236c8f89bb37f90800884cbac6f5f9bfe`

## Implementation

Added `src/lib/transient-database-retry.ts` with:

- Prisma connectivity codes `P1001`, `P1002`, `P1008`, `P1017`, and `P2024`;
- network/database message classification;
- wrapped-cause inspection;
- maximum-attempt bounds;
- bounded exponential delays;
- typed exhaustion error and attempt count.

Updated `/api/cron/leads/aging` to:

- retain `LEADS_ENABLED` and `CRON_SECRET` checks;
- generate or preserve a safe `X-Request-Id`;
- use no-store JSON responses;
- run a read-only `SELECT 1` readiness probe before selecting Leads;
- retry only the readiness probe, at most three attempts;
- log sanitized structured retry/failure metadata;
- return HTTP `503`, `retryable: true`, failure phase, request ID, attempt count, and `Retry-After: 60` for transient database outages;
- return HTTP `500` for non-transient failures.

Critical invariant:

- `runLeadAgingSweep` remains outside the retry helper and is awaited exactly once.
- The route never automatically replays the mutating sweep after an uncertain transaction outcome.

No Lead aging selection, timer, exclusion, dry-run, limit, update, claim-event, activity, or audit rule changed.

## Regression protection

Added `scripts/check-lead-aging-cron-resilience.ts` with executable tests for:

- immediate success without retry;
- transient failures recovering on attempt three;
- non-transient failure without retry;
- typed bounded exhaustion;
- wrapped transient error recognition;
- pool-timeout classification;
- non-transient constraint classification;
- exact single `runLeadAgingSweep` await;
- prohibition against wrapping the sweep in the retry helper;
- response/logging/documentation/build contracts.

Wired the check into `check:lead-flow-alignment` and deployment verification with:

- `Lead aging cron resilience guard passed.`

Added `docs/LEAD_AGING_CRON.md`, README updates, and documentation index updates.

## CI and preview verification

All required gates passed:

- Commission Policy — success.
- Verify CRM / Typecheck and contract guards — success.
- Application Build — success.
- Vercel preview `dpl_5HvCy9aX6Yumq7WqAENd18ZeWHNy` — READY with zero unresolved toolbar threads.

Build evidence included:

- complete guard chain success;
- `Lead aging cron resilience guard passed.`;
- Prisma generation;
- Next.js compile and type validation;
- static generation and serverless packaging.

## Production verification

**Deployment:** `dpl_D2fvmdNPpDEFY1JA7sdjqffmgUQF`  
**State:** READY  
**Target:** production  
**Aliases:** `crm-mcd.vercel.app`, `crm.mercurycalldesk.com`  
**Production SHA:** `6542d01236c8f89bb37f90800884cbac6f5f9bfe`

Live `/api/status` returned HTTP 200 with production, `main`, and the exact merge SHA.

A safe unauthenticated GET to `/api/cron/leads/aging` returned:

- HTTP `401 Unauthorized`;
- generic JSON only;
- `Cache-Control: no-store, max-age=0`;
- generated `X-Request-Id` matching the response body.

No authorized request and no dry-run or mutating sweep was invoked.

## Safety boundary reaffirmation

- No production cron execution.
- No Lead read-selection through the authorized cron path.
- No Lead, claim event, activity, or audit mutation.
- No feature flag change.
- No database schema change or migration.
- No GHL or external workflow call.
- No Servicing, Commission, Finance, payout, or payment action.
- No money movement.
