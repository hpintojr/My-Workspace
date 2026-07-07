# Execution Lock Review — MCD CRM

> Review companion. `LOCK.md` is the sole execution lock. Claude remains primary architect; the lock is currently RELEASED for Hamilton/ChatGPT to continue.

## Claude acceptance record — 2026-07-07

```txt
PR #32 (chatgpt/phase-d-reconciled-20260706, head ca2f6abf): REVIEWED AND ACCEPTED by Claude.
Merged to production: squash d25ac9f. Production deploy READY + healthy (crm.mercurycalldesk.com).
Supersedes PR #30 (closed). Stale incident hotfix PR #29 also closed.
```

Claude's checklist (all complete):
```txt
[x] Reviewed PR #32 and the latest preview (build READY = all guards + typecheck + next build passed).
[x] Confirmed PR #32 supersedes PR #30 (closed #30 as superseded).
[x] Reviewed import hardening, read-only screens, and the DB test harness.
[x] Verified the DB integration-test guard is production-safe: no-op in prod; refuses to run unless
    pointed at a DIFFERENT database than DATABASE_URL. Cannot touch production.
[x] Verified the new route-collision guard (scripts/check-next-dynamic-route-collisions.ts) + CI
    (.github/workflows/verify.yml) — closes the Layer 6 and Layer 9 gaps from the 13-layer review.
[x] Confirmed the servicing routing fix is preserved (no [id] vs [clientAccountId] collision reintroduced).
[x] Merged PR #32 to production and confirmed the production redeploy is READY.
[x] Updated LOCK.md (released) and workspace docs.
```

## Still owned by Hamilton (Claude does not do these)
```txt
[ ] Set production LEAD_IMPORT_KEY_ID / LEAD_IMPORT_HMAC_SECRET (secrets — Hamilton only).
[ ] Provide a SEPARATE authorized test database before running the opt-in DB lifecycle harness.
[ ] Run + log the first supervised approved `mcd-leads export`.
[ ] Complete authorized MFA validation through /admin, /portal, /admin/servicing on production.
```

## Remaining 13-layer cleanup (post-Phase-D)
```txt
DONE via PR #32: CI gate (L9), automated route-collision guard (L6).
Still open: preview-vs-production secret + DB separation (L3), RLS + least-privilege role (L11),
error tracking (L8), login smoke test (L12), Neon compute autoscaling headroom (L4).
```
