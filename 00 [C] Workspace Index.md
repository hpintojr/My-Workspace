# Workspace Index

**Status:** Current as of 2026-06-18 (Customer Portal v2 + admin theme + gifting fixes + Google Places confirmed + checkout-name mitigation + email DNS + cart recovery / guest checkout tracking verified)

## Start Here

Read in this order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
01 Daily Logs/[C] 2026-06-18 Database Cart Conversion Safety Net Added.md
01 Daily Logs/[C] 2026-06-18 Webhook Cart Conversion Fallback Added.md
01 Daily Logs/[C] 2026-06-17 Cart Recovery Checkout Gate and Sandbox Verification.md
01 Daily Logs/[C] 2026-06-17 Guest Cart Recovery Capture Added.md
01 Daily Logs/[C] 2026-06-17 Abandoned Cart Tracking Build Started.md
01 Daily Logs/[C] 2026-06-17 Checkout Name Guard and Email DNS Confirmed.md
01 Daily Logs/[C] 2026-06-17 Google Places Confirmed.md
01 Daily Logs/[C] 2026-06-17 Google Places and Stripe Name Guard.md
01 Daily Logs/[C] 2026-06-17 Gifting Fixes.md
01 Daily Logs/[C] 2026-06-17 Customer Portal v2 and Admin Theme.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

## Current Benny & Penny Status

```txt
Customer Portal v2 is live and approved: persistent sidebar shell (Dashboard, Library,
Orders, Gifting, Addresses, Account, Help), dashboard with reading-slots meter, order
shipment tracking (print-jobs), account + help pages, and a branded printable invoice.
Payload admin sidebar now mirrors the portal (identity card + icon-tile rows); admin
keeps its teal/mint palette (cream was rejected).
Gifting tested and fixed: gifted books now show in My Library ("Gifted Book"), the gift
email names the sender, and redeem is session-aware (signed-in members claim in one step;
existing members are never forced to set a password).
R2 automated digital delivery is confirmed working in testing.
Digital checkout creates Media/Downloads records automatically.
Library shows separate PDF, EPUB, and Audiobook buttons, with self-heal that backfills
a missing format record by mirroring the R2 key.
Shared readable slot tracking is active (3 slots/title across PDF/EPUB/gifts).
Current R2 folder standard is ebooks/, audio/, and print/.
Product catalog data and images are still placeholders.
LuLu Phase 1/2 work exists, but LuLu testing remains paused.
Geoapify is removed. Address autocomplete now uses Google Places API (New). Portal address book and admin CustomerAddresses.street1 field are built client-side and confirmed working. Server proxy routes /api/geo/autocomplete and /api/geo/place are retired no-op stubs. Admin status tile says "Google Places API".
Checkout name/address issue is already mitigated: signed-in saved-address checkout creates a Stripe Customer for prefill, and fulfillment has a non-destructive name guard that flags address-like names and falls back to account name when available. Order 26-0029 cleanup is bypassed as an active blocker per Hamilton.
Email authentication DNS is verified from Hamilton's domain screenshot: DKIM, SPF, SES feedback/inbound MX, and DMARC p=none.
Abandoned-cart tracking is now verified in production sandbox: anonymous cart activity creates a Neon-backed cart record; Stripe session creation marks it checkout-started; thank-you return marks it converted.
Guest checkout now captures an email before Stripe, offers Create an account or Checkout as guest, accepts optional cart-reminder consent, and includes a Sign in path for existing members.
The Abandoned Carts Payload list/detail views work. Cart reminder consent is saved as marketing_consent in Neon and renders as Yes/No in the admin table.
A Stripe webhook-level conversion fallback is deployed, and a verified Neon paid-order trigger is the final conversion safety net: a paid order automatically converts its matching cart by Stripe Checkout Session ID even when the browser closes before thank-you.
```

## Build guardrails (website repo)

```txt
- tsconfig target is es5: wrap Map/Set iteration in Array.from() (no bare for-of on iterators).
- next build errors on raw apostrophes in JSX text: use &apos;.
- Portal pages do NOT wrap SiteShell/PortalSessionBar; the portal layout provides the shell.
- Login / post-auth redirects into the portal must full-reload, not router.push.
- Business address appears ONLY on the printable invoice for now.
- Admin palette = teal/mint; do not reintroduce cream. admin-portal-theme.scss is sidebar structure only.
- Gifting = redemption-code model (free digital access), not Stripe checkout.
- Reusable portal data logic lives in lib/portalData.ts.
- Google Places is the active address autocomplete provider and is confirmed working in customer + admin.
- Stripe Checkout name/address mitigation is already implemented; do not keep order 26-0029 as a launch blocker.
- Email authentication DNS is verified. Continue to monitor inbox placement; later consider a stricter DMARC policy after stable sending.
- Abandoned-cart records are keyed by Stripe Checkout Session ID after checkout begins; paid orders must continue to convert the matching cart.
- Do not enable live cart-recovery emails until timing, consent copy, unsubscribe behavior, and converted-customer suppression are approved.
- Do not restore Geoapify unless Hamilton explicitly reverses the decision.
```

## Current Next Actions

```txt
1. Define approved timing for active-cart / checkout-started → abandoned status automation.
2. Validate Sequenzy end-to-end for a consented cart and then design the recovery sequence, unsubscribe path, and converted-customer suppression.
3. Replace placeholder product assets: covers, page previews, cart thumbnails.
4. Replace dummy R2 files with real files as Books 1-4 are finalized.
5. Decide whether to raise the gift download allowance above 1 (re-download on device).
6. Deepen BPG gift-code -> cart/coupon tracking (owned-copy gifting already works end-to-end).
7. Update Terms for full readable license vs gifted access and Privacy/consent language for cart recovery.
8. Later address workflow polish: account setup address confirmation, logged-in checkout prefill refinements, and optional dashboard profile-completion nudge.
9. Research official LuLu project/template setup before sandbox print testing resumes.
10. Monitor real gift/order email inbox placement now that DNS authentication is verified.
```

## Directory Notes

```txt
01 Daily Logs/[C] 2026-06-18 Database Cart Conversion Safety Net Added.md      (latest cart conversion confirmation)
01 Daily Logs/[C] 2026-06-18 Webhook Cart Conversion Fallback Added.md          (webhook fallback build)
01 Daily Logs/[C] 2026-06-17 Cart Recovery Checkout Gate and Sandbox Verification.md (guest cart / checkout test results)
01 Daily Logs/[C] 2026-06-17 Guest Cart Recovery Capture Added.md               (guest email and consent build)
01 Daily Logs/[C] 2026-06-17 Abandoned Cart Tracking Build Started.md           (tracking collection/API foundation)
01 Daily Logs/[C] 2026-06-17 Checkout Name Guard and Email DNS Confirmed.md     (checkout and DNS confirmation)
01 Daily Logs/[C] 2026-06-17 Google Places Confirmed.md                          (Google Places confirmation)
01 Daily Logs/[C] 2026-06-17 Google Places and Stripe Name Guard.md              (Google Places build + Stripe guard)
01 Daily Logs/[C] 2026-06-17 Gifting Fixes.md                                    (gifting fix session)
01 Daily Logs/[C] 2026-06-17 Customer Portal v2 and Admin Theme.md              (portal v2 build)
01 Daily Logs/[C] 2026-06-17 End of Day Wrap Up.md                              (prior same-day state)
02 Projects/Benny & Penny's Adventures/[C] Customer Portal v2 and Admin Theme Handoff 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Digital Readable License Rule 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Customer Experience Portal Revamp Roadmap & Assessment.md  (roadmap; portal UX phase now built)
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```
