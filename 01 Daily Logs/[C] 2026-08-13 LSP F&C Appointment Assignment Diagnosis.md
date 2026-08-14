# [C] 2026-08-13 — LSP / Free & Clear Advantage: Appointment Assignment Diagnosis

Scope: `lsp.fca` · Lock holder: claude · Session: local (Cowork on Hamilton's computer)

## Context

Hamilton moved this work from a cloud Cowork session to a local one. The cloud session's
consolidated notes **did not carry over** — a local session cannot read cloud session storage,
and there was no prior local session to inherit from. This log reconstructs the state from live
GHL data rather than from those notes, so the record is source-of-truth rather than hearsay.

## What I changed

**No GHL mutations. No production changes. All GHL access was read-only.**

New files:

- `02 Projects/LSP/LSP Overview.md` — project overview, live IDs, blocker, incident memory
- `02 Projects/LSP/LOCK.md` — first lock file for this scope (previous_holder: none)
- `01 Daily Logs/[C] 2026-08-13 LSP F&C Appointment Assignment Diagnosis.md` — this log

Modified:

- `00 [C] Workspace Index.md` — added the LSP section (Protocol §5)
- `CLAUDE.md` — added an LSP current-status section (Protocol §4). The Protected Workspace
  Command Registry was **not** touched.

### Outside-scope note — declared, not silent (Protocol §3)

Two workspace-level facts surfaced that are unrelated to the FCA task and that I did not act on:

1. **The local repo is 2 commits ahead of `origin/main`.** CLAUDE.md rule 1 says the GitHub repo
   is the single source of truth and the local folder is never authoritative. Right now the
   reverse is true — there is committed work in `D:\GitHub\My Workspace` that GitHub has never
   seen. This predates today's session.
2. **Protocol §8 could not be honored.** The rule is "edit workspace + project repos through the
   GitHub MCP only, never local file writes." There is no GitHub connector available in this
   session and none in the MCP registry, and the sandbox cannot reach github.com at all
   (`git fetch` → `HTTP 403 from proxy after CONNECT`). Hamilton was shown this conflict and
   chose "write locally and commit via git" with full knowledge of the deviation. Recording it
   here so it is never a silent surprise.

## Evidence

All facts below come from direct reads, not inference.

**Location identity** — `locations_get-location` returned `oY7nDZUrZG0KegzadZgI` =
"Loan Streamline Pro", Cheyenne WY. Free & Clear Advantage is a brand inside it, evidenced by the
`F&C Appointments` pipeline and the `F&C-Website` contact source. There is no separate FCA
sub-account.

**The divergence** — read directly from the API:

```txt
appointment  8Uq6LAB34FjSNg5hw7Da  assignedUserId = 8tTyPhJCYmCqsCFvaiq6  (Alex)
opportunity  9XaL0GhTnBKH9a5Ubmkm  assignedTo     = dyxxuG3Xe4F76scURNj2  (Kenny Jumps)
contact      0Pkh4K2X5fSe28rqxkkR  assignedTo     = dyxxuG3Xe4F76scURNj2  (Kenny Jumps)
```

Same booking. Three records. The appointment disagrees with the other two. Timeline reconstructed
from `dateAdded`/`dateUpdated`/`lastStageChangeAt` is in the Overview.

**Agent identity** — `dyxxuG3Xe4F76scURNj2` resolves to **Kenny Jumps**, read from the Owner
field on the GHL contact detail page for `0Pkh4K2X5fSe28rqxkkR` (screenshot, zoomed and verified).

**Calendar is personal** — all 8 events ever created on `hqwmzN40nNDRQZeJqqbR` carry the same
`assignedUserId` (Alex), across different flows and hours. Calendar Settings shows 20 calendars in
this sub-account, every visible one `Type: Personal`. Combined with GHL's error *"The user id not
part of calendar team"*, the cause is established.

**What I could NOT prove** — I did not directly observe the settings row for
`hqwmzN40nNDRQZeJqqbR` reading `Type: Personal`. It sits on page 2 of the calendar list and the
GHL tab froze on every pagination attempt (`Page.captureScreenshot` timed out repeatedly). Labeled
HYPOTHESIS in the Overview with its confirming test. Everything points one way; the direct
observation is still owed.

**Corrections to the inherited summary** — two claims from the cloud session did not survive
contact with live data:

1. The summary implied multiple Aug 26 test records. There is exactly **one** Aug 26 appointment.
   "Records" is accurate only if it means the contact + opportunity + appointment triple.
2. The older `FCA E2E StaffQA 43121624` set is **not** a second instance of the bug. Its contact,
   opportunity, and appointment all agree on Alex — it was simply never reassigned. Treating it as
   a second data point would be wrong.

**Additional finding** — three test appointments are still `confirmed`, not cancelled:
Aug 13 9:00 AM, Aug 14 10:00 AM, and the intended Aug 26 4:30 PM. The inherited notes flagged only
Aug 26 as deliberately live. The Aug 14 one fires tomorrow if anything sends reminders. Both test
contacts carry `dnd: true` on all channels, which limits but does not by itself guarantee silence.

## Still open

- **The calendar decision.** Convert or replace `hqwmzN40nNDRQZeJqqbR` with a team/round-robin
  calendar. Owner-only: it changes `GHL_CALENDAR_ID` in Vercel and strands existing appointments.
  It gates correct assignment, real per-slot capacity, and any future round robin.
- **Confirm the calendar type directly** — the one unproven observation above.
- **Decide on the two unintended live test appointments** (Aug 13, Aug 14). Aug 26 stays.
- **Workspace-level: reconcile the 2 unpushed local commits with GitHub.** Not this scope, but the
  source-of-truth rule is currently violated in fact.
- **Whether Kenny Jumps is one of the five intended agents.** If yes, the assignment logic is
  working correctly and the calendar is the *only* remaining break — which shrinks the whole fix
  to one config decision. Not yet confirmed against the agent roster.

## Start here next

Open GHL → Settings → Calendars, find the row for `hqwmzN40nNDRQZeJqqbR`, and read its Type.
That single observation closes the last gap in the diagnosis. Context lives in
`02 Projects/LSP/LSP Overview.md`.

## Handback

Lock holder remains **claude**, scope `lsp.fca`, read-only. No GHL record was mutated this
session. Next action: confirm the calendar type, then Hamilton makes the convert-or-replace call.
First file to read: `02 Projects/LSP/LSP Overview.md`.

Two warnings the next session must not violate: the **Aug 26 records are live on purpose** —
verify the fix against them before cancelling; and the **Web Leads queue is intentional** — do not
"fix" the Salesforce assignment rule.
