# DIAL CLUB Discord — Archive Before Subscription Cancellation

*Archived 2026-08-31. Hamilton is cancelling his DIAL CLUB Discord subscription/membership; this captures what's useful before access ends. Source: discord.com, server "DIAL CLUB" (guild 1515919903826378843), read live in Hamilton's own browser session across #community-chat, #call-reviews, #wins, #losses, #marketplace, #faq, #resource-hub, and #community-forum (Suggestion Box thread). #socials and #daddy-call-recordings were not read in detail (low text value). This is recent-history only — Discord loads the newest messages first, so older scrollback in any channel was not captured.*

## Why this exists

DIAL CLUB is a community of independent AI-receptionist / outbound-dialer agency operators (the "Dial Daddy" community) — the same business model MCD runs (commission sales partners cold-calling local service businesses). Before losing access, this doc pulls out what's reusable: the problems other operators are actually hitting, and the fixes/templates the community already worked out.

## Common problems agencies/agents report, and what the community did about them

### 1. Carrier/telephony cost economics don't match the sales pitch at scale

An operator running 25-30K outbound dials/month (4 SDRs) trying to scale to 80-120K/month found that Telnyx/Twilio's 60/60 billing rounds every answered call up to a full minute, so ~59% of connects under 10 seconds (voicemail, quick hangups, gatekeepers) turn ~4,700 actual talk-minutes into ~12,000 billed minutes at 25K dials. At 80K dials that's ~15,000 actual minutes vs. ~38,000+ billed minutes, plus short-duration/abandoned-call surcharges ($0.005/call on Telnyx) and a 15% short-call-ratio threshold that can trigger surcharge/review/suspension. Net: ~$800/month at 80K dials despite a "dirt cheap" per-minute rate. Their fix: shop for an unmetered SIP provider that explicitly approves high-volume B2B outbound with a low average-call-duration profile, instead of a retail SIP account.

### 2. SDR/setter hiring and retention is the hardest part of scaling

Multiple threads on where to find reliable setters (no consensus site; one operator hires hybrid recruiter/BDR from Filipino VA sites). General take: "very very very difficult to find a highly competent, reliable, honest person who's not already running their own thing" — interview process is the main reliability filter available. On pay: commission-only is broadly seen as bad for retention ("commission only sales jobs are for the birds"); a small base pay plus clear KPIs keeps a good setter without funding low effort.

### 3. Client no-shows and ghosting before signing

Universal pain point — "every time someone no-shows a meeting I get this urge to throw a brick through their front window." Reminder cadence (text + email, multiple touches) is the community's main lever, though even operators running one admit they haven't optimized it. Ghosted prospects do sometimes still show and sign — don't write them off.

### 4. AI transcription/voice-agent accuracy on niche business terms

Real example: a demo-line transcriber heard "Towing" as "Boeing" on a call from a towing company lead — this kind of misheard-industry-term failure is a recurring credibility risk on first-touch demo calls, worth testing your own agent against your actual target verticals' vocabulary before relying on it live.

### 5. SMS/A2P compliance risk

Community reference to "A2P Ban Speedrun training" (mocking a named third-party sales trainer) as a cautionary example — implies real A2P 10DLC registration/compliance failures are common enough among agencies pushing SMS outreach that it's a known failure mode, not just a rumor.

### 6. Contract and liability structure for AI-delivered services

Most-requested resource in the whole server (Suggestion Box: at least 5 separate people asked for a contract/legal template). Community consensus, not legal advice: no official template exists; eForms' free independent-contractor service-agreement tool (https://eforms.com/employment/independent-contractor/service-contract) is a workable starting point; a liability clause disclaiming responsibility if the AI "goes rogue" on a call is considered essential, worded to protect without alarming the prospect; a lawyer should draft or at least review before use, though bootstrapped operators commonly have Claude adapt a template first and get review later. UpCounsel (https://www.upcounsel.com/) was recommended for sourcing a lawyer on a bid basis.

### 7. What to ask a new client before building their agent

For SMB clients (vs. enterprise, which usually has real ops/workflows already), the intake form *is* the discovery process since there's rarely a live scoping meeting. Community-built intake checklist: company name/website/contact, business hours and time zone(s), service areas, services + pricing (and how the client wants pricing discussed), what data the agent should capture, desired agent tone/voice, top 5-10 FAQs, edge cases, call-transfer rules (names/titles/numbers/routing), mobile carrier or VOIP system (determines call-forwarding instructions), CRM in use and whether data should push/pull/both, and whether scheduling ties into an existing calendar system.

### 8. Cold outreach performance expectations (so operators can tell normal from broken)

Connect rate on cold dials: 5-8% is now normal (spam filtering killed the old 15-20% numbers people still quote). Connect-to-demo-booked: 20-40% (the stage script/offer actually controls). Dial-to-booked-meeting blended: 2-3% industry-wide, 6-10% for top performers. Demo-to-close: no reliable public benchmark, track your own. Vertical matters a lot — home services/business services convert 2-3x better than SaaS. List quality alone can swing numbers 3-4x. Guidance: run 200-300 dials, track your own funnel before optimizing anything. Separately: a full first month at 0% close rate on demos is considered normal, not a red flag.

### 9. Payment collection from small-business clients

PandaDoc can capture card details directly in the signed contract and store them in Stripe, enabling auto-charge at renewal instead of manual phone collection.

### 10. Getting an AI voice agent onto a live call for a demo

Native phone merge (iPhone "Add Call" + "Merge", or Android equivalent) works with zero setup but makes your phone the single point of failure for the whole call. A dial-in conference bridge (FreeConferenceCall.com, Zoom/Google Meet phone dial-in, UberConference/Dialpad, or Twilio's own <Conference> verb) is considered cleaner for demos — no single phone drops the call, and it's easier to record.

## Directly reusable material

- **Cold email formula** (community-endorsed, from #faq "What should my cold email look like?"): four parts in order — a specific personal-intro line (proof it's not a mass blast), a one-sentence pain-into-solution line, a live demo number to call instead of copy to read, and a soft low-friction CTA ("Worth a quick chat?" not "Book a call now"). Cut any line that doesn't earn the next line.
- **"Saw your truck" tactic**: photographing a prospect's company vehicle/advertising and referencing it in a follow-up email or call reliably starts a conversation, per two independent operators.
- **Objection opener for "we already have a system"**: "Just being nosey, but do you mind me asking who your provider is for that?" — opens the door to compare instead of a dead end.

## Resources on #resource-hub worth grabbing as files before cancelling

These are hosted on Gumroad (free) but linked/announced from Discord — the links themselves and the pinned attachments won't be reachable once the subscription lapses. Recommend downloading directly rather than relying on this summary:

- The Newbie's Guide to Building Your Own Dialer (Lovable Edition) — https://dialdaddy.gumroad.com/l/build_your_own_dialer_lovable
- Newbie Guide: How to Send 2,000 Cold Emails a Day — https://dialdaddy.gumroad.com/l/How_to_Send_2000_Cold_Emails
- The Newbies Guide to Lead Scraping — https://dialdaddy.gumroad.com/l/zqlzvu
- The Newbies Guide to Voice Agents with VAPI — https://dialdaddy.gumroad.com/l/how-to-build-a-vapi-voice-agent
- Google Maps Category List and Call Forwarding Guide (carrier-by-carrier codes) — posted directly in #resource-hub, no external link captured
- Script attachments posted as Discord files (not extractable as page text — need a direct download): Dial Daddy Voicemail Script v1, Cold Calling Script v2, Objection Handling Script v2, AI Voice Agent Demo Script Framework v1, plus assorted call recordings in #call-reviews and #wins

I have not downloaded these files — say the word and I will (each is a separate confirmation per file per Cowork's download policy).

## Competitive intelligence (from #marketplace)

- **Call Vivi** (Dowdy) is actively recruiting sales partners at **20% recurring commission for the life of the customer**, targeting HVAC, attorneys, med spas, home services, and healthcare — the same ICP as MCD's "Service and install (HVAC, plumbing, electrical)" focus. MCD's Standard Partner terms (50% of Net Commissionable Profit) are well above this — worth using explicitly in Partner recruiting/onboarding material as a differentiator.
- **Optiphone Innovations** (Dylan, Gold Coast AU) specializes in resi-trades AI receptionists and offers 20% commission for referred trade/real-estate overflow clients.
- Pricing reference point mentioned in #community-chat: some call centers sell AI voice solutions around **$0.95/minute**, or a retainer-plus-overage minute-usage model, similar to traditional answering services.

## Recurring requests in the Suggestion Box (what the community keeps asking for — a proxy for what agents struggle with most)

In rough frequency order: a contract/legal template (most requested, 5+ separate asks), a linear step-by-step playbook from lead list → script → demo → signed contract, lead-scraping techniques/automation, live roleplay or mock calls to practice before real calls, cold email templates with proven reply rates, and a searchable resource hub instead of digging through chat history (this one got built — it's the #resource-hub channel).
