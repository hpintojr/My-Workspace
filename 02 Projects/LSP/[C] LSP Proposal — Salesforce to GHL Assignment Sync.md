# [C] LSP Proposal — Salesforce → GHL Assignment Sync

Created 2026-08-13 · Scope `lsp.fca` · Status: PROPOSAL — nothing here is built or approved.
Prereq reading: `LSP Overview.md`, `LOCK.md`, `[C] LSP Runbook — FCA Appointment Assignment Cutover.md` (Phase 0 result).

## Why this document exists

The 2026-08-13 E2E test proved there is **no Salesforce→GHL automation at all**. When a lead's
owner changes in Salesforce, the flow `F&C Lead Owner to Salesforce Calendar` moves the
Salesforce Event and stops. GHL is never told. The same test confirmed two more GHL-side gaps:
the internal lead email workflow does not exist, and contact custom fields arrive empty.

This proposal covers the four build items and their required order. Items 2–4 need Hamilton (or
Hamilton-at-keyboard) because the GHL configuration UI cannot be automated (runbook §10).

## The four items

```txt
1. BUILD  Salesforce→GHL assignment sync            (this doc, options below)
2. DECIDE + BUILD  team calendar replacement        (runbook Phases 1–3, unchanged)
3. BUILD  GHL internal lead email workflow          (scope §47–50: hpintojr@gmail.com + josh@advantagefirst.com)
4. FIX    GHL custom-field mapping                  (scope §31–32: debt amount/types, employment, payment status, consent set)
```

Items 1 and 2 are coupled: until the team calendar exists, the appointment leg of any sync will
be rejected ("The user id not part of calendar team"). Items 3 and 4 are independent of both.

## Item 1 — sync design options

### Option A — Salesforce calls GHL directly

Extend the existing flow (or an Apex action) with an HTTP callout to the GHL API using a Named
Credential holding a GHL token.

```txt
+ No new website code
- GHL private token duplicated into Salesforce
- SF user → GHL user mapping must live in Salesforce (custom metadata/fields)
- Error logging split across two systems; the 2026-08-13 sync-failure log is bypassed
- Callout/retry handling in Flow is clumsy; partial failures are hard to surface
```

### Option B — Salesforce calls the Vercel app, app writes to GHL  ← RECOMMENDED

Add an authenticated endpoint to `hpintojr/freeandclearadvantage`, e.g.:

```txt
POST /api/agent-assignment
Auth: shared secret header (new Vercel env var, e.g. FCA_ASSIGNMENT_SECRET)
Body: { salesforceLeadId, newOwner: { sfUserId, email } }
```

The endpoint resolves the GHL contact (already linked — the results flow returns both IDs and the
opportunity name embeds the GHL appointment ID), maps the SF user to a GHL user ID, then writes:

```txt
contact.assignedTo          (works today)
opportunity.assignedTo      (works today)
appointment.assignedUserId  (works only after the team calendar — item 2)
```

The Salesforce side stays thin: one outbound action added to the existing
`F&C Lead Owner to Salesforce Calendar` flow (guard: only when the new owner is a real user, not
the Web Leads queue — the queue is intentional and must not trigger sync).

```txt
+ GHL credentials stay in one place (Vercel), where they already are
+ Reuses the sync-failure logging shipped 2026-08-13
+ Code lives in the repo with lint/build/CI; testable without touching Salesforce
+ SF→GHL user mapping is one small table in app config
- Requires one Salesforce flow edit + one Vercel env var (owner-only per Operating Protocol §8)
```

### Required either way

```txt
- SF user → GHL user mapping. Known pairs so far:
    Alex Antonio  → 8tTyPhJCYmCqsCFvaiq6
    Kenny Jumps   → dyxxuG3Xe4F76scURNj2
  Remaining agents UNCONFIRMED — confirm the roster with Hamilton, do not guess.
- Decision: what happens on sync failure? Recommended: log + surface (the existing failure log),
  never block the Salesforce owner change itself.
- Agent-facing notification stays in Salesforce (constraint 1). The inactive
  `Lead Assignment Notification` flow (V6, Sergey 2/10/2026) is the natural place: review it,
  strip/verify links point only to Salesforce, then reactivate — or add an email alert to the
  F&C flow. Do NOT let GHL email agents.
```

## Sequencing

```txt
1. Hamilton: calendar decision (runbook Phases 1–2) — gates the appointment leg
2. Hamilton: confirm agent roster + SF→GHL user mapping
3. Build item 1 (Option B unless Hamilton prefers A); deploy behind the new secret
4. Hamilton: Vercel env vars + flow edit (owner-only)
5. GHL UI session (human at keyboard): items 3 and 4 — email workflow + custom fields
6. Verify per runbook Phase 4 against the Aug 20 test record
   (FCA E2E TwoWay 20260813T3 / SF 00QV500000fr7WoMAI / GHL MiCyWvjbgkOAxIb5HhBg),
   then the Aug 26 reproduction, BEFORE any cleanup (runbook Phase 5)
```

## Test records available for verification

```txt
KEEP  Aug 20 2:00 PM PT  appointment PARQ5xNTWpoHKDvhMUWh  — created by the 2026-08-13 E2E test,
      currently the freshest reproduction: SF says Kenny Jumps, all three GHL records say Alex.
KEEP  Aug 26 4:30 PM PT  appointment 8Uq6LAB34FjSNg5hw7Da  — original reproduction (runbook rules apply).
Both contacts dnd: true. Do not cancel either until Phase 4 passes.
```
