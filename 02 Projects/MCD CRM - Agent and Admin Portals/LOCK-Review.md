# Execution Lock Review — MCD CRM

> Review companion only. `LOCK.md` remains the sole execution lock and Claude remains the primary architect.

## Official lock snapshot

```txt
holder: claude
scope: crm.mcd (+ mcd_lead_ops)
since: 2026-07-06T22:45Z
intent: production is fixed and stable; next is PR #30 rebase + merge + first live lead import
```

The official lock remains unchanged. Hamilton authorized a temporary ChatGPT exception on July 6, 2026 for Phase D reconciliation and isolated branch work after Claude reached a session limit before recording the intended handoff.

## Current review checkpoint

```txt
PR: #32 — Phase D: reconcile lead-import API with current production fixes
Branch: chatgpt/phase-d-reconciled-20260706
Latest verified head: 4199d20940ef3a74d80efc45da202d0b9ec976fe
Latest preview: Vercel success; build completed in 43 seconds
Production code: not merged
Production import data: no live import run
```

## Branch-only hardening now in PR #32

- Immutable staged-row retries: exact retries are no-ops; changed row hash or canonical row content is rejected before writes.
- Batch creation and row staging recover bounded unique-key races instead of exposing raw database uniqueness errors.
- A `localRunId` replay with changed immutable batch metadata returns controlled `409 LEAD_IMPORT_REPLAY_CONFLICT`.
- Concurrent Lead creation is reconciled correctly: durable same-batch rows restore to `IMPORTED`; a durable Lead from another batch becomes `POSSIBLE_EXISTING_DUPLICATE`; unresolved errors remain reconciliation events.
- Batch status GET supports signed empty-body requests and uses no-store cache behavior.
- Oversized import bodies are rejected with controlled `413 LEAD_IMPORT_PAYLOAD_TOO_LARGE` before parsing.
- Missing import HMAC configuration returns controlled `503 LEAD_IMPORT_UNAVAILABLE`.
- Import routes keep validation/state detail but return stable generic messages for unexpected internal errors.
- Payload-free audit wrappers record preview exceptions, imported rows, submit-time duplicates, and import errors. An audit-storage failure is represented through `IntegrationError` when possible without misreporting the durable import outcome as failed.
- Read-only `/admin/lead-imports` is limited to OWNER, SUPER_ADMIN, and COMPLIANCE_MANAGER. It shows batch totals and exception evidence without payload/contact data or write controls.
- Build guards cover dynamic route collisions, import contract/workflow/HMAC/replay/response safety, concurrency recovery, and admin/portal route policy.
- A Verify CRM GitHub Actions workflow is committed; Claude should confirm repository Actions are enabled because no workflow run has appeared through the connector.

## Boundaries while review is pending

```txt
ChatGPT may perform only Hamilton-requested isolated-branch code, tests, docs, preview checks, and read-only verification.

ChatGPT may not merge, deploy production, change settings, provision or expose secrets, run live imports,
perform destructive actions, or transfer the official execution lock.
```

## Claude checklist

```txt
[ ] Review PR #32 and latest Vercel preview.
[ ] Decide whether PR #32 supersedes PR #30.
[ ] Review concurrency recovery, immutable batch replay, audited route wrappers, and read-only reconciliation page.
[ ] Confirm Actions are enabled.
[ ] Update LOCK.md intent after reviewing.
[ ] Merge PR #32 using the approved method.
[ ] Confirm production deployment.
[ ] Verify environment-variable presence without exposing values.
[ ] Complete authorized MFA validation through /admin, /portal, and /admin/servicing.
[ ] Run and log the first supervised approved mcd-leads export.
```

## Read next

```txt
- 01 Daily Logs/[G] 2026-07-06 MCD CRM Phase D Reconciliation.md
- 01 Daily Logs/[G] 2026-07-06 MCD CRM Phase D Reconciliation Addendum.md
- 01 Daily Logs/[G] 2026-07-07 MCD CRM Phase D Branch Hardening.md
- 01 Daily Logs/[G] 2026-07-07 MCD CRM Phase D Concurrency Hardening.md
- [C] MCD CRM — Production Scope & 13-Layer Review.md
- docs/lead-import-first-supervised-run.md in PR #32
```

## Synchronization rule

Update `LOCK.md` only for a real holder or official-intent change. Update this review file and the daily log for branch checkpoints and Claude’s acceptance or rejection record.