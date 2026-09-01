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

## Call transcript synthesis — 25 DIAL CLUB recordings (2026-08-31)

*Source: 25 real cold-call/demo call transcripts (23 unique after de-duplication — 2 files were byte-identical) covering the recordings Hamilton downloaded from DIAL CLUB's `#call-reviews` and `#daddy-call-recordings` channels before cancelling the subscription, then had transcribed. Read in full and synthesized below.*

**Important — this is reference/pattern material, not MCD's script or pricing.** Nearly all calls are one seller ("Jeremy," company "RingHouse," ringhouse.io) working a junk-removal-heavy call block, not MCD partners. The pricing figures below ($95–199/mo tiers, per-minute rates) belong to RingHouse, not MCD — do not quote them to prospects. Anything here that should become part of MCD's approved script (`06_OUTBOUND_CALL_SCRIPT.md`) needs Hamilton's review and sign-off first, same rule as the Dial Daddy material in `17_DIAL_CLUB_DISCORD_ARCHIVE.md`.

Vertical mix: junk removal / dumpster rental / waste management (majority), plus landscaping, towing, security systems, storm/board-up restoration, and solar. Two transcripts have rough audio quality (garbled cross-talk or unclear speaker attribution) — flagged inline where it affects confidence.

### 1. Openers that worked vs. fell flat

Dominant pattern (near-verbatim in 18+ of 23 calls) — a customer-inquiry-style opener rather than a sales opener:

> "Hi, I just wondered what time you guys close / shut down for the day." → "If I were to call after [X], does it just roll to voicemail, or do you guys still pick up?" → "I was actually just calling to see how you're currently handling those after-hour calls." → "Have you considered using a voice agent to help out with some of those calls?"

Works because it reads as a real customer question, so the prospect answers before their guard is up, and it surfaces the exact pain point the pitch addresses. Leading with name + company first (before the closing-time question) also worked. Fell flat against: no real decision-maker on the line, prank/troll answers, and prospects who volunteer they get almost no calls (removes the urgency hook regardless of pitch quality).

### 2. Objections encountered and how they were handled

**"Already have an answering service / already have AI"** — Ask directly what they currently pay, then pivot to quality/customization rather than trying to beat price on a bundled add-on ("cookie-cutter" vs. "sounds like a human that's worked for your business for 10 years"). Don't try to pull a prospect off an active contract — frame it as "just looking for feedback" and let the price contrast speak for itself. Being candid about AI's real limits (e.g., "AI can get pricing wrong — best practice is to say we do an on-site inspection") visibly built trust rather than costing credibility.

**"Not interested"** — A flat "not interested" from someone who'd tried a voice agent before and disliked it was recovered with: "What if there was a scenario where maybe the voice agent that you tried out before sucked? What if there was one that didn't suck?" — this produced the richest, most extended demo conversation in the dataset. Not every "not interested" recovers; one call ended cleanly with no real recovery attempt.

**"Send me info via email"** — Standing counter, used repeatedly: "The email really won't do it justice — you kind of have to hear it to know if it provides value." Holding firm on a live phone demo (declining to send a YouTube link or set up Zoom) still landed bookings. When a prospect wanted to research the company first, the rep didn't fight it and acknowledged the real constraint ("owner-operators, especially in junk removal, have crazy schedules — I totally get it").

**"I'm the owner and I'm busy"** (driving, payday, in the field) — Handled by locking a specific future time immediately, anchored to the prospect's own words (a callback tied to payday, a specific day/time with a calendar invite).

**"Already looked into AI voice agents"** (burned before, worried customers will notice) — Countered with vertical-specific social proof (a named-size client, high call volume, high automation %) and an explicit escalation/disclosure design ("I'm just here to assist my team — if you want to speak to a real person I can have them call you back").

**Wants a human / distrust of AI as "just a recording"** — Reframing the rep as a founder ("not a telemarketer") and contrasting custom-built vs. generic bundled AI worked in some calls. One call never fully resolved this skepticism ("they get somebody supposedly real, which is just still a recording") — ended on a callback with lingering doubt. Not every objection has a clean answer; log it as `NEW OBJECTION` per CRM SOP Section 9 rather than forcing a close.

**Pricing/cost objections** — The one clean, unrecovered loss in the dataset combined a hard price objection with the rep offering no lower tier or trial. Where a lower/trial tier was offered instead, or a price contrast against a named pricier incumbent was used, the objection didn't end the call.

**Skepticism about AI transcription/reliability** — The clearest technical-credibility loss: background noise caused a business term to be mis-transcribed during a demo on a generic shared demo line, and the prospect passed. This argues for routing prospects to a business-specific demo rather than a shared generic one.

**"Wants to talk to a human" as a late-stage design requirement** — On calls that were already close to closing, real time was spent on *how* transfer-to-a-human should work (avoiding forwarding loops, secondary numbers, "everyone's in the field" scripting) — a distinct objection that shows up after interest is established, not before.

### 3. What made a demo booking succeed

- Explicit no-pressure framing repeated more than once per call ("I wasn't trying to sell you anything," "you either like it or you don't").
- The demo already exists or can be built almost instantly (crawling the prospect's own website/knowledge base in seconds).
- Zero technical friction — stay on the phone, no computer or Zoom needed.
- Concrete, vertical-specific social proof (a specific client size, call volume, automation %) rather than generic claims.
- Live math done on the prospect's own numbers (their average ticket × their estimated missed calls/week = a dollar figure).
- Immediate calendar-locking — every successful booking ends with a specific day/time, timezone, and an email captured for an invite.
- Low/no-risk framing (short trial, small setup cost, month-to-month, cancel anytime).

### 4. What made a call fail or end

- Genuinely low call volume — no reframe overcomes an absent pain point.
- A bad first impression of AI accuracy on a generic shared demo line.
- A hard price objection met with no flexible fallback offered.
- No access to a real decision-maker.
- The prospect distracted by an unrelated, more urgent problem.
- Prank/troll calls.
- A values/philosophy mismatch ("I want to stay friendly, not automated") where the rep didn't attempt the human-sounding/custom-voice reframe that worked elsewhere.

### 5. Junk-removal-specific pain points (primary target vertical)

- Voicemail is treated as a lead-killer — the recurring claim used on calls: most people who hit voicemail hang up and call the next company on Google rather than leave a message.
- Missed calls while physically on the job (loading trucks, driving), plus multiple simultaneous callers getting put on hold.
- Poor cell reception in parts of the service area, independently mentioned by more than one prospect.
- Not being listed as open 24/7 hurts Google ranking relative to always-on national competitors.
- Speed-to-lead is existential in this vertical — one prospect, unprompted: "they're going to call you and then they're calling the next guy, so you got to be on top of it." Another described losing a job to a national competitor because of a missed call.
- High average ticket size (several hundred dollars) makes each missed call expensive.
- Existing answering services sometimes bill for unproductive "gathering info" minutes, which prospects resent.
- Booking dates are usually kept vague ("sometime before Friday") rather than hard-locked, to avoid double-booking against all-day appointment blocks.
- Prohibited/hazardous items (paint, chemicals, tires, batteries, refrigerants) need to be in any knowledge base built for this vertical.
- Final price should be positioned as an on-site estimate, not something locked on the phone.
- Named national competitors (e.g., 1-800-GOT-JUNK) came up repeatedly as the always-on alternative prospects fear losing business to.

### 6. Pricing, package, and contract patterns observed (RingHouse pricing — reference only, not MCD's)

- Tiered by minutes included, with a falling per-minute rate as volume increases.
- Positioned against traditional answering services as meaningfully cheaper.
- Fractional/per-second billing (not rounded to the minute) was received as a trust-builder.
- Spam calls framed as costing almost nothing since spammers hang up on the automated system quickly.
- Month-to-month, no contract, cancel-before-next-billing-date framing used consistently as a trust-builder.
- A setup/activation fee waived live on the call, framed as a reason not to need a follow-up call, was used successfully as a closing technique.
- "Start small, reassess after a trial period" recovered more than one pricing-tier stall.
- Comparing against a named, pricier incumbent's actual monthly cost consistently outperformed presenting price alone.
- Onboarding timeline quoted as roughly a week, including a batch of QA test calls before going live.

### 7. Swipe-file lines (technique reference, not approved script)

Rep lines worth studying for technique (not for verbatim use without review):
- "I wasn't trying to sell you anything today. I was really just trying to get you to listen to a demo that I built you already."
- "The email really won't do it that much justice. Once you hear it, you'll be able to see if it can provide value for your business."
- "What if there was a scenario where maybe the voice agent that you tried out before sucked? What if there was one that didn't suck?"
- "I'm one of the founders over here, so believe it or not, I'm actually not a telemarketer."

Prospect lines worth knowing (they show what the pain point actually sounds like in a real junk-removal owner's words):
- "In the junk removal industry, they're going to call you and then they're calling the next guy, so you got to be on top of it."
- "She got quoted by 1-800-junk... you missed out." (describing a lost job after a missed call)
- "They can't even have a real person talk to me?" (initial resistance to automation)
- "I mean, they get somebody that's supposedly somewhat real on the phone, which is just actually still a recording." (unresolved skepticism — a real objection MCD partners will hear)

### Takeaways for MCD sales enablement

1. The "what time do you close" style opener is the highest-leverage technique in this dataset — it gets a real answer before the prospect's guard is up, and downstream success depends on real pain, not opener cleverness.
2. Getting a prospect onto a live, phone-only demo (no computer, no Zoom) should be treated as the primary mid-call objective — it converted better than any email-first path in the dataset.
3. Vertical-specific social proof (a real client's size, call volume, automation %) consistently outperformed generic claims.
4. Quantifying missed-call cost live, using the prospect's own numbers, is a repeatable technique worth training on.
5. The one clean loss in the dataset combined two avoidable failures: a bad first technical impression on a generic shared demo (not a business-specific one), and a rigid response to a price objection with no fallback tier offered. Both are addressable in MCD's own process.

## Where this lives once the CRM migrates

Hamilton is migrating off the custom `crm.mcd` (Vercel/Neon) build to a GoHighLevel-based CRM at `crm.sulus.ai` (location `6R986ILIQydGAU4T1l74`). See `02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md` and its Overview for the freeze status. Once that migration is scoped, this knowledge base is a natural fit for a GHL-side resource/document library so agents can reach it from inside the CRM they actually work in — that build-out is separate, future-scoped work, not part of this update.
