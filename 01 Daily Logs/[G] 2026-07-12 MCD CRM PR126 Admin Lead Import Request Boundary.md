# PR #126 — Admin Lead Import Request Boundary

Date: 2026-07-12/13 Pacific execution interval
Project: `hpintojr/crm.mcd`
PR: `https://github.com/hpintojr/crm.mcd/pull/126`
Merge commit: `eb65256da75bd0ba1cf6f2b98c3a7bba40b6d685`
Production deployment: `dpl_6EV6ggN3a4X33CzD89SGYoJEmV1c`

## Evidence-backed gap

The supported Admin Lead-import preview and commit routes consumed unbounded JSON before feature and role authorization, constructed direct JSON responses without request-ID/noindex metadata, and returned raw exception messages. Their existing preview and commit services already contained the business rules and 500-row maximum.

## Implementation

- Extended the shared authenticated JSON parser with an optional per-route body limit while preserving the 16 KiB portal default.
- Added a dedicated 1 MiB Admin Lead-import request profile.
- Added shared envelope and 1–500 row validation.
- Both supported routes now derive a request ID, apply a generic Leads feature gate, require an Admin role, and only then consume the body.
- All responses use the shared no-store/noindex/request-ID contract.
- Malformed JSON returns 400, oversized bodies 413, envelope/count errors 422, preview success 200, commit success 201, and unknown failures generic 500.
- Telemetry records only operation, request ID, and exception class name.
- Added exact source regression coverage, documentation, build wiring, and deployment-verification evidence.

## Preserved behavior

- `previewLeadImport` remains unchanged.
- `commitLeadImport` remains unchanged and retains its redundant feature and Admin authorization defenses.
- The 500-row cap, normalization, validation, suppression checks, duplicate checks, transaction boundaries, Lead creation, LeadActivity creation, AuditLog evidence, success bodies, and HTTP 201 commit contract remain unchanged.

## Validation

- Commission Policy: PASS.
- Verify CRM: PASS.
- Application Build: PASS.
- Vercel preview: READY.
- Review threads: none.
- Production deployment: READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200, environment `production`, branch `main`, exact merge SHA.
- Security headers and no-store/noindex contract intact.
- Latest one-hour Vercel runtime-error window: clean.

## Safety boundary

No Admin or signed import endpoint was invoked. No production Lead, import batch, suppression, AuditLog, feature flag, GHL workflow, Client Account, Service Case, Commission record, payment, or payout was read or mutated. No production migration or settings change was performed.

## Next safe work

Add a protected source-derived Route Boundary Registry and exact CI scanner so every remaining direct route parser, direct response constructor, and raw exception primitive is explicitly classified and future unreviewed drift fails the build.
