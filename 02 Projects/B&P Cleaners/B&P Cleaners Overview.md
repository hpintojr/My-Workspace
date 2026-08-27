---
type: problems
date: 2026-08-26
project: B&P Cleaners
---

## Goal

Turn the existing `AdvantageFirst-Website.zip` Next.js lender template into a lead-generation and
instant-quote site for Benny & Penny Cleaning Services — a remote drop-servicing residential and
commercial cleaning agency run on a 1099 independent-contractor model.

## Why

New revenue line: a standalone drop-servicing cleaning business, separate from Hamilton's other
projects, with its own income stream.

## Tangible Outcomes

- The AdvantageFirst template rebranded from its lender palette to the B&P Cleaners teal/gold
  identity, with financial imagery and copy replaced by residential/commercial cleaning content.
  **DONE 2026-08-26** — see Repository & Codebase State below.
- `components/SavingsEstimator.tsx` refactored from a loan-consolidation calculator into an
  interactive cleaning quote estimator (property type, sqft, rooms, frequency, add-ons) with the
  `+/-10%` pricing logic below. **DONE 2026-08-26.**
- `app/api/submit-lead/route.ts` writing to a NeonDB `quote_requests` table via
  `@neondatabase/serverless`, with a GHL webhook trigger wired in. **PARTIAL** — the route and the
  guarded insert helper are live, but no `DATABASE_URL` is configured in Vercel yet, so the insert
  is currently a documented no-op (see below). GHL webhook trigger is still a `// TODO` comment,
  not wired.
- GoHighLevel set up with the two pipelines (Customer Operations, 1099 Contractor Recruitment),
  the workflows, and the ad structure described below. **NOT STARTED.**

## Open Problems

1. ~~Full restyle pass~~ **DONE 2026-08-26.** Dark-teal/gold palette applied via `app/globals.css`
   token rewrite; ~20 components retheme without touching className strings. Financial stock imagery
   was never imported in the first place (see prior Codebase state), so it was replaced with
   `lucide-react` icons instead of new photography — no real interior photos have been sourced yet.
   Navbar/hero/footer/trust-section copy rewritten for a cleaning brand.
2. ~~Refactor `SavingsEstimator.tsx`~~ **DONE 2026-08-26.** Now a 3-step cleaning quote calculator
   (property type, sqft slider, rooms slider, frequency, add-ons) using the exact pricing logic in
   section 3 below. Posts to `/api/submit-lead` with the new `LeadData` shape.
3. Stand up NeonDB (`quote_requests` table) and wire `lib/backendconnect.ts` to it — or decide
   whether to keep the multi-pipe backend router at all versus a single Neon + GHL path.
   `@neondatabase/serverless` is now a dependency and `insertIntoNeon()` exists in
   `app/api/submit-lead/route.ts`, guarded on `process.env.DATABASE_URL` — but the table has not
   been created in any NeonDB instance and the env var is not set in Vercel, so this is still open.
4. Build out the two GHL pipelines, their custom fields, and the five core workflows.
5. Replace the placeholder review/testimonial data. `data/trustpilot-reviews.json` still holds the
   stub content created during the 2026-08-26 build-failure fix (see that day's earlier log) —
   entries literally read "Placeholder Customer N" and "review, which has not been collected." This
   is now live on the production site in `HeroReviews.tsx` and `TestimonialGrid.tsx` and needs real
   B&P Cleaners customer reviews before this is customer-facing-ready. Also still open: what happens
   to the legacy blog system (`app/blog/*`, `data/blogPosts.ts`, currently an empty stub) and the
   legal pages (`app/privacy`, `app/terms-of-use`, `app/sms-terms`, `app/licenses` — imported as-is,
   still 100% lender/loan copy, not yet rewritten).
6. Decide on Sulus.ai voice integration and Stripe recurring billing wiring (mentioned in the plan,
   not yet scoped).
7. `hpintojr/b-p-cleaners` is currently a **public** GitHub repo — confirm that's intended for a
   business site with lead-router credentials, or make it private.
8. **New 2026-08-26:** the phone number ((555) 010-1234) and email (hello@bpcleaners.com) used
   throughout the rebranded site are placeholders — need Hamilton's real business phone/email
   before launch.
9. **New 2026-08-26:** `NEXT_PUBLIC_POSTHOG_KEY` previously contained a hardcoded API key belonging
   to the original AdvantageFirst business — this was a data-leak risk (B&P Cleaners visitor traffic
   would have been sent to someone else's PostHog project). Fixed: `PostHogProvider.tsx` now reads
   only from the env var and silently disables analytics if unset. Real Trustpilot/BBB outbound
   links to the original business's review profiles were also removed from `HeroBadges.tsx` and
   `TrustBar.tsx` and replaced with generic, non-branded trust badges.

---

## Repository & Codebase State — as of 2026-08-26 (rebrand pass)

**Repo:** `hpintojr/b-p-cleaners` (GitHub, public, default branch `main`). Edited only through the
GitHub connector per workspace rule 1 / Operating Protocol rule 8 — never through the local
`D:\GitHub\b-p-cleaners` checkout.

Earlier on 2026-08-26 the AdvantageFirst template import was completed and a Vercel build failure
was diagnosed and fixed (3 commits — `fb3220fe`, `ce085be0`, `37edbd8c` — see that day's separate
daily log). At that point the site was live but still 100% unmodified AdvantageFirst lender
branding with a loan calculator — no rebrand work had actually happened yet despite the project
Overview describing the plan.

This session (later on 2026-08-26) executed the actual rebrand in 11 commits, all on
`hpintojr/b-p-cleaners` main:

```txt
b0b311b — app/globals.css full color palette rewrite (teal/gold tokens, same class names reused)
99b7fd9 — app/layout.tsx metadata/icons, package.json (+@neondatabase/serverless), .env.example
bbfabfe — app/page.tsx hero copy + section IDs, app/api/generate-quote-id/route.ts (AFF- → BPC-)
48fe9ae — lib/leadTypes.ts (new LeadData shape), lib/backendcolumns.ts (cleaning field mappings)
00c6c21 — lib/backends/ghl-api.ts fixed to use new mapped fields (was referencing removed
          loanAmount/loanTerm/state fields — would have broken the TS build)
aad366d — components/Navbar.tsx (logo, nav links, phone placeholder, "Get a Quote" CTA)
6cc8b27 — components/Footer.tsx (cleaning nav column, 1099-contractor disclosures)
8838993 — components/TypewriterHeader.tsx, HeroBadges.tsx (de-Trustpilot'd), BenefitChecklist.tsx
ac4c1c4 — components/HeroReviews.tsx (de-Trustpilot'd), StatsRow.tsx (cleaning metrics)
9d5b658 — components/LenderComparisonTable.tsx (service tiers), ProcessSteps.tsx,
          LoanSolutionsGrid.tsx (4 service cards), TrustBar.tsx (de-Trustpilot'd), TestimonialGrid.tsx
be27afd — components/FaqAccordion.tsx, ClosingCta.tsx, BlogPreview.tsx (copy), PostHogProvider.tsx
          (removed hardcoded foreign PostHog key — privacy fix)
a86710d — components/SavingsEstimator.tsx — full rewrite into the cleaning quote calculator
          (the component Hamilton specifically flagged as "not a correct estimator")
```

Vercel auto-deploys every push to `main`. Verified via `VERCEL_GET_DEPLOYMENTS` /
`VERCEL_GET_DEPLOYMENT` (not inferred) that every one of the above commits deployed successfully —
the final deployment (`dpl_5MKPTTtsP7JctQw5ZbUkzXa21ULU`, commit `a86710d`) is `readyState: READY`,
`readySubstate: PROMOTED`, aliased to `b-p-cleaners.vercel.app` production. Confirmed visually via
browser screenshot: correct logo, teal/gold theme, cleaning copy, and a working 3-step property
type/sqft/rooms/frequency/add-ons quote calculator are all live.

**Backend wiring status (updated):** `lib/backendconnect.ts` still has all four legacy backends
(Supabase, GHL webhook, GHL API, Salesforce) set to `enabled: false` — unchanged, still a decision
point (see Open Problem #3). `app/api/submit-lead/route.ts` now validates and stores the cleaning
fields (`propertyType`, `sqft`, `rooms`, `frequency`, `addons`, price range) and calls a new
`insertIntoNeon()` helper in parallel with the legacy multi-backend router. `insertIntoNeon()` is
guarded on `process.env.DATABASE_URL` and returns `{success: false, message: 'Skipped — DATABASE_URL
not configured yet'}` when unset — which is its current state in Vercel. No data is being persisted
anywhere in production right now; quote submissions are accepted by the UI but not stored.

**Not yet built:** the NeonDB `quote_requests` table itself (no NeonDB instance provisioned),
`DATABASE_URL` in Vercel, any GHL pipeline/workflow, and the outbound GHL webhook trigger
(`// TODO: GHL Webhook Fetch Request` in `submit-lead/route.ts`).

---

## 2. Branding & UI/UX Guidelines

The site must be restyled from its original lender template to match the new logo's premium
aesthetic.

- Primary Backgrounds / Dark Accents: Dark Teal (`#183437`) and Lighter Teal (`#1F6662`).
- Buttons / Highlights / Accents: Gold gradient palette (`#D8B66D`, `#E4C078`, `#B98B3D`, `#8D6225`).
- Text / Clean Areas: White (`#FFFFFF`).
- Visual Strategy: Replace financial imagery with high-end, clean residential and commercial
  interiors. Highlight core value props: "Fully Vetted Contractors," "Instant Online Quotes," and
  "Flexible Maintenance Plans."

**Status: IMPLEMENTED 2026-08-26** via `app/globals.css` token rewrite — see Repository & Codebase
State above. No real interior photography has been sourced yet; icons stand in for imagery for now.

## 3. Frontend: Interactive Quote Estimator

Refactor `components/SavingsEstimator.tsx` into a dynamic quote calculator.

**Status: IMPLEMENTED 2026-08-26.** Live in `components/SavingsEstimator.tsx` exactly as specified
below, plus a 3-step flow (configure → contact info → confirmation) and a `BPC-######` quote
reference ID.

State variables required: `propertyType` (Residential/Commercial toggle), `sqft` (500–10,000
slider), `rooms` (1–20 slider), `frequency` (One-Time/Weekly/Bi-Weekly/Monthly dropdown), `addons`
(checkbox array: Deep Clean, Move In/Out, Inside Fridge, Inside Oven, Interior Windows).

Pricing logic:

```javascript
const calculateEstimatedCostRange = () => {
  // Base Rates
  const baseRate = propertyType === "Residential" ? 0.20 : 0.15;
  let subtotal = sqft * baseRate;

  // Add-ons
  if (addons.includes("Deep Clean")) subtotal += (sqft * 0.10);
  if (addons.includes("Move In/Out")) subtotal += (sqft * 0.15);
  if (addons.includes("Inside Fridge")) subtotal += 50;
  if (addons.includes("Inside Oven")) subtotal += 50;
  if (addons.includes("Interior Windows")) subtotal += 75;

  // Frequency Discounts
  let discountMultiplier = 1.0;
  if (frequency === "Monthly") discountMultiplier = 0.90;
  if (frequency === "Bi-Weekly") discountMultiplier = 0.85;
  if (frequency === "Weekly") discountMultiplier = 0.80;

  // Calculate +/- 10% Range
  const targetPrice = subtotal * discountMultiplier;
  const minPrice = Math.round(targetPrice * 0.90);
  const maxPrice = Math.round(targetPrice * 1.10);

  setEstimatedCostRange(`$${minPrice} - $${maxPrice}`);
  setDbPayloadMin(minPrice);
  setDbPayloadMax(maxPrice);
};
```

## 4. Backend: Database Schema & API Route

The payload from the estimator must be pushed to NeonDB and subsequently to GHL.

**Status: PARTIAL.** `app/api/submit-lead/route.ts` validates the cleaning payload and has an
`insertIntoNeon()` helper ready to run this exact insert — but the table below has not been created
in any NeonDB instance yet, and `DATABASE_URL` is not set in Vercel. See Open Problem #3.

NeonDB schema (`quote_requests` table):

```sql
CREATE TABLE quote_requests (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    property_type VARCHAR(50),
    sqft_range VARCHAR(50),
    rooms INTEGER,
    service_frequency VARCHAR(50),
    add_ons JSONB,
    estimated_price_min DECIMAL(10, 2),
    estimated_price_max DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Next.js API route (`app/api/submit-lead/route.ts`): needs `@neondatabase/serverless` to capture
lead data and store `minPrice`/`maxPrice`, plus a placeholder for the outbound GHL webhook trigger.
`@neondatabase/serverless` was added as a dependency and the insert helper written on 2026-08-26;
the outbound GHL webhook trigger is still a `// TODO` comment, not implemented.

## 5. GoHighLevel (GHL) CRM Architecture

Strict segmentation between customer operations and contractor recruitment.

**Status: NOT STARTED.**

**Customer Operations Pipeline** — Stages: New Lead → Quote Sent → AI Booking Confirmed → Job
Dispatched → Job Completed → Recurring Active. Custom fields: Home SqFt, Bedrooms, Bathrooms,
Cleaning Type, Recurring Frequency, Property Access Code.

Core workflows:
1. AI Voice Booking — inbound numbers route to Sulus.ai, which collects parameters and webhooks
   into GHL to update custom fields and move leads to "AI Booking Confirmed."
2. Booking Confirmation — triggers on booking; sends email/SMS with date, time, access code.
3. 24-Hour Reminder — SMS reminder before the job.
4. Job Dispatched — SMS to the 1099 contractor with job details, payout, and a "Reply CONFIRM" CTA.
5. Job Completed (Billing & Review) — triggers when the contractor submits the internal QA photo
   form; automates the Stripe charge (or recurring subscription per selected frequency) and sends
   a Google Review request via SMS.

**1099 Contractor Recruitment Pipeline** — Stages: Application Received → Zoom Interview Scheduled
→ Background Check Pending → Documents Sent → Active Roster → Rejected.

Recruitment logic: initial application filters out candidates without personal transport, supplies,
or willingness to pass a background check. Approved candidates auto-get a Zoom calendar link.
"Documents Sent" triggers an onboarding packet (W-9, Independent Contractor Agreement via DocuSign).
"Active Roster" applies the "Active Contractor" tag, so dispatch workflows only fire for fully
vetted personnel.

## 6. Marketing & Ad Structure

All traffic routes to specific, relevant GHL landing pages or the quote estimator — never a generic
homepage.

**Status: NOT STARTED.**

- Google Local Services Ads (LSA): target high-income zip codes; forwarding numbers route directly
  to the Sulus.ai agent to capture and qualify immediate-intent leads. Requires business-level
  insurance and background check for the Google Guarantee.
- Google Search Ads — Campaign 1 (High Intent): ad groups "Maid Service" (`maid service near me`,
  `weekly maid service`), "House Cleaning" (`house cleaning near me`, `residential cleaning service`),
  "Move-In / Move-Out" (`move out cleaning near me`).
- Google Search Ads — Campaign 2 (Conquesting): target local competitor brand names (e.g. Merry
  Maids, Molly Maid).
- Negative keywords: pre-load "cheap," "jobs," "hiring," "craigslist," "free," "salary."

## Tech Stack

Next.js (App Router) frontend on Vercel; NeonDB (serverless Postgres) via
`@neondatabase/serverless`; GoHighLevel for CRM, pipeline management, recurring Stripe billing, and
Sulus.ai voice integrations.
