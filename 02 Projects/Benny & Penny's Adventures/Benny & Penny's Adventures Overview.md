---
type: project-overview
project: Benny & Penny's Adventures
updated: 2026-06-17 end of day
---

# Benny & Penny's Adventures Overview

## Goal

Build a children's publishing business around the Benny & Penny medical adventure book series, including public website, correct product assets, digital ebook/audiobook delivery, print-on-demand, customer portal, Payload CMS admin, R2 fulfillment, LuLu fulfillment, Geoapify address entry, BPG gifting, support/helpdesk, and future marketing infrastructure.

## Domains

- `bennyandpennyadventures.com` — main website.
- `bennyandpenny.com` — communications/email domain.

---

## Current Status — 2026-06-17 End of Day

Active focus:

```txt
Product asset replacement + BPG gifting/license rules + customer portal/workflow revamp.
```

Confirmed today:

```txt
R2 automated digital delivery works in testing.
Digital orders auto-create Media/Downloads records.
Portal Library shows separate PDF, EPUB, and Audiobook buttons.
R2 signed download links work.
Shared readable slot tracking is active.
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
- Redesign the final Library UX later.

---

## Shared Readable License Rule

```txt
One purchased readable license grants access to both PDF and EPUB.
The license has 3 total readable slots.
PDF downloads, EPUB downloads, and BPG gifts spend from the same pool.
Gifted access receives one download/device allowance.
```

This rule is validated at the delivery layer for PDF/EPUB downloads. BPG gifting still needs to be built against the same pool.

---

## Portal Status

Repo review confirmed:

```txt
Portal routes exist for home, login, orders, addresses, and library.
Portal APIs exist for account status, orders, addresses, library, and downloads.
Underlying fields/database/components are mostly present.
```

Hamilton's concern:

```txt
The portal UX and workflow are wrong and need to be redesigned around the real customer journey.
Current Library UI is testing/proof UI, not final UX.
```

Portal priorities:

- Verify or build the customer account setup page.
- Redesign portal UX and navigation.
- Make Library clearly show digital delivery.
- Make Orders show digital/audio/print/support status clearly.
- Add Helpdesk workflow.
- Add account/address confirmation flow.

---

## Cart / Checkout / Gifting Status

Confirmed in code review:

```txt
Cart has thumbnails, quantity controls, remove item, clear cart, and saved-address selectors.
Checkout has partial saved-address prefill for signed-in customers.
```

Hamilton's direction:

```txt
BPG gift codes should tie into the cart/coupon system and be trackable.
Gifted access should consume one readable slot and allow one download/device.
Terms and Conditions must be updated to reflect full-license vs gifted access.
```

---

## Geoapify Status

```txt
Geoapify appears in Admin Dashboard System Status Check.
Geoapify Vercel values are configured.
Geoapify autocomplete is not yet built into Portal > Addresses.
```

Hamilton's direction:

```txt
Use Geoapify anywhere admins or customers enter addresses inside the Benny & Penny system.
Stripe already handles guest checkout address collection, so guest checkout should focus on confirming/capturing Stripe's address after payment when that phase is reached.
```

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

1. Replace placeholder product images: covers, page previews, cart thumbnails.
2. Replace dummy R2 files with real files as Books 1-4 are finalized.
3. Build BPG gift-code logic against the shared readable slot pool.
4. Update Terms for full readable license vs gifted access.
5. Verify or build the customer account setup page.
6. Redesign portal UX/workflow around confirmed delivery behavior.
7. Add Geoapify fields/autocomplete to customer/admin address flows.
8. Research official LuLu setup/template requirements before print testing resumes.

## Launch Blockers

### Business

- PO Box or business mailing address.
- DBA.
- Business bank account.
- Stripe live account readiness.
- Attorney/CPA review of legal, tax, licensing, and compliance decisions.

### Technical

- Correct product assets not uploaded.
- Real R2 files not uploaded yet.
- Customer portal revamp not finished.
- Account setup page/address confirmation not finished.
- BPG gifting rules not implemented or reflected in Terms.
- Helpdesk/customer support portal not finished.
- LuLu project/template/file URL setup not resolved.
- Customer portal physical delivery status not finished.
- Customer-role access control needs live verification.
