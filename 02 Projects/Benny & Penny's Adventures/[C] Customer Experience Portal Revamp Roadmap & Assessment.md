---
type: project-roadmap
project: Benny & Penny's Adventures
status: active
updated_by: ChatGPT
last_updated: 2026-06-17
source: architectural-blueprint-developer-guidelines.md
---

# Customer Experience / Portal Revamp Roadmap & Assessment

## Purpose

Use the updated architectural blueprint as the active roadmap for revamping the Benny & Penny customer experience, portal, checkout, address handling, fulfillment visibility, and support workflow.

This workstream is active while further LuLu testing is paused.

---

## Current Decision

```txt
Pause additional LuLu submit/testing work.
Do not submit sandbox or live print jobs yet.
Use the deployed LuLu submit tool only after Book 1 print setup and customer-experience priorities are aligned.
Shift active focus to the customer portal / customer experience revamp.
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

Important gaps found:

```txt
Verify or build the customer account setup page.
Add Geoapify metadata fields and autocomplete to Portal > Addresses.
Harden the existing saved-address checkout prefill with UX polish and E2E testing.
Confirm LuLu print-file URL handling before sandbox/live submission.
Expand support schema/API for affected order items and customer-visible threads.
```

---

## Recommended Active Build Order

### Phase A — Account Setup and Portal IA

Goal:

```txt
Make post-purchase account setup and the portal entry path clear before deeper checkout changes.
```

Tasks:

- Verify or build the customer account setup page.
- Create or refine shared portal shell/navigation.
- Add Account and Helpdesk areas.
- Add active route highlighting.
- Keep parent navigation links selectable.
- Use the bookstore/editorial visual system.
- Validate mobile first.

Status:

```txt
Active next build.
```

---

### Phase B — Address Book + Geoapify Autocomplete

Goal:

```txt
Make shipping/billing address entry clean, structured, and reusable.
```

Tasks:

- Add Geoapify metadata fields to customer-addresses.
- Verify Neon after field creation if needed.
- Add Geoapify autocomplete to Portal > Addresses.
- Save parsed address data into existing address fields.
- Store place ID, formatted address, confidence values, and confirmation date.
- Add manual confirmation when confidence is low.
- Keep frozen order snapshots unchanged when saved addresses are edited.

Status:

```txt
Geoapify dashboard visibility complete.
Vercel Geoapify values configured.
Portal address autocomplete not built yet.
```

---

### Phase C — Account Setup Address Confirmation

Goal:

```txt
Keep guest checkout friction low while still creating a strong customer identity after purchase.
```

Current decision:

```txt
Do not force account creation before checkout.
Keep guest-friendly checkout.
Create/fetch customer by email after paid checkout.
Send account setup prompt after purchase.
```

Tasks:

- After account setup, route customer through address confirmation.
- Confirm billing address.
- Confirm shipping address if a physical order exists.
- Save defaults.
- Continue to portal.

Status:

```txt
Backend customer creation exists.
Address-confirmation flow not built yet.
```

---

### Phase D — Cart and Checkout UX Revamp

Goal:

```txt
Improve checkout clarity before Stripe redirect.
```

Confirmed already present:

```txt
Basic cart thumbnails.
Format labels.
Plus/minus quantity controls.
Remove item.
Saved-address selector for signed-in customers.
Partial saved-address checkout prefill.
```

Still needed:

- Sticky mobile checkout CTA.
- Stronger price/discount clarity.
- Cleaner physical-shipping confirmation.
- Saved-address picker polish and E2E validation.
- Shipping-rate estimator later.
- Catalog source-of-truth decision before deeper checkout changes.

---

### Phase E — Orders, Library, and Fulfillment Tracking

Goal:

```txt
Show customers what they bought, what is downloadable, what is printing, and what has shipped.
```

Tasks:

- Redesign order details around fulfillment sections.
- Make download availability states clearer in Library.
- Surface print-job status once LuLu tracking exists.
- Add registered-customer physical tracking cards later.
- Add guest read-only order tracking later.

Status:

```txt
Current portal has orders/library/address foundations.
Physical tracking is not yet surfaced.
```

---

### Phase F — Helpdesk / Support Ticket Revamp

Goal:

```txt
Let customers open support tickets tied to a specific order and line item.
```

Tasks:

- Add Helpdesk route in portal.
- Add ticket creation API.
- Verify selected order/item belongs to the customer.
- Add affected item relationship.
- Add customer/admin thread model.
- Add customer-facing ticket timeline.
- Add admin reply notification.

Status:

```txt
Support collections exist.
Customer support portal workflow not finished.
```

---

### Phase G — Digital Delivery Finalization

Goal:

```txt
Make digital delivery secure, immediate, and easy to re-access.
```

Tasks:

- Confirm real private object keys for PDF, EPUB, and audiobook assets.
- Test paid-order-to-library-to-download E2E.
- Keep links short-lived.
- Track usage and limits.
- Improve Library UI states.

Status:

```txt
R2 code path exists.
Live file E2E still open.
```

---

### Phase H — LuLu Tracking and Customer Communications

Goal:

```txt
Connect physical fulfillment updates to portal and email after LuLu testing resumes.
```

Tasks:

- Keep manual submit/testing paused until Book 1 print setup is complete.
- Confirm print-file URL handling before sandbox/live submission.
- Later test sandbox submit from the deployed admin page.
- Add LuLu status/tracking persistence.
- Add rejected/error admin alert.
- Add shipment/tracking email.

Status:

```txt
LuLu submit UI deployed but further LuLu testing paused.
Status/tracking handling not built yet.
```

---

### Phase I — Privacy, Compliance, and Tax Assessment

Goal:

```txt
Make data collection, tracking, and physical/digital tax handling launch-ready.
```

Tasks:

- Review privacy policy for processors and data flows.
- Add checkout/portal notice explaining address and fulfillment data usage.
- Plan cookie/analytics consent before marketing pixels.
- Reassess tax strategy before public physical-book launch.
- Keep attorney/CPA review as a launch blocker.

---

## Next Recommended Build

```txt
1. Verify or build the customer account setup page.
2. Redesign portal information architecture.
3. Add Geoapify fields and autocomplete to Portal > Addresses.
4. Add address confirmation after account setup.
5. Harden the existing saved-address checkout prefill.
6. Upgrade cart UX for mobile-first checkout clarity.
7. Add customer support/helpdesk workflow tied to orders/items.
```

Do not resume LuLu sandbox submission until Book 1 setup, print-file URL handling, and portal priorities are confirmed.
