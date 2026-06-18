---
type: project-strategy
project: Benny & Penny's Adventures
status: confirmed-working
updated_by: ChatGPT
last_updated: 2026-06-17
supersedes: "[C] Geoapify Address Autocomplete and Checkout Strategy.md"
---

# Google Places Address Autocomplete and Checkout Strategy

## Goal

Use **Google Places API (New)** to improve address entry and address confirmation anywhere an admin or customer enters an address inside the Benny & Penny system.

This supports:

```txt
Customer portal address book
Admin customer-address entry
Account setup address confirmation
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
Geoapify has been fully removed.
Google Places API (New) is the active provider.
Customer portal autocomplete is confirmed working.
Admin autocomplete is confirmed working.
```

What is built and confirmed:

```txt
Portal: app/components/AddressAutocomplete.tsx
Admin: app/(payload)/components/AdminAddressField.tsx
Admin registration: app/(payload)/admin/importMap.ts
Collection hook: CustomerAddresses.street1 admin.components field
Admin dashboard tile: "Google Places API"
Retired routes: /api/geo/autocomplete and /api/geo/place are no-op stubs
```

Why it is client-side:

```txt
The Google key is HTTP-referrer restricted, so server-side proxy calls are rejected.
Use the browser-readable NEXT_PUBLIC_GOOGLE_PLACES_API_KEY variable.
```

Do not store actual key values in this workspace.

---

## Required Google / Vercel Configuration

This has been configured enough for the feature to be confirmed working in both customer and admin flows.

Reference configuration:

```txt
Vercel variable: NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
Google Cloud: billing enabled + Places API (New) enabled
Referrer allowlist includes the active site/admin origins
```

If the feature breaks later, re-check:

```txt
https://bennyandpennyadventures.com/*
https://www.bennyandpennyadventures.com/*
http://localhost:3000/*
```

After changing Vercel env values, redeploy. Next.js bakes `NEXT_PUBLIC_*` variables into the client build.

---

## Troubleshooting Checklist

Use this only if autocomplete regresses:

1. Confirm `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` exists in Vercel.
2. Confirm Google Cloud has billing + Places API (New) enabled.
3. Confirm key referrers include the active production domain(s) and localhost.
4. Redeploy the site after env changes.
5. Test `/portal/addresses` autocomplete in the browser.
6. Test Payload admin CustomerAddresses.street1 autocomplete in the browser.
7. Use DevTools Network tab:

```txt
No request = env var missing from client build or component not firing.
403 = key/referrer/API restriction problem.
Successful request = autocomplete should show suggestions.
```

---

## Data Model Direction

Customer-addresses should support address confirmation and provider metadata.

Recommended/current field direction:

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
googlePlaceId
googleFormattedAddress
googleAddressComponents
googleAutocompleteSource
addressConfirmedAt
```

If old Geoapify metadata fields exist, treat them as legacy unless Hamilton asks for a migration cleanup.

Keep frozen order snapshots on `orders` even when customer addresses are later edited.

---

## Implementation Phases

### Phase A — Provider switch

Status:

```txt
Complete in code.
```

Geoapify was removed and Google Places API (New) replaced it.

### Phase B — Portal address autocomplete

Status:

```txt
Built and confirmed working.
```

The customer portal address book uses `AddressAutocomplete`.

### Phase C — Admin address autocomplete

Status:

```txt
Built and confirmed working.
```

Admin uses `AdminAddressField` on `CustomerAddresses.street1` and fills city/state/postal/country via Payload form dispatch.

Rollback:

```txt
Remove the admin.components block on CustomerAddresses.street1.
Remove the AdminAddressField importMap line.
```

### Phase D — Account setup confirmation

Later, after purchase when the customer sets up the account:

```txt
Set password
Confirm billing address
Confirm shipping address if physical order exists
Save defaults
Continue to portal
```

### Phase E — Checkout prefill hardening

For logged-in customers:

```txt
Show saved billing/shipping addresses.
Let customer choose or edit.
Prefill Stripe Checkout name/address where safely supported.
Still rely on Stripe Checkout for payment and final confirmation.
```

### Phase F — Guest checkout capture later

For guest checkout:

```txt
Let Stripe collect address.
After checkout, confirm/capture the Stripe address into order snapshot and customer-addresses.
Prompt account setup after purchase.
```

---

## Stripe Name Guard Related Note

Because Stripe Checkout's name field is free text, customers can accidentally type an address into the name field.

Current guard:

```txt
lib/stripeFulfillment.ts flags digit-containing names with a "⚠ REVIEW" order note.
When a linked account name is available, it uses that account name as fallback for customer/billing name.
Original Stripe values are preserved.
```

Open cleanup:

```txt
Fix existing order 26-0029 manually.
Consider logged-in Stripe Checkout name/address prefill to prevent recurrence.
```

---

## Guardrails

- Use Vercel environment settings for service configuration.
- Do not place actual service values in code or workspace docs.
- Use `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` for browser-side autocomplete.
- Restrict the browser key by HTTP referrer.
- Validate and normalize address data server-side before saving.
- Keep order address snapshots frozen.
- Do not block checkout if account setup email fails.
- Do not require account creation before purchase unless Hamilton explicitly changes conversion strategy.
- Do not reintroduce Geoapify unless Hamilton explicitly reverses the decision.

---

## Recommended Next Action

```txt
Move on from Google Places verification. Fix existing order 26-0029, then decide whether to add logged-in Stripe Checkout name/address prefill to prevent future name-field mistakes.
```
