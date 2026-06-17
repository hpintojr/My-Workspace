---
type: project-handoff
project: Benny & Penny's Adventures
status: active
updated_by: ChatGPT
last_updated: 2026-06-17
---

# Product Assets, Digital Delivery, Gifting, and Marketing Handoff

## Purpose

This file captures Hamilton's latest direction after the repo review. The active work is broader than portal UX polish: the project now needs correct product assets, automated digital delivery, better customer workflows, simplified gifting, and a cleaner marketing/abandoned-cart strategy.

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

Current situation:

```txt
Digital file linkage for PDF/EPUB products is currently too manual.
Manual admin/media linkage was only intended as an internal support reference point.
The full delivery process needs to become automated.
```

New priority:

```txt
Upload temporary files for all digital products to Cloudflare R2 and automate delivery from paid checkout through customer Library/download access.
```

Delivery goal:

```txt
Customer buys PDF/EPUB/audiobook
-> checkout is paid
-> order is fulfilled
-> download records are automatically created
-> customer Library shows available files
-> secure download link is generated on demand
```

Open build items:

- Upload temporary PDF/EPUB/audio files for all digital products to R2.
- Decide the R2 object-key convention for all 9 books and every digital format.
- Store digital delivery keys on the Book/Product records or a related asset mapping.
- Create download records automatically after paid checkout.
- Keep manual media/admin view only as a support/admin reference, not the customer delivery mechanism.
- Test paid-order-to-library-to-download end to end.

---

## Customer Portal Direction

Hamilton's issue with the current portal is mainly UX and workflow, not the database foundation.

Current view:

```txt
Underlying fields and database components are mostly there.
The portal UX and workflow are wrong and need to be magnified, improved, and made customer-friendly.
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
A BPG code should allow one digital download only.
A full purchased license may allow three downloads/devices.
A gifted access code should not grant the same full-license allowance.
Terms and conditions must be updated to match this policy.
```

Open questions/build items:

- Decide whether BPG codes are implemented as coupon codes, gift redemptions, or a connected layer over the coupon system.
- Track BPG usage from cart, order, customer, and download record.
- Limit BPG redemption to one digital download/device allowance.
- Keep full paid digital license rules separate from gifted access rules.
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

Next LuLu research/build step:

```txt
Before sandbox submission, research official LuLu setup and template requirements, then create a repeatable setup plan for all 9 books.
```

---

## Abandoned Cart and Marketing

The Admin portal already has an Abandoned Cart area planned/visible. This should later connect into customer and marketing workflows.

Hamilton wants options for:

```txt
Abandoned cart recovery emails
Marketing outreach from abandoned carts
Google IDs / Google tagging
Facebook / Meta tagging
Other DSP marketing options
Retargeting strategy
Webhook/API connections to outside services
```

This is not the immediate build priority, but it needs to stay on the roadmap.

Open planning items:

- Decide what abandoned-cart event data is stored first-party.
- Decide if/when to add Google/Meta tags.
- Decide consent/cookie/GPC requirements before marketing pixels.
- Plan email recovery sequence.
- Plan how abandoned carts connect to subscriber/customer records.

---

## Subscriber / Marketing Panel

Hamilton is considering a future admin marketing panel.

Possible channels:

```txt
Email
Newsletters
SMS
Outbound AI calls
API/webhook connections to outside marketing or booking services
```

Current priority:

```txt
Back burner.
Do not overbuild now.
May only need a clean way to API data in and out at first.
```

Future marketing panel direction:

- Subscriber list management.
- Newsletter segmentation.
- Email/SMS consent-safe outreach.
- Export/API/webhook integrations.
- Campaign audit trail.
- Optional outbound AI call integration later.

---

## Updated Next Build Priority

The next practical build sequence should be:

```txt
1. Replace/organize correct book product assets and image strategy.
2. Upload temporary digital product files to R2.
3. Automate digital download record creation after checkout.
4. Rework portal UX around the corrected delivery workflow.
5. Add Geoapify to customer/admin address entry points.
6. Simplify BPG gifting and tie it into cart/coupon tracking.
7. Research official LuLu project/template setup before real print submission.
8. Keep abandoned cart and marketing panel planning on the roadmap but back burner.
```
