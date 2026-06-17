---
type: project-strategy
project: Benny & Penny's Adventures
status: queued
updated_by: ChatGPT
last_updated: 2026-06-17
---

# Geoapify Address Autocomplete and Checkout Strategy

## Goal

Plan the next customer-experience improvement around address autocomplete, saved customer addresses, guest checkout, and account setup after purchase.

This workstream is queued behind the immediate LuLu POD Phase 3 manual submission work.

---

## Current Status

```txt
Phase A admin visibility is complete.
Geoapify Vercel values have been added.
Portal/account setup/checkout address autocomplete is not built yet.
```

Implemented website commit:

```txt
c073738d8a74bd419ae265e12c161334740daa07
Add Geoapify to admin system status
```

What works now:

```txt
Geoapify appears in Admin Dashboard System Status Check with Hamilton's provided logo.
The Vercel environment now has the public browser key, server key, and autocomplete endpoint URL configured.
```

---

## Vercel Environment Status

Hamilton confirmed the following Geoapify values were added in Vercel:

```txt
Public browser key
Server-side key
Autocomplete endpoint URL
```

Purpose:

```txt
Public browser key: future customer-facing autocomplete component.
Server-side key: future server-side ping, validation, and address normalization.
Autocomplete endpoint URL: endpoint for future dashboard health check and autocomplete requests.
```

Do not store the actual values in this workspace.

---

## User Direction

Hamilton wants to use Geoapify address autocomplete so customers can select structured addresses for shipping and billing.

Key intent:

```txt
When the customer experience is revamped, customers should be able to autofill shipping and billing addresses.
Shipping and billing should be confirmed when they first login.
If they purchase as a guest, they should still receive an email to create/set up their account.
Need a best-practice decision for guest checkout vs account-required checkout for physical and digital products.
```

Geoapify resource links provided by Hamilton:

```txt
React package:
https://github.com/geoapify/react-geocoder-autocomplete

API documentation:
https://apidocs.geoapify.com/

Dashboard logo:
https://cdn.brandfetch.io/idlDc2LPA8/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1780788948277
```

---

## Current Site Behavior Relevant to This

The website already has a strong foundation:

```txt
Stripe Checkout collects customer email and address data.
Fulfillment finds or creates a Payload customer account by email.
New customers receive a set-password/setup-account email.
Billing and shipping addresses are written into customer-addresses.
Orders store frozen billing and shipping snapshots.
```

This means guest checkout can remain lightweight while the backend still creates a customer profile and future portal access.

---

## Recommended Best-Practice Route

Do not force a full account before checkout.

Use this model instead:

```txt
Guest-friendly checkout + automatic account creation after paid checkout.
```

### Physical products: paperback / hardcover

Best route:

```txt
Guest checkout allowed.
Address required.
Stripe/Geoapify address snapshot saved to order and customer-addresses.
Send setup-account email after checkout.
Customer can later log in to see order, shipping status, tracking, and saved addresses.
```

Why:

- Physical buyers expect fast checkout.
- Requiring account creation before payment can reduce conversion.
- Shipping address is required no matter what.
- Portal can improve after purchase without blocking the sale.

### Digital / audiobook products

Best route:

```txt
Guest checkout allowed, but backend must create or find a customer account by email.
Send receipt and setup-account email.
Allow immediate email-based download access if available.
Also encourage account setup for future re-downloads/library access.
```

Important rule:

```txt
Digital access must be tied to a customer email/account identity even if the checkout felt like guest checkout.
```

Why:

- The customer should not be forced into account creation before payment.
- Digital licenses need ownership records for downloads, limits, library access, and support.
- The current backend already supports account creation after purchase.

### Mixed carts

Best route:

```txt
Allow checkout.
Collect/confirm shipping only if cart includes physical products.
Create account after purchase.
Create digital download records for digital/audiobook items.
Create print jobs for paperback/hardcover items.
Send one setup-account email and one receipt.
```

---

## Geoapify Implementation Recommendation

Use Geoapify in customer-controlled address forms, not as the only source of truth.

Recommended places to implement:

```txt
1. Customer portal address book
2. Registration/account setup flow
3. Checkout prefill flow before redirecting to Stripe
4. Admin dashboard system status check — complete
```

Do not replace Stripe's required checkout address collection until the checkout UX is intentionally redesigned.

The safer early implementation is:

```txt
Portal address book + account setup address confirmation first.
Checkout prefill later.
```

---

## Proposed Data Model Direction

Extend or confirm `customer-addresses` supports:

```txt
addressType: billing | shipping
fullName
street1
street2
city
state
postalCode
country
phone
isDefaultBilling
isDefaultShipping
lastUsedAt
geoapifyPlaceId
geoapifyFormattedAddress
geoapifyConfidence
addressConfirmedAt
```

Keep frozen order snapshots on `orders` even when customer addresses are later edited.

---

## Implementation Phases

### Phase A — Admin visibility

Status:

```txt
Complete
```

Geoapify is visible in Admin Dashboard System Status Check.

### Phase B — Portal address autocomplete

Build reusable component:

```txt
AddressAutocompleteField
```

Use official package:

```txt
@geoapify/geocoder-autocomplete
@geoapify/react-geocoder-autocomplete
```

Extract and save structured fields:

```txt
street1
street2
city
state
postalCode
country
formatted address
place ID
confidence/metadata if available
```

### Phase C — Account setup confirmation

After purchase, when the customer clicks setup-account email:

```txt
Set password
Confirm billing address
Confirm shipping address if physical order exists
Save defaults
Continue to portal
```

### Phase D — Checkout prefill

For logged-in customers:

```txt
Show saved billing/shipping addresses.
Let customer choose or edit.
Send selected address IDs to checkout session metadata.
Still rely on Stripe Checkout for payment and final customer confirmation unless checkout is fully rebuilt.
```

### Phase E — Customer experience revamp

Use saved addresses and print-job tracking to revamp:

```txt
Portal order details
Thank-you page
Receipt email
Physical shipment/tracking email
Address management
```

---

## Guardrails

- Use Vercel environment settings for service configuration.
- Do not place actual service values in code or workspace docs.
- If a browser-facing value is used, restrict it by allowed domain/referrer in Geoapify if available.
- Validate and normalize address data server-side before saving.
- Keep order address snapshots frozen.
- Do not block checkout if account setup email fails.
- Do not require account creation before purchase unless Hamilton explicitly decides to change conversion strategy.

---

## Recommended Next Action

Keep the immediate active work as:

```txt
LuLu POD Phase 3 — admin-facing manual Submit to LuLu button/tool page
```

Next Geoapify build after LuLu submit UI:

```txt
Portal address autocomplete and account setup address confirmation.
```
