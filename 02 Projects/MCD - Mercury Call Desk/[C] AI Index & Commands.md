---
type: index
date: 2026-06-24
project: MCD - Mercury Call Desk
audience: Claude, ChatGPT, Gemini (and any future AI assistant)
---

# AI Index & Commands — MCD (Mercury Call Desk)

Single source of truth and control layer for the MCD project. Any AI tool reads this file first, then the relevant phase files. If a tool can't read files directly, the operator pastes the relevant section in.

## 1. What MCD is

```txt
Mercury Call Desk = AI receptionist / call-desk automation platform (on a third-party platform base + dev; vendor name CONFIDENTIAL — do not disclose to agents/prospects/public).
Sold by commission-only 1099 Sales Partners via a "no-cost demo" outbound model.
Managed in GoHighLevel (GHL). Reseller-partner pathway for scaling.
Domain (assumed): mercurycalldesk.com  →  confirm in Owner Setup.
```

## 2. Read order (every AI, every session)

```txt
1. MCD - Mercury Call Desk Overview.md            (goal, phases, business at a glance)
2. [C] AI Index & Commands.md                     (this file)
3. [C] Owner Setup & Open Decisions.md            (what must be finalized before agents sell live)
4. 01-agent-onboarding/00_READ_ME_FIRST.md        (then the rest of the numbered kit in order)
5. 99-reference/[C] Master Ops Manual (Gemini).md (recruitment, scripts, pricing/commission math, legal)
```

Do not change pricing, commission rates, scripts, or compliance language without checking the kit + Owner Setup and getting Hamilton's approval.

## 3. Structure

```txt
00 (root)                MCD Overview · this index · Owner Setup & Open Decisions
01-agent-onboarding/     The Sales Partner Launch Kit (canonical onboarding). Files 00–13:
                         + agreements/ : [C] Sales Partner Agreement (DRAFT) · [C] Confidentiality and IP Agreement (DRAFT)
                           — drafts only; fill blanks + attorney review before use. No non-compete (removed); non-solicit only.
                         + recruiting/ : [C] Recruiting Posting and Outreach · [C] Applicant Screening and Interview Kit
                         + collateral/ : Email & Text Templates · Recording Disclosure & Openers · One-Page Overview · Demo Outline & Talk Track
                         + [C] Pricing and Commission Model.xlsx (Agent View + Internal/Confidential)
                         00 read-me · 01 welcome · 02 first-7-days · 03 comp & lead rules ·
                         04 product catalog · 05 ICP & discovery · 06 outbound script ·
                         07 CRM SOP · 08 compliance · 09 certification scorecard ·
                         10 first-30-days · 11 manager checklist · 12 new-hire acknowledgment ·
                         13 owner brand setup sheet · 14 demo process & handoff · + distributable .docx
02-crm-gohighlevel/      GHL CRM phase (NEXT): pipelines, routing, doc safe, onboarding workflow, comp tracking.
                         + [C] MCP Config Template.md · [C] Sales Calendar Setup Note.md · [C] CRM Phase — Placeholder.md
                         Live GHL location id: lEdLVFW0uqKMhmkgFrsX (FutureAssistant.ai → "Mercury Call Desk" sub-account).
03-reseller-channel/     Reseller-partner channel (LATER).
99-reference/            Gemini master ops manual + the source conversation record.
```

## 4. Pricing & commission (LOCKED 2026-06-25 — confidential)

```txt
Two pricing sets, each Starter/Growth/Pro. Commission = flat 50% of GROSS PROFIT on ALL packages.
GROSS PROFIT = retail − PARTNER WHOLESALE − Stripe (2.9%+$0.30). (Agents are paid on the partner
wholesale schedule, NOT Hamilton's true cost, which is internal/confidential.)

                 Retail/mo            Annual (upfront)     Partner wholesale/mo
Standard (Site):
  Starter        $1,595               $14,355/yr (25% off) $1,000
  Growth         $1,995               $17,955/yr           $1,250
  Pro            $3,995               $35,955/yr           $1,500
Enterprise:
  Starter        $5,295               $50,832/yr (20% off) $2,500
  Growth         $7,595               $72,912/yr           $3,500
  Pro            $9,995               $95,952/yr           $5,000

Reseller status unlocks ~$10k–$30k+/mo residual. Exact rates/costs are CONFIDENTIAL; signed agreement controls.
Full model: 01-agent-onboarding/[C] Pricing and Commission Model.xlsx (Agent View + Internal/Confidential sheet).
```

## 5. Shared commands (same meaning in any AI)

```txt
read mcd            → load the read order in §2, then summarize current phase + open decisions.
onboarding status   → report which Owner Setup items + agreements are still unfinished.
draft job post      → produce/refine the recruitment posting (base: 99-reference master manual §1).
build onboarding    → edit/extend the 01-agent-onboarding kit files (keep numbering + positioning rules).
certify agent       → walk an agent through 09_CERTIFICATION_SCORECARD before live leads.
plan crm            → work the 02-crm-gohighlevel GHL setup (pipelines, routing, doc safe, comp tracking).
plan reseller       → work the 03-reseller-channel pathway/terms.
update owner setup  → fill blanks in [C] Owner Setup & Open Decisions.md as Hamilton confirms them.
```

## 6. Guardrails

```txt
- Confidential: pricing, commission math, scripts, objection handlers, ICP. Don't publish or share outside authorized partners.
- Leads are company records — worked only inside the CRM; never exported/screenshotted/kept outside approved systems.
- Claims language: use "tailored demo / what's practical for your workflow." Avoid guarantees ("never miss a lead," "fully compliant," "replaces staff," guaranteed revenue/savings).
- This kit is onboarding/ops guidance, NOT an employment or commission contract. The signed Sales Partner Agreement + approved policies control.
- Compliance: outbound calling is subject to TCPA and related rules; confirm before scaling dialing.
- The signed agreements (Sales Partner Agreement, NDA) and Owner Setup must be finalized before any agent sells live.
- AI-authored workspace files use the [C] prefix.
- Do NOT disclose the underlying platform vendor's name to agents, prospects, or in public/marketing materials — refer to it as "our platform" / "the underlying platform." No non-compete is used (removed); rely on confidentiality + IP + non-solicitation.
```

## 7. Open decisions
See `[C] Owner Setup & Open Decisions.md` — the gating checklist before agents receive live leads.
