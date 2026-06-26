---
type: tracker
date: 2026-06-24
updated: 2026-06-25
project: MCD - Mercury Call Desk
status: Mostly LOCKED. A few setup items open (calendar, per-agent GHL env, MCP, final font/outlined logo release).
---

# Owner Setup & Open Decisions

Confirmed values below feed the Sales Partner Agreement, comp docs, and CRM. (Source sheet: `01-agent-onboarding/13_OWNER_BRAND_SETUP_SHEET.md`.)

## Brand (CONFIRMED)
```txt
Legal structure:        Sole proprietorship — Hamilton Pinto Jr. dba Mercury Call Desk
Customer-facing name:   Mercury Call Desk
Product / platform:     Mercury Call Desk (AI call desk on a third-party platform base — vendor CONFIDENTIAL, do not disclose)
Primary website:        mercurycalldesk.com
Apply / general:        hello@mercurycalldesk.com  ·  Instagram @hpintojr
Support email:          support@mercurycalldesk.com
Sales email:            sales@mercurycalldesk.com
Business phone / caller ID: (909) 276-7631  (interim — moving to AI assistant later)
Primary logo / colors:  `04-brand-assets/` SVG system added — blue/cyan icon; navy wordmark for light backgrounds; white wordmark for dark backgrounds. Final font + outlined release pending.
```

Brand source of truth: `02 Projects/MCD - Mercury Call Desk/04-brand-assets/00_READ_ME_FIRST.md` and `04-brand-documentation/[C] Logo Asset Catalog.md`.

## Sales operations
```txt
Owner / Administrator:   Hamilton Pinto Jr.
Sales manager:           Hamilton Pinto Jr.
Implementation owner:    Hamilton (+ company service reps lead/join demos for now)
Finance / commission:    Hamilton Pinto Jr.
CRM:                     GoHighLevel via FutureAssistant.ai partner portal; sub-account "Mercury Call Desk"
Live pipeline + stages:  New Lead → Initial Contact Made → Demo Scheduled → Demo Completed →
                         2nd Demo & Review → Estimate Sent (Enterprise) → Closed Won / Closed Lost
Escalation channel:      [ TBD — likely the partner group chat + direct to Hamilton ]
Caller ID:               (909) 276-7631 (interim)

OPEN — Sales/Demo calendar:  Currently on hpintojr@gmail. Plan: create a dedicated MCD Google account
  (e.g., mcd@gmail / scheduling@mercurycalldesk.com) and relink it to GHL. (Help needed — see calendar note.)
OPEN — Per-agent environment: Hamilton + Account Executive to build an enclosed GHL environment per agent.
OPEN — MCP access: Hamilton arranging MCP access; needs a JSON config (template drafted in 02-crm-gohighlevel/).
```

## Compensation / payout (LOCKED 2026-06-25)
```txt
Commission:              flat 50% of gross profit (all packages).
Gross profit:            retail − partner wholesale − Stripe (2.9% + $0.30).
Partner wholesale (agent-facing): Site $1,000/$1,250/$1,500 · Enterprise $2,500/$3,500/$5,000.
True cost (INTERNAL):    Site $50/$150/$500 · Enterprise $2,500/$3,500/$5,000.
Commission trigger:      cleared first payment.
Monthly residual payout: net-15 after collection.
Annual-plan commission:  50% of annual gross profit, paid after funds clear (upfront).
Clawback:                reverse/offset on refund, chargeback, or cancellation within 90 days.
Downgrade/pause/upgrade: commission adjusts to the new collected amount going forward.
Split commission:        manager (Hamilton) decides case-by-case.
Lead reassignment:       7 days with no documented activity.
Client ownership/separation: client remains Company's; residuals STOP at termination.
Commission statement:    monthly; disputes in writing within 30 days or statement is final.
Coaching cadence:        daily check-ins first 3 days, weekly thereafter (first 30 days).
Minimum activity:        [ TBD — suggest a weekly funnel target, e.g., 100 outreach/week ]
Full math: 01-agent-onboarding/[C] Pricing and Commission Model.xlsx
```

## Legal / compliance (decisions)
```txt
Governing law:           California.
Termination notice:      14 days; immediate for cause.
Arbitration:             binding individual arbitration + class-action waiver. NO 30-day opt-out.
Non-compete:             REMOVED — none used. Protection via confidentiality + IP + non-solicitation.
[ ] Sales Partner Agreement — blanks filled (2026-06-25); attorney review pending.
[ ] Confidentiality, IP & Non-Solicitation — blanks filled (CA); attorney review pending.
[ ] W-9 + Direct Deposit in onboarding flow.
[ ] TCPA / outbound-calling review before scaling dialing.
```

> **Restrictive covenants:** No non-compete is used (removed by decision; California broadly voids them anyway under Bus. & Prof. Code §16600). Protection relies on **confidentiality + IP assignment + non-solicitation** — have an attorney confirm the non-solicitation scope/duration.

## Launch checklist
```txt
[ ] GHL "document safe" (Tax Documentation, Sales Scripts, Collateral)
[ ] W-9 + Direct Deposit in onboarding workflow
[x] Job posting ready (Indeed); IG/Telegram outreach + group-chat welcome drafted
[ ] New-hire provisioning: scripts, ICP, CRM login, per-agent environment
[ ] Underlying-platform reseller relationship + base-cost confirmed (vendor confidential)
[ ] Dedicated sales/demo calendar created + linked to GHL
[ ] MCP access + JSON config
```

## Notes
- Not legal advice; the signed Sales Partner Agreement and approved policies control. Attorney review recommended, especially arbitration, non-solicitation scope, and 1099 classification.
