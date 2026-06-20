---
author: ChatGPT
type: shared-specification
status: CONFIRMED
created: 2026-06-20
applies-to:
  - bennyandpenny.com — Portfolio
  - bennyandpennyadventures.com — Store, Portal, Library, Gifting, and Book Experience
standard: WCAG 2.2 Level AA engineering target
---

# Shared WCAG 2.2 AA Accessibility Design & Engineering Specification

## Purpose

This is the shared implementation standard for both Benny & Penny websites. It converts the accessibility direction into concrete UX, code, content, testing, and release requirements so the Adventures site starts with the correct foundation instead of receiving accessibility as a late remediation.

This is an engineering target, not legal advice or a legal certification. Do not claim either website is fully ADA compliant or completely accessible without independent testing and appropriate review.

## Product boundaries

```txt
1. bennyandpenny.com
   Hamilton Pinto Jr.'s portfolio and technology-company site.

2. bennyandpennyadventures.com
   Customer-facing book, storefront, portal, library, gifting, order, and support experience.

3. Benny & Penny's Adventures Book Series
   Manuscripts, print files, e-books, audio, translations, illustrations, and production assets.
```

The shared standard applies to each website and to the accessible delivery of customer-facing book files. It does not merge the repositories or their business logic.

## Core standard

```txt
Target: WCAG 2.2 Level AA
Approach: Native semantic HTML, accessible component architecture, and task-based testing
Not allowed: Treating a third-party overlay as the accessibility solution
```

### Non-negotiable rules

1. Use native HTML before ARIA.
2. Every interactive action must work by keyboard, touch, and pointer.
3. Focus must be visible, logical, and never obscured.
4. Use one page h1 and an ordered heading hierarchy.
5. Use descriptive link and button labels; never rely on generic labels such as Click here.
6. Do not communicate meaning by color, hover, animation, or image-only text alone.
7. New functionality is not complete until it has automated checks and documented manual QA evidence.
8. Critical or high-severity accessibility barriers block release.

## Shared floating accessibility launcher — confirmed pattern

### Purpose

Every public page will offer a native, branded way to open accessibility preferences without forcing the visitor to scroll to the footer.

### Expanded state

- Fixed lower-left launcher with safe-area spacing.
- Native button with an accessibility SVG icon.
- Accessible name: **Open accessibility preferences**.
- Minimum target: 44 by 44 CSS pixels.
- Visual tooltip may say **Accessibility preferences**, but the tooltip is not the only accessible name.
- A separate minimize control is visible beside the launcher.

### Minimized state

- A visitor may minimize the full floating icon.
- Minimizing never removes the path back to accessibility controls.
- The minimized form becomes a compact visible **Accessibility** restore tab.
- On small screens, the visual text may collapse to an icon, but the programmatic name remains **Show accessibility launcher**.
- The minimized/expanded setting is saved only in local browser storage for that device.
- Do not send launcher state to analytics, CRM, advertising, or marketing platforms.

### Required interaction contract

```txt
Open launcher       → opens native preferences dialog
Minimize            → shows restore tab and moves focus to it
Restore tab         → restores launcher and moves focus to it
Escape / Close      → closes dialog and returns focus to the opener
Footer text trigger → opens the same preferences dialog
Accessibility page  → remains a permanent support and policy route
```

The launcher must support mouse, touch, Tab, Enter, Space, and Escape. It must not depend on hover, animation, or a mouse-only close target.

### Position and conflict rules

- Keep the launcher above normal content and below native modal dialogs.
- Do not cover checkout controls, cart actions, cookie banners, chat controls, emergency/help controls, or key form buttons.
- Review placement whenever a persistent third-party widget is added.
- Hide only in print styles.

## Shared preferences dialog

The native dialog must offer:

- Text size: Standard, Large, Largest.
- High contrast: stronger content, border, and control contrast.
- Pause animations: disables nonessential site motion.
- Readable font: plain system sans-serif for content and controls.
- Reset preferences: restores defaults.

Preferences are local-device enhancements. They supplement—not replace—operating-system, browser, zoom, reader-mode, and assistive-technology settings.

## Required engineering foundation

### Semantics and navigation

- `lang` attribute on the document.
- Skip link to `main`.
- Named primary, mobile, footer, and utility navigation landmarks when present.
- Current-page state for active navigation items.
- Responsive mobile menu with focus entry, focus containment where appropriate, Escape close, focus return, and background-scroll protection.
- Clear 404 recovery actions and noindex behavior.

### Focus and keyboard

- Global `:focus-visible` token with sufficient contrast against each surface.
- Focus offset that prevents clipping by borders, cards, sticky headers, or docked controls.
- Interactive targets meet at least 24 by 24 CSS pixels; use 44 by 44 for key controls and mobile actions.
- Use buttons for UI state changes and links for navigation.

### Forms and transactional tasks

- Visible labels and clear required-field indicators.
- Valid `autocomplete` values.
- Errors in text, attached to their fields, plus a focus-managed error summary.
- Status announcements for submitting, success, failure, retry, saved, and unavailable states.
- Do not rely on color alone to identify errors or success.
- Checkout, account, gifting, address, cart, and library actions must retain user data and provide recovery paths after errors.

### Images, media, books, and downloads

- Every image has useful alternative text or an intentional empty alternative when decorative.
- Important text is never embedded only in an image.
- Book covers, preview art, instructions, progress visuals, and illustrations require an alt-text decision during production.
- PDFs, EPUBs, and other digital books must use real text, logical reading order, language metadata, accessible headings, alt text for meaningful illustrations, and bookmarks/navigation where the format supports them.
- Audio requires a text alternative; video requires captions and a transcript when applicable.
- Download links identify the format, such as PDF, EPUB, audiobook, or printable activity sheet.

### Visual design

- Measure text, UI, border, icon, focus, gradient, overlay, tooltip, and disabled-state contrast before release.
- Support 200% browser zoom, 400% reflow, 320 CSS px layouts, increased text spacing, forced colors, reduced motion, and landscape mobile use.
- No essential information may require hover or animation.

## Adventures-specific task coverage

The Adventures site must test the complete customer journey, not only static pages:

```txt
Home → Catalog → Product detail → Cart → Checkout → Confirmation
Home → Account → Library → Download/read/listen
Home → Gift purchase → Gift redemption → Library entitlement
Home → Order history → Invoice/tracking → Support
Home → Parent resources → Guides/downloads → Support
```

For each task, test keyboard-only use, screen-reader flow, validation errors, empty states, loading states, failed network states, and recovery.

## Automated and manual test gates

### Automated on every main-branch build

- Server-rendered accessibility smoke test.
- Playwright plus axe browser audit for public routes and priority authenticated/transactional flows when a safe test account exists.
- Keyboard interaction tests for navigation, launcher minimize/restore, dialogs, forms, cart, checkout, gifting, and account flows.

### Manual before release

- Keyboard-only route/task pass.
- NVDA plus Chrome or Firefox test.
- VoiceOver plus Safari test.
- 200% zoom, 400% reflow, 320 CSS px, text-spacing, forced-colors, and reduced-motion tests.
- Contrast audit report.
- Image/media/book-file alternative review.
- Production or staging Contact/support workflow verification.

## Required documentation per repository

```txt
docs/accessibility/wcag-program.md
docs/accessibility/inventory.md
docs/accessibility/issues.md
docs/accessibility/manual-qa-checklist.md
docs/accessibility/content-authoring-guide.md
docs/accessibility/launcher-qa.md
```

Each issue must track criterion, severity, affected journey, workaround, owner, target date, and verification result.

## Current confirmed implementation reference

The approved initial reference is now in `hpintojr/bennyandpenny`:

```txt
components/AccessibilityPreferences.tsx
components/AccessibilityPreferencesStyles.tsx
components/SiteFooterAccessible.tsx
app/accessibility-dock.css
app/accessibility/page.tsx
docs/accessibility/wcag-program.md
```

The Adventures site should reuse the behavior and test contract while adapting names, routes, page content, and store-specific transactional requirements.

## Status

```txt
Specification: CONFIRMED
Portfolio floating launcher: implementation in progress / pending production verification
Adventures implementation: not started; this file is the required starting reference
```
