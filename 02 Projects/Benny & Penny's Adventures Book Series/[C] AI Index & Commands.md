---
type: index
date: 2026-06-18
updated: 2026-06-18
project: Benny & Penny's Adventures Book Series
audience: Claude, ChatGPT, Gemini, Canva (and any future AI assistant)
---

# AI Index & Commands — Benny & Penny's Adventures Book Series

This is the **cross-AI control layer** for the production kit. Any AI tool (Claude, ChatGPT, Gemini, Canva, or other) working on this series reads this file first, then follows the kit's own files. If a tool cannot read files directly, the operator pastes the relevant section into it.

The **production kit** (numbered folders `00-series-control` … `99-inbox`) is the canonical system and source of truth. This file does not replace it — it maps a shared command vocabulary onto it so every tool behaves the same way.

---

## 1. Series facts (locked)

```txt
Series title:   Benny & Penny's Adventures
Descriptor:     Medical Books for Brave Little Hearts
Reader ages:    3–8
Canonical trim: 8.5 × 8.5 in
Pages/book:     32 (planned)
Source language: English
Locales:        de, es, fr, it, ja, ru, zh-Hans, zh-Hant (8)
Books:          10 (see catalog below)
```

## 2. The 10 books (official catalog)

```txt
01 home-infusion-day              — Home infusions          — cover-ready
02 port-access-adventure          — Access ports            — cover-ready
03 picc-line-adventure            — PICC lines              — cover-ready
04 subcutaneous-infusion-adventure— Subcutaneous infusion   — cover-ready
05 special-line-adventure         — Central / special lines — coming-soon
06 lab-draw-adventure             — Lab draws               — coming-soon
07 mri-adventure                  — MRI scans               — coming-soon
08 hospital-sleepover             — Hospital stays          — coming-soon
09 ambulance-adventure            — Ambulance rides         — coming-soon
10 surgery-day                    — Surgery day             — coming-soon
```

Canonical catalog lives in `00-series-control/00-OFFICIAL-CATALOG.md` and `official-book-catalog.json`. If they ever disagree with this list, the kit files win.

**Real working status (read this):** The series is in **conception / drafting**. The "cover-ready / coming-soon" labels above are *directional notes carried over from the website* — they are NOT finished-product status. Truth: Michelle (the author) has **started books 1–4** from drafts/fragments; **books 5–10 are not started**. No book is print-, digital-, or audio-final yet. Track real per-stage progress only in `00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md`, which is intentionally unseeded until each stage is actually verified.

**Project mission:** Help Michelle finish and publish her first book series. Hamilton coordinates: completing manuscripts, laying out the books, and making the publishing process make sense. The website is updated later, as key phases finish.

---

## 3. Read order (every AI, every session)

```txt
1. README.md                                          (kit overview + book table + workflow)
2. [C] AI Index & Commands.md                         (this file — shared commands)
3. 00-series-control/01-SERIES-TITLE-AND-BRAND.md     (brand + reader promise)
4. 00-series-control/00-OFFICIAL-CATALOG.md           (titles, slugs, status)
5. 00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md(status of all 10 books — THE tracker)
6. 01-characters/  +  03-props-wardrobe/TYPOGRAPHY-AND-TEXT-STANDARDS.md  (visual + text locks)
7. The specific book: 04-books/book-NN-<slug>/00-BOOK-OVERVIEW.md, then its numbered subfolders
```

Do not produce content or layout before reading items 1–6.

---

## 4. Kit structure (where everything lives)

```txt
00-series-control/   catalog, brand, master production dashboard, release versioning
01-characters/       Benny + Penny + new-character LOCK files (visual canon)
02-environments/     per-book environment LOCK files + bedroom lock + template
03-props-wardrobe/   medical prop glossary + typography/text standards
04-books/book-NN-*/  per book: 00-overview, 01-manuscript, 02-page-briefs, 03-canva,
                     04-lulu-print, 05-digital, 06-audio, 07-localization/<locale>, 08-release
05-canva/            Canva master setup + 8.5×8.5 layout guide
06-print/LULU/       Lulu production overview, live spec capture, PB/HC preflight, cover data sheet
07-digital/          direct-website PDF, fixed-layout EPUB, website upload manifest template
08-audio/            audiobook overview, narration/pronunciation/cue/QA, multilingual workflow
09-localization/     localization overview, terminology, translation package template
10-templates/        book release manifest (reusable)
99-inbox/            drop zone for unsorted incoming files
```

## 5. Production pipeline (per book, in order)

```txt
English text → visual/text locks → page scene briefs → Canva English layout →
Direct PDF + fixed-layout EPUB → audiobook script → audio master →
locale layouts + locale audio → Lulu paperback + hardcover → QA/proofs →
release manifest → website upload (pdf_path / epub_path / audio_path)
```

The master dashboard columns mirror this: English Text · Locks · Canva · Lulu PB · Lulu HC · PDF · EPUB/KPF · Audio Script · Audio Master · Locales · Release.

---

## 6. Tool roles

```txt
Claude   — indexing, file/structure management, manuscript drafting/editing, continuity checks, dashboard upkeep, hand-off to the website project.
ChatGPT  — manuscript drafting, alternate phrasing, dialogue, idea variations.
Gemini   — research + medical-accuracy review (children's MEDICAL series); human signs off.
Canva    — visual layout, page design, covers, export of final digital assets (per 05-canva guides).
```

## 7. Shared commands (same meaning in any AI)

```txt
read series        → load the read order in §3, then summarize current state from the dashboard.
status             → report each book's column status from 00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md.
start book NN      → open 04-books/book-NN-*/00-BOOK-OVERVIEW.md + relevant locks; report stage + next action.
draft book NN      → write/continue 04-books/book-NN-*/01-manuscript/ENGLISH-SOURCE-MANUSCRIPT.md per brand + standards.
brief book NN      → fill 04-books/book-NN-*/02-page-briefs/ page scene briefs.
layout book NN     → produce Canva layout per 05-canva guides; log in 04-books/book-NN-*/03-canva/CANVA-LAYOUT-RECORD.md.
print book NN      → work 04-books/book-NN-*/04-lulu-print/ using 06-print/LULU preflight; capture live Lulu spec first.
digital book NN    → produce PDF + EPUB per 07-digital; update 05-digital checklist + WEBSITE-UPLOAD-MANIFEST.json.
audio book NN      → narration script → master per 08-audio; log in 04-books/book-NN-*/06-audio/.
localize book NN   → run 07-localization/<locale>/ files per 09-localization templates.
release book NN    → fill 04-books/book-NN-*/08-release/RELEASE-MANIFEST.md (from 10-templates).
handoff book NN    → deliver final pdf/epub/audio + paths to the website project; note in release manifest.
update dashboard   → set the book's column(s) in 00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md.
```

Rule: after any production command, also run `update dashboard`.

---

## 8. Naming + versioning (from the kit)

```txt
Slugs:     book-NN-<slug>  (e.g. book-01-home-infusion-day)
Versions:  v0.1.0 early · v0.9.0 under approval · v1.0.0 first release · v1.0.1 correction
Files:     bpa-book-NN-<slug>-<locale>-<format>-vX.Y.Z.<ext>
           e.g. bpa-book-01-home-infusion-day-en-ebook-v1.0.0.pdf
AI-authored workspace files use the [C] prefix; kit files keep their own UPPERCASE names.
Never overwrite an approved asset version — increment it.
```

## 9. Guardrails (do not break)

```txt
- Children's MEDICAL series: accurate but child-safe wording; Gemini leads accuracy review, human signs off.
- Lock control point: before any final print cover/interior, record the exact current Lulu requirement/template
  in 06-print/LULU/01-LULU-LIVE-SPEC-CAPTURE.md. Final cover size depends on final product + page count.
- Defer to character/environment LOCK files and TYPOGRAPHY-AND-TEXT-STANDARDS.md on any visual/text conflict.
- Git/security: commit Markdown, manifests, approved text, low-res review art only.
  Keep master art, family photos, paid customer files, printer PDFs, and master audio in PRIVATE storage.
- Final assets feed the separate "Benny & Penny's Adventures" website project (pdf_path/epub_path/audio_path).
  Do NOT edit website/portal code from this project — hand off assets only.
```
