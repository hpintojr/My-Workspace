---
author: ChatGPT
type: project-truth
project: bennyandpenny.com — Portfolio
updated: 2026-06-21
status: AUTHORITATIVE
---

# bennyandpenny.com — Portfolio · PROJECT TRUTH

## Identity

```txt
Repository: hpintojr/bennyandpenny
Branch: main
Deployment: GitHub main to Vercel production
Preferred domain: https://www.bennyandpenny.com
Latest verified share-preview commit: c9280ce8a43baed65e277679f70623bb7f01886f
Vercel status for that commit: success
Role: Hamilton Pinto Jr.'s personal and technology portfolio
```

This portfolio is separate from the Benny & Penny's Adventures store and the book-production project.

## Active standard

```txt
Shared accessibility standard:
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md

Target:
WCAG 2.2 Level AA engineering conformance.
```

Do not claim legal accessibility certification without independent audit and review.

## Implemented foundation

- Skip link, landmarks, visible focus, reduced motion, forced colors, and target-size support.
- Keyboard mobile navigation with focus handling and Escape close.
- Contact labels, autocomplete, validation, error summary, inline errors, and status messages.
- Native accessibility preferences: text size, high contrast, pause motion, readable font, reset, and local persistence.
- Native lower-left accessibility launcher with a minimize button and a visible restore tab.
- Approved universal-access person-in-circle icon at `public/images/accessibility-universal-icon.svg`, rendered as a theme-aware CSS mask.
- Permanent footer text trigger and Accessibility page as alternate access paths.
- Smoke-test and browser-audit tooling plus WCAG program, inventory, issue register, and author guide.
- Production Neon submission storage is approved and the `contact_submissions` table is present.

## Social-sharing preview contract

### Primary generated preview

```txt
URL: https://www.bennyandpenny.com/og-image
Format: PNG
Dimensions: 1200 × 630
Code: app/og-image/route.tsx
```

The root layout and homepage both declare the generated preview with absolute image URLs, secure URLs, explicit MIME type, and dimensions.

### Static image fallback

```txt
URL: https://www.bennyandpenny.com/images/og-social-background.webp?rev=20260621-static
Format: WebP
Dimensions: 1200 × 630
Code: app/head.tsx
```

The static fallback uses the approved BP social artwork that Safari and successful Messages cards have already rendered. It adds `image_src`, Open Graph image, secure image, MIME type, dimensions, alt text, and Twitter image hints for clients that inspect direct head markup.

### Screenshot interpretation

```txt
Safari share sheet thumbnail: browser/Apple rich-preview behavior.
Chrome iOS share-sheet header: Chrome-controlled; may remain text-only.
Messages card: the final externally rendered link preview that matters.
Old blank Messages cards: cached historical previews; they do not refresh in place.
```

The website can improve the final link-card metadata but cannot force Chrome's own iOS share-sheet header to display a thumbnail. Test final Messages output using a new share to a new thread or recipient.

## Floating launcher contract

```txt
Icon: approved universal-access person-in-circle SVG.
Open launcher: opens native preferences dialog.
Minimize: turns launcher into an Accessibility restore tab.
Restore: returns focus to the full launcher.
Close/Done/Escape: returns focus to the initiating control.
State: saved locally on the device only.
```

The footer trigger and Accessibility page remain permanent alternate access paths.

## Current portfolio docs

```txt
docs/accessibility/wcag-program.md
docs/accessibility/inventory.md
docs/accessibility/issues.md
docs/accessibility/manual-qa-checklist.md
docs/accessibility/browser-audit.md
docs/accessibility/content-authoring-guide.md
```

## Next actions

1. Test a Chrome-iOS share to a new Messages thread or recipient; record whether the final card renders correctly.
2. If the final Messages card is blank, record Chrome version and whether the failure is in the share sheet, compose preview, or delivered card.
3. Run and retain production smoke and browser audit reports.
4. Complete visual launcher validation, contrast, zoom, reflow, text-spacing, forced-colors, and screen-reader evidence.
5. Complete image and media alternative review.
6. Run a controlled production Contact submission and validate visitor success, database persistence, Sequenzy delivery, delivery-failure messaging, and retry/help handling.
7. Apply the shared specification to the separate Adventures repository when that work begins.

## Read next

```txt
01 Daily Logs/[C] 2026-06-21 Portfolio Chrome iOS Share Preview Follow-Up.md
01 Daily Logs/[C] 2026-06-20 Portfolio Mobile Chrome Share Preview Fix.md
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
```