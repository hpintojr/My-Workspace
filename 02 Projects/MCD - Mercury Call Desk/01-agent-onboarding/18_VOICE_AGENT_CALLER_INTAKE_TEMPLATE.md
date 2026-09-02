# Voice Agent Caller Intake Template

## What this is

This is the field-and-flow template implementation uses when building a client's AI voice agent knowledge base — it defines what the agent actually asks an end customer who calls in, not MCD's own sales script (`06_OUTBOUND_CALL_SCRIPT.md`) and not MCD's own brand setup (`13_OWNER_BRAND_SETUP_SHEET.md`). Use it during onboarding to fill in the client-specific version, and reference it when QA-testing a new agent build (see the ~100-call QA pass pattern noted in `16_KNOWLEDGE_BASE_AND_CALL_REVIEW.md`).

Trade modules below are aligned to the same trade categories the CRM's own Dispatch Settings offers (Solo routes, Service and install, Quoted installs, Crew projects, Commercial routes, Restoration), so the agent's intake fields and the CRM's service-type setup stay in sync for a given client.

## Universal core intake (every call, every vertical)

Ask in this order; skip a field only if the caller already volunteered it.

1. **Caller name**
2. **Best callback number** (confirm even if caller ID captured it — caller ID can be a shared/office line)
3. **Service address or service area** (confirm it's within the client's coverage area before going further)
4. **What they need** (open-ended — let them describe it before offering categories)
5. **Timing** — "sometime before Friday" style windows, not a hard-locked exact slot (see Booking and estimate framing below)
6. **How they heard about us** (optional, log if offered — useful for the client's own marketing attribution, don't press if they don't know)
7. **Anything the office should know before the visit** (access instructions, gate codes, pets, parking)

## Booking and estimate framing rules

- Never lock an exact price on the phone unless the client has an approved flat-rate menu for that exact service — default to "the technician will confirm the exact price on-site" or "we do an on-site estimate."
- Keep booking windows loose ("sometime before Friday," "morning or afternoon") rather than hard-locking an exact slot, unless the client's calendar setup uses fixed appointment slots — hard-locking against an all-day block is the specific double-booking failure documented in `16_KNOWLEDGE_BASE_AND_CALL_REVIEW.md`.
- If the caller pushes for an exact number, give the client's published starting price/range if one exists in their catalog, then reconfirm it's an estimate pending on-site confirmation.
- Always confirm timezone if the client operates across multiple time zones.

## Trade modules

### Junk removal / waste & debris removal

- What items, roughly how much (e.g., "a truckload," "a few bags," "an appliance")
- Any prohibited/hazardous items: paint, chemicals, tires, batteries, refrigerants, propane tanks — flag these explicitly rather than silently booking; if the client doesn't take an item, say so and don't guess
- Access: stairs, elevator, how far from truck to load
- Preferred pricing frame: "quarter load," "half load," "full load" style if the client uses volume-based pricing — confirm the client's actual tiers before using this language
- After-hours handling: if closed, capture info anyway rather than voicemail-only — 80%+ of callers who hit voicemail don't leave one and call the next company

### Service and install (HVAC, plumbing, electrical)

- Service type: diagnostic, repair, install, or maintenance
- What's happening (symptom description in the caller's own words — don't force early diagnosis)
- Is this an emergency (no heat/AC, active leak, no power, safety hazard) — route emergencies to the fastest available slot or immediate transfer per the client's escalation rule
- Equipment age/brand if known (not required — don't block booking on this)
- Whether someone will be home for the appointment window

### Solo routes (lawn, windows, pest)

- Property size/type (residential vs. commercial) if relevant to pricing
- Recurring service interest vs. one-time
- Any pets or access restrictions relevant to the service (e.g., pest treatment and pet safety)

### Quoted installs (softeners, generators, fencing)

- Project scope in the caller's words
- Whether they want a phone estimate or require an in-person assessment (default to in-person unless the client has published fixed pricing)
- Timeline expectations (are they trying to book before a specific date/event)

### Crew projects (multi-day installs, remodels)

- Project scope and rough size/scale
- Whether they have plans/permits already or need help there
- Preferred contact method for follow-up (multi-day projects usually need a human sales/estimate conversation — flag for callback rather than trying to fully qualify on the intake call)

### Commercial routes (janitorial, property services)

- Business name and property type
- Current provider, if any, and what's prompting the call (helps the human follow-up team, don't push the caller to justify switching)
- Number of locations if multi-site
- Decision-maker name/role if the caller isn't the decision-maker — capture who to route the follow-up to

### Restoration (water, fire, insurance work)

- Is this active/ongoing damage (water actively flowing, fire just occurred) — treat as emergency-routing by default
- Insurance claim already filed? Insurance company name if known (don't require it to book)
- Safety concerns on-site (structural, electrical near water, etc.) — flag for immediate human escalation, don't attempt to advise

## Escalation / transfer-to-human triggers

Build these into every client's agent regardless of vertical:

- Caller explicitly asks for a human
- Emergency/safety language (active leak, no heat in freezing weather, fire, gas smell, injury)
- Pricing negotiation beyond the published range
- Complaint about a past job or an existing customer issue
- Anything the agent's knowledge base doesn't cover — the agent should say so plainly and offer callback rather than guessing

Escalation design should avoid forwarding loops — route to a dedicated line and confirm with the client during setup how "everyone's in the field" scenarios get handled (see call transcript synthesis for two real examples of this problem being solved).

## What NOT to capture

- Payment card numbers, bank account/routing numbers, or any payment info over the phone — direct to a secure payment link or human-handled payment flow instead.
- Government ID numbers, SSNs, or health information.
- Do not continue an intake if the caller invokes DNC/opt-out language — log it and stop per `07_CRM_SOP.md` Section 7, same rule as MCD's own outbound calls.

## Client onboarding checklist (fill in per client before launch)

- [ ] Confirm which trade module(s) apply and whether any need custom fields beyond the templates above.
- [ ] Confirm the client's actual pricing structure (flat-rate menu vs. estimate-only) so booking/estimate framing is set correctly.
- [ ] Confirm service area boundaries and what the agent says for out-of-area callers.
- [ ] Confirm escalation number(s) and hours, and test the transfer-to-human path end-to-end before go-live.
- [ ] Confirm the client's list of prohibited/excluded items or services, if applicable.
- [ ] Run the standard QA test-call pass before go-live (see `16_KNOWLEDGE_BASE_AND_CALL_REVIEW.md` for the ~100-call pattern referenced in the transcripts).

