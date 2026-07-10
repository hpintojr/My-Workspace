# [G] 2026-07-09 MCD CRM PR67 Acceptance History Navigation

## What I changed

Repository: `hpintojr/crm.mcd`

Merged PR: `#67` — `feat(leads): add acceptance history and runbook step navigation`

Head branch: `pr-67-acceptance-navigation-history`

Head commit before merge: `9b6e5569f9f583b8f2c8756575980340ce28323e`

Squash merge / production commit: `6c24a25bf425e10d1e5529af0835f4fc6e968543`

Scope shipped:

- Added `src/lib/acceptance-runbook-links.ts` with an explicit acceptance-step-to-runbook-section mapping.
- Added read-only `/admin/leads/acceptance-history` for the latest 200 immutable `LEAD_PRODUCTION_ACCEPTANCE_RECORDED` audit records.
- Added `/api/admin/leads/acceptance-history.csv` export using the same safe immutable export-audit pattern as the existing acceptance report CSV.
- Linked acceptance history from `/admin/leads/acceptance-command-center`, `/admin/leads/acceptance-report`, and `/admin/leads/testing`.
- Added mapped runbook links from command center per-step rows, report per-step rows, and acceptance board per-step cards.
- Added stable `id={step.id}` anchors on acceptance board step cards so command-center `Record` links can deep-link into the board.
- Extended `scripts/check-lead-flow-alignment.ts` with guard assertions for the mapping helper, history route, CSV export route, history links, runbook links, and acceptance-board anchors.

No changes were made outside the authorized read-only acceptance-navigation/content scope for `hpintojr/crm.mcd`.

## Findings cataloged

- The acceptance board uses 18 evidence steps from `leadProductionAcceptanceSteps`.
- The acceptance runbook uses 11 broader operational sections from `RUNBOOK_STEPS`.
- Direct links like `/admin/leads/acceptance-runbook#${step.id}` would not work for several evidence steps because the IDs do not match one-to-one.
- PR #67 resolved that by cataloging an explicit mapping in `src/lib/acceptance-runbook-links.ts`:
  - multiple release/domain readiness evidence steps map to `open-command-center` or `aging-preview`;
  - click-to-call evidence steps map to `click-to-call`;
  - no-answer maps to `no-answer-ownership`;
  - two-way-contact, claim timer, and My Workspace responsibility map to `two-way-contact-claim`;
  - controlled GHL appointment/opportunity evidence maps to `ghl-controlled-events`;
  - owner production decision maps to `owner-decision`.
- This keeps all new links valid after PR #66 added stable runbook section anchors.

## Evidence

Required CI/checks for PR #67:

- Vercel Preview Comments / Vercel deployment: success.
- Commission Policy (`policy-check` equivalent): success, run `389`.
- Verify CRM (`Typecheck and contract guards` equivalent): success, run `203`.
- Application Build (`build`): success, run `351`.

Preview smoke tests on `crm-jfo1rynqu-hamiltons-projects-f65eeb81.vercel.app`:

- `/api/status` returned HTTP 200 and reported:
  - `environment: preview`
  - `branch: pr-67-acceptance-navigation-history`
  - `commitSha: 9b6e5569f9f583b8f2c8756575980340ce28323e`
- `/admin/leads/acceptance-history` returned HTTP 200 with the expected sign-in boundary, not 404/500.
- `/admin/leads/acceptance-command-center` returned HTTP 200 with the expected sign-in boundary, not 404/500.
- `/admin/leads/testing` returned HTTP 200 with the expected sign-in boundary, not 404/500.
- `/api/cron/leads/aging` returned HTTP 401 without auth.

Production deployment:

- Vercel production deployment ID: `dpl_3G6NWfuvqh274ZfTqEx9XVjHQZin`.
- Production deployment became `READY` and aliased to `crm.mercurycalldesk.com`.

Production smoke tests on `crm.mercurycalldesk.com`:

- `/api/status` returned HTTP 200 and reported:
  - `environment: production`
  - `branch: main`
  - `commitSha: 6c24a25bf425e10d1e5529af0835f4fc6e968543`
- `/admin/leads/acceptance-history` returned HTTP 200 with the expected sign-in boundary, not 404/500.
- `/api/cron/leads/aging` returned HTTP 401 without auth.

## Safety boundary reaffirmation

PR #67 stayed inside the authorized scope:

- No Prisma schema changes.
- No Neon migrations or Neon branch mutations.
- No feature flag changes.
- No live GHL workflow activation.
- No live GHL API calls.
- No live import or export submission.
- No Lead claim, DNC, ownership, approval, suppression, or two-way-contact business-rule changes.
- No Servicing, Commissions, Finance, payout, or client-onboarding activation.
- No credentials, customer payloads, SSNs, tax IDs, or raw bank data committed.

The only write-capable endpoint added is the read/export endpoint `/api/admin/leads/acceptance-history.csv`, which mirrors the existing acceptance-report CSV pattern by writing an immutable export audit record only.

## Still open

The recommended backlog items from Hamilton's handoff are now effectively covered through PR #67:

- PR #66 runbook step anchors — shipped earlier as `53ecd2cf`.
- Command-center per-step runbook links — covered in PR #67.
- Acceptance history page — covered in PR #67.
- Acceptance report per-step runbook links — covered in PR #67.
- Acceptance history CSV export — covered in PR #67.
- Acceptance board per-step runbook links — covered in PR #67.

Authenticated production acceptance remains Hamilton-only and is still not recorded here. The acceptance gate remains `0 / 18` unless Hamilton records results through the authenticated board.

## Start here next

Start at `/admin/leads/acceptance-command-center` on `crm.mercurycalldesk.com` after Hamilton signs in. Use the new `How to test this step`, `Runbook`, `Record`, and `Acceptance history` links to navigate the acceptance process.

## Handback

ChatGPT still holds the temporary lock during the authorized window unless explicitly returned in `LOCK.md`. Latest production commit after this log: `6c24a25bf425e10d1e5529af0835f4fc6e968543`.
