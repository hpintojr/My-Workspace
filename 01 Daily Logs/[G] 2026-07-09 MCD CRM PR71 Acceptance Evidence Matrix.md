# [G] 2026-07-09 MCD CRM PR71 Acceptance Evidence Matrix

## Summary

Shipped PR #71, `feat(leads): add acceptance evidence matrix`, to production.

This PR added a guarded, read-only Lead acceptance evidence matrix so Hamilton/Claude can review every acceptance step in one table instead of jumping between the handoff packet and the gaps-only view.

## Repository

- App repo: `hpintojr/crm.mcd`
- Workspace repo: `hpintojr/My-Workspace`
- PR: `https://github.com/hpintojr/crm.mcd/pull/71`
- Branch: `pr-71-acceptance-evidence-matrix`
- Base commit: `c630a95d1dc2b5338f9fb06d594d21f4958e485e`
- PR head: `2551a2551febd43c366bfc71de07dec36abe8df7`
- Squash merge / production commit: `de89982853c52ec1f54a55a9ea36fa4f15cd706b`

## Changes shipped

- Added `src/lib/lead-acceptance-matrix.ts`.
  - Derives the full acceptance matrix from the existing PR69 handoff packet.
  - Adds row number, record anchor, and gap status for each acceptance step.
- Added protected admin page `/admin/leads/acceptance-matrix`.
  - Server component.
  - `features.leads` gate.
  - `requireRole(ADMIN_ROLES)` gate.
  - `dynamic = "force-dynamic"`.
  - Marker: `data-acceptance-matrix="lead-flow"`.
  - Shows all acceptance evidence rows with status, title, ID, record timestamp, note, action link, runbook link, and acceptance-board record link.
- Added protected JSON endpoint `/api/admin/leads/acceptance-matrix`.
  - `requireRole(ADMIN_ROLES)` gate.
  - `Cache-Control: no-store`.
  - Read-only response only.
- Linked `/admin/leads/acceptance-matrix` from:
  - `/admin/leads/acceptance-handoff`
  - `/admin/leads/acceptance-gaps`
- Extended `scripts/check-lead-flow-alignment.ts` with guard assertions for:
  - Matrix model
  - Matrix page
  - Matrix API route
  - Handoff link
  - Gaps link

## Required checks

All required checks were green before merge.

- Vercel: success
- Commission Policy: success, run `397`
- Verify CRM: success, run `211`
- Application Build: success, run `359`

## Preview smoke

Preview deployment:

- Deployment ID: `dpl_4odBW5NRN7Bh6XhL61tcwb1VLpxV`
- URL: `crm-ofr4nf1dp-hamiltons-projects-f65eeb81.vercel.app`
- Branch alias: `crm-mcd-git-pr-71-acceptance-5225ac-hamiltons-projects-f65eeb81.vercel.app`
- Branch: `pr-71-acceptance-evidence-matrix`
- Commit: `2551a2551febd43c366bfc71de07dec36abe8df7`

Smoke results:

- `/api/status`: HTTP 200 and reported:
  - `environment: preview`
  - `branch: pr-71-acceptance-evidence-matrix`
  - `commitSha: 2551a2551febd43c366bfc71de07dec36abe8df7`
- `/admin/leads/acceptance-matrix`: HTTP 200 with expected sign-in boundary, not 404/500.
- `/api/admin/leads/acceptance-matrix`: HTTP 200 with expected sign-in boundary, not 404/500.
- `/api/cron/leads/aging`: HTTP 401 without auth.

## Production smoke

Production deployment:

- Deployment ID: `dpl_4RK98f7x9EHhaGVnCFBL36VpyEUd`
- URL: `crm-e79t3ta5b-hamiltons-projects-f65eeb81.vercel.app`
- Alias: `crm.mercurycalldesk.com`
- Commit: `de89982853c52ec1f54a55a9ea36fa4f15cd706b`

Smoke results on `https://crm.mercurycalldesk.com`:

- `/api/status`: HTTP 200 and reported:
  - `environment: production`
  - `branch: main`
  - `commitSha: de89982853c52ec1f54a55a9ea36fa4f15cd706b`
- `/admin/leads/acceptance-matrix`: HTTP 200 with expected sign-in boundary, not 404/500.
- `/api/admin/leads/acceptance-matrix`: HTTP 200 with expected sign-in boundary, not 404/500.
- `/api/cron/leads/aging`: HTTP 401 without auth.

## Safety boundary reaffirmation

No Prisma schema changes, Neon migrations or branch mutations, feature-flag changes, live GHL workflow activation or API calls, live import/export submission, Lead claim/DNC/ownership/approval/suppression/two-way-contact business-rule changes, or Servicing/Commissions/Finance/payout/client-onboarding activation were performed.

No secrets, credentials, customer data, SSNs, tax IDs, or raw bank data were committed.

## Handback notes

- Authenticated production acceptance remains Hamilton-only.
- PR #71 only added read-only matrix/navigation surfaces.
- Start authenticated review at `/admin/leads/acceptance-handoff` or `/admin/leads/acceptance-matrix`.
