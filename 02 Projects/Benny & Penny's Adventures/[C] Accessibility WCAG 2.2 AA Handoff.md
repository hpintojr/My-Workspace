---
author: ChatGPT
type: handoff
project: Benny & Penny's Adventures
status: REQUIRED BEFORE ACCESSIBILITY BUILD
---

# Benny & Penny's Adventures Accessibility Handoff

## Required shared reference

Read first:

```txt
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
```

## Site-specific implementation order

1. Build the shared native accessibility provider, floating launcher, minimize/restore tab, footer trigger, and Accessibility page.
2. Apply landmarks, skip links, visible focus, mobile navigation rules, and reduced-motion support.
3. Audit catalog, product detail, cart, checkout, account, library, gifting, orders, address management, help, and parent-resource journeys.
4. Audit book covers, book previews, PDF, EPUB, audio, captions, transcripts, download labels, and related materials.
5. Add browser automation for public, account, cart, checkout, gifting, and library tasks.
6. Complete manual keyboard, contrast, reflow, and screen-reader evidence before release.

## Product-specific non-negotiables

- The floating launcher cannot cover cart, checkout, purchase, redeem, download, support, or chat controls.
- Minimized launcher remains visible and keyboard-accessible.
- Customer workflows retain entered data after validation or network failures wherever possible.
- Downloads state format and accessibility information clearly.
- Digital book files require real text, reading order, headings, language metadata, and alternatives for meaningful visual content.
- Gifting and redemption must announce status, validation errors, successful access, and next steps.

## Definition of done

The Adventures implementation is not complete until the shared specification, issue register, manual evidence, automated checks, and task-based review are present in the Adventures repository.
