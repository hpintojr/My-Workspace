# PR #129 — Shared Route JSON Boundary

Date: 2026-07-12/13 Pacific execution interval
Project: `hpintojr/crm.mcd`
PR: `https://github.com/hpintojr/crm.mcd/pull/129`
Merge commit: `d6274810a5ebb118490c08e2542a25381c9a35d8`
Production deployment: `dpl_88f59ZwNy92NRGhsDDqDmRjeJyrb`

## Evidence-backed gap

After PR #128, the fail-closed Route Boundary Registry contained six approved findings. Four were direct JSON response constructors in public activation, public signup, the secret-authenticated Lead-aging cron, and the minimal public status route. Each route had route-specific payload/status behavior but shared the same no-store response foundation.

## Implementation

- Added `src/lib/route-json-response.ts` with:
  - `routeRequestId` preserving the existing 128-character safe request-ID contract;
  - `routeJsonResponse` centralizing no-store responses with explicit request-ID, noindex, and retry-after options.
- Public activation preserves every existing payload/status, request ID, no-store/noindex header, bounded raw-body check, token transaction, MFA behavior, and audit event.
- Public signup preserves every existing payload/status, privacy-preserving HTTP 202 behavior, request ID, no-store/noindex header, durable reservation ordering, GHL behavior, integration evidence, and audit updates.
- Lead-aging cron preserves bearer authorization, request IDs, no-store, conditional `Retry-After: 60`, database readiness retries, and the rule that the mutating sweep runs exactly once. No noindex header was added.
- Public status preserves the minimal service/environment/branch/SHA payload, HTTP 200, no-store, and noindex behavior without adding request IDs.
- Updated the dedicated activation, signup, cron, and Production Smoke guards to verify the shared helper and exact per-route options.
- Added `check-shared-route-json-boundary.ts` and deployment-verification evidence.
- Made the signed-import domain-error guard independent of unrelated future registry reductions.
- Reduced the Route Boundary Registry from six findings across four routes to two approved findings across two routes. The only remaining findings are the required bounded `request.text()` reads in activation and signup.

## Validation

- Vercel preview: READY.
- Commission Policy: PASS.
- Verify CRM: PASS.
- Application Build: PASS.
- Every build guard passed, including the exact two-finding registry scanner and the shared route JSON boundary guard.
- Review threads: none.
- Squash merge completed as `d6274810a5ebb118490c08e2542a25381c9a35d8`.
- Production deployment `dpl_88f59ZwNy92NRGhsDDqDmRjeJyrb`: READY and aliased to `crm.mercurycalldesk.com`.
- Live `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #129 merge SHA.
- No-store, noindex, HSTS, CSP, anti-framing, MIME, referrer, permissions, opener, and framework-header suppression baselines remained intact.
- The new deployment had no error or fatal runtime logs during the verification window.

## Safety boundary

No signup, activation, cron, import, export, controlled-test, or webhook endpoint was invoked. No production data was queried or mutated, no feature flag or environment setting was changed, no migration was applied, no live GHL call was made, and no Servicing, Commission, Finance, payment, or payout action was performed.

## Next safe work

Extract the identical bounded public JSON body-read sequence from activation and signup into a source-only shared helper while preserving their exact 413/400 response bodies and pre-parse byte-limit ordering. This can remove the final two route-level findings and establish a zero-finding Route Boundary Registry without invoking either public endpoint.