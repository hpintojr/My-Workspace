# [C] 2026-07-03 — Phase D Lead-Import Batch API Built

*Continuation of today's earlier log (Login Hang Incident). Hamilton instructed: "finish the API - Phase D then hit the back log items."*

## What shipped

Phase D of `mcd_lead_ops` / `crm.mcd` is now fully built end-to-end — the five-endpoint batch import API that the local tool was always designed against (contract + HMAC primitives already existed; the routes did not).

**crm.mcd (PR #30, branch `feature/lead-import-batch-api`, Vercel preview build verified READY):**
- Prisma: `LeadImportBatch` / `LeadImportRow` models + status enums. Migration applied to production Neon (`jolly-lab-80341970`) via the safe branch-tested prepare/complete flow.
- `src/lib/lead-import-env.ts`, `lead-import-route-guard.ts`, `lead-import-batch.ts` (service layer).
- 5 route handlers under `src/app/api/lead-imports/`: create batch, upload rows, preview, submit, status.
- Submit commits VALID rows into Lead/LeadActivity/AuditLog inside a transaction, only after an operator-recorded approval is posted.

**mcd_lead_ops (local, pushed directly — doc/code repo, not GitHub-PR-gated the same way):**
- `export/minicrm_client.py` rewritten from a raise-only stub to a real HTTP client (HMAC-signed via `export/signing.py`, using the `requests` dependency already in pyproject.toml).
- `config.py`: added `load_minicrm_config()` reading `MINICRM_API_BASE_URL` / `MCD_LEAD_IMPORT_KEY_ID` / `MCD_LEAD_IMPORT_HMAC_SECRET`.
- `jobs/export.py` rewritten to drive the full lifecycle (create batch → upload rows → preview → submit) and write results back to SQLite.
- `jobs/reconcile.py` implemented (was a stub) — re-checks a batch's status later via GET and syncs local row state.
- `staging/sqlite_store.py`: added `set_run_minicrm_batch`, `mark_run_exported`, `mark_row_export_state`.
- `cli.py`: `export` command now actually exports; added a new `reconcile` command.
- All changed Python files syntax-verified (ast.parse) via a fresh standalone copy, since the sandbox's FUSE view of `D:\GitHub\mcd_lead_ops` was stale again (same known issue as before — always verify via the Read tool, not the bash mount, right after an edit).

## Before this goes live — action needed from Hamilton

1. **Add two Vercel production env vars on `crm-mcd`:** `LEAD_IMPORT_KEY_ID` and `LEAD_IMPORT_HMAC_SECRET` (any strong random secret). This was intentionally *not* done automatically — provisioning a new production secret is flagged for your go-ahead rather than done silently.
2. **Mirror the same two values** into mcd_lead_ops's local `.env` as `MCD_LEAD_IMPORT_KEY_ID` and `MCD_LEAD_IMPORT_HMAC_SECRET`, plus set `MINICRM_API_BASE_URL` to `https://crm.mercurycalldesk.com` (or the Vercel preview URL while testing).
3. **Review and merge PR #30** (`hpintojr/crm.mcd`) once you're satisfied — https://github.com/hpintojr/crm.mcd/pull/30. Build already verified READY on Vercel.
4. This has **not** been tested against a live server yet (no credentials to do so). First real `mcd-leads export --run <id>` after the secrets are set should be treated as a live test.

## Design notes / assumptions made

- Row payloads travel inline in the upload request body (`row: leadImportRowSchema`), matching the existing (previously unused) `lead-import-payload-schema.ts` — not via Cloudflare R2, since nothing wired that up on the server side.
- No admin-review UI shipped in this pass (that's backlog item "Improve Admin operational visibility" — next up). Rows needing human review land as `PENDING_ADMIN_REVIEW` / `POSSIBLE_EXISTING_DUPLICATE` and the batch lands on `PARTIALLY_ACCEPTED` rather than blocking the clean rows.

## Next up (backlog, in progress)

- Point mcd_lead_ops at a real recurring source config
- Improve Admin operational visibility
- Prevent duplicate document dispatch after approval
- Add optional company/entity metadata
