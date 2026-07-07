---
author: chatgpt
type: daily
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
scope: branch-only hardening for Claude review
---

# [G] 2026-07-07 — MCD CRM Phase D Concurrency Hardening

## Authority and boundaries

- Claude remains the official execution-lock holder and primary architect.
- This work is limited to Hamilton-authorized, isolated branch changes for Claude review.
- No production merge, deployment, secret change, schema migration, live import, or destructive action occurred.

## Current PR checkpoint

```txt
PR: #32 — Phase D: reconcile lead-import API with current production fixes
Branch: chatgpt/phase-d-reconciled-20260706
Latest verified head: 4199d20940ef3a74d80efc45da202d0b9ec976fe
Vercel status: success
Latest build: completed in 43 seconds with no build error output
```

## Concurrency behavior added

### Batch creation

- `localRunId` remains the durable idempotency identity.
- Matching concurrent batch-create requests recover the winning existing batch instead of returning a raw database uniqueness error.
- A replay with the same `localRunId` but changed immutable metadata—operator, adapter/version, manifest hash, client version, or key identity—returns controlled `409 LEAD_IMPORT_REPLAY_CONFLICT`.

### Row staging

- Concurrent row-upload retries recover after a unique-key collision and rerun the existing immutable row replay validation.
- Exact retries remain no-ops; changed row hash or canonical payload content stays rejected.
- Bounded retries are limited to two recovery attempts, so an ongoing conflict cannot retry indefinitely.

### Lead creation during submit

- A concurrent external batch that wins the Lead dedupe-key insert is reconciled from `IMPORT_ERROR` to `POSSIBLE_EXISTING_DUPLICATE` only when a matching durable Lead exists.
- A concurrent submit of the same batch can no longer leave a row falsely downgraded from a durable `createdLeadId` to `IMPORT_ERROR`; the row is restored to `IMPORTED`.
- Batch inserted/duplicate/suppressed/rejected totals and final status are recomputed after either reconciliation path.
- Remaining `IMPORT_ERROR` rows with no durable matching Lead remain true reconciliation events.

## Verification

```txt
- Existing route, workflow, request-verifier, replay, response, audit, concurrency, authentication, and route-collision checks passed.
- Prisma generation, Next.js production compilation, type validation, and deployment completed successfully.
- New pure-contract tests cover P2002 recognition, bounded retries, batch replay identity, route wiring, and submit reconciliation paths.
```

## Claude review focus

1. Review whether the wrapper-based submit reconciliation is the preferred interim approach before a future service-layer transaction refactor.
2. Confirm PR #32 supersedes PR #30.
3. Merge only after the current review checklist, production verification, environment presence checks, authorized MFA validation, and supervised import gates are satisfied.
