# MCD CRM — v1.2 Business-Terms Reconciliation & GHL Flows
**Date:** 2026-06-30
**Reconciles:** `[C] Master Product Scope v1.1.md` against the approved program file
`02 Projects/MCD - Mercury Call Desk/[C] Partner Program Business Terms — Approved 2026-06-30.md`
(plus updated `03_COMPENSATION_AND_LEAD_RULES.md` and `[C] Owner Setup & Open Decisions.md`).
**Status:** Business terms APPROVED by owner; California attorney review still pending before agreements are issued for signature. Architecture (GHL one-way backend, funding relay, MiniCRM isolation) is unchanged — these are refinements and one model change.

---

## 0. Company constants now locked (use across CRM invoices, notices, audit)
```txt
Legal entity:   Charter Oaks Assets, Inc. d/b/a Mercury Call Desk ("MCD")
Signer:         Hamilton Pinto Jr., Manager and Authorized Signatory
Address:        231 E Alessandro Blvd A-208, Riverside, CA 92508
Emails:         hello@ (apply) · support@ (client intake) · sales@ · company email for active partners
Caller ID:      (909) 276-7631 (interim)
Retention:      partner + agreement records kept 7 years
Disputes:       JAMS binding arbitration, Riverside County CA; commission disputes 30 days, CRM notes are the controlling evidence
```

---

## 1. Commission engine — MODEL CHANGE (highest impact)
**Old scope assumption:** tiered % of gross profit (40/35/30 by division).
**New approved rule:** flat **50/50 of Net Commissionable Profit**.
```txt
Net Commissionable Profit = collected retail revenue
                          − published partner wholesale cost
                          − actual Stripe/processing fee
Partner share = 50% · Net Commissionable Profit      (MCD keeps the other 50%)
Sales tax is NOT commissionable.
```

Published wholesale schedule the engine must store (retail | wholesale per month):
```txt
Standard  Starter   $1,595 | $1,000
Standard  Growth    $1,995 | $1,250
Standard  Pro       $3,995 | $1,500
Enterprise Starter  $5,295 | $2,500
Enterprise Growth   $7,595 | $3,500
Enterprise Pro      $9,995 | $5,000
```
(MCD's *true* underlying cost stays confidential and is NOT the partner basis — agents only ever see retail/set pricing.)

### What this changes in the build
- **Funding relay payload must carry the processing fee** (and tax) so the engine can compute net. Update the §4.2 funding body in the GHL spec to include `processing_fee`, `tax_amount`, and `package_code`; the CRM looks up `wholesale_cost` from the package schedule.
- **Commission formula** in the ledger = `0.5 * (eligible_collected - wholesale_cost - processing_fee)` (tax already excluded).
- **Setup-fee commission (new type):** collected setup fee first covers first-month wholesale + processing fee; the remainder is split 50/50. Minimum setup-profit targets before split: Starter $1,000 · Growth $1,500 · Pro $3,000 · Enterprise $5,000.
- **Payout SLAs replace generic holds:** new-account first payment + setup = within 30 days after cleared funds **AND** a documented launch-phase/checklist is complete (new gate); established recurring + unchanged renewals = within 15 days. A package/scope/price/structure change is treated as a **new contract** for timing + calc.
- **Refund/chargeback handling refined:** MCD may hold/offset future commissions for the partner's related balance; partner has **10 days to repay** before offset; prompt notice + recorded calculation; commission disputes in writing within **30 days**, CRM attribution + notes controlling. (Consistent with scope §17.7 ON_HOLD-not-auto-clawback, plus the offset/repayment workflow.)
- **Advanced Partner** pricing floor: confidential minimum margin above wholesale + fees; standard partners quote published price only. Engine must support an authority flag + a manager-approval gate before nonstandard pricing generates a contract.

---

## 2. Lead model — RULES NOW CONCRETE (refines scope §8, §10)
```txt
Cold lead protection:  begins ONLY after documented two-way contact is logged in CRM (entry alone ≠ protection)
Self-sourced referral: protected immediately on accurate CRM entry + documented source
OpenPool:              cold lead with NO demo booked after 45 days → opens to all authorized partners; original loses it
Shark Tank:            pitched/contract-priced lead that stalls → assignable only to top-tier closers/managers; original loses it
Booking credit:        credited partner earns the 50% share only when the deal CLOSES and MCD receives CLEARED payment
Standard splits:       none; private partner arrangements don't bind MCD accounting without advance management documentation
House transfer:        MCD may move any account to House for client protection, noncompliance, abandonment, or operating need
```
### Build deltas
- Add lead flags: `is_referral`, `referral_source`, `two_way_contact_at` (protection starts here for cold).
- Add pool/timer: `OPENPOOL` release at **45 days with no demo** (configurable); `SHARK_TANK` pool gated to a `top_tier_closer` capability.
- Credit/attribution: originating credit is provisional until `CLOSED_WON + payment cleared`; a re-engaging partner who closes a reassigned lead earns the share (former booker earns nothing on a deal that never closed).
- These replace the generic Hot/Nurtured/Cold SLA timers from §10 as the *authoritative* protection rules (keep the pools, layer these rules on top).

---

## 3. Service & residual — CONTRADICTS old §12.3 (now mandatory cadence)
**Old scope said:** healthy paying accounts need no routine activity.
**New approved rule:** residual eligibility REQUIRES servicing to a per-package cadence.
```txt
Starter     Phase 1: biweekly (2 wks–3 mo)   Ongoing: monthly
Growth      Phase 1: weekly                  Ongoing: biweekly or monthly (client preference)
Pro         weekly                           guaranteed 1-hour weekly session
Enterprise  weekly                           guaranteed 1-hour weekly session
```
- A documented meeting offer / client-declined / rescheduled counts as compliant activity (meetings via Google Meet, ~15 min once stable).
- **60-day rule:** failure to attend/confirm account health for 60 days = servicing-compliance violation → 1st = warning, 2nd in rolling 12 mo = **account to House** (residual ends).
- **3-day rule:** unexcused failure to respond to a client + escalate for 3 calendar days may justify immediate termination.
- Support intake via `support@mercurycalldesk.com`; MCD = Level 1 intake + Level 2 escalation, partner handles account-facing comms; standard response target 24 hours (Pro/Enterprise prioritized).
### Build deltas
- Client account module must track **service cadence per package**, next-due, last-confirmed-health, and the violation counter (rolling 12 mo) with auto warning → House escalation.
- Replace scope §12.3 "no forced activity" with this cadence model; keep "no make-work" spirit only between scheduled touchpoints.

---

## 4. Onboarding — MANDATORY GATE + COUNTERSIGNATURE + GHL E-SIGN (refines scope §6 and the onboarding-integration doc)
Hamilton **countersigns** and enables active MiniCRM/GHL access only after ALL of:
```txt
1. Complete CRM profile: verified personal email, mobile, mailing address, emergency/contact info
2. IRS Form W-9
3. Signed Sales Partner Agreement
4. Signed Confidentiality & IP Agreement
5. CRM training / check-in completion
```
System of record must retain: signed PDF, agreement **version**, timestamps, **signer IP / audit trail**, **countersignature**, W-9, profile-completion, certification.

### E-sign via GHL Documents & Contracts (the workflow you asked for)
GHL has native e-signature (legal audit trail: signer identity, IP, timestamps, certificate), **multi-recipient** (enables countersignature), and a **workflow trigger on document status** (Sent/Viewed/Signed/Completed), filterable by template. Flow:
```txt
MiniCRM creates partner record → sends Sales Partner Agreement + NDA/IP as GHL Documents
  → partner e-signs → Hamilton e-signs (multi-recipient = countersignature)
  → GHL "Completed" trigger fires a workflow → Custom Webhook → MiniCRM
  → MiniCRM marks that gate COMPLETED, stores the signed-PDF ref + audit certificate (R2),
    records version + signer IP + timestamps
  → when ALL gates complete → status PENDING_REVIEW → Hamilton activation (countersign) → ACTIVE
```
- W-9 / payout: still via a secure provider; store **completion state only** (never raw tax/bank data) — scope §5.1.
- This **supersedes** the "R2 presigned upload + e-sign" assumption in `[C] Agent Registration, Knowledge Base & Training Integration.md` §3: prefer GHL Documents & Contracts for the agreements, with the signed PDF mirrored to R2 for the 7-year record.
- Certification Scorecard still flips `can_claim_leads` (unchanged); ACTIVE ≠ allowed to claim.

---

## 5. Agent GHL presence — BOTH FLOWS, COMPARED (your decision: backend user but no agent login + evaluate custom-field/value IDs)
Goal restated: a partner is represented in GHL for structure/attribution, but is **never given GHL login access** — the MiniCRM stays their only surface, and your other clients (separate sub-accounts) + true/wholesale pricing stay invisible.

### Flow A — Dedicated GHL backend user (no login issued to the agent)
```txt
- Create a GHL user record per partner inside a single "Sales HQ" sub-account.
- Permissions set to Only Assigned Data + Sales Pipeline only (no client sub-accounts,
  agency settings, payments, workflows, exports, or other agents' leads).
- BUT the agent is never given the password / never logs in. The MiniCRM acts on their behalf
  via the Private Integration Token. The user exists so GHL can "assign" the booking/opportunity
  to a real GHL user (needed for round-robin calendars and native ownership).
Pros: native GHL ownership/round-robin works; clean assignment; future-proof if you ever DO grant access.
Cons: consumes a GHL seat per partner; you must keep "no login" disciplined (don't send the GHL invite email).
```

### Flow B — Custom field / value attribution (no GHL user per agent)
```txt
- No per-partner GHL user. Agent identity travels as data:
    contact/opportunity custom FIELDS: mini_crm_agent_id, originating_agent_id, set_pricing_tier
    (custom VALUES are account-level globals — fine for company-wide constants, NOT per-agent-per-lead)
- A small pool of service users (e.g. "MCD Booking") satisfies any GHL "assigned user" requirement.
Pros: zero per-agent GHL seats; strongest isolation; nothing to "not log into".
Cons: GHL native round-robin/ownership is approximated; attribution lives in fields, not a GHL user.
API note: GHL API v2 lists Contact custom fields but not Opportunity custom fields — prefer Contact-level attribution fields.
```

### Recommended hybrid (lets you "see how both flow")
```txt
Run BOTH in a pilot sub-account:
- Use Flow A's dedicated-no-login user as the ASSIGNED owner (so calendars/round-robin work),
- AND stamp Flow B's custom fields for the MiniCRM's own attribution + commission lineage.
Then pick: if seats are cheap and you like native ownership → lean Flow A; if you want max isolation
and minimal GHL footprint → lean Flow B. Either way the MiniCRM remains the system of record and the
only agent surface. (This is what the build will instrument so you can compare real behavior.)
```

---

## 6. DNC / communications (refines scope §14.4)
```txt
DNC = total blackout: no calls, SMS, sales email, marketing email, or social DMs.
Transactional/billing/security/outage notices may continue where permitted.
Any opt-out/stop from ANY channel must be logged immediately (target within 24h).
Customer/prospect email only through the MCD CRM/company-email system. No active partner SMS program at this time.
```

---

## 7. What I will change in the scope docs (on your go-ahead)
```txt
Master Scope → v1.2: commission engine (50/50 net + wholesale schedule + setup-fee logic + payout SLAs/launch gate),
  lead protection rules (two-way/referral/OpenPool-45/Shark Tank/close+cleared), service cadence + 60-day/3-day rules
  (replacing §12.3 no-activity), onboarding countersignature + GHL e-sign + 7-yr retention + audit trail, legal entity,
  DNC blackout, refund offset/repayment + 30-day dispute.
GHL Backend Spec: add processing_fee/tax/package_code to funding payload; add §10 agent-attribution flows (A/B/hybrid);
  add §11 Documents & Contracts e-sign onboarding workflow.
Onboarding/KB Integration: switch agreement e-sign to GHL Documents & Contracts (countersignature), add emergency
  contact + audit-trail capture + 7-yr retention; W-9 completion-state only.
CLAUDE.md: record the locked business terms + the both-flows decision.
```

---

## 8. Still open (your input / legal)
```txt
[ ] California attorney review of 1099 structure, arbitration, commission/residual, cancellation, signer title.
[ ] Confidential Advanced-Partner minimum-margin floor (per package or a floor schedule).
[ ] Final pick between Flow A / Flow B (or keep the hybrid) after the pilot.
[ ] Confirm whether GHL Documents & Contracts is your e-sign of record, or a third-party (e.g. DocuSign) for the agreements.
[ ] Launch-phase checklist definition that gates the first-payment payout.
```
