# [G] 2026-07-12 — MCD CRM PR #118 Portal Write Request Boundary

## Scope

Harden the remaining authenticated portal Lead write request boundaries without invoking any write endpoint or changing Lead business rules.

## Evidence

The following routes still parsed unbounded JSON and returned inconsistent response metadata:

- `POST /api/portal/actions`
- `POST /api/portal/dnc`
- `POST /api/portal/leads/call-start`
- `POST /api/portal/release`

The call-start route also returned arbitrary service exception messages, and the logout-audit compatibility route returned a bare HTTP 204 without no-store/noindex/request-ID metadata.

## Implementation

PR: `hpintojr/crm.mcd#118`

Title: **Harden authenticated portal write request boundaries**

Squash merge commit: `31dc8068b562041a7fc455a3ed6c8af2a8f65113`

Changes:

- Added `src/lib/portal-request-boundary.ts`.
- Added a 16 KiB declared and actual UTF-8 body limit.
- Added centralized no-store/noindex/request-ID JSON and 204 responses.
- Required route-level Agent/Admin authorization before body parsing on all four Lead write routes.
- Preserved each route's existing Zod schema and Lead business rules.
- Mapped only known call-start eligibility/stale-record failures to approved public messages.
- Unexpected call-start failures are rethrown to runtime telemetry.
- Kept `/api/auth/logout-audit` side-effect free; NextAuth's `signOut` event remains the LOGOUT AuditLog source.
- Added `scripts/check-portal-write-request-boundary.ts`.
- Added `docs/PORTAL_WRITE_REQUEST_BOUNDARY.md` and documentation index wiring.
- Added the guard to the authoritative build chain and deployment-verification pass list.
- Advanced deployment-verification version to `2026-07-12-pr118`.

## Validation

Final PR head: `c4ddac8a8f5f46c411429c9ac3e0409b78045be4`

Required checks:

- Commission Policy: PASS
- Verify CRM: PASS
- Application Build: PASS
- Vercel preview: READY
- Review threads: none

The final preview build passed:

- all existing repository guards;
- `Portal write request boundary guard passed.`;
- Prisma generation;
- Next.js compilation;
- TypeScript validation;
- static page generation;
- serverless packaging.

No covered POST endpoint was invoked during preview verification.

## Production

Deployment: `dpl_BHci8wpkkANCkL7E4MLF5Z57uF4k`

State: **READY**

Aliases include:

- `crm.mercurycalldesk.com`
- `crm-mcd.vercel.app`

Live `/api/status` returned:

- HTTP 200;
- environment `production`;
- branch `main`;
- exact commit `31dc8068b562041a7fc455a3ed6c8af2a8f65113`;
- no-store and noindex response metadata;
- the complete security-header baseline.

Vercel reported no runtime errors in the latest one-hour window after deployment.

## Safety boundary

No portal write endpoint was invoked. No production Lead, Agent, User, callback, activity, suppression, AuditLog record, feature flag, migration, GHL workflow, payment, or payout was read or mutated.

## Next evidence-backed scope

Harden `POST /api/admin/integrations/test-events`:

- bound its JSON body;
- centralize no-store/noindex/request-ID responses;
- retain Admin authorization before body parsing;
- map only known controlled-test validation failures;
- rethrow unexpected errors;
- preserve preview/apply semantics exactly;
- do not invoke the endpoint during validation.
