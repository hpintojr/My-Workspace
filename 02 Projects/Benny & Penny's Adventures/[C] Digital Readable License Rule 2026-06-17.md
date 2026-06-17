---
type: project-handoff
project: Benny & Penny's Adventures
status: validated
updated_by: ChatGPT
last_updated: 2026-06-17
---

# Digital Readable License Rule — 2026-06-17

Hamilton approved the shared readable-license model.

## Rule

```txt
One purchased digital readable license grants access to both PDF and EPUB.
The license has 3 total readable access slots.
PDF downloads, EPUB downloads, and BPG gifts all spend from the same 3-slot pool.
A gifted recipient receives one digital download/device allowance.
```

## Examples

```txt
Buyer downloads PDF once and EPUB once -> 1 readable slot remains.
Buyer downloads nothing -> buyer may issue up to 3 gifts.
Buyer downloads PDF 3 times -> no EPUB or gift slots remain.
Buyer issues 1 gift -> buyer has 2 readable slots left across PDF/EPUB.
```

## Code Status

Website commits:

```txt
a2a43155006fabb66f6d1bcf180339d61a457fc9
Automate R2 download records for PDF EPUB and audio

11753be68c7058b7cea13bde9e060f13dbf53cfa
Clarify shared readable download limits

3b16a30cc0cc67e621e8f79af94442ca33d1c58a
Enforce shared readable download pool

67b5cee6f88a5b1bb3990fe3f3eec62548ec8d79
Expose PDF and EPUB download options in library API

7b1a0dc5825d0f68149a5dc121601c19fccfb4ed
Show separate PDF and EPUB buttons in library
```

Latest deployment status:

```txt
7b1a0dc5825d0f68149a5dc121601c19fccfb4ed deployed to production and is READY.
```

## Current R2 Folder Pattern

Hamilton simplified the R2 bucket into root folders:

```txt
ebooks/book-1.pdf
ebooks/book-1.epub
audio/book-1-audiobook.mp3
print/
```

This is the current standard. Book records are the source of truth for exact R2 object keys.

## 2026-06-17 Validation

Validated in testing:

```txt
Paid test order created order records.
Order items were created.
Media/Downloads records were auto-created.
Portal Library showed separate PDF, EPUB, and Audiobook buttons.
PDF download worked.
EPUB download worked.
Audiobook download worked.
R2 signed download links worked.
Shared readable slot count updated.
```

Earlier issue and correction:

```txt
Order 26-0027 initially did not create downloads automatically.
Book object keys did not match the latest R2 folder pattern.
Automation requires R2_AUTO_CREATE_DOWNLOADS=true.
Book records and existing Downloads records were corrected to ebooks/ and audio/.
A later fresh test confirmed automatic delivery now works.
```

## Vercel Values Required

```txt
R2_AUTO_CREATE_DOWNLOADS=true
R2_EBOOK_PREFIX=ebooks
R2_AUDIO_PREFIX=audio
R2_DOWNLOADS_PER_LICENSE=3
```

## Remaining Work

```txt
Replace dummy/zero-byte R2 files with real files as Books 1-4 are finalized.
Connect BPG gifting to the same readable slot pool.
Update Terms and Conditions for gifted vs full-license access.
Redesign final Portal Library UX later.
```
