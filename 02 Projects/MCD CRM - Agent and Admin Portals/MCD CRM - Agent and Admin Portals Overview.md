---
type: status
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
---

# MCD CRM — Agent and Admin Portals Overview

## Read first

```txt
1. [C] AI Operating Protocol — Handoff, Changelog, Indexing.md
2. 01 Daily Logs/[C] 2026-07-07 Reviewed and Merged PR 32 to Production Lock Released.md
3. 01 Daily Logs/[G] 2026-07-07 MCD CRM Post-Merge Export Readiness.md
4. [C] MCD CRM — Production Scope & 13-Layer Review.md
5. This overview
```

## Current status — authoritative 2026-07-07

```txt
Production is healthy.

PHASE D LEAD IMPORT
- PR #32 was reviewed and accepted by Claude, then merged to production as squash d25ac9f.
- Production deployment is READY; the production Vercel status for d25ac9f is successful.
- The signed lead-import API and read-only Admin reconciliation screens are live:
  /admin/lead-imports
  /admin/lead-imports/[batchId]
- Phase D delivers approval-gated imports, immutable replays, bounded concurrency recovery,
  suppression and duplicate handling, audit evidence, request-size protection, and stable error responses.
- Production Neon read-only counts remain zero: LeadImportBatch, LeadImportRow, Lead,
  LeadActivity, and import-related AuditLog. No live import has run.

IMPORT CONFIGURATION
- Hamilton-provided Vercel evidence confirms LEAD_IMPORT_KEY_ID and LEAD_IMPORT_HMAC_SECRET are
  present in both Production and Preview. Values were not inspected or recorded.
- The matching local exporter variables still need to be confirmed on Hamilton's machine:
  MCD_LEAD_IMPORT_KEY_ID
  MCD_LEAD_IMPORT_HMAC_SECRET
  MINICRM_API_BASE_URL=https://crm.mercurycalldesk.com

LOGIN / ADMIN / SERVICING
- Claude verified production login, /admin/servicing, and /admin/lead-imports resolve normally.
- Hamilton reached /portal, /admin, and the intended /admin/servicing feature-gate screen on preview.
- The July servicing outage fix remains in place: no competing [id] versus [clientAccountId] route.

LOCK / HANDOFF
- Claude released the lock after merging PR #32.
- ChatGPT took the released lock for post-merge verification and supervised-export readiness only.
- No live export may run until an approved local run ID and operator approval reference exist.
```

## Exact next work

```txt
1. On the local mcd_lead_ops machine, confirm the three local import variables are present and
   match the production import configuration. Do not disclose values.
2. Choose a small, permitted local run with a completed preview and explicit operator approval.
3. Run one supervised local export:
   mcd-leads export --run <approved-run-id>
4. Record only the MiniCRM batch ID, aggregate result counts, final status, and any review or
   reconciliation counts. Never record raw payloads, secrets, signed headers, or contact data.
5. ChatGPT performs a read-only production verification of LeadImportBatch, LeadImportRow, Lead,
   LeadActivity, and AuditLog evidence.
6. After the first supervised import is reconciled, continue the remaining 13-layer hardening work:
   preview/production secret and database separation, RLS and least-privilege runtime role,
   error tracking, real login smoke testing, and Neon autoscaling headroom.
```

## Goal

Build Mercury Call Desk's secure MiniCRM for its Independent Sales Partner program:

- agent portal;
- admin portal;
- GoHighLevel as private backend only;
- MiniCRM as system of record.

## Product rules that do not change

```txt
- MiniCRM is the system of record. GHL is backend-only. Agents never receive GHL credentials.
- Phase 1 partner onboarding is production-validated.
- Lead and Task modules remain feature-gated until the lead foundation is live.
- Local lead workflow: permitted inputs -> local SQLite staging -> operator review -> signed MiniCRM export.
- No local process writes directly to Neon/Postgres.
- Permitted lead inputs: user files, referrals, web forms, PPC, licensed provider data, owned-account
  exports, and permitted business-site research.
- Google Maps, LinkedIn, directory scraping, and browser-automation adapters are declined/stubbed.
- Imported leads enter pending review with no automatic agent assignment or campaign enrollment.
- Never commit credentials, customer data, SSNs, tax IDs, or raw bank data.
```

## Related repo — mcd_lead_ops

`mcd_lead_ops` is a separate local Python CLI at `D:\GitHub\mcd_lead_ops`. It stages permitted sources into local SQLite for operator preview and approval. Its scheduled task may intake, preview, and research but may never approve or export automatically. The first signed production export must be a supervised, operator-approved local run.

## Incident memory

```txt
If admin/portal pages hang while /login and /api/auth/session respond, inspect for sibling dynamic route
segments under src/app before blaming auth. The July 6 production incident was a competing segment under
admin/servicing; it was fixed in PR #31 / f338cc4 and protected by an automated route-collision guard.

If only *.vercel.app URLs fail while the custom domain works, check Vercel Authentication/Deployment
Protection before investigating application code.
```

## Reference documents

```txt
[C] MCD CRM — Production Scope & 13-Layer Review.md
[C] Local Lead Operations and MiniCRM Export Scope.md
01 Daily Logs/[C] 2026-07-07 Reviewed and Merged PR 32 to Production Lock Released.md
01 Daily Logs/[G] 2026-07-07 MCD CRM Post-Merge Export Readiness.md
```