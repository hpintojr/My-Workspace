# [C] 2026-07-11/12 MCD CRM Live Browser QA — Final 3 Acceptance Tests

**Holder:** claude · **Scope:** `hpintojr/crm.mcd` + `hpintojr/My-Workspace` · **Authorization:** Hamilton, in chat, explicit instruction to operate the authenticated browser session directly and perform the actual UI clicks for the 3 remaining acceptance steps, rather than treat them as owner-only.

## What happened

Using the already-authenticated browser session (signed in as hpinto@mercurycalldesk.com, OWNER role), created 3 fresh controlled test Leads via the in-app "Create controlled Lead" form on `/admin/leads/controlled-test-data`, then performed the real UI actions against them in `/portal/leads` and captured live network/UI/database evidence for each. All 3 PASS. Recorded on `/admin/leads/testing`. `/admin/leads/owner-decision-prep` now shows "All non-owner acceptance evidence is pass-recorded" -- 0 open gaps. Only item 18, "Record owner production decision," remains, which is the actual launch decision and is Hamilton-only by design.

Production deployment for all 3 tests: `dpl_Ez9BMzxMK99AnDwMp8aMRMNh23sn`, commit `cc09697777cc7653e61acdb8c6506b50eaf86619`.

## Test 1 -- click-to-call-logs-first -- PASS

- Lead: `cmrh5igus0000l304kiclph7v` ("MCD Click-to-Call Ordering Test", 555-010-1769).
- Timestamp: 2026-07-12T02:06:54Z-02:07:02Z UTC.
- Pre-state: no LeadActivity rows, two-way contact not verified.
- Action: clicked the live "Click to call lead" button in `/portal/leads`.
- Network evidence: `POST /api/portal/leads/call-start` -> 200.
- Database evidence: new `LeadActivity` row `cmrh5kn9n0000l204e9yfbkvh`, type `CALL_INITIATED`, `occurredAt=2026-07-12T02:06:59.517Z`.
- UI evidence: button transitioned to "Activity logged -- dialer opened" only after the 200 response.
- Ordering proof: the component (`src/components/cold-lead-dial-button.tsx`, read directly) awaits the fetch response and only calls `window.location.href = tel:...` after a successful response; the activity write is server-side inside that same request. No new browser tab opened (`tabs_context_mcp` unchanged), consistent with no telephony handler registered in this sandboxed session -- expected, not an error.

## Test 2 -- click-to-call-blocks-on-error -- PASS

- Lead: `cmrh5izxo0000ld04w9lykmxp` ("MCD Click-to-Call Fault Live Test 2", 555-010-5423).
- Timestamp: 2026-07-12T02:10:36Z-02:10:41Z UTC.
- Technique: installed a scoped `window.fetch` override in the live page that intercepts only `POST /api/portal/leads/call-start` and returns a 500 with a custom error body; every other request passed through untouched. Removed the override immediately after the test.
- Result: button did not advance to "logged" state; UI rendered the induced error message inline in red; no `tel:` navigation occurred (no new tab).
- Database evidence: `LeadActivity` for this lead still contains only the original `LEAD_CREATED` row -- zero `CALL_INITIATED` rows, confirming no false activity was recorded on failure.
- Finding (transparency, not a functional gap): read `cold-lead-dial-button.tsx` directly. The component always displays `error.message`, which is either the server-supplied error text or the default `"Unable to log call activity."` -- the more specific literal fallback string `"Dialer was not opened because activity must be logged first."` exists in the source but only in an else-branch for a non-`Error` thrown value, which is unreachable in practice (every throw in this function is a real `Error`/`TypeError`). The actual guarded behavior (request fails -> dialer never opens -> no false activity) is fully correct and verified live; only the literal wording differs from what's in the dead branch.

## Test 3 -- two-way-contact-claim-gate -- PASS

- Lead: `cmrh5j7j70003ld04efqsp0z9` ("MCD Two-Way Claim Gate Live Test", 555-010-5522).
- Timestamp: 2026-07-12T02:13:17Z-02:13:59Z UTC.
- Pre-state (SQL): `AVAILABLE`/`COLD`, `ownerAgentId=null`, `twoWayContactAt=null`, `claimedAt=null`, `openPoolReleaseAt=null`.
- Step A: set disposition to "Qualified / spoke with decision maker" with call notes, clicked "Save disposition" in the live UI. SQL immediately after: `twoWayContactAt=2026-07-12T02:13:19.823Z`, pool `COLD`->`HOT`, lifecycle->`CONTACTED`, `ownerAgentId` still null. UI showed "Two-way contact: Jul 11, 2026, 7:13 PM" and a new "Claim unlocked" panel with a "Claim this lead" button; the lead remained in the unowned Cold workspace list (no auto-claim).
- Step B: clicked "Claim this lead" in the live UI. SQL immediately after: `ownerAgentId` populated (`cmrfezgws0001i604393e8juw`), lifecycle->`CLAIMED`, `claimedAt=2026-07-12T02:13:59.255Z`, `openPoolReleaseAt=2026-08-26T02:13:59.255Z`. SQL interval confirms exactly 45 days.
- Timer-origin proof: `claimedAt` (02:13:59) is ~40 seconds after `twoWayContactAt` (02:13:19), and `openPoolReleaseAt` is 45 days after `claimedAt`, not `twoWayContactAt` -- confirms the 45-day timer starts at claim time.

## Safety boundary reaffirmation

All 3 tests used newly created controlled test Leads only (`source = MCD_CONTROLLED_TEST_DATA`, synthetic 555-010-XXXX numbers, created via the app's own "Create controlled Lead" form). No real customer/prospect record was read, called, or modified. No code changes were required -- all 3 behaviors matched the coded contract on first live attempt. The only "code change" this session was the earlier PR #98 fix (already shipped, merged, and reverified prior to these 3 tests). Acceptance evidence rows are additive-only `AuditLog` inserts via the app's own "Record" form; no existing rows were modified.

## What's left

`/admin/leads/owner-decision-prep`: 0 open non-owner gaps. Only item 18, "Record owner production decision," remains -- that is the actual go/no-go launch call and is Hamilton's alone to make.
