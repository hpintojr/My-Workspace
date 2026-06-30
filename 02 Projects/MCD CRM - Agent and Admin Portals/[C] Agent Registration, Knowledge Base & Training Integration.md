# MCD CRM — Agent Registration, Knowledge Base & Training Integration
**Companion to:** `[C] Master Product Scope v1.1.md` (§5 security, §6 onboarding, §7 data model, §11 agent experience)
**Version:** 1.0 · **Date:** 2026-06-30
**Purpose:** Wire the existing Mercury Call Desk onboarding library into the Mini CRM so the same files drive (a) agent registration/activation gates and (b) the in-app knowledge base + training. Onboarding and the CRM go hand in hand — this is the connective tissue.

---

## 1. Source of truth (do not fork)
The canonical onboarding files already live in the parent program project:
```text
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/
```
The CRM **links to and ingests** those files; it does **not** keep a second copy that can drift. When a file changes there, the CRM publishes the new version into the knowledge base / gate. This doc is the map between that library and the CRM.

---

## 2. Two jobs the library does in the CRM
```text
A. Registration gates  → documents an agent must complete before live leads
   (agreements, NDA/IP, W-9/payout, acknowledgment, certification).
B. Knowledge base + training → the learn-and-practice content
   (welcome, product, ICP, scripts, CRM SOP, compliance, demo, collateral).
```
Same library, two surfaces. Section 5 lists every file and which job it does.

---

## 3. Registration flow integration (maps to scope §6 onboarding statuses)
```text
DRAFT
  → applicant enters details (recruiting screening/interview kit informs admin review)
SUBMITTED
  → Document gates (uploaded/e-signed via R2 presigned URLs, scope §5):
       [ ] Sales Partner Agreement (e-sign)               <- agreements/Sales Partner Agreement (DRAFT)
       [ ] Confidentiality & IP / NDA (e-sign)            <- agreements/Confidentiality and IP Agreement (DRAFT)
       [ ] W-9 + payout details (secure provider;          <- referenced in 02_FIRST_7_DAYS
           store COMPLETION STATE only, scope §5.1)
       [ ] New Hire Acknowledgment (e-sign)               <- 12_NEW_HIRE_ACKNOWLEDGMENT
PENDING_REVIEW
  → Manager runs the in-app activation checklist          <- 11_MANAGER_NEW_HIRE_CHECKLIST
NEEDS_CORRECTION / APPROVED / REJECTED
INVITED
  → one-time activation link → password + MFA (scope §6.1)
ACTIVE  (dashboard access)
  → BUT cannot claim/work live leads until Certification clears (see §4)
```
Confidentiality rule: the kit (pricing, commission, scripts, ICP) is confidential and is exposed **only after the NDA is signed** (kit confidentiality note + scope agent restrictions). Gate KB access on `document.view_sensitive`.

---

## 4. Certification gate — the bridge between training and live leads
The Certification Scorecard (`09_CERTIFICATION_SCORECARD`) is a manager-signed gate, not just a doc. Model it as a CRM record that flips a flag:
```text
certification.decision = APPROVED_FOR_LIVE_OUTREACH
  → sets agent flag can_claim_leads = true
certification.decision = APPROVED_WITH_COACHING
  → can_claim_leads = true + coaching task created
certification.decision = NOT_YET_APPROVED
  → can_claim_leads = false; retraining assignment
```
`can_claim_leads` is **separate from ACTIVE**: an agent can be ACTIVE (logged in, training) but blocked from the lead pools until certified. This enforces the scorecard's four areas (product, discovery/outreach, CRM ops, compliance) before any real prospect is touched.

---

## 5. Full library → CRM mapping
| Source file (01-agent-onboarding/) | CRM job | Where it shows up |
|---|---|---|
| 00_READ_ME_FIRST | Curriculum order | KB: "Start here" path |
| 01_WELCOME_PACKET | Training module 1 | KB / Training |
| 02_FIRST_7_DAYS | Guided onboarding checklist | Agent "Today/onboarding" tasks |
| 03_COMPENSATION_AND_LEAD_RULES | Policy reference (set pricing only) | KB (gated) + acknowledgment |
| 04_PRODUCT_CATALOG | Training module 2 | KB / Training |
| `[C] Pricing and Commission Model.xlsx` | Internal pricing reference | KB (gated; agents see set pricing tier only) |
| 05_ICP_AND_DISCOVERY | Training module 3 | KB / Training |
| 06_OUTBOUND_CALL_SCRIPT | Training module 4 + script panel | KB + lead workspace script (scope §11.3) |
| 07_CRM_SOP | Training module 5 | KB / Training; referenced in lead workflow |
| 08_COMPLIANCE_AND_COMMUNICATIONS | Training module 6 + compliance ack | KB + compliance gate |
| 09_CERTIFICATION_SCORECARD | Certification gate (see §4) | Admin/manager + agent status |
| 10_FIRST_30_DAYS | 30-day ramp checklist | Agent onboarding tasks |
| 11_MANAGER_NEW_HIRE_CHECKLIST | Admin activation checklist | Admin Onboarding screen |
| 12_NEW_HIRE_ACKNOWLEDGMENT | Registration gate (e-sign) | Registration documents |
| 13_OWNER_BRAND_SETUP_SHEET | Owner/admin setup reference | Admin settings |
| 14_DEMO_PROCESS_AND_HANDOFF | Training module 7 | KB + ties to GHL booking handoff |
| 15_BRANDED_SALES_PARTNER_LAUNCH_KIT | Booklet/export spec | Admin (export of the kit) |
| `Mercury_Call_Desk_Sales_Partner_Launch_Kit_v1.docx` | Distributable packet | KB download (gated) |
| agreements/Sales Partner Agreement (DRAFT) | Registration gate (e-sign) | Registration documents |
| agreements/Confidentiality and IP Agreement (DRAFT) | Registration gate / NDA (e-sign) | Registration documents (gates KB) |
| collateral/Demo Outline and Talk Track | Sales collateral | KB Resources + demo flow |
| collateral/Email and Text Templates | Approved templates | Lead workspace + reply triage |
| collateral/One-Page Platform Overview | Sales collateral | KB Resources (shareable) |
| collateral/Recording Disclosure and Call Openers | Compliance collateral | Lead workspace call panel |
| recruiting/Applicant Screening and Interview Kit | Pre-registration | Admin recruiting (optional phase) |
| recruiting/Recruiting Posting and Outreach | Pre-registration | Admin recruiting (optional phase) |

---

## 6. Data model additions (extends scope §7.1)
```text
onboarding_documents
  id, agent_id, doc_type (SALES_AGREEMENT | NDA_IP | W9_PAYOUT | ACKNOWLEDGMENT),
  version, status (PENDING | COMPLETED | REJECTED), esign_ref, r2_key (if applicable),
  completed_at        -- for W9/payout store COMPLETION STATE only, never raw tax/bank data (scope §5.1)

acknowledgments
  id, agent_id, doc_type (COMP_POLICY | CRM_DATA_SECURITY | COMPLIANCE | ONBOARDING_ACK),
  doc_version, signed_at

training_modules            (id, key, title, source_file, version, is_confidential)
training_module_versions    (id, module_id, version, content_ref, published_at)
training_assignments        (id, agent_id, module_id, assigned_at, due_at)
training_completions        (id, agent_id, module_id, version, completed_at)
knowledge_check_results     (id, agent_id, module_id, score, passed, taken_at)

certifications
  id, agent_id, manager_id, product_score, discovery_score, crm_score, compliance_score,
  decision (APPROVED_FOR_LIVE | APPROVED_WITH_COACHING | NOT_YET_APPROVED),
  signed_at  -- decision drives can_claim_leads
```
Add agent flag `can_claim_leads` (default false). Reuse scope permissions: `document.view_sensitive` gates confidential KB/training.

---

## 7. Admin & manager tooling
- The **Manager New Hire Checklist (11)** becomes the Admin → Onboarding approval screen, with each item a tracked checkbox feeding the APPROVED decision.
- The **Certification Scorecard (09)** becomes a manager form that writes the `certifications` record and flips `can_claim_leads`.
- The **recruiting kit** can seed a lightweight applicant pipeline (DRAFT applicants) — optional, later phase.

---

## 8. Sequencing (maps to scope Delivery Phases §26)
```text
Phase 1 (with onboarding/auth): document gates (agreement, NDA, acknowledgment) via R2 e-sign,
        manager activation checklist, certification record + can_claim_leads flag.
Phase 2/3: full training modules with versioned content + knowledge checks + completion tracking,
        confidential KB gating, collateral surfaced in the lead workspace & reply triage,
        kit export (15) and recruiting pipeline.
```

---

## 9. Guardrails
```text
- Single source of truth: onboarding files stay canonical in 02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/.
  The CRM ingests/publishes versions; it does not fork the files.
- Confidential materials (pricing, commission, scripts, ICP) are NDA-gated and permission-gated; agents see set pricing only.
- Tax/payout: secure provider, store completion state only — never raw W-9/bank data in the CRM (scope §5.1).
- Certification gates live leads: ACTIVE != allowed to claim. can_claim_leads requires a signed scorecard.
- Agreements are DRAFT and require legal review before they gate real partners (scope §29).
- AI-authored files use the [C] prefix.
```
