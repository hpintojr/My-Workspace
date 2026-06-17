---
type: project-handoff
project: Benny & Penny's Adventures
status: active
updated_by: ChatGPT
last_updated: 2026-06-17
---

# Product Assets, Digital Delivery, Gifting, and Marketing Handoff

## Purpose

This file captures Hamilton's latest direction after the repo review and the confirmed R2 delivery test. The active work is now product asset replacement, BPG gifting/license rules, customer portal UX/workflow, and later LuLu/marketing planning.

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
- Polish final Library UX later during portal revamp.

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

Hamilton's issue with the current portal is mainly UX and workflow, not the database foundation.

Current view:

```txt
Underlying fields and database components are mostly there.
The portal UX and workflow are wrong and need to be improved and made customer-friendly.
Current Library UI is a testing/proof UI, not final UX.
```

Portal direction:

- Rework flow from the customer point of view.
- Make Library, Orders, Addresses, Helpdesk, and Account feel intentional.
- Show digital delivery clearly.
- Show print fulfillment clearly once LuLu tracking is ready.
- Avoid building around placeholder assets.

---

## Gifting and BPG Code Protocol

Current gifting/sharing protocol needs to be simplified and rethought.

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
- Update Library UI so gifted access is labeled clearly.

---

## Geoapify Usage

Geoapify should be used anywhere the admin or customer enters an address inside the Benny & Penny system.

Use cases:

```txt
Admin-entered customer addresses
Customer portal address book
Account setup address confirmation
Logged-in customer checkout/address selection flows
Future internal support/order address correction workflows
```

Guest checkout note:

```txt
Stripe already has its own address collection/autocomplete for guest checkout.
For guest checkout, focus on confirming and capturing the address from Stripe after checkout rather than duplicating Stripe's guest address flow too early.
```

---

## LuLu Planning Questions

Hamilton still needs to create LuLu project folders/projects for all 9 books.

Open LuLu questions:

```txt
Do we need one LuLu project per book, or one per book per format?
If paperback and hardcover use the same trim/output size, does LuLu still require separate project/package setup?
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
1. Replace/organize correct book product assets and image strategy.
2. Replace dummy R2 files with real PDF, EPUB, and audio files as they are finalized.
3. Build BPG gift-code logic against the shared readable slot pool.
4. Update Terms for full readable license vs gifted access.
5. Verify or build the customer account setup page.
6. Rework portal UX around the confirmed delivery workflow.
7. Add Geoapify to customer/admin address entry points.
8. Research official LuLu project/template setup before real print submission.
9. Keep abandoned cart and marketing panel planning on the roadmap but back burner.
```
