# My Workspace

A GitHub-based workspace for project notes, daily logs, and active project context.

## Start Here

Read in this order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
Current active focus files listed below
```

The workspace index contains the clean directory tree, read-order rules, and update-maintenance checklist.

---

## Current Active Focus

### Benny & Penny's Adventures

Current priority:

```txt
Customer Portal v2, the Payload admin theme, R2 delivery, gifting, Google Places, checkout name/address mitigation, email DNS, guest cart tracking, abandonment automation, Sequenzy tagging, recovery links, unsubscribe handling, recovery reporting, coupon/BPG/gift attribution, and Neon attribution schema are built. Safe abandonment testing passed. A controlled recovery reminder reached Gmail and the final desktop CTA treatment is approved. The remaining work is true end-to-end recovery validation: restore the cart from the signed email CTA, test unsubscribe/suppression, test a recovered purchase, then verify coupon and BPG attribution. CART_RECOVERY_SEND_ENABLED was intentionally enabled for the email test; confirm and return it to false unless live recovery messaging is being intentionally activated.
```

Read first for the next Benny & Penny chat:

```txt
00 [C] Workspace Index.md
CLAUDE.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Email Delivery and CTA Visual Validation.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Operations Controls and Attribution Reporting.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Environment Configuration and Dry Run.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Automation Sequenzy and Attribution Build.md
01 Daily Logs/[C] 2026-06-18 Database Cart Conversion Safety Net Added.md
01 Daily Logs/[C] 2026-06-18 Webhook Cart Conversion Fallback Added.md
01 Daily Logs/[C] 2026-06-17 Cart Recovery Checkout Gate and Sandbox Verification.md
01 Daily Logs/[C] 2026-06-17 Guest Cart Recovery Capture Added.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Digital Readable License Rule 2026-06-17.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

Confirmed working:

- Customer Portal v2 is live and approved: persistent sidebar shell, dashboard, library, orders, gifting, addresses, account, help, shipment tracking, and printable invoice.
- R2 automated digital delivery works in testing. Digital orders create Media/Downloads records, signed links work, and Library has separate PDF, EPUB, and Audiobook actions.
- Gifting works end-to-end: sender identity, session-aware redemption, and gifted books in My Library.
- Shared readable slot tracking is active: three total slots per title across PDF, EPUB, and gifts.
- Admin sidebar mirrors the portal and stays teal/mint; cream is not to return to admin structural UI.
- Google Places API (New) is built and confirmed for portal and admin addresses. Geoapify remains removed.
- Stripe Checkout saved-address prefill and fulfillment name guard are in place.
- Email authentication DNS is verified: DKIM, SPF, SES feedback/inbound MX, and DMARC `p=none`.
- Guest cart lifecycle is verified: Active Cart → Checkout Started → Converted, including browser-independent paid-order conversion safety via Neon trigger.
- Abandoned Carts admin list/detail pages work with Neon-backed recovery fields, Yes/No consent rendering, manual email-safe testing, and controlled reminder controls.
- Recovery safe test passed for cart #7: Checkout Started → Abandoned → Recovery Eligible? Yes → Recovery State Eligible.
- Sequenzy abandonment tags are persisted for auditing: `cart-abandoned`, `ecommerce.in_cart`, and checkout tag when applicable.
- Controlled reminder delivery reached Gmail from `hello@bennyandpenny.com` through Sequenzy.
- Recovery email visual QA is approved: standard hearts use `.75em`; CTA uses Gmail-safe table markup with a small white heart. Latest visual deployment is `dpl_2NSnwNJzPd2ihetiEY1H8A44ocX1`.
- Orders schema supports coupon code, gift code, BPG code, recovered-cart indicator, and source-cart relationship.

Important current assumptions and guardrails:

- Product catalog data, covers, page previews, cart thumbnails, and some digital files are still placeholders.
- Full paid readable license = three total readable slots across PDF, EPUB, and gifts.
- Gifted access = one download/device allowance unless Hamilton decides otherwise.
- Order `26-0029` cleanup is bypassed as an active blocker; retain the forward safeguard documentation.
- DMARC is verified at `p=none`; consider a stricter policy only after sending is stable.
- The recovery sender is Sequenzy-driven; Payload's default email-adapter warning is unrelated and non-blocking.
- Do not store environment-secret values in GitHub, workspace logs, screenshots, or chat transcripts.
- `CART_RECOVERY_SEND_ENABLED` must be checked after the controlled email test. Set it to `false` unless intentionally enabling live abandoned-cart reminders.

Next focus areas:

```txt
1. Click Return to my cart from the latest test email and confirm signed cart restore in storefront.
2. Test Stop cart reminders, verify subscriber/cart suppression, and prove another controlled reminder is blocked.
3. Complete a recovered test checkout and verify Recovered Order Number + Recovered Revenue.
4. Test Welcome10 and confirm coupon attribution on Order and Sequenzy.
5. Test BPG525 and confirm BPG attribution on Order and Sequenzy.
6. Confirm final Vercel CART_RECOVERY_SEND_ENABLED value after testing.
7. Replace placeholder book covers, previews, cart thumbnails, and actual PDF/EPUB/audio files.
8. Decide whether gifted download allowance should exceed one.
9. Update Terms and Privacy language for license rules and cart-recovery consent.
10. Research official LuLu project/template setup before print testing resumes.
11. Monitor real gift/order/recovery email inbox placement.
```

Portal UX, account setup, Help, Orders, Addresses, Library, Gifting, Google Places autocomplete, checkout mitigation, email DNS, cart tracking, guest checkout gate, admin sidebar, recovery automation, recovery email visual treatment, and attribution foundations are done for this phase. End-to-end recovery behavior, real customer assets/files, policy copy, and LuLu preparation are now the active focus.

### Benny & Penny's Adventures Book Series

The 10-book print + digital + audio + multilingual production effort (Claude, ChatGPT, Gemini, Canva), coordinated through a shared MD index so every AI follows the same files and commands. Separate from the website project above — this one produces the books that feed the site's placeholders. On 2026-06-18 Hamilton's full production kit was migrated in as the canonical structure (numbered folders `00-series-control` … `99-inbox`). Series: 8.5×8.5 in, 32pp, ages 3–8, 8 locales; books 01–04 cover-ready, 05–10 coming-soon.

Read first:

```txt
02 Projects/Benny & Penny's Adventures Book Series/[C] AI Index & Commands.md
02 Projects/Benny & Penny's Adventures Book Series/README.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/00-OFFICIAL-CATALOG.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md
01 Daily Logs/[C] 2026-06-18 Book Series Production Kit Migration.md
```

First actions: capture the live Lulu spec, approve the character/environment locks, build the Canva master, then run Book 01 end-to-end as the pattern.

### bennyandpenny.com — Portfolio

Hamilton's personal and technology portfolio under the **Benny & Penny's — A Tech Company** banner. This remains separate from the Adventures store and book-production projects.

```txt
Repo: hpintojr/bennyandpenny
Branch: main
Deploy: Vercel production
Preferred domain: https://www.bennyandpenny.com
Latest production deployment: dpl_5bAsWNCX7CxXakii2H8uEqrgtqY3
Status: READY
```

Current portfolio priority:

```txt
The shared WCAG 2.2 AA accessibility program remains active. A Chrome/mobile share-preview hardening pass is deployed: the homepage and root layout use an absolute PNG Open Graph card at /og-image. The remaining share task is a real-device Chrome test from a new message thread; existing message previews may be cached.
```

Implemented:

- Skip link, landmarks, visible focus, reduced motion, forced colors, and shared target-size support.
- Keyboard mobile navigation with focus entry, containment, Escape close, focus return, and background scroll lock.
- Accessible Contact validation, error summary, inline errors, autocomplete, and status messages.
- Native Accessibility preferences: text size, high contrast, pause animations, readable font, reset, and local-device persistence.
- Native lower-left launcher with a visible minimize control and a recoverable Accessibility restore tab.
- Approved `accessibility-universal-icon.svg`, rendered as a theme-aware CSS mask instead of the former thin-line figure.
- Footer trigger and `/accessibility` page remain permanent alternate paths to the same preferences dialog.
- Production Neon storage now contains the `contact_submissions` table for valid Contact requests.
- Accessibility statement, LLM and Markdown discovery mirrors, sitemap, robots, canonical metadata, and automated smoke/browser audit framework.
- Content-author guide, inventory, manual checklist, WCAG program documentation, shared cross-site specification, and Adventures handoff.
- Dedicated `/og-image` PNG social-preview route. Homepage and root layout supply the same absolute image URL, secure URL, MIME type, and 1200 × 630 dimensions for standard link cards.

Read first:

```txt
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
01 Daily Logs/[C] 2026-06-20 Portfolio Mobile Chrome Share Preview Fix.md
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
01 Daily Logs/[C] 2026-06-20 Universal Accessibility Icon Update.md
01 Daily Logs/[C] 2026-06-20 Portfolio Contact Submission Storage Approved and Applied.md
docs/accessibility/wcag-program.md in hpintojr/bennyandpenny
docs/accessibility/inventory.md in hpintojr/bennyandpenny
```

Next actions:

```txt
1. Share https://www.bennyandpenny.com/ from Chrome mobile in a new message thread and confirm the standard link card is no longer blank.
2. Record device, Chrome version, and receiver app if the share card remains blank; Chrome's screenshot-style page capture is separate from Open Graph metadata.
3. Run and retain production Accessibility Smoke Test and Browser Accessibility Audit results.
4. Complete visual/keyboard validation of the new launcher, including minimize/restore, dialog focus return, 200% zoom, 400% reflow, text spacing, reduced motion, and forced colors.
5. Complete NVDA plus Chrome/Firefox and VoiceOver plus Safari tests.
6. Complete image-alternative review.
7. Run a controlled real Contact submission and verify visitor success state, Neon persistence, Sequenzy delivery, failure messaging, and retry/help handling.
8. Keep all portfolio changes direct to main unless Hamilton requests a branch or pull request.
```

### MCD - Mercury Call Desk

New project (2026-06-24): the AI receptionist / call-desk platform business — recruiting and onboarding commission-only 1099 sales partners now, GoHighLevel CRM next, reseller channel later. Separate from the portfolio, store, and book projects. Coordinated through a shared MD index so Claude/ChatGPT/Gemini follow the same files. Hamilton's Sales Partner Launch Kit (14 files) was migrated in as the canonical onboarding.

Read first:

```txt
02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md
02 Projects/MCD - Mercury Call Desk/MCD - Mercury Call Desk Overview.md
02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
01 Daily Logs/[C] 2026-06-24 MCD Project Setup.md
```

First actions: fill in `[C] Owner Setup & Open Decisions.md` (brand + commission/payout rules), draft the Sales Partner Agreement + NDA, then move to the GoHighLevel CRM phase (incl. the planned GHL MCP).
