---
type: index
date: 2026-06-24
updated: 2026-06-30
project: MCD - Mercury Call Desk
audience: Claude, ChatGPT, Gemini (and future AI assistants)
---

# AI Index & Commands — MCD (Mercury Call Desk)

This is the control layer for the MCD workspace. Read the files in the required order before creating, editing, or implementing MCD materials.

## 1. What MCD is

```txt
Mercury Call Desk (MCD) = AI receptionist / call-desk automation business.
Contracting company = Charter Oaks Assets, Inc. d/b/a Mercury Call Desk.
Sales model = commission-only 1099 Independent Sales Partners using a business-in-a-box entry pathway.
Partner progression = Standard Sales Partner → Advanced Partner / Manager → possible separate reseller agreement.
Underlying platform/vendor = confidential; never disclose its identity to Partners, prospects, or public.
```

Partners use their own schedules, work location, prospecting methods, and non-competing business activity. MCD supplies approved training, assets, CRM/portal controls, customer contracts, implementation, billing, accounting, support intake, and Level 2 escalation. The current Partner Agreement does **not** grant a franchise, territory, ownership interest, reseller status, exclusivity, or sublicense right.

## 2. Required read order

```txt
1. MCD - Mercury Call Desk Overview.md
2. [C] Partner Program Business Terms — Approved 2026-06-30.md
3. [C] Owner Setup & Open Decisions.md
4. [C] AI Index & Commands.md (this file)
5. 01-agent-onboarding/00_READ_ME_FIRST.md
6. 01-agent-onboarding/03_COMPENSATION_AND_LEAD_RULES.md
7. 01-agent-onboarding/07_CRM_SOP.md
8. 01-agent-onboarding/08_COMPLIANCE_AND_COMMUNICATIONS.md
9. 01-agent-onboarding/14_DEMO_PROCESS_AND_HANDOFF.md
10. 01-agent-onboarding/agreements/[C] Sales Partner Agreement (DRAFT).md
11. 01-agent-onboarding/agreements/[C] Confidentiality and IP Agreement (DRAFT).md
12. 99-reference/[C] Master Ops Manual (Gemini).md
```

Do not change pricing, lead attribution, client servicing, commission terms, CRM-access rules, agreements, or compliance language without first checking the approved Business Terms and Owner Setup tracker.

## 3. Workspace structure

```txt
00 (root)
  - MCD Overview
  - AI Index & Commands
  - Owner Setup & Open Decisions
  - Partner Program Business Terms — Approved 2026-06-30 (business source of truth)

01-agent-onboarding/
  - 00_READ_ME_FIRST.md
  - 01_WELCOME_PACKET.md
  - 02_FIRST_7_DAYS.md
  - 03_COMPENSATION_AND_LEAD_RULES.md
  - 04_PRODUCT_CATALOG.md
  - 05_ICP_AND_DISCOVERY.md
  - 06_OUTBOUND_CALL_SCRIPT.md
  - 07_CRM_SOP.md
  - 08_COMPLIANCE_AND_COMMUNICATIONS.md
  - 09_CERTIFICATION_SCORECARD.md
  - 10_FIRST_30_DAYS.md
  - 11_MANAGER_CHECKLIST.md
  - 12_NEW_HIRE_ACKNOWLEDGMENT.md
  - 13_OWNER_BRAND_SETUP_SHEET.md
  - 14_DEMO_PROCESS_AND_HANDOFF.md
  - 15_BRANDED_SALES_PARTNER_LAUNCH_KIT.md
  - agreements/
      [C] Sales Partner Agreement (DRAFT).md
      [C] Confidentiality and IP Agreement (DRAFT).md
  - recruiting/
  - collateral/
  - [C] Pricing and Commission Model.xlsx

02-crm-gohighlevel/
  - GHL / MiniCRM implementation materials, MCP template, calendar setup

03-reseller-channel/
  - Future separate reseller terms only; do not imply current Partner is a reseller

04-brand-assets/
  - Approved MCD brand system and documentation

99-reference/
  - Master operations material and source conversation record
```

## 4. Locked business rules (2026-06-30)

```txt
Onboarding:       profile + W-9 + both agreements + CRM training are mandatory before countersignature/active access.
Lead protection:  cold leads protected after documented two-way CRM contact; self-sourced referrals protected on accurate CRM entry.
OpenPool:         no demo after 45 days → open to all authorized Partners; original Partner loses lead.
Shark Tank:       pitched/contract-priced stalled deal → top-tier closer/manager recovery; original Partner loses lead.
Commission:       Partner receives 50% of Net Commissionable Profit; no standard MCD-managed splits.
Payout:           new-account first payment/setup fee ≤30 days after cleared funds + launch phase; established recurring/unchanged renewal net-15.
Residuals:        only while client is current and Partner remains in good standing and documents required client servicing.
DNC:              immediate total sales/marketing blackout across channels; record in CRM.
Access:           former good-standing Partner is read-only for retained clients/commissions/meeting notes only; expires 30 days after final payout.
Restrictive terms: no non-compete and no non-solicitation; protect through confidentiality, IP, CRM/data rules, and customer-record controls.
```

## 5. Shared commands

```txt
read mcd            → load the required read order and summarize current phase, locked rules, and implementation gates.
onboarding status   → report whether onboarding, agreements, access control, and certification are ready for live leads.
build onboarding    → update the numbered kit while preserving the approved Business Terms and no-reseller-right rule.
certify partner     → use 09_CERTIFICATION_SCORECARD before authorizing live outreach/demo booking.
plan crm            → design GHL/MiniCRM fields, roles, workflows, access, DNC, attribution, service cadence, and commission controls.
plan reseller       → build a future separate reseller model; never merge it into the current Partner Agreement.
update owner setup  → update the approved Business Terms and Owner Setup tracker only when Hamilton makes a new decision.
```

## 6. Guardrails

```txt
- Confidential: internal prices/costs, commission mechanics, scripts, ICP, data, vendor identity, backend operations, and client information.
- Leads and customer records remain inside approved systems. No export, outside spreadsheets, screenshots, or personal storage.
- Claims: use approved positioning. Do not promise income, revenue, savings, compliance, outcomes, staffing replacement, implementation timing, or reseller status.
- Customer contracts and sensitive documents are handled through approved MCD systems.
- The agreement drafts are business-approved but remain legal DRAFTS until California counsel reviews them.
- B2B status does not eliminate compliance, DNC, privacy, recording-consent, or state-law obligations. Do not activate Partner phone/SMS outreach until the compliance workflow is approved.
- Do not disclose the underlying platform vendor. Say "our platform" or "the underlying platform."
```
