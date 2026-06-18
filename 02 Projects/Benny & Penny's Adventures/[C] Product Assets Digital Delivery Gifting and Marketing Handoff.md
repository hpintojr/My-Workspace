---
type: project-handoff
project: Benny & Penny's Adventures
status: active
updated_by: ChatGPT
last_updated: 2026-06-17
---

# Product Assets, Digital Delivery, Gifting, Address Autocomplete, and Marketing Handoff

## Purpose

This file captures Hamilton's latest direction after the repo review, confirmed R2 delivery test, Portal v2 approval, gifting fixes, and the Google Places address-autocomplete switch. The active work is now Google Places live verification, order 26-0029 cleanup, product asset replacement, real R2 files, BPG gifting/license rules, Terms updates, email deliverability, and later LuLu/marketing planning.

---

## Product Catalog and Images

Current product catalog content is placeholder material.

This includes:

```txt
Book product data
Book cover images
Book page preview images
Shopping cart thumbnail images
Any temporary visual product assets
```

Next product-asset goal:

```txt
Replace placeholder images and catalog visuals with the correct production images for each book and product format.
```

Important workflow note:

```txt
Do not treat current catalog images as final.
Do not build final customer UX around placeholder cover/page/cart images.
```

---

## Digital Product Delivery and R2

Status:

```txt
R2 automated digital delivery is confirmed working in testing.
Digital order flow creates Media/Downloads records automatically.
Portal Library shows separate PDF, EPUB, and Audiobook buttons.
R2 signed download links work.
Shared readable slot tracking is active.
```

Current R2 bucket standard:

```txt
ebooks/book-<number>.pdf
ebooks/book-<number>.epub
audio/book-<number>-audiobook.mp3
print/
```

Delivery goal now validated in testing:

```txt
Customer buys PDF/EPUB/audiobook
-> checkout is paid
-> order is fulfilled
-> download records are automatically created
-> customer Library shows available files
-> secure download link is generated on demand
```

Remaining digital-delivery work:

- Replace dummy/zero-byte R2 files with real files as Books 1-4 are finalized.
- Keep Book records as source of truth for exact R2 object keys.
- Keep manual media/admin view only as support/admin reference.
- Polish final Library UX later only after real assets/files exist.

---

## Shared Readable License Rule

Hamilton approved the shared readable-license model.

Rule:

```txt
One purchased digital readable license grants access to both PDF and EPUB.
The license has 3 total readable access slots.
PDF downloads, EPUB downloads, and BPG gifts all spend from the same 3-slot pool.
A gifted recipient receives one digital download/device allowance.
```

Examples:

```txt
Buyer downloads PDF once and EPUB once -> 1 readable slot remains.
Buyer downloads nothing -> buyer may issue up to 3 gifts.
Buyer downloads PDF 3 times -> no EPUB or gift slots remain.
Buyer issues 1 gift -> buyer has 2 readable slots left across PDF/EPUB.
```

---

## Customer Portal Direction

Portal v2 has shipped and Hamilton approved it.

Current portal status:

```txt
Portal shell, dashboard, library, orders, gifting, addresses, account, help, shipment tracking, reading-slot meter, branded invoice, and admin sidebar refresh are built.
The portal should not be broadly rewritten right now.
Product assets, real R2 files, fulfillment details, gifting/coupon tracking, and legal/Terms updates are the current focus.
```

Preserve these portal decisions:

- Portal pages do not import/wrap their own SiteShell or PortalSessionBar.
- Portal layout owns the shell.
- Login/post-auth redirect into portal should full-reload.
- Admin palette stays teal/mint; do not reintroduce cream.
- Business address appears only on the printable invoice for now.

---

## Gifting and BPG Code Protocol

Current gifting works end-to-end for owned-copy redemption codes, but deeper BPG/cart/coupon tracking is still open.

Hamilton's intended direction:

```txt
BPG gift codes should tie into the shopping cart coupon/discount system.
The code should be trackable from cart through redemption.
A BPG code should spend one slot from the purchaser's shared readable license.
A gifted recipient should receive one digital download/device allowance.
A full purchased readable license allows 3 total readable slots across PDF, EPUB, and gifts.
Terms and conditions must be updated to match this policy.
```

Open build items:

- Decide whether BPG codes are implemented as coupon codes, gift redemptions, or a connected layer over the coupon system.
- Track BPG usage from cart, order, customer, and download record.
- Limit BPG redemption to one digital download/device allowance.
- Update Terms and Conditions to define gifted digital access limits.
- Decide whether to raise gift download allowance above 1 for recipient re-downloads.

---

## Google Places Address Autocomplete

Geoapify has been removed. Address autocomplete now uses **Google Places API (New)**.

Current implementation:

```txt
Portal: app/components/AddressAutocomplete.tsx in the customer address book.
Admin: app/(payload)/components/AdminAddressField.tsx on CustomerAddresses.street1.
Admin import: app/(payload)/admin/importMap.ts.
Admin status: "Google Places API" tile in BeforeDashboard.
Old /api/geo/autocomplete and /api/geo/place routes are retired no-op stubs.
```

Critical environment/config requirement:

```txt
Use NEXT_PUBLIC_GOOGLE_PLACES_API_KEY in Vercel.
Enable Places API (New) and billing in Google Cloud.
Referrer allowlist should include:
- https://bennyandpennyadventures.com/*
- https://www.bennyandpennyadventures.com/*
- http://localhost:3000/*
```

Still open:

```txt
Confirm Google Places works live in portal + admin after env/referrer/redeploy.
Diagnose in DevTools Network tab:
- no request = missing client env var at build time
- 403 = referrer/API/key restriction issue
Later: account setup address confirmation and logged-in checkout address prefill polish.
```

---

## Stripe Name Guard

Problem found:

```txt
A customer can type an address into Stripe Checkout's free-text name field.
Existing order 26-0029 has this issue and needs manual cleanup.
```

Code guard now exists:

```txt
lib/stripeFulfillment.ts has nameLooksLikeAddress + nameReviewNote.
Digit-containing names are flagged with a "⚠ REVIEW" order note.
When a linked account name is available, fulfillment uses that account name as fallback for customer/billing name.
Original Stripe values are preserved; this is non-destructive.
```

Optional future improvement:

```txt
Prefill Stripe Checkout name/address for logged-in customers to reduce name-field mistakes.
```

---

## LuLu Planning Questions

Hamilton still needs to create LuLu project folders/projects for all 9 books.

Open LuLu questions:

```txt
Do we need one LuLu project per book, or one per book per format?
If paperback and hardcover use the same trim/output size, does LuLu still require separate setup?
For 9 books, is the correct setup 9 projects or 18 projects?
How should final drafts be uploaded?
What exact PDF format, bleed, margins, cover specs, and template are required?
Does LuLu provide downloadable templates for the required trim size?
```

Current book production status:

```txt
Books 1-4 are nearly assembled in Canva.
Final output needs to use correct print-ready PDF specs with bleeds before LuLu upload.
```

---

## Abandoned Cart and Marketing

This is not the immediate build priority, but it needs to stay on the roadmap.

Future topics:

```txt
Abandoned cart recovery emails
Marketing outreach from abandoned carts
Google IDs / Google tagging
Facebook / Meta tagging
Other DSP marketing options
Retargeting strategy
Webhook/API connections to outside services
Subscriber marketing panel for email/newsletter/SMS/outbound calls/API integrations
```

Current priority:

```txt
Back burner.
Do not overbuild now.
May only need a clean way to API data in and out at first.
```

---

## Updated Next Build Priority

The next practical build sequence should be:

```txt
0. Confirm Google Places autocomplete works live in portal and admin.
0b. Manually fix order 26-0029 and decide whether to prefill Stripe Checkout name/address for logged-in customers.
1. Set email deliverability DNS (SPF/DKIM/DMARC) for bennyandpennyadventures.com / Sequenzy.
2. Replace/organize correct book product assets and image strategy.
3. Replace dummy R2 files with real PDF, EPUB, and audio files as they are finalized.
4. Decide whether gift recipients should get more than 1 download allowance.
5. Build deeper BPG gift-code/coupon tracking against the shared readable slot pool.
6. Update Terms for full readable license vs gifted access.
7. Add later address workflow polish: account setup confirmation + logged-in checkout prefill.
8. Research official LuLu project/template setup before real print submission.
9. Keep abandoned cart and marketing panel planning on the roadmap but back burner.
```
