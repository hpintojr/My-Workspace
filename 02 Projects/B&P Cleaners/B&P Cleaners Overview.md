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
- `components/SavingsEstimator.tsx` refactored from a loan-consolidation calculator into an
  interactive cleaning quote estimator (property type, sqft, rooms, frequency, add-ons) with the
  `+/-10%` pricing logic below.
- `app/api/submit-lead/route.ts` writing to a NeonDB `quote_requests` table via Drizzle, with a
  GHL webhook trigger wired in.
- GoHighLevel set up with the two pipelines (Customer Operations, 1099 Contractor Recruitment),
  the workflows, and the ad structure described below.

## Open Problems

1. Full restyle pass: swap the dark-teal/gold palette in, replace all lender stock photography
   under `public/images/` (not yet imported into the repo — see Codebase state below), and rewrite
   navbar/hero/footer copy for a cleaning brand.
2. Refactor `SavingsEstimator.tsx` (currently the unmodified loan calculator) into the cleaning
   quote calculator using the state variables and pricing logic below.
3. Stand up NeonDB (`quote_requests` table) and wire `lib/backendconnect.ts` to it — or decide
   whether to keep the multi-pipe backend router at all versus a single Neon + GHL path.
4. Build out the two GHL pipelines, their custom fields, and the five core workflows.
5. Decide what happens to the legacy blog system (`app/blog/*`, `data/blogPosts.ts` — 185KB of
   lender blog content, not imported) and the legal pages (`app/privacy`, `app/terms-of-use`,
   `app/sms-terms`, `app/licenses` — imported as-is, still 100% lender/loan copy).
6. Decide on Sulus.ai voice integration and Stripe recurring billing wiring (mentioned in the plan,
   not yet scoped).
7. `hpintojr/b-p-cleaners` is currently a **public** GitHub repo — confirm that's intended for a
   business site with lead-router credentials, or make it private.

---

## Repository & Codebase State — as of 2026-08-26

**Repo:** `hpintojr/b-p-cleaners` (GitHub, public, default branch `main`). Edited only through the
GitHub connector per workspace rule 1 / Operating Protocol rule 8 — never through the local
`D:\GitHub\b-p-cleaners` checkout.

The unmodified `AdvantageFirst-Website.zip` template (Next.js App Router, Tailwind v4, TypeScript)
was imported as the starting baseline in 4 commits:

```txt
6b403555 — config/root files (.env.example, package.json, tsconfig, next.config, README rewritten
            with a B&P Cleaners status note)
044f270e — Navbar, BlogPreview, mobile/visibility hooks
9a519c90 — SavingsEstimator.tsx (the calculator to be refactored) + lib/ core (analytics,
            backendconnect, backendcolumns, leadTypes, newsletterTypes, utils)
2eccf345 — lib/backends/* adapters (supabase, ghl-webhook, ghl-api, salesforce, newsletter,
            orchestrator index) + public/images/bp-cleaners-logo.svg (the uploaded B&P logo)
```

**Imported:** all `app/`, `components/`, `hooks/`, `lib/` source files; root config; the new B&P
logo SVG.

**Deliberately NOT imported** (still only in the original zip, not in the repo):
- `package-lock.json` — regenerate via `npm install` instead of carrying a stale lockfile.
- `public/images/*.png`, `*.jpg`, `favicon.ico`, `favicon-preview.png` — all lender stock photography
  and the Advantage First torch logo. The brand plan calls for replacing this imagery entirely, so
  it wasn't worth porting.
- `data/blogPosts.ts` (185KB) and `data/trustpilot-reviews.json` (52KB) — full lender blog articles
  and scraped Trustpilot reviews for a different business. Needs a full replace-or-remove decision,
  not a port.

**Backend wiring status:** `lib/backendconnect.ts` has all four backends (Supabase, GHL webhook,
GHL API, Salesforce) set to `enabled: false` with empty credentials — exactly as shipped in the
template. Nothing is connected yet. `app/api/submit-lead/route.ts`, `app/api/generate-quote-id/route.ts`,
and `app/api/subscribe-newsletter/route.ts` all still reference the loan/`AFF-000001` domain model.

**Not yet built:** the NeonDB `quote_requests` schema below, any GHL pipeline/workflow, and the
quote estimator refactor itself.

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

## 3. Frontend: Interactive Quote Estimator

Refactor `components/SavingsEstimator.tsx` into a dynamic quote calculator.

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
(Today this route still posts the loan-lead shape through the generic multi-backend router — see
Codebase state above.)

## 5. GoHighLevel (GHL) CRM Architecture

Strict segmentation between customer operations and contractor recruitment.

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

Next.js (App Router) frontend on Vercel; NeonDB (serverless Postgres) via Drizzle ORM; GoHighLevel
for CRM, pipeline management, recurring Stripe billing, and Sulus.ai voice integrations.
