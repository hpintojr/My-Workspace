# Sales Knowledge Base & Call Review — Reference Notes

*Added 2026-08-31. Source: DIAL CLUB Discord (#faq), thread "Has anyone built their own dialer setup?", read 2026-08-31.*

## Why this doc exists

Hamilton asked for the MCD sales scripts and training material to be refreshed, using that Discord thread as a reference point for what independent dialer/CRM builders are actually doing day to day. This doc records what came out of that thread and where it landed in MCD's onboarding docs, so the source is traceable.

## What the thread covered

Several members in the channel described building their own outbound dialers (Twilio + Claude/Deepgram, mostly on Vercel or local Next.js/Flask apps) rather than renting seats from Convoso/Mojo/ReadyMode/Dialpad. Recurring patterns across their setups:

- A **disposition** recorded at the end of every call attempt (gatekeeper positive/negative, voicemail left, info requested, demo booked, not interested, no answer, hung up), tracked separately from pipeline/deal stage.
- Selective call transcription — several only transcribe calls tied to a follow-up action (info requested, demo booked), not every call, to control cost.
- A feedback loop where objections that come up on live calls get folded back into the team's objection-handling doc, sometimes AI-assisted.
- One member's dialer was already running for two agents; several others were 70–100% done building their own.

## What changed in MCD's docs as a result

- `07_CRM_SOP.md` — added Section 9 (call disposition log + `NEW OBJECTION` feedback tag).
- `06_OUTBOUND_CALL_SCRIPT.md` — added a Voicemail Script and a Quick-Reference Objection table.

## What did NOT change

- No new dialer, transcription, or recording tool was adopted. MCD's approved CRM/GHL tooling (Section 1 of the CRM SOP) is unchanged.
- No production system, lead data, or agent-facing tool was touched.

## Where this lives once the CRM migrates

Hamilton is migrating off the custom `crm.mcd` (Vercel/Neon) build to a GoHighLevel-based CRM at `crm.sulus.ai` (location `6R986ILIQydGAU4T1l74`). See `02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md` and its Overview for the freeze status. Once that migration is scoped, this knowledge base is a natural fit for a GHL-side resource/document library so agents can reach it from inside the CRM they actually work in — that build-out is separate, future-scoped work, not part of this update.
