# Benny & Penny's Adventures — Backlog & Launch Checklist

Updated from repo review, Hamilton's product/delivery/gifting direction, the confirmed R2 delivery test, Portal v2 approval, gifting fixes, and the Google Places switch.

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
- [ ] Confirm Google Places live after Vercel/Google Cloud key/referrer/redeploy.
- [ ] Manually fix order 26-0029 (address typed into Stripe name field).
- [ ] Replace placeholder product catalog images, book covers, page previews, and cart thumbnails.
- [ ] Replace dummy R2 files with real files as Books 1-4 are finalized.
- [ ] Deepen BPG gift-code/cart/coupon tracking against the shared readable slot pool.
- [ ] Decide whether to raise gift download allowance above 1.
- [ ] Update Terms for full readable license vs gifted access.
- [ ] Research official LuLu setup/templates before sandbox submission.

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
- [ ] Confirm Google Places live in portal address book.
- [ ] Later: account setup address confirmation and logged-in checkout address prefill polish.
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
- [ ] Set/confirm `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` in Vercel.
- [ ] Enable Places API (New) + billing in Google Cloud.
- [ ] Add allowed referrers: non-www, www, and localhost.
- [ ] Redeploy and test portal + admin autocomplete via DevTools Network tab.
- [ ] Add low-confidence/manual-confirmation flow later if needed.
- [ ] For guest checkout, capture/confirm Stripe-collected address after payment instead of duplicating Stripe's guest address flow too early.

---

## 🟠 Stripe Name Guard / Order Cleanup

- [x] Added non-destructive Stripe name guard in `lib/stripeFulfillment.ts`.
- [x] Suspicious digit-containing names now get a "⚠ REVIEW" order note.
- [x] Linked account name is used as fallback for customer/billing name when available.
- [ ] Manually fix existing order 26-0029.
- [ ] Decide whether to prefill Stripe Checkout name/address for logged-in customers.

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
- [ ] Improve cart/checkout elements after product assets are real.
- [ ] Add sticky mobile checkout CTA if needed after final mobile review.
- [ ] Improve price and discount clarity.
- [ ] Plan abandoned-cart recovery options.
- [ ] Plan event capture for abandoned carts.
- [ ] Research tagging/retargeting options later after consent/privacy plan.

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
- [ ] Update Privacy for Stripe, LuLu, Google Places API, R2, and email providers.
- [ ] Create cookie/consent plan before marketing pixels.
- [ ] Review physical vs digital tax strategy.
- [ ] Complete business/legal readiness: PO Box or mailing address, DBA, bank account, Stripe live readiness, attorney/CPA review.
