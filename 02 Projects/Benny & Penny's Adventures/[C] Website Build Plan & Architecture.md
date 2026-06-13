---
type: build-plan
project: Benny & Penny's Adventures
date: 2026-06-10
author: Claude
status: architecture locked
---

# Website Build Plan & Architecture

**Locked stack:** custom branded **Next.js** site with **Payload CMS** (open-source) as the backbone, on **Vercel**, via **GitHub**, DNS + storage on **Cloudflare**. Ebook delivered securely from **Cloudflare R2**; payments via **Stripe**. Print-on-demand vendor (Lulu vs. BookVault) to be chosen later. Hamilton is sole admin/developer.

## Architecture at a glance

```
Visitor → bennyandpennyadventures.com  (Next.js + Payload on Vercel; DNS via Cloudflare)
   │
   ├── Browse books            → Payload-managed catalog (books = CMS content)
   │
   ├── Buy EBOOK  → Stripe Checkout → webhook → Payload grants access
   │                              → buyer gets a SIGNED, time-limited link to the PDF in Cloudflare R2
   │
   ├── Buy PRINT  → Stripe Checkout → webhook → [POD vendor API — Lulu/BookVault, added later]
   │
   └── Join email list → signup form (provider TBD)
```

- **Why Payload:** one open-source system = your CMS (manage books/pages), your store (Stripe-synced products/orders), auth, and gated digital delivery — native to Next.js, no SaaS lock-in.
- **Ebook security:** files live in a private R2 bucket; the app issues short-lived signed URLs per purchase. Add a download limit and stamp the buyer's email into the PDF (in the webhook) to deter resharing.
- **Funds:** Stripe secures payment up front. For print later, the POD vendor charges only print+ship after the API order; you keep the margin.

## Tech stack
- **Next.js (App Router) + TypeScript**, **Tailwind CSS**.
- **Payload CMS 3** (runs inside the Next.js app) — open-source, self-hosted.
- **Postgres** (managed free tier — Neon or Supabase) for Payload's data.
- **Cloudflare R2** for ebook PDFs (10GB free, zero egress) + signed URLs.
- **Stripe Checkout** + webhook route for fulfillment.
- **GitHub** repo → **Vercel** auto-deploy.
- Email list provider: **Mailjet** (chosen) — has a free tier + transactional + contact-list API.
- POD: **Lulu or BookVault API** — decided later.

## Running cost (low volume)
- Stripe: $0/mo (~2.9% + $0.30 per sale).
- Cloudflare R2 + DNS: ~$0 (within free tier).
- Postgres (Neon/Supabase free tier): $0.
- Vercel: free during build (Hobby); **$20/mo Pro** once it's a live commercial store.
- **≈ $20/mo all-in at launch**, $0 while building.

## Phase 0 — Provision (do these first)
- [x] Create a **GitHub** repo for the site → https://github.com/hpintojr/bennyandpennyadventures
- [ ] Create a **Vercel** account, linked to GitHub (stay on free Hobby until launch).
- [ ] Create a free **Postgres** database (Neon or Supabase) — grab the connection string.
- [ ] Create a **Cloudflare R2** bucket (private) — grab access key id/secret + endpoint.
- [ ] Create a **Stripe** account (test mode) — grab publishable + secret keys, set up webhook signing secret.
- [ ] Gather **content**: homepage draft, and for books 1 & 2 — title, description, cover image, interior **PDF**, ebook price (print price later).

## Build phases
1. **Scaffold** — Payload + Next.js + Tailwind; connect Postgres; global layout, nav/footer, brand theme.
2. **Homepage** — built from your draft.
3. **Books in the CMS** — a `Books` collection (title, slug, description, cover, PDF-in-R2, ebook price, Stripe link). Add books 1 & 2.
4. **Catalog + book detail pages** — data-driven from the collection.
5. **Stripe Checkout** — ebook products/prices, success/cancel pages.
6. **Ebook delivery** — webhook grants access + issues signed R2 link; optional email-stamp/watermark + download limit.
7. **Email list** — signup capture (home + footer).
8. **Deploy** — connect `bennyandpennyadventures.com` via Cloudflare; go Vercel Pro at launch.
9. **POD (later)** — choose Lulu/BookVault; wire Stripe webhook → print API.
10. **Polish** — SEO, metadata, analytics, privacy/terms.

## Open technical decisions (resolve in-phase)
- Neon vs. Supabase for Postgres (both free; Supabase also gives storage/auth if ever useful).
- Cart model: single-item Checkout to launch (simplest) vs. multi-item cart later.
- Email provider (Phase 7).
- POD vendor + print margins (Phase 9 — I'll pull real costs then).
