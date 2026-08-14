# [G] 2026-07-12 MCD CRM PR #105 — HTTP Security Headers

**Holder:** ChatGPT  
**Owner direction:** Hamilton directed ChatGPT to continue autonomous end-to-end work while Claude is unavailable.  
**Completed:** 2026-07-12T07:13Z

## Evidence

A live production response audit before the change showed Vercel-provided HSTS, but no application-emitted CSP, anti-framing, MIME-sniffing, referrer, browser-permission, opener, DNS-prefetch, cross-domain-policy, or legacy download protections.

## Outcome

ChatGPT shipped PR #105 end to end.

**PR:** https://github.com/hpintojr/crm.mcd/pull/105  
**Head:** `1963d150d600ba7c0da654cc9973e96cc2aa2ce6`  
**Squash merge:** `a167c5338290fac5e843da574ce5baafd967c582`

## Implementation

Added a global header baseline in `next.config.mjs` for every path:

- `Content-Security-Policy`: `base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: camera, microphone, geolocation, payment, USB, and browsing topics disabled
- `Cross-Origin-Opener-Policy: same-origin-allow-popups`
- `X-DNS-Prefetch-Control: off`
- `X-Permitted-Cross-Domain-Policies: none`
- `X-Download-Options: noopen`

The CSP intentionally does not define `default-src`, script, style, image, font, or connection directives. This prevents the policy from changing current Next.js asset loading, API connectivity, server-side GHL behavior, or Vercel preview tooling.

Extended Production Smoke to enforce the deployed header baseline on:

- `/api/status`
- `/login`
- Project Readiness page/API unauthenticated boundaries
- Servicing Preflight page/API unauthenticated boundaries

Vercel HSTS remains platform-supplied and is also verified by Production Smoke.

Added:

- `scripts/check-http-security-headers.ts`
- `docs/HTTP_SECURITY_HEADERS.md`
- README, Production Smoke, and documentation-index updates
- deployment-verification line `HTTP security headers guard passed.`

The focused guard rejects unsafe CSP eval/inline additions, wildcard framing/base behavior, app-added permissive CORS, and cross-origin embedder policy that could break current integrations.

## CI and preview verification

All required gates passed:

- Commission Policy — success.
- Verify CRM / Typecheck and contract guards — success.
- Application Build — success.
- Vercel preview `dpl_67w1pwbia6vCNwC3yoc2r7PfX4Gq` — READY with zero unresolved toolbar threads.

Final-head preview evidence:

- all guards passed, including `HTTP security headers guard passed.`;
- Prisma generation and Next.js compile/type/static/serverless build passed;
- `/login` rendered normally and emitted every configured header plus HSTS;
- `/api/status` returned JSON/no-store and emitted every configured header plus HSTS.

Two earlier intermediate branch previews failed because the new guard temporarily preceded all referenced files. The final PR head was fully green; these were not production incidents.

## Production verification

**Deployment:** `dpl_C9LgJNzdLpeA4dm2A2cuNuPe69A9`  
**State:** READY  
**Aliases:** `crm-mcd.vercel.app`, `crm.mercurycalldesk.com`  
**Production SHA:** `a167c5338290fac5e843da574ce5baafd967c582`

Live `/api/status` returned HTTP 200 with production, `main`, the exact merge SHA, JSON/no-store, and the complete header baseline.

Live `/login` returned HTTP 200, the normal branded sign-in page, `noindex, nofollow`, and the complete header baseline.

## Safety boundary reaffirmation

- Response headers and read-only smoke assertions only.
- No user authentication or credential submission.
- No authorization/business-rule changes.
- No production data or audit mutation.
- No feature flag changes.
- No migration or schema change.
- No GHL calls or workflow activation.
- No Commission, Finance, payment-provider, payout, or money movement action.
