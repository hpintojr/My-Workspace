# [C] LSP Handoff — Sync Fix `e034c76` and Corrected Scope

Created 2026-08-13 · Scope `lsp.fca` · Holder: Claude
Supersedes the build plan in `[C] LSP Proposal — Salesforce to GHL Assignment Sync.md`.

## The correction that matters

**The Salesforce→GHL sync already exists.** The proposal's premise — "no automation exists, build
one" — was wrong, and building the proposed `/api/agent-assignment` endpoint would have duplicated
working infrastructure.

It is not a Salesforce flow. It is a **Vercel cron poller** in the website repo:

```txt
vercel.json          cron "* * * * *"  →  /api/sync/appointments   (every minute)
route                app/api/sync/appointments/route.ts            (CRON_SECRET bearer auth)
logic                lib/integrations/appointment-sync.ts::syncAppointments()
direction            reads Salesforce Events → writes GHL appointment/opportunity
agent matching       Salesforce Event Owner email  ==  GHL user email
```

This is why Phase 0's Salesforce-side search found nothing: the sync was never in Salesforce. The
earlier Phase 0 conclusion ("no automation exists") is corrected here — it was true of Salesforce,
false of the system.

## The bug that was found — proven, not inferred

Production logs, every minute, 29 consecutive errors in a 30-minute window:

```txt
PARQ5xNTWpoHKDvhMUWh: GHL PUT .../appointments/PARQ5xNTWpoHKDvhMUWh failed: 422
  {"message":"The user id not part of calendar team."}
8Uq6LAB34FjSNg5hw7Da: same 422
3pz64UmRXyqcdEXbREMr: same 422
2ccRqD3msNvWQZJ8Nbjp: 400 {"message":"The event id is invalid."}   ← separate issue, see below
```

The Vercel request trace proves the consequence. For the E2E test appointment:

```txt
GET  /calendars/events/appointments/PARQ5xNTWpoHKDvhMUWh   86ms
PUT  /calendars/events/appointments/PARQ5xNTWpoHKDvhMUWh   422  185ms
     ← nothing further for this appointment; next line is a different appointment
```

Versus an appointment needing no assignment change:

```txt
GET  /calendars/events/appointments/0L8gWM56EXFhWzkhhFje
GET  /opportunities/search
PUT  /opportunities/KrE52bZD8TN2j4eQA3jp                   532ms   ← opportunity update RAN
```

The 422 escaped the per-appointment `try`, ending that iteration. Everything after the appointment
update — **the opportunity assignment and the entire overdue-call path** — silently stopped running
for any appointment awaiting handoff. One expected failure was taking down the parts that actually
reach the agent.

This also explains the E2E result cleanly: after reassigning to Kenny Jumps, contact, opportunity,
and appointment all stayed on Alex. Not three separate failures — one failure, three symptoms.

## What was changed — commit `e034c76` (local, NOT pushed)

```txt
lib/integrations/appointment-sync.ts
  - assignment now runs as its own PUT with its own catch
  - reschedule split out, so a rejected assignee no longer discards a legitimate time change
  - known "not part of calendar team" rejection collected in results.assignmentBlocked,
    separate from results.errors
app/api/sync/appointments/route.ts
  - assignmentBlocked logged via console.warn, so the backlog stays visible without
    marking an otherwise-healthy run as failed
.gitattributes  (new)
  - "* text=auto eol=lf"; Windows checkout was showing all 37 files as modified
```

Diff is 47 insertions / 9 deletions plus the renormalize. **This does not assign the appointment** —
that still requires the team-calendar cutover. It stops the collateral damage.

## What Hamilton needs to do

```txt
[ ] 1. cd D:\GitHub\freeandclearadvantage && npm install && npm run lint && npm run build
       (the sandbox cannot reach the npm registry, so this was not run)
[ ] 2. Review commit e034c76
[ ] 3. git push origin main   ← triggers an immediate production deploy
[ ] 4. After deploy READY, confirm in Vercel logs:
         - errors drop to the single 400 "event id is invalid" case
         - a new console.warn "appointment assignment blocked by calendar configuration" appears
         - PUT /opportunities/... now runs for PARQ5xNTWpoHKDvhMUWh and 8Uq6LAB34FjSNg5hw7Da
[ ] 5. Then verify in GHL: opportunity jpS8aIYSgPcl42LlnmYj should move to Kenny Jumps
       (appointment PARQ5xNTWpoHKDvhMUWh will still read Alex — expected until the calendar)
```

Step 4 is the real test of this fix: the opportunity update running is the proof.

## Still open — unchanged by this fix

```txt
1. TEAM CALENDAR (owner decision) — runbook Phases 1-3. Gates the appointment leg itself.
   Nothing else can fix "appointment still says Alex".
2. STALE EVENT 2ccRqD3msNvWQZJ8Nbjp — GHL returns 400 "The event id is invalid" on every run.
   A Salesforce Event references a GHL appointment that no longer exists. Permanent error until
   the Event is removed or the sync learns to prune it. Not addressed here; needs a decision on
   which side is authoritative.
3. GHL INTERNAL LEAD EMAIL (scope §47-50) — confirmed absent. Full-mailbox search for
   "Free & Clear Advantage Lead" returned nothing. Never built. Needs a GHL UI session.
4. GHL CUSTOM FIELDS (scope §31-32) — arrived empty on the E2E contact. Needs investigation:
   verify the GHL_CF_* env vars hold real field IDs before assuming the mapping code is wrong.
5. AGENT NOTIFICATION — Salesforce flow "Lead Assignment Notification" (V6) exists but is
   INACTIVE. Per constraint 1 agents are notified from Salesforce, so this is the right place;
   review its links for GHL URLs before reactivating.
6. GOOGLE ADDRESS AUTOCOMPLETE — no suggestion dropdown appeared during the E2E funnel run.
   City/ZIP still resolved correctly, so validation works; the autocomplete widget may not be
   wired up. Scope §12-19 expected suggestions. Unverified, worth a look.
```

## Test records — do not clean up

```txt
KEEP  PARQ5xNTWpoHKDvhMUWh  Aug 20 2:00 PM PT  — 2026-08-13 E2E test, freshest reproduction.
      SF lead 00QV500000fr7WoMAI (owner Kenny Jumps) / GHL contact MiCyWvjbgkOAxIb5HhBg /
      opportunity jpS8aIYSgPcl42LlnmYj. Verify the fix against this one first.
KEEP  8Uq6LAB34FjSNg5hw7Da  Aug 26 4:30 PM PT  — original reproduction.
REVIEW 3pz64UmRXyqcdEXbREMr Aug 14 10:00 AM PT — live confirmed, fires soonest.
Both test contacts carry dnd: true.
```
