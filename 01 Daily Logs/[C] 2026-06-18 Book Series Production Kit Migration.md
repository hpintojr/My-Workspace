---
type: daily-log
date: 2026-06-18
project: Benny & Penny's Adventures Book Series
---

# 2026-06-18 — Book Series Production Kit Migration

## What happened
Hamilton provided a complete production kit as a zip
(`Benny-Penny-Complete-Production-Print-Digital-Audio-Multilingual-Kit-v2.zip`).
Reviewed it, confirmed it is high-quality and usable, and migrated it in as the canonical
structure for the **Benny & Penny's Adventures Book Series** project.

## What the kit contains
- Full numbered structure: `00-series-control` … `10-templates`, plus `99-inbox`.
- All 10 books scaffolded under `04-books/book-NN-<slug>/` with subfolders for manuscript,
  page briefs, Canva, Lulu print, digital, audio, localization (8 locales), and release.
- Series control: official catalog (+ JSON), brand/title, master production dashboard, release versioning.
- Visual canon: Benny/Penny character locks, per-book environment locks, medical prop glossary, typography standards.
- Format guidance: Canva master + 8.5×8.5 layout guide; Lulu PB/HC preflight + cover data sheet;
  direct PDF + fixed-layout EPUB; full audiobook pipeline; localization templates.
- ~556 kit files total.

## Locked series facts captured
```txt
Series:  Benny & Penny's Adventures — "Medical Books for Brave Little Hearts"
Trim:    8.5 × 8.5 in · 32 pages · ages 3–8 · English source
Locales: de, es, fr, it, ja, ru, zh-Hans, zh-Hant (8)
Books:   01–04 cover-ready · 05–10 coming-soon
```

## Migration actions
1. Copied the entire kit verbatim into
   `02 Projects/Benny & Penny's Adventures Book Series/` (structure preserved; kit files keep their names).
2. Rewrote `[C] AI Index & Commands.md` to map the cross-AI command vocabulary onto the kit's real
   structure (read order, kit map, pipeline, roles, commands, naming, guardrails).
3. Converted my earlier placeholders to redirect stubs to avoid competing sources of truth:
   - `[C] Book Production Tracker.md` → points to `00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md`.
   - `[C] Series Style Guide.md` → points to the kit's brand/character/typography/layout files.
4. Updated the project Overview with kit facts and revised open problems.
5. Registered/updated the project in CLAUDE.md, README, and the Workspace Index.

## Canonical source-of-truth rule
The production kit's numbered folders are the source of truth. `[C] AI Index & Commands.md` is the
control layer all AIs read first; it does not replace the kit. The master dashboard is the tracker.

## Next actions
```txt
1. Capture live Lulu spec/template before any final print output (06-print/LULU/01-LULU-LIVE-SPEC-CAPTURE.md).
2. Approve character/environment/prop locks for series consistency.
3. Build the Canva master (05-canva/01-CANVA-MASTER-SETUP.md) and run Book 01 end-to-end as the pattern.
4. Confirm Claude/ChatGPT/Gemini/Canva division of labor.
5. Set up private storage for master art, printer PDFs, paid files, and master audio (kept out of the repo).
```
