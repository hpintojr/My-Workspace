# [G] 2026-07-12 MCD CRM PR #101 — Project Readiness Control Plane

**Holder:** ChatGPT  
**Scope:** `hpintojr/crm.mcd` + `hpintojr/My-Workspace`  
**Owner direction:** Hamilton instructed ChatGPT to continue coding, then asked for a full-project scope review and the best end-to-end workstream.  
**Completed:** 2026-07-12T05:49Z

## Outcome

ChatGPT completed a full-project audit, identified fragmented and stale cross-module readiness reporting as the highest-value owner-authorized workstream, and shipped PR #101 end to end.

PR #101 adds one protected, source-derived Project Readiness control plane instead of another Lead-only acceptance page. It consolidates deployment metadata, feature gates, latest acceptance evidence, integration health, production Client/Service schema state, and Commission/Payout migration state without applying a migration or opening any gate.

## Full-project audit findings

### Lead Flow

- Core Lead Flow, controlled import, activity-first Cold Leads, two-way-contact claim gating, DNC/suppression, aging, warm replies, GHL relay hardening, and audit/readiness tooling are built.
- The 18-step production acceptance runbook and Hamilton's owner production decision are recorded PASS.
- The project had continued accumulating Lead acceptance UI after the acceptance decision, while top-level module status remained inconsistent.

### Client Servicing

- Closed Won onboarding, launch, service cases, healthy-account protection, and House-transfer controls are built.
- A read-only production catalog query confirmed all four expected raw-SQL tables are present:
  - `ClientAccount`
  - `ClientServiceActivity`
  - `ClientServiceCase`
  - `ClientServiceAssignmentEvent`
- Normal Servicing use and acceptance remain feature-gated and require a separate owner-authorized window.

### Commissions

- Eligibility, agent profiles, ledger review, hold/release policy, retirement/termination policy, and acceptance scaffolding are built behind the Commission gate.
- PR #100 corrected and safety-branch-tested the staged Commission/Payout migration.
- A read-only production catalog query confirmed all seven expected Commission/Payout tables are still absent and all current plus legacy Commission enum types are absent. This is a clean staged-only state, not partial schema drift.
- Production migration apply, Commission acceptance, and feature activation remain three separate owner decisions.

### Finance

- Finance remains a readiness-only boundary.
- No bank data storage, payment-provider execution, payout release, or money movement exists in this phase.

### Platform hardening backlog

The broader scope review also reconfirmed work that requires separate settings, secrets, or owner decisions rather than an ordinary code PR:

- Preview/production environment and secret isolation.
- Least-privilege database role and RLS decision.
- Structured error tracking/observability service.
- Authenticated login E2E smoke credentials and workflow.
- Neon autoscaling, backup retention, and recovery policy review.
- Live external GHL workflow/configuration changes.

## PR #101 implementation

**PR:** https://github.com/hpintojr/crm.mcd/pull/101  
**Head:** `2cb7bba4afdd8a7060f68a875428cd18334f56c3`  
**Squash merge:** `728bc8ac5cc324cc6c1b54523368a8891f00439b`

### New protected surfaces

- `/admin/project-readiness`
- `/api/admin/project-readiness`

The shared `src/lib/project-readiness.ts` snapshot reads only:

- Vercel runtime deployment metadata.
- Current feature-gate values.
- Latest Lead, Servicing, and Commission acceptance outcomes from `AuditLog`.
- Unresolved `IntegrationError` count.
- Failed `WebhookEvent` count.
- `information_schema` and PostgreSQL enum catalogs.

It classifies module/schema states without querying missing Commission business tables. Commission readiness distinguishes:

- `STAGED_ONLY`
- `SOURCE_ALIGNED`
- `PARTIAL_OR_DRIFTED`

It also checks exact expected Commission enum order and detects obsolete PR #99-era enum names and ledger columns.

### Navigation and status correction

- Linked Project Readiness from `/admin/command-center`, `/admin/operating-status`, and `/admin/settings`.
- Refreshed Operating Status to reflect completed Lead acceptance, live Client/Service schema, corrected-but-unapplied PR #100 Commission migration, and Finance readiness-only scope.
- Refreshed `README.md` and `docs/WORKSPACE.md` so the repository documentation matches current production reality.

### Guard correction

The deployed build already emitted:

- `Appointment Closed Won guard passed.`
- `Commission schema migration guard passed.`

but `src/lib/lead-deployment-verification.ts` and its guard did not list them. PR #101 added both existing lines plus:

- `Project readiness guard passed.`

New `scripts/check-project-readiness-guard.ts` is wired into `check:lead-flow-alignment` and the production build. It protects the page/API/helper/docs/navigation contracts and rejects mutation primitives in the readiness implementation.

## CI and preview verification

All four required gates were green before merge:

- `Commission Policy` — success.
- `Typecheck and contract guards` — success.
- `Application Build` — success.
- Vercel preview — `READY`, combined GitHub Vercel status success, and zero unresolved toolbar threads.

**Preview deployment:** `dpl_96eXj1HvnjmYgGme25BBpwd5bJEo`

Preview smoke:

- `/admin/project-readiness` returned HTTP 200 and correctly resolved to the secure sign-in boundary when unauthenticated.
- The route was not 404 and did not return a server error.

Two intermediate preview failures were corrected before merge:

1. An accidental non-existent `@types/nodemailer` version was restored to the repository baseline `^6.4.16`.
2. Existing protected copy markers in Command Center and Operating Status were restored while preserving the new readiness links/copy.

## Production deployment verification

- **Vercel deployment:** `dpl_6EZu9dPvUotdvPo2ekWNxf2y9dWY`
- **State:** `READY`
- **Target:** production
- **Git SHA:** `728bc8ac5cc324cc6c1b54523368a8891f00439b`
- **Aliases:** `crm-mcd.vercel.app`, `crm.mercurycalldesk.com`

Production build evidence included:

- `Project readiness guard passed.`
- Prisma Client generation success.
- Next.js compile success.
- Type/lint success.
- Static generation and serverless packaging success.

Live `https://crm.mercurycalldesk.com/api/status` returned HTTP 200 with:

- `environment: production`
- `branch: main`
- `commitSha: 728bc8ac5cc324cc6c1b54523368a8891f00439b`

Live unauthenticated `/admin/project-readiness` returned HTTP 200 at the secure sign-in boundary, confirming the protected route is deployed and not publicly exposing readiness data.

## Production catalog verification

A read-only query against Neon production `main` confirmed:

- Client/Service: 4 of 4 expected tables present.
- Commission/Payout: 0 of 7 expected tables present.
- Current Commission enum types: absent.
- Legacy Commission enum types: absent.

Expected control-plane interpretation:

- Client/Service schema: `SOURCE_ALIGNED`.
- Commission/Payout schema: `STAGED_ONLY`.
- No evidence of partial or legacy Commission schema drift.

## Safety boundary reaffirmation

- No migration was applied.
- No production DDL or DML was executed.
- No feature flag changed.
- No Lead, Client, Commission, acceptance, audit, or integration record was mutated by this work.
- No live GHL call or external workflow activation occurred.
- Servicing, Commissions, Finance, payout, and client onboarding were not activated.
- No payment-provider action or money movement occurred.

## Recommended next owner decisions

1. Decide whether to authorize a controlled Client Servicing acceptance window. This is the closest operational module to completion because its workflow and production schema already exist.
2. Separately decide whether to authorize a production apply plan for PR #100's Commission migration. Do not combine migration apply with Commission feature activation.
3. Choose the next platform-hardening priority requiring owner settings/secrets: preview-production isolation, least-privilege/RLS, structured error tracking, authenticated login smoke, or Neon scaling/backups.
4. Consider closing the old superseded draft PRs (#1 and #6–#17) as repository hygiene; they are not part of current production scope.
