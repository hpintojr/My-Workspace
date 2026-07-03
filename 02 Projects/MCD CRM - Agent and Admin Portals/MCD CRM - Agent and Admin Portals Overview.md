---
type: status
date: 2026-07-01
project: MCD CRM - Agent and Admin Portals
---

## Incident history — RESOLVED 2026-07-03

Two separate incidents hit production this window. Both are closed. Full narrative in
`01 Daily Logs/[C] 2026-07-03 MCD CRM Login Hang Incident Resolved.md`.

```txt
Incident 1 (2026-07-02): /admin and /portal 504'd after a same-day feature push. Root cause proven --
  a Next.js dynamic-route slug collision (src/app/admin/leads/[id]/page.tsx competing with the existing
  [leadId]/page.tsx). Fixed by porting the verified-close-won control into [leadId] and deleting [id].
  Production has since moved forward through PRs #24-27 and no longer contains the collision.
Incident 2 (2026-07-03): separate issue, sign-in stuck at "Signing in...", inconsistent /admin//portal
  access reported across builds and previews. Root cause proven by diff, not guesswork: PR #27
  (merged, live) added a recoverCompletedSession() poll to recover from a known Auth.js v5 beta gotcha
  where the signIn(redirect:false) promise can stall even after the session cookie is already written.
  PR #28 (open, unmerged) reverts that exact fix. Hamilton tested PR #28's preview directly with real
  credentials and it hung, confirming the diff-based diagnosis. PR #29 (open, unmerged) is an independent
  rewrite of the same flow, unstable commit history today (one failed build), solving a problem
  production no longer has.
Current state: production (main @ 3e9dfea) CONFIRMED WORKING END TO END by Hamilton -- signs in, reaches
  both /admin and /portal. PR #28 closed 2026-07-03 as a proven regression. PR #29 recommended for closure,
  pending Hamilton's call.
```

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

## Lead-import surface — reconciled 2026-07-03

The 2026-07-02 handoff below (kept for history) assumed Claude's local `/api/admin/leads/route.ts`
rewrite would be applied as-is. Instead, PR #24 ("import verifier") and PR #25 ("response contract"),
already merged to main, built a larger and different lead-import surface:

```txt
src/app/api/admin/leads/import/preview/route.ts -- session-admin-gated (requireFeature("leads") +
  requireRole(ADMIN_ROLES)), calls previewLeadImport. Correct as built.
src/app/api/admin/leads/import/route.ts -- the live COMMIT endpoint, POST { rows: [...] } -> commitLeadImport().
  OPEN FINDING: no auth check at all on this route today -- no session role check, no feature flag,
  no signature verification. Live on production with zero access control.
src/lib/lead-import-auth.ts -- HMAC sign/verify primitives already built (verifyLeadImportRequest,
  signLeadImportRequest), commented "for a future paid-data import route," but not wired into the
  commit route above.
```

Next concrete step, needs Hamilton's go-ahead before shipping (provisions a new shared secret, which is
persistent production config): wire `verifyLeadImportRequest` into the commit route so it requires a
valid HMAC signature, then point mcd_lead_ops's export step at it with `signLeadImportRequest` using a
new Vercel env var for the shared secret. This closes the open endpoint and unblocks Phase D together.

### Original 2026-07-02 handoff (superseded, kept for history)

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

## Next work (updated 2026-07-03)

```txt
0. Wire HMAC verification (src/lib/lead-import-auth.ts) into src/app/api/admin/leads/import/route.ts,
   then point mcd_lead_ops's export step at it with a shared secret (new Vercel env var) -- pending
   Hamilton's go-ahead on the secret since it's new persistent production config. Closes the open
   commit-endpoint finding above and completes Phase D in one pass.
1. Point mcd_lead_ops/config/sources/*.yaml at a real recurring source so the daily job has data.
2. Improve Admin operational visibility.
3. Prevent duplicate document dispatch after approval.
4. Add optional company/entity metadata.
5. Complete legal review and later gated operating stages.
```
