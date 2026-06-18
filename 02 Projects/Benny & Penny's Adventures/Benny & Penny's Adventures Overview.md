---
type: project-overview
project: Benny & Penny's Adventures
updated: 2026-06-17 workspace cleanup after Google Places switch
---

# Benny & Penny's Adventures Overview

## Goal

Build a children's publishing business around the Benny & Penny medical adventure book series, including public website, correct product assets, digital ebook/audiobook delivery, print-on-demand, customer portal, Payload CMS admin, R2 fulfillment, LuLu fulfillment, Google Places address entry, BPG gifting, support/helpdesk, and future marketing infrastructure.

## Domains

- `bennyandpennyadventures.com` — main website.
- `bennyandpenny.com` — communications/email domain.

---

## Current Status — 2026-06-17 Workspace Cleanup

Active focus:

```txt
Google Places live verification + order 26-0029 cleanup + product asset replacement + real R2 files + BPG gifting/license rules + Terms/email deliverability + LuLu research.
```

Confirmed today:

```txt
Customer Portal v2 shipped and was approved.
Gifting fixes shipped.
R2 automated digital delivery works in testing.
Digital orders auto-create Media/Downloads records.
Portal Library shows separate PDF, EPUB, and Audiobook buttons.
R2 signed download links work.
Shared readable slot tracking is active.
Geoapify was removed and Google Places API (New) autocomplete was built for portal + admin.
Stripe name guard was added for address-typed-into-name-field mistakes.
```

Controlled environment rule:

```txt
Stay on main branch.
Production deployment is the controlled test environment.
The site is not live for public order traffic yet.
Stripe remains sandbox/test mode.
LuLu remains sandbox/testing.
```

---

## Current Product Asset Assumptions

Hamilton clarified:

```txt
Current product catalog data is placeholder material.
Current cover images are placeholders.
Current page preview images are placeholders.
Current shopping cart thumbnails are placeholders.
```

Next product asset priority:

```txt
Replace placeholders with correct production assets and do not build final customer UX around placeholder images.
```

---

## Digital Delivery Status

Current R2 folder standard:

```txt
ebooks/book-<number>.pdf
ebooks/book-<number>.epub
audio/book-<number>-audiobook.mp3
print/
```

Validated flow:

```txt
Customer buys digital/audio product
-> checkout is paid
-> fulfillment creates Media/Downloads records automatically
-> customer Library shows available product files
-> secure R2 download link is generated on demand
```

Remaining digital-delivery work:

- Replace dummy/zero-byte R2 files with real PDF, EPUB, and audio files as Books 1-4 are finalized.
- Keep Book records as source of truth for exact R2 object keys.
- Redesign the final Library UX only after real product assets/files are available.

---

## Shared Readable License Rule

```txt
One purchased readable license grants access to both PDF and EPUB.
The license has 3 total readable slots.
PDF downloads, EPUB downloads, and BPG gifts spend from the same pool.
Gifted access receives one download/device allowance.
```

This rule is validated at the delivery layer for PDF/EPUB downloads. Owned-copy gifting works through redemption codes. Deeper BPG/coupon/cart tracking still needs to be built against the same pool.

---

## Portal Status

Portal v2 shipped and was approved.

Current portal capabilities:

```txt
Persistent portal shell and navigation.
Dashboard with reading slots and recent orders.
Library with PDF, EPUB, Audiobook buttons and gift-only book support.
Orders with shipment/print-job timeline and invoice button.
Gifting flow and session-aware redeem.
Addresses page with Google Places autocomplete built.
Account page.
Help/support ticket page.
Branded printable invoice.
```

Portal guardrail:

```txt
Do not broadly rewrite Portal v2 right now.
Do not reintroduce per-page SiteShell/PortalSessionBar wrappers.
Do not reintroduce cream admin palette.
```

---

## Cart / Checkout / Gifting Status

Confirmed in code review/build:

```txt
Cart has thumbnails, quantity controls, remove item, clear cart, and saved-address selectors.
Checkout has partial saved-address prefill for signed-in customers.
Gift redemption code flow works end-to-end for owned-copy gifting.
```

Hamilton's direction:

```txt
BPG gift codes should tie into the cart/coupon system and be trackable.
Gifted access should consume one readable slot and allow the decided download/device allowance.
Terms and Conditions must be updated to reflect full-license vs gifted access.
```

---

## Google Places Status

Geoapify has been removed.

Current Google Places setup:

```txt
Portal AddressAutocomplete is built.
Admin AdminAddressField is built on CustomerAddresses.street1.
Old /api/geo/* proxy routes are retired no-op stubs.
Admin System Status tile now says "Google Places API".
```

Still needs live verification:

```txt
Set NEXT_PUBLIC_GOOGLE_PLACES_API_KEY in Vercel.
Enable Places API (New) and billing in Google Cloud.
Add referrer allowlist entries for non-www, www, and localhost.
Redeploy.
Test portal and admin via DevTools Network tab.
```

---

## Stripe Name Guard Status

Problem found:

```txt
Stripe Checkout's name field is free text. Existing order 26-0029 has an address typed into the name field.
```

Guard added:

```txt
Names containing digits are flagged with a "⚠ REVIEW" order note.
When available, linked account name is used as fallback for customer/billing name.
Original Stripe values are preserved.
```

Still open:

- Manually fix order 26-0029.
- Optionally prefill Stripe Checkout name/address for logged-in customers.

---

## LuLu Status

```txt
Print-job queue works.
Book print setup fields exist.
Backend submit route exists.
Admin Submit to LuLu page/link exists.
Further LuLu testing is paused.
Auto-submit remains disabled.
```

Open LuLu planning questions:

```txt
Do 9 books require 9 LuLu projects or 18 projects for paperback + hardcover?
What exact PDF, bleed, margin, and cover specs are required?
What LuLu templates are available for the selected trim size?
What is the correct Canva export process for print-ready PDFs?
```

---

## Marketing / Abandoned Cart Status

Back burner roadmap items:

- Abandoned-cart recovery emails.
- Cart event capture.
- Google/Meta/tagging/retargeting options after privacy/consent planning.
- Subscriber marketing panel for email/newsletters/SMS/outbound calls/API integrations.
- API/data import-export as first step before a full marketing panel.

---

## Next Best Actions

1. Confirm Google Places autocomplete live in portal and admin.
2. Manually fix order 26-0029.
3. Set SPF/DKIM/DMARC for email deliverability.
4. Replace placeholder product images: covers, page previews, cart thumbnails.
5. Replace dummy R2 files with real files as Books 1-4 are finalized.
6. Decide whether gifted access should remain 1 download/device allowance or increase.
7. Build deeper BPG gift-code/coupon tracking against the shared readable slot pool.
8. Update Terms for full readable license vs gifted access.
9. Research official LuLu setup/template requirements before print testing resumes.

## Launch Blockers

### Business

- PO Box or business mailing address.
- DBA.
- Business bank account.
- Stripe live account readiness.
- Attorney/CPA review of legal, tax, licensing, and compliance decisions.

### Technical

- Google Places live verification not complete.
- Existing order 26-0029 needs manual cleanup.
- Correct product assets not uploaded.
- Real R2 files not uploaded yet.
- BPG gift/coupon tracking not fully implemented or reflected in Terms.
- Gift download allowance decision not finalized.
- LuLu project/template/file URL setup not resolved.
- Customer-role access control needs live verification.
