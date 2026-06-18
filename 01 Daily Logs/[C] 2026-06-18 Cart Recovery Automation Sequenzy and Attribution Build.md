---
author: ChatGPT
type: daily
project: Benny & Penny's Adventures
date: 2026-06-18
---

# Session Log — Cart Recovery Automation, Sequenzy, Admin Reporting, and Attribution Build — 2026-06-18

## Scope Completed

Hamilton approved completion of four connected workstreams:

```txt
1. Timed abandonment automation
2. Sequenzy cart-recovery sequence
3. Abandoned Carts admin reporting improvements
4. Coupon, BPG, and gift attribution
```

## Deployment Status

Latest production deployment completed successfully:

```txt
Website commit: 14c48b1568b9014d7fc7ce54494c8cca1a8caff4
Vercel deployment: dpl_AXS9gxHhyW48w7CJcJkdpWoo2h9y
State: READY
```

An earlier build failed only because a browser URL parameter was typed as `string | null`; that was corrected before the ready deployment.

## 1. Timed Abandonment Automation

Added secure Vercel cron configuration:

```txt
vercel.json
/api/cron/cart-recovery
0 * * * *
```

Default timing behavior:

```txt
Active Cart with no activity for 4 hours
→ Abandoned

Checkout Started with no payment for 1 hour
→ Abandoned

Second reminder eligibility begins 24 hours after Reminder 1.
```

All timing is environment-configurable:

```txt
CART_ACTIVE_ABANDON_AFTER_HOURS
CART_CHECKOUT_ABANDON_AFTER_HOURS
CART_SECOND_REMINDER_AFTER_HOURS
```

## 2. Sequenzy Recovery Sequence

Added:

```txt
app/(frontend)/api/cron/cart-recovery/route.ts
lib/cartRecoveryEmail.ts
lib/cartRecoveryTokens.ts
lib/emailUnsubscribeTokens.ts
app/(frontend)/api/email/unsubscribe/route.ts
```

Sequence behavior:

```txt
Eligible consented cart becomes abandoned
→ Sequenzy subscriber is upserted with cart-abandoned + ecommerce tags
→ Reminder 1 is delivered when email sends are enabled
→ Reminder 2 is eligible after 24 hours
→ Converted/paid orders are suppressed by the existing Stripe + Neon conversion safety nets
→ One-click unsubscribe disables local marketing flags and stamps unsubscribedAt
```

Safety behavior:

```txt
No recovery email is sent until CART_RECOVERY_SEND_ENABLED=true.
No recovery email is sent without cart reminder consent.
No recovery email is sent to a subscriber with marketingOptIn=false or unsubscribedAt.
```

## 3. Recovery Link / Cart Restore

Added:

```txt
app/(frontend)/api/cart/recover/route.ts
app/components/CartRecoveryRestore.tsx
```

Recovery links are HMAC-signed and expire after 14 days. A valid click restores cart contents and the original cart token in local storage, then reactivates tracking.

## 4. Abandoned Carts Admin Reporting

Expanded `abandoned-carts` with:

```txt
Items Summary
Recovery Eligible? (Yes/No)
Recovery State
Abandoned At
First Reminder Sent At
Second Reminder Sent At
Last Reminder Sent At
Recovery Email Error
Recovered Order Number
Recovered Revenue
```

Default list columns now focus on recovery eligibility, state, cart contents, timing, and revenue.

## 5. Coupon / BPG / Gift Attribution

Added:

```txt
lib/commerceAttribution.ts
```

Webhook fulfillment now attempts to tag and attribute paid customers as:

```txt
customer
ecommerce.customer
coupon-user when discount/coupon is present
bpg-gift-code-user when BPG metadata is present
```

Cart records retain couponCode, giftCode, bpgCode, discount metadata, order number, and recovery-conversion state.

Gift sender tagging is now live in:

```txt
app/(frontend)/api/portal/gifts/route.ts
```

Gift senders are upserted to Sequenzy with:

```txt
gift-sender
```

## Neon Changes

Added columns and indexes to `public.abandoned_carts`:

```txt
items_summary
recovery_eligible
recovery_state
first_reminder_sent_at
second_reminder_sent_at
last_reminder_sent_at
recovery_email_error
recovered_order_number
recovered_revenue
```

Updated the paid-order trigger:

```txt
public.sync_abandoned_cart_conversion_from_order()
```

Paid orders now set the matching cart to converted/recovered, suppress recovery eligibility, stamp order number/revenue, and preserve the existing conversion metadata.

## Required Vercel Settings Before Email Sending

Code and scheduled route are deployed. Add these in Vercel Production environment variables before turning on actual emails:

```txt
CRON_SECRET=<long random value>
CART_RECOVERY_SEND_ENABLED=true
```

Recommended additional overrides/keys:

```txt
CART_ACTIVE_ABANDON_AFTER_HOURS=4
CART_CHECKOUT_ABANDON_AFTER_HOURS=1
CART_SECOND_REMINDER_AFTER_HOURS=24
CART_RECOVERY_TOKEN_SECRET=<long random value>
EMAIL_UNSUBSCRIBE_TOKEN_SECRET=<long random value>
```

Keep `CART_RECOVERY_SEND_ENABLED` unset or false until the final consent/recovery email test is intentionally run.

## Sequenzy Admin Action

Create this custom tag manually in Sequenzy before enabling email sends:

```txt
cart-abandoned
```

Existing tags already used by the code:

```txt
customer
coupon-user
bpg-gift-code-user
gift-sender
gift-recipient
ecommerce.in_cart
ecommerce.in_checkout
ecommerce.customer
```

## Remaining Validation

```txt
1. Add Vercel CRON_SECRET and enable CART_RECOVERY_SEND_ENABLED only when ready.
2. Create a consented test cart and allow it to pass the timing threshold.
3. Confirm Abandoned Carts shows eligible/abandoned/reminder state.
4. Confirm Sequenzy receives cart-abandoned tag.
5. Confirm Reminder 1 arrives and its link restores the cart.
6. Confirm unsubscribe prevents additional reminder delivery.
7. Confirm recovered purchase writes Recovered Order Number and Recovered Revenue.
```
