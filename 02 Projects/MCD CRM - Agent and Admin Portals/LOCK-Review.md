# Execution Lock Review — MCD CRM

> Review companion only. `LOCK.md` remains the sole execution lock and Claude remains the primary architect.

## Official lock snapshot

```txt
holder: claude
scope: crm.mcd (+ mcd_lead_ops)
since: 2026-07-06T22:45Z
intent: production is fixed and stable; next is PR #30 rebase + merge + first live lead import
```

The official lock remains unchanged. Hamilton authorized temporary branch-only ChatGPT work for Phase D reconciliation and review preparation.

## Current review checkpoint

```txt
PR: #32
Branch: chatgpt/phase-d-reconciled-20260706
Latest verified head: ca2f6abfebf9eccb4de593e6dfea6d7a3c86acda
Latest preview: Vercel success
Production code: not merged
Production import data: no live import run
```

## Review scope now in PR #32

- Phase D import replay, error, request-size, HMAC, workflow, and concurrency hardening.
- Payload-free audit wrappers and read-only `/admin/lead-imports` reconciliation.
- Read-only `/admin/lead-imports/[batchId]` batch detail: metadata, outcome rows, linked internal IDs, and limited audit timeline only.
- Opt-in `npm run test:lead-import-db` lifecycle harness. It refuses the normal database target and has not been run because no separate authorized test database was supplied.
- Dynamic-route, response, concurrency, database-harness, access-policy, and read-only-screen guards.

## Preview observations

```txt
- Hamilton manually reached /portal and /admin on preview.
- /admin/servicing shows the intentional Client Servicing Health feature gate.
- These observations are preview evidence only, not production enablement.
```

## Boundaries

```txt
Allowed when Hamilton requests: isolated-branch code, tests, docs, preview checks, and read-only verification.

Not allowed: merge, production deployment or settings changes, secret changes, live imports,
destructive actions, or execution-lock transfer.
```

## Claude checklist

```txt
[ ] Review PR #32 and latest preview.
[ ] Decide whether PR #32 supersedes PR #30.
[ ] Review the import hardening, read-only screens, and database test harness.
[ ] Confirm Actions are enabled.
[ ] Identify a separate test database before approving the opt-in lifecycle run.
[ ] Update LOCK.md intent after review.
[ ] Merge PR #32 by the approved method.
[ ] Confirm production deployment and environment-variable presence.
[ ] Complete authorized MFA validation through /admin, /portal, and /admin/servicing.
[ ] Run and log the first supervised approved mcd-leads export.
```

## Related records

```txt
- 01 Daily Logs/[G] 2026-07-07 MCD CRM Phase D Concurrency Hardening.md
- 01 Daily Logs/[G] 2026-07-07 MCD CRM Database Lifecycle Harness.md
- docs/lead-import-database-lifecycle-test.md in PR #32
```

Update `LOCK.md` only for a real holder or official-intent change. Update this review file and the daily log for review checkpoints and Claude’s acceptance or rejection record.