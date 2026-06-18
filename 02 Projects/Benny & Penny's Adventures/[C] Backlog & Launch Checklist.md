# Benny & Penny's Adventures — Backlog & Launch Checklist

Updated from repo review, Hamilton's product/delivery/gifting direction, the confirmed R2 delivery test, Portal v2 approval, gifting fixes, the Google Places switch, Hamilton's confirmation that autocomplete works for both customer and admin, code confirmation that checkout name/address mitigation is already implemented, email DNS verification, and the June 17 sandbox cart/checkout tracking build.

---

## 🔴 Current Active Focus

- [x] Updated architectural blueprint reviewed.
- [x] Repo review completed across Payload, portal, checkout, cart, R2, LuLu, address autocomplete, and support foundations.
- [x] Latest product/delivery direction captured in `[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md`.
- [x] Customer Portal v2 shipped and approved.
- [x] Account, Help, Orders, Library, Gifting, Addresses, dashboard, shipment timeline, and branded invoice shipped for Portal v2.
- [x] Gifting fixes shipped: gift-only books show in Library, sender appears in email, redeem is session-aware, existing users are not forced to set passwords.
- [x] R2 automated digital delivery confirmed working in testing.
- [x] Portal Library shows separate PDF, EPUB, and Audiobook buttons.
- [x] Geoapify removed; Google Places API (New) autocomplete built in portal + admin.
- [x] Google Places autocomplete confirmed working for customer portal and admin.
- [x] Checkout name/address issue mitigated by saved-address Stripe prefill and fulfillment name guard.
- [x] Existing order 26-0029 cleanup bypassed as an active blocker per Hamilton.
- [x] Email authentication DNS verified: DKIM, SPF, SES feedback/inbound MX, and DMARC p=none.
- [x] Abandoned-cart collection, cart token, cart event API, checkout-started tracking, and converted tracking built and sandbox-verified.
- [x] Admin Abandoned Carts list and detail record views working after Neon schema migration.
- [x] Guest checkout gate built: guests without a saved email must choose Create an account or Checkout as guest before Stripe.
- [x] Guest cart email + optional cart-reminder consent capture built; real Sequenzy/email association still needs end-to-end validation.
- [ ] Replace placeholder product catalog images, book covers, page previews, and cart thumbnails.
- [ ] Replace dummy R2 files with real files as Books 1-4 are finalized.
- [ ] Deepen BPG gift-code/cart/coupon tracking against the shared readable slot pool.
- [ ] Decide whether to raise gift download allowance above 1.
- [ ] Update Terms for full readable license vs gifted access.
- [ ] Research official LuLu setup/templates before sandbox submission.
- [ ] Monitor real gift/order email inbox placement after DNS verification.

---

## 🔴 Product Assets and Digital Delivery

- [x] Current R2 folder standard selected: `ebooks/`, `audio/`, and `print/`.
- [x] Book records updated to use `ebooks/book-<number>.pdf`, `ebooks/book-<number>.epub`, and `audio/book-<number>-audiobook.mp3`.
- [x] Downloads/Media auto-create after paid test order.
- [x] R2 signed download links work.
- [x] Shared readable slot tracking is active.
- [ ] Replace placeholder cover/page/cart images with correct production assets.
- [ ] Replace dummy/zero-byte R2 files with real PDF, EPUB, and audio files.
- [ ] Keep manual admin/media linkage only as customer-support reference, not final delivery.
- [ ] Redesign final Library UX only after real assets/files are available.

---

## 🔴 Portal UX and Workflow

- [x] Portal routes exist: home/dashboard, login, orders, addresses, library, gifting, account, help.
- [x] Portal APIs exist: me, orders, addresses, library, downloads, overview, account, support.
- [x] Portal v2 shell and navigation shipped.
- [x] Dashboard shipped with stats, recent orders, ready-to-read downloads, and reading-slot meter.
- [x] Orders improved around shipment/print-job tracking and invoice actions.
- [x] Library improved around confirmed automated digital delivery and gift-only records.
- [x] Account page shipped.
- [x] Help/support ticket page shipped.
- [x] Address book exists and Google Places autocomplete is built.
- [x] Google Places autocomplete confirmed live/working in customer portal address book.
- [x] Google Places autocomplete confirmed live/working in admin.
- [ ] Later: account setup address confirmation and logged-in checkout address prefill polish if needed.
- [ ] Validate final mobile workflow after assets/files are real.

---

## 🟠 BPG Gifting and Coupon Tracking

- [x] Shared readable license rule approved and documented.
- [x] Owned-copy gifting via redemption codes works end-to-end.
- [x] Gift-only books are labeled clearly in customer Library.
- [ ] Tie BPG codes to cart/coupon tracking.
- [ ] Track BPG use from cart through order and download record.
- [ ] Make BPG gifts consume from the purchaser's shared readable slot pool.
- [ ] Limit BPG gift access to the decided download/device allowance.
- [ ] Decide whether gift download allowance should stay at 1 or increase for re-downloads.
- [ ] Update Terms and Conditions for gifted vs full-license digital access.

---

## 🟠 Google Places Address Experience

- [x] Geoapify removed.
- [x] Google Places API (New) status tile appears in Admin Dashboard System Status Check.
- [x] Client-side portal autocomplete built with `AddressAutocomplete`.
- [x] Client-side admin autocomplete built with `AdminAddressField` on CustomerAddresses.street1.
- [x] Manual address book and default address foundation exist.
- [x] Signed-in checkout saved-address prefill foundation exists.
- [x] Google Places autocomplete confirmed working for customer portal.
- [x] Google Places autocomplete confirmed working for admin.
- [ ] Add low-confidence/manual-confirmation flow later if needed.
- [ ] For guest checkout, capture/confirm Stripe-collected address after payment instead of duplicating Stripe's guest address flow too early.

---

## 🟠 Stripe Name Guard / Checkout Prefill

- [x] Added non-destructive Stripe name guard in `lib/stripeFulfillment.ts`.
- [x] Suspicious digit-containing names now get a "⚠ REVIEW" order note.
- [x] Linked account name is used as fallback for customer/billing name when available.
- [x] Saved-address Stripe Checkout prefill exists for signed-in users who choose saved billing/shipping addresses.
- [x] Existing order 26-0029 cleanup bypassed as an active blocker per Hamilton.
- [ ] Later: refine logged-in checkout prefill only if future testing shows a recurring issue.

---

## 🟠 Email Deliverability

- [x] DKIM TXT record verified.
- [x] SPF TXT record verified.
- [x] Amazon SES feedback MX for send verified.
- [x] Amazon inbound MX verified.
- [x] DMARC TXT record verified with `v=DMARC1; p=none`.
- [ ] Monitor real gift/order email inbox placement.
- [ ] Later: consider stricter DMARC only after stable sending.

---

## 🟡 LuLu POD Planning

- [x] Print-job queue works.
- [x] Book print setup fields exist.
- [x] Admin Submit to LuLu foundation exists.
- [ ] Research official LuLu setup for project count, paperback vs hardcover setup, PDF specs, cover specs, bleed, templates, and upload process.
- [ ] Create project/folder plan for all 9 books.
- [ ] Confirm whether setup needs 9 projects or 18 projects.
- [ ] Confirm print-ready PDF output from Canva for Books 1-4.
- [ ] Confirm print-file URL handling before sandbox/live submission.
- [ ] Resume sandbox testing only after setup questions are answered.

---

## 🟡 Cart, Checkout, and Abandoned Cart

- [x] Cart has thumbnails, quantity controls, remove item, clear cart, and saved-address selectors.
- [x] Checkout verifies selected addresses before use.
- [x] `abandoned-carts` Payload collection created and exposed under Sales → Abandoned Carts.
- [x] Neon schema created for `abandoned_carts`, nested cart items, and Payload document-lock relationship support.
- [x] Anonymous guest cart token is stored in `bp_cart_token` and cart changes create/update an active-cart record.
- [x] Stripe session creation moves the matching record to `checkout-started` and stores checkout metadata.
- [x] Thank-you return moves the matching record to `converted` and clears cart state.
- [x] Sandbox guest flow confirmed: Active Cart → Checkout Started → Converted.
- [x] Guest recovery capture shows for guest carts: email plus optional cart-reminder consent.
- [x] Guest checkout gate appears if no guest email has been captured: Create an account or Checkout as guest.
- [x] Guest checkout modal requires a valid email before Stripe and includes optional reminder consent plus an existing-member Sign in link.
- [ ] Run end-to-end test confirming guest email and marketing consent save to abandoned-carts and sync to Sequenzy as `ecommerce.in_cart`.
- [ ] Add timed abandonment automation: active carts and checkout-started carts become `abandoned` only after a defined delay.
- [ ] Add webhook/fulfillment-level converted fallback so conversion does not depend on the buyer returning to thank-you.
- [ ] Add actual Sequenzy recovery workflow only after timing, consent copy, and suppression rules are approved.
- [ ] Improve cart/checkout elements after product assets are real.
- [ ] Add sticky mobile checkout CTA if needed after final mobile review.
- [ ] Improve price and discount clarity.

---

## 🟡 Support and Marketing Back Burner

- [x] SupportTickets and SupportMessages collections exist.
- [x] Customer Help page and ticket creation flow shipped in Portal v2.
- [ ] Link tickets to order and affected item later if needed.
- [ ] Add customer ticket timeline later if needed.
- [ ] Keep subscriber/marketing panel on back burner.
- [ ] Future panel may support email, newsletters, SMS, outbound calls, and API/webhook integrations.
- [ ] Start with clean API/data import-export before overbuilding marketing tools.

---

## 🟡 Compliance and Launch Readiness

- [ ] Update Terms for BPG gifting vs full license access.
- [ ] Update Privacy for Stripe, LuLu, Google Places API, R2, Sequenzy email/recovery tracking, and email providers.
- [ ] Finalize cart-reminder consent wording, unsubscribe behavior, and suppression policy before enabling live recovery sends.
- [ ] Create cookie/consent plan before marketing pixels.
- [ ] Review physical vs digital tax strategy.
- [ ] Complete business/legal readiness: PO Box or mailing address, DBA, bank account, Stripe live readiness, attorney/CPA review.
