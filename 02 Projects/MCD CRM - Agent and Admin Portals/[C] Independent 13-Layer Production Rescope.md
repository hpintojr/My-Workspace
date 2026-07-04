---
type: rescope
date: 2026-07-03
project: MCD CRM - Agent and Admin Portals
author: Claude
status: read-only assessment — no code, Vercel, Neon, env var, deployment, or GitHub changes were made
applies_to: hpintojr/crm.mcd, mcd_lead_ops, Vercel project crm-mcd, Neon project jolly-lab-80341970 (mcd-crm-production)
---

# Mercury Call Desk MiniCRM — Independent 13-Layer Production Rescope

This is a second, independent pass over the same ground ChatGPT's rescope covered, done directly against the live repo, the live Vercel project, and the live Neon database rather than from prior notes. Where I confirm ChatGPT's findings, I say so briefly. Where I found something different — including one thing I think ChatGPT's report gets wrong — I've laid out the actual evidence so you can weigh it yourself. Nothing was changed anywhere; every item below came from read-only calls (GitHub content/diff/tree/commits, Vercel project/deployment/env metadata, Neon SQL `SELECT` queries only).

## Bottom line

PR #30 should still not be merged, but not for the reason currently written down. The specific claim that a `clientAccountId` vs `id` dynamic-route collision is what's crashing PR #30's preview does not hold up against the evidence I could pull directly: that exact collision (in `src/app/admin/servicing/`) already exists on `main` at commit `3e9dfea`, and Vercel's own records show `3e9dfea` is the commit currently aliased to production and reading `READY`. If that collision reliably broke the build, production would be broken too, and it isn't. So either the collision is real but harmless in practice, or it's not actually what caused the 504 Hamilton hit. Either way, the root cause of the login/MFA hang is still open, and PR #30 should stay blocked until someone reproduces the 504 with real-time logs open, not until this one file-tree pattern is "fixed" on the assumption it's the cause.

Everything else in ChatGPT's document about what's built, what's missing, and the shape of a 4–6 week controlled-pilot path is broadly right and I'd sign off on the same target. Where I differ is mostly in specificity: I can now tell you exactly which database role the app runs as, exactly which secret is shared between preview and production when it shouldn't be, and exactly how many CI checks exist (zero, as GitHub Actions — the checks that do run are Vercel's own build-time lint/typecheck jobs).

---

## 1. What I checked directly, and how

- **GitHub (`hpintojr/crm.mcd`)**: PR #30's full metadata and its 9-file diff (`GITHUB_GET_A_PULL_REQUEST`, `GITHUB_LIST_PULL_REQUESTS_FILES`), the full repository tree at `main`'s current tip (`GITHUB_GET_A_TREE`, recursive, 315 entries), the 9 commits that make up PR #30, and direct file reads of `middleware.ts`, and searches across the repo for CI workflow files, rate-limiting code, and Sentry/error-tracking integration.
- **Vercel (`crm-mcd`, project `prj_MV118kD5yiJdDKoi4mAIS9sfpURF`)**: the last 5 production deployments and last 10 deployments overall (with git commit SHAs), build logs and build events for the specific PR #30 preview deployment Hamilton tested (`dpl_3s9yvHJve3WFkaXsHE6Udr2MCQVw`), and the full project environment-variable inventory (names, target scope, git-branch restriction — never decrypted values).
- **Neon (`jolly-lab-80341970` / `mcd-crm-production`)**: project settings (compute size, IP allow-list, HIPAA flag), the full table list, every Postgres role and its privilege flags, and row-level-security status on every table in `public` — all via read-only `SELECT` against Postgres system catalogs.
- **`mcd_lead_ops` (local, `D:\GitHub\mcd_lead_ops`)**: confirmed directly on disk, since this is the one piece ChatGPT's report flagged as unavailable to it.

## 2. The route-collision finding, in detail

PR #30's diff touches exactly 9 files, and none of them are anywhere near `src/app/admin/servicing/`:

```txt
modified  prisma/schema.prisma                                   (+82/-0)
added     src/app/api/lead-imports/[batchId]/preview/route.ts     (+28/-0)
added     src/app/api/lead-imports/[batchId]/route.ts             (+24/-0)
added     src/app/api/lead-imports/[batchId]/rows/route.ts        (+32/-0)
added     src/app/api/lead-imports/[batchId]/submit/route.ts      (+33/-0)
added     src/app/api/lead-imports/route.ts                       (+23/-0)
added     src/lib/lead-import-batch.ts                            (+436/-0)
added     src/lib/lead-import-env.ts                              (+28/-0)
added     src/lib/lead-import-route-guard.ts                      (+63/-0)
```

Separately, scanning the full repo tree at `main`'s tip (commit `3e9dfea`, the same commit PR #30 branches from) for dynamic-route folders turns up:

```txt
src/app/admin/agents/[id]
src/app/admin/leads/[leadId]          <- the earlier [id]/[leadId] incident's fix, confirmed still in place
src/app/admin/servicing/[clientAccountId]
src/app/admin/servicing/[id]          <- same shape of collision as the earlier incident, now here instead
src/app/api/auth/[...nextauth]
src/app/portal/[workspace]
```

`[clientAccountId]` and `[id]` are direct siblings under `src/app/admin/servicing/` — structurally identical to the `[id]` vs `[leadId]` collision under `admin/leads` that broke `/admin` and `/portal` broadly back on 2026-07-02. That part of ChatGPT's finding is real: this pairing exists, and Next.js's own rule ("You cannot use different slug names for the same dynamic path") says you shouldn't be able to have both.

Here's the part that doesn't add up: Vercel's deployment records show production's current, `READY`, aliased deployment (`dpl_GDAGwQ1HRoVXYw4GS1BgwMr41Rhq`) is built from commit `3e9dfea` — the exact same commit that contains this collision. If this pairing reliably broke Next.js's route-manifest build the way the `admin/leads` one did, production could not have built successfully at this commit, and it did. I also pulled the actual build log for the PR #30 preview deployment Hamilton tested and searched it for the error text; it isn't there (the log does show a successful build with a fully generated route table, cut off partway through before reaching the `servicing` routes alphabetically, so I can't rule it out from the log alone — but a build that reached `READY` state is itself evidence the manifest step didn't hard-fail).

My honest read: this collision is a real, latent defect that should be fixed regardless (having two different param names at the same route position is never correct, whether or not it's currently biting anyone), but I can't independently confirm it's *the* cause of the 504 Hamilton saw. It may be a red herring, or it may only manifest under specific conditions (a cold Vercel build-cache state, a specific request path, something about `/login/complete`'s own code rather than the servicing routes at all). Treat "fix the servicing route collision" as a good idea on its own merits, not as a substitute for actually reproducing the 504 with real browser devtools and real-time Vercel logs open, which is the step that will actually tell you what's happening.

## 3. What's actually true about the rest of the stack

### Confirmed as ChatGPT described

- The app is Next.js + Prisma/PostgreSQL on Vercel. Admin, Partner Portal, onboarding, GHL-backed schedule, credentials + TOTP MFA, audit logging, and the lead schema are all real and present in the tree.
- `mcd_lead_ops` is real and matches the Phase D description: `src/mcd_lead_ops/export/minicrm_client.py`, `signing.py`, and `retry_queue.py` all exist on disk, plus a working `cli.py` entrypoint. This wasn't available to ChatGPT's review; I can now vouch for it directly.
- Production's currently-live database (`mcd-crm-production`) already has `Lead`, `LeadImportBatch`, and `LeadImportRow` tables, alongside the full onboarding/servicing/audit schema (21 tables total).
- No GitHub Actions CI exists at all — a repo-wide search for `.github/workflows` returned zero files. The only automated checks are whatever Vercel's own project settings run at build time (it has `lint` and `typecheck` jobs configured on the Vercel side, but nothing gated at the PR level via GitHub's own check API).
- No Sentry or comparable error-tracking integration anywhere in the repo (repo-wide search, zero hits).
- No rate-limiting code anywhere in the repo (repo-wide search, zero hits) — login lockout is the only abuse control that exists, and it's account-specific, not a shared route-level limiter.
- No `Cache-Control` handling anywhere in the repo and no `vercel.json` — there's no explicit caching policy one way or the other; you're relying entirely on Next.js/Vercel's defaults for dynamic App Router routes.

### More specific than ChatGPT's version, or different

- **Database privilege model — worse than "needs a design decision."** I queried `pg_roles` directly. There are exactly four roles in this database: three are Neon-internal (`cloud_admin`, `neon_service`, `neon_superuser`), and the only one available for the application to log in as is `neondb_owner` — which has `rolbypassrls = true`, `rolcreaterole = true`, and `rolcreatedb = true`. There is no separate least-privilege application role. Whatever connection string the app uses, it is almost certainly running as the database owner. Combined with the next point, this isn't a future hardening item — it's the current, live state.
- **Row-level security is off on every single table, not just "not currently enabled."** I checked `relrowsecurity`/`relforcerowsecurity` on all 21 tables in `public` directly; every one reads `false`/`false`. Given the point above, even if RLS were turned on tomorrow, the app's own connection role would bypass it by default (`rolbypassrls = true`) unless the app were also moved to a non-bypassing role at the same time. These two fixes have to happen together to mean anything.
- **The Neon compute has no IP allow-list** (`allowed_ips.ips` is empty, `protected_branches_only: false`). That's normal for a Vercel-hosted app with dynamic egress IPs, but it does mean the connection string itself is the entire perimeter — there's no network-layer backstop if it ever leaks.
- **Neon compute is fixed at 0.25 CU min and max** (`autoscaling_limit_min_cu: 0.25`, `autoscaling_limit_max_cu: 0.25`) — there is currently no autoscaling headroom at all; the database cannot scale up under load even automatically. This is a concrete, checkable fact for the "not validated" load-and-scaling item, not just an assumption.
- **Preview and production currently share the exact same `LEAD_IMPORT_HMAC_SECRET` and `LEAD_IMPORT_KEY_ID` value.** I pulled the full Vercel env-var inventory: both keys are stored once, scoped to `target: ["preview", "production"]`, with no git-branch restriction and no separate preview-only entry. ChatGPT's document states "Production and Preview use separate key IDs and HMAC secrets" as a required rule — as of right now, that rule is not actually being followed; it's a recommendation that still needs to be implemented, not a confirmed fact. (By contrast, `DATABASE_URL`/`DIRECT_URL` do have a real preview-only override, but it's scoped to a specific stale branch, `rebuild/v1-foundation`, not to previews in general — so that separation is narrower than it looks too.)
- **Middleware headers exist and are reasonable, but don't cover API routes.** `middleware.ts` at the repo root sets `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, and `Cross-Origin-Opener-Policy` — all real, confirmed by reading the file. Its matcher explicitly excludes everything under `/api/`, so none of these apply to the lead-import API, the existing admin leads API, or any other API route. There's also no Content-Security-Policy header anywhere. For a lead-import API that will eventually take HMAC-signed traffic from an external process, the missing CSP is low-priority, but it's worth knowing middleware isn't doing anything for API responses today.

---

## 4. The 13-layer assessment (independently re-scored)

| Layer | What I confirmed directly | Rating | What launch actually requires |
|---|---|---:|---|
| 1. Front-end foundations | Next.js/React app; login, Admin, Partner Portal, onboarding, schedule pages all present in the tree and building successfully at `main`'s tip. | Conditional | Reproduce the PR #30 504 with devtools + live logs open before assuming any specific cause; add a repeatable login/MFA/Admin/Portal smoke-test script. |
| 2. APIs and back-end logic | PR #30 adds exactly 5 new route files + a 436-line batch-lifecycle service, matching the design description. Confirmed via direct diff, not just the daily log. | Blocked (pending root cause) | Root-cause the 504 properly (see §2); then run the Phase D route suite against seeded test data. |
| 3. Database and storage | Neon Postgres 17, single region (us-east-2), 21 tables including the three new lead-import tables. R2 keys exist as env vars but no object-storage code path was found. | Conditional | Confirm whether R2 is actually wired to anything yet; if not, drop it from the launch-1 surface area. Define retention/backup policy (see layer 13). |
| 4. Auth and permissions | Credentials + TOTP MFA, Auth.js v5, real security headers via middleware (confirmed by reading the file), audit logging. Middleware explicitly skips `/api/*`. | Blocked (pending root cause) | Same as layer 2 — the login flow itself isn't provably broken by a specific known cause yet, so don't merge on an assumption either way. |
| 5. Hosting and deployment | Vercel; production pinned to commit `3e9dfea`, confirmed `READY`. PR #30 preview also builds and reaches `READY`. | Conditional | A green Vercel build must stop being treated as release approval — add a mandatory functional smoke test before any merge, independent of build status. |
| 6. Cloud and compute | Vercel serverless + Neon. **Neon compute is fixed at 0.25 CU min/max — confirmed directly, not inferred** — there is no autoscaling headroom today. | Partial, tighter than described | Decide a real compute floor/ceiling before any pilot with real usage; 0.25 CU fixed is a laptop-tier database for a product about to take live traffic. |
| 7. CI/CD and version control | **Zero GitHub Actions workflows exist** (confirmed by direct search, not "no confirmation was found"). All checks are Vercel's own build-time lint/typecheck jobs, not gated PR checks. | Partial, weaker than described | Add real CI (unit + integration + a required PR check) before Launch 1, not just rely on Vercel's build succeeding. |
| 8. Security and role-level security | **RLS is off on all 21 tables** and **the only login-capable app role bypasses RLS by design** — both confirmed directly via `pg_roles`/`pg_class`, not inferred. This is today's live state, not a future risk. | Needs immediate action, not just a design decision | Create a least-privilege runtime role with `rolbypassrls = false` before considering RLS meaningful; decide RLS vs. server-only-enforcement as defense-in-depth after that. |
| 9. Rate limiting | Confirmed: no rate-limiting code exists anywhere in the repo. Login lockout is account-specific, not a shared limiter. | Missing | Add limits on login, MFA, activation, and every lead-import route before any external client gets a live HMAC credential. |
| 10. Caching and CDN | Vercel default CDN for static assets. No `Cache-Control` code and no `vercel.json` anywhere — confirmed absent, not just "not identified." | Baseline only | Explicitly mark authenticated/API responses non-cacheable rather than relying on framework defaults; define a static-asset policy if one doesn't already exist implicitly. |
| 11. Load balancing and scaling | Vercel handles platform-level scaling. Given the fixed 0.25 CU Neon ceiling (layer 6), the database — not Vercel — is the actual scaling constraint right now. | Not validated, and the real bottleneck is identified | Raise the Neon autoscaling ceiling and run a basic load test before any partner expansion beyond a handful of pilot users. |
| 12. Error tracking and logs | Vercel build/runtime logs exist and are usable (I used them directly in this review). **No dedicated error-tracking service (Sentry or equivalent) exists anywhere in the repo** — confirmed by search. | Partial | Add structured app-level error tracking and alerting; don't rely on manually reading Vercel logs after the fact, the way this review had to. |
| 13. Availability and recovery | Neon branching capability exists (used for migrations). No documented RPO/RTO, backup cadence, or restore-drill record exists in the repo or workspace docs. | Missing | Define and test a real restore procedure before Launch 1 — this is unchanged from ChatGPT's assessment and I found nothing that changes it either way. |

---

## 5. Where this leaves PR #30 and Phase D

Phase D's design — create batch → upload rows → preview/dedupe/suppression → human-approved submit → status/reconciliation — is real, matches the pre-existing contract in `src/lib/lead-import-contract.ts`, and is exactly as described. I have no disagreement with ChatGPT's description of what Phase D does or with keeping it fully human-approved through the pilot.

Where I land differently is the merge gate. Don't merge PR #30 on the theory that fixing the `servicing/[clientAccountId]` vs `[id]` collision clears it — fix that collision because it's objectively wrong regardless of whether it's the cause, but treat the actual 504 as still unexplained until someone reproduces it live with logs open. If a redeploy of the exact same PR #30 SHA also hangs after that fix, the collision wasn't the cause and the search continues. If it doesn't hang, you still won't know for certain it was the collision rather than a stale build cache clearing — so either way, the real gate is the smoke test in §6 below, not any specific file fix.

Also worth flagging plainly: the shared preview/production HMAC secret (§3) should be split before Phase D goes anywhere near a real batch, independent of the login bug — a preview environment with the same signing secret as production means a compromised or merely misconfigured preview deployment could forge requests production would accept.

## 6. Minimum release test (unchanged in spirit from ChatGPT's, reordered around the actual open question)

1. Reproduce the 504 with real browser devtools open (Network + Console) against the current PR #30 preview, watching exactly what request is in flight when it locks up — not through automation, which has its own timing quirks.
2. In parallel, pull Vercel's real-time function logs during that exact reproduction window (not minutes later).
3. Only after the actual failing request/error is identified: decide whether the servicing-route collision is related, unrelated, or coincidental.
4. Fix whatever the logs actually show, redeploy the same SHA, and repeat steps 1–2 to confirm.
5. Once login/MFA/Admin/Portal all pass cleanly on that SHA: run the Phase D route suite (create/upload/preview/submit/status) against seeded test rows, using separate preview-only HMAC credentials once those exist.
6. Merge only after both 4 and 5 are documented with actual evidence, not a build-status checkmark.

## 7. Realistic timeline

This doesn't move materially from ChatGPT's 4–6 week estimate — the scope of what's genuinely missing (real CI, rate limiting, a least-privilege DB role, RLS or an explicit server-only decision, backup/restore drill, the login root-cause) is the same regardless of which of us wrote it down. Where I'd adjust: the database-role and RLS-bypass finding (§3) isn't a "decide later" item, it's a fix that should happen in the very first week alongside the login investigation, because it's true today, not a risk that might become true at scale.

| Phase | Duration | Hard gate |
|---|---:|---|
| 0. Scope freeze, branch hygiene | 1–2 days | No new unrelated feature work lands on the release branch. |
| 1. Root-cause the login/MFA 504 (§6, steps 1–4) | 3–5 days | PR #30 cannot merge until reproduced, explained, and fixed with evidence. |
| 2. Database privilege fix + secret separation | 2–3 days, can run in parallel with Phase 1 | Create a non-bypassing least-privilege runtime role; split preview/production HMAC secrets. No live batch runs until both are done. |
| 3. Security baseline (rate limits, RLS decision, auth boundary tests) | 4–6 days | No external HMAC credential issued until rate limits exist on the lead-import routes. |
| 4. Observability and recovery (real CI, error tracking, backup/restore drill) | 3–5 days | No pilot launch until a restore drill is actually documented. |
| 5. Phase D controlled integration test | 3–5 days | No real lead batch until the seeded test suite passes end to end. |
| 6. Controlled pilot | 5–10 days | Exit requires no open critical security or reliability issue. |

**Expected time to controlled pilot: 4–6 weeks**, same target as ChatGPT's estimate — the work items are similar in size, I've just re-ordered a couple of them based on what I could independently confirm is already true today rather than a future risk.

## 8. Questions for you before implementation resumes

1. Same question ChatGPT raised and still open: internal-only pilot, or partners from day one?
2. Given the database-role/RLS finding is now confirmed (not hypothetical), do you want the least-privilege role created this week regardless of what happens with the login investigation, since it's independent of that bug?
3. Who's the one person allowed to approve a production Vercel promotion, a Neon migration, and the first live HMAC credential — same question as before, still unanswered as far as I can tell from the workspace docs.
4. Is a 4–6 week timeline still acceptable, or has the "losing time" pressure changed what you're willing to trade off (e.g., accepting the RLS-bypass risk for pilot-only use with a tiny, trusted user group, deferring it past Launch 1)?

---

*Everything in this document came from direct, read-only queries against the real repo, the real Vercel project, and the real Neon database at the time of writing (2026-07-03). Nothing here was carried over unverified from the uploaded ChatGPT document — where I agree with it, it's because I checked and got the same answer; where I don't, the evidence is above.*
