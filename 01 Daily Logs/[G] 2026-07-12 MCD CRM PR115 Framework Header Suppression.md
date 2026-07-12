# MCD CRM — PR #115 Framework Header Suppression

**Date:** 2026-07-12  
**Repository:** `hpintojr/crm.mcd`  
**PR:** #115 — Remove the Next.js powered-by response header  
**Merge commit:** `970f120701462247d0e789c2c1cc020f82786a6b`

## Evidence

Production HTML responses still exposed `X-Powered-By: Next.js`, advertising the application framework. Next.js officially supports disabling the default header with `poweredByHeader: false`.

## Implemented

- Added `poweredByHeader: false` to the existing global `next.config.mjs` configuration.
- Preserved all existing global security-header values, routing, middleware, caching, authentication, and response bodies.
- Strengthened `check-http-security-headers.ts` to require the configuration and deployed assertion.
- Updated Production Smoke so every tested public and protected response must omit `X-Powered-By`.
- Updated `docs/HTTP_SECURITY_HEADERS.md` to document framework disclosure suppression.
- Advanced deployment-verification version to `2026-07-12-pr115`.

## Validation

All required PR checks completed successfully:

- Verify CRM / Typecheck and contract guards;
- Commission Policy;
- Application Build;
- Vercel preview deployment.

Final preview deployment `dpl_GwQzhd3N1NrRZxJ5uDEh1V6MipkR` was READY. Direct preview checks confirmed `X-Powered-By` was absent on both:

- `/api/status` JSON;
- `/login` HTML.

The complete CSP, Permissions-Policy, nosniff, anti-framing, referrer, opener, DNS-prefetch, cross-domain, download, and HSTS baseline remained intact.

Production deployment `dpl_Du7dbPxUmLs9nocwbn7dm7nNVeqv` is READY and aliased to `crm.mercurycalldesk.com`.

Production `/api/status` returned HTTP 200 with environment `production`, branch `main`, and exact commit `970f120701462247d0e789c2c1cc020f82786a6b`; `X-Powered-By` was absent.

Production `/login` returned HTTP 200 with the expected branded noindex sign-in surface, complete security-header baseline, and no `X-Powered-By` header.

Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

This change affected response metadata only. No migration, environment setting, production record, authentication or authorization outcome, Lead, User, Agent, Client Account, Service Case, acceptance record, GHL workflow, Commission/Finance state, payment provider, or payout was changed or accessed.
