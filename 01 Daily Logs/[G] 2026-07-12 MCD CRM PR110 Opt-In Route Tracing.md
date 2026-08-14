# MCD CRM — PR #110 Opt-In Route Tracing

Date: 2026-07-12
Executor: ChatGPT
Repository: `hpintojr/crm.mcd`

## Evidence

Production and preview build output repeatedly included routine diagnostic progress messages:

- `[route-trace] requireUser: auth start`
- authentication completion and active-user lookup status
- role evaluation
- Admin landing-page entry
- portal layout entry

These messages were useful during targeted troubleshooting but were emitted unconditionally during normal builds and requests, adding noise around actionable warnings and errors.

The direct emitters were:

- `src/lib/authz.ts`
- `src/app/admin/page.tsx`
- `src/app/portal/layout.tsx`

## Implementation

PR: https://github.com/hpintojr/crm.mcd/pull/110

- Added `src/lib/route-trace.ts` as a server-only diagnostic helper.
- Trace messages emit only when `ROUTE_TRACE_ENABLED=true` exactly after trimming and lowercasing.
- Replaced direct route-trace `console.info` calls with the helper.
- Preserved the existing diagnostic events and limited boolean metadata.
- Added `ROUTE_TRACE_ENABLED="false"` to `.env.example` without changing any Vercel environment setting.
- Added `docs/ROUTE_TRACING.md` with temporary enable/disable instructions and a prohibition on credentials, tokens, identities, Lead/client data, or financial data in trace metadata.
- Added the document to `docs/INDEX.md`.
- Added `scripts/check-route-trace-hygiene.ts` and wired it into `check:lead-flow-alignment` and the production build.
- Added `Route trace hygiene guard passed.` to deployment verification and advanced the verification version to `2026-07-12-pr110`.

## Unchanged behavior

The change did not alter:

- authentication or authorization;
- MFA or redirect behavior;
- active-user database lookups;
- feature gates;
- application AuditLog records;
- errors and warnings;
- Auth.js unexpected-error telemetry;
- Lead-aging retry/failure logs;
- integration or database error logging;
- business rules.

## Verification

Preview head: `3b814d112fe0cf54552b766197808c9dbfb117bf`

Preview deployment: `dpl_HgXyha73fJuVEExwmzE9UvnQdxnu` — READY.

All required gates passed:

- Verify CRM — success
- Commission Policy — success
- Application Build — success
- Vercel Preview — READY, zero unresolved toolbar threads

The preview build passed:

- the complete guard chain;
- `Route trace hygiene guard passed.`;
- Prisma generation;
- Next.js compilation and TypeScript validation;
- static generation;
- packaging and deployment.

The complete preview build log contained no `[route-trace]` progress events.

## Merge and production

Squash merge commit: `b6a5b01299321886fca44a7bef07dc3be5ae69c2`

Production deployment: `dpl_31kPZ1yf27Zk89pmDoDPBSKj5jGY` — READY and aliased to `crm.mercurycalldesk.com`.

Production verification:

- every guard passed, including route-trace hygiene;
- compile, typecheck, static generation, and packaging succeeded;
- the complete production build log contained no default `[route-trace]` progress events;
- `/api/status` returned HTTP 200;
- environment `production`;
- branch `main`;
- exact commit `b6a5b01299321886fca44a7bef07dc3be5ae69c2`;
- `Cache-Control: no-store`;
- the full security-header baseline remained intact;
- Vercel reported no runtime errors in the latest one-hour window.

## Safety boundary

No environment setting was changed. No production data was read beyond public deployment/status evidence or mutated. No feature flag, migration, GHL integration, Lead/Client/Service record, acceptance record, Commission/Finance state, payment, payout, or money movement was changed.
