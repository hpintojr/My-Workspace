# Benny & Penny's Adventures — Backlog & Launch Checklist

Derived from `[C] Site Assessment 2026-06-15.md` and updated with June 16 mobile/admin progress. Check items off as completed.
Severity: 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

## 🔴 LAUNCH BLOCKERS (must fix before public launch)

- [x] 🔴 **Add access control to every Payload collection.** No collection has `access` rules; REST/GraphQL is fully exposed, so any logged-in customer can read/write all data (orders, addresses, user PII, R2 download keys). Add `isAdmin` / `isAdminOrSelf` helpers and apply per collection. (Assessment 2.1)
- [x] 🔴 **Guard the `users.role` field** so only admins can change it (prevents customer → admin self-escalation). (2.1)
- [x] 🔴 **Add `access.admin` role gate on `users`** so only `role: admin` can reach `/admin`. (2.1)
- [ ] 🔴 **Verify the lockdown live:** as a customer, `fetch('/api/orders')` returns only own rows; `PATCH /api/users/<id>` with `{role:'admin'}` denied; `/admin` rejects customer login. (2.1)
- [x] 🟠 **Delete or disable setup/debug routes** in production: `setup-payload*`, `debug-books`, `debug-payload-books`; move any kept reconcile to header-only auth. (2.2)
- [x] 🟠 **Ship missing assets** referenced in `layout.tsx`: `og-image.png` (1200×630), `favicon.png`, `apple-touch-icon.png`. Currently 404. (3 / 8)
- [x] 🟠 **Add baseline security headers site-wide** (HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, CSP); consolidate the duplicated admin CSP. (2.5)
- [ ] 🔴 **Finish admin dashboard mobile remediation.** Sidebar and search are now much improved, but latest screenshots showed data inside dashboard cards still stacking instead of using the right side of the cards. Active blocker is validating the new final row-layout stylesheet for System Status, Recent Orders, and Community Growth.

---

## 🟠 LAUNCH-QUALITY (do next)

- [x] 🟠 **`app/sitemap.ts`** listing home, books index, each book, for-parents, contact, legal. (8)
- [x] 🟠 **`app/robots.ts`** allowing crawl + AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended), pointing to sitemap. (8 / 9)
- [x] 🟠 **JSON-LD structured data:** `Organization`/`WebSite` (home), `Book`+`Offer` (product pages), `BreadcrumbList`, `FAQPage`. (8 / 9)
- [x] 🟠 **`public/llms.txt`** — plain-text site map for AI engines. (9)
- [x] 🟠 **Set-password-on-thank-you-page** (session-id-gated) — biggest registration UX win, shippable before Mailjet. (7)
- [x] 🟡 **R2 digital delivery:** create bucket + token, S3-compatible client, signed-URL download endpoint, admin upload path; auto-create `downloads` on webhook. (6 #2)
- [x] 🟡 **API-side bot/spam protection** on `/api/contact`, `/api/subscribe`, `/api/privacy-request`: honeypot detection, optional Turnstile verification path, and per-IP rate limits. Deployed READY on commit `fd20a61bf8662ec62f42bf736ea83593a8a55029`. (2.4)
- [x] 🟡 **Transactional email brand header:** shared email layout updated to match site-style hierarchy: `Benny & Penny` / `♥ Adventures ♥` / `MEDICAL BOOKS FOR BRAVE LITTLE HEARTS`. Commit `d8d1bd00eb19a19be7f93af6c732b242863637c2`.
- [x] 🟡 **Admin System Status Check:** added Sequenzy API above Mailjet with supplied logo. Commit `f4ca40c5ada3a00cb46f16ff4fe6d334846f4711`.
- [x] 🟡 **Payload admin dashboard export fix:** `BeforeDashboard` now supports Payload's named import and the default export. Commit `03ee988c6437d9d1a20c612689be2a7ccb5d5c43` was confirmed READY.
- [x] 🟡 **Admin search/sidebar mobile pass:** mobile sidebar transition/scroll improved, search moved below greeting structurally, and text-width caps removed from admin dashboard. Needs continued row-layout validation.
- [x] 🟡 **Customer portal mobile pass — phase 1:** session bar, Orders page, and Library page were patched for mobile stacking, horizontal overflow, and long text handling. Needs real-device validation before closing completely.
- [ ] 🟡 **Customer portal mobile validation:** test Portal Home, Orders, Library, Gifts, and Addresses on iPhone Safari, Chrome Mobile, and iPad portrait.
- [ ] 🟡 **Frontend bot/spam protection wiring:** add hidden honeypot fields to public forms, add frontend challenge widget/token support, and end-to-end test contact/newsletter/privacy request submissions. (2.4)
- [ ] 🟡 **Resolve catalog dual-source-of-truth** (static `lib/books.ts` vs Payload `books`); make Payload canonical or document pricing source. (3)
- [ ] 🟡 **Per-page metadata + canonicals** on books index, for-parents, contact, legal; add Twitter card. (8)
- [ ] 🟡 **Throttle/gate thank-you fulfillment fallback;** keep webhook primary. (2.3)

---

## 🟡 ADMIN MOBILE REMEDIATION — ACTIVE BLOCKER

Files involved:

```txt
app/(payload)/components/BeforeDashboard.tsx
app/(payload)/components/BeforeDashboard.scss
app/(payload)/components/RegionCompact.scss
app/(payload)/admin-polish-overrides.scss
app/(payload)/admin-dashboard-mobile-rows.scss
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
- Added `admin-dashboard-mobile-rows.scss` and imported it last in Payload layout to restore table-like row layouts inside mobile cards.

Still open:

- Validate final row-layout override on phone after deployment.
- Confirm System Status `ONLINE` badges remain in the right column instead of stacking.
- Confirm Recent Orders rows use order/customer, date, status, and total columns instead of stacking.
- Confirm Community Growth subscriber rows use subscriber/date/status columns instead of stacking.
- Confirm no regression to sidebar/hamburger/search behavior.
- Validate iPhone Safari, Chrome Mobile, and iPad portrait.

Next actions:

1. Check Vercel deployment for `a55194a092729fcd645070019cb35c01a12498e3` after the normal delay.
2. Test admin dashboard on phone.
3. Review System Status, Recent Orders, and Community Growth row layouts.
4. If row layout is still not correct, inspect final CSS cascade and consider a JSX-level table/grid structure for those cards.
5. Only after admin mobile is stable, move to portal validation.

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
- [ ] 🟢 **Remove stray `public/images/hero-family.png.bak`.** (3)
- [ ] 🟢 **Per-condition landing pages** (`/help/ports`, `/help/infusions`, …) + FAQ content for SEO + AI. (9)

---

## Already strong (keep)

Server-side price validation at checkout · verified Stripe webhook signatures · ownership checks in `/api/portal/*` · frozen address snapshots on orders · solid metadata base · compliance scaffolding (privacy requests, consent logs, TCPA pages).

---

*Source: `[C] Site Assessment 2026-06-15.md` plus 2026-06-16 email, Sequenzy, admin dashboard, and customer portal mobile work. Re-prioritize with "check todos".*
