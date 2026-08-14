# [C] LSP Runbook — FCA Appointment Assignment Cutover

Created 2026-08-13 · Scope `lsp.fca` · Read `LSP Overview.md` and `LOCK.md` first.

**Who runs this:** Hamilton, or an assistant with Hamilton at the keyboard. Phases 2 and 3 require
clicks inside the GoHighLevel calendar iframe and a Vercel environment-variable change. Neither can
be automated from a Cowork session — see "Tooling constraints" at the end before you plan around it.

---

## 0. Standing constraints — read before touching anything

```txt
1. AGENTS WORK ONLY IN SALESFORCE. Agents must never be sent into GoHighLevel, never receive a GHL
   login, and never see a GHL-branded notification. GHL is backend infrastructure. Any agent-facing
   email, link, or task in this flow originates from Salesforce.
2. The Aug 26 test records are LIVE ON PURPOSE. They are the reproduction. Verify the fix against
   them BEFORE cancelling them.
3. The Web Leads queue is intentional. Do NOT "fix" the Salesforce assignment rule.
4. No production migrations, payment, payout, or money movement in this scope.
```

Constraint 1 is not cosmetic — it changes the design. See §2.1.

---

## 1. Current state

Proven on live record set `FCA Assign SyncTest 20260813T2` (2026-08-13):

```txt
appointment  8Uq6LAB34FjSNg5hw7Da  assignedUserId = 8tTyPhJCYmCqsCFvaiq6  (Alex)
opportunity  9XaL0GhTnBKH9a5Ubmkm  assignedTo     = dyxxuG3Xe4F76scURNj2  (Kenny Jumps)
contact      0Pkh4K2X5fSe28rqxkkR  assignedTo     = dyxxuG3Xe4F76scURNj2  (Kenny Jumps)
```

Reassignment reached the contact and the opportunity. It did not reach the calendar appointment.
Booking calendar `hqwmzN40nNDRQZeJqqbR` is personal to Alex, so it has no team, cannot accept other
assignees, and cannot model five agents in concurrent slots.

Shipped and working: confirmation card + ICS, the 949 on the site, 15-minute overdue threshold, two
merged bug fixes, and sync-failure logging.

---

## 2. Phase 0 — Verify the Salesforce automation before changing anything

**Do this first.** It determines whether the remaining work is one config change or several.

### 2.1 Why this phase decides the design

Two different worlds, and they need different calendars:

| If… | Then the GHL calendar should be… |
|---|---|
| Salesforce decides which agent gets the booking | a **team calendar with all agents as members**, assignment driven externally. **Do NOT enable GHL round robin** — it would fight Salesforce for control of the same field. |
| GHL decides which agent gets the booking | a **round robin calendar** — but this conflicts with constraint 1, because distribution logic would then live where agents can't see it. |

The Salesforce-only rule points at the first row. Confirm it before building.

### 2.2 Steps

```txt
[ ] 0.1  In Salesforce, locate the workflow / flow / process that fires when an FCA appointment's
         assigned agent changes. Record: its exact name, type (Flow, Workflow Rule, Process
         Builder, Apex trigger), trigger condition, and last-modified date.

[ ] 0.2  Confirm it attempts to update the GHL calendar event's assigned user. Record the outbound
         call it makes: endpoint, method, and which GHL field it targets
         (expected: the appointment's assignedUserId).

[ ] 0.3  Confirm it then sends the agent-notification email. Record: template name, sender address,
         recipient logic, and every link in the body.

[ ] 0.4  CONSTRAINT CHECK — open that email template and verify no link points into GoHighLevel and
         no GHL branding appears. Agents must land in Salesforce. If any GHL link exists, log it as
         a defect and fix it before go-live.

[ ] 0.5  Read the sync-failure log shipped 2026-08-13 for entries near 2026-08-13T23:16Z — the
         moment the SyncTest record was reassigned to Kenny Jumps. Record what it says verbatim.

[ ] 0.6  Check Salesforce's own error/debug log for the same timestamp.
```

### 2.3 Interpreting the result

```txt
IF the workflow fired and was rejected (expect: "The user id not part of calendar team")
   -> The automation is complete and correct. The calendar is the ONLY blocker.
   -> Skip any sync development. Go to Phase 1.

IF the workflow fired and reported success but the appointment did not change
   -> GHL accepted and silently discarded the write, OR the workflow targets the wrong field/ID.
   -> Capture the request payload before proceeding. Do not assume the calendar is at fault.

IF no workflow fired at all
   -> The automation does not exist and must be built. The calendar change alone will NOT fix this.
   -> Re-scope with Hamilton before continuing.

IF no workflow exists but an email still reaches the agent
   -> Something else is notifying agents. Find it before building a second notifier.
```

Record the outcome here before moving on:

```txt
Phase 0 result: ____________________________________________
Evidence (log line / workflow name / timestamp): ____________
Decided by: __________________  Date: _______________________
```

---

## 3. Phase 1 — Confirm the calendar type

```txt
[ ] 1.1  GHL -> Settings -> Calendars -> Calendars tab.
[ ] 1.2  The list paginates. Go to page 2 and find the row whose Id is hqwmzN40nNDRQZeJqqbR.
[ ] 1.3  Read its Type column. Expected: Personal. Record what it actually says.
[ ] 1.4  Open it and check whether the edit view exposes any calendar-type control.
```

**Expected finding:** GHL fixes calendar type at creation. A Personal calendar generally cannot be
converted to Team/Round Robin in place. If there is no type control, this becomes a
create-new-and-cut-over job, not a conversion. That is the assumed path below.

```txt
Type observed: ____________  Convertible in place? Y / N
```

---

## 4. Phase 2 — Build the replacement calendar

Only after Phase 0 and Phase 1 are recorded.

```txt
[ ] 2.1  Settings -> Calendars -> New calendar.
[ ] 2.2  Choose a type that supports multiple team members.
         If Salesforce owns assignment (per §2.1): pick the team/collective type and do NOT turn on
         round-robin distribution.
[ ] 2.3  Name it distinctly so it is never confused with the old one, e.g.
         "FCA Consultation (Team)". Do not reuse the old name.
[ ] 2.4  Duration: 60 minutes. The existing FCA appointments are one-hour consultations.
[ ] 2.5  Add every agent who may take an FCA consultation. Pull the roster from
         Settings -> My Staff. Known so far: Alex (8tTyPhJCYmCqsCFvaiq6),
         Kenny Jumps (dyxxuG3Xe4F76scURNj2). The remaining names are UNCONFIRMED — confirm with
         Hamilton, do not guess.
[ ] 2.6  Set per-slot capacity to the real number of agents who can run concurrent consultations.
         This is the setting the old personal calendar could never honor.
[ ] 2.7  Mirror the old calendar's availability windows, buffers, and booking limits.
[ ] 2.8  Mirror notification settings — but per constraint 1, agent-facing email comes from
         Salesforce. Disable any GHL notification that would email an agent directly.
[ ] 2.9  Save. Copy the new calendar ID and record it here.
```

```txt
New calendar ID: ____________________________________________
Agents added: _______________________________________________
Per-slot capacity: __________  Duration: __________
```

**Do not delete or deactivate `hqwmzN40nNDRQZeJqqbR` yet.** Live appointments sit on it.

---

## 5. Phase 3 — Cut over (Hamilton only)

Environment variables are owner-only under Operating Protocol §8.

```txt
[ ] 3.1  Vercel -> the freeandclearadvantage project -> Settings -> Environment Variables.
[ ] 3.2  Update GHL_CALENDAR_ID to the new calendar ID from §4.
[ ] 3.3  Note which environments you changed (Production / Preview). Keep them consistent.
[ ] 3.4  Redeploy. Record the deployment ID.
[ ] 3.5  If the Salesforce workflow references the calendar ID anywhere, update it there too.
         Phase 0 step 0.2 tells you whether it does.
```

```txt
Old GHL_CALENDAR_ID: hqwmzN40nNDRQZeJqqbR
New GHL_CALENDAR_ID: ________________________  Deployment: ____________
```

---

## 6. Phase 4 — Verify (before any cleanup)

The Aug 26 record exists for exactly this. Use it.

```txt
[ ] 4.1  Book a NEW test consultation through the F&C website so it lands on the new calendar.
[ ] 4.2  In Salesforce, reassign that booking to a different agent.
[ ] 4.3  Confirm all THREE records now agree on the new agent:
           - GHL contact       assignedTo
           - GHL opportunity   assignedTo
           - GHL appointment   assignedUserId   <- the one that used to fail
[ ] 4.4  Confirm the agent received the Salesforce notification email, and that every link in it
         goes to Salesforce and none to GoHighLevel.
[ ] 4.5  Confirm the sync-failure log is silent for this run.
[ ] 4.6  Confirm the confirmation card and ICS attachment still render correctly.
[ ] 4.7  Confirm the 15-minute overdue threshold still moves a stale booking to
         "Overdue - Call Queued" (stage b6f8e13a-1cf7-4c3a-9205-d41cd7ac8411).
[ ] 4.8  Re-run the ORIGINAL reproduction against Aug 26 record 8Uq6LAB34FjSNg5hw7Da if it can be
         moved to the new calendar. If it cannot, say so explicitly rather than assuming coverage.
```

Step 4.3 is the whole point. If the appointment still disagrees, stop — the calendar was not the
cause, or not the only cause.

---

## 7. Phase 5 — Cleanup, only after Phase 4 passes

```txt
[ ] 5.1  Cancel the five spent StaffQA appointments:
         1dGhqwrUd5jDafmHCMTp, YXMMzsAyL0p8JyjY3XWp, gGiSf9jyI8IjITm4GiaV,
         ckQfT4FENQOrFgvDyU6d, O3yLqEkCYqTKZCYtZ9cZ
[ ] 5.2  Decide on the two unintended live confirmed test appointments:
         3pz64UmRXyqcdEXbREMr (Aug 14, 10:00 AM PT)  <- fires soonest
         0L8gWM56EXFhWzkhhFje (Aug 13,  9:00 AM PT)
[ ] 5.3  Cancel the Aug 26 reproduction 8Uq6LAB34FjSNg5hw7Da — LAST, and only once Phase 4 passed.
[ ] 5.4  Decide the fate of hqwmzN40nNDRQZeJqqbR. Leaving it Active but unlinked is the safe
         default; deleting it strands its appointment history.
[ ] 5.5  Test contacts 0Pkh4K2X5fSe28rqxkkR and pMEOrvSKH5uE3lOdK4T7 both carry dnd: true. Keep it
         that way while they exist.
```

---

## 8. Rollback

```txt
Symptom: bookings stop arriving, or land on the wrong calendar, after cutover.
Action:  set GHL_CALENDAR_ID back to hqwmzN40nNDRQZeJqqbR in Vercel and redeploy.
Note:    appointments booked on the new calendar in the interim stay there. Reconcile manually.
         The old calendar is unchanged by this runbook, which is why §4 says do not delete it.
```

---

## 9. Open questions

```txt
[ ] Which five agents belong on the FCA calendar? Only Alex and Kenny Jumps are confirmed.
[ ] Do agents need GHL user records at all if they only work in Salesforce? A team calendar needs
    GHL users as assignment targets — clarify whether those are login-less records. This is the
    sharpest tension between constraint 1 and the fix.
[ ] Does the Salesforce workflow reference the calendar ID directly? (Phase 0, step 0.2)
[ ] Where exactly does the 2026-08-13 sync-failure logging write?
[ ] Can an existing appointment be moved between calendars in GHL, or only cancelled and rebooked?
    This decides whether step 4.8 is possible.
```

---

## 10. Tooling constraints — why this is a runbook and not an automation

Recorded so the next session does not rediscover it (Operating Protocol §6):

```txt
- The GHL calendar settings screen is a cross-origin iframe (calendar-app.leadconnectorhq.com).
  Synthetic clicks do not reach it. Verified against three controls: pagination, the Type filter,
  and the New calendar button. All three: no response.
- Loading that iframe URL directly returns "You do not have access to this module."
- The GHL MCP connector exposes no calendar create/update tool — only get-calendar-events and
  get-appointment-notes.
- Desktop control grants browsers read-only tier: screenshots yes, clicks and typing no.
- Reading the GHL session token from the page to call the API directly is blocked, correctly.

Net: Phases 1-3 need a human at the keyboard. Phase 0 needs Salesforce access, which no connector
in this workspace currently provides. Phases 4 and 6 verification CAN be done via the GHL MCP,
which reads contacts, opportunities, and calendar events fine.
```
