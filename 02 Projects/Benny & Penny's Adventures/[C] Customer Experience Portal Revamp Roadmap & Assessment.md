---
type: project-roadmap
project: Benny & Penny's Adventures
status: active
updated_by: ChatGPT
last_updated: 2026-06-17
source: architectural-blueprint-developer-guidelines.md + Hamilton product/delivery direction
---

# Customer Experience / Portal Revamp Roadmap & Assessment

## Purpose

Use the updated architectural blueprint and Hamilton's latest product-delivery direction as the active roadmap for the Benny & Penny customer experience, portal, checkout, address handling, fulfillment visibility, gifting, and support workflow.

This workstream is active while further LuLu testing is paused.

---

## Current Decision

```txt
The immediate priority is correct product assets plus automated digital delivery.
The portal UX/workflow must be redesigned around the real delivery process.
LuLu sandbox/live testing stays paused until Book 1 setup, official LuLu specs, and print-file URL handling are understood.
```

---

## Important Product Assumptions

```txt
Current product catalog data is placeholder material.
Current book cover images are placeholders.
Current page preview images are placeholders.
Current cart thumbnail images are placeholders.
Manual admin/media linkage was only meant as a customer-support reference view.
Digital delivery now needs to be automated through R2.
```

---

## Code Review Findings to Preserve

Repo review confirmed:

```txt
Portal routes exist for home, login, orders, library, and addresses.
Portal APIs exist for account status, orders, library, addresses, and downloads.
Cart already has thumbnails, plus/minus quantity controls, remove item, clear cart, and saved-address selectors.
Checkout already has partial saved-address prefill for signed-in customers.
R2 delivery code path exists and Library can show available download records.
LuLu submit backend and admin page exist, but testing is paused.
Support collections exist, but the customer Helpdesk workflow is not built.
```

Important gaps:

```txt
Correct product assets are not in place yet.
Temporary digital files need to be uploaded to R2.
Automated download record creation must replace manual digital file linkage.
Verify or build the customer account setup page.
Add Geoapify metadata fields and autocomplete to Portal > Addresses.
Simplify BPG gifting and connect it to cart/coupon tracking.
Research official LuLu setup/templates before sandbox/live print submission.
```

---

## Recommended Build Order

### Phase A — Product Assets and R2 Digital Delivery

Goal:

```txt
Replace placeholders and make paid digital access automatic.
```

Tasks:

- Organize correct cover/page/cart image strategy.
- Upload temporary PDF/EPUB/audio files to R2.
- Decide R2 object-key convention for all books/formats.
- Map product records to digital file keys.
- Create download records automatically after paid checkout.
- Keep manual admin/media linkage only as a support-reference tool.
- Test paid checkout to Library to secure download end to end.

---

### Phase B — Portal UX and Account Setup

Goal:

```txt
Make the customer portal workflow match how customers actually receive and manage products.
```

Tasks:

- Verify or build the customer account setup page.
- Redesign portal navigation and information architecture.
- Add Account and Helpdesk areas.
- Improve Library around automated delivery.
- Improve Orders around digital/audio/print/support status.
- Add address confirmation after account setup.
- Validate mobile workflow.

---

### Phase C — Geoapify Address Experience

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

### Phase D — BPG Gifting and Cart/Coupon Tracking

Goal:

```txt
Simplify gifting and make BPG codes trackable through the cart/coupon system.
```

Tasks:

- Tie BPG codes to cart/coupon tracking.
- Track redemption from cart through order and download record.
- Limit gifted digital access to one download/device allowance.
- Keep full paid digital-license allowance separate from gift allowance.
- Update Terms and Conditions for gifted vs full-license access.
- Label gifted access clearly in Library.

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

Tasks:

- Research official LuLu documentation/templates.
- Create project/folder plan for all 9 books.
- Confirm Books 1-4 Canva output requirements.
- Confirm print-file URL handling before sandbox submission.

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
1. Organize/replace correct product images and cart thumbnails.
2. Upload temporary digital product files to R2.
3. Automate download-record creation after paid checkout.
4. Verify or build the customer account setup page.
5. Redesign portal UX/workflow around automated delivery.
6. Add Geoapify fields/autocomplete to customer/admin address entry points.
7. Simplify BPG gifting and connect it to cart/coupon tracking.
8. Research official LuLu setup/template requirements.
```
