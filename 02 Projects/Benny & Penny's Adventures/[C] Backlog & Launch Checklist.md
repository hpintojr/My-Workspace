# Benny & Penny's Adventures — Backlog & Launch Checklist

Derived from `[C] Site Assessment 2026-06-15.md`, June 17 Geoapify/LuLu work, and the updated architectural blueprint for the customer experience and portal revamp.
Severity: 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

## 🔴 CURRENT ACTIVE FOCUS — Customer Experience / Portal Revamp

- [x] 🔴 **Import updated architectural blueprint into workspace planning.** New roadmap created: `[C] Customer Experience Portal Revamp Roadmap & Assessment.md`.
- [x] 🟠 **Pause further LuLu submit/testing work.** LuLu tool exists, but additional submission testing is paused while portal/customer experience work is prioritized.
- [ ] 🔴 **Audit current portal routes and components** for `/portal`, `/portal/orders`, `/portal/library`, `/portal/addresses`, and login/account flows.
- [ ] 🔴 **Redesign portal information architecture** around Orders, Library, Addresses, Helpdesk, and Account.
- [ ] 🟠 **Apply bookstore/editorial portal theme** with warm surfaces, readable typography, 8px spacing, mobile-first cards, and 44px+ touch targets.
- [ ] 🟠 **Add active portal navigation state** and make parent navigation routes clickable.
- [ ] 🟠 **Create portal helpdesk/support entry point** tied to customer, order, and affected item.

---

## 🔴 LAUNCH BLOCKERS (must fix before public launch)

- [x] 🔴 **Add access control to every Payload collection.** Repo includes `lib/access.ts` helpers and collection-level access rules across customer/admin data.
- [x] 🔴 **Guard the `users.role` field** so only admins can change it.
- [x] 🔴 **Add `access.admin` role gate on `users`** so only `role: admin` can reach `/admin`.
- [ ] 🔴 **Verify the lockdown live:** as a customer, `fetch('/api/orders')` returns only own rows or 403; `PATCH /api/users/<id>` with `{role:'admin'}` is denied; `/admin` rejects customer login.
- [x] 🟠 **Disable setup/debug routes in production.** Temporary setup/debug routes return 404 in production unless explicitly enabled.
- [ ] 🟠 **Final setup/debug cleanup:** before public launch, delete unneeded routes or migrate any kept repair/reconcile/submit route to admin-session auth.
- [x] 🟠 **Ship missing assets** referenced in `layout.tsx`: `og-image.png`, `favicon.png`, and `apple-touch-icon.png`.
- [x] 🟠 **Add baseline security headers site-wide** in `next.config.mjs`; keep admin CSP in middleware only.
- [x] 🔴 **Admin dashboard mobile remediation.** Accepted/working on iPhone Chrome. Future admin changes should be tiny final-layer fixes only.

---

## 🟠 Customer Identity / Guest Checkout / Account Setup

- [x] 🟠 **Guest-friendly checkout direction approved.** Do not force account creation before purchase.
- [x] 🟠 **Backend customer identity foundation exists.** Current fulfillment can create/fetch a customer by email after checkout.
- [ ] 🟠 **Revamp setup-account flow:** customer sets password, confirms billing address, confirms shipping address when a physical order exists, saves defaults, then lands in portal.
- [ ] 🟠 **Digital ownership clarity:** ensure digital/audiobook access is tied to customer email/account ownership and visible in Library.
- [ ] 🟡 **Guest order tracking magic-link design:** plan secure read-only tracking access for guests without full portal login.

---

## 🟠 Geoapify / Address Experience

- [x] 🟡 **Add Geoapify to Admin Dashboard System Status Check.** Commit `c073738d8a74bd419ae265e12c161334740daa07` is deployed.
- [x] 🟡 **Vercel Geoapify values configured.** Public browser value, server-side value, and autocomplete endpoint value were added by Hamilton.
- [ ] 🟠 **Portal address autocomplete:** add Geoapify autocomplete to customer address book forms.
- [ ] 🟠 **Structured address persistence:** save street, city, state, postal code, country, formatted address, place ID, confidence metadata, and confirmation timestamp.
- [ ] 🟠 **Address confidence/manual confirmation:** if address confidence is low, require the customer to confirm parsed address fields.
- [ ] 🟠 **Default address behavior:** add default billing/default shipping logic.
- [ ] 🟡 **Logged-in checkout prefill:** let logged-in customers choose saved billing/shipping addresses before checkout.

---

## 🟠 Portal UX / Orders / Library

- [x] 🟡 **Portal base routes exist:** portal home, orders, addresses, library, login.
- [ ] 🟠 **Portal homepage revamp:** show clear cards for Orders, Library, Addresses, Helpdesk, Account.
- [ ] 🟠 **Order detail revamp:** split fulfillment into digital access, audiobook access, print fulfillment, shipment/tracking, and support actions.
- [ ] 🟠 **Library revamp:** replace “coming soon” states with real availability, signed download actions, clear unavailable states, and support prompts.
- [ ] 🟠 **Physical delivery status:** later surface print-job/LuLu tracking once status and tracking exist.
- [ ] 🟡 **Portal mobile validation:** test Portal Home, Orders, Library, Gifts, and Addresses on iPhone Safari, Chrome Mobile, and iPad portrait.

---

## 🟠 Cart and Checkout UX Revamp

- [ ] 🟠 **Cart visual redesign:** thumbnails, format labels, line-item clarity, discount/price anchoring.
- [ ] 🟠 **Quantity controls:** plus/minus buttons and zero-quantity removal behavior.
- [ ] 🟠 **Mobile sticky checkout CTA:** lower-third thumb-zone checkout action with 44px+ touch targets.
- [ ] 🟠 **Physical cart address step:** confirm shipping/billing details before payment for physical carts.
- [ ] 🟡 **Shipping-rate estimator:** plan future estimator using print/shipping provider rates.
- [ ] 🟡 **Resolve catalog dual-source-of-truth** before deeper checkout changes.

---

## 🟠 Helpdesk / Support Ticket Workflow

- [x] 🟡 **Support collections exist.** SupportTickets and SupportMessages are present.
- [ ] 🟠 **Portal Helpdesk route:** add support entry point in the customer portal.
- [ ] 🟠 **Contextual ticket creation:** customer selects order and affected item(s).
- [ ] 🟠 **Ownership verification:** ticket API verifies order/item belongs to the customer or verified guest context.
- [ ] 🟠 **Customer ticket timeline:** show threaded messages and status in portal.
- [ ] 🟡 **Admin reply notification:** notify customer when support replies.

---

## 🟡 LuLu POD / Print Fulfillment

- [x] 🟡 **Phase 1 — Internal print-job queue:** `print-jobs` collection created, registered in Payload, shown under Catalog below Media, and physical checkout creates draft print-job records.
- [x] 🟡 **Phase 1 Neon schema:** `print_jobs` table created manually after Payload auto-push did not create it.
- [x] 🟡 **Phase 1 record detail fix:** added `payload_locked_documents_rels.print_jobs_id` so individual print-job records open.
- [x] 🟡 **Phase 1 verification:** Order `26-0024` created a Hardcover print job; print record `1` opened and contained the expected data.
- [x] 🟡 **Phase 2 — Book print setup fields:** Books now include LuLu project ID, format SKUs, trim size, print files, print-ready flags, and print notes.
- [x] 🟡 **Phase 2 readiness logic:** new jobs become `ready` only if shipping and required book print setup are complete; otherwise they stay `draft` with setup notes.
- [x] 🟠 **Phase 3 backend foundation:** LuLu API helper and protected manual submit route implemented/deployed.
- [x] 🟠 **Phase 3 admin submit UI:** Submit to LuLu admin page/link deployed.
- [ ] 🟠 **Paused — Phase 3 sandbox test:** after Book 1 setup and portal priorities are aligned, test a ready print job against LuLu sandbox only.
- [ ] 🟠 **Phase 4 — LuLu status/tracking:** store tracking number/link and shipment/delivery dates from LuLu response/webhook/polling.
- [ ] 🟠 **Phase 5 — Physical delivery customer experience:** show print/shipping/tracking status in portal, thank-you page, receipt copy, and tracking email.

---

## 🟡 Digital Delivery / R2

- [x] 🟡 **R2 digital delivery code path:** S3-compatible R2 client, signed-URL helper, protected portal download endpoint, ownership checks, expiration checks, download limits, and usage tracking.
- [ ] 🟠 **R2/live delivery E2E:** confirm real private file object keys, successful signed downloads, and automatic download-record creation from a paid checkout.
- [ ] 🟡 **Library UX integration:** make successful download availability obvious in the portal.

---

## 🟡 Storefront / SEO / Launch Quality

- [x] 🟠 **`app/sitemap.ts`** listing home, books index, each book, for-parents, contact, privacy, and terms.
- [x] 🟠 **`app/robots.ts`** allowing crawl + AI crawlers and pointing to sitemap.
- [x] 🟠 **JSON-LD structured data foundation:** `Organization`/`WebSite` on home, `Book`/`AggregateOffer` on product pages, and `BreadcrumbList` on product pages.
- [ ] 🟡 **FAQPage JSON-LD** still needs to be added where appropriate.
- [x] 🟠 **`public/llms.txt`** — plain-text site map for AI engines.
- [x] 🟠 **Post-order account setup prompt** on thank-you page.
- [ ] 🟡 **Per-page metadata + canonicals** on books index, for-parents, contact, legal; add Twitter card.
- [ ] 🟡 **PDP accordion pattern:** add progressive disclosure for specs, shipping, return policies, and print details.

---

## 🟡 Privacy / Compliance / Business Readiness

- [x] 🟡 **API-side bot/spam protection** on `/api/contact`, `/api/subscribe`, `/api/privacy-request`.
- [ ] 🟡 **Frontend bot-protection wiring:** add hidden honeypot fields to public form components, add frontend challenge widget/token support, and end-to-end test contact/newsletter/privacy request submissions.
- [ ] 🟠 **Privacy policy update for processors:** ensure policy covers Stripe, LuLu, Geoapify, email providers, and Cloudflare/R2 data flows.
- [ ] 🟠 **Cookie / GPC plan:** create before analytics or ad pixels are added.
- [ ] 🟠 **Physical vs digital tax review:** review before public physical-book launch.
- [ ] 🔴 **Business/legal readiness:** PO Box or mailing address, DBA, bank account, Stripe live readiness, attorney/CPA review.

---

## ✅ Assessment Verification — Updated 2026-06-17

Repo + runtime testing confirmed these items are implemented or working:

- Access helpers and collection access rules exist.
- `users.role` is admin-only.
- `/admin` is role-gated through `access.admin`.
- Site-wide security headers exist in `next.config.mjs`.
- Sitemap, robots, `llms.txt`, and JSON-LD foundation exist.
- R2 signed URL helper and protected portal download endpoint exist.
- Post-order account setup prompt exists.
- API-side bot protection exists and is called by public write routes.
- Admin mobile/sidebar/dashboard fixes are accepted.
- Geoapify appears in System Status Check and Vercel values are configured.
- LuLu POD internal print-job queue works.
- Books support LuLu print setup fields.
- LuLu submit backend and admin page are deployed, but testing is paused.

Items still open:

- Customer portal revamp.
- Address autocomplete/account setup confirmation.
- Cart/checkout UX revamp.
- Support/helpdesk workflow.
- Live customer access-control verification.
- R2 live delivery E2E.
- LuLu sandbox test/status/tracking later.
- Privacy/compliance/tax review.
- Business/legal readiness.

---

## Already strong (keep)

Server-side price validation at checkout · verified Stripe webhook signatures · ownership checks in `/api/portal/*` · frozen address snapshots on orders · internal print-job queue · LuLu submit backend/tool foundation · Geoapify environment foundation · solid metadata base · compliance scaffolding.
