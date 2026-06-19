---
type: problems
date: 2026-06-18
updated: 2026-06-18
project: Benny & Penny's Adventures Book Series
---

## Goal
Produce the 10-book **Benny & Penny's Adventures** collection ("Medical Books for Brave Little Hearts") across print, digital, audio, and 8 localized languages — with a shared Markdown indexing system so Claude, ChatGPT, Gemini, and Canva all work from the same files, conventions, and commands.

## Why
This is **Michelle's first book series**, and the goal is to help her finish and publish it. She is the author; Hamilton is helping complete the manuscripts, lay out the books, and make the publishing process make sense. Producing ten books in multiple formats across multiple AI tools only works if every assistant reads the same source of truth and follows the same commands — otherwise layouts, story details, and translations drift and the work gets redone.

## Real status (do not mistake the labels)
The series is in **conception / drafting**. The kit's "cover-ready / coming-soon" labels are directional notes carried over from the website — not finished-product status. Truth: books **1–4 are started** from drafts and fragments; books **5–10 are not started**. Nothing is print/digital/audio-final yet. The website gets updated later, as key phases finish.

## Scope note
This project is the **content + production** of the 10-book series. It is separate from the existing "Benny & Penny's Adventures" project, which is the **website, customer portal, and fulfillment system**. Final assets here feed that project's `pdf_path`, `epub_path`, and `audio_path` fields.

## Production kit (migrated 2026-06-18)
Hamilton's full production kit is now the canonical structure for this project. Numbered folders `00-series-control` … `99-inbox` are the source of truth. The cross-AI command layer that maps onto it is `[C] AI Index & Commands.md` — read it first.

```txt
Series:  Benny & Penny's Adventures — Medical Books for Brave Little Hearts
Trim:    8.5 × 8.5 in · 32 pages · ages 3–8 · English source
Locales: de, es, fr, it, ja, ru, zh-Hans, zh-Hant
Books:   1–4 cover-ready · 5–10 coming-soon
```

## Tangible Outcomes
- Ten finished books across all formats: Lulu paperback + hardcover, direct PDF, fixed-layout EPUB/KPF, and audiobook.
- Localized layouts and audiobooks in 8 languages.
- A cross-AI command + indexing system every tool follows (`[C] AI Index & Commands.md`).
- A live master dashboard (`00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md`) tracking all 10 books to release.
- Assets handed off cleanly into the website project.

## Open Problems
1. Capture the live Lulu spec/template for the exact product configuration before any final print cover/interior (`06-print/LULU/01-LULU-LIVE-SPEC-CAPTURE.md`).
2. Approve character/environment/prop locks so all 10 books stay visually consistent.
3. Build the Canva master per `05-canva/01-CANVA-MASTER-SETUP.md` and run Book 01 end-to-end as the pattern.
4. Confirm the working split across Claude / ChatGPT / Gemini / Canva for drafting, review, and layout.
5. Set up private storage for master art, printer PDFs, paid files, and master audio (kept out of the repo per the kit's security rule).
