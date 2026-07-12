# MCD CRM — PR #112 Centralized Security Headers

**Date:** 2026-07-12  
**Repository:** `hpintojr/crm.mcd`  
**PR:** #112 — Centralize global security headers in Next config  
**Merge commit:** `b15b5189192efb2a04cb4b8a85c953a8baa04716`

## Evidence

`next.config.mjs` contained the intended complete global HTTP security-header baseline. `middleware.ts` also carried an older partial copy with fewer Permissions-Policy directives and a different Cross-Origin-Opener-Policy value. Production resolved to the stronger global values, but maintaining two definitions created avoidable drift and override risk.

## Implemented

- Removed only duplicate `response.headers.set(...)` calls from middleware.
- Preserved the existing NextAuth initialization, authorization wrapper, `NextResponse.next()` continuation, and route matcher.
- Kept `next.config.mjs` as the sole global HTTP security-header source.
- Strengthened `check-http-security-headers.ts` to:
  - require the full baseline in `next.config.mjs`;
  - require the existing middleware auth wrapper and matcher;
  - reject security-header names or response-header mutation calls in middleware;
  - preserve Production Smoke assertions.
- Documented the single-source boundary in `docs/HTTP_SECURITY_HEADERS.md`.
- Advanced deployment-verification version to `2026-07-12-pr112`.

## Validation

All required PR checks completed successfully:

- Verify CRM / Typecheck and contract guards;
- Commission Policy;
- Application Build;
- Vercel preview deployment.

Final preview deployment `dpl_4882SrDvsenmYPkYGEKVJiG6AsuR` was READY. Direct checks confirmed:

- `/api/status` retained the complete global header baseline;
- unauthenticated `/admin/project-readiness` still resolved to `/login`;
- the login boundary retained CSP, Permissions-Policy, COOP, nosniff, DENY, referrer, DNS-prefetch, cross-domain, download, and HSTS headers.

Production deployment `dpl_6KoiZEi97uFKooHVSf6p5err1G47` is READY and aliased to `crm.mercurycalldesk.com`.

Production `/api/status` returned HTTP 200 with environment `production`, branch `main`, and exact commit `b15b5189192efb2a04cb4b8a85c953a8baa04716`.

Production unauthenticated `/admin/project-readiness` still resolved to the branded `/login` surface with the complete global header baseline. Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

No authentication or authorization outcome changed. No migration, production feature flag, Lead, Client Account, Service Case, acceptance record, GHL workflow, Commission/Finance state, payment provider, payout, credential, or protected customer record was changed or accessed.
