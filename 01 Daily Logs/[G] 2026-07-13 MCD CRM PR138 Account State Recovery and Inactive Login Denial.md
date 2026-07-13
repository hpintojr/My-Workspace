# MCD CRM — PR #138 Account-State Recovery and Inactive Login Denial

## Date

2026-07-13

## Repository

`hpintojr/crm.mcd`

## Pull request

PR #138 — **Prove account-state recovery and inactive login denial**

## What changed

- Extended the localhost-only authenticated E2E workflow from six to eight synthetic identities.
- Added a separate synthetic Owner that proves the full expired-lockout recovery sequence: five wrong passwords, correct-password active-lock denial, bounded verified expiry, then successful Owner sign-in with reset `failedLogins` and `lockedUntil`.
- Added correct-password session-denial proof for a previously suspended User and a dedicated terminally disabled User.
- Added read-only persisted User/AuditLog assertions for the recovery sequence and inactive-account denial.
- Extended the source guard, seed safety contract, workflow variables, operator documentation, and Build Guard Registry baseline (`2026-07-13-pr138`; counts remain 46 deployment-visible entries, 45 Lead-flow executions, one build-prelude entry).
- Corrected the initial test fixture after CI exposed the schema fact that `UserStatus` has `DISABLED`, not `OFFBOARDED`. `OFFBOARDED` is an Agent-profile-only enum. No User schema migration was added or needed.

## Evidence

- PR: https://github.com/hpintojr/crm.mcd/pull/138
- Merge commit: `c7aadba2433c869fbfd1dd7175d0fd721b149085`.
- GitHub checks all passed: Verify CRM, Commission Policy, Application Build, and Authenticated E2E.
- Authenticated E2E completed its disposable PostgreSQL schema, eight-user seed, Chromium install, browser boundaries, and read-only persisted security assertions successfully.
- Vercel preview for PR head `fc2caeec0b5719dc9fc24f8d81088a9fcb61929e` was READY and returned HTTP 200 from `/api/status`.
- Production Vercel deployment: `dpl_E8fA5JUTMzrA7WKhq4NnXX1CrjjS`, READY, region `iad1`, aliased to `crm.mercurycalldesk.com`.
- Production `/api/status` returned HTTP 200 with environment `production`, branch `main`, and exact merge SHA; no-store, noindex, CSP, HSTS, anti-framing, MIME, permissions, opener, and referrer headers were present.
- Production build error-only output reported only “Build Completed”; Vercel returned no runtime errors for the selected deployment window.
- Chrome rendered the public Mercury Call Desk landing page and reported no console errors. No protected production route was authenticated or invoked.

## Still open

- Current-deployment runtime reliability, configuration/state verification, accessibility/responsive/keyboard matrix, route/role inventory, dependency review, backup/restore/RLS/least-privilege review, and final launch/owner-decision packet remain tracked in the Master Completion Ledger.
- Servicing and Commission/Finance production enablement remain prohibited: no staged migration, feature-flag change, real record mutation, live GHL workflow, payout, or money movement is authorized.
- `OFFBOARDED` User status is not an application capability; adding it would require a separately approved schema/product change. The supported terminal User status is `DISABLED`.

## Start here next

1. Use the Master Completion Ledger as the authoritative queue and update it after each verified PR or investigation.
2. Perform the next read-only evidence-backed work on current deployment reliability and configuration/state; do not change production settings.
3. Build the remaining synthetic/local browser, responsive, keyboard, and role-route matrix before any production acceptance action.
4. Require a specific owner instruction before any production migration, feature-flag change, real data mutation, GHL activation, payment action, or payout.

## Handback

ChatGPT completed and verified PR #138 under the execution lock. The application and workspace are reconciled to the PR #138 production baseline; execution authority returns to Claude under `LOCK.md` unless Hamilton directs another holder.