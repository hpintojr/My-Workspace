---
type: asset-list
project: Benny & Penny's Adventures
date: 2026-06-10
updated: 2026-06-13
author: ChatGPT
---

# Image Asset List — Website and Product Catalog

All images live in **`public/images/`** for now. Next.js serves them from `/images/...`.

Payload Books currently stores image path fields so the product pages can later be fully managed from the backend:

```txt
coverImage
coverImagePath
pagePreviewOne
pagePreviewTwo
```

The public `/books` and `/books/[slug]` pages have been wired to read catalog data from Payload/Neon with local fallback data.

## Homepage

| What | Filename | Export size (px) | Aspect | Notes |
|---|---|---:|---|---|
| Hero family illustration | `hero-family.png` | 1600 × 1080 | ~3:2 landscape | Desktop hero scene. |
| Mobile hero family illustration | `hero-family_mb.png` | 900 × 1200+ | portrait/mobile | Used by mobile homepage hero if present. |
| Author illustration | `author-michelle.png` | 1200 × 1400 | portrait | Meet the Author image. |
| Family portrait — Michelle | `michelle.png` | 600 × 600 | square | Family card. |
| Family portrait — Hamilton | `hamilton.png` | 600 × 600 | square | Family card. |
| Family portrait — Charlie | `charlie.png` | 600 × 600 | square | Family card. |
| Family portrait — Mary | `mary.png` | 600 × 600 | square | Family card. |
| Family portrait — Penelope | `penelope.png` | 600 × 600 | square | Family card. |
| Family portrait — Benjamin | `benjamin.png` | 600 × 600 | square | Family card. |
| Value pillar icon 1 — Made Friendly | `icon-friendly.png` | 256 × 256 | square | Transparent PNG. |
| Value pillar icon 2 — Written by a Nurse | `icon-nurse.png` | 256 × 256 | square | Transparent PNG. |
| Value pillar icon 3 — Built for Brave Kids | `icon-brave.png` | 256 × 256 | square | Transparent PNG. |
| Value pillar icon 4 — Real Medical Journeys | `icon-journeys.png` | 256 × 256 | square | Transparent PNG. |
| Value pillar icon 5 — Education/Comfort/Empower | `icon-empower.png` | 256 × 256 | square | Transparent PNG. |

## Books Page / Product Detail Pages

| What | Filename | Export size (px) | Aspect | Status |
|---|---|---:|---|---|
| Book 1 cover — Home Infusion Day | `book-1.png` | 900 × 1200 | 3:4 portrait | Art ready. |
| Book 2 cover — Port Adventure | `book-2.png` | 900 × 1200 | 3:4 portrait | Art ready. |
| Book 3 cover — PICC Line Adventure | `book-3.png` | 900 × 1200 | 3:4 portrait | Art ready. |
| Book 4 cover — Special Line Adventure | `book-4.png` | 900 × 1200 | 3:4 portrait | Art ready. |
| Book 5 cover — MRI Adventure | `book-5.png` | 900 × 1200 | 3:4 portrait | Needed. |
| Book 6 cover — Hospital Sleepover | `book-6.png` | 900 × 1200 | 3:4 portrait | Needed. |
| Book 7 cover — Ambulance Adventure | `book-7.png` | 900 × 1200 | 3:4 portrait | Needed. |
| Book 8 cover — Surgery Day | `book-8.png` | 900 × 1200 | 3:4 portrait | Needed. |
| Book 9 cover — Lab Draw Adventure | `book-9.png` | 900 × 1200 | 3:4 portrait | Needed. |

Inside page preview convention used by product pages:

```txt
/images/book-1-page-1.png
/images/book-1-page-2.png
/images/book-2-page-1.png
/images/book-2-page-2.png
```

Create two preview images per book as interior samples become available.

## Payload Catalog Image Fields

For each book record, store:

```txt
coverImage=/images/book-1.png
coverImagePath=/images/book-1.png
pagePreviewOne=/images/book-1-page-1.png
pagePreviewTwo=/images/book-1-page-2.png
```

Future improvement:

- Move to a real Payload Media collection or external image storage once the backend is stable.
- Keep public image paths for now so the site remains simple on Vercel.

## For Parents Page

| What | Filename | Export size (px) | Aspect | Notes |
|---|---|---:|---|---|
| Printable preview — Coloring Pages | `printable-coloring.png` | 800 × 600 | 4:3 | Thumbnail of the coloring PDF. |
| Printable preview — Bravery Chart | `printable-bravery.png` | 800 × 600 | 4:3 | Thumbnail of the chart PDF. |
| Printable preview — Activities | `printable-activities.png` | 800 × 600 | 4:3 | Thumbnail of the activities PDF. |

Downloadable PDF placeholders in `public/downloads/`:

```txt
coloring-pages.pdf
bravery-chart.pdf
activities.pdf
```

## Branding / Site-Wide

| What | Filename | Export size (px) | Notes |
|---|---|---:|---|
| Favicon | `favicon.png` plus `.ico` | 512 × 512 | Browser tab icon. |
| Apple touch icon | `apple-touch-icon.png` | 180 × 180 | iOS home-screen icon. |
| Social share image | `og-image.png` | 1200 × 630 | Link preview image. |

## Current Asset QA Notes

- Verify public routes after the `(frontend)` route-group move.
- Make sure `/books` and `/books/[slug]` still find the cover images after the Payload data loader runs.
- Confirm all needed `book-X-page-1.png` and `book-X-page-2.png` files either exist or gracefully show placeholders.
- Keep paid PDF, EPUB, and audiobook files out of public assets once real sales begin. They should move to private Cloudflare R2.
