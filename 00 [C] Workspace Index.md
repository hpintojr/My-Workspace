# Workspace Index

**Status:** Current as of 2026-06-20. Portfolio accessibility Phase 1, SEO/discovery, social preview, and current deployment state are indexed below.

## Start Here

Read in this order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Accessibility Phase 1.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Portfolio EOD SEO Social Footer and Content Updates.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Portfolio Image Integration.md
```

For the store project, read the cart-recovery logs and current project files listed under **Current Benny & Penny Store Status**.

## bennyandpenny.com — Portfolio

```txt
Workspace location:
02 Projects/bennyandpenny.com — Portfolio/
  ├─ [C] PROJECT TRUTH — Read First.md                    (authoritative orientation)
  ├─ [C] Version Comparison — Workspace vs GitHub.md      (historical / superseded)
  ├─ _github-version (ChatGPT)/                            (reference copy only)
  └─ app/ (root)                                          (retired single-page JS version — reference only)

Role: Hamilton Pinto Jr.'s personal / technology portfolio under the
      "Benny & Penny's — A Tech Company" banner.

Repository: hpintojr/bennyandpenny
Platform: Next.js 15 + TypeScript
Deploy: GitHub main → Vercel production
Canonical source branch: main
```

### Current portfolio state — Accessibility Phase 1

```txt
Latest production deployment:
dpl_EeSGSxBfDHmmYhcVmeVLBVudreSB

Latest production status:
READY

Accessibility target:
WCAG 2.2 Level AA. This is an ongoing remediation effort, not a claim of full ADA compliance.

Implemented:
- Skip link and named main landmark
- Global visible-focus, reduced-motion, forced-colors, and visually-hidden utilities
- Keyboard-managed mobile navigation: focus into menu, Escape close, focus return, current-page state
- Accessible contact-form validation: error summary, inline errors, required labels, announced status
- Destination-specific external links with new-tab disclosure
- Accessibility statement at /accessibility and Markdown mirror at /accessibility.md
- Accessibility statement added to sitemap.xml, llm.txt, llms.txt, and llms-full.txt
- Initial accessibility issue register: docs/accessibility/phase-1-baseline.md

Other current portfolio work:
- Home, Work, About, Adventures, Contact, Privacy, Terms, and Accessibility are live.
- Home and Work include XBeton, Advantage First Financial, Benny & Penny's Adventures,
  American Colonial Capital, Mercury Call Desk, and 60+ Establishments.
- Header uses the approved horizontal logo; footer uses BP monogram + custom wordmark.
- About uses the approved Hamilton signature image with a text equivalent for assistive technology.
- Contact route is configured for Sequenzy delivery and intended Neon submission storage.
- SEO/discovery includes per-page metadata, canonicals, JSON-LD, robots.txt, sitemap.xml,
  llms.txt, llm.txt, llms-full.txt, and Markdown mirrors.
- Approved social asset: public/images/og-social-background.webp (1200 × 630).
```

### Portfolio asset map

```txt
public/images/home-hero-brandmark.webp        → Home hero
public/images/about-portrait-context.webp     → About portrait
public/images/Sig.png                          → Hamilton signature mark
public/images/work-xbeton-architecture.webp   → XBeton cards
public/images/work-aff-dashboard.webp          → Advantage First Financial cards
public/images/work-adventures-mockup.webp      → Adventures cards + Adventures page
public/images/work-acc-capital.svg             → ACC card background
public/images/acc-logo.svg                     → ACC logo overlay
public/images/work-mercury-telephony.webp      → Mercury Call Desk cards
public/images/work-establishments-collage.webp → 60+ Establishments cards
public/images/og-social-background.webp        → Open Graph / Twitter / text-share image
public/images/logo-horizontal-transparent.png  → Header logo
public/images/logo-mark-transparent.png        → Footer/dark-background monogram
```

### Portfolio read first

```txt
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Accessibility Phase 1.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Portfolio EOD SEO Social Footer and Content Updates.md
01 Daily Logs/[C] 2026-06-20 Portfolio Honeypot and Legal Hardening.md
```

### Portfolio next actions

```txt
1. Complete keyboard-only testing across every public route.
2. Test desktop and mobile navigation with Tab, Shift+Tab, Enter, Space, and Escape.
3. Test Contact with NVDA + Chrome/Firefox and VoiceOver + Safari.
4. Run a full contrast audit, including branded typography, borders, hover, and focus states.
5. Test 200% zoom, 400% reflow, text-spacing overrides, reduced motion, and forced-colors mode.
6. Add automated axe and Playwright accessibility testing in a dedicated follow-up.
7. Audit all images and remaining external links route by route.
8. Test contact form end to end after confirming Sequenzy, Neon, and Vercel production configuration.
9. Resolve preferred-domain/canonical mismatch: non-www redirects to www while canonical metadata uses non-www.
10. Submit sitemap.xml to Google Search Console and Bing Webmaster Tools.
11. Decide whether Markdown and llm*.txt mirrors need X-Robots-Tag: noindex, follow headers.
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
CART_RECOVERY_SEND_ENABLED was intentionally enabled to test delivery. Its current Vercel Production value
must be confirmed and returned to false unless live recovery email is intentionally being activated.
```

## Build Guardrails — Store Repo

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
- Standard email hearts are .75em. Do not place Unicode heart characters inside recovery CTA links.
- The recovery sender uses Sequenzy. Payload default email-adapter warning does not govern recovery email delivery.
- Never store CRON_SECRET or recovery/unsubscribe token secrets in GitHub, workspace notes, screenshots, or chat.
```

## Current Next Actions — Store

```txt
1. Click Return to my cart in the controlled recovery email and confirm the signed link restores the cart.
2. Click Stop cart reminders and verify subscriber/cart suppression.
3. Confirm a suppressed cart cannot receive another controlled reminder.
4. Complete a recovered checkout and verify Recovered Order Number + Recovered Revenue.
5. Run Welcome10 and BPG525 test checkouts; verify order and Sequenzy attribution.
6. Confirm current Vercel CART_RECOVERY_SEND_ENABLED state; set false unless intentionally enabling live recovery sends.
7. Replace placeholder product assets and dummy R2 files with final book assets.
8. Decide whether gifted download allowance should exceed one.
9. Update Terms / Privacy for licensing and cart-recovery consent.
10. Research official LuLu project/template setup before print testing resumes.
11. Monitor real inbox placement for gift, order, and recovery email.
```

## Directory Notes

```txt
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Accessibility Phase 1.md
  (current portfolio accessibility implementation, verification list, and next actions)

01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Portfolio EOD SEO Social Footer and Content Updates.md
  (footer, ACC, contact stack, SEO, discovery files, and final social WebP)

01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Portfolio Image Integration.md
  (initial portfolio image integration and asset map)

01 Daily Logs/[C] 2026-06-19 Portfolio Mixup Recovery and Reposition.md
  (portfolio recovery and reorientation)

01 Daily Logs/[C] 2026-06-18 Cart Recovery Email Delivery and CTA Visual Validation.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Operations Controls and Attribution Reporting.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Environment Configuration and Dry Run.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Automation Sequenzy and Attribution Build.md
01 Daily Logs/[C] 2026-06-18 Database Cart Conversion Safety Net Added.md
01 Daily Logs/[C] 2026-06-18 Webhook Cart Conversion Fallback Added.md
01 Daily Logs/[C] 2026-06-17 Cart Recovery Checkout Gate and Sandbox Verification.md
01 Daily Logs/[C] 2026-06-17 Guest Cart Recovery Capture Added.md
01 Daily Logs/[C] 2026-06-17 Abandoned Cart Tracking Build Started.md
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Digital Readable License Rule 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

## Benny & Penny's Adventures Book Series

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
