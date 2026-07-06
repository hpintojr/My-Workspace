# [C] MCD CRM â€” Production Scope & 13-Layer Review

*Authoritative scope for `hpintojr/crm.mcd`. Supersedes the 2026-07-03/04 "Independent 13-Layer Production Rescope" (kept for history). Written 2026-07-06 by Claude after fixing the production hang. Every status below is backed by direct evidence gathered this session (builds, Neon queries, Vercel config, live requests, commit diffs) â€” not inferred.*

## 0. What this product is

Mercury Call Desk MiniCRM: secure Agent portal + Admin portal for an Independent Sales Partner program. GoHighLevel (GHL) is a one-way private backend. MiniCRM is the system of record. Stack: Next.js 15.5 (App Router) on Vercel, Node 24, Prisma 6.19, Neon Postgres 17, NextAuth v5 beta (credentials + TOTP MFA).

## 1. Corrected incident record â€” the "3-day login hang"

**Symptom:** admin and portal pages hung forever (dead page, disabled cursor); login appeared to freeze right after the MFA field. Production sometimes "worked," previews never did.

**Two real causes, both now fixed â€” neither was auth:**

1. **Route slug collision (the page hang).** `src/app/admin/servicing/` had two sibling dynamic folders with different param names: `[clientAccountId]` (original) and `[id]` (added 2026-07-02, commit a68b0bab). Next.js App Router forbids this; it poisons route resolution so every server-rendered page hangs to the 300s function timeout, while `/login` and `/api/*` keep responding. This is the SAME defect class as the 2026-07-02 `admin/leads/[id]` vs `[leadId]` collision (Incident 1) â€” a second copy was left in `servicing/` and never removed. **Fixed:** PR #31, squash-merged to main as `f338cc4` on 2026-07-06; `[id]` deleted, its unique payment-clearance action ported into `[clientAccountId]`. Production redeploy verified READY; `/admin`, `/portal`, `/admin/servicing` now respond in ~200-1000ms instead of hanging.

2. **Vercel Deployment Protection / SSO wall (the preview "hang").** Vercel Authentication ("Require Log In") was ON, so every `*.vercel.app` URL â€” including previews AND the production build's vercel.app URL â€” was intercepted by Vercel's SSO layer, which strangled the post-login `/login/complete` handoff. The custom domain `crm.mercurycalldesk.com` is exempt, which is why only it "worked." **Fixed:** Hamilton turned "Require Log In" OFF (free setting; the $150 "Deployment Protection Exceptions" add-on is unrelated and was NOT needed).

**How to recognize a recurrence:** if pages hang but `/login` and `/api/auth/session` respond, suspect a route collision first â€” run the Layer 6 check below. If only `*.vercel.app` URLs misbehave while the custom domain is fine, suspect Vercel Authentication.

**Ruled out (do not re-investigate):** it is not an MFA/Auth.js bug, not a missing PR #27 fix, not PR #30, not the DB, not the `clientAccountId`-vs-`id` route *theory* from the old rescope (that pairing is fine; the actual defect was two folders under `servicing/`, resolved by removing one).

## The 13 layers â€” current status

Legend: âœ… good Â· âš ï¸ works but needs attention Â· âŒ gap.

### Layer 1 â€” Version control & Git hygiene âœ…/âš ï¸
Single repo, main is production branch, Vercel auto-deploys on push. âš ï¸ Many tiny direct-to-main commits during incidents made history hard to bisect. Going forward: feature branches + PRs (as done for #31), squash-merge.

### Layer 2 â€” Environments (dev / preview / production) âš ï¸
Preview and production both auto-build. âš ï¸ Vercel Authentication was masking preview behaviour (now off). A separate `rebuild/v1-foundation` branch has its own branch-scoped `DATABASE_URL`/`DIRECT_URL` overrides â€” leave those alone unless working that branch.

### Layer 3 â€” Secrets management âš ï¸
All secrets are Vercel "sensitive" env vars. âš ï¸ Preview and production SHARE the same `DATABASE_URL`, `DIRECT_URL`, `LEAD_IMPORT_KEY_ID`, `LEAD_IMPORT_HMAC_SECRET` (targets = preview+production). That means a preview deploy talks to the production database and uses production import secrets. Cleanup: separate preview from production secrets before real lead volume. `AUTH_URL` is correctly production-only.

### Layer 4 â€” Database (schema / migrations / backups) âš ï¸
Neon project `mcd-crm-production` (id `jolly-lab-80341970`), Postgres 17, us-east-2. 21 tables. Healthy today: 10/112 connections in use, instant query response. âš ï¸ Compute pinned at 0.25 CU min AND max â€” no autoscaling headroom; a traffic spike has nowhere to go. Migrations use the safe Neon branch-test/prepare/complete flow. Confirm a backup/retention policy before go-live (history retention currently 6h).

### Layer 5 â€” Auth & access control âœ…/âš ï¸
NextAuth v5 beta (`next-auth@beta` = 5.0.0-beta.31), JWT session strategy, credentials + optional TOTP MFA, account lockout after 5 failed logins for 15 min, audit-logged. `authorized()` callback gates `/admin` (ADMIN_ROLES) and `/portal` (AGENT + admin). Code is sound â€” verified line by line. âš ï¸ Running on a beta release; pin the exact version and watch for breaking changes.

### Layer 6 â€” Routing & rendering âœ… (was the outage)
Both known slug collisions are now removed (`admin/leads` fixed 07-03, `admin/servicing` fixed 07-06). **Standing check before any merge:** no two sibling folders under `src/app/**` may be dynamic with different param names. Quick audit: list every `src/app/**/[*]` folder and confirm no parent has two differently-named `[...]` children. Consider adding this as a CI check (Layer 9).

### Layer 7 â€” Data validation & input safety âœ…
Lead import has a real contract: Zod schemas, taxonomy/normalization, cross-batch dedupe by `dedupeKey`, HMAC-signed machine-to-machine route (Phase D). Scraping imports are blocked at the schema level.

### Layer 8 â€” Error handling, logging & observability âš ï¸
Vercel runtime logs exist but were empty/lagging during the hang (a hung page emits nothing). âš ï¸ No structured error tracking (e.g. Sentry) and no alerting. Add lightweight error reporting so the next incident surfaces itself instead of needing a manual bisect.

### Layer 9 â€” CI/CD & automated checks âŒ
**Zero GitHub Actions workflows.** The only gate is a set of `check-*.ts` scripts run inside the Vercel build command. A typecheck/lint/route-collision check on PRs would have caught both outages before merge. Highest-leverage cleanup item.

### Layer 10 â€” Performance & scaling âš ï¸
Fine at current volume. âš ï¸ 0.25 CU fixed compute (Layer 4) and single-region are the ceilings. Revisit before onboarding many partners.

### Layer 11 â€” Security posture âš ï¸
Middleware sets good headers (X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP). âš ï¸ RLS is OFF on all 21 Neon tables and the only login-capable role (`neondb_owner`) bypasses RLS by default. App-level authz is the only guard. Decide RLS + a least-privilege runtime role before scaling access. Preview/prod secret sharing (Layer 3) is also a security item.

### Layer 12 â€” Testing âš ï¸
Contract/guard check scripts exist and run at build. âŒ No end-to-end test for the login->admin/portal path â€” the exact flow that broke. Add one smoke test that logs in and reaches both portals.

### Layer 13 â€” Documentation & handoff âœ… (as of today)
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
   add error tracking (L8) and a login smoke test (L12); give Neon compute autoscaling heal›ÛÛH
ÓL
K‚Kˆ˜XÚÛÙÈÌÎMH
™Xİ\œš[™ÈÛİ\˜ÙHÛÛ™šYËYZ[ˆš\ÚXš[]K\XØ]KY\Ü]Ú™]™[[Û‹ˆÛÛ\[KÙ[]HY]Y]JH8 %ØÛÜHXXÚÚ][Z[Ûˆ™Y›Ü™HZ[[™Ë‚‹ˆØ[Y›Ü›šXH]Ü›™^H™]šY]ÈÙˆH\™\ˆYÜ™Y[Y[È
PÑ›Ú™Xİ
Hİ^\ÈH][˜ÚØ]K‚˜‚ˆÈÈÜ[ˆ]Y\İ[ÛœÈ›Üˆ[Z[Û‚˜‹H™]šY]È[š\›Û›Y[ˆÚ]™H]]ÈİÛˆ™[Ûˆœ˜[˜Ú
È]ÈİÛˆÙXÜ™]ËÜˆÙY\]Ú[Y]›ÙXİ[Û‚ˆ
İ\œ™[
HÚ]H[™\œİ[™[™È]™]šY]È\İÈİXÚ]™H]OÂ‹H“Îˆ[˜X›H]›İÈ
[Ü™HÛÜšËØY™\ˆ]ØØ[JHÜˆY™\ˆ[[\İ™Y›Ü™Hœ›ØY\™\ˆXØÙ\ÜÏÂ‹H[İØÛÜNˆİÈX[H\™\œÈÈİÈ]XÚXY›Û[YH›ÜˆHš\œİ]™H[\Ü\İÂ˜