---
author: claude
type: daily
date: 2026-06-25
project: MCD - Mercury Call Desk
---

# Session Log — MCD: Pricing Overhaul + 50/50 Commission Locked

## What We Worked On
- Reworked MCD pricing to two sets and locked the commission structure.
- Built a two-layer pricing/commission model and updated all agent-facing docs to match.

## Decisions Locked
- **Two pricing sets** (each Starter/Growth/Pro):
  - Standard (Site): $1,595 / $1,995 / $3,995 monthly; annual ~25% off ($14,355 / $17,955 / $35,955).
  - Enterprise: $5,295 / $7,595 / $9,995 monthly; annual ~20% off ($50,832 / $72,912 / $95,952).
- **Commission: flat 50% of gross profit on everything** (simple for agents + accounting).
- **Two cost layers:** partner wholesale shown to agents (Site $1,000/$1,250/$1,500; Enterprise $2,500/$3,500/$5,000) vs Hamilton's true cost (Site $50/$150/$500; Enterprise $2,500/$3,500/$5,000). Commission is paid on the wholesale basis; the hidden web spread ($950–$1,100/deal) stays with the company.

## What Was Built or Changed
- `01-agent-onboarding/[C] Pricing and Commission Model.xlsx` — rebuilt with an **Agent View** sheet and a red **Internal (Confidential)** sheet (true cost, hidden margin, company net, scenario comparison). 0 formula errors, 102 formulas.
- `04_PRODUCT_CATALOG.md` — new 2-set retail pricing (Site + Enterprise), retail only.
- `03_COMPENSATION_AND_LEAD_RULES.md` — flat 50% on gross profit vs partner wholesale schedule + worked examples (true cost kept out).
- Sales Partner Agreement **Exhibit A** — 50% flat, gross profit defined on partner wholesale; true cost noted as internal.
- `[C] AI Index & Commands.md` §4 — pricing/commission summary updated and marked LOCKED.
- `[C] Owner Setup & Open Decisions.md` — commission + pricing marked DECIDED.

## Still Open
- Fill remaining Owner Setup blanks (entity, calendars, caller ID, commission trigger/timing, post-separation residual).
- Attorney review of the agreements (esp. non-compete, arbitration, 1099, commission/clawback).
- Decide whether Enterprise should also carry an agent-facing markup (currently wholesale = true cost there).
- Update the live mercurycalldesk.com pricing page (separate repo, not in this workspace).
- Remaining onboarding gaps: recruitment posting, candidate welcome email, collateral.

## Start Here Tomorrow
Pricing + 50/50 commission are locked and reflected across the kit. Next: fill the Owner Setup blanks (so the agreement blanks can be filled), or build the recruitment posting + welcome email to start sourcing. Read `[C] AI Index & Commands.md` first.
