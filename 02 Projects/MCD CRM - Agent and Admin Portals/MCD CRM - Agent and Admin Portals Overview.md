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

## Pending handoff — 2026-07-02, execution owner: ChatGPT (has direct repo/DB/Vercel access)

The lead-import taxonomy work above is code-complete on disk but not yet applied or shipped. Hamilton is having ChatGPT execute the following, since ChatGPT has direct repo, Neon, and Vercel access and Claude does not:

```txt
1. npm install && npm run typecheck in crm.mcd -- confirm the new route/schema compile clean.
2. Apply prisma/migrations/20260702130000_add_lead_import_taxonomy/ to Neon
   (prisma migrate deploy against the real DATABASE_URL/DIRECT_URL). Additive-only,
   no drops/renames, but take a Neon branch/snapshot first since it's production.
3. Commit and push the changed files to GitHub:
   - prisma/schema.prisma
   - prisma/migrations/20260702130000_add_lead_import_taxonomy/migration.sql
   - src/app/api/admin/leads/route.ts
4. Watch Vercel for build/runtime errors on deploy.
5. Decide Lead.businessPhone nullability for email-only leads (flagged, not resolved --
   see note above; touches ~10 files if changed).
```

Until step 2/3 are done, `/api/admin/leads` on production is still running the old pre-taxonomy code (LEADS_ENABLED also still gates all of this from being user-visible either way).

## Next work (Claude resumes here once the above is applied)

- Wire mcd_lead_ops's export step to the now-live `/api/admin/leads` endpoint (Phase D) -- needs a decision on auth: session-cookie admin auth won't work for a local CLI, so this likely needs a machine-to-machine HMAC-secret path (same pattern as the GHL webhook) added to the route, or a dedicated `/api/leads/import` route.
- Point `mcd_lead_ops/config/sources/*.yaml` at a real recurring source so the daily job has data to process.
- Improve Admin operational visibility.
- Prevent duplicate document dispatch after approval.
- Add optional company/entity metadata.
- Complete legal review and later gated operating stages.
