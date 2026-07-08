# MCD Lead Research Production Release

**Date:** 2026-07-07

## Release

- Merged `hpintojr/crm.mcd` PR #33 into `main`.
- Release commit: `bba4e8385a68baa5799c06da26bd6d136790b1fe`.
- Vercel production deployment reached `READY` in `iad1`.
- No production runtime error or fatal log entries were returned immediately after deployment.

## Implemented scope

- Lead sales-research fields: Business Address, Google Rating, observed timestamp, and outbound Google Maps URL.
- Owner-only batch acquisition record containing only opaque `sourceCode` and `acquisitionReference`.
- Actual provider identity, commercial terms, purchase records, and vendor documentation remain outside MiniCRM.
- Google Maps remains an outbound manual-research link only; no scraping, fetching, embedding, or review-content ingestion.

## Verification

- Local `mcd_lead_ops`: 26 tests passed; 50-row dry run completed with no write.
- CRM static/type/build checks passed.
- Both GitHub Actions isolated database lifecycle harnesses passed.
- Isolated Neon rehearsal passed.
- Production schema release verified: research fields, private table, trigger, and migration ledger entry present.

## Production database release

- Applied additive release record: `20260707_003_lead_research_owner_provenance`.
- Retained pre-release Neon branch: `production-pre-lead-research-20260707`.
- Retained isolated test branch: `lead-research-fields-isolated-20260707`.

## Safeguards

- No live intake, approval, export, or `Raw_Leads.csv` import was performed.
- No provider identity, commercial data, secrets, or raw lead records were added to repositories, logs, or workspace documentation.
