# [C] MCD CRM — Production Scope & 13-Layer Review

*Authoritative scope for `hpintojr/crm.mcd`. Supersedes the 2026-07-03/04 "Independent 13-Layer Production Rescope" (kept for history). Written 2026-07-06 by Claude after fixing the production hang. Every status below is backed by direct evidence gathered this session (builds, Neon queries, Vercel config, live requests, commit diffs) — not inferred.*

## 0. What this product is

Mercury Call Desk MiniCRM: secure Agent portal + Admin portal for an Independent Sales Partner program. GoHighLevel (GHL) is a one-way private backend. MiniCRM is the system of record. Stack: Next.js 15.5 (App Router) on Vercel, Node 24, Prisma 6.19, Neon Postgres 17, NextAuth v5 beta (credentials + TOTP MFA).

## 1. Corrected incident record — the "3-day login hang"

**Symptom:** admin and portal pages hung forever (dead page, disabled cursor); login appeared to freeze right after the MFA field. Production sometimes "worked," previews never did.

**Two real causes, both now fixed — neither was auth:**

1. **Route slug collision (the page hang).** `src/app/admin/servicing/` had two sibling dynamic folders with different param names: `[clientAccountId]` (original) and `[id]` (added 2026-07-02, commit a68b0bab). Next.js App Router forbids this; it poisons route resolution so every server-rendered page hangs to the 300s function timeout, while `/login` and `/api/*` keep responding. This is the SAME defect class as the 2026-07-02 `admin/leads/[id]` vs `[leadId]` collision (Incident 1) — a second copy was left in `servicing/` and never removed. **Fixed:** PR #31, squash-merged to main as `f338cc4` on 2026-07-06; `[id]` deleted, its unique payment-clearance action ported into `[clientAccountId]`. Production redeploy verified READY; `/admin`, `/portal`, `/admin/servicing` now respond in ~200-1000ms instead of hanging.

2. **Vercel Deployment Protection / SSO wall (the preview "hang").** Vercel Authentication ("Require Log In") was ON, so every `*.vercel.app` URL — including previews AND the production build's vercel.app URL — was intercepted by Vercel's SSO layer, which strangled the post-login `/login/complete` handoff. The custom domain `crm.mercurycalldesk.com` is exempt, which is why only it "worked." **Fixed:** Hamilton turned "Require Log In" OFF (free setting; the $150 "Deployment Protection Exceptions" add-on is unrelated and was NOT needed).

**How to recognize a recurrence:** if pages hang but `/login` and `/api/auth/session` respond, suspect a route collision first — run the Layer 6 check below. If only `*.vercel.app` URLs misbehave while the custom domain is fine, suspect Vercel Authentication.

**Ruled out (do not re-investigate):** it is not an MFA/Auth.js bug, not a missing PR #27 fix, not PR #30, not the DB, not the `clientAccountId`-vs-`id` route *theory* from the old rescope (that pairing is fine; the actual defect was two folders under `servicing/`, resolved by removing one).

## The 13 layers — current status

Legend: ✅ good · ⚠️ works but needs attention · ❌ gap.

### Layer 1 — Version control & Git hygiene ✅/⚠️
Single repo, main is production branch, Vercel auto-deploys on push. ⚠️ Many tiny direct-to-main commits during incidents made history hard to bisect. Going forward: feature branches + PRs (as done for #31), squash-merge.

### Layer 2 — Environments (dev / preview / production) ⚠️
Preview and production both auto-build. ⚠️ Vercel Authentication was masking preview behaviour (now off). A separate `rebuild/v1-foundation` branch has its own branch-scoped `DATABASE_URL`/`DIRECT_URL` overrides — leave those alone unless working that branch.

### Layer 3 — Secrets management ⚠️
All secrets are Vercel "sensitive" env vars. ⚠️ Preview and production SHARE the same `DATABASE_URL`, `DIRECT_URL`, `LEAD_IMPORT_KEY_ID`, `LEAD_IMPORT_HMAC_SECRET` (targets = preview+production). That means a preview deploy talks to the production database and uses production import secrets. Cleanup: separate preview from production secrets before real lead volume. `AUTH_URL` is correctly production-only.

### Layer 4 — Database (schema / migrations / backups) ⚠️
Neon project `mcd-crm-production` (id `jolly-lab-80341970`), Postgres 17, us-east-2. 21 tables. Healthy today: 10/112 connections in use, instant query response. ⚠️ Compute pinned at 0.25 CU min AND max — no autoscaling headroom; a traffic spike has nowhere to go. Migrations use the safe Neon branch-test/prepare/complete flow. Confirm a backup/retention policy before go-live (history retention currently 6h).

### Layer 5 — Auth & access control ✅/⚠️
NextAuth v5 beta (`next-auth@beta` = 5.0.0-beta.31), JWT session strategy, credentials + optional TOTP MFA, account lockout after 5 failed logins for 15 min, audit-logged. `authorized()` callback gates `/admin` (ADMIN_ROLES) and `/portal` (AGENT + admin). Code is sound — verified line by line. ⚠️ Running on a beta release; pin the exact version and watch for breaking changes.

### Layer 6 — Routing & rendering ✅ (was the outage)
Both known slug collisions are now removed (`admin/leads` fixed 07-03, `admin/servicing` fixed 07-06). **Standing check before any merge:** no two sibling folders under `src/app/**` may be dynamic with different param names. Quick audit: list every `src/app/**/[*]` folder and confirm no parent has two differently-named `[...]` children. Consider adding this as a CI check (Layer 9).

### Layer 7 — Data validation & input safety ✅
Lead import has a real contract: Zod schemas, taxonomy/normalization, cross-batch dedupe by `dedupeKey`, HMAC-signed machine-to-machine route (Phase D). Scraping imports are blocked at the schema level.

### Layer 8 — Error handling, logging & observability ⚠️
Vercel runtime logs exist but were empty/lagging during the hang (a hung page emits nothing). ⚠️ No structured error tracking (e.g. Sentry) and no alerting. Add lightweight error reporting so the next incident surfaces itself instead of needing a manual bisect.

### Layer 9 — CI/CD & automated checks ❌
**Zero GitHub Actions workflows.** The only gate is a set of `check-*.ts` scripts run inside the Vercel build command. A typecheck/lint/route-collision check on PRs would have caught both outages before merge. Highest-leverage cleanup item.

### Layer 10 — Performance & scaling ⚠️
Fine at current volume. ⚠️ 0.25 CU fixed compute (Layer 4) and single-region are the ceilings. Revisit before onboarding many partners.

### Layer 11 — Security posture ⚠️
Middleware sets good headers (X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP). ⚠️ RLS is OFF on all 21 Neon tables and the only login-capable role (`neondb_owner`) bypasses RLS by default. App-level authz is the only guard. Decide RLS + a least-privilege runtime role before scaling access. Preview/prod secret sharing (Layer 3) is also a security item.

### Layer 12 — Testing ⚠️
Contract/guard check scripts exist and run at build. ❌ No end-to-end test for the login->admin/portal path — the exact flow that broke. Add one smoke test that logs in and reaches both portals.

### Layer 13 — Documentation & handoff ✅ (as of today)
This doc + `[C] AI Operating Protocol` + the daily-log changelog structure are the fix for the handoff chaos. Keep them current per the Operating Protocol.

## Go-forward plan (priority order, set with Hamilton 2026-07-06)

```txt
1. [DONE] Servicing slug collision fixed and merged to production (PR #31 / f338cc4).
2. [NEXT] PR #30 (Phase D lead-import API): rebase onto new main, redeploy preview,
   re-test login on preview (should pass now that SSO wall is off), then merge.
   Hamilton sets production LEAD_IMPORT_KEY_ID / LEAD_IMPORT_HMAC_SECRET (Claude does not touch secrets).
3. Run the first supervised live `mcd-leads export --run <id>`; log the result as evidence.
4. 13-layer cleanup, in impact order: add a CI route-collision + typecheck gate (L9);
   separate preview/production secrets (L3); decide RLS + least-privilege role (L11);
   add error tracking (L8) and a login smoke test (L12); give Neon compute autoscaling headroom (L4/L10).
5. Backlog #38-41 (recurring source config, admin visibility, duplicate-dispatch prevention,
   company/entity metadata) — scope each with Hamilton before building.
6. California attorney review of the partner agreements (MCD project) stays a launch gate.
```

## Open questions for Hamilton
```txt
- Preview environment: give it its own Neon branch + its own secrets, or keep it pointed at production
  (current) with the understanding that preview tests touch live data?
- RLS: enable it now (more work, safer at scale) or defer until just before broad partner access?
- Pilot scope: how many partners / how much lead volume for the first live import test?
```
