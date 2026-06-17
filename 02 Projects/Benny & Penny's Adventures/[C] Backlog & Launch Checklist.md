# Benny & Penny's Adventures — Backlog & Launch Checklist

Derived from `[C] Site Assessment 2026-06-15.md` and updated with June 17 LuLu POD Phase 1/2 work.
Severity: 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

## 🔴 LAUNCH BLOCKERS (must fix before public launch)

- [x] 🔴 **Add access control to every Payload collection.** Repo includes `lib/access.ts` helpers and collection-level access rules across customer/admin data.
- [x] 🔴 **Guard the `users.role` field** so only admins can change it.
- [x] 🔴 **Add `access.admin` role gate on `users`** so only `role: admin` can reach `/admin`.
- [ ] 🔴 **Verify the lockdown live:** as a customer, `fetch('/api/orders')` returns only own rows or 403; `PATCH /api/users/<id>` with `{role:'admin'}` is denied; `/admin` rejects customer login.
- [x] 🟠 **Disable setup/debug routes in production.** `setup-payload*`, `debug-books`, and `debug-payload-books` return 404 in production unless `ALLOW_SETUP_ROUTES=true`.
- [ ] 🟠 **Final setup/debug cleanup:** routes still exist and still use `?secret=` if temporarily re-enabled. Before public launch, delete unneeded routes or migrate any kept repair/reconcile route to header-only auth. Rotate `PAYLOAD_SETUP_SECRET` after confirming no longer needed.
- [x] 🟠 **Ship missing assets** referenced in `layout.tsx`: `og-image.png`, `favicon.png`, and `apple-touch-icon.png`.
- [x] 🟠 **Add baseline security headers site-wide** in `next.config.mjs`; keep admin CSP in middleware only.
- [x] 🔴 **Admin dashboard mobile remediation.** Accepted/working on iPhone Chrome. Future admin changes should be tiny final-layer fixes only.

---

## 🟠 LAUNCH-QUALITY (do next)

- [x] 🟠 **`app/sitemap.ts`** listing home, books index, each book, for-parents, contact, privacy, and terms.
- [x] 🟠 **`app/robots.ts`** allowing crawl + AI crawlers and pointing to sitemap.
- [x] 🟠 **JSON-LD structured data foundation:** `Organization`/`WebSite` on home, `Book`/`AggregateOffer` on product pages, and `BreadcrumbList` on product pages.
- [ ] 🟡 **FAQPage JSON-LD** still needs to be added where appropriate.
- [x] 🟠 **`public/llms.txt`** — plain-text site map for AI engines.
- [x] 🟠 **Post-order account setup prompt** on thank-you page.
- [x] 🟡 **R2 digital delivery code path:** S3-compatible R2 client, signed-URL helper, protected portal download endpoint, ownership checks, expiration checks, download limits, and usage tracking.
- [ ] 🟡 **R2/live delivery E2E:** confirm production env vars, real private file object keys, successful signed downloads, and automatic download-record creation from a paid checkout.
- [x] 🟡 **API-side bot/spam protection** on `/api/contact`, `/api/subscribe`, `/api/privacy-request`.
- [ ] 🟡 **Frontend bot/spam protection wiring:** add hidden honeypot fields to public form components, add frontend challenge widget/token support, and end-to-end test contact/newsletter/privacy request submissions.
- [x] 🟡 **Transactional email brand header:** shared email layout updated to match site-style hierarchy and mobile one-line subtitle.
- [x] 🟡 **Admin System Status Check:** added Sequenzy API above Mailjet with supplied logo.
- [x] 🟡 **Payload admin dashboard export fix:** `BeforeDashboard` supports Payload's named import and default export.
- [x] 🟡 **Admin search/sidebar/mobile pass:** accepted working; do not start broad admin rewrites.
- [x] 🟡 **Customer portal mobile pass — phase 1:** session bar, Orders page, and Library page patched for mobile stacking, horizontal overflow, and long text handling.
- [ ] 🟡 **Customer portal mobile validation:** test Portal Home, Orders, Library, Gifts, and Addresses on iPhone Safari, Chrome Mobile, and iPad portrait.
- [ ] 🟡 **Resolve catalog dual-source-of-truth** (static `lib/books.ts` vs Payload `books`). Public pages can read Payload/Neon with fallback, but checkout validation still imports static `books` and `bookFormats` from `lib/books.ts`.
- [ ] 🟡 **Per-page metadata + canonicals** on books index, for-parents, contact, legal; add Twitter card.
- [ ] 🟡 **Throttle/gate thank-you fulfillment fallback;** keep webhook primary. Thank-you still calls `fulfillCheckoutSessionById(session_id)` as a fallback.

---

## 🟡 LuLu POD / Print Fulfillment

- [x] 🟡 **Phase 1 — Internal print-job queue:** `print-jobs` collection created, registered in Payload, shown under Catalog below Media, and physical checkout creates draft print-job records.
- [x] 🟡 **Phase 1 Neon schema:** `print_jobs` table created manually after Payload auto-push did not create it.
- [x] 🟡 **Phase 1 record detail fix:** added `payload_locked_documents_rels.print_jobs_id` so individual print-job records open.
- [x] 🟡 **Phase 1 verification:** Order `26-0024` created a Hardcover print job; print record `1` opened and contained the expected data.
- [x] 🟡 **Phase 2 — Book print setup fields:** Books now include LuLu project ID, format SKUs, trim size, print files, print-ready flags, and print notes.
- [x] 🟡 **Phase 2 Neon schema:** matching `books` columns added in Neon.
- [x] 🟡 **Phase 2 readiness logic:** new jobs become `ready` only if shipping and required book print setup are complete; otherwise they stay `draft` with setup notes.
- [ ] 🟠 **Phase 3 — Manual Submit to LuLu:** build LuLu config/auth helper, manual submit route/action, ready-status validation, request/response persistence, and error handling.
- [ ] 🟠 **Phase 4 — LuLu status/tracking:** store tracking number/link and shipment/delivery dates from LuLu response/webhook/polling.
- [ ] 🟠 **Phase 5 — Physical delivery customer experience:** show print/shipping/tracking status in portal, thank-you page, receipt copy, and tracking email.

---

## ✅ ASSESSMENT VERIFICATION — Updated 2026-06-17

Repo + runtime testing confirmed these items are now implemented or working:

- Access helpers and collection access rules exist.
- `users.role` is admin-only.
- `/admin` is role-gated through `access.admin`.
- Site-wide security headers exist in `next.config.mjs`.
- Admin CSP is isolated to `middleware.ts` for `/admin`.
- Sitemap exists.
- Robots exists and includes AI crawler rules.
- `llms.txt` exists.
- JSON-LD foundation exists for home and book pages.
- R2 signed URL helper exists.
- Protected portal downloads endpoint exists and checks ownership/limits.
- Post-order account setup prompt exists.
- API-side bot protection exists and is called by public write routes.
- Admin mobile/sidebar/dashboard fixes are accepted.
- LuLu POD internal print-job queue works.
- Books now support LuLu print setup fields.

Items still open:

- Live customer access-control verification.
- Thank-you fulfillment fallback throttling/gating.
- Frontend bot-protection wiring.
- Per-page metadata/canonicals/Twitter card.
- Catalog source-of-truth decision.
- Customer portal mobile validation.
- Admin actions: refund, resend receipt, regenerate download access.
- Customer support portal workflow.
- LuLu API manual submit/status/tracking.
- Business/legal readiness: PO Box or mailing address, DBA, bank account, Stripe live readiness, attorney review.

---

## 🟡 POST-LAUNCH / ONGOING

- [x] 🟡 **Promotions Phase 1 — discount codes:** `promotions` collection synced to Stripe coupons/promo codes; admin UI.
- [x] 🟡 **Gifting Phase 2 — gift a licensed download:** `gifts` collection + giftable-balance, redemption page, access-grant creation, Library surfacing of grants.
- [ ] 🟢 **Gifting Phase 3 — marketing automation:** tag + nurture gifted recipients; attribution reporting.
- [ ] 🟡 **Email automations E2E:** receipt + set-password link, gift-redeemed confirmation, password reset, dunning, review request.
- [ ] 🟡 **Email footer branding review:** confirm whether the provider-added Sequenzy footer badge can be removed through provider settings or plan controls.
- [ ] 🟡 **Email failover architecture:** keep Sequenzy as primary transactional provider and Mailjet as fallback/backup for critical customer email flows.
- [ ] 🟡 **Admin actions:** Stripe refund button, resend receipt, regenerate download access; write privileged actions to `audit-logs`.
- [ ] 🟡 **Customer support workflow:** portal "Contact support" action that opens a `support-ticket`.
- [ ] 🟢 **Accessibility pass:** contrast, focus styles, `aria-live` on form status, label association on address selects.
- [ ] 🟢 **Performance/CWV:** `next/image` for hero/character art, width/height, WebP/AVIF, preload hero.
- [ ] 🟢 **Consolidate admin CSS** after final QA.
- [ ] 🟢 **Order-number generation:** move to DB sequence / unique-constraint-with-retry before volume.
- [ ] 🟢 **Reuse Stripe customer:** store `stripeCustomerId` on user to avoid duplicate Stripe customers.
- [x] 🟢 **Remove stray `public/images/hero-family.png.bak`.** Repo search did not find the backup file during June 16 assessment verification.
- [ ] 🟢 **Per-condition landing pages** (`/help/ports`, `/help/infusions`, …) + FAQ content for SEO + AI.

---

## Already strong (keep)

Server-side price validation at checkout · verified Stripe webhook signatures · ownership checks in `/api/portal/*` · frozen address snapshots on orders · internal print-job queue · solid metadata base · compliance scaffolding.

---

*Source: `[C] Site Assessment 2026-06-15.md` plus 2026-06-16 admin/portal work and 2026-06-17 LuLu POD Phase 1/2 implementation.*
