# MCD CRM — Build Specs Index & Roadmap
**Updated:** 2026-07-01  
**Read first:** `[C] AI Handoff & Scope Review.md`  
**Implementation record:** `[C] Implementation Status — 2026-07-01.md`

## Delivery model

- GitHub `main` is the production source branch.
- Vercel deploys from `main`.
- Neon migrations are staged, reviewed on a safety branch, and require explicit approval before production application.
- Do not enable a database-backed feature flag until its migration, build, and controlled production test are complete.

## Status legend

- `DONE` — implemented and supported by the applied production schema.
- `SOURCE READY` — implemented in `main`; verify latest deployment before relying on it operationally.
- `STAGED / GATED` — implementation and/or migration exists, but production database tables or feature flags are intentionally disabled.
- `PARTIAL` — an important portion exists; live integration remains incomplete.
- `OUTLINE` — scoped but not built.
- `LATER` — intentionally deferred.

## Slice map

```txt
00  Foundation + public signup → GHL ....................... DONE
01  Auth.js v5: login, roles, MFA, activation ............. DONE
02  Admin applicant review + GHL approve tag .............. DONE
03  Inbound GHL webhooks + provisioning ................... DONE
04  Agent portal + Stripe Connect onboarding .............. PARTIAL
05  Certification + activation gating ..................... SOURCE READY
06  Leads engine: pools, atomic claim, rules .............. STAGED / GATED
07  Lead workspace: call/disposition/callback ............. STAGED / GATED
08  Demo booking handoff to GHL ............................ PARTIAL / GATED
09  Funding relay + commission engine ..................... STAGED / GATED
10  Client accounts + servicing cadence ................... STAGED / GATED
11  Finance: payout batches + Stripe payouts .............. STAGED / GATED
12  Lead ingestion (Python) + Sequenzy nurture ............ OUTLINE
13  Compliance/DNC + audit viewer + retention ............. PARTIAL
14  Admin Command Center + reporting + alerts ............. PARTIAL
15  System settings, feature flags, seed, tests ........... PARTIAL
```

## Required rollout order

```txt
1. Verify current Vercel main deployment.
2. Verify owner activation and admin access.
3. Apply lead engine migration on a Neon safety branch.
4. Apply lead integrity migration on that safety branch.
5. Controlled lead tests: import, approval, claim race, callback, DNC, release, inbound appointment.
6. Obtain approval, then apply lead migrations to Neon production.
7. Enable LEADS_ENABLED only after production tests pass.
8. Stabilize leads and GHL workflow mapping.
9. Test client/service/ledger migration on safety branch.
10. Apply client/service/ledger schema only after explicit approval.
11. Enable servicing, commissions, and finance separately after their test suites pass.
```

---

## §05 — Certification + activation gating (`SOURCE READY`)

```txt
Implemented:
- Certification record and manager scorecard flow.
- APPROVED_FOR_LIVE can enable Agent.canClaimLeads.
- Approved / active agents without lead eligibility are visible in the command center.
- Audit logging is in place.

Still needed before final sign-off:
- Formal activation-checklist model mirroring the manager new-hire checklist.
- Explicit owner countersignature workflow before ACTIVE where required by policy.
- Latest-head Vercel verification.
```

## §06 — Leads engine: pools, atomic claim, protection rules (`STAGED / GATED`)

```txt
Implemented in source:
- Lead, LeadClaimEvent, LeadActivity, LeadNote, LeadCallback, and LeadSuppression models.
- Admin controlled intake endpoint and validation queue.
- Atomic claim path, ownership controls, capacity logic, return/release rules, and audit records.
- Lead migration plus foreign-key integrity migration.

Approved rules encoded:
- Cold lead protection begins only after documented two-way contact.
- Documented referral is protected on entry.
- Cold lead without demo is eligible for OpenPool after 45 days from two-way contact.
- Demo-booked record does not return to OpenPool.
- DNC/suppression prevents claim and outbound sales/marketing use.

Blocking condition:
- Lead tables are not yet applied in Neon production.
- LEADS_ENABLED remains false.
```

## §07 — Lead workspace: call / disposition / callback (`STAGED / GATED`)

```txt
Implemented in source:
- Protected agent queue and query-based workspace.
- Ownership-gated call logging, internal notes, callbacks, dispositions, DNC, release, activity timeline, and audit writes.
- Client action panel using server-authorized endpoints.

Rules encoded:
- Business records only; server-side ownership checks are required.
- Call is blocked after DNC/suppression.
- Meaningful notes are required for outcomes and callbacks.
- DNC suppresses immediately.

Blocking condition:
- Depends on §06 lead tables and LEADS_ENABLED.
```

## §08 — Demo booking handoff to GHL (`PARTIAL / GATED`)

```txt
Implemented in source:
- Booking-attribution helper for Mini CRM lead/agent/originating-agent/pricing fields.
- Inbound appointment relay design for booked, confirmed, rescheduled, cancelled, no-show, and completed events.
- GHL remains backend-only; agents do not receive GHL access.

Still required:
- Verify exact live GHL appointment creation endpoint, calendar connection, and request shape.
- Implement outbound contact/opportunity/appointment creation only after that verification.
- Test no-show recovery and original-agent credit preservation.
```

## §09 — Funding relay + commission engine (`STAGED / GATED`)

```txt
Implemented in source:
- Funding payload validation, normalization, reconciliation, package schedule, revenue split, setup-target, and payout-timing helpers.
- Funding endpoint quarantines malformed enriched relay payloads rather than treating them as commission ready.
- Client/service/commission/payout migration is source-controlled.

Rules encoded:
- Commission is based on actual collected amount less tax, wholesale, and processing fee.
- 50/50 split is calculated on net commissionable profit.
- Setup fee uses the package setup-profit target.
- New-contract / setup timing requires cleared funds plus documented launch completion before the 30-day eligibility clock.
- Established recurring eligibility is 15 days after cleared funds.
- Refund/dispute conditions require holds; no automatic payout.

Blocking condition:
- Commission ledger schema is not applied.
- COMMISSIONS_ENABLED and FINANCE_ENABLED remain false.
```

## §10 — Client accounts + servicing cadence (`STAGED / GATED`)

```txt
Implemented in source:
- Client account, service activity, health, cadence, and violation models in the staged migration.
- Service cadence, health, escalation, and partner/House policy helpers.

Rules encoded:
- Healthy current-paying accounts are not reassigned merely for inactivity.
- Triggered client activity, payment issues, support issues, renewals, escalations, and documented resolution drive service action.
- Starter: biweekly then monthly; Growth: weekly then biweekly/monthly; Pro/Enterprise: weekly with one guaranteed hour.
- 60-day health-confirmation violation: first warning, second in rolling year may transfer to House.
- Three-day unexcused client-response escalation can trigger termination review.

Blocking condition:
- Client account and service tables are not applied.
- SERVICING_ENABLED remains false.
```

## §11 — Finance: payout batches + Stripe payouts + 1099 (`STAGED / GATED`)

```txt
Implemented in source:
- Payout eligibility policy, payout timing helper, staged destination/batch/line models, and finance preview calculator.

Required before activation:
- Stripe Connect Express credentials and verified live account/webhook contract.
- Ledger migration and finance approval UI.
- Controlled payout-batch tests using non-production/synthetic records.

Rules:
- Never auto-pay.
- Finance approval, cleared funds, eligibility date, no active hold, and ready payout destination are all required.
- The CRM stores only provider references; it does not store raw banking data.
```

## §12 — Lead ingestion (local Python) + Sequenzy nurture (`OUTLINE`)

```txt
Not built.

Target sequence:
- Local Python worker imports → normalizes → deduplicates → checks suppression → validates → scores → inserts into pending review.
- Admin validation routes a record to a lead pool or approved nurture campaign.
- Sequenzy campaign and suppression sync remain to be defined.
```

## §13 — Compliance/DNC + audit viewer + retention (`PARTIAL`)

```txt
Implemented:
- Internal lead suppression model and DNC action path.
- DNC channel policy: calls, SMS, sales email, marketing email, and social DMs blocked; transactional/billing/security/outage contacts are distinct.
- Audit history page and role-protected CSV audit export.
- Security headers and server-side authorization guards.

Not yet built:
- Consent records, national/state DNC operational process, retention job, legal hold, and privacy-request workflow.
```

## §14 — Admin Command Center + reporting + alerts (`PARTIAL`)

```txt
Implemented:
- Command center with onboarding, invitation, integration error, webhook failure, and certification counts.
- Integration-error review, audit review, user administration, module readiness, and finance-preview surfaces.

Blocked by staged schema:
- Lead pool counts, SLA breaches, demo activity, MRR, commission liability, House revenue, and funding reconciliation widgets.
- Notification delivery channels.
```

## §15 — System settings, feature flags, seed, tests (`PARTIAL`)

```txt
Implemented:
- Server-side feature gates for leads, commissions, servicing, and finance.
- Environment template documents safe default-off flags and configurable lead capacity/OpenPool duration.
- Source-controlled migrations for the next rollout sequence.

Still required:
- Admin-managed settings UI.
- Versioned seed data for packages/commission plan.
- Vitest unit coverage and Playwright end-to-end coverage.
- Migration/rollback runbook, error monitoring integration, and documented production test evidence.
```
