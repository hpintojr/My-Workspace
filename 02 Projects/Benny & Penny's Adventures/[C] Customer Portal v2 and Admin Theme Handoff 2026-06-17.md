---
type: project-handoff
project: Benny & Penny's Adventures
status: shipped-approved
updated_by: Claude (Cowork) + ChatGPT cleanup
last_updated: 2026-06-17
supersedes_ux_of: "[C] Customer Experience Portal Revamp Roadmap & Assessment.md (Phase C portal UX)"
---

# Customer Portal v2 + Admin Theme — Build Handoff (2026-06-17)

## Summary

The customer portal was rebuilt from a marketing-style card page into a real signed-in app, and the Payload admin sidebar was restructured to match it. Hamilton reviewed both live and **approved** ("happy with all the dashboard and customer portal"). Work was done directly in the website repo on `main` and deployed via Vercel.

Repo: `hpintojr/bennyandpennyadventures`  
Stack: Next.js 15.4.11 + React 19 + Payload CMS (Postgres) + Cloudflare R2 + Stripe.

Post-handoff update: later on 2026-06-17, gifting fixes shipped and address autocomplete switched from Geoapify to Google Places API (New). See `01 Daily Logs/[C] 2026-06-17 Google Places and Stripe Name Guard.md` and `[C] Google Places Address Autocomplete and Checkout Strategy.md` for the latest address-autocomplete source of truth.

---

## What shipped (all live + approved)

### 1. Portal app shell + persistent navigation
- New `PortalShell` (client) provides a persistent left sidebar on desktop, scrollable tab nav on mobile, a signed-in identity card, single logout, and auth gating. New `portal/layout.tsx` wraps every portal page in `SiteShell` + `PortalShell` ONCE.
- Sections: Dashboard, My Library, My Orders, Gifting, Addresses, Account, Help.
- The old per-page marketing hero + `PortalSessionBar` pattern is gone. Each portal page now renders only its content + a shared `PortalPageHeader`.

### 2. Dashboard (`/portal`)
- `PortalDashboardClient` + new aggregate API `/api/portal/overview`.
- Greeting, at-a-glance tiles (books owned, orders, active gifts, in transit), "Ready to read" one-tap downloads, recent orders with fulfillment status, and a reading-slots meter (3-slot shared readable license) with per-book breakdown + "Gift a book".

### 3. Shipment / fulfillment tracking (`/portal/orders`)
- `/api/portal/orders` now joins `print-jobs` and returns per-order shipments.
- `PortalOrdersClient` shows a Submitted → In production → Shipped → Delivered timeline per print item with the LuLu tracking link; digital orders point to the Library.

### 4. Library (`/portal/library`)
- Per-book reading-slot meter (PDF/EPUB/gifts share the pool).
- **Self-heal:** if a digital purchase is missing its EPUB (or PDF) download record, the library route creates the sibling on load by mirroring the existing R2 key (extension swapped) or the book's configured object key. This fixed older orders that only had a PDF button. Idempotent.

### 5. Account (`/portal/account`)
- `/api/portal/account` (GET/PATCH). Profile (name, phone), SMS opt-in, password reset/setup link (via `/api/auth/forgot-password`), privacy links. Email is read-only.

### 6. Help (`/portal/help`)
- `/api/portal/support` (GET tickets / POST new). Support ticket form wired to the `support-tickets` collection, plus the customer's past requests and quick answers.

### 7. Branded printable invoice
- Standalone route `/invoice/[orderId]` + `InvoiceClient` (outside the portal shell for a clean print canvas). "Print invoice / Save PDF" button on each order. Branded header, bill-to/ship-to, line items, totals, print CSS.
- **Business address lives ONLY on the invoice** (per Hamilton): `231 E Alessandro Blvd, Ste A-208, Riverside, CA 92508, United States`.

### 8. Gift redeem success UX
- `GiftRedeemClient` now reads the API `createdAccount` flag and shows a clear congratulations ("your account is set up — please log in") + which email to sign in with + login CTA, instead of dropping the recipient on an unexplained sign-in page.

### 9. Admin sidebar restructure (Payload admin)
- Added `AdminSidebarIdentity` (identity card) and portal-style icon-tile rows with compact single-line links, via `admin-portal-theme.scss` (imported last) + `AdminBeforeNavLinks`.
- **Teal/mint admin theme was kept.** Hamilton rejected a cream palette. `admin-portal-theme.scss` now contains ONLY sidebar structure tinted teal/mint — no palette/background overrides.

---

## Bug fixes made this session
- **es5 build error:** `tsconfig` target is `es5` — iterating a `Map`/`Set` with `for…of` fails ("downlevelIteration"). Use `Array.from(map.values())`.
- **Login loop:** the portal layout persists across client nav, so `PortalShell` kept a stale signed-out state after `router.push`. Fixed by re-validating the session on every route change (`useEffect` deps include `pathname`) AND changing login to a full reload (`window.location.assign("/portal")`).
- **Portal too wide / horizontal overflow:** CSS-grid tracks default to `min-width:auto`; long 4-item order summaries forced the page wider. Fixed with `min-w-0` on the dashboard grid columns so text truncates.

---

## File map

New files:
```txt
lib/portalData.ts                                  (shared portal helpers: auth, order where, readable pool, shipments)
app/components/PortalShell.tsx                      (app shell + nav + auth gate)
app/components/PortalPageHeader.tsx
app/components/PortalSlotMeter.tsx
app/components/PortalDashboardClient.tsx
app/components/PortalAccountClient.tsx
app/components/PortalHelpClient.tsx
app/components/InvoiceClient.tsx
app/(frontend)/portal/layout.tsx
app/(frontend)/portal/account/page.tsx
app/(frontend)/portal/help/page.tsx
app/(frontend)/api/portal/overview/route.ts
app/(frontend)/api/portal/account/route.ts
app/(frontend)/api/portal/support/route.ts
app/(frontend)/invoice/[orderId]/page.tsx
app/(payload)/admin-portal-theme.scss              (admin sidebar structure only; teal theme kept)
app/(payload)/components/AdminSidebarIdentity.tsx
```

Modified files:
```txt
app/(frontend)/portal/page.tsx                      (now the dashboard)
app/(frontend)/portal/library/page.tsx             (shell header; content only)
app/(frontend)/portal/orders/page.tsx              (shell header; content only)
app/(frontend)/portal/addresses/page.tsx           (shell header; content only)
app/(frontend)/portal/gifts/page.tsx               (shell header; content only)
app/(frontend)/portal/login/page.tsx               (no SiteShell; rendered bare in shell)
app/(frontend)/api/portal/library/route.ts         (self-heal + readable summary)
app/(frontend)/api/portal/orders/route.ts          (shipments + billing fields)
app/components/PortalLibraryClient.tsx             (slot meter)
app/components/PortalOrdersClient.tsx              (shipment timeline + invoice button)
app/components/PortalLoginForm.tsx                 (full-reload redirect)
app/components/GiftRedeemClient.tsx                (success state)
app/(payload)/layout.tsx                            (imports admin-portal-theme.scss last)
app/(payload)/components/AdminBeforeNavLinks.tsx   (renders AdminSidebarIdentity)
```

Later files touched by gifting and Google Places work are listed in their daily logs.

---

## Guardrails for the next AI / developer

```txt
- tsconfig target is es5: never for-of/spread a Map/Set/iterator — wrap in Array.from().
- next build fails on raw apostrophes in JSX text: use &apos; (attribute strings are fine).
- Portal pages must NOT import SiteShell or PortalSessionBar. The portal layout provides the shell. New portal pages = PortalPageHeader + a client component.
- Login (and any post-auth redirect into the portal) should full-reload, not router.push.
- The business address belongs ONLY on the invoice for now.
- Admin palette = teal/mint. Do NOT reintroduce cream. admin-portal-theme.scss is sidebar STRUCTURE only; colors come from custom.scss + the polish files.
- Gifting = redemption-code model (free digital access). Do NOT route $0 gifts through Stripe checkout. Stripe coupons are a separate (future) discount feature.
- Shared readable license = 3 slots per title across PDF/EPUB downloads + gifts.
- Reusable portal data logic lives in lib/portalData.ts.
- Geoapify is removed. Use Google Places API (New) for address autocomplete.
```

---

## Still open / recommended next
```txt
0. Confirm Google Places live in portal and admin after NEXT_PUBLIC_GOOGLE_PLACES_API_KEY/referrer/redeploy.
0b. Fix order 26-0029 manually and decide whether to prefill Stripe Checkout name/address for logged-in customers.
1. Email deliverability: set SPF/DKIM/DMARC DNS for bennyandpennyadventures.com / Sequenzy.
2. Replace placeholder product assets (covers, page previews, cart thumbnails).
3. Replace dummy R2 files with real PDF/EPUB/audio as Books 1-4 finalize.
4. BPG gift-code → cart/coupon tracking (deeper integration; current owned-copy gifting works).
5. Decide whether to raise gift download allowance above 1.
6. Update Terms for full readable license vs gifted access.
7. Research official LuLu project/template/bleed setup before resuming print testing.
```

## Deploy / environment
```txt
Branch: main. Vercel production is the controlled test environment.
Stripe sandbox/test, LuLu sandbox/paused (unchanged).
Always run npm run build locally before deploy when touching routes/types.
```

---

## Gifting fixes (later 2026-06-17, after initial portal v2 approval)

Hamilton tested gifting (Adam → Hamster) and found several gaps. All fixed:

```txt
1. Gifted books now show in My Library. Cause: the Library was built only from purchases (order-items); a gift delivers via a downloads record with no order, so it appeared on the dashboard slot widget but not the Library. The library route now also includes books that have download records with no matching purchase, labeled "Gifted Book ♥". Dashboard "Books owned" counts gifts too.
2. Gift email now names the sender. Subject = "<Gifter> sent you a Benny & Penny book"; body has a "From: <name> · <email>" line and names the gifter in the intro. (sendGiftEmail gained a gifterEmail param; portal/gifts passes user.email.)
3. Redeem is session-aware. /api/gift/redeem checks the Payload session first: signed-in members claim straight to their account (no email/password). The redeem page detects login and shows a one-step "Claim to my library" card, then routes to /portal/library on success.
4. Existing members are never forced to set a password. The not-signed-in form labels password "new accounts only", only shows confirm when a password is typed, and the server only uses a password when CREATING a new account — it never resets an existing member's password.
```

Files touched (gifting fixes):
```txt
app/(frontend)/api/portal/library/route.ts      (include gift-only books + gifted flag)
app/components/PortalLibraryClient.tsx           ("Gifted Book ♥" label)
app/(frontend)/api/portal/overview/route.ts      (count gifted books as owned)
lib/email.ts                                      (gifter name/email in subject + body)
app/(frontend)/api/portal/gifts/route.ts         (pass gifterEmail)
app/(frontend)/api/gift/redeem/route.ts          (session-aware; password only for new accounts)
app/components/GiftRedeemClient.tsx              (logged-in one-step claim; password optional)
```

Gifting guardrails / behavior:
```txt
- Gifts deliver via a downloads record (no order). The Library must surface books from download records, not just order-items — do not regress this.
- Gift download allowance is currently 1 (gift.downloadsGranted). Hamster's single slot is consumed after one download, so the Library shows the book but the button reads "access limit reached". Raising this (e.g., to 3) is an open decision if recipients should re-download on their device.
- Redeem must honor the logged-in session (claim to current account) and must never reset an existing member's password.
```

## Open follow-ups from gifting test
```txt
- DELIVERABILITY: gift emails land in junk. This is email auth, not code — set SPF, DKIM, and DMARC DNS for bennyandpennyadventures.com with the sending provider (Sequenzy) and use a verified From domain. Naming the sender in the subject was done in code; inbox placement needs the DNS records.
- Decide whether to raise the gift download allowance above 1.
```
