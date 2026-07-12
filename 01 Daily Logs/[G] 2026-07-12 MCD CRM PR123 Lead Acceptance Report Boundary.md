# [G] 2026-07-12 — MCD CRM PR #123 Lead Acceptance Report Boundary

## Scope

Standardize the non-download Lead acceptance JSON report APIs on the shared request-ID/no-store/noindex response contract while preserving all report calculations, AuditLog reads, dry-run behavior, and separate CSV contracts.

## Covered routes

- `/api/admin/leads/acceptance-findings`
- `/api/admin/leads/acceptance-gaps`
- `/api/admin/leads/acceptance-gates`
- `/api/admin/leads/acceptance-handoff`
- `/api/admin/leads/acceptance-matrix`
- `/api/admin/leads/acceptance-overview`
- `/api/admin/leads/acceptance-report`
- `/api/admin/leads/deep-links`
- `/api/admin/leads/aging-preview`

## Implementation

PR: `hpintojr/crm.mcd#123`

Title: **Standardize Lead acceptance JSON report responses**

Squash merge commit: `7b3d22756349863e7623ff76dd7d09d6cb28e913`

Changes:

- Applied `authenticatedRequestId` and `authenticatedJson` to all nine routes.
- Added `Cache-Control: no-store, max-age=0`.
- Added bounded/generated `X-Request-Id`.
- Added `X-Robots-Tag: noindex, nofollow, noarchive`.
- Removed internal viewer User IDs and email addresses from report metadata.
- Preserved role-only viewer metadata or existing `generatedByRole` fields.
- Preserved every existing helper call, acceptance calculation, AuditLog query, result field, and safety flag.
- Preserved the acceptance AuditLog query bound of 1,000 records and latest-per-step behavior.
- Preserved the aging preview call with `dryRun: true` and `mutationPerformed: false`.
- Kept the CSV routes separate:
  - `/api/admin/leads/acceptance-history.csv`
  - `/api/admin/leads/acceptance-report.csv`
- Preserved CSV content type and attachment disposition.
- Added `scripts/check-lead-acceptance-report-boundary.ts`.
- Updated the older deep-links API guard to require the stronger shared response contract.
- Added documentation and deployment-verification version `2026-07-12-pr123`.

## Validation

Final PR head: `3f3344d9940afb5b2fe0cb6cded25c0f451bbbbb`

Required checks:

- Commission Policy: PASS
- Verify CRM: PASS
- Application Build: PASS
- Vercel preview: READY
- Review threads: none

The final preview passed every repository guard plus:

- `Lead acceptance report response boundary guard passed.`

It also passed Prisma generation, Next.js compilation, TypeScript validation, static generation, and serverless packaging.

No acceptance report, aging preview, or CSV route was accessed during validation.

## Production

Deployment: `dpl_FadS48Mpiqsw4iCjX3Ev3KuwsfUm`

State: **READY**

Live `/api/status` returned HTTP 200 with:

- environment `production`;
- branch `main`;
- exact commit `7b3d22756349863e7623ff76dd7d09d6cb28e913`;
- no-store/noindex response metadata;
- complete security headers.

Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

No protected report endpoint was authenticated or queried. The aging preview was not executed and no CSV was downloaded. No acceptance record, Lead, callback, AuditLog, feature flag, GHL workflow, Servicing record, Commission record, payment, or payout was mutated.

## Next evidence-backed scope

Harden protected CSV/download response metadata without invoking an export:

- acceptance history CSV;
- acceptance summary CSV;
- privileged AuditLog export.

Preserve filenames, content types, columns, query bounds, and export AuditLog evidence. Add request IDs and noindex/no-store metadata through a download-specific helper rather than the JSON response helper.
