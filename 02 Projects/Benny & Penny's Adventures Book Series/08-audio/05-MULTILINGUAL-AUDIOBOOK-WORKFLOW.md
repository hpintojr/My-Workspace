# Multilingual Audiobook Workflow

## Scope
Each released language edition gets its own narration manuscript, pronunciation guide, production record, and website-audio upload manifest.

## Required source order
1. Final approved English source manuscript
2. Approved target-language translation
3. Native-language children's-editor approval
4. Localized narration manuscript
5. Target-language pronunciation/performance review
6. Audio master and website-upload file

## Do not do this
- Do not narrate directly from a Canva page or screenshot.
- Do not use an unreviewed machine translation as the final audio script.
- Do not copy the English opening/closing credit language word-for-word without native-language review.
- Do not reuse English pronunciation notes for Japanese, Russian, or Chinese.

## Required files per language edition
- `AUDIOBOOK-NARRATION-SCRIPT.md`
- `AUDIO-PRONUNCIATION-GUIDE.md`
- `AUDIOBOOK-PRODUCTION-RECORD.md`
- `AUDIO-WEBSITE-UPLOAD-MANIFEST.json`

## Translation and audio alignment rule
The final PDF, EPUB/KPF, audiobook narration script, and website metadata for one language edition must all use the same approved translation version.

## Recommended release order
Lock the English edition first. Then, for each locale: translate → native edit → lay out → create audio script → record → QA → upload the PDF, EPUB, and audio files as one release set.
