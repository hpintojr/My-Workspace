# PR #130 — Zero-Finding Route Boundary Registry

Date: 2026-07-12/13 Pacific execution interval
Project: `hpintojr/crm.mcd`
PR: `https://github.com/hpintojr/crm.mcd/pull/130`
Merge commit: `0a2dcd423cd8ebabee457b198d640e9f37e243ef`
Production deployment: `dpl_65KNxfgCxhisenFwqSeSMSCu25Jk`

## Evidence-backed gap

PR #129 reduced the fail-closed Route Boundary Registry to two reviewed findings: identical bounded raw-body reads in public account activation and public partner signup. Both routes performed the same declared-size check, raw read, actual UTF-8 byte-size check, JSON parse ordering, and exact public failure responses.

## Implementation

- Added `src/lib/public-json-body-boundary.ts` with `preparePublicJsonBody`.
- Preserved exact ordered handling:
  1. declared `Content-Length` check;
  2. raw body read;
  3. actual UTF-8 byte-length check;
  4. JSON parsing.
- Preserved exact failures:
  - HTTP 413 `{error: "Request too large."}`;
  - HTTP 400 `{error: "Unable to read request."}`;
  - HTTP 400 `{error: "Invalid JSON"}`.
- Preserved request IDs, no-store, and noindex response metadata through the shared route JSON response boundary.
- Activation continues to supply its 8 KiB limit and applies `activationRequestSchema` after body preparation.
- Signup continues to supply its 16 KiB limit and applies `signupSchema` after body preparation.
- Removed direct body parsing from both route files without changing downstream validation, database behavior, transactions, audit events, GHL synchronization, or business outcomes.
- Established a zero-finding Route Boundary Registry with zero frozen debt.
- Added exact ordering and failure-contract regression coverage.
- Updated activation, signup, shared-response, signed-import, registry control-plane, documentation, build, and deployment-verification guards.

## Validation

- Vercel preview: READY.
- Commission Policy: PASS.
- Verify CRM: PASS.
- Application Build: PASS.
- Every build guard passed.
- Route Boundary Registry scanner: PASS with 0 reviewed findings.
- Route Boundary control plane: PASS with an empty findings list and zero aggregate totals.
- Review threads: none.
- Squash merge completed as `0a2dcd423cd8ebabee457b198d640e9f37e243ef`.
- Production deployment `dpl_65KNxfgCxhisenFwqSeSMSCu25Jk`: READY and aliased to `crm.mercurycalldesk.com`.
- Live `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #130 merge SHA.
- No-store, noindex, HSTS, CSP, anti-framing, MIME, referrer, permissions, opener, and framework-header suppression baselines remained intact.
- The new deployment had no error or fatal runtime logs during the verification window.

## Zero-finding meaning

The registry remains fail-closed and still recursively scans every `src/app/**/route.ts`. The empty baseline is the expected source-derived result, not a bypass. Any future direct parser, response constructor, or route-level raw error message will fail CI until explicitly reviewed.

## Safety boundary

No signup, activation, cron, import, export, controlled-test, or webhook endpoint was invoked. No production data was queried or mutated, no feature flag or environment setting was changed, no migration was applied, no live GHL call was made, and no Servicing, Commission, Finance, payment, or payout action was performed.

## Next safe work

Investigate the current build-guard execution chain for duplicated pass-line inventories and brittle documentation-string assertions. The PR #129 and PR #130 preview iterations exposed stale evidence checks that failed after safe documentation refactors. A source-derived build-guard manifest may centralize script order and pass-line metadata without changing application or production behavior.