---
type: tracker
date: 2026-06-24
project: MCD - Mercury Call Desk
status: GATING — finalize before any agent sells live
---

# Owner Setup & Open Decisions

The items below must be finalized before agents receive live leads. Fill in the blanks as decisions are made. (Source: `01-agent-onboarding/13_OWNER_BRAND_SETUP_SHEET.md`, `03_COMPENSATION_AND_LEAD_RULES.md`, and the Gemini master manual launch checklist.)

## Brand
```txt
Legal entity name:           __________
Customer-facing name:        Mercury Call Desk (confirm)
Product / platform name:     Mercury Call Desk Platform (confirm)
Primary website:             mercurycalldesk.com (confirm)
Support email:               __________
Sales email:                 __________
Business phone / caller ID:  __________
Primary logo location:       __________
Brand colors / fonts:        __________
```

## Sales operations
```txt
Sales HQ GHL sub-account name:   __________
Owner / Administrator:           Hamilton Pinto Jr. (confirm)
Sales manager:                   __________
Implementation owner:            __________
Finance / commission owner:      __________
Approved sales calendar link:    __________
Approved demo calendar link:     __________
Approved sales phone / caller ID:__________
Approved CRM pipeline name:      __________
Approved escalation channel:     __________
```

## Compensation / payout rules to lock in the signed agreement

**DECIDED 2026-06-25:** Commission = **flat 50% of gross profit** on all packages. Gross profit = retail − partner wholesale − Stripe. Partner wholesale shown to agents: Site $1,000/$1,250/$1,500; Enterprise $2,500/$3,500/$5,000. True cost (internal): Site $50/$150/$500; Enterprise $2,500/$3,500/$5,000. Retail/pricing finalized (Site 25% annual, Enterprise 20% annual). Full math: `01-agent-onboarding/[C] Pricing and Commission Model.xlsx`.

```txt
[ ] Commission trigger (signed contract / cleared first payment / other)
[ ] Monthly residual payment timing
[ ] Annual-plan commission payment timing
[ ] Refund / cancellation / failed-payment / chargeback treatment
[ ] Downgrade / pause / upgrade / expansion treatment
[ ] Split-commission rules
[ ] Lead reassignment window
[ ] Client ownership after agent separation
[ ] Commission statement + dispute process
[ ] Commission payout day
[ ] Minimum activity expectation
[ ] First 30-day coaching cadence
```

## Legal / compliance to prepare
```txt
[~] Sales Partner Agreement — DRAFT created (01-agent-onboarding/agreements/); fill [ ] blanks + attorney review
[~] Confidentiality/IP/Non-Compete — DRAFT created (01-agent-onboarding/agreements/); fill [ ] blanks + attorney review
[ ] 3-month vertical non-compete clause (confirm enforceability by state — see draft §5)
[ ] W-9 collection + Direct Deposit authorization in onboarding flow
[ ] TCPA / outbound-calling compliance review before scaling dialing
[ ] Approved claims language enforced (no guarantees)
```

## Launch checklist (from master manual §6)
```txt
[ ] GoHighLevel CRM "document safe" structure built (Tax Documentation, Sales Scripts, Collateral)
[ ] Compliance forms loaded into onboarding workflow (W-9, Direct Deposit)
[ ] Indeed recruitment posting published (100% commission profit-sharing model)
[ ] New hires provisioned: No-Cost Demo script, ICP sheets, CRM logins
[ ] Sulus.ai reseller relationship / base-cost structure confirmed
```

## Notes
- Nothing here is legal advice; the signed Sales Partner Agreement and approved policies control. Have an attorney review the agreements, non-compete, and compliance posture.
