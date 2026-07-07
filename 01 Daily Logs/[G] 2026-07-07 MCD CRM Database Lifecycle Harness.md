---
author: chatgpt
type: daily
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
scope: branch-only test harness for Claude review
---

# [G] 2026-07-07 — MCD CRM Database Lifecycle Harness

## Authority and boundaries

- Claude remains the official execution-lock holder and primary architect.
- This work is isolated-branch test infrastructure under Hamilton's temporary authorization.
- No production merge, deployment, environment change, credential change, schema migration, or live import occurred.

## Current PR checkpoint

```txt
PR: #32 — Phase D: reconcile lead-import API with current production fixes
Branch: chatgpt/phase-d-reconciled-20260706
Latest verified head: aa7595e3c2f4dbdf0696a57ebb84deaa4da96c67
Vercel status: success
Latest preview build: completed successfully in 47 seconds
```

## Added database-backed lifecycle harness

- New opt-in command: `npm run test:lead-import-db`.
- Uses the real lead-import service layer and a separate, explicitly supplied test database.
- Refuses to run unless `MCD_RUN_DB_INTEGRATION_TESTS=1`, `MCD_TEST_DATABASE_URL`, and `DATABASE_URL` are present and the normalized test target differs from `DATABASE_URL`.
- Runs with Node's `react-server` condition so server-only service modules can be tested through their actual runtime boundary.
- Produces unique `MCD_DBTEST_...` fixtures and removes its own LeadImportBatch, LeadImportRow, Lead, LeadActivity, AuditLog, and suppression fixtures after the run.

## Covered persistence behavior

1. A clean / in-batch-duplicate / suppressed batch:
   - exact batch retry;
   - changed batch replay conflict;
   - exact row retry;
   - changed-row replay conflict;
   - preview statuses;
   - submit to one pending-review Lead;
   - LeadActivity and AuditLog evidence; and
   - terminal batch upload refusal.

2. An existing-lead duplicate / clean-row batch:
   - preview to `REVIEW_REQUIRED`;
   - submit to `PARTIALLY_ACCEPTED`;
   - duplicate Lead reference retained; and
   - clean row imported.

## Validation status

```txt
- The normal preview build did not execute the database harness.
- The non-destructive harness guard passed during the full build.
- Prisma generation, Next.js production compile, type validation, page generation, and Vercel deployment succeeded.
- The database lifecycle command remains unexecuted until Claude/Hamilton provides a separate authorized test database target outside source control.
```

## Related files

```txt
- scripts/test-lead-import-lifecycle-db.ts
- scripts/check-lead-import-db-harness.ts
- src/lib/db-integration-test-guard.ts
- docs/lead-import-database-lifecycle-test.md
```

## Manual preview observation

Hamilton provided a preview screenshot showing `/admin/servicing` renders the Client Servicing Health feature-gate screen as expected. This is user-observed preview evidence, not a completed production or feature-enable test.
