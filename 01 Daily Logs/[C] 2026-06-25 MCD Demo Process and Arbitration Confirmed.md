---
author: claude
type: daily
date: 2026-06-25
project: MCD - Mercury Call Desk
---

# Session Log — MCD: Demo Handoff Process + Arbitration Confirmed

## What We Worked On
- Confirmed the arbitration clause in the Sales Partner Agreement.
- Documented the appointment-setting role + demo-handoff model across the kit and agreement.

## Confirmed
- Sales Partner Agreement **Section 10 — Dispute Resolution; Binding Arbitration** is present: binding individual arbitration, class-action waiver, small-claims + IP-injunction carve-outs, California governing law. (A 30-day opt-out can be added if Hamilton wants one.)

## What Was Built or Changed
- New `01-agent-onboarding/14_DEMO_PROCESS_AND_HANDOFF.md`: agent's #1 job is to set the qualified appointment; Hamilton/company service rep joins and leads the demo at first (we're a wholesaler); agents graduate to running demos solo with company backup; demos are usually phone/video using a pre-trained sample AI assistant; company can personalize and can do real API/live data when set up.
- **Honesty guardrail** in that doc + agreement: present the demo as a representative sample; do NOT claim it is live-connected to the prospect's systems/data unless that integration is actually configured. Ties to 08_COMPLIANCE.
- `01_WELCOME_PACKET.md` — role section updated to make appointment-setting the #1 job and point to doc 14.
- Sales Partner Agreement **Section 1.4** added: primary deliverable = booking qualified demos; demos conducted/led by Company until the partner is certified; demo honesty requirement.
- AI Index structure list updated to include doc 14.

## Still Open
- Owner Setup blanks (entity, calendars, caller ID, commission trigger/timing) → then fill agreement blanks.
- Attorney review of agreements (arbitration, non-compete, 1099, demo/claims language).
- Decide on a 30-day arbitration opt-out for agents (optional).
- Recruitment posting + candidate welcome email; remaining collateral.

## Start Here Tomorrow
Demo process + arbitration are set. Next: fill the Owner Setup blanks so the agreement is finalize-ready, or draft the recruitment posting + welcome email to begin sourcing agents. Read `[C] AI Index & Commands.md` first.
