# PR #131 — Build Guard Registry

Date: 2026-07-12/13 Pacific execution interval
Project: `hpintojr/crm.mcd`
PR: `https://github.com/hpintojr/crm.mcd/pull/131`
Merge commit: `28e88eb43ce9756d80cf26c8e70667fccfe3074d`
Production deployment: `dpl_9k2ihbsFrWetonu3LqGbevTAECCf`

## Evidence-backed gap

The Lead-flow build gate duplicated guard metadata in three places: a 3,000+ character shell chain in `package.json`, a copied deployment-verification pass-line array, and another copied pass-line array in the deployment-verification guard. PR #129 and PR #130 preview iterations exposed stale evidence-string failures after safe documentation refactors, confirming that this duplicated metadata could drift independently of application behavior.

## Implementation

- Added `config/build-guard-registry.json` as the reviewed source of guard IDs, local script paths, pass lines, execution membership, and deployment visibility.
- Registered the exact existing inventory:
  - 44 deployment-visible pass lines;
  - 43 scripts in the Lead-flow execution group;
  - the Lead-import response-contract check remains in the top-level build prelude and deployment visibility.
- Added `src/lib/build-guard-registry.ts` with typed derived lists for execution and deployment verification.
- Added `scripts/run-build-guards.ts` as a sequential non-shell runner.
- The runner uses the current Node executable with the local `tsx` loader, replays stdout/stderr, and fails on spawn error, signal, non-zero exit, or a missing registered pass line.
- Replaced the long `check:lead-flow-alignment` shell chain with the manifest runner.
- Derived deployment-verification runtime pass lines from the manifest instead of a copied executable array.
- Updated the deployment-verification guard to read and validate the source manifest.
- Preserved mature source-evidence assertions with clearly marked non-executable compatibility blocks in the runtime and guard sources. The registry self-check constructs the expected blocks from the manifest and requires exact matches.
- Preserved package-level script discoverability with a non-executable compatibility index. The registry self-check requires the index to exactly match the manifest's ordered script paths.
- Added `scripts/check-build-guard-registry.ts` to validate exact counts, unique IDs/scripts/pass lines, safe local paths, script existence, pass-line emission, execution order, non-shell behavior, package wiring, compatibility evidence, deployment derivation, and documentation.
- Added documentation, README/index wiring, and deployment-verification version `2026-07-13-pr131`.

## Validation

- The manifest-driven runner executed all 43 Lead-flow guards in their preserved order.
- Every guard exited successfully and emitted its registered pass line.
- Registry self-check: PASS.
- Vercel preview: READY.
- Commission Policy: PASS.
- Verify CRM: PASS.
- Application Build: PASS.
- Review threads: none.
- Squash merge completed as `28e88eb43ce9756d80cf26c8e70667fccfe3074d`.
- Production deployment `dpl_9k2ihbsFrWetonu3LqGbevTAECCf`: READY and aliased to `crm.mercurycalldesk.com`.
- Live `/api/status`: HTTP 200, environment `production`, branch `main`, exact PR #131 merge SHA.
- No-store, noindex, HSTS, CSP, anti-framing, MIME, referrer, permissions, opener, and framework-header suppression baselines remained intact.
- The new deployment had no error or fatal runtime logs during the verification window.

## Unchanged behavior

Every underlying guard remains a separate script with its existing assertions, output, and failure behavior. The top-level build still runs the existing Lead-import prelude checks, then the Lead-flow group, Prisma generation, and the Next.js production build.

## Safety boundary

The manifest, runner, and checks operate on repository source and local child processes only. No application endpoint was invoked, no production data was queried or mutated, no import/export/controlled test/cron/signup/activation/webhook was run, no GHL call was made, no feature flag or setting was changed, no migration was applied, and no Servicing, Commission, Finance, payment, or payout action was performed.

## Next safe work

Add a protected, source-derived Build Guard Registry control plane showing manifest version, review date, exact guard order, execution membership, deployment visibility, script paths, pass lines, and aggregate totals. It must use static manifest data only, require an Admin role, expose role-only viewer metadata, and perform no database access or mutations.