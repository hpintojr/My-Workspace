---
type: daily-log
date: 2026-07-11
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
---

# 2026-07-11 — MCD CRM PR #93 Deep-Links JSON API

## Summary

Shipped PR #93 adding a protected read-only JSON endpoint for the Lead acceptance deep-links hub and moving the deep-link catalog into a shared server-only helper so the page and API do not drift.

## Repository and PR

- Repository: `hpintojr/crm.mcd`.
- PR: <https://github.com/hpintojr/crm.mcd/pull/93>.
- Branch: `agent/deep-links-json-api`.
- Final head SHA: `27b75ef32e8ed60eb5a4fe5ebde90f2ab3090f3b`.
- Squash merge / production commit: `d694c5c1ec5e84e63511ebfcf8271b3519bc53d8`.
- Production deployment: `dpl_4w24PTzevkYsHMDxTwAkJBm8SFLk`.

## What changed

- `src/lib/lead-acceptance-deep-links.ts`
  - New server-only static catalog for the nine deep-link entries.
  - Exposes `LEAD_ACCEPTANCE_DEEP_LINKS_VERSION`, `leadAcceptanceDeepLinks`, and `getLeadAcceptanceDeepLinks()`.
- `src/app/admin/leads/deep-links/page.tsx`
  - Refactored to consume the shared catalog instead of hardcoding local entries.
  - Added a protected link to `/api/admin/leads/deep-links`.
- `src/app/api/admin/leads/deep-links/route.ts`
  - New protected read-only GET endpoint using `requireRole(ADMIN_ROLES)`.
  - Returns the shared catalog, `viewedBy`, and the safety boundary.
  - Uses `Cache-Control: no-store`.
- `scripts/check-deep-links-api-guard.ts`
  - New focused guard for the shared catalog, API route, page link, package wiring, and deployment-verification guard-line contract.
- `scripts/check-deep-links-guard.ts`
  - Updated to validate slugs in the shared catalog instead of requiring the page to hardcode them.
- `src/app/admin/leads/deployment-verification/page.tsx` and `scripts/check-deployment-verification-guard.ts`
  - Added the new expected production build line: `Deep links API guard passed.`
- `package.json`
  - Wired the API guard into `check:lead-flow-alignment` and therefore the production build path.

## Validation before merge

Required checks on head SHA `27b75ef32e8ed60eb5a4fe5ebde90f2ab3090f3b` were green:

- Vercel status: success.
- GitHub Actions `Application Build`: success.
- GitHub Actions `Verify CRM`: success.
- GitHub Actions `Commission Policy`: success.

Connector diff review showed eight files changed. The change was larger than PR #92 because the static catalog moved out of the page into a reusable server-only helper; no business-rule or data-path files were touched.

## Production verification after merge

- `hpintojr/crm.mcd` production commit advanced to `d694c5c1ec5e84e63511ebfcf8271b3519bc53d8`.
- Vercel deployment `dpl_4w24PTzevkYsHMDxTwAkJBm8SFLk` reached `READY`.
- Vercel production aliases include `crm.mercurycalldesk.com`.
- `/api/status` returned:
  - `ok: true`
  - `environment: production`
  - `git.branch: main`
  - `git.commitSha: d694c5c1ec5e84e63511ebfcf8271b3519bc53d8`
- Production build logs emitted the 11 expected guard-pass lines, including the new `Deep links API guard passed.` line.
- Unauthenticated smoke tests resolved to the sign-in boundary (`/login`) instead of 404/500 for:
  - `/admin/leads/deep-links`
  - `/api/admin/leads/deep-links`

## Safety boundary

PR #93 stayed strictly inside the authorized read-only API/catalog/page/guard scope:

- No runtime data mutation paths changed.
- No mutable API behavior was added.
- No Prisma schema changes.
- No Neon migrations or production-data branch changes.
- No feature flag changes.
- No live external workflow activation.
- No live external API calls.
- No live import/export submission.
- No real Lead ownership, claim, DNC, suppression, contact-gate, routing, approval, or business-rule changes.
- No Servicing, Commissions, Finance, payout, or client-onboarding activation.
- No secrets, credentials, customer data, or private information committed.

Authenticated production acceptance and the owner production decision remain Hamilton-only.

## Next recommended safe work

Continue with additive read-only/API/guard work only unless Hamilton explicitly expands scope. The next safe candidate is a read-only JSON endpoint for deployment verification, backed by a shared static guard-line catalog so `/admin/leads/deployment-verification` and its API cannot drift.
