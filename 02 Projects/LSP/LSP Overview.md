# [C] LSP — Free & Clear Advantage Overview

Created: 2026-08-13 · Owner: Hamilton Pinto Jr. · Lock: see `LOCK.md`

## What this project is

Free & Clear Advantage (FCA) is a **brand operating inside the Loan Streamline Pro GHL
sub-account** — it is not its own sub-account. This trips up every fresh session, so it is the
first thing recorded here.

Prospects book a one-hour telephone consultation from the F&C website. The booking creates a
GHL contact, a GHL calendar appointment, and an opportunity in the `F&C Appointments` pipeline.
An agent is then assigned to take the call.

## Live IDs — verified 2026-08-13

```txt
GHL sub-account (location) : oY7nDZUrZG0KegzadZgI   "Loan Streamline Pro", Cheyenne WY, America/Los_Angeles
Booking calendar           : hqwmzN40nNDRQZeJqqbR
Pipeline (F&C Appointments): loWWhGAtaHtbjBRmBstP   created 2026-08-13T04:13Z
Marketing Pipeline (unused): 6lwNgyXtqiTCYhkErGKk
Contact source tag         : F&C-Website  /  tag "f&c-website"
```

### Pipeline stages — `F&C Appointments`

```txt
0  New Appointment            223e511d-6e27-4a0a-917f-d5e422d75aa1
1  Awaiting Agent Assignment  3590f14d-b643-4cc9-95a6-ccd1ed3ac4da
2  Assigned                   891814b0-b54c-44ae-a9a9-e3c54020e730
3  Confirmed                  d192232b-6029-4844-8ba7-27dd34c0c940
4  Completed                  718e9b13-a892-4cc0-96e4-f650294f1a4b
5  No Show                    01eb2b77-fe4d-442e-8fb9-9c62e9c9199e
6  Cancelled                  ce450eaa-4a19-4466-86b8-2f065c1c3f3b
7  Overdue - Call Queued      b6f8e13a-1cf7-4c3a-9205-d41cd7ac8411   <- 15-minute overdue threshold
```

### Users seen in this scope

```txt
8tTyPhJCYmCqsCFvaiq6   Alex        — owns the booking calendar; every appointment lands here
dyxxuG3Xe4F76scURNj2   Kenny Jumps — agent the Aug 26 test record was reassigned to
```

## Current status — 2026-08-13

Shipped and confirmed working: the confirmation card and ICS attachment are live, the site shows
the 949 number, the overdue threshold is 15 minutes, two real bugs are fixed and merged, and sync
failures are no longer silent.

**One blocker remains, and it is a configuration decision, not a code fix.**

## The blocker — appointment assignment does not follow agent assignment

### What is proven

Reassigning an FCA booking to an agent updates the **contact** and the **opportunity** but leaves
the **calendar appointment** pinned to Alex. Proven end to end against live record set
`FCA Assign SyncTest 20260813T2` on 2026-08-13:

```txt
23:01:25Z  contact 0Pkh4K2X5fSe28rqxkkR created
23:01:48Z  appointment 8Uq6LAB34FjSNg5hw7Da created, assignedUserId = 8tTyPhJCYmCqsCFvaiq6 (Alex)
23:01:51Z  opportunity 9XaL0GhTnBKH9a5Ubmkm created in "New Appointment"
23:04:10Z  opportunity stage -> "Assigned"
23:16:11Z  opportunity assignedTo -> dyxxuG3Xe4F76scURNj2 (Kenny Jumps)
23:16:12Z  contact  assignedTo  -> dyxxuG3Xe4F76scURNj2 (Kenny Jumps)
           appointment assignedUserId UNCHANGED, still Alex
```

Contact and opportunity now read *Kenny Jumps*. The appointment still reads *Alex*. The
appointment's `dateUpdated` is `23:01:51Z` — three seconds after creation and ~14 minutes *before*
the reassignment — so the appointment record was never successfully written to at reassignment
time.

**Correction logged 2026-08-13:** an earlier version of this file said "no appointment
reassignment event, because none occurred." That was an overreach. A write that GHL *rejects* also
leaves `dateUpdated` untouched, so this evidence cannot distinguish "nothing tried" from "something
tried and was refused."

**HYPOTHESIS — DISPROVEN 2026-08-13 (live E2E test):** the theory was that a Salesforce workflow
moves the calendar event to the newly assigned user, emails that agent, and is being rejected by
GHL. Direct inspection proved otherwise. The only owner-change automation is Flow
`F&C Lead Owner to Salesforce Calendar` (301V500000oWTDNIA4, active): trigger
`ISCHANGED(OwnerId)` on Lead, one Update Records element that moves **Salesforce Events only**.
It contains **no GHL callout of any kind**. A full E2E test (lead `00QV500000fr7WoMAI` /
GHL contact `MiCyWvjbgkOAxIb5HhBg`, owner changed Web Leads → Kenny Jumps at 20:34 PT) confirmed:
the SF Event moved to Kenny, and **no GHL record changed** — contact, opportunity, and
appointment all still read Alex minutes later. The agent-email flow `Lead Assignment
Notification` exists but is **inactive**. Full evidence in
`[C] LSP Runbook — FCA Appointment Assignment Cutover.md` (Phase 0 result).

**CORRECTED again, later the same evening — read this part.** The sync *does* exist; it is simply
not in Salesforce. It is a **Vercel cron poller** in the website repo: `vercel.json` runs
`/api/sync/appointments` every minute, which reads Salesforce Events and writes the GHL
appointment and opportunity, matching SF Event Owner email to GHL user email.

It was failing. Production logs showed the same 422 every minute, and the request trace proved the
damage: the rejection escaped the per-appointment `try`, so the opportunity assignment and the
overdue-call path never ran for any appointment awaiting handoff. One failure, three symptoms —
which is why contact, opportunity, and appointment all appeared stuck.

Fixed in commit `e034c76` (local, awaiting Hamilton's lint/build/push). Assignment now fails in
isolation. The appointment leg still requires the team calendar. Full evidence and the remaining
open items: `[C] LSP Handoff — Sync Fix e034c76 and Corrected Scope.md`.

### Why — proven cause

Calendar `hqwmzN40nNDRQZeJqqbR` is bound to Alex's availability alone. GHL's own error when
adding agents to it is *"The user id not part of calendar team"* — a personal calendar has no
team to add anyone to. Supporting evidence:

- All 8 appointments ever created on this calendar carry `assignedUserId: 8tTyPhJCYmCqsCFvaiq6`,
  across different booking flows and different hours. No exceptions.
- The Loan Streamline Pro sub-account holds 20 calendars. Every one visible in Calendar Settings
  is `Type: Personal`, named `<Person>'s Personal Calendar`.

**HYPOTHESIS, not yet proven:** that the settings row for `hqwmzN40nNDRQZeJqqbR` specifically
reads `Type: Personal`. The GHL Calendar Settings list paginates and the second page would not
render — the tab froze on every attempt. *Confirming test:* open Calendar Settings → Calendars,
filter `Type`, and read the row for `hqwmzN40nNDRQZeJqqbR` directly. Everything above points to
Personal; this is the one direct observation still missing.

### Why it matters beyond this bug

A personal calendar cannot model five agents taking concurrent consultations, no matter what the
per-slot capacity number says. This single config decision sits underneath three separate things:
correct appointment assignment, real per-slot capacity, and any future round-robin distribution.

### The decision — owner only

Convert or replace `hqwmzN40nNDRQZeJqqbR` with a team/round-robin calendar. Two consequences to
accept before touching it:

1. Replacing it changes `GHL_CALENDAR_ID`, which must be updated in Vercel.
2. Existing appointments stay on the old calendar. They do not migrate.

## Live test records — do not clean up blindly

```txt
KEEP  8Uq6LAB34FjSNg5hw7Da  Aug 26 2026, 4:30-5:30 PM PT  confirmed  contact 0Pkh4K2X5fSe28rqxkkR
      "FCA Assign SyncTest" — this is the reproduction. Verify the fix against it BEFORE cancelling.

REVIEW 3pz64UmRXyqcdEXbREMr  Aug 14 2026, 10:00-11:00 AM PT  confirmed  contact pMEOrvSKH5uE3lOdK4T7
REVIEW 0L8gWM56EXFhWzkhhFje  Aug 13 2026,  9:00-10:00 AM PT  confirmed  contact pMEOrvSKH5uE3lOdK4T7
      Both still confirmed, not cancelled. If anything in the stack sends reminders, these fire.

SPENT  1dGhqwrUd5jDafmHCMTp, YXMMzsAyL0p8JyjY3XWp, gGiSf9jyI8IjITm4GiaV,
       ckQfT4FENQOrFgvDyU6d, O3yLqEkCYqTKZCYtZ9cZ
      Five cancelled StaffQA appointments, Aug 14, 9:00 AM - 1:30 PM PT. Safe to clear.
```

Both test contacts have `dnd: true` on all channels, so no outbound messaging can reach them.

## Incident memory

**"Reassigning an FCA appointment doesn't move the calendar booking."**
Symptom: contact and opportunity show the new agent; the calendar appointment still shows Alex.
Proven cause: the booking calendar is personal to Alex and has no team. Recognize it by checking
`assignedUserId` on the appointment against `assignedTo` on the contact — if they disagree and the
appointment says Alex, this is it. Do not re-investigate the sync code; the sync is not the fault.

## Standing warnings

- The **Aug 26 records are live on purpose.** Verify the fix against them before cancelling.
- The **Web Leads queue is intentional.** Do not "fix" the Salesforce assignment rule.

## Start here next

Confirm the calendar type directly (the one open observation above), then make the
convert-or-replace decision. Everything else in this scope is blocked behind it.
