# MCD CRM PR75 — Acceptance Overview History/Findings Links

## Summary

Shipped PR #75, `feat(leads): link acceptance overview from history and findings`, for `hpintojr/crm.mcd`.

## Scope

Read-only acceptance discoverability only:

- Added direct `Acceptance overview` navigation to `/admin/leads/acceptance-history`.
- Added direct `Acceptance overview` navigation to `/admin/leads/acceptance-findings`.
- Extended `scripts/check-lead-flow-alignment.ts` to guard both links.

## GitHub

- Branch: `pr-75-acceptance-overview-links`.
- Base production commit before PR: `d757f5b2d4abea9fbec729e827b3eadee2012f7f`.
- PR head: `7f58c9dc6dd4dd0d0fb2a39f3ca2782c85a2ca43`.
- Squash merge / production commit: `e2a429bc5003ed179532ffebc91a71a8d7ba251b`.
- Changed files: 3.
- Additions/deletions: +5 / -1.

## Required checks

- Vercel: success.
- Commission Policy: success, run `405`.
- Verify CRM: success, run `219`.
- Application Build: success, run `367`.

## Preview smoke

Preview deployment `dpl_7KUGpVddfUkvLJhAqKf3N1AWZ1ep` reached READY.

- `/api/status`: HTTP 200; environment `preview`; branch `pr-75-acceptance-overview-links`; commit `7f58c9dc6dd4dd0d0fb2a39f3ca2782c85a2ca43`.
- `/admin/leads/acceptance-history`: HTTP 200 sign-in boundary, not 404/500.
- `/admin/leads/acceptance-findings`: HTTP 200 sign-in boundary, not 404/500.
- `/api/cron/leads/aging`: HTTP 401 without auth.

## Production smoke

Production deployment `dpl_8cGSLxEUCi2kqPVkfgzBAweDRqv7` reached READY and received the `crm.mercurycalldesk.com` alias.

- `/api/status`: HTTP 200; environment `production`; branch `main`; commit `e2a429bc5003ed179532ffebc91a71a8d7ba251b`.
- `/admin/leads/acceptance-history`: HTTP 200 sign-in boundary, not 404/500.
- `/admin/leads/acceptance-findings`: HTTP 200 sign-in boundary, not 404/500.
- `/api/cron/leads/aging`: HTTP 401 without auth.

## Findings / notes

- PR #75 only improves navigation from two older acceptance surfaces into the PR #73 overview/cockpit.
- No acceptance outcomes were recorded by ChatGPT.
- Authenticated production acceptance remains Hamilton-only.

## Safety boundary reaffirmation

No Prisma schema changes, Neon migrations or branch mutations, feature-flag changes, live GHL workflow activation or API calls, live import/export submission, Lead claim/DNC/ownership/approval/suppression/two-way-contact business-rule changes, or Servicing/Commissions/Finance/payout/client-onboarding activation were performed.

No secrets, credentials, customer data, SSNs, tax IDs, or raw bank data were committed.
