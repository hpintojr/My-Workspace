---
type: project-roadmap
project: Benny & Penny's Adventures
status: active
updated_by: ChatGPT
last_updated: 2026-06-17 end of day
source: architectural-blueprint-developer-guidelines.md + Hamilton product/delivery direction
---

# Customer Experience / Portal Revamp Roadmap & Assessment

## Purpose

Use the updated architectural blueprint and Hamilton's product-delivery direction as the active roadmap for customer experience, portal, checkout, address handling, fulfillment visibility, gifting, and support workflow.

This workstream is active while further LuLu testing is paused.

---

## Current Decision

```txt
R2 automated digital delivery is now validated in testing.
The immediate priority moves to product asset replacement, BPG gifting/license rules, and portal UX/workflow redesign.
LuLu sandbox/live testing stays paused until official LuLu specs and project/template requirements are understood.
```

---

## Important Product Assumptions

```txt
Current product catalog data is placeholder material.
Current book cover images are placeholders.
Current page preview images are placeholders.
Current cart thumbnail images are placeholders.
Manual admin/media linkage is only a support-reference view.
R2 delivery is now the active automated delivery foundation.
```

---

## Confirmed Delivery Foundation

```txt
Paid test order created Media/Downloads records automatically.
Portal Library shows separate PDF, EPUB, and Audiobook buttons.
R2 signed links work.
Shared readable slot tracking is active.
Current R2 folder standard: ebooks/, audio/, print/.
```

---

## Recommended Build Order

### Phase A — Product Assets

Goal:

```txt
Replace placeholders before final customer-facing UX is polished.
```

Tasks:

- Organize correct cover/page/cart image strategy.
- Replace placeholder cover images.
- Replace placeholder page preview images.
- Replace placeholder cart thumbnails.
- Replace dummy R2 files with real PDF, EPUB, and audio files as Books 1-4 are finalized.

---

### Phase B — BPG Gifting and Cart/Coupon Tracking

Goal:

```txt
Simplify gifting and make BPG codes trackable through the cart/coupon system.
```

Tasks:

- Tie BPG codes to cart/coupon tracking.
- Track redemption from cart through order and download record.
- Make BPG gifts consume from the purchaser's shared readable slot pool.
- Limit gifted digital access to one download/device allowance.
- Update Terms and Conditions for gifted vs full-license access.
- Label gifted access clearly in Library.

---

### Phase C — Portal UX and Account Setup

Goal:

```txt
Make the customer portal workflow match how customers actually receive and manage products.
```

Tasks:

- Verify or build the customer account setup page.
- Redesign portal navigation and information architecture.
- Add Account and Helpdesk areas.
- Improve Library around confirmed digital delivery.
- Improve Orders around digital/audio/print/support status.
- Add address confirmation after account setup.
- Validate mobile workflow.

---

### Phase D — Geoapify Address Experience

Goal:

```txt
Use Geoapify anywhere admins or customers enter addresses inside the Benny & Penny system.
```

Tasks:

- Add Geoapify metadata fields to customer-addresses.
- Add autocomplete to Portal > Addresses.
- Add autocomplete to admin/customer address-entry workflows.
- For guest checkout, keep Stripe address capture for now and focus on confirming/capturing Stripe-collected address after payment.
- Add low-confidence/manual confirmation.

---

### Phase E — LuLu Research and Print Setup

Goal:

```txt
Create a repeatable LuLu setup plan before print submission testing.
```

Open questions:

- Does each book need one project or separate paperback/hardcover projects?
- For 9 books, is the setup 9 projects or 18 projects?
- What exact PDF, bleed, margin, cover, and template requirements apply?
- What is the correct Canva export process for print-ready PDFs?
- How should the final files be made accessible to LuLu?

---

### Phase F — Abandoned Cart and Marketing Planning

Goal:

```txt
Keep marketing expansion planned but do not overbuild before product delivery and portal workflow are fixed.
```

Tasks:

- Plan abandoned-cart recovery options.
- Decide what event data to store first-party.
- Research tagging/retargeting options after consent/privacy planning.
- Keep subscriber/marketing panel on the back burner.
- Future panel may support email, newsletters, SMS, outbound calls, and API/webhook integrations.

---

## Next Recommended Build

```txt
1. Replace placeholder product images and cart thumbnails.
2. Replace dummy R2 files with real files as Books 1-4 are finalized.
3. Build BPG gift-code logic against the shared readable slot pool.
4. Update Terms for full readable license vs gifted access.
5. Verify or build the customer account setup page.
6. Redesign portal UX/workflow around confirmed delivery behavior.
7. Add Geoapify fields/autocomplete to customer/admin address entry points.
8. Research official LuLu setup/template requirements.
```
