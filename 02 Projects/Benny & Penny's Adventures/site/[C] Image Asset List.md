---
type: asset-list
project: Benny & Penny's Adventures
date: 2026-06-10
author: Claude
---

# Image Asset List — what's missing & exact specs

All images live in **`public/images/`** (Next.js serves them from `/images/...`). Sizes below are the **export sizes** — already ~2× the on-screen size so they stay crisp on retina/4K. Next.js `<Image>` will auto-resize down per device. PNG with transparency where noted; otherwise PNG or JPG/WebP are fine.

## Homepage

| What | Filename | Export size (px) | Aspect | Notes |
|---|---|---|---|---|
| Hero family illustration | `hero-family.png` | 1600 × 1080 | ~3:2 landscape | The couch scene with Benny, Penny + family. Fills the rounded hero panel. |
| Author illustration (Michelle at desk) | `author-michelle.png` | 1200 × 1400 | ~6:7 portrait | "Meet the Author" image. |
| Family portrait — Michelle | `michelle.png` | 600 × 600 | 1:1 square | Family card. |
| Family portrait — Hamilton | `hamilton.png` | 600 × 600 | 1:1 square | Family card. |
| Family portrait — Charlie | `charlie.png` | 600 × 600 | 1:1 square | Family card. |
| Family portrait — Mary | `mary.png` | 600 × 600 | 1:1 square | Family card. |
| Family portrait — Penelope | `penelope.png` | 600 × 600 | 1:1 square | Family card. |
| Family portrait — Benjamin | `benjamin.png` | 600 × 600 | 1:1 square | Family card. |
| Value pillar icon 1 — Made Friendly | `icon-friendly.png` | 256 × 256 | 1:1 square | **Transparent PNG.** Replaces the "Icon" placeholder. |
| Value pillar icon 2 — Written by a Nurse | `icon-nurse.png` | 256 × 256 | 1:1 square | Transparent PNG. |
| Value pillar icon 3 — Built for Brave Kids | `icon-brave.png` | 256 × 256 | 1:1 square | Transparent PNG. |
| Value pillar icon 4 — Real Medical Journeys | `icon-journeys.png` | 256 × 256 | 1:1 square | Transparent PNG. |
| Value pillar icon 5 — Education/Comfort/Empower | `icon-empower.png` | 256 × 256 | 1:1 square | Transparent PNG. |

## Books page

| What | Filename | Export size (px) | Aspect | Notes |
|---|---|---|---|---|
| Book 1 cover — Home Infusion Day | `book-1.png` | 900 × 1200 | 3:4 portrait | **Art ready.** |
| Book 2 cover — Port Adventure | `book-2.png` | 900 × 1200 | 3:4 portrait | **Art ready.** |
| Book 3 cover — PICC Line Adventure | `book-3.png` | 900 × 1200 | 3:4 portrait | **Art ready.** |
| Book 4 cover — Special Line Adventure | `book-4.png` | 900 × 1200 | 3:4 portrait | **Art ready.** |
| Book 5 cover — MRI Adventure | `book-5.png` | 900 × 1200 | 3:4 portrait | Needed. |
| Book 6 cover — Hospital Sleepover | `book-6.png` | 900 × 1200 | 3:4 portrait | Needed. |
| Book 7 cover — Ambulance Adventure | `book-7.png` | 900 × 1200 | 3:4 portrait | Needed. |
| Book 8 cover — Surgery Day | `book-8.png` | 900 × 1200 | 3:4 portrait | Needed. |
| Book 9 cover — Lab Draw Adventure | `book-9.png` | 900 × 1200 | 3:4 portrait | Needed. |

*The "Get the Full Series" mini covers reuse `book-1` … `book-9` — no new files.*

## For Parents page

| What | Filename | Export size (px) | Aspect | Notes |
|---|---|---|---|---|
| Printable preview — Coloring Pages | `printable-coloring.png` | 800 × 600 | 4:3 | Thumbnail of the coloring PDF. |
| Printable preview — Bravery Chart | `printable-bravery.png` | 800 × 600 | 4:3 | Thumbnail of the chart PDF. |
| Printable preview — Activities | `printable-activities.png` | 800 × 600 | 4:3 | Thumbnail of the activities PDF. |

*Downloadable files (PDFs, not images), in `public/downloads/`: `coloring-pages.pdf`, `bravery-chart.pdf`, `activities.pdf`.*

## Branding / site-wide (recommended)

| What | Filename | Export size (px) | Notes |
|---|---|---|---|
| Favicon | `favicon.png` (+ `.ico`) | 512 × 512 | Browser tab icon. |
| Apple touch icon | `apple-touch-icon.png` | 180 × 180 | Home-screen icon on iOS. |
| Social share image (Open Graph) | `og-image.png` | 1200 × 630 | Preview when the site is shared on social/text. |

## Count
- **Homepage:** 13 images (1 hero + 1 author + 6 family + 5 pillar icons)
- **Books:** 9 covers (4 ready, 5 needed)
- **For Parents:** 3 printable previews (+ 3 PDFs)
- **Branding:** 3 (favicon, apple-touch, og-image)

**Total images to supply: ~28** (plus 3 downloadable PDFs).

*Tip: keep originals larger and let Next.js downscale. Square portraits look best with the subject centered, since cards crop to a circle/square.*
