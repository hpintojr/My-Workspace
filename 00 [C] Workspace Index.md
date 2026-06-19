# Workspace Index

**Status:** Current as of 2026-06-19 (Customer Portal v2 + cart recovery validation + bennyandpenny.com portfolio repositioned to Hamilton's tech-portfolio concept; portfolio mixup recovered and workspace cleaned)

## Start Here

Read in this order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
01 Daily Logs/[C] 2026-06-19 Portfolio Mixup Recovery and Reposition.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Email Delivery and CTA Visual Validation.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Operations Controls and Attribution Reporting.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Environment Configuration and Dry Run.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Automation Sequenzy and Attribution Build.md
01 Daily Logs/[C] 2026-06-18 Database Cart Conversion Safety Net Added.md
01 Daily Logs/[C] 2026-06-18 Webhook Cart Conversion Fallback Added.md
01 Daily Logs/[C] 2026-06-17 Cart Recovery Checkout Gate and Sandbox Verification.md
01 Daily Logs/[C] 2026-06-17 Guest Cart Recovery Capture Added.md
01 Daily Logs/[C] 2026-06-17 Abandoned Cart Tracking Build Started.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

## bennyandpenny.com — Portfolio

```txt
Workspace location:
02 Projects/bennyandpenny.com — Portfolio/
  ├─ [C] PROJECT TRUTH — Read First.md          (authoritative orientation)
  ├─ [C] Version Comparison — Workspace vs GitHub.md
  ├─ _github-version (ChatGPT)/                  (LIVE code: repositioned portfolio, mirrors the repo)
  └─ app/ (root)                                 (RETIRED single-page JS version — reference only)

Role: Hamilton Pinto Jr.'s personal/tech portfolio under the "Benny & Penny's — A Tech Company"
banner. NOT the store, NOT the book-production system.

Repository: hpintojr/bennyandpenny → Vercel (bennyandpenny.vercel.app)
Platform: Next.js 15 + TypeScript (deployed). Visual system: teal/mint (kept).

Decided 2026-06-19: keep the deployed codebase and reposition it to the portfolio concept (done).
- Ventures as work tiles: XBeton, AFF, Benny & Penny's Adventures, Mercury, 60+ Establishments.
- Backlinks (dofollow): ACC, AFF, BAPA, XBeton, Mercury — footer + Person JSON-LD sameAs.
The earlier single-page JS version and ChatGPT's "family-built creative brand" framing are retired.

Read first:
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md

Next actions:
1. Push _github-version (ChatGPT)/ contents to hpintojr/bennyandpenny main; confirm Vercel redeploy.
2. Replace CSS placeholders with a Hamilton portrait, brand mark, and venture/book imagery.
3. Add Privacy/Terms before any contact-form data collection.
4. (Pending) image-prompt brief: Hero, XBeton, AFF, Mercury, 60+, book cover + dimensions.
```

## Current Benny & Penny Store Status

```txt
Customer Portal v2 and the matching teal/mint Payload admin experience are live and approved.
R2 digital delivery, signed download links, PDF/EPUB/audiobook library controls, shared-readable slots,
and gifting are functional in testing.
Google Places API (New) is the active confirmed address provider; Geoapify is retired.
Checkout address/name mitigation is in place. Email DNS authentication is verified.
Guest cart tracking, consent capture, checkout-started tracking, thank-you conversion, webhook fallback code,
and the verified paid-order Neon trigger provide the cart-conversion safety net.
Cart recovery is built: hourly timing rules, Sequenzy abandonment tags, signed recovery links, unsubscribe,
admin recovery controls, recovery reporting, coupon/BPG/gift attribution, and Neon attribution fields.
Manual safe recovery test passed for cart #7: Checkout Started → Abandoned → Recovery Eligible Yes → Eligible state.
A controlled Recovery Reminder 1 reached Gmail via Sequenzy. Email body visual QA is approved: mobile was
confirmed good; desktop CTA has a final Gmail-safe small white heart via table markup.
The latest visual-email deployment is dpl_2NSnwNJzPd2ihetiEY1H8A44ocX1, commit fe886dffad60f0a3e43c6ca5cf9e9b972f6d9b02.
CART_RECOVERY_SEND_ENABLED was intentionally enabled to test delivery. Its current Vercel Production value
must be confirmed and returned to false unless live recovery email is intentionally being activated.
```

## Build Guardrails — Website Repo

```txt
- tsconfig target is es5: use Array.from() for Set/Map/iterator results; avoid bare iterable spread / for-of.
- next build errors on raw JSX apostrophes: use &apos;.
- Portal pages do NOT wrap SiteShell/PortalSessionBar; portal layout owns shell.
- Login / post-auth portal redirects must full-reload, not router.push.
- Business address appears ONLY on printable invoice for now.
- Admin palette = teal/mint. Do not reintroduce cream in admin structural UI.
- Gifting = redemption-code model, not Stripe checkout.
- Reusable portal data logic lives in lib/portalData.ts.
- Google Places is active; do not restore Geoapify unless Hamilton explicitly reverses that decision.
- Stripe Checkout saved-address prefill + fulfillment name guard are already implemented.
- Paid order must keep converting matching cart by Stripe Checkout Session ID.
- Recovery defaults: active cart 4h; checkout started 1h; second reminder 24h.
- Standard email hearts are .75em. Do not place Unicode heart characters inside recovery CTA links: Sequenzy/Gmail converts them into red emoji images. CTA heart uses Gmail-safe white table markup.
- The recovery sender uses Sequenzy. Payload default email-adapter warning does not govern recovery-email delivery.
- Never store CRON_SECRET or recovery/unsubscribe token secrets in GitHub, workspace notes, screenshots, or chat.
```

## Current Next Actions — Store

```txt
1. Click Return to my cart in the controlled recovery email and confirm the signed link restores the cart.
2. Click Stop cart reminders in a controlled test and verify subscriber/cart suppression.
3. Confirm that a suppressed cart cannot receive another controlled reminder.
4. Complete a recovered checkout and verify Recovered Order Number + Recovered Revenue.
5. Run a Welcome10 test checkout and verify coupon fields and Sequenzy coupon-user attribution.
6. Run BPG525 flow and verify BPG fields and Sequenzy bpg-gift-code-user attribution.
7. Confirm current Vercel CART_RECOVERY_SEND_ENABLED state; set false unless intentionally enabling live recovery sends.
8. Replace placeholder product assets and dummy R2 files with final book assets.
9. Decide whether gifted download allowance should exceed one.
10. Update Terms / Privacy for licensing and cart-recovery consent.
11. Research official LuLu project/template setup before print testing resumes.
12. Monitor real inbox placement for gift, order, and recovery email.
```

## Directory Notes

```txt
01 Daily Logs/[C] 2026-06-18 Cart Recovery Email Delivery and CTA Visual Validation.md (safe test, real reminder delivery, CTA heart finalization)
01 Daily Logs/[C] 2026-06-18 Cart Recovery Operations Controls and Attribution Reporting.md (admin controls, attribution, migration)
01 Daily Logs/[C] 2026-06-18 Cart Recovery Environment Configuration and Dry Run.md (Vercel environment setup)
01 Daily Logs/[C] 2026-06-18 Cart Recovery Automation Sequenzy and Attribution Build.md (automation architecture)
01 Daily Logs/[C] 2026-06-18 Database Cart Conversion Safety Net Added.md (paid-order trigger confirmation)
01 Daily Logs/[C] 2026-06-18 Webhook Cart Conversion Fallback Added.md (webhook fallback build)
01 Daily Logs/[C] 2026-06-17 Cart Recovery Checkout Gate and Sandbox Verification.md (guest cart / checkout tests)
01 Daily Logs/[C] 2026-06-17 Guest Cart Recovery Capture Added.md (guest email and consent capture)
01 Daily Logs/[C] 2026-06-17 Abandoned Cart Tracking Build Started.md (tracking collection/API foundation)
01 Daily Logs/[C] 2026-06-17 Checkout Name Guard and Email DNS Confirmed.md
01 Daily Logs/[C] 2026-06-17 Google Places Confirmed.md
01 Daily Logs/[C] 2026-06-17 Google Places and Stripe Name Guard.md
01 Daily Logs/[C] 2026-06-17 Gifting Fixes.md
01 Daily Logs/[C] 2026-06-17 Customer Portal v2 and Admin Theme.md
02 Projects/Benny & Penny's Adventures/00 Brand & Portfolio/[C] BennyAndPenny.com Parent Brand Portfolio Launch.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Digital Readable License Rule 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

## Benny & Penny's Adventures Book Series (new project)

```txt
10-book print + digital + audio + multilingual production using Claude, ChatGPT, Gemini, and Canva.
Coordinated through a shared MD index so every AI reads the same files and follows the same commands.
Separate from the website project: this one produces the books; the store website project sells/delivers them.
2026-06-18: Hamilton's full production kit migrated in as the canonical structure
(numbered folders 00-series-control … 99-inbox are the source of truth).
Series: 8.5×8.5 in, 32pp, ages 3–8, 8 locales; books 01–04 cover-ready, 05–10 coming-soon.

Read first:
02 Projects/Benny & Penny's Adventures Book Series/[C] AI Index & Commands.md
02 Projects/Benny & Penny's Adventures Book Series/README.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/00-OFFICIAL-CATALOG.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md
01 Daily Logs/[C] 2026-06-18 Book Series Production Kit Migration.md

Pipeline per book: English text → locks → page briefs → Canva → PDF/EPUB → audio → locales → Lulu PB/HC → QA → release → website upload.
Tracker = 00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md.
```
