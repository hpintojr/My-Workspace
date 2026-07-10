# [G] 2026-07-09 MCD CRM PR76 Acceptance Overview Operating Links

## Summary

Shipped PR #76 for `hpintojr/crm.mcd`: `feat(leads): link acceptance overview from command center and report`.

This was a read-only navigation/discoverability slice. It added direct `Acceptance overview` links to existing acceptance operating surfaces so Hamilton/Claude can reach the cockpit from the command center and report without knowing the direct URL.

## PR

- PR: `https://github.com/hpintojr/crm.mcd/pull/76`
- Branch: `pr-76-acceptance-overview-operating-links`
- Head SHA: `32029527fed2cea9379a89c93eff424e16fd80c3`
- Base SHA: `e2a429bc5003ed179532ffebc91a71a8d7ba251b`
- Squash merge / production commit: `438b24fd4378edf2e0badf747956dc4c614bfd65`

## Files changed

- `src/app/admin/leads/acceptance-command-center/page.tsx`
  - Added top navigation link to `/admin/leads/acceptance-overview` labeled `Acceptance overview`.
- `src/app/admin/leads/acceptance-report/page.tsx`
  - Added top navigation link to `/admin/leads/acceptance-overview` labeled `Acceptance overview`.
- `scripts/check-lead-flow-alignment.ts`
  - Added guard assertions for both overview links.

## Checks

- Vercel: success.
- Commission Policy: success, run `407`.
- Verify CRM: success, run `221`.
- Application Build: success, run `369`.

## Preview smoke

Preview deployment:

- Deployment: `dpl_CTrmvtSQ1o7uEmj6KML3beGhrbJA`
- URL: `crm-8oqgnyc89-hamiltons-projects-f65eeb81.vercel.app`
- Branch: `pr-76-acceptance-overview-operating-links`
- Commit: `32029527fed2cea9379a89c93eff424e16fd80c3`

Smoke results:

- `/api/status`: HTTP 200, preview branch and head commit confirmed.
- `/admin/leads/acceptance-command-center`: HTTP 200 sign-in boundary `/login`, not 404/500.
- `/admin/leads/acceptance-report`: HTTP 200 sign-in boundary `/login`, not 404/500.
- `/api/cron/leads/aging`: HTTP 401 without auth.

## Production smoke

Production deployment:

- Deployment: `dpl_4DSFcqCFArg689VwVNKwoprGLVkV`
- Custom domain: `crm.mercurycalldesk.com`
- Commit: `438b24fd4378edf2e0badf747956dc4c614bfd65`

Smoke results:

- `/api/status`: HTTP 200, production `main` commit `438b24fd4378edf2e0badf747956dc4c614bfd65` confirmed.
- `/admin/leads/acceptance-command-center`: HTTP 200 sign-in boundary `/login`, not 404/500.
- `/admin/leads/acceptance-report`: HTTP 200 sign-in boundary `/login`, not 404/500.
- `/api/cron/leads/aging`: HTTP 401 without auth.

## Safety boundary

No Prisma schema changes, Neon migrations or branch mutations, feature-flag changes, live GHL workflow activation or API calls, live import/export submission, Lead claim/DNC/ownership/approval/suppression/two-way-contact business-rule changes, or Servicing/Commissions/Finance/payout/client-onboarding activation were performed.

No secrets, credentials, customer data, SSNs, tax IDs, or raw bank data were committed.
