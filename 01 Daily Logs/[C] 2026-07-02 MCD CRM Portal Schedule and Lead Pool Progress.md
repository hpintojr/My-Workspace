# MCD CRM — Portal, Schedule, and Lead Pool Progress

**Date:** 2026-07-02  
**Project:** MCD CRM — Agent and Admin Portals

## Completed and verified

```txt
Phase 1 onboarding is production-validated end to end.
Admin applicant operations status is deployed.
Partner Portal sidebar is established.
GHL appointment lifecycle relay is validated for Booked, Confirmed, Cancelled, No-show, Completed, and Rescheduled.
Schedule preserves source timezone and displays in the signed-in viewer's browser timezone.
Join meeting is shown only for Scheduled and Confirmed appointments.
Optional Company / Legal Entity Name is separate from the individual signer.
```

## Lead workspace status

Lead and Task screens are intentionally feature-gated. Production Neon does not yet have the Lead, activity, note, callback, claim, suppression, import, or proposal tables.

```txt
LEADS_ENABLED remains false.
The Task queue and Lead workspace must not query missing lead tables.
Callback queue UI and controlled claim logic are staged for activation after the lead-foundation migration and controlled test data.
```

## Lead operation locked for the build

```txt
Pools: Cold, Nurture, Hot Leads, Open Pool, Shark Tank, Referral, House.
Sources: Google Maps, Instagram, Referral, PPC, Email, SMS, LinkedIn, Web Form, Facebook, Other.
Original source remains permanent; pool, lifecycle, campaign, owner, and suppression are separate.
Google Maps is research/source-only for independently sourced records; batch Maps scraping/import is blocked.
No website listed is not verified no website. Review is required before presenting a website offer.
Website-only quotes are expected in the approved $500–$3,000 range and require approved scope and expiry.
```

## Next work

1. Apply and validate lead-foundation migration.
2. Build Admin intake/review, sources, website status, dedupe, suppression, assignment, notes, callbacks, and activities.
3. Add proposal/quote records, Shark Tank controls, and website-only offer path.
4. Add campaign event/reply routing and then controlled GHL Demo Booked handoff.
