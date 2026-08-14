# [G] 2026-07-10 MCD CRM Claude Handoff Prompt After PR86

## Purpose

This file preserves the exact handoff prompt Hamilton can give Claude after ChatGPT completed the latest owner-authorized coding continuation.

## Current state

- Latest shipped PR: `hpintojr/crm.mcd` PR #86 — Owner decision prep guard.
- Latest production commit: `aa19a8d213b11c7671f049b5ff90f6e658865ab7`.
- Production deployment: `dpl_Hh8755Pm4vcNcd37PBekCRNYfqxV`.
- Production domain verified: `crm.mercurycalldesk.com`.
- `/api/status` confirmed production/main at `aa19a8d213b11c7671f049b5ff90f6e658865ab7`.
- `/admin/leads/owner-decision-prep` returned the unauthenticated sign-in boundary, not 404/500.
- PR #86 daily log commit: `2fa8106829f100d3b6fba743ca35ad70a9007df8`.
- ChatGPT handback log commit: `f7100021e0054e44a0830715cb41de7f919c92ef`.
- Lock returned to Claude commit: `08315c8d70cfbdae8a1e66c02ce498f057a49bf6`.

## Handoff prompt for Claude

```text
Claude, pick up the MCD CRM workspace from the latest ChatGPT handback.

Start by reading:
- `hpintojr/My-Workspace :: 02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md`
- `hpintojr/My-Workspace :: 01 Daily Logs/[G] 2026-07-10 MCD CRM PR86 Owner Decision Prep Guard.md`
- `hpintojr/My-Workspace :: 01 Daily Logs/[G] 2026-07-10 MCD CRM ChatGPT Continuation Handback 6.md`

Current lock state:
- Holder should be `claude`.
- Latest production commit should be `aa19a8d213b11c7671f049b5ff90f6e658865ab7` on `crm.mercurycalldesk.com`.

What ChatGPT shipped most recently:
- PR #84 added the protected read-only `/admin/leads/acceptance-diff` page.
- PR #85 added the protected read-only `/admin/leads/owner-decision-prep` page.
- PR #86 added guard coverage for `/admin/leads/owner-decision-prep` and wired the new guard into `check:lead-flow-alignment` plus the production build path.

Evidence from PR #86:
- Vercel Preview Comments: green.
- policy-check: green.
- Typecheck and contract guards: green.
- build: green.
- Production deployment `dpl_Hh8755Pm4vcNcd37PBekCRNYfqxV` reached READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status` returned production/main at `aa19a8d213b11c7671f049b5ff90f6e658865ab7`.
- `/admin/leads/owner-decision-prep` resolves to the sign-in boundary unauthenticated, not 404/500.
- Production build logs confirmed `Lead flow alignment guard passed.` and `Owner decision prep guard passed.`

Safety boundary that remained in force:
- Read-only/admin-navigation/guard scope only.
- No runtime app behavior changes in PR #86.
- No schema or database changes.
- No feature flag changes.
- No live external workflow/API activation.
- No live import/export submission.
- No real Lead claim, DNC, ownership, approval, suppression, or two-way-contact business-rule changes.
- No Servicing, Commissions, Finance, payout, or client-onboarding activation.

Still outstanding:
- Authenticated production acceptance is still Hamilton-only.
- Owner production decision is still Hamilton-only and must be recorded by Hamilton from the acceptance board when ready.
- Deferred/non-owner acceptance blockers still need Hamilton/operator review from the read-only pages before the owner production decision.
- Continue only within the authorized read-only/admin-navigation/guard scope unless Hamilton explicitly expands scope.

Recommended next safe work, if Hamilton says to keep coding without expanding scope:
- Add more read-only guard coverage for recently added pages that are not yet fully protected by focused scripts.
- Add read-only navigation/deep-link polish between acceptance overview, handoff, diff, owner prep, deferred runbook, and testing board.
- Add read-only summaries/tables only; do not create new mutation paths.
- Do not merge anything unless Vercel Preview Comments, policy-check, Typecheck and contract guards, and build are all green.
- After any merge, verify production with `/api/status`, smoke-test protected routes for sign-in boundary, write a `[G]` daily log, and return/update the lock.
```

## Notes

This file is informational only and does not change the CRM app or production state.
