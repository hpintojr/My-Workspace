---
author: ChatGPT
type: daily
project: Benny & Penny's Adventures
date: 2026-06-17
---

# Session Log — Sandbox Data Wipe and Sequenzy Tag Strategy — 2026-06-17

## Context

Hamilton clarified that Benny & Penny is still in sandbox/business setup mode. When he gives the green light for live launch, the plan is to wipe all data in the Neon database.

## Important Distinction

Wiping Neon will reset Payload/application data, but it will not automatically reset outside services.

Neon/Payload wipe can clear:

```txt
Users
Customers
Orders
Order items
Downloads
Gifts
Customer addresses
Support tickets/messages
Subscribers collection inside Payload
Print jobs
Test cart/order/customer records stored in the app DB
```

Neon wipe will not clear:

```txt
Sequenzy contacts, tags, events, sent email history, or analytics
Stripe sandbox objects/sessions/customers
Cloudflare R2 files/objects
Vercel environment variables/deployments/settings
Google Places configuration
LuLu sandbox account/project data
```

## Sequenzy Tag Strategy During Sandbox

Because this is sandbox, it is okay to wire and test marketing tags/events now. The goal is to confirm the full lifecycle before public launch.

Current observed Sequenzy built-in tags/categories:

```txt
E-Commerce:
- ecommerce.in_cart
- ecommerce.in_checkout
- ecommerce.customer

Status:
- lead
- customer
- cancelled
- churned
- refunded
- past-due
- visited-payment-page
- trial

Engagement:
- active
- inactive

Subscription:
- saas.monthly
- saas.yearly
```

Current website code behavior:

```txt
Paid Stripe order -> upsertSubscriber tags: ["customer"]
Gift redeem with consent -> upsertSubscriber tags: ["gift-recipient"]
Add to cart -> no backend/Sequenzy event yet
Start checkout -> no explicit Sequenzy tag yet unless Sequenzy tracking handles it separately
```

Recommended near-term code direction:

```txt
Paid order complete -> send both custom customer and built-in ecommerce.customer.
Gift recipient consent -> send gift-recipient.
Gift sender flow -> later send gift-sender.
Coupon used -> later send coupon-user.
BPG gift/coupon campaign -> later send bpg-gift-code-user.
Add to cart / checkout -> build later as real abandoned-cart tracking, not just loose tags.
```

## Launch Cleanup Checklist

Before going live:

```txt
1. Wipe/reset Neon/Payload sandbox data.
2. Decide whether to delete or suppress sandbox contacts in Sequenzy.
3. Remove or archive any test-only Sequenzy subscribers/tags/segments if needed.
4. Switch Stripe from sandbox/test mode to live readiness only when approved.
5. Ensure R2 has real files, not dummy/zero-byte files.
6. Verify email DNS remains verified and inbox placement works with real sends.
7. Verify Terms/Privacy match gifts, downloads, email, Stripe, LuLu, R2, Google Places, and marketing tracking.
```

## Decision

The sandbox wipe plan means we can safely build and test the Sequenzy/Payload/checkout event flow now, but we must remember that Neon cleanup does not clean Sequenzy. Sequenzy cleanup should be a separate pre-launch checklist item.
