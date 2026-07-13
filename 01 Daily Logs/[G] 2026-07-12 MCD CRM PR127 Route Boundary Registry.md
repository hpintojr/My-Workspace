# PR #127 — Route Boundary Registry

Date: 2026-07-12/13 Pacific execution interval
Project: `hpintojr/crm.mcd`
PR: `https://github.com/hpintojr/crm.mcd/pull/127`
Merge commit: `0755b822916155ab4a5e6688a7df9ce4e2a5391c`
Production deployment: `dpl_BDoiYATPdDmvppVvPTqZhwkMik1G`

## Evidence-backed gap

The repository had many route-specific request and response guards, but there was no authoritative inventory proving that every remaining direct request parser, direct response constructor, or route-level error message had been explicitly reviewed. Future unreviewed drift could therefore enter without being detected by a route-family guard.

## Implementation

- Added a recursive build scanner for every `src/app/**/route.ts` file.
- Scanner categories:
  - direct `request.json()` / `req.json()`;
  - direct `request.text()` / `req.text()`;
  - direct `NextResponse.json()`;
  - direct `new NextResponse()`;
  - route-level `error.message`.
- Added `config/route-boundary-registry.json` with exact path, primitive, count, classification, and reviewed rationale.
- The build fails whenever a primitive is added, removed, or changes count without an explicit registry update.
- Validation rejects duplicate entries, invalid classifications/counts, missing review metadata, and empty rationales.
- Final source-derived baseline:
  - 11 reviewed findings;
  - 8 route files;
  - 11 `APPROVED_EXCEPTION` findings;
  - 0 `FROZEN_EXISTING` findings.
- Added protected control plane:
  - `/admin/route-boundaries`;
  - `/api/admin/route-boundaries`.
- Added role-only viewer metadata, shared request-ID/no-store/noindex API responses, Settings navigation, documentation, and exact privacy/read-only regression coverage.

## Reviewed exceptions

- Public activation raw-body limits and hardened local response helper.
- Public signup raw-body limits and privacy-preserving local response helper.
- Secret-authenticated Lead-aging cron response helper with conditional `Retry-After`.
- Minimal public deployment status response.
- Named signed-import domain errors after HMAC transport verification; unknown failures remain generic.

## Validation

- Commission Policy: PASS.
- Verify CRM: PASS.
- Application Build: PASS.
- Route Boundary Registry scanner: PASS with 11 reviewed findings.
- Route Boundary control-plane privacy/read-only guard: PASS.
- Vercel preview: READY.
- Review threads: none.
- Production deployment: READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, environment `production`, branch `main`, exact merge SHA.
- Security headers and no-store/noindex contract intact.
- Latest one-hour Vercel runtime-error window: clean.

## Safety boundary

The scanner and control-plane guards read repository source/configuration only. No route was invoked, no authenticated registry snapshot was queried, no database was accessed, and no production Lead, import, export, cron, webhook, feature flag, GHL workflow, Client Account, Service Case, Commission record, payment, or payout was read or mutated. No migration or settings change was performed.

## Next safe work

Centralize named signed Lead-import domain-error mapping outside route files. Preserve exact domain messages/statuses while removing five route-level `error.message` findings, then update the registry from 11 findings to 6 through the same fail-closed source scan.
