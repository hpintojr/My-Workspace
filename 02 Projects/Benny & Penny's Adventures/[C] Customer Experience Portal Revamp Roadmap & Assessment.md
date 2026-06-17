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

Use the updated architectural blueprint as the new roadmap for revamping the Benny & Penny customer experience, customer portal, checkout, address handling, fulfillment visibility, and support workflow.

This workstream is now the active focus while further LuLu submission testing is paused.

---

## Current Decision

```txt
Pause additional LuLu submit/testing work.
Do not submit sandbox or live print jobs yet.
Use the deployed LuLu submit tool only after Book 1 print setup and the customer experience plan are aligned.
Shift active focus to the customer portal / customer experience revamp.
```

LuLu status to preserve:

```txt
Phase 1 print-job queue works.
Phase 2 book print setup fields work.
Phase 3 backend foundation is deployed.
Admin-facing LuLu submit page/link is deployed.
Auto-submit remains disabled.
Sandbox submission is not yet tested.
```

---

## Blueprint Priorities Adapted to Current Site

The blueprint direction is to build a composable publishing/e-commerce system with these pillars:

```txt
Next.js on Vercel
Payload CMS v3
Neon Postgres
Stripe
Geoapify
Cloudflare R2
LuLu POD
Sequenzy / Mailjet communications
Customer portal and support workflows
```

The site already has many of these foundations. The next work should not start from scratch; it should improve the customer experience on top of the current working system.

---

## Recommended Active Build Order

### Phase A — Customer Portal IA and Visual System

Goal:

```txt
Turn the portal into a premium bookstore-style customer hub.
```

Tasks:

- Redesign portal home around clear cards: Orders, Library, Addresses, Helpdesk, Account.
- Add active route highlighting.
- Keep parent navigation links selectable.
- Use a warm bookstore visual system:
  - warm cream surfaces
  - charcoal text
  - serif heading treatment
  - readable sans-serif controls
  - 8px spacing grid
- Validate mobile first:
  - single-column layout
  - 44px+ touch targets
  - sticky key actions where useful

Status:

```txt
Queued / active next design pass
```

---

### Phase B — Address Book + Geoapify Autocomplete

Goal:

```txt
Make shipping/billing address entry clean, structured, and reusable.
```

Tasks:

- Add Geoapify autocomplete to Portal > Addresses.
- Save structured address fields to customer-addresses.
- Store Geoapify metadata fields:
  - formatted address
  - place ID
  - confidence values when available
  - confirmation timestamp
- Add default billing and default shipping flags.
- Keep frozen order snapshots unchanged when saved addresses are edited.
- Add manual confirmation when confidence is below the chosen threshold.

Status:

```txt
Geoapify dashboard visibility complete.
Vercel Geoapify values configured.
Portal address autocomplete not built yet.
```

---

### Phase C — Account Setup After Guest Checkout

Goal:

```txt
Keep guest checkout friction low while still creating a strong customer identity after purchase.
```

Current best-practice decision:

```txt
Do not force account creation before checkout.
Keep guest-friendly checkout.
Create/fetch customer by email after paid checkout.
Send setup-account email after purchase.
```

Tasks:

- After setup-account click, route customer through:
  - set password
  - confirm billing address
  - confirm shipping address if physical order exists
  - save address defaults
  - continue to portal
- For digital orders, tie access to the email/customer record and encourage portal setup for re-downloads.
- For physical orders, make setup valuable by showing order tracking and delivery status.

Status:

```txt
Backend account creation exists.
Revamped account setup confirmation flow not built yet.
```

---

### Phase D — Checkout and Cart UX Revamp

Goal:

```txt
Reduce checkout friction and improve cart clarity before Stripe redirect.
```

Tasks:

- Keep Stripe checkout for payment confirmation.
- For logged-in customers, offer saved billing/shipping address prefill before checkout.
- For physical carts, add shipping/address confirmation before payment.
- For mixed carts, collect shipping only when physical products are included.
- Add cart UX improvements:
  - book thumbnails
  - format labels
  - plus/minus quantity controls
  - easy item removal when quantity goes to zero
  - sticky mobile checkout CTA
  - clear price/discount anchoring
  - future shipping-rate estimator

Status:

```txt
Queued after portal/address foundation.
```

---

### Phase E — Unified Order Detail and Fulfillment Tracking

Goal:

```txt
Show customers what they bought, what is downloadable, what is printing, and what has shipped.
```

Tasks:

- Redesign portal order details around fulfillment sections:
  - Digital access
  - Audiobook access
  - Print fulfillment
  - Shipment/tracking
  - Support actions
- Surface print-job status once LuLu tracking is available.
- Add registered-customer order history with physical tracking cards.
- Add guest magic-link read-only order tracking later.
- Keep order access scoped to the authenticated customer or verified guest token.

Status:

```txt
Current portal has orders/library/address foundations.
Physical tracking is not yet surfaced.
Guest magic-link tracking not built yet.
```

---

### Phase F — Helpdesk / Support Ticket Revamp

Goal:

```txt
Let customers open support tickets tied to a specific order and line item.
```

Tasks:

- Add Helpdesk route in portal.
- Let customer select order and affected item(s).
- Verify the order belongs to the authenticated customer or verified guest token.
- Create/extend SupportTickets relationship structure:
  - customer
  - order
  - affected order items/products
  - status
  - threaded messages
- Add customer-facing ticket timeline.
- Add admin reply flow from Payload Admin.
- Trigger customer notification when support replies.

Status:

```txt
Support collections exist.
Customer support portal workflow not finished.
```

---

### Phase G — R2 Digital Delivery Finalization

Goal:

```txt
Make digital delivery secure, immediate, and easy to re-access.
```

Tasks:

- Confirm real private object keys for PDF, EPUB, and audiobook assets.
- Verify signed downloads from the portal.
- Keep links short-lived.
- Track download usage and limits.
- Show clear Library states:
  - Available
  - Coming soon
  - Expired/retry
  - Support needed

Status:

```txt
R2 code path exists.
Live file E2E still open.
```

---

### Phase H — LuLu Tracking and Customer Communications

Goal:

```txt
Connect physical fulfillment updates to portal and email.
```

Tasks:

- Keep manual submit/testing paused until Book 1 print setup is complete.
- Later test sandbox submit from the deployed admin page.
- Add LuLu status/tracking persistence.
- Add LuLu rejected/error admin alert.
- Add shipment/tracking email.
- Update receipt and thank-you page copy for print fulfillment timing.

Status:

```txt
LuLu submit UI deployed but further LuLu testing paused.
Status/tracking/webhook handling not built yet.
```

---

### Phase I — Privacy, Compliance, and Tax Assessment

Goal:

```txt
Make data collection, tracking, and physical/digital tax handling launch-ready.
```

Tasks:

- Review privacy policy for third-party processors:
  - Stripe
  - LuLu
  - Geoapify
  - email providers
  - Cloudflare/R2
- Add checkout/portal notice explaining address and fulfillment data usage.
- Plan cookie/analytics consent before adding marketing pixels.
- Add GPC handling if tracking/analytics are introduced.
- Reassess tax strategy before public physical-book launch.
- Decide whether Stripe tax stays off or becomes required for physical products.
- Keep attorney/CPA review as a launch blocker.

Status:

```txt
Compliance scaffolding exists.
Final legal/tax review still required.
```

---

## Current Assessment Checklist

### Customer Identity and Guest Checkout

- [x] Guest-friendly checkout direction approved.
- [x] Backend can create/fetch customer by email after purchase.
- [ ] Account setup flow confirms billing/shipping addresses.
- [ ] Digital license access is fully tied to portal/library ownership.
- [ ] Guest order tracking magic link designed and implemented.

### Address and Geoapify

- [x] Geoapify row added to Admin System Status Check.
- [x] Geoapify values configured in Vercel.
- [ ] Portal address autocomplete built.
- [ ] Geoapify parsed fields mapped into customer-addresses.
- [ ] Confidence/manual-confirmation flow designed.
- [ ] Saved default billing/shipping logic implemented.

### Portal UX

- [x] Portal base routes exist.
- [ ] Portal information architecture redesigned.
- [ ] Portal visual system aligned to bookstore/editorial theme.
- [ ] Orders page shows digital and print fulfillment segments.
- [ ] Library page supports real signed downloads and clear states.
- [ ] Addresses page supports autocomplete/defaults/confirmation.
- [ ] Helpdesk page supports contextual support tickets.

### Cart and Checkout UX

- [ ] Cart visual redesign with thumbnails, format labels, and price clarity.
- [ ] Plus/minus quantity controls.
- [ ] Sticky mobile checkout CTA.
- [ ] Logged-in address prefill before checkout.
- [ ] Physical-only shipping confirmation logic.
- [ ] Future shipping-rate estimator planned.

### Fulfillment

- [x] Print job queue works.
- [x] Book print setup fields exist.
- [x] LuLu submit backend and admin page are deployed.
- [ ] LuLu sandbox submit tested.
- [ ] LuLu status/tracking saved.
- [ ] Customer-facing physical tracking added.
- [ ] Digital R2 live-file delivery E2E completed.

### Support

- [x] Support collections exist.
- [ ] Customer support-ticket creation from portal.
- [ ] Ticket linked to customer/order/affected item.
- [ ] Customer ticket timeline.
- [ ] Admin reply notification.

### Compliance

- [ ] Privacy policy updated for Geoapify/LuLu/Stripe/R2/email providers.
- [ ] Cookie/GPC plan created before analytics pixels.
- [ ] Physical vs digital tax decision reviewed before launch.
- [ ] Business address/PO Box added before marketing emails.
- [ ] Attorney/CPA review completed before public launch.

---

## Next Recommended Build

Start with the portal/address foundation, not LuLu submission:

```txt
1. Audit current portal routes and components.
2. Redesign portal information architecture.
3. Add Geoapify autocomplete to Portal > Addresses.
4. Add address confirmation to account setup.
5. Then update checkout prefill and order tracking.
```

Do not resume LuLu sandbox submission until Book 1 print setup and portal/customer experience priorities are confirmed.
