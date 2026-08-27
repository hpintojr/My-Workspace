# [C] 2026-08-26 — B&P Cleaners Vercel Build Failure Diagnosed and Fixed

## What I changed

Vercel is already connected to `hpintojr/b-p-cleaners` and auto-deploys every push to `main`
(discovered this session — not previously documented). The commit that finished the AdvantageFirst
template import (`2eccf345`) auto-deployed and failed. Diagnosed via the Vercel MCP (Composio) and
fixed with three follow-up commits, all on `hpintojr/b-p-cleaners` main:

- `fb3220fe` — stubbed `data/blogPosts.ts` and `data/trustpilot-reviews.json` (same exported
  types/functions, empty data) since 5 files still imported them after those two files were
  deliberately excluded from the import.
- `ce085be0` — gave the reviews stub one placeholder entry instead of `[]`, because an empty
  array literal infers as `never[]` in TypeScript and broke property access in
  `HeroReviews.tsx`/`TestimonialGrid.tsx`.
- `37edbd8c` — padded the reviews stub to 26 entries, because `TestimonialGrid.tsx` hardcodes
  `allReviews[25]`, `allReviews[0]`, `allReviews[3]` (fixed indices into what was originally a
  50-item scraped array) and a 1-item stub left those `undefined`, crashing the static prerender
  of `/` at build time.

## Evidence

Read the actual Vercel build logs for each failing deployment via `VERCEL_GET_DEPLOYMENT_EVENTS2`
(not inferred):
- `dpl_4stm767ty5mSgqDFYcXPBdB8qQHs` (errorCode ENOENT): 5x Turbopack "Module not found" for
  `../data/trustpilot-reviews.json` and `@/data/blogPosts`.
- `dpl_CeNbV7fbiouUh7cmqK2mzSvPV7MH` (errorCode lint_or_type_error): compiled successfully, then
  9x `TS2339: Property 'x' does not exist on type 'never'` in HeroReviews.tsx/TestimonialGrid.tsx.
- `dpl_6pmCSv6XmSNGgAupLb4iviZjTEbv` (errorCode type_error): TypeScript passed, but prerendering
  `/` threw `TypeError: Cannot read properties of undefined (reading 'name')` at
  `TestimonialGrid.tsx:20:13`.
- `dpl_7wMErdQB5HvvwK2BDGLaeauMEi6H`: `readyState: READY`, `state: READY`, `target: production`,
  `readySubstate: PROMOTED` — confirmed live via `VERCEL_GET_DEPLOYMENTS` after the third fix.

## Still open

The reviews/blog stubs are functional placeholders, not real content — they still need to be
replaced with actual B&P Cleaners testimonials and a real decision on the blog system (keep with
new content, or remove `app/blog/*` and the two BlogPreview/blog-page components entirely). See
Open Problem #5 in the project Overview. No restyle or estimator-refactor work has started.

## Start here next

Restyle pass + `SavingsEstimator.tsx` refactor (Open Problems #1–#2 in
`02 Projects/B&P Cleaners/B&P Cleaners Overview.md`), which is also where this incident and its
fix are now documented under "Repository & Codebase State."

## Handback

Claude holds the lock (unchanged, see `02 Projects/B&P Cleaners/LOCK.md`). No blockers.
