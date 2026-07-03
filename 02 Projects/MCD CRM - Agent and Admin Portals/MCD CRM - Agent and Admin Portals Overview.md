---
type: status
date: 2026-07-01
project: MCD CRM - Agent and Admin Portals
---

## Pending handoff — 2026-07-03, execution owner: ChatGPT (direct repo/Neon/Vercel access)

Claude built the full lead-import batch API (Phase D: schema, production Neon migration, service
layer, 5 route handlers under `src/app/api/lead-imports/`) and opened it as PR #30 in
`hpintojr/crm.mcd` (Vercel preview build verified READY). This supersedes the "decide whether to
build the full batch API" open question from the 2026-07-03 reconciliation below — it's built.

**PR #30 is blocked from merging.** Its preview deployment hangs the entire page right after the
MFA code field appears during login (confirmed by Hamilton live-testing it with real credentials,
and independently by Claude's browser automation timing out against the same tab). Live production
login (both /admin and /portal, custom domain) works fine with the same credentials immediately
after, so this is specific to the preview/branch. **Checked and ruled out:** the branch is not
missing PR #27's Auth.js stall-recovery fix — `feature/lead-import-batch-api`'s merge-base with
`main` is exactly PR #27's own merge commit (3e9dfea0), and `src/app/(auth)/login/complete/page.tsx`
is byte-identical on both branches. So the hang is not explained by a stale branch; root cause is
still open. Full investigation steps, hard rules, and required logging format:

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT Handoff — Phase D Secrets, PR 30, and Backlog.md
```

Do not merge PR #30 until this is root-caused and fixed, regardless of how ready secrets/backlog
otherwise look. `LEAD_IMPORT_KEY_ID`/`LEAD_IMPORT_HMAC_SECRET` are already provisioned on Vercel
for both preview and production, so the hang is the only thing standing between here and the first
live export test. Claude resumes once PR #30 is merged and one live export has been run and logged.

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

Note (2026-07-03, Phase D handoff): this same "signIn stuck at MFA / whole page hangs" symptom has
now reappeared on PR #30's preview, a separate branch built after this incident closed. It is not
yet known whether it's the same underlying Auth.js class of bug resurfacing in a new form, or
something unrelated to auth entirely (e.g. Phase D's Prisma schema/migration changes, or an
artifact of the automated browser test session used to reproduce it). Treat it as a new
investigation, not an assumed repeat of Incident 2 -- see the pending handoff above.

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

Phase A is built and tested at `D:\GitHub\mcd_lead_ops` (not part of the crm.mcd Next.js app — standalone local Python CLI). It stages permitted lead sources (CSV/XLSX, referrals, web forms, owned-account exports, approved-provider APIs) into local SQLite for operator preview and approval. As of 2026-07-03, export runs a real signed HTTP call against crm.mcd's lead-import batch API (Phase D) instead of always refusing — but it has never been exercised against a live server yet, since PR #30 (which ships that API) is blocked from merging. Google Maps/LinkedIn/directory scraping and browser-automation adapters were requested and declined as ToS and policy violations — the disabled adapters are stubbed in code (raise on construction) so they can't be quietly wired in later. A daily scheduled task (`mcd-lead-ops-daily`, 7:00 AM) runs intake + preview + website-review only; it can never approve or export on its own. Full detail in `01 Daily Logs/[C] 2026-07-02 mcd_lead_ops Phase A Build.md`.

```txt
Phase A (this build): CLI, SQLite staging, permitted adapters, policy engine, preview/reports, tests — done.
Phase B: website research enrichment — blocked on nothing, not yet started.
Phase C: MiniCRM lead-import API + migration — done, folded into Phase D below.
Phase D: live signed export — code-complete (batch API + real MiniCrmClient HTTP calls), open as
  PR #30, BLOCKED from merging on a login/MFA hang in preview, never yet exercised against a live
  server. See the 2026-07-03 pending handoff above.
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
  commitLeadImport() itself calls requireFeature("leads") and requireRole(ADMIN_ROLES) internally, so
  this route IS gated by session-cookie admin auth, just enforced one layer down in the shared
  function rather than in route.ts. Real gap: session-cookie auth is unusable by a local CLI like
  mcd_lead_ops, which has no browser session.
src/lib/lead-import-auth.ts -- HMAC sign/verify primitives already built (verifyLeadImportRequest,
  signLeadImportRequest), commented "for a future paid-data import route."
```

**Resolved 2026-07-03 (Phase D):** rather than retrofitting HMAC onto the existing session-gated
commit route above, Claude built a separate, purpose-built batch-lifecycle API matching the
pre-existing contract in `src/lib/lead-import-contract.ts` (`leadImportApiPaths`): `POST
/api/lead-imports` (create batch), `POST .../rows` (upload), `POST .../preview`, `POST .../submit`,
`GET .../{batchId}` (status) — each HMAC-guarded via `lead-import-route-guard.ts`, matching
`MCD_LEAD_IMPORT_KEY_ID`/`MCD_LEAD_IMPORT_HMAC_SECRET` on the mcd_lead_ops side and
`LEAD_IMPORT_KEY_ID`/`LEAD_IMPORT_HMAC_SECRET` on Vercel. This is machine-to-machine by design, so
it coexists with (does not replace) the session-gated `/api/admin/leads/import` route used by the
Admin UI. Open as PR #30 — see the pending handoff at the top of this file for its current blocker.

### Original 2026-07-02 handoff (superseded, kept for history)

The steps below were executed and the underlying work has since been superseded by Phase D. Left
here for history only — do not re-run these steps.

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

## Next work (Claude resumes here once the 2026-07-03 handoff is closed)

See `[C] ChatGPT Handoff — Phase D Secrets, PR 30, and Backlog.md` for the live, authoritative
task list (Tier A/B/C). Summary: PR #30's login/MFA hang gets root-caused and fixed, PR #30 merges,
one live export test runs and gets logged, then backlog items #38-41 -- none of which are scoped
with Hamilton yet -- plus legal review and later gated operating stages.

```txt
1. Point mcd_lead_ops/config/sources/*.yaml at a real recurring source so the daily job has data.
2. Improve Admin operational visibility for lead-import batches.
3. Prevent duplicate document dispatch after approval.
4. Add optional company/entity metadata.
5. Complete legal review and later gated operating stages.
```
