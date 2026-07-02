---
type: status
date: 2026-07-01
project: MCD CRM - Agent and Admin Portals
---

## Goal

Build Mercury Call Desk's secure Mini CRM with an Agent portal, an Admin portal, and GoHighLevel operating as a private backend.

## Current status

Phase 1 partner onboarding has passed a controlled production test.

```txt
Signup → owner approval → four e-sign documents → completion relays
→ onboarding gates complete → account provisioned → partner portal access
```

The detailed record is in:

```txt
01 Daily Logs/[C] 2026-07-01 MCD CRM Phase 1 End-to-End Onboarding Validated.md
```

## Related repo — mcd_lead_ops (local, separate from crm.mcd)

Phase A is built and tested at `D:\GitHub\mcd_lead_ops` (not part of the crm.mcd Next.js app — standalone local Python CLI). It stages permitted lead sources (CSV/XLSX, referrals, web forms, owned-account exports, approved-provider APIs) into local SQLite for operator preview and approval; export to MiniCRM always refuses today because MiniCRM's import API doesn't exist yet. Google Maps/LinkedIn/directory scraping and browser-automation adapters were requested and declined as ToS and policy violations — the disabled adapters are stubbed in code (raise on construction) so they can't be quietly wired in later. A daily scheduled task (`mcd-lead-ops-daily`, 7:00 AM) runs intake + preview + website-review only; it can never approve or export. Full detail in `01 Daily Logs/[C] 2026-07-02 mcd_lead_ops Phase A Build.md`.

```txt
Phase A (this build): CLI, SQLite staging, permitted adapters, policy engine, preview/reports, tests — done.
Phase B: website research enrichment — blocked on nothing, not yet started.
Phase C: MiniCRM lead-import API + migration — in progress (see below).
Phase D: live signed export — code (HMAC signing) ready, no endpoint to call yet.
Phase E: campaign sending — gated behind full deliverability/suppression checklist.
```

## Lead-import API contract — 2026-07-02

`crm.mcd` already had more lead-pipeline code in place than these docs reflected: a `Lead` model + migrations, server-side taxonomy/normalization/dedupe (`src/lib/lead-taxonomy.ts`, `lead-normalization.ts`), an admin review queue (`/admin/leads`, approve/suppress/disqualify), and an agent portal leads page — all gated behind `LEADS_ENABLED`. What was missing: the live `/api/admin/leads` route still used an older, looser schema with no `originalSource`/`intakeMethod`, no Google-Maps-scrape block, and no cross-batch dedupe, while a newer `previewLeadImport` service existed but wasn't wired to any route.

Fixed:

```txt
prisma/schema.prisma — added LeadOriginalSource, LeadIntakeMethod, LeadReferrerType, WebsiteStatus,
  WebsiteOpportunityStatus, WebsiteOfferTrack enums; added matching Lead columns (source/campaign/UTM/
  referrer lineage, website-opportunity fields) plus a unique dedupeKey column. Purely additive — no
  existing column touched, all new columns nullable or defaulted.
prisma/migrations/20260702130000_add_lead_import_taxonomy/ — matching SQL, written but not applied by
  Claude (same controlled-Neon-migration convention as the existing lead/client migrations).
src/app/api/admin/leads/route.ts — rewritten as a two-phase preview -> commit endpoint on top of the
  existing previewLeadImport + lead-taxonomy policy engine (blocks Google Maps scrape-import at the
  schema level, same as mcd_lead_ops does locally). commit:true checks suppression, checks the new
  dedupeKey against existing leads (not just in-batch), then writes. normalizedPhone still uses the
  existing +1E.164 convention (workflow.ts) so suppression/DNC matching isn't broken by the newer
  normalizer's different phone format — dedupeKey is a separate, import-only identity.
```

Known follow-up, not done: `Lead.businessPhone` is still NOT NULL, but the new taxonomy allows email-only rows. The route currently skips email-only rows with an explicit reason rather than writing an empty phone. Making `businessPhone` nullable would unblock that but touches a field read in ~10 files — deferred rather than done opportunistically.

## Next work

- Improve Admin operational visibility.
- Prevent duplicate document dispatch after approval.
- Add optional company/entity metadata.
- Complete legal review and later gated operating stages.
- Point `mcd_lead_ops/config/sources/*.yaml` at a real recurring source so the daily job has data to process.
- Hamilton: run `npm install && npm run typecheck` and `prisma migrate deploy` (or `prisma migrate dev`) locally before this ships — Claude has no npm registry or Neon access in this sandbox to verify either.
- Decide on `Lead.businessPhone` nullability for email-only leads.
- Wire mcd_lead_ops's export step to this endpoint once Hamilton is ready to test it end-to-end.
