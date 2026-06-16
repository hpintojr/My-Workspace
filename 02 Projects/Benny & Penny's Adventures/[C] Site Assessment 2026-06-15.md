# Benny & Penny's Adventures — Full Site Assessment

**Prepared:** 2026-06-15
**Repo:** `hpintojr/bennyandpennyadventures` (Next.js 15 App Router + Payload CMS 3 + Neon Postgres + Stripe + Cloudflare R2 planned)
**Scope:** Security, bugs/code quality, customer & admin UX, automation, SEO + AI answer-engine optimization.
**Codebase size at review:** ~8,100 lines across `app/`, `collections/`, `lib/`.

> How to read this: items are tagged **[CRITICAL] / [HIGH] / [MEDIUM] / [LOW]**. Fix CRITICAL and HIGH before any public launch. A prioritized action plan is at the end.

---

## 1. Executive Summary

The site is in good architectural shape for its stage: clean separation of collections, server-side price validation at checkout, correct Stripe webhook signature verification, a working customer portal with ownership-checked APIs, and a solid metadata base. The build quality of the custom portal routes is genuinely above average.

**However, there is one launch-blocking security issue:** none of the Payload collections define access control, and the Payload REST/GraphQL API is fully mounted. Because customers authenticate against the same `users` collection as admins, **any logged-in customer can read and write every collection through the raw API** — other people's orders, addresses, user PII, and the Downloads records that will hold R2 file keys — and can likely escalate their own role to admin. This must be fixed before launch and is straightforward to fix.

Secondary priorities: remove/lock the setup & debug routes and rotate the exposed setup secret; add a sitemap/robots/structured-data/AI layer (currently absent); add bot/spam protection to public forms; and ship the missing OG/favicon assets.

---

## 2. Security

### 2.1 [CRITICAL] No access control on any collection — full API exposure + privilege escalation

**Finding.** Every collection (`users`, `orders`, `order-items`, `customer-addresses`, `downloads`, `subscribers`, `support-tickets`, `support-messages`, `access-grants`, `audit-logs`, `consent-logs`, `privacy-requests`, `contact-submissions`, `books`) is defined with **no `access` property**. The Payload REST API is mounted at `app/(payload)/api/[...slug]/route.ts` (GET/POST/PATCH/PUT/DELETE) and GraphQL is available by default.

Payload's default access, when none is specified, grants the operation to **any authenticated user** (`Boolean(req.user)`). Customers log in through the portal (`/api/users/login`) against the same `users` collection and receive a `payload-token` cookie. That cookie authenticates raw API calls.

**Impact.**
- A logged-in customer can `GET /api/orders`, `/api/customer-addresses`, `/api/users`, `/api/downloads`, `/api/consent-logs`, etc. and read **all customers' data** — names, emails, phones, addresses, purchase history, and the `r2ObjectKey` values that will point at paid files.
- A logged-in customer can `PATCH /api/users/<their id>` and set `role: "admin"` (the `role` field has no field-level access control) — **full privilege escalation**.
- A customer account may even be able to log into `/admin`, because there is no `access.admin` function on `users` restricting the panel to `role === "admin"`.
- Create/update/delete is similarly open: a customer could tamper with orders, downloads limits, or delete records.

**This is OWASP A01: Broken Access Control, and it is the single most important issue in the codebase.**

**Remediation (add explicit access to every collection).** Create one shared helper and apply it:

```ts
// lib/access.ts
import type { Access } from "payload";

export const isAdmin: Access = ({ req: { user } }) => user?.role === "admin";

// Customer can read only their own rows; admins read all.
export const isAdminOrSelf =
  (userField = "customer"): Access =>
  ({ req: { user } }) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    return { [userField]: { equals: user.id } }; // Payload query-constraint = row filter
  };

export const adminOnly = { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin };
```

Then, per collection:

```ts
// Orders, CustomerAddresses, Downloads, OrderItems(*) — customer-owned data
access: {
  read: isAdminOrSelf("customer"),
  create: isAdmin,          // created server-side via fulfillment (overrideAccess) only
  update: isAdmin,
  delete: isAdmin,
}
// Books — public catalog
access: { read: () => true, create: isAdmin, update: isAdmin, delete: isAdmin }
// Users
access: {
  read: isAdminOrSelf("id"),
  create: isAdmin,
  update: isAdminOrSelf("id"),
  delete: isAdmin,
  admin: ({ req: { user } }) => user?.role === "admin", // gate the /admin panel
}
// subscribers, contact-submissions, privacy-requests, consent-logs, support-*, audit-logs, access-grants
access: adminOnly   // writes happen server-side with overrideAccess in your route handlers
```

Notes:
- `OrderItems` has no direct `customer` field; restrict read to admins, or add a customer relationship / use an access function that joins through the parent order. Simplest safe default now: `adminOnly` for `order-items` and keep serving line items to customers through your existing ownership-checked `/api/portal/*` routes.
- Your server routes that legitimately write as the system (fulfillment, contact, subscribe, privacy) call the Payload **Local API**, which bypasses access control by default — so locking these down will **not** break those flows. Double-check each Local API call; add `overrideAccess: true` only where intended.
- Field-level: explicitly protect `users.role` so only admins can change it:
  ```ts
  { name: "role", ..., access: { update: isAdmin, create: isAdmin } }
  ```

**Verification after fix.** Log in as a `customer`, then from the browser console run `fetch('/api/orders').then(r=>r.json())` — it should return only that customer's orders (or 403), not all of them. Try `PATCH /api/users/<id>` with `{role:'admin'}` — should be denied. Confirm `/admin` rejects a customer login.

---

### 2.2 [HIGH] Setup & debug routes live in production; setup secret passed via query string and already exposed

**Finding.** `app/api/setup-payload*`, `app/api/debug-books`, `app/api/debug-payload-books`, and `app/api/reconcile-stripe-order` are gated by `PAYLOAD_SETUP_SECRET` supplied as `?secret=...` in the URL. The secret has already been exposed in screenshots/URLs (noted in prior daily logs).

**Impact.** Query-string secrets are written to server logs, Vercel request logs, browser history, and `Referer` headers, so they leak easily. These routes can re-seed the catalog, mutate preferences/system records, and reconcile arbitrary Stripe sessions. With the secret known, they are effectively unauthenticated admin actions.

**Remediation.**
1. **Rotate `PAYLOAD_SETUP_SECRET`** in Vercel now (was deferred — this is the reminder; it is due).
2. **Delete the setup/debug routes** before production, or guard them behind `NODE_ENV !== "production"`.
3. For anything that must remain (e.g., manual reconcile), accept the secret via a header (`x-setup-secret`) only, never a query param, and prefer making the Stripe **webhook the single source of truth** so manual reconcile isn't needed.

---

### 2.3 [MEDIUM] Thank-you page triggers fulfillment on any `session_id`, unauthenticated and unthrottled

`/thank-you?session_id=cs_...` calls `fulfillCheckoutSessionById()` directly on load. It's idempotent and only fulfills *paid* sessions, so data risk is low, but it lets anyone trigger Stripe API calls by spamming session ids (cost/DoS vector) and makes the fallback do the webhook's job. Keep the webhook as primary; on the thank-you page, only *read* the order by session id, and rate-limit/My-account-gate the fallback.

### 2.4 [MEDIUM] No bot/spam protection on public writes

`/api/contact`, `/api/subscribe`, `/api/privacy-request` write to the DB (and will later send email) with no captcha, honeypot, or rate limiting. Expect spam and junk consent records, and — once Mailjet is live — potential abuse as a mail relay. Add a honeypot field + Cloudflare Turnstile (free) + simple per-IP rate limiting (e.g., Upstash Ratelimit).

### 2.5 [MEDIUM] Security headers only cover `/admin`

CSP is applied to `/admin` (twice — in both `middleware.ts` and `next.config.mjs`, which is redundant). The public site has no CSP, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, or `X-Frame-Options`. Add a baseline security-header set for all routes in `next.config.mjs` and consolidate the duplicated admin CSP into one place.

### 2.6 [LOW] Misc
- Confirm `.env` / real keys are git-ignored (they appear to be) and that no secret is committed. Keep the CLAUDE.md rule.
- GraphQL endpoint is exposed with the same default-access problem; 2.1's fix covers it, but consider disabling GraphQL if unused.

---

## 3. Bugs & Code Quality

- **[HIGH] Missing referenced assets.** `layout.tsx` points to `/images/og-image.png`, `/images/favicon.png`, `/images/apple-touch-icon.png`; none exist in `public/images/`. Result: broken favicon, broken social share preview. Ship these assets (1200×630 OG, 512/192 icons, favicon).
- **[MEDIUM] Dual source of truth for the catalog.** Books exist both as a static array in `lib/books.ts` (used for checkout pricing/validation) and in the Payload `books` collection (admin-managed). They can drift — an admin price change in Payload won't affect checkout, which reads the static file. Decide on one source: ideally Payload is canonical and `lib/books.ts`/`payloadBooks.ts` reads from it at build/request time. At minimum, document that prices are controlled in `lib/books.ts`.
- **[MEDIUM] Admin CSS debt.** Five overlapping `admin-*.scss` override files plus `custom.scss` fight each other (already noted in your logs). Consolidate into one stylesheet to stop regressions.
- **[LOW] `hero-family.png.bak`** committed in `public/images/` — remove stray backup.
- **[LOW] Order number generation** loads up to 1000 orders and computes max sequence in app code. Fine now; will get slow and is race-prone under concurrency. Move to a DB sequence or unique-constraint-with-retry before volume.
- **[LOW] Stripe customer per checkout.** Saved-address checkout (and the prior `customer_creation: "always"`) creates a new Stripe Customer each time. Store `stripeCustomerId` on the user and reuse it to avoid Stripe-side duplicates.
- **Positive:** checkout prices are computed server-side from your own catalog (clients can't tamper with amounts); webhook verifies signatures; portal APIs check ownership. Keep these patterns.

---

## 4. Customer UX

- **[HIGH] Account creation is invisible to the buyer.** Accounts are created during fulfillment with a random password, but there's no welcome/activation email (blocked on Mailjet) and no on-site prompt telling the customer they *have* a portal or how to set a password. Today a buyer can't actually get in without an admin manually setting a password. This is the biggest UX gap — see the registration-flow note you asked for (section 7).
- **[MEDIUM] Library access buttons show "pending."** PDF/EPUB/audiobook buttons display status labels but don't deliver yet (R2 not wired). Fine for now; this is the next build.
- **[MEDIUM] Guest vs. account clarity.** The cart now prompts guests to sign in for saved addresses — good. Add a clear "create an account to track orders & access downloads" value prop at/after checkout.
- **[LOW] Empty/loading/error states** exist in portal clients — good. Consider skeleton loaders over text for polish.
- **[LOW] Accessibility pass** recommended pre-launch: color contrast on coral/teal, focus styles on custom buttons, `aria-live` on form success/error, label association on the new address selects.

---

## 5. Admin / Operator UX

- The custom sidebar, live dashboard, and compliance links are strong. Keep going.
- **[HIGH after 2.1] Role gating.** Once access control lands, verify the panel only admits admins and that customers never see `/admin`.
- **[MEDIUM] Order operations.** Add admin actions for refunds (Stripe refund button), resend-receipt, and "regenerate download access." These are high-leverage once R2 + Mailjet exist.
- **[MEDIUM] Support workflow.** `support-tickets` / `support-messages` collections exist but no customer-facing support form/portal page yet. Wire a "Contact support" portal action that opens a ticket.
- **[LOW] Audit logs.** `audit-logs` collection exists — ensure privileged actions (refunds, role changes, download regeneration) write to it.

---

## 6. Automation Opportunities (ranked by leverage)

1. **Order lifecycle emails (needs Mailjet):** receipt/confirmation, account-activation/set-password, download-ready, shipping confirmation (POD), refund notice. This single stream removes most manual customer touches.
2. **Digital delivery automation (R2):** on `checkout.session.completed`, auto-create `downloads` records with signed, expiring access and email the link. No human in the loop for digital orders.
3. **POD/Lulu automation:** on paid physical order, create the Lulu print job from the frozen address snapshot; write tracking back to the order and email the customer.
4. **Abandoned cart / post-purchase nurture:** Mailjet automations keyed off subscriber + order events.
5. **Review/feedback request** X days after delivery → feeds testimonials + SEO.
6. **Inventory/price as data:** make Payload the catalog source so marketing/price changes propagate without code deploys.
7. **Scheduled ops digest:** a daily/weekly "orders, revenue, failed payments, new tickets" summary (can be a scheduled task feeding email or Slack).
8. **Dunning:** auto-handle `payment_intent.payment_failed` (currently only logged) with a retry/notify flow.

---

## 7. Registration / Profile Flow (your specific question)

**How it works today:** There is no self-serve registration. A `users` row is created *during Stripe fulfillment* with a random password. The portal login page exists, but a buyer has no password and no email to set one, so in practice an admin must set it manually. Net effect: the "account" is invisible and unusable to the customer at the moment of purchase.

**Recommended funnel (clear + low-friction):**
1. **At checkout:** capture email (Stripe already does). Don't force account creation before payment — keep guest checkout.
2. **Immediately after payment (thank-you page):** show "Your account is ready — set your password" with a one-click **set-password link** (tokenized, emailed via Mailjet once live; meanwhile show an on-page set-password form gated by the session id). This converts the silent account into a usable one at the moment of highest intent.
3. **Welcome email (Mailjet):** "Access your books & orders" with the portal link.
4. **Returning customers:** standard email + password login (already built) plus "forgot password" (needs Mailjet).
5. **Optional public sign-up** later, but the purchase-driven flow above covers 95% of value with the least friction.

This is mostly **blocked on Mailjet** for the email pieces, but the **set-password-on-thank-you-page** step can ship now (session-id-gated) and is the single biggest UX win for registration. Build it alongside R2.

---

## 8. SEO

**Present & good:** `metadataBase`, title template, description, Open Graph block, per-product `generateMetadata` on `/books/[slug]`.

**Missing (all recommended before/at launch):**
- **[HIGH] `sitemap.ts`** (App Router `app/sitemap.ts`) listing home, books index, each book, for-parents, contact, legal pages.
- **[HIGH] `robots.ts`** allowing crawl + pointing to the sitemap (and see AI section for crawler specifics).
- **[HIGH] Structured data (JSON-LD)** — none today. Add:
  - `Organization` / `WebSite` (with `SearchAction`) on the homepage.
  - `Book` / `Product` + `Offer` (price, availability) on each product page → eligible for rich results.
  - `BreadcrumbList` on product/section pages.
  - `FAQPage` on For Parents / book pages (great for both Google and AI).
- **[HIGH] Ship OG image + favicons** (currently 404 — also an SEO/social bug).
- **[MEDIUM] Per-page metadata + canonicals** on books index, for-parents, contact, legal (only the product page has custom metadata now).
- **[MEDIUM] Twitter card** metadata (`twitter: { card: "summary_large_image" }`).
- **[MEDIUM] Image alt text & semantic headings** audit (one `h1` per page, descriptive alts — matters for accessibility and SEO).
- **[LOW] Performance/Core Web Vitals**: use `next/image` for the PNG hero/character art, set width/height, preload the hero, and serve WebP/AVIF.

**Example primitives:**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { books } from "@/lib/books";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://bennyandpennyadventures.com";
  const staticRoutes = ["", "/books", "/for-parents", "/contact", "/privacy", "/terms"]
    .map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 }));
  const bookRoutes = books.map((b) => ({ url: `${base}/books/${b.slug}`, changeFrequency: "weekly" as const, priority: 0.8 }));
  return [...staticRoutes, ...bookRoutes];
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://bennyandpennyadventures.com";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/portal"] },
      // AI answer engines (see section 9):
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
```

```tsx
// JSON-LD for a book page — render in the page component
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org", "@type": "Book",
  name: book.title, author: { "@type": "Person", name: "Michelle ..." },
  about: "Pediatric medical experiences for children",
  offers: { "@type": "Offer", price: book.price, priceCurrency: "USD", availability: "https://schema.org/InStock" }
}) }} />
```

---

## 9. SEO for AI (Answer-Engine / Generative-Engine Optimization)

Goal: make the site easy for ChatGPT, Claude, Perplexity, Gemini, and AI search to *find, quote, and attribute* — because parents increasingly ask AI assistants "books to help my child with a port / infusion / hospital stay."

**Actions:**
- **[HIGH] Allow AI crawlers** explicitly in `robots.ts` (snippet above): `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`. (Decide deliberately — allowing them is what gets you cited.)
- **[HIGH] Add `public/llms.txt`** — a clean, plain-text map of the site for LLMs (an emerging convention). Example:

  ```
  # Benny & Penny's Adventures
  > Children's medical picture books that help kids understand infusions, ports, PICC lines, scans, and hospital stays.

  ## Books
  - /books/<slug>: <one-line description, audience, what medical experience it covers>

  ## For Parents
  - /for-parents: guidance for caregivers preparing a child for treatment

  ## Contact
  - /contact
  ```

- **[HIGH] Rich structured data** (section 8) does double duty: `Book`, `FAQPage`, `Organization` are exactly what AI engines parse to answer and cite.
- **[MEDIUM] Write answer-shaped content.** Add an FAQ/"How these books help with ___" section per condition (port, PICC, infusion, MRI/scan, surgery). Clear question→answer prose is what gets lifted into AI answers.
- **[MEDIUM] Semantic HTML & clean text.** Ensure the core content is server-rendered text (it is, via App Router) with proper headings and descriptive link text — AI crawlers don't run heavy JS reliably.
- **[MEDIUM] Entity clarity.** A consistent Organization/Author identity (same name, logo, sameAs links to social) across pages helps AI build a confident entity and attribute correctly.
- **[LOW] Per-condition landing pages** (e.g., `/help/ports`, `/help/infusions`) optimized for the long-tail questions parents actually ask — strong for both classic SEO and AI.

---

## 10. Prioritized Action Plan

**Before any public launch (blockers):**
1. [CRITICAL] Add access control to every collection + `users.role` field guard + `access.admin` role gate (2.1). Verify as customer.
2. [HIGH] Rotate `PAYLOAD_SETUP_SECRET`; delete/disable setup & debug routes (2.2).
3. [HIGH] Ship OG image + favicons (3 / 8).
4. [HIGH] Add baseline security headers site-wide (2.5).

**Launch-quality (do next):**
5. [HIGH] `sitemap.ts`, `robots.ts` (with AI crawlers), JSON-LD `Book`/`Organization`/`FAQPage` (8, 9).
6. [HIGH] `llms.txt` (9).
7. [HIGH] Set-password-on-thank-you-page step (7) — biggest registration UX win, shippable now.
8. [MEDIUM] R2 digital delivery + auto-create downloads on webhook (6 #2).
9. [MEDIUM] Bot/spam protection on public forms (2.4).
10. [MEDIUM] Resolve catalog dual-source-of-truth (3).

**Post-launch / ongoing:**
11. Mailjet email automations (lifecycle, dunning, reviews) (6).
12. POD/Lulu automation (6 #3).
13. Admin refund/resend/regenerate actions + audit logging (5).
14. Consolidate admin CSS; order-number sequence; reuse Stripe customer (3).
15. Per-condition landing pages + FAQ content (9).

---

## 11. What's Already Strong (keep doing)
- Server-side price validation at checkout (no client-trusted amounts).
- Verified Stripe webhook signatures.
- Ownership checks in custom `/api/portal/*` routes.
- Frozen address snapshots on orders (POD-safe).
- Solid metadata base and clean component structure.
- Thoughtful compliance scaffolding (privacy requests, consent logs, TCPA pages).

---

*This assessment is based on static review of the repository at the date above. The access-control finding (2.1) should be confirmed by the live test described, then fixed first.*
