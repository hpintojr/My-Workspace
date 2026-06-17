# Benny & Penny's Adventures — Backlog & Launch Checklist

Updated from repo review, Hamilton's product/delivery/gifting direction, and the confirmed R2 delivery test.

---

## 🔴 Current Active Focus

- [x] Updated architectural blueprint reviewed.
- [x] Repo review completed across Payload, portal, checkout, cart, R2, LuLu, Geoapify, and support foundations.
- [x] Latest product/delivery direction captured in `[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md`.
- [x] R2 automated digital delivery confirmed working in testing.
- [x] Portal Library shows separate PDF, EPUB, and Audiobook buttons.
- [ ] Replace placeholder product catalog images, book covers, page previews, and cart thumbnails.
- [ ] Replace dummy R2 files with real files as Books 1-4 are finalized.
- [ ] Build BPG gift-code logic against the shared readable slot pool.
- [ ] Update Terms for full readable license vs gifted access.
- [ ] Verify or build the customer account setup page.
- [ ] Redesign portal UX/workflow around real delivery, orders, library, addresses, helpdesk, and account.
- [ ] Add Geoapify to customer/admin address entry points.
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
- [ ] Redesign final Library UX during portal revamp.

---

## 🔴 Portal UX and Workflow

- [x] Portal routes exist: home, login, orders, addresses, library.
- [x] Portal APIs exist: me, orders, addresses, library, downloads.
- [x] Underlying data foundation is mostly present.
- [ ] Fix customer portal UX and workflow; current flow is not customer-friendly enough.
- [ ] Add Account and Helpdesk sections.
- [ ] Improve Library around confirmed automated digital delivery.
- [ ] Improve Orders around digital, audio, print, tracking, and support actions.
- [ ] Add address confirmation after account setup.
- [ ] Validate mobile workflow.

---

## 🟠 BPG Gifting and Coupon Tracking

- [x] Shared readable license rule approved and documented.
- [ ] Rethink and simplify gifting/sharing protocol.
- [ ] Tie BPG codes to cart/coupon tracking.
- [ ] Track BPG use from cart through order and download record.
- [ ] Make BPG gifts consume from the purchaser's shared readable slot pool.
- [ ] Limit BPG gift access to one digital download/device allowance.
- [ ] Update Terms and Conditions for gifted vs full-license digital access.
- [ ] Label gifted access clearly in customer Library.

---

## 🟠 Geoapify Address Experience

- [x] Geoapify appears in Admin Dashboard System Status Check.
- [x] Geoapify Vercel values are configured.
- [x] Manual address book and default address foundation exist.
- [x] Signed-in checkout saved-address prefill foundation exists.
- [ ] Add Geoapify metadata fields to customer-addresses.
- [ ] Add autocomplete to customer address book.
- [ ] Add autocomplete to admin/customer address entry points.
- [ ] For guest checkout, capture/confirm Stripe-collected address after payment instead of duplicating Stripe's guest address flow too early.
- [ ] Add low-confidence/manual-confirmation flow.

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
- [ ] Improve cart/checkout elements for a better customer experience.
- [ ] Add sticky mobile checkout CTA.
- [ ] Improve price and discount clarity.
- [ ] Plan abandoned-cart recovery options.
- [ ] Plan event capture for abandoned carts.
- [ ] Research tagging/retargeting options later after consent/privacy plan.

---

## 🟡 Support and Marketing Back Burner

- [x] SupportTickets and SupportMessages collections exist.
- [ ] Add customer Helpdesk route and ticket creation flow.
- [ ] Link tickets to order and affected item.
- [ ] Add customer ticket timeline.
- [ ] Keep subscriber/marketing panel on back burner.
- [ ] Future panel may support email, newsletters, SMS, outbound calls, and API/webhook integrations.
- [ ] Start with clean API/data import-export before overbuilding marketing tools.

---

## 🟡 Compliance and Launch Readiness

- [ ] Update Terms for BPG gifting vs full license access.
- [ ] Update Privacy for Stripe, LuLu, Geoapify, R2, and email providers.
- [ ] Create cookie/consent plan before marketing pixels.
- [ ] Review physical vs digital tax strategy.
- [ ] Complete business/legal readiness: PO Box or mailing address, DBA, bank account, Stripe live readiness, attorney/CPA review.
