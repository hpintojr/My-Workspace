# MCD CRM PR74 — Acceptance Overview Navigation

## Summary

Shipped PR #74, `feat(leads): add acceptance overview navigation`, as a guarded read-only discoverability slice after PR #73.

## Scope

- Added protected `/admin/leads/acceptance` alias route.
- The alias checks `features.leads`, requires `ADMIN_ROLES`, and redirects to `/admin/leads/acceptance-overview`.
- Added `Lead acceptance overview` link from `/admin/leads` so the cockpit is reachable from the broader admin Lead review surface.
- Extended `scripts/check-lead-flow-alignment.ts` guard coverage for the alias and Lead review overview link.

## PR

- Branch: `pr-74-acceptance-overview-navigation`
- Head: `0d4f26520f58a9e008cbae575574f77e8bd0250b`
- PR: `https://github.com/hpintojr/crm.mcd/pull/74`
- Squash merge / production commit: `d757f5b2d4abea9fbec729e827b3eadee2012f7f`

## CI

- Vercel: success
- Commission Policy: success, run `403`
- Verify CRM: success, run `217`
- Application Build: success, run `365`

## Preview smoke

- Preview deployment: `dpl_7fooyi9CbcwgUiGG1RTyRa3udNFf`
- Preview URL: `crm-b4065qzoz-hamiltons-projects-f65eeb81.vercel.app`
- `/api/status`: HTTP 200, branch `pr-74-acceptance-overview-navigation`, commit `0d4f26520f58a9e008cbae575574f77e8bd0250b`
- `/admin/leads/acceptance`: HTTP 200 sign-in boundary, not 404/500
- `/admin/leads`: HTTP 200 sign-in boundary, not 404/500
- `/api/cron/leads/aging`: HTTP 401 without auth

## Production smoke

- Production deployment: `dpl_CBC428TaV5pkXPm2x7qE7HWBWkkg`
- Custom domain: `crm.mercurycalldesk.com`
- `/api/status`: HTTP 200, branch `main`, commit `d757f5b2d4abea9fbec729e827b3eadee2012f7f`
- `/admin/leads/acceptance`: HTTP 200 sign-in boundary, not 404/500
- `/admin/leads`: HTTP 200 sign-in boundary, not 404/500
- `/api/cron/leads/aging`: HTTP 401 without auth

## Safety boundary

No Prisma schema changes, Neon migrations or branch mutations, feature-flag changes, live GHL workflow activation or API calls, live import/export submission, Lead claim/DNC/ownership/approval/suppression/two-way-contact business-rule changes, or Servicing/Commissions/Finance/payout/client-onboarding activation were performed.

No secrets, credentials, customer data, SSNs, tax IDs, or raw bank data were committed.
