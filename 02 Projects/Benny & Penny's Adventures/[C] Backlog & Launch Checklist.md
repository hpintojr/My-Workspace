# Benny & Penny's Adventures — Backlog & Launch Checklist

Derived from `[C] Site Assessment 2026-06-15.md` and updated with June 16 repo inspection, mobile/admin progress, portal/R2 work, email work, and assessment verification.
Severity: 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

## 🔴 LAUNCH BLOCKERS (must fix before public launch)

- [x] 🔴 **Add access control to every Payload collection.** Repo now includes `lib/access.ts` helpers (`anyone`, `isAdmin`, `isAdminOrSelf`, `adminOnly`, `isAdminPanel`, `isAdminFieldLevel`) and collection-level access rules across customer/admin data. (Assessment 2.1)
- [x] 🔴 **Guard the `users.role` field** so only admins can change it. `collections/Users.ts` now protects `role` with admin-only field access. (2.1)
- [x] 🔴 **Add `access.admin` role gate on `users`** so only `role: admin` can reach `/admin`. (2.1)
- [ ] 🔴 **Verify the lockdown live:** as a customer, `fetch('/api/orders')` returns only own rows or 403; `PATCH /api/users/<id>` with `{role:'admin'}` is denied; `/admin` rejects customer login. Code is fixed, but live customer-role testing is still required. (2.1)
- [x] 🟠 **Disable setup/debug routes in production.** `setup-payload*`, `debug-books`, and `debug-payload-books` now return 404 in production unless `ALLOW_SETUP_ROUTES=true`. (2.2)
- [ ] 🟠 **Final setup/debug cleanup:** routes still exist and still use `?secret=` if temporarily re-enabled. Before public launch, delete unneeded routes or migrate any kept repair/reconcile route to header-only auth. Rotate `PAYLOAD_SETUP_SECRET` in Vercel after confirming no longer needed. (2.2)
- [x] 🟠 **Ship missing assets** referenced in `layout.tsx`: `og-image.png`, `favicon.png`, and `apple-touch-icon.png`. Binary fetch confirms files are now present in `public/images`. (3 / 8)
- [x] 🟠 **Add baseline security headers site-wide** in `next.config.mjs`; keep admin CSP in middleware only. (2.5)
- [ ] 🔴 **Finish admin dashboard mobile remediation.** The final stylesheet is coded, but launch blocker remains real-device validation of row layouts for System Status, Recent Orders, and Community Growth.

---

## 🟠 LAUNCH-QUALITY (do next)

- [x] 🟠 **`app/sitemap.ts`** listing home, books index, each book, for-parents, contact, privacy, and terms. (8)
- [x] 🟠 **`app/robots.ts`** allowing crawl + AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Google-Extended, Applebot-Extended), pointing to sitemap. (8 / 9)
- [x] 🟠 **JSON-LD structured data foundation:** `Organization`/`WebSite` on home, `Book`/`AggregateOffer` on product pages, and `BreadcrumbList` on product pages. (8 / 9)
- [ ] 🟡 **FAQPage JSON-LD** still needs to be added where appropriate; the assessment requested it, but repo inspection did not confirm an FAQ schema helper or usage yet. (8 / 9)
- [x] 🟠 **`public/llms.txt`** — plain-text site map for AI engines with book summaries, audience, key pages, and recommendation notes. (9)
- [x] 🟠 **Post-order account setup prompt** on thank-you page. `SetPasswordCard` tells new buyers to check email for a setup link and routes returning buyers to portal login. (7)
- [x] 🟡 **R2 digital delivery code path:** S3-compatible R2 client, signed-URL helper, protected portal download endpoint, ownership checks, expiration checks, download limits, and usage tracking. (6 #2)
- [ ] 🟡 **R2/live delivery E2E:** confirm production env vars, real private file object keys, successful signed downloads, and automatic download-record creation from a paid checkout. (6 #2)
- [x] 🟡 **API-side bot/spam protection** on `/api/contact`, `/api/subscribe`, `/api/privacy-request`: honeypot detection, optional Turnstile verification path, and per-IP rate limits. (2.4)
- [ ] 🟡 **Frontend bot/spam protection wiring:** add hidden honeypot fields to public form components, add frontend challenge widget/token support, and end-to-end test contact/newsletter/privacy request submissions. (2.4)
- [x] 🟡 **Transactional email brand header:** shared email layout updated to match site-style hierarchy: `Benny & Penny` / `♥ Adventures ♥` / `MEDICAL BOOKS FOR BRAVE LITTLE HEARTS`. Commit `d8d1bd00eb19a19be7f93af6c732b242863637c2`.
- [x] 🟡 **Admin System Status Check:** added Sequenzy API above Mailjet with supplied logo. Commit `f4ca40c5ada3a00cb46f16ff4fe6d334846f4711`.
- [x] 🟡 **Payload admin dashboard export fix:** `BeforeDashboard` now supports Payload's named import and the default export. Commit `03ee988c6437d9d1a20c612689be2a7ccb5d5c43` was confirmed READY.
- [x] 🟡 **Admin search/sidebar mobile pass:** mobile sidebar transition/scroll improved, search moved below greeting structurally, and text-width caps removed from admin dashboard. Needs continued row-layout validation.
- [x] 🟡 **Admin dashboard mobile row-layout code:** `admin-dashboard-mobile-rows.scss` and `admin-dashboard-final-polish.scss` are imported in Payload layout, and grid rules exist for System Status, Recent Orders, and subscriber rows. Needs real-device validation before closing blocker.
- [x] 🟡 **Customer portal mobile pass — phase 1:** session bar, Orders page, and Library page were patched for mobile stacking, horizontal overflow, and long text handling. Needs real-device validation before closing completely.
- [ ] 🟡 **Customer portal mobile validation:** test Portal Home, Orders, Library, Gifts, and Addresses on iPhone Safari, Chrome Mobile, and iPad portrait.
- [ ] 🟡 **Resolve catalog dual-source-of-truth** (static `lib/books.ts` vs Payload `books`). Public pages can read Payload/Neon with fallback, but checkout validation still imports static `books` and `bookFormats` from `lib/books.ts`; make Payload canonical or formally document static pricing as source of truth. (3)
- [ ] 🟡 **Per-page metadata + canonicals** on books index, for-parents, contact, legal; add Twitter card. Product pages have `generateMetadata`, but other pages still need explicit metadata/canonicals. (8)
- [ ] 🟡 **Throttle/gate thank-you fulfillment fallback;** keep webhook primary. Thank-you still calls `fulfillCheckoutSessionById(session_id)` as a fallback. (2.3)

---

## ✅ ASSESSMENT VERIFICATION — 2026-06-16

Repo inspection confirmed these assessment items are now implemented in code:

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
- Admin mobile row-layout CSS exists and is imported.

Items that are **partially done but not fully closed**:

- Setup/debug routes are production-disabled but still present and still use query-string secret if re-enabled.
- Public product pages can use Payload/Neon, but checkout pricing still uses static `lib/books.ts`.
- API-side bot protection is done, but frontend honeypot/Turnstile fields were not confirmed.
- JSON-LD is present, but FAQPage schema was not confirmed.
- R2 code is present, but live object/env/download E2E still needs validation.
- Admin mobile row-layout code is present, but phone/tablet visual QA is still required.

Items still open from the assessment:

- Live customer access-control verification.
- Thank-you fulfillment fallback throttling/gating.
- Frontend bot-protection wiring.
- Per-page metadata/canonicals/Twitter card.
- Catalog source-of-truth decision.
- Customer portal mobile validation.
- Admin actions: refund, resend receipt, regenerate download access.
- Customer support portal workflow.
- POD/Lulu automation.
- Business/legal readiness: PO Box or mailing address, DBA, bank account, Stripe live readiness, attorney review.

---

## 🟡 ADMIN MOBILE REMEDIATION — ACTIVE BLOCKER

Files involved:

```txt
app/(payload)/components/BeforeDashboard.tsx
app/(payload)/components/BeforeDashboard.scss
app/(payload)/components/RegionCompact.scss
app/(payload)/admin-polish-overrides.scss
app/(payload)/admin-dashboard-mobile-rows.scss
app/(payload)/admin-dashboard-final-polish.scss
app/(payload)/layout.tsx
```

Completed so far:

- Added Sequenzy to System Status Check.
- Fixed named export issue for Payload import map.
- Restored compact service logos after oversized SVG issue.
- Added mobile-specific admin dashboard shell overrides.
- Added overflow containment for dashboard cards and mobile shell.
- Improved sidebar/hamburger behavior; user later confirmed the sidebar is perfect.
- Moved the admin dashboard search into a standalone row below the greeting.
- Removed dashboard text width caps that were causing headings/subtitles to wrap too narrowly.
- Added `admin-dashboard-mobile-rows.scss` and imported it in Payload layout.
- Added final admin dashboard polish import after mobile row overrides.
- Recent commit history shows multiple June 16 mobile-admin refinements, including row overrides, search/menu visibility, heart toggle positioning, welcome line wrapping, and mobile header gap adjustments.

Still open:

- Validate final row-layout override on phone after deployment.
- Confirm System Status `ONLINE` badges remain in the right column instead of stacking.
- Confirm Recent Orders rows use order/customer, date, status, and total columns instead of stacking.
- Confirm Community Growth subscriber rows use subscriber/date/status columns instead of stacking.
- Confirm no regression to sidebar/hamburger/search behavior.
- Validate iPhone Safari, Chrome Mobile, and iPad portrait.

Next actions:

1. Test admin dashboard on phone.
2. Review System Status, Recent Orders, and Community Growth row layouts.
3. If row layout is still not correct, inspect final CSS cascade and consider a JSX-level table/grid structure for those cards.
4. Only after admin mobile is stable, move to portal validation.

---

## 🟡 POST-LAUNCH / ONGOING

- [x] 🟡 **Promotions Phase 1 — discount codes:** `promotions` collection synced to Stripe coupons/promo codes; admin UI. (Checkout already accepts codes via `allow_promotion_codes`.) See `[C] Promotions, Gifting & Access Grants Plan.md`.
- [x] 🟡 **Gifting Phase 2 — gift a licensed download:** `gifts` collection + giftable-balance, redemption page, access-grant creation, Library surfacing of grants. Captures gifted recipients as consented leads.
- [ ] 🟢 **Gifting Phase 3 — marketing automation:** tag + nurture gifted recipients; attribution reporting.

- [ ] 🟡 **Email automations E2E:** receipt + set-password link, gift-redeemed confirmation, password reset, dunning, review request. Provider helpers are wired; needs live testing.
- [ ] 🟡 **Email footer branding review:** confirm whether the provider-added Sequenzy footer badge can be removed through provider settings or plan controls.
- [ ] 🟡 **Email failover architecture:** keep Sequenzy as primary transactional provider and Mailjet as fallback/backup for critical customer email flows.
- [ ] 🟡 **POD/Lulu automation:** create print job from frozen address snapshot on paid physical order; write tracking back + email. (6 #3)
- [ ] 🟡 **Admin actions:** Stripe refund button, resend receipt, regenerate download access; write privileged actions to `audit-logs`. (5)
- [ ] 🟡 **Customer support workflow:** portal "Contact support" action that opens a `support-ticket`. (5)
- [ ] 🟢 **Accessibility pass:** contrast, focus styles, `aria-live` on form status, label association on address selects. (4)
- [ ] 🟢 **Performance/CWV:** `next/image` for hero/character art, width/height, WebP/AVIF, preload hero. (8)
- [ ] 🟢 **Consolidate admin CSS** (multiple overlapping `admin-*.scss`). (3)
- [ ] 🟢 **Order-number generation:** move to DB sequence / unique-constraint-with-retry before volume. (3)
- [ ] 🟢 **Reuse Stripe customer:** store `stripeCustomerId` on user to avoid duplicate Stripe customers. (3)
- [x] 🟢 **Remove stray `public/images/hero-family.png.bak`.** Repo search did not find the backup file during June 16 assessment verification. (3)
- [ ] 🟢 **Per-condition landing pages** (`/help/ports`, `/help/infusions`, …) + FAQ content for SEO + AI. (9)

---

## Already strong (keep)

Server-side price validation at checkout · verified Stripe webhook signatures · ownership checks in `/api/portal/*` · frozen address snapshots on orders · solid metadata base · compliance scaffolding (privacy requests, consent logs, TCPA pages).

---

*Source: `[C] Site Assessment 2026-06-15.md` plus 2026-06-16 repo inspection, email, Sequenzy, admin dashboard, R2/digital delivery, and customer portal mobile work. Re-prioritize with "check todos".*
