---
author: ChatGPT
type: daily
project: Benny & Penny's Adventures
date: 2026-06-18
---

# Session Log — Cart Recovery Operations Controls and Attribution Reporting — 2026-06-18

## Scope Requested

Hamilton approved completion of four operational follow-ups:

```txt
1. Manual no-email recovery testing
2. Recovery dashboard filters and summaries
3. Controlled reminder testing path
4. Campaign and revenue attribution reporting
```

## Production Deployment

Latest production deployment:

```txt
Deployment: dpl_5RmzoMW9PFw191o1G7qej448z1Y6
Commit: 65a458602616bc5364bd34d25a25caa5c2ffffa7
State: READY
```

The build passed after correcting a Next.js lint issue in the cart recovery detail controls.

## 1. Manual No-Email Recovery Testing

Added protected admin endpoint:

```txt
/api/admin/cart-recovery
```

Authorization:

```txt
Payload-authenticated admin only
```

Email-safe actions:

```txt
sweep
→ finds overdue Active Cart and Checkout Started records
→ updates qualifying records to Abandoned
→ computes recovery eligibility
→ syncs approved Sequenzy tags
→ does not send a recovery email

dry-run-cart
→ runs the same logic for one selected cart immediately
→ does not send a recovery email
```

The existing Vercel setting remains:

```txt
CART_RECOVERY_SEND_ENABLED=false
```

## 2. Recovery Dashboard / Worklists

The operational UI is now mounted directly at the top of each:

```txt
Admin → Abandoned Carts → individual cart record
```

It provides:

```txt
Run email-safe test
Send controlled reminder
Eligible worklist link
Current recovery mode (safe dry run vs email delivery)
Compact totals for abandoned, eligible, reminders, recovered revenue,
coupon activity, BPG activity, gift totals, and suppressed contacts
```

The Abandoned Carts collection already has filterable fields:

```txt
Recovery Eligible?
Recovery State
Coupon Code
Gift Code
BPG Code
Abandoned At
Reminder timestamps
Recovered Order Number
Recovered Revenue
```

## 3. Controlled Reminder Path

The record-level control can request a single Reminder 1 only when:

```txt
CART_RECOVERY_SEND_ENABLED=true
```

While the switch is false, the server rejects the send request. This preserves a safe dry-run while allowing the team to confirm the manual recovery workflow first.

## 4. Coupon, BPG, and Gift Reporting

Updated paid-order attribution code to persist:

```txt
Coupon code
Gift code
BPG code
Recovered-cart flag
Source cart relationship
```

Sequenzy attribution continues to use:

```txt
customer
ecommerce.customer
coupon-user
bpg-gift-code-user
gift-sender
gift-recipient
```

## Neon Schema Verification

Read-only inspection of the main Neon branch found that the new order-attribution columns are not yet present in `public.orders`.

The code is deployed, but a safe schema migration is still required before paid orders can persist the newly added order-level coupon, BPG, gift, recovered-cart, and source-cart fields.

This must be applied using a reviewed migration workflow before claiming order-level attribution reporting is complete.

## Next Validation Sequence

```txt
1. Approve and apply the safe Neon schema migration for order attribution fields.
2. Open a fresh non-converted consented cart record in Admin.
3. Use Run email-safe test.
4. Verify Abandoned / Recovery Eligible? / Recovery State in the record.
5. Confirm Sequenzy gets cart-abandoned.
6. Keep CART_RECOVERY_SEND_ENABLED=false through this dry-run.
7. Later enable true for one controlled reminder, recovery-link, and unsubscribe test.
```
