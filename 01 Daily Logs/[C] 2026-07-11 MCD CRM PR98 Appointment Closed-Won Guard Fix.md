# [C] 2026-07-11 MCD CRM PR98 Appointment Closed-Won Guard Fix

**Holder:** claude · **Scope:** `hpintojr/crm.mcd` + `hpintojr/My-Workspace` · **Authorization:** Hamilton, in chat — "yes please provide fix and carry on with the rest of the project please code in bid slices and use a little human intervention as needed."

## What happened

Production QA validation (Task 6, GHL appointment event hardening, run earlier this session against controlled test Leads only) found a real business-rule gap: a booking-family GHL appointment webhook (`APPOINTMENT_BOOKED` / `APPOINTMENT_CONFIRMED` / `APPOINTMENT_RESCHEDULED`) arriving after a Lead had already reached `CLOSED_WON` would silently reopen it to `DEMO_BOOKED`. The existing `preserveClosedWon` guard in `src/lib/lead-appointment-attribution.ts` only covered recovery-family events (`APPOINTMENT_CANCELLED` / `APPOINTMENT_NO_SHOW`), asymmetric with the correctly-guarded opportunity-side code (`lead-opportunity-attribution.ts`). This was flagged in the QA report and Hamilton authorized the fix directly.

## Changes shipped — PR #98

- `src/lib/lead-appointment-attribution.ts`: extended `preserveClosedWon` to `(booked || recovery) && lead.lifecycle === "CLOSED_WON"`; booking-family events on an already-Closed-Won Lead are now ignored with a differentiated audit reason ("Ignored appointment booking event because the Lead was already Closed Won.") instead of silently downgrading the lifecycle.
- `src/lib/controlled-ghl-test-events.ts`: mirrored the identical fix into the harness's preview-computation logic so `/admin/integrations/test-events` correctly predicts the guard before apply.
- `scripts/check-appointment-closed-won-guard.ts` (new): regression guard asserting both files contain the corrected guard lines.
- `package.json`: wired the new guard into `check:lead-flow-alignment`, added standalone `check:appointment-closed-won-guard` script.

## CI and merge

- PR head commit `3da7ca17418eb0eb09bda01caf5a17405edfd0c8` on branch `fix/pr98-appointment-closed-won-guard`.
- All 4 required checks green: Vercel Preview Comments (success), policy-check / Commission Policy (success), Typecheck and contract guards (success), build (success).
- Squash-merged per standing convention (never merge on red/in-progress). Merge commit: `cc09697777cc7653e61acdb8c6506b50eaf86619`.
- Post-merge CI on `main` also green (build, policy-check, typecheck all success).

## Production deployment and smoke test

- Vercel deployment `dpl_Ez9BMzxMK99AnDwMp8aMRMNh23sn` for the merge commit reached `readyState: READY`, `readySubstate: PROMOTED`, `aliasAssigned` — confirmed live on `crm.mercurycalldesk.com` via the Vercel API (`VERCEL_GET_DEPLOYMENTS`). Note: `/api/status` served a stale cached snapshot for several minutes after promotion (its own embedded timestamp lagged); this looks like response/edge caching on that route, not a deployment problem — the Vercel deployment record is authoritative and confirmed correct.
- Re-ran the exact scenario that exposed the bug via the admin Controlled GHL Event Harness (`/admin/integrations/test-events`), against controlled test Lead `cmrgsb9j40000kw048twblbpq` ("MCD Opportunity Closed-Won Scenario Test", `CLOSED_WON`, unowned):
  - Preview for `APPOINTMENT_BOOKED` now correctly shows "Expected lifecycle: Closed won" and "Suppression / Closed Won guard: Closed Won preserved" (previously showed "Expected lifecycle: Demo booked").
  - Applied the simulation. Verified via read-only SQL: `Lead.lifecycle` stayed `CLOSED_WON`; new `AuditLog` row `GHL_APPOINTMENT_RECOVERY_PRESERVED`, reason "Ignored appointment booking event because the Lead was already Closed Won.", metadata `eventType: APPOINTMENT_BOOKED`, `callbackCreated: false`, `callbackExpedited: false`.
- No live GHL calls made, no real customer Leads touched — controlled test Lead only, same as original QA validation.

## Safety boundary reaffirmation

No Prisma schema changes, no migrations, no feature flags, no live external workflow activation, no live import/export, no Servicing/Commissions/Finance/payout/client-onboarding activation. This was a real Lead lifecycle business-rule change, which per `LOCK.md`'s "Not authorized" list requires Hamilton's authorization before action — that authorization was given explicitly in chat before this PR was opened, committed, or merged. No audit-trail data was mutated or corrected; only new rows were appended by the running application code.

## Remaining backlog

Per `LOCK.md`'s deferred acceptance list, still `DEFERRED` (not part of this fix): `runtime-error-log-check`, `dnc-blackout`, `no-answer-boundary`, `claim-responsibility-timer` — though note these were separately smoke-tested (PASS) in this session's QA validation report and may be ready to record as acceptance evidence pending Hamilton's review of that report. `ghl-appointment-hardening` and `ghl-opportunity-hardening` are also from that same QA pass — appointment hardening now has its one real gap fixed and reverified; opportunity hardening had no gap.
