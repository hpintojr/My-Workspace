---
type: project-overview
project: Benny & Penny's Adventures
updated: 2026-06-17
---

# Benny & Penny's Adventures Overview

## Goal

Build a children's publishing business around the Benny & Penny medical adventure book series, including:

- Public website.
- Correct book/product assets.
- Digital ebook and audiobook delivery.
- Print-on-demand book sales.
- Customer portal / member area.
- Payload CMS admin backend.
- Email list and contact management.
- Private R2 digital/audio fulfillment.
- Physical book fulfillment and tracking.
- Geoapify-powered address autocomplete/saved address experience.
- Gifting/BPG code workflow.
- Customer support/helpdesk workflow.
- Abandoned-cart and marketing roadmap.
- Business infrastructure.

## Domains

- `bennyandpennyadventures.com` — main website.
- `bennyandpenny.com` — communications/email domain.

---

## Current Status — 2026-06-17

The active project focus is now:

```txt
Correct product assets + automated R2 digital delivery + customer portal/workflow revamp.
```

The site remains a controlled working environment:

```txt
Stay on main branch.
Production deployment is the controlled test environment.
The site is not live for public order traffic yet.
Stripe remains sandbox/test mode.
LuLu remains sandbox/testing.
```

Active handoff file:

```txt
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
```

Active roadmap:

```txt
02 Projects/Benny & Penny's Adventures/[C] Customer Experience Portal Revamp Roadmap & Assessment.md
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

## Digital Delivery Direction

Current manual linkage is not the final delivery workflow.

```txt
Manual admin/media linkage for PDF/EPUB products was only intended as a support-reference viewpoint.
Digital product delivery now needs to be automated through R2.
```

Target flow:

```txt
Customer buys digital/audio product
-> checkout is paid
-> fulfillment creates download records automatically
-> customer Library shows available product files
-> secure download link is generated on demand
```

Immediate digital-delivery blockers:

- Upload temporary files for digital products to R2.
- Decide R2 object-key convention.
- Map product records to R2 file keys.
- Automate download-record creation after checkout.
- Test checkout to Library to secure file download end to end.

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
```

Portal priorities:

- Verify or build the customer account setup page.
- Redesign portal UX and navigation.
- Make Library clearly show automated digital delivery.
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
The cart and checkout elements exist, but they are not yet being used for the best customer experience.
BPG gift codes should tie into the cart/coupon system and be trackable.
Gifted access should allow one digital download/device only.
Full paid licenses may allow three downloads/devices.
Terms and Conditions must be updated to reflect the difference.
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
How should project folders be organized?
What exact PDF, bleed, margin, and cover specs are required?
What LuLu templates are available for the selected trim size?
What is the correct Canva export process for print-ready PDFs?
```

Current book production note:

```txt
Books 1-4 are nearly assembled in Canva and need official print-ready output requirements before upload.
```

---

## Marketing / Abandoned Cart Status

Abandoned cart and marketing expansion are on the roadmap, not the immediate build.

Future planning areas:

- Abandoned-cart recovery emails.
- Cart event capture.
- Google/Meta/tagging/retargeting options after privacy/consent planning.
- Subscriber marketing panel for email/newsletters/SMS/outbound calls/API integrations.
- API/data import-export as the likely first step before building a full marketing panel.

---

## Next Best Actions

1. Organize correct product images and placeholder replacement strategy.
2. Upload temporary digital product files to R2.
3. Automate download-record creation after paid checkout.
4. Verify or build the customer account setup page.
5. Redesign portal UX/workflow around automated delivery.
6. Add Geoapify fields/autocomplete to customer and admin address entry points.
7. Simplify BPG gifting and connect it to cart/coupon tracking.
8. Research official LuLu setup/template requirements.
9. Keep abandoned-cart and subscriber marketing panel planning on the roadmap but back burner.

## Launch Blockers

### Business

- PO Box or business mailing address.
- DBA.
- Business bank account.
- Stripe live account readiness.
- Attorney/CPA review of legal, tax, licensing, and compliance decisions.

### Technical

- Correct product assets not uploaded.
- R2 digital delivery not fully automated/tested.
- Customer portal revamp not finished.
- Account setup page/address confirmation not finished.
- BPG gifting rules not implemented or reflected in Terms.
- Helpdesk/customer support portal not finished.
- LuLu project/template/file URL setup not resolved.
- Customer portal physical delivery status not finished.
- Customer-role access control needs live verification.
