# Execution Lock Review — MCD CRM

> Review companion. `LOCK.md` is the sole execution lock. Claude remains primary architect; ChatGPT currently holds the released lock for post-merge verification and supervised-export readiness.

## Claude acceptance record — 2026-07-07

```txt
PR #32 (chatgpt/phase-d-reconciled-20260706, head ca2f6abf): REVIEWED AND ACCEPTED by Claude.
Merged to production: squash d25ac9f. Production deploy READY + healthy (crm.mercurycalldesk.com).
Supersedes PR #30 (closed). Stale incident hotfix PR #29 also closed.
```

Claude's completed verification:

```txt
[x] Reviewed PR #32 and production readiness.
[x] Confirmed PR #32 supersedes PR #30.
[x] Reviewed import hardening, read-only screens, and database test harness.
[x] Verified the database integration-test guard cannot use the normal production target.
[x] Verified CI and the Next.js route-collision guard.
[x] Confirmed the servicing route collision was not reintroduced.
[x] Merged PR #32 to production and confirmed the production redeploy is READY.
[x] Released the lock and updated workspace records.
```

## ChatGPT post-merge verification — 2026-07-07

```txt
[x] Took the released lock for post-merge verification and supervised-export readiness only.
[x] Hamilton-provided Vercel evidence shows LEAD_IMPORT_KEY_ID and LEAD_IMPORT_HMAC_SECRET are present
    in both Production and Preview. Values were not inspected or recorded.
[x] Confirmed production commit d25ac9f has successful Vercel status.
[x] Read-only Neon counts remain zero: LeadImportBatch, LeadImportRow, Lead, LeadActivity, and
    import-related AuditLog.
[x] Last-six-hour production runtime count check returned no 5xx responses.
[ ] Local mcd_lead_ops environment is not visible through connected sources.
[ ] First supervised local export has not run because no approved local run ID or operator approval
    reference has been provided.
```

## Remaining prerequisites for first supervised export

```txt
1. On Hamilton's local mcd_lead_ops machine, confirm presence only of:
   MCD_LEAD_IMPORT_KEY_ID
   MCD_LEAD_IMPORT_HMAC_SECRET
   MINICRM_API_BASE_URL=https://crm.mercurycalldesk.com
2. Select a small permitted local run with completed preview and explicit operator approval.
3. Run mcd-leads export --run <approved-run-id> locally.
4. Log only batch ID, aggregate counts, final status, and non-sensitive reconciliation outcomes.
5. ChatGPT verifies production batch, Lead, LeadActivity, and AuditLog evidence read-only.
```

## Remaining 13-layer cleanup (post-Phase-D)

```txt
DONE via PR #32: CI gate (L9), automated route-collision guard (L6).
Still open: preview-vs-production secret + DB separation (L3), RLS + least-privilege role (L11),
error tracking (L8), authorized login smoke test (L12), Neon compute autoscaling headroom (L4).
```

## Related records

```txt
- 01 Daily Logs/[C] 2026-07-07 Reviewed and Merged PR 32 to Production Lock Released.md
- 01 Daily Logs/[G] 2026-07-07 MCD CRM Post-Merge Export Readiness.md
- 02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
- docs/lead-import-first-supervised-run.md in hpintojr/crm.mcd
- docs/lead-import-database-lifecycle-test.md in hpintojr/crm.mcd
```

Update `LOCK.md` only for a real holder or official-intent change. Update this review file and the daily log for evidence, blockers, and handoff state.