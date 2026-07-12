# [G] 2026-07-12 MCD CRM PR #102 — Servicing Acceptance Preflight

**Holder:** ChatGPT  
**Scope:** `hpintojr/crm.mcd` + `hpintojr/My-Workspace`  
**Owner direction:** Hamilton instructed ChatGPT to keep coding.  
**Completed:** 2026-07-12T06:37Z

## Outcome

ChatGPT shipped PR #102 end to end: a protected, aggregate-only Client Servicing acceptance command center and JSON API that prepare the next operational module for a future Hamilton-authorized controlled test window without enabling Servicing or using any test records.

**PR:** https://github.com/hpintojr/crm.mcd/pull/102  
**Head:** `aca9a174c67be95cc0b48e5b6d88e732c6d5378d`  
**Squash merge:** `3ef0117798e110d795a8784946680bf8a99d07bb`

## Pre-implementation production findings

Read-only Neon production checks confirmed:

- All four Client/Service tables are present.
- Lead Flow acceptance is complete.
- Servicing, Commission, and Finance remain closed.
- No Servicing acceptance outcomes were recorded.
- No Client Accounts existed.
- No Service Cases existed.
- Exactly two verified, unsuppressed Closed Won Leads had no existing Client Account and were available as aggregate future onboarding candidates.

No Lead or client identity is exposed by the new preflight.

## New protected surfaces

- `/admin/servicing/acceptance-command-center`
- `/api/admin/servicing/acceptance-readiness`

The JSON API uses `Cache-Control: no-store` and requires an authorized admin role.

## Shared readiness model

Added `src/lib/servicing-acceptance-readiness.ts` with:

- `SERVICING_SCHEMA_TABLES` for the four required Client/Service tables.
- Shared `SERVICING_ACCEPTANCE_STEPS` used by both the command center and the existing acceptance board.
- Read-only catalog checks using `information_schema.tables`.
- Latest Lead and Servicing acceptance summaries from `AuditLog`.
- Aggregate queue metrics only:
  - onboarding candidates;
  - Client Accounts;
  - pending launches;
  - active accounts;
  - healthy/current accounts;
  - payment-attention accounts;
  - House/unassigned accounts;
  - open, overdue, and urgent/high cases;
  - service activities;
  - assignment events.
- A hard decision model:
  - `BLOCKED_SCHEMA`
  - `BLOCKED_LEAD_ACCEPTANCE`
  - `UNSAFE_GATE_COMBINATION`
  - `OWNER_AUTHORIZATION_REQUIRED`
  - `CONTROLLED_WINDOW_OPEN`

With the current production state, the expected decision is `OWNER_AUTHORIZATION_REQUIRED`: technical prerequisites and controlled inputs exist, but the Servicing gate remains closed.

## Operator experience

The command center now shows:

- current readiness decision;
- schema, Lead prerequisite, financial-gate separation, controlled-input, and owner-window checks;
- Lead/Servicing/Commission/Finance gate matrix;
- aggregate-only Servicing queues;
- the nine-step acceptance sequence and latest outcomes;
- deep links to individual acceptance-board steps;
- a clear owner authorization boundary.

The existing `/admin/servicing/testing` board now imports the shared step definitions and includes stable `id` anchors plus a link to the preflight. Its existing acceptance-write behavior was not expanded or invoked.

Operating Status now links the Client Servicing phase to the read-only command center.

## Regression protection

Added `scripts/check-servicing-acceptance-preflight-guard.ts`, wired into `check:lead-flow-alignment` and the production build.

The guard protects:

- helper/page/API contracts;
- admin authorization;
- aggregate-only wording;
- acceptance-board deep links;
- Operating Status navigation;
- deployment-verification pass-line reporting;
- build-script wiring.

It explicitly rejects mutation primitives in the new preflight files, including:

- `$executeRaw`
- `$queryRawUnsafe`
- `revalidatePath`
- server actions
- `db.auditLog.create`
- Client Account creation
- Service Case creation
- launch confirmation

Deployment verification now includes:

- `Servicing acceptance preflight guard passed.`

## CI and preview verification

All four required gates were green before merge:

- `Commission Policy` — success.
- `Verify CRM / Typecheck and contract guards` — success.
- `Application Build` — success.
- Vercel — success / `READY`, with zero unresolved toolbar threads.

**Preview deployment:** `dpl_96ve3TLzEXuu3cUrXNdCUwpS2bfw`

Preview build evidence included:

- complete guard chain success;
- `Servicing acceptance preflight guard passed.`;
- Prisma Client generation success;
- Next.js compile and type validation success;
- static generation and serverless packaging success.

Preview unauthenticated `/admin/servicing/acceptance-command-center` returned HTTP 200 at the secure sign-in boundary, confirming the route existed without publicly exposing readiness data.

## Production deployment verification

**Vercel deployment:** `dpl_7VqiqbgwAAvuQNdHfGboVcuxjYgG`  
**State:** `READY`  
**Target:** production  
**Git SHA:** `3ef0117798e110d795a8784946680bf8a99d07bb`  
**Aliases:** `crm-mcd.vercel.app`, `crm.mercurycalldesk.com`

Production build evidence included:

- all existing contract guards passed;
- `Servicing acceptance preflight guard passed.`;
- Prisma Client generation success;
- Next.js compile/type/static/serverless build success.

Live `https://crm.mercurycalldesk.com/api/status` returned HTTP 200 with:

- `environment: production`
- `branch: main`
- `commitSha: 3ef0117798e110d795a8784946680bf8a99d07bb`

Live unauthenticated `/admin/servicing/acceptance-command-center` returned HTTP 200 at the secure sign-in boundary, not 404 or 500.

## Post-deployment production state

A final read-only production query confirmed:

- onboarding candidates: **2**
- Client Accounts: **0**
- Service Cases: **0**
- Servicing acceptance records: **0**

This confirms the PR prepared the acceptance workflow without using the candidates or mutating Servicing state.

## Safety boundary reaffirmation

- No migration was applied.
- No production DDL or DML was executed.
- No feature flag changed.
- No Lead or Client Account was mutated.
- No Client Account was created or launched.
- No Service Case was created, updated, or resolved.
- No Servicing acceptance outcome was recorded.
- No live GHL call or workflow activation occurred.
- Commission and Finance remained closed.
- No payout, payment-provider action, financial-account storage, or money movement occurred.

## Next owner decision

Hamilton may separately authorize a controlled Client Servicing acceptance window. That future decision would need to specify the test window and controlled records, keep Commission and Finance closed, and remain separate from normal Servicing activation.

Until then, the expected preflight decision remains `OWNER_AUTHORIZATION_REQUIRED`, and the two aggregate onboarding candidates must not be used.
