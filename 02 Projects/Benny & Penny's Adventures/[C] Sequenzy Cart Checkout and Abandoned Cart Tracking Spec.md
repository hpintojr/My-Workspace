---
type: implementation-spec
project: Benny & Penny's Adventures
status: proposed
updated_by: ChatGPT
last_updated: 2026-06-17
---

# Sequenzy Cart, Checkout, Coupon, Gift Code, and Abandoned Cart Tracking Spec

## Purpose

Build a real cart/checkout marketing-event layer for Benny & Penny's Adventures so Payload, Sequenzy, and the admin dashboard can track customer intent before purchase.

This supports:

```txt
Sequenzy built-in E-Commerce tags/events
Abandoned cart follow-up
Abandoned checkout follow-up
Coupon/gift-code attribution
BPG campaign tracking
Admin Abandoned Carts view
Pre-launch sandbox testing before Neon wipe/live launch
```

## Current State

Already done:

```txt
Paid order completion syncs subscribers to Sequenzy with custom customer tag.
lib/email.ts now appends ecommerce.customer automatically whenever customer is sent.
Gift redemption with marketing consent syncs gift-recipient to Sequenzy.
Google Places works for customer/admin address entry.
Checkout saved-address prefill and fulfillment name guard are implemented.
Email DNS authentication is verified.
```

Important current code facts:

```txt
Cart state currently lives in browser localStorage under bp_cart.
Cart changes update local browser state and dispatch bp-cart-updated.
Cart checkout posts to /api/checkout.
Admin sidebar already has Abandoned Carts as a disabled Coming Soon item.
```

## Sequenzy Tag Mapping

### Built-in Sequenzy tags to use

```txt
ecommerce.in_cart       customer has cart intent
ecommerce.in_checkout   customer started checkout / Stripe session was created
ecommerce.customer      customer completed paid order
```

### Custom Benny & Penny tags to use

```txt
customer                existing custom buyer tag; keep for continuity
gift-recipient          gift code recipient who opts in
gift-sender             person who sends gifts
coupon-user             person who uses a coupon/discount
bpg-gift-code-user      person tied to BPG gift-code/campaign logic
```

## Key Architecture Decision

Do not rely only on browser localStorage or Sequenzy tags for abandoned-cart state.

Create a Payload-backed cart-event / abandoned-cart layer because:

```txt
LocalStorage disappears across devices/browsers.
Sequenzy alone is not the source of truth for admin operations.
The admin needs a view tied to cart contents, email, status, timestamps, and recovery state.
Stripe checkout completion needs to mark carts converted.
Neon sandbox wipe can reset all app-side test cart data before launch.
```

## Recommended Data Model

Create a new Payload collection:

```txt
cart-events or abandoned-carts
```

Recommended collection name:

```txt
abandoned-carts
```

Fields:

```txt
email                         email, optional until known
customer                      relationship -> users, optional
subscriber                    relationship -> subscribers, optional
status                        select: active-cart, checkout-started, converted, abandoned, recovered, dismissed
cartToken                     text, unique, client-generated anonymous cart id
items                         array/json: slug, title, format, qty, unitPrice, coverImage
itemCount                     number
subtotal                      number
requiresShipping              checkbox
couponCode                    text, optional
giftCode                      text, optional
bpgCode                       text, optional
stripeCheckoutSessionId       text, optional
stripeCustomerId              text, optional
firstSeenAt                   date
lastActivityAt                date
checkoutStartedAt             date
convertedAt                   date
abandonedAt                   date
recoveredAt                   date
lastSequenzySyncAt            date
sequenzyTags                  text/array, optional
source                        text, e.g. cart, checkout, gift, coupon
metadata                      json
adminNotes                    textarea
```

Useful admin columns:

```txt
email
status
itemCount
subtotal
lastActivityAt
checkoutStartedAt
convertedAt
```

## API Endpoints

### 1. Track cart intent

```txt
POST /api/cart/events
```

Payload:

```json
{
  "event": "cart-updated",
  "cartToken": "client-generated-id",
  "email": "optional@example.com",
  "items": [],
  "couponCode": "optional",
  "giftCode": "optional",
  "bpgCode": "optional"
}
```

Behavior:

```txt
Create/update abandoned-carts record by cartToken.
Status = active-cart unless already checkout-started or converted.
Update items, itemCount, subtotal, lastActivityAt.
If email is available and marketing consent exists, sync Sequenzy with ecommerce.in_cart.
```

### 2. Mark checkout started

Can happen inside existing:

```txt
POST /api/checkout
```

Behavior when Stripe session is successfully created:

```txt
Find cart by cartToken or signed-in customer/email.
Set status = checkout-started.
Set checkoutStartedAt.
Save stripeCheckoutSessionId.
Sync Sequenzy with ecommerce.in_checkout.
```

### 3. Mark conversion

Can happen inside existing Stripe fulfillment flow:

```txt
lib/stripeFulfillment.ts
```

Behavior after paid order is created:

```txt
Find abandoned-cart by stripeCheckoutSessionId or metadata cartToken.
Set status = converted.
Set convertedAt.
Keep ecommerce.customer/customer tags.
Optionally remove or override abandoned status later through Sequenzy workflow rules.
```

### 4. Abandonment detection

Option A: On-demand admin query:

```txt
Treat active-cart older than 2-4 hours as abandoned.
Treat checkout-started older than 1-2 hours without conversion as abandoned checkout.
```

Option B: Scheduled job / cron later:

```txt
Run hourly/daily.
Mark old active carts as abandoned.
Mark old checkout-started records as abandoned.
Trigger Sequenzy recovery sequences.
```

Recommended for first build:

```txt
Use on-demand status logic first. Add cron later.
```

## Frontend Changes

### CartProvider

Current cart is localStorage only. Add:

```txt
cartToken creation and persistence in localStorage.
Debounced cart event sync to /api/cart/events when cart changes.
Do not block cart UX if tracking fails.
```

Suggested localStorage keys:

```txt
bp_cart
bp_cart_token
```

### CartPageClient

Add:

```txt
cartToken included in /api/checkout request.
Optional email capture before checkout for guest abandoned-cart recovery.
Optional consent checkbox if collecting email before checkout.
```

Keep it light in first build. Do not overcomplicate conversion flow.

## Checkout Changes

Update `/api/checkout` request body to accept:

```txt
cartToken
couponCode later
bpgCode later
```

Add cartToken to Stripe metadata:

```txt
metadata.cartToken
metadata.customerUserId
metadata.shippingAddressId
metadata.billingAddressId
metadata.couponCode
metadata.bpgCode
```

After Stripe session creation:

```txt
Update abandoned-carts record with stripeCheckoutSessionId.
Sync ecommerce.in_checkout if email is available.
```

## Sequenzy Sync Rules

### Paid buyer

Already updated:

```txt
customer -> automatically also sends ecommerce.customer
```

### Cart intent

Only if email is known and consent rules allow:

```txt
ecommerce.in_cart
```

### Checkout intent

Only if email is known:

```txt
ecommerce.in_checkout
```

### Gift/coupon/BPG later

```txt
gift-sender
gift-recipient
coupon-user
bpg-gift-code-user
```

## Admin Dashboard / Sidebar

Current admin sidebar shows Abandoned Carts as disabled Coming Soon.

Phase 1 admin implementation:

```txt
Create abandoned-carts Payload collection.
Replace disabled sidebar item with link to /admin/collections/abandoned-carts.
Use default Payload collection view first.
```

Phase 2 admin implementation:

```txt
Custom dashboard tiles:
- Active carts
- Checkout started
- Abandoned carts
- Recovered carts
- Potential revenue
```

Phase 3 admin implementation:

```txt
Custom recovery actions:
- Mark dismissed
- Send recovery email
- Copy cart details
- Link to subscriber/customer/order
```

## Coupon and Gift Code Tracking

Do not force this into abandoned-cart v1 unless the coupon/BPG logic is ready.

When coupon/BPG tracking is built:

```txt
Promotions collection should define coupon/BPG code rules.
Cart and checkout should store applied code.
Abandoned-carts should store couponCode, giftCode, or bpgCode.
Stripe metadata should include applied code.
Fulfillment should mark coupon/BPG code usage and sync coupon-user or bpg-gift-code-user.
```

## Estimated Time

### Phase 0 — Already done

```txt
Append ecommerce.customer when customer tag is sent.
```

Status:

```txt
Done.
```

### Phase 1 — Minimal backend cart tracking + admin collection

Scope:

```txt
Create abandoned-carts collection.
Create /api/cart/events.
Add cartToken to CartProvider/localStorage.
Track cart-updated events.
Link admin sidebar to collection.
```

Estimate:

```txt
4-6 hours
```

### Phase 2 — Checkout-started and conversion tracking

Scope:

```txt
Pass cartToken to /api/checkout.
Add cartToken to Stripe metadata.
Mark abandoned-cart checkout-started when Stripe session is created.
Mark converted in stripeFulfillment when order completes.
Sync ecommerce.in_checkout when email exists.
```

Estimate:

```txt
3-5 hours
```

### Phase 3 — Guest email capture for abandoned cart recovery

Scope:

```txt
Add lightweight email capture on cart page.
Consent checkbox if needed.
Sync ecommerce.in_cart when email known.
Create/update Payload subscriber.
```

Estimate:

```txt
3-5 hours
```

### Phase 4 — Admin polish and status automation

Scope:

```txt
Better admin columns/statuses.
Computed abandoned logic.
Optional dashboard cards.
Manual dismiss/recover fields.
```

Estimate:

```txt
4-8 hours
```

### Phase 5 — Coupon/BPG integration

Scope:

```txt
Applied coupon/BPG code tracking.
Sequenzy tags coupon-user and bpg-gift-code-user.
Connect promotions/gifts logic.
Terms/analytics implications.
```

Estimate:

```txt
4-8 hours, depending on how final coupon/BPG logic is defined.
```

## Total Estimated Time

### Practical MVP

```txt
Phase 1 + Phase 2 = 7-11 hours
```

This gives:

```txt
Payload abandoned-carts collection
CartToken tracking
Checkout-started tracking
Converted tracking
Admin view
Sequenzy ecommerce.in_checkout/ecommerce.customer where applicable
```

### Strong v1 with email capture

```txt
Phase 1 + Phase 2 + Phase 3 = 10-16 hours
```

This gives real abandoned-cart recovery potential because guest email is captured before checkout.

### Full marketing-ready v1

```txt
Phase 1 + Phase 2 + Phase 3 + Phase 4 = 14-24 hours
```

### Full with coupon/BPG tracking

```txt
18-32 hours
```

## Recommendation

Build this in order:

```txt
1. Phase 1: Payload abandoned-carts collection + cart event endpoint + admin sidebar link.
2. Phase 2: checkout-started and converted tracking.
3. Test in sandbox with real Sequenzy tags and Stripe sandbox orders.
4. Phase 3: guest email capture only if Hamilton wants true abandoned-cart recovery before launch.
5. Coupon/BPG integration after gift/coupon business rules are finalized.
```

Because the business is still sandbox and Neon will be wiped before launch, this is a good time to build and test the full event flow. Remember: Neon wipe will not wipe Sequenzy test contacts/events, so Sequenzy cleanup remains a separate pre-launch checklist item.
