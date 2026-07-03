---
type: status
date: 2026-07-01
project: MCD CRM - Agent and Admin Portals
---

## ACTIVE OUTAGE — production is on an emergency rollback, 2026-07-02

`/admin` and `/portal` both started returning Vercel 504 `FUNCTION_INVOCATION_TIMEOUT` after a long stretch of same-day feature work (lead operations, warm reply triage, GHL opportunity/reply relays, agent onboarding docs, closed-won safeguards, paid CSV import, plus a login-redirect fix and debug tracing). Auth itself was confirmed working — credentials/MFA succeeded, session was created — the timeout happened rendering the protected route after that, in code shared by both `requireUser()`/`requireRole()`.

```txt
Status: Vercel was instant-rolled-back to commit a80b815 ("feat(servicing): work and resolve
  cases from queue"). Confirmed /admin and /portal both load again on that commit.
Not fixed: root cause not yet identified. This is a temporary floor, not a fix.
Not live right now: every commit after a80b815 -- all of today's lead-ops/GHL-relay/onboarding-doc/
  closed-won/paid-CSV-import work, the login full-page-redirect fix (3769df7), and the
  debug-trace commits. None of it is in production until the regression is found and cleared.
Ruled out: Neon connection pooling. DATABASE_URL already uses the -pooler endpoint; missing
  pgbouncer=true/connection_limit=1 params were flagged and can still be worth adding, but
  since env vars aren't tied to a specific deployment, if pooling were the cause the rollback
  itself wouldn't have restored access. It did, so the bug is a real code regression sitting
  somewhere in the ~40 commits between a80b815 and the failing deployment (c58c779).
Owner: ChatGPT (direct repo/Neon/Vercel access) is binary-searching preview deployments between
  a80b815 and c58c779 to isolate the exact breaking commit. Do not reapply any of the reverted
  work, and do not touch production, until that commit is identified.
Known non-issues (do not re-investigate): root middleware.ts is present/correct, not a
  regression -- an earlier check looked at the wrong path (src/middleware.ts, which never
  existed). src/app/admin/layout.tsx and /post-login never actually landed in the repo, despite
  being referenced in earlier debugging notes -- don't rely on either existing. Neon connection
  pooling was checked and ruled out (pooler endpoint + params already correct).
```

### ROOT CAUSE FOUND — 2026-07-03

Confirmed via isolated preview build of `e59df2c`: Next.js dynamic-route slug collision, not auth, not cache, not connection pooling.

```txt
Baseline (a80b815) has: src/app/admin/leads/[leadId]/page.tsx
e59df2c added a competing:  src/app/admin/leads/[id]/page.tsx
Next.js error: "You cannot use different slug names for the same dynamic path ('id' !== 'leadId')."
```

This explains everything that didn't fit before: neutralizing e59df2c's page content in 1e484570 didn't
fix it because the collision lives in the folder name ([id] vs [leadId]), not the file's logic -- gutting
the file left the conflicting directory in place. Both /admin and /portal failed together because this
breaks route resolution broadly, not one page's query. Present in every commit since e59df2c through
current main, so fixing it should restore the entire day's work, not just a minimal subset.

Fix CONFIRMED WORKING — 2026-07-03: branch recovery/e59-route-fix (base e59df2c, verified-close-won
merged into [leadId] at 6dd00c2, [id] route deleted) tested clean on preview: /login, /admin, /portal
all pass. This is the proven fix.

Remaining steps before this outage is fully closed:
```txt
1. Apply the same fix to main (merge verified-close-won into main's [leadId]/page.tsx, delete
   main's [id]/page.tsx -- main still has the live collision today, just not deployed since
   production is pinned to the a80b815 rollback). Prefer a PR into main over a direct push.
2. Test that PR's preview: /login, /admin, /portal, plus spot-check Warm Reply Triage, GHL
   relay setup pages, and agent onboarding docs -- nothing post-e59df2c has been live-tested
   since before the outage.
3. Merge to main, deploy to production, replacing the a80b815 rollback pin.
4. Final check on real production (not preview): /login, /admin, /portal, and the appointment
   lifecycle states (Booked/Confirmed/Cancelled/No-show/Completed) still processing.
```

Claude resumes the lead-import work (see "Next work" below) only after step 4 is confirmed by Hamilton.

Full incident writeup: `Mercury_Call_Desk_Handoff_After_Appointment_Relay.md` (uploaded 2026-07-02, ChatGPT's handoff after the outage began).

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
