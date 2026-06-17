---
type: project-strategy
project: Benny & Penny's Adventures
status: active-next-after-r2-assets
updated_by: ChatGPT
last_updated: 2026-06-17
---

# Geoapify Address Autocomplete and Checkout Strategy

## Goal

Use Geoapify to improve address entry and address confirmation anywhere an admin or customer enters an address inside the Benny & Penny system.

This supports:

```txt
Customer portal address book
Account setup address confirmation
Admin/customer address entry
Future order support address correction
Logged-in checkout saved-address prefill
```

Guest checkout note:

```txt
Stripe already has its own guest checkout address collection.
For guest checkout, do not duplicate Stripe's address flow too early.
Focus first on confirming/capturing the Stripe-collected address after checkout.
```

---

## Current Status

```txt
Geoapify dashboard visibility is complete.
Geoapify Vercel values have been added.
Portal/account setup/admin address autocomplete is not built yet.
```

Implemented website commit:

```txt
c073738d8a74bd419ae265e12c161334740daa07
Add Geoapify to admin system status
```

What works now:

```txt
Geoapify appears in Admin Dashboard System Status Check with Hamilton's provided logo.
Vercel has the public browser key, server key, and autocomplete endpoint URL configured.
```

Do not store actual key values in this workspace.

---

## Hamilton's Latest Direction

```txt
Use Geoapify anywhere admins or customers enter addresses inside the system.
Stripe already handles guest checkout address collection.
When guest checkout is addressed, focus on confirming/capturing Stripe's guest address after payment.
```

This means the first Geoapify build should target internal/customer-controlled address forms, not Stripe's hosted guest checkout.

---

## Current Site Behavior Relevant to This

The website already has a foundation:

```txt
Stripe Checkout collects customer email and address data.
Fulfillment finds or creates a Payload customer account by email.
New customers receive a setup-account prompt.
Billing and shipping addresses are written into customer-addresses.
Orders store frozen billing and shipping snapshots.
The cart has saved-address selectors for signed-in customers.
Checkout has partial saved-address prefill for signed-in customers.
```

---

## Recommended Route

Do not force account creation before checkout.

Use this model:

```txt
Guest-friendly checkout + automatic account creation after paid checkout + address confirmation inside the portal/account setup flow.
```

Implementation order:

```txt
1. Add Geoapify metadata fields to customer-addresses.
2. Add autocomplete to Portal > Addresses.
3. Add autocomplete/confirmation to account setup.
4. Add autocomplete to admin/customer address entry points.
5. Harden logged-in checkout saved-address prefill.
6. Later revisit guest checkout address capture/confirmation after payment.
```

---

## Data Model Direction

Customer-addresses should support:

```txt
addressType
fullName
company
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
geoapifyConfidenceStreetLevel
geoapifyConfidenceCityLevel
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

### Phase B — Schema support

Add Geoapify metadata fields to customer-addresses and verify Neon after deployment.

### Phase C — Portal address autocomplete

Build reusable component:

```txt
AddressAutocompleteField
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
confidence/metadata
```

### Phase D — Account setup confirmation

After purchase, when the customer sets up the account:

```txt
Set password
Confirm billing address
Confirm shipping address if physical order exists
Save defaults
Continue to portal
```

### Phase E — Admin/customer address entry

Use the same autocomplete logic wherever admins or customers create/edit addresses inside the system.

### Phase F — Checkout prefill hardening

For logged-in customers:

```txt
Show saved billing/shipping addresses.
Let customer choose or edit.
Send selected address IDs to checkout.
Still rely on Stripe Checkout for payment and final confirmation.
```

### Phase G — Guest checkout capture later

For guest checkout:

```txt
Let Stripe collect address.
After checkout, confirm/capture the Stripe address into order snapshot and customer-addresses.
Prompt account setup after purchase.
```

---

## Guardrails

- Use Vercel environment settings for service configuration.
- Do not place actual service values in code or workspace docs.
- If a browser-facing value is used, restrict it by allowed domain/referrer in Geoapify if available.
- Validate and normalize address data server-side before saving.
- Keep order address snapshots frozen.
- Do not block checkout if account setup email fails.
- Do not require account creation before purchase unless Hamilton explicitly changes conversion strategy.

---

## Recommended Next Action

```txt
After product assets and R2 digital delivery setup begin, add Geoapify metadata fields and autocomplete to Portal > Addresses, then expand to account setup and admin/customer address entry points.
```
