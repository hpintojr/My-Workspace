# Benny & Penny's Adventures — Backlog & Launch Checklist

Derived from the June 15 site assessment, June 17 Geoapify/LuLu work, the updated architectural blueprint, and the June 17 repo review.

Severity: 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

## 🔴 Current Active Focus — Customer Experience / Portal Revamp

- [x] 🔴 Updated architectural blueprint reviewed and converted into the active portal roadmap.
- [x] 🔴 Repo review completed across Payload, access control, checkout/cart, portal, R2, LuLu, Geoapify, and support foundations.
- [x] 🟠 LuLu submit/testing paused while customer experience work is prioritized.
- [x] 🟠 Current portal routes and APIs reviewed at code level.
- [ ] 🔴 Verify or build the customer account setup page used after purchase.
- [ ] 🔴 Redesign portal information architecture around Orders, Library, Addresses, Helpdesk, and Account.
- [ ] 🟠 Apply bookstore/editorial portal theme with mobile-first cards and 44px+ touch targets.
- [ ] 🟠 Add active portal navigation state.
- [ ] 🟠 Add customer Helpdesk entry point tied to orders/items.

---

## 🔴 Launch Blockers

- [x] 🔴 Payload collection access controls exist.
- [x] 🔴 User role field is protected.
- [x] 🔴 Admin panel is role-gated.
- [ ] 🔴 Run live customer-role access verification.
- [x] 🟠 Temporary setup/debug routes are restricted in production.
- [ ] 🟠 Final setup/debug/reconcile/submit route cleanup before public launch.
- [x] 🟠 Required public assets exist.
- [x] 🟠 Baseline security headers exist.
- [x] 🔴 Admin dashboard mobile remediation is accepted.

---

## 🟠 Customer Identity / Guest Checkout / Account Setup

- [x] Guest-friendly checkout direction approved.
- [x] Backend can create/fetch customer by email after checkout.
- [x] Backend account setup/reset API foundation exists.
- [ ] Verify or build customer-facing account setup page.
- [ ] Add post-setup billing/shipping address confirmation.
- [ ] Make digital/audiobook ownership clearer in Library.
- [ ] Plan guest read-only order tracking.

---

## 🟠 Geoapify / Address Experience

- [x] Geoapify appears in Admin Dashboard System Status Check.
- [x] Geoapify Vercel values are configured.
- [x] Manual Address Book exists with add/edit/archive/default billing/default shipping.
- [x] Logged-in checkout saved-address prefill foundation exists.
- [ ] Add Geoapify metadata fields to customer-addresses.
- [ ] Add Geoapify autocomplete to Portal > Addresses.
- [ ] Map parsed address result into customer-addresses.
- [ ] Add low-confidence/manual-confirmation flow.
- [ ] E2E test saved-address prefill.

---

## 🟠 Portal UX / Orders / Library

- [x] Portal base routes exist: home, login, orders, addresses, library.
- [x] Portal APIs exist: me, orders, library, addresses, downloads.
- [x] Orders page loads order history and line items.
- [x] Library page can show purchased formats and available digital records.
- [x] Addresses page can import addresses from past order snapshots.
- [ ] Portal homepage revamp for Orders, Library, Addresses, Helpdesk, Account.
- [ ] Order detail revamp with digital, audio, print, tracking, and support sections.
- [ ] Library UX polish for available/unavailable states.
- [ ] Physical delivery status after LuLu tracking exists.
- [ ] Portal mobile validation.

---

## 🟠 Cart and Checkout UX

- [x] Cart has thumbnails, format labels, line totals, plus/minus quantity controls, remove item, and clear cart.
- [x] Signed-in customers can select saved billing/shipping addresses.
- [x] Checkout verifies selected addresses belong to the customer before using them.
- [ ] Blueprint-grade mobile cart redesign.
- [ ] Sticky mobile checkout CTA.
- [ ] Stronger price/discount clarity.
- [ ] Cleaner physical-shipping confirmation step.
- [ ] Shipping-rate estimator later.
- [ ] Resolve static catalog vs Payload catalog source-of-truth before deeper checkout changes.

---

## 🟠 Helpdesk / Support

- [x] SupportTickets and SupportMessages collections exist.
- [ ] Expand support model for affected order item and threaded conversation.
- [ ] Add portal Helpdesk route.
- [ ] Add ticket creation API.
- [ ] Verify selected order/item belongs to the customer.
- [ ] Add customer ticket timeline.
- [ ] Add customer notification for support replies.

---

## 🟡 LuLu POD / Print Fulfillment

- [x] Internal print-job queue works.
- [x] PrintJobs table and lock relation were patched.
- [x] Order `26-0024` created a Hardcover print job.
- [x] Books have LuLu print setup fields.
- [x] Readiness logic keeps incomplete jobs in draft.
- [x] LuLu submit backend exists.
- [x] Admin Submit to LuLu page/link exists.
- [ ] Confirm print interior/cover values are accessible file URLs before any sandbox/live submission.
- [ ] Fill Book 1 print setup fields.
- [ ] Run sandbox test only when LuLu path is resumed.
- [ ] Add LuLu status/tracking handling.
- [ ] Add customer-facing physical delivery status.

---

## 🟡 Digital Delivery / R2

- [x] R2 helper exists.
- [x] Protected portal file-delivery endpoint exists.
- [x] Ownership checks and usage tracking exist.
- [x] Library can show available digital records.
- [ ] Confirm real private file object keys.
- [ ] Complete paid-order-to-library-to-file E2E test.
- [ ] Improve Library UI states.
- [ ] Revisit edge-compatible approach only if moving file delivery to Edge runtime.

---

## 🟡 Storefront / SEO / Launch Quality

- [x] Sitemap exists.
- [x] Robots exists.
- [x] JSON-LD foundation exists.
- [x] `llms.txt` exists.
- [x] Post-order account setup prompt exists.
- [ ] FAQPage JSON-LD.
- [ ] Per-page metadata/canonicals/Twitter card.
- [ ] PDP accordion pattern for specs, shipping, returns, and print details.

---

## 🟡 Privacy / Compliance / Business Readiness

- [x] API-side bot/spam protection exists on public write routes.
- [ ] Frontend bot-protection wiring.
- [ ] Privacy policy update for Stripe, LuLu, Geoapify, R2, and email providers.
- [ ] Cookie/GPC plan before analytics or ad pixels.
- [ ] Physical vs digital tax review before public physical-book launch.
- [ ] Business/legal readiness: PO Box or mailing address, DBA, bank account, Stripe live readiness, attorney/CPA review.

---

## Assessment Verification — Updated 2026-06-17 Repo Review

Confirmed:

- Access controls, admin gate, security headers, sitemap/robots/metadata foundation.
- Portal home/login/orders/library/addresses exist.
- Portal API foundation exists.
- Cart has basic polished commerce behavior.
- Checkout has partial saved-address prefill.
- R2 digital delivery code path exists.
- LuLu queue/setup/submit UI foundation exists.
- Geoapify environment/dashboard foundation exists.

Still open:

- Customer account setup page verification/build.
- Customer portal IA and visual revamp.
- Geoapify fields/autocomplete.
- Account setup address confirmation.
- Helpdesk workflow.
- R2 live E2E.
- LuLu file URL handling and sandbox test later.
- Compliance/tax/business readiness.
