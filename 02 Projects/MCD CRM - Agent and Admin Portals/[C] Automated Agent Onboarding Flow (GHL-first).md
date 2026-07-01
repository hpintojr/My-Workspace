# MCD CRM — Automated Agent Onboarding Flow (GHL-first)
**Date:** 2026-06-30
**Companion to:** `[C] v1.2 Business-Terms Reconciliation & GHL Flows.md` (§4–5), `[C] Agent Registration, Knowledge Base & Training Integration.md`
**Goal:** Automate agent setup so Hamilton's only manual steps are: (1) create the GHL user, (2) create the IONOS mailbox, (3) take a quick confirm call, (4) tag the GHL workflow. Everything else runs through GHL workflows + the MiniCRM automatically.

---

## 1. Division of labor (who owns what)
```txt
GHL  = heavy onboarding DOCUMENTS + their secure storage + e-sign + the onboarding workflow engine,
       plus the booking/funding backend (unchanged).
MiniCRM = the leads/commission/compliance engine AND the agent's self-service profile (banking, personal data).
          It hosts the public signup page and the agent portal; it feeds OPPORTUNITIES to GHL.
IONOS = company mailbox provisioning (operational email identity for active partners).
```
This honors your "take the document load off the MiniCRM" goal: signed contracts/NDA/W-9 live in **GHL** (Documents & Contracts, with audit certificate); the MiniCRM keeps only a **reference + completion state**, never the raw documents or raw SSN/bank numbers.

> Note on the one-way rule: the lead/client/funding data rule stays one-way (GHL → MiniCRM). Agent *onboarding/provisioning* is a separate, controlled two-way handshake (signup → GHL, then GHL "signed" → MiniCRM provisions the user). Different lane, on purpose.

---

## 2. The automated flow (end to end)
```txt
0. Hamilton creates the GHL user + the IONOS mailbox (default password he sets; see §6 security).
   These are the ONLY manual provisioning steps.

1. Hamilton emails/texts the signup link:  https://crm.mercurycalldesk.com/signup
   (the MiniCRM app hosts this page).

2. Agent completes the public signup form (personal data — see §3).
   → MiniCRM creates a DRAFT agent record AND ports the data to GHL as a Contact
     (custom fields stamped: mini_crm_agent_id, source=agent_signup, etc.).
   → Hamilton is notified (a new applicant is pending confirm).

3. Hamilton calls the agent to confirm identity/intent (your human checkpoint).

4. Hamilton TAGS the GHL contact (e.g. tag `agent-approved`) — this is the single trigger.
   → GHL workflow fires:
        a. Send Sales Partner Agreement + Confidentiality/IP (NDA) + W-9 as GHL Documents (e-sign).
        b. (Recurring reminders handled by GHL until signed.)

5. Agent e-signs in GHL → Hamilton countersigns (multi-recipient) → status COMPLETED.
   → GHL "document completed" workflow trigger → Custom Webhook → MiniCRM.
   → MiniCRM: marks the agreement/NDA/W-9 gates COMPLETE (stores GHL doc refs + audit cert refs),
     then PROVISIONS the MiniCRM user (activation link).

6. MiniCRM emails the agent's PERSONAL email a one-time activation link.
   → Agent sets a MiniCRM password + MFA (scope §6.1) and logs into the agent portal.

7. In the portal the agent completes onboarding:
     - confirm/finish profile (mobile, mailing, emergency contact),
     - add/verify BANKING + payout details (secure provider — see §5),
     - complete required training/check-in → Certification Scorecard,
     - Certification APPROVED → can_claim_leads = true.

8. Hamilton's activation countersignature + the completed gates flip the agent to ACTIVE.
   Company email (IONOS) is now their operational identity; legal notices go to personal email.
```

Hamilton's manual touch points total: create GHL user, create IONOS mailbox, confirm call, one tag. Everything else is automated.

---

## 3. Public signup page — `crm.mercurycalldesk.com/signup`
Hosted by the MiniCRM app. Purpose: collect the agent's data once, port it to GHL, and start the pipeline.

```txt
Collect:
  - Legal name, preferred name
  - Verified PERSONAL email (OTP/verify), mobile (OTP/verify)
  - Mailing address
  - Emergency contact
  - Consent checkboxes (e-sign consent, privacy, contact consent)
Do NOT collect on this page as a stored field:
  - SSN / tax ID  → see §4 (goes into the W-9 e-sign doc, not a CRM/GHL field)
  - Bank account / routing → see §5 (entered later in-portal via secure provider)
On submit:
  - Create MiniCRM agent record (status DRAFT/SUBMITTED).
  - Upsert a GHL Contact via API v2; stamp custom fields (mini_crm_agent_id, source=agent_signup).
  - Notify Hamilton (pending confirm).
  - Rate-limit + bot-protect the form (it's public).
```

---

## 4. SSN / W-9 handling — recommended secure pattern (DECISION NEEDED)
You said SSN should be entered only at registration and ported to GHL. The safer way to honor "enter once, don't keep it lying around":
```txt
RECOMMENDED:
  - The signup page does NOT store SSN as a field.
  - SSN is entered ONLY inside the W-9 itself, delivered via GHL Documents & Contracts at registration.
  - GHL retains the SIGNED W-9 PDF (with audit certificate) in its secure document storage.
  - MiniCRM stores only: w9_status = COMPLETED + the GHL document reference (never the raw SSN).
  - Mirror the signed W-9 PDF to private R2 for the 7-year record.
WHY: raw SSN as a queryable field in GHL/Postgres is a breach-liability magnet and conflicts with
     scope §5.1 (no raw tax/bank data in the CRM). Storing only the signed PDF + completion state
     gives you the legal record without holding loose SSNs.
IF YOU STILL WANT SSN AT SIGNUP: capture it in a single secure step that writes it directly into the
     W-9 document/secure tax intake and is never persisted as a normal field — confirm and I'll spec it.
```

---

## 5. Banking & personal data self-service (in the MiniCRM portal)
```txt
- Personal data (name, mobile, mailing, emergency contact): editable by the agent in-portal; audited.
- Banking/payout: entered/updated via a SECURE payout/tax provider widget (e.g. the W-9/payout provider).
    MiniCRM stores a TOKEN/reference + completion state only — never raw account/routing numbers (scope §5.1).
- SSN: NOT editable in-portal (captured once at registration per §4). Show "on file: yes/no" only.
- Every change writes an audit_log entry.
```

---

## 6. Email + credential provisioning (and security flags)
```txt
IONOS company mailbox:
  - Hamilton creates the mailbox; a default initial password is set (you'll provide the standard).
  - SECURITY FLAG: a single shared standing password across agents is risky. Recommend forcing a
    password change on first login and enabling MFA where IONOS supports it. The company mailbox is the
    OPERATIONAL identity; it is NOT the MiniCRM login.
MiniCRM credentials:
  - Provisioned by the app after documents complete; delivered to the agent's PERSONAL email as a
    one-time activation link → agent sets their own password + MFA (scope §6.1).
  - The MiniCRM password is per-agent and never shared. Keep it separate from the IONOS email password.
```

---

## 7. How this reshapes the scope
```txt
- Add a public route: /signup (rate-limited, bot-protected) that ports to GHL + creates a DRAFT agent.
- Onboarding documents (agreement, NDA, W-9) are issued + stored in GHL Documents & Contracts;
  MiniCRM holds references + completion state only (offload confirmed).
- The GHL "agent-approved" tag is the single human trigger; the "document completed" trigger provisions
  the MiniCRM user automatically.
- Agent self-service: profile + banking (secure provider) + SSN-on-file flag.
- Reaffirm scope §5.1: no raw SSN/bank numbers in the MiniCRM; secure provider + signed-PDF references only.
- MiniCRM stays the leads/commission/compliance engine that feeds opportunities to GHL — plus the agent
  portal — but the heavy documents live in GHL.
```

---

## 8. Open decisions / flags for Hamilton
```txt
[ ] SSN: confirm the recommended pattern (SSN only inside the W-9 e-sign doc, never a stored field) — §4.
[ ] Banking: confirm a secure payout provider (so the CRM never holds raw account/routing numbers).
[ ] IONOS: confirm forced password change on first login + MFA, instead of a permanent shared password.
[ ] E-sign system of record: GHL Documents & Contracts (recommended here) vs DocuSign — pick one.
[ ] Confirm-call step: keep as a hard manual gate before the workflow tag (recommended), or auto-tag on signup.
[ ] Signup domain: crm.mercurycalldesk.com/signup confirmed; ensure DNS/cert for the app domain.
```
