# [C] 2026-08-26 (later) — B&P Cleaners Full Rebrand Shipped

## What I changed

Hamilton flagged that the live site was "in no way themed or re-made into a cleaning website" and
pasted the full original Gemini planning conversation as the authoritative spec. Confirmed he was
right: despite the project Overview describing the rebrand as a plan, none of it had actually been
built — the site was still 100% unmodified AdvantageFirst lender branding with a loan calculator,
wrong logo, wrong copy.

Executed the rebrand in 11 commits on `hpintojr/b-p-cleaners` main, all via the GitHub connector
(never the local `D:\GitHub\b-p-cleaners` checkout, per workspace rule 1):

- `b0b311b` — `app/globals.css` full color palette rewrite. Reused every existing Tailwind v4
  `@theme` token name (`af-navy`, `af-blue`, `trust-green`, etc.) and only changed the hex values,
  which retheme ~20 components without touching a single className string.
- `99b7fd9` — `app/layout.tsx` metadata/icons, `package.json` (+`@neondatabase/serverless`),
  `.env.example` (+`DATABASE_URL`).
- `bbfabfe` — `app/page.tsx` hero copy and section IDs, `generate-quote-id/route.ts` (`AFF-` →
  `BPC-` prefix).
- `48fe9ae` — `lib/leadTypes.ts` new `LeadData` shape, `lib/backendcolumns.ts` cleaning field maps.
- `00c6c21` — `lib/backends/ghl-api.ts` fixed to stop referencing the now-removed
  `loanAmount`/`loanTerm`/`state` fields, which would otherwise have broken the TypeScript build —
  same failure class as the incident logged earlier today.
- `aad366d`, `6cc8b27`, `8838993`, `ac4c1c4`, `9d5b658`, `be27afd` — Navbar, Footer,
  TypewriterHeader, HeroBadges, BenefitChecklist, HeroReviews, StatsRow, LenderComparisonTable
  (now a service-tier comparison), ProcessSteps, LoanSolutionsGrid (4 cleaning service cards),
  TrustBar, TestimonialGrid, FaqAccordion, ClosingCta, BlogPreview, PostHogProvider.
- `a86710d` — `components/SavingsEstimator.tsx`, full rewrite into a 3-step cleaning quote
  calculator (property type, sqft/rooms sliders, frequency, add-ons, live price range, contact
  form, `BPC-######` confirmation). This was the component Hamilton specifically called out as
  "not a correct estimator."

Pushed in small batches (1–5 files per commit) after a single large 27-file commit attempt failed
with a transient upstream error — every smaller batch succeeded.

## Fixes beyond literal scope

Two integrity issues surfaced during the audit, fixed and disclosed rather than shipped silently:

- `PostHogProvider.tsx` had a hardcoded PostHog API key belonging to the original AdvantageFirst
  business — B&P Cleaners visitor traffic would have been sent to someone else's analytics project.
  Now reads only from `NEXT_PUBLIC_POSTHOG_KEY`; analytics silently disable if unset.
- `HeroBadges.tsx` and `TrustBar.tsx` had real outbound links to AdvantageFirst's actual Trustpilot
  and BBB review profiles. Replaced with generic, non-branded trust badges.

## Evidence

Verified via `VERCEL_GET_DEPLOYMENTS` / `VERCEL_GET_DEPLOYMENT` (not inferred) that every commit's
auto-deploy succeeded. Final deployment `dpl_5MKPTTtsP7JctQw5ZbUkzXa21ULU` (commit `a86710d`) is
`readyState: READY`, `readySubstate: PROMOTED`, aliased to `b-p-cleaners.vercel.app` production.
Confirmed visually via browser screenshot: correct B&P Cleaners logo, teal/gold theme, cleaning
copy throughout, and a working property-type/sqft/rooms/frequency/add-ons quote calculator.

## Still open

- The live review/testimonial cards show literal placeholder text ("Placeholder Customer 14 ·
  Verified Customer", "which has not been collected") — that stub data (`data/trustpilot-reviews.json`)
  was created during this morning's build-failure fix and is now customer-facing. Needs real B&P
  Cleaners reviews before launch.
- Phone number `(555) 010-1234` and email `hello@bpcleaners.com` are placeholders throughout the
  site — need Hamilton's real business contact info.
- NeonDB `quote_requests` table does not exist yet and `DATABASE_URL` is not set in Vercel, so quote
  submissions are accepted by the UI but not persisted anywhere. `insertIntoNeon()` is written and
  guarded, ready for when the table + env var exist.
- GHL pipelines/workflows, the outbound GHL webhook trigger, Sulus.ai voice, Stripe recurring
  billing, the blog/legal-pages content decision, and the public-vs-private repo decision are all
  still unstarted — see Open Problems in the project Overview.

Full detail in `02 Projects/B&P Cleaners/B&P Cleaners Overview.md` (updated this session).

## Handback

Claude holds the lock (unchanged, see `02 Projects/B&P Cleaners/LOCK.md`). No blockers.
