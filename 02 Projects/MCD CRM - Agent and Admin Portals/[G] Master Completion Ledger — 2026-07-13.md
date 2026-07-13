---
type: completion-ledger
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
created: 2026-07-13
owner: Hamilton Pinto Jr.
executor: ChatGPT
evidence_cutoff: 2026-07-13T17:08:00Z
---

# [G] MCD CRM — Master Completion Ledger

## Purpose and status vocabulary

This is the durable evidence ledger required for end-to-end completion. It is not a claim that the project is finished. No item is marked `COMPLETE` or `VERIFIED COMPLETE` without linked evidence.

- **VERIFIED COMPLETE** — implementation, automated and applicable browser/disposable evidence are current.
- **COMPLETE** — implementation and source evidence exist; remaining verification is explicitly listed.
- **OWNER DECISION REQUIRED**, **CREDENTIAL OR ACCESS REQUIRED**, **EXPLICITLY DEFERRED BY OWNER**, **PROHIBITED PRODUCTION ACTION**, and **NOT APPLICABLE** are final blocking/disposition states.
- **PENDING VERIFICATION** is a working-only status. It must resolve to a final status before launch sign-off.

## Authoritative verified baseline

| Item | Evidence | Status |
|---|---|---|
| Application main | `640009d995928f0ba218cbdf29ca02eaa6654453`, PR #137 merged 2026-07-13 | VERIFIED COMPLETE |
| Production deployment | Vercel `dpl_3cnnVbeGcwcUVUKmecWuwirurrUe`, READY, production alias present | VERIFIED COMPLETE |
| Live status | `/api/status` returned 200, production/main/exact SHA; no-store/noindex, CSP, HSTS, frame, MIME, permissions, opener, and referrer headers verified at 2026-07-13T17:07Z | VERIFIED COMPLETE |
| Current deployment errors | Vercel error/fatal query for `dpl_3cnn…` from deployment completion through ledger creation returned no results | VERIFIED COMPLETE |
| Build | Vercel build completed; error-only output has no error event | VERIFIED COMPLETE |
| CI signal | Commit combined status reports Vercel success. GitHub connector did not return PR-triggered run data for the merge commit; PR #137 evidence records all PR checks passing before merge. | COMPLETE |
| PR #138 hypothesis | No PR #138 exists in either named repository; actual latest application PR is #137. | COMPLETE |
| Production database | Neon project `mcd-crm-production`, main branch ready; current tables and migration registry inspected read-only. | COMPLETE |
| Feature flags | No feature/settings table exists in production schema. Runtime/environment flag state still needs read-only source/config verification; no production flag may be changed. | PENDING VERIFICATION |

## Product ledger

| Area | Current implementation/evidence | Status | Remaining work / restriction |
|---|---|---|---|
| Public experience | Live landing page visually inspected at desktop; status endpoint verified. | COMPLETE | Inspect responsive, error, and keyboard states. |
| Authentication | Disposable browser + database suite covers credentials, generic failure, MFA, lockout, logout, suspended sessions, and role change (PRs #134–#137). | COMPLETE | Add expired-lock recovery and suspended/offboarded correct-password denial in the approved disposable scope. |
| Signup and activation | Request-boundary and atomicity hardening shipped in PRs #113–#114. | COMPLETE | Browser/disposable workflow inventory still required; production mutation prohibited. |
| Admin / owner portal | Protected operational surfaces and registries exist. | COMPLETE | Role-by-role visual and accessibility inspection required with synthetic/local accounts. |
| Manager workflows | Claim boundary behavior is guarded. | COMPLETE | Disposable workflow and responsive review required. |
| Agent portal | Landing, workspace, Lead access, denied Admin crossing, and stale role behavior have disposable coverage. | COMPLETE | Mobile and empty/error-state inspection required. |
| Lead intake / importing / pools / claiming | Source guards and production-safe workflows exist; legacy import writer retired. | COMPLETE | No production imports/claims/releases; disposable concurrency and lifecycle proof remains to inventory. |
| Two-way contact / click-to-call / callbacks / suppression | Source guard and acceptance evidence exist. | COMPLETE | Broader disposable edge-case verification required. |
| Closed Won / appointments / GHL handling | Handlers and replay/request-boundary hardening shipped. | COMPLETE | Local mock/simulator matrix required; live GHL prohibited. |
| Client servicing | Tables present, but production enablement and onboarding are gated. | PROHIBITED PRODUCTION ACTION | Disposable migration/workflow review; owner approval before production enablement. |
| Commissions / finance | Production Commission/Payout schema remains staged only. | PROHIBITED PRODUCTION ACTION | Disposable migration/recovery verification; owner decision and migration approval required. |
| Audit / reports / exports | Read-only dashboards, audit boundaries, and CSV protections shipped. | COMPLETE | Authorization, accessibility, and broad browser inventory required. |
| Settings / readiness / integration health | Read-only control planes exist. | COMPLETE | Read-only configuration-state verification and UX inspection required. |

## Engineering ledger

| Area | Evidence | Status | Remaining work |
|---|---|---|---|
| Frontend / backend baseline | PRs #103–#137, Vercel READY production. | COMPLETE | Route inventory and human inspection. |
| Database schema / migrations | 23 production tables; four applied migration-registry entries; no feature-config tables. | COMPLETE | Compare current Prisma schema and staged migration against production/catalog. |
| Constraints / concurrency | Atomic activation, webhook retry, Lead and import guards documented in merged PRs. | COMPLETE | Expand disposable concurrency tests for remaining mutating workflows. |
| Authentication / authorization | Current-database user status and role enforcement proven in PR #137 disposable suite. | COMPLETE | Account-state edge coverage is next. |
| Session / request / response security | Headers and route-boundary registry evidence, zero route findings. | COMPLETE | Verify login headers/redirect/no-cache behaviour live; broaden negative request cases. |
| Error handling / logging / observability | Current deployment has no error/fatal entries. Historical clusters include expected invalid-credential events and prior Neon readiness failures. | COMPLETE | Determine whether historical authentication logging should be reduced without losing security evidence; trend current deployment. |
| Performance / reliability | Current deployment READY; historical cron readiness failures recorded. | PENDING VERIFICATION | Evaluate current database connection reliability and existing retry proof; no settings changes. |
| Accessibility / responsive / browser compatibility | Landing page desktop visual evidence captured. | PENDING VERIFICATION | Required route/role/viewport/keyboard/200% zoom matrix. |
| Automated / integration testing | PR #137 records build, guards, authenticated E2E, and persisted assertions passing. | COMPLETE | Run/reconstruct current suite through CI because local source checkout is unavailable in this environment. |
| Deployment / environment separation | Vercel project and production alias verified. | COMPLETE | Read-only environment/preview separation review. |
| Backup / restore / RLS / least privilege | Not verified. | PENDING VERIFICATION | Read-only Neon configuration and documented owner decision packet. |
| Dependency security | Not verified. | PENDING VERIFICATION | Inspect manifest and lockfile through GitHub source; run supported audit/CI if available. |
| Documentation / runbooks | Lock, protocol, daily logs, status documents, and PR #137 log read. | COMPLETE | Reconcile stale Overview and add final links. |
| Operator onboarding / disaster recovery / launch | Partial runbooks exist. | PENDING VERIFICATION | Build final launch and owner-action package. |

## Confirmed findings

| Classification | Finding | Evidence | Next action |
|---|---|---|---|
| DOCUMENTATION GAP | The project Overview is stale (2026-07-10 / PR #79) while LOCK.md and the PR #137 daily log are current. | Direct document comparison on 2026-07-13. | Reconcile after the next focused PR so the Overview points to the current baseline and ledger. |
| NOT A BUG | PR #138 was named as a hypothesis but does not exist in either named repository. | Direct GitHub PR lookup and cross-repository search returned no PR #138. | Use PR #137 as the authoritative current baseline. |
| MEDIUM | Seven-day runtime error aggregates include historical expected invalid-login errors and historical Neon readiness failures. | Vercel runtime error clusters queried 2026-07-13. | Scope logs to each active deployment and inspect auth logging source before changing behavior. |
| PROHIBITED PRODUCTION ACTION | Servicing and Commission/Finance rollout remain gated; production migrations/flags/data actions are not authorized. | LOCK.md, production restrictions, and Neon catalog. | Use disposable branches/tests only; prepare owner decision packet. |
| ACCESS REQUIRED | Shell network access cannot clone the repository; GitHub connector remains the approved source/edit path. | Direct clone failed with network connection denial. | Use connector-backed source retrieval and GitHub/Vercel CI evidence. |

## Immediate execution queue

1. **In progress:** expand the localhost-only authenticated E2E suite for expired lock recovery plus suspended/offboarded account-state denial, retaining all current safety sentinels.
2. Verify source and CI evidence for that focused change, merge only with green required checks, and verify its exact production deployment.
3. Reconcile Overview, Index, LOCK, and daily log after the PR.
4. Continue with the next evidence-backed risk item: current-deployment runtime reliability and configuration/state verification.
5. Maintain the browser, accessibility, responsive, and route/role matrix here as evidence is collected.

## Production restrictions carried forward

No production migration, flag/configuration change, live GHL workflow, real Lead/Client/Service mutation, import/export, controlled-test apply, onboarding activation, secret change, payment/payout action, or money movement is authorized by this ledger.
