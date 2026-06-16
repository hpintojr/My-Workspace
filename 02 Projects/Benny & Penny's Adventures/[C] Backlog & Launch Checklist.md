# Benny & Penny's Adventures — Backlog & Launch Checklist

Derived from `[C] Site Assessment 2026-06-15.md`. Check items off as completed.
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

---

## 🟠 LAUNCH-QUALITY (do next)

- [x] 🟠 **`app/sitemap.ts`** listing home, books index, each book, for-parents, contact, legal. (8)
- [x] 🟠 **`app/robots.ts`** allowing crawl + AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended), pointing to sitemap. (8 / 9)
- [x] 🟠 **JSON-LD structured data:** `Organization`/`WebSite` (home), `Book`+`Offer` (product pages), `BreadcrumbList`, `FAQPage`. (8 / 9)
- [x] 🟠 **`public/llms.txt`** — plain-text site map for AI engines. (9)
- [x] 🟠 **Set-password-on-thank-you-page** (session-id-gated) — biggest registration UX win, shippable before Mailjet. (7)
- [x] 🟡 **R2 digital delivery:** create bucket + token, S3-compatible client, signed-URL download endpoint, admin upload path; auto-create `downloads` on webhook. (6 #2)
- [x] 🟡 **API-side bot/spam protection** on `/api/contact`, `/api/subscribe`, `/api/privacy-request`: honeypot detection, optional Turnstile verification path, and per-IP rate limits. Deployed READY on commit `fd20a61bf8662ec62f42bf736ea83593a8a55029`. (2.4)
- [ ] 🟡 **Frontend bot/spam protection wiring:** add hidden honeypot fields to public forms, add frontend challenge widget/token support, and end-to-end test contact/newsletter/privacy request submissions. (2.4)
- [ ] 🟡 **Resolve catalog dual-source-of-truth** (static `lib/books.ts` vs Payload `books`); make Payload canonical or document pricing source. (3)
- [ ] 🟡 **Per-page metadata + canonicals** on books index, for-parents, contact, legal; add Twitter card. (8)
- [ ] 🟡 **Throttle/gate thank-you fulfillment fallback;** keep webhook primary. (2.3)

---

## 🟡 POST-LAUNCH / ONGOING

- [x] 🟡 **Promotions Phase 1 — discount codes:** `promotions` collection synced to Stripe coupons/promo codes; admin UI. (Checkout already accepts codes via `allow_promotion_codes`.) See `[C] Promotions, Gifting & Access Grants Plan.md`.
- [x] 🟡 **Gifting Phase 2 — gift a licensed download:** `gifts` collection + giftable-balance, redemption page, access-grant creation, Library surfacing of grants. Captures gifted recipients as consented leads.
- [ ] 🟢 **Gifting Phase 3 — marketing automation:** tag + nurture gifted recipients; attribution reporting.

- [ ] 🟡 **Email automations E2E:** receipt + set-password link, gift-redeemed confirmation, password reset, dunning, review request. Provider helpers are wired; needs live testing.
- [ ] 🟡 **POD/Lulu automation:** create print job from frozen address snapshot on paid physical order; write tracking back + email. (6 #3)
- [ ] 🟡 **Admin actions:** Stripe refund button, resend receipt, regenerate download access; write privileged actions to `audit-logs`. (5)
- [ ] 🟡 **Customer support workflow:** portal "Contact support" action that opens a `support-ticket`. (5)
- [ ] 🟢 **Accessibility pass:** contrast, focus styles, `aria-live` on form status, label association on address selects. (4)
- [ ] 🟢 **Performance/CWV:** `next/image` for hero/character art, width/height, WebP/AVIF, preload hero. (8)
- [ ] 🟢 **Consolidate admin CSS** (5 overlapping `admin-*.scss`). (3)
- [ ] 🟢 **Order-number generation:** move to DB sequence / unique-constraint-with-retry before volume. (3)
- [ ] 🟢 **Reuse Stripe customer:** store `stripeCustomerId` on user to avoid duplicate Stripe customers. (3)
- [ ] 🟢 **Remove stray `public/images/hero-family.png.bak`.** (3)
- [ ] 🟢 **Per-condition landing pages** (`/help/ports`, `/help/infusions`, …) + FAQ content for SEO + AI. (9)

---

## Already strong (keep)

Server-side price validation at checkout · verified Stripe webhook signatures · ownership checks in `/api/portal/*` · frozen address snapshots on orders · solid metadata base · compliance scaffolding (privacy requests, consent logs, TCPA pages).

---

*Source: `[C] Site Assessment 2026-06-15.md`. Re-prioritize with "check todos".*
