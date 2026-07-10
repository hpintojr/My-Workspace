# MCD CRM PR77 — Acceptance Overview Board Runbook Links

## Summary

Shipped PR #77 in `hpintojr/crm.mcd`: `feat(leads): link acceptance overview from board and runbook`.

## Scope

Read-only navigation only. Added direct Lead acceptance overview links to remaining acceptance execution entrypoints so Hamilton/Claude can start from the overview cockpit without knowing the direct URL.

## Built

- Added `Acceptance overview` link to `/admin/leads/testing`.
- Added `Acceptance overview` link to `/admin/leads/acceptance-runbook`.
- Extended `scripts/check-lead-flow-alignment.ts` to guard both links.

## GitHub

- Branch: `pr-77-acceptance-overview-board-runbook-links`.
- PR: `https://github.com/hpintojr/crm.mcd/pull/77`.
- Base commit: `438b24fd4378edf2e0badf747956dc4c614bfd65`.
- Head commit: `3876f9eb4e813118972746ce60df50c4cd1043e0`.
- Squash merge / production commit: `a5c33b1c534899e9199f5c24474ec8d217409a01`.

## Required checks

- Vercel: success.
- Commission Policy: success, run `409`.
- Verify CRM: success, run `223`.
- Application Build: success, run `371`.

## Preview smoke

- Deployment: `dpl_5BgpE3iVXxuPWcZz4AqqZBpUoe5D`.
- URL: `crm-chqlzczu4-hamiltons-projects-f65eeb81.vercel.app`.
- `/api/status`: HTTP 200; branch `pr-77-acceptance-overview-board-runbook-links`; commit `3876f9eb4e813118972746ce60df50c4cd1043e0`.
- `/admin/leads/testing`: HTTP 200 sign-in boundary, not 404/500.
- `/admin/leads/acceptance-runbook`: HTTP 200 sign-in boundary, not 404/500.
- `/api/cron/leads/aging`: HTTP 401 without auth.

## Production smoke

- Deployment: `dpl_BsTdxcUHuMrAtGbE6ZY97RAodcBP`.
- Custom domain: `crm.mercurycalldesk.com`.
- `/api/status`: HTTP 200; environment `production`; branch `main`; commit `a5c33b1c534899e9199f5c24474ec8d217409a01`.
- `/admin/leads/testing`: HTTP 200 sign-in boundary, not 404/500.
- `/admin/leads/acceptance-runbook`: HTTP 200 sign-in boundary, not 404/500.
- `/api/cron/leads/aging`: HTTP 401 without auth.

## Safety boundary reaffirmation

No Prisma schema changes, Neon migrations or branch mutations, feature-flag changes, live GHL workflow activation or API calls, live import/export submission, Lead claim/DNC/ownership/approval/suppression/two-way-contact business-rule changes, or Servicing/Commissions/Finance/payout/client-onboarding activation were performed.

No secrets, credentials, customer data, SSNs, tax IDs, or raw bank data were committed.
