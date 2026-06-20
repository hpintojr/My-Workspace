---
author: ChatGPT
type: shared-specification
status: CONFIRMED
updated: 2026-06-20
applies-to:
  - bennyandpenny.com — Portfolio
  - bennyandpennyadventures.com — Store, Portal, Library, Gifting, and Book Experience
standard: WCAG 2.2 Level AA engineering target
---

# Shared WCAG 2.2 AA Accessibility Design & Engineering Specification

## Purpose

This is the shared accessibility implementation standard for both Benny & Penny websites. It defines the UX, code, content, testing, and release requirements so the Adventures site begins with the same accessible foundation as the portfolio.

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

The standard applies to both websites and the accessible delivery of customer-facing book files. It does not merge repositories or business logic.

## Core standard

```txt
Target: WCAG 2.2 Level AA
Approach: Native semantic HTML, accessible components, and task-based testing
Not allowed: Using a third-party overlay as a substitute for code remediation
```

### Non-negotiable rules

1. Use native HTML before ARIA.
2. Every interaction works by keyboard, touch, and pointer.
3. Focus is visible, logical, and never obscured.
4. Use one page h1 and an ordered heading hierarchy.
5. Use descriptive link and button labels.
6. Do not communicate meaning by color, hover, animation, or image-only text alone.
7. New functionality is not complete without automated checks and manual QA evidence.
8. Critical or high-severity accessibility barriers block release.

## Floating accessibility launcher — confirmed shared pattern

### Approved icon and asset rules

Use the approved **universal-access person-in-circle icon** supplied by Hamilton. It replaces the earlier thin-line stick figure, which was visually ambiguous at small sizes.

```txt
Portfolio source asset:
public/images/accessibility-universal-icon.svg

Approved implementation:
- Render with a CSS mask so the vector inherits the active theme color.
- Keep it decorative inside a button; the button provides the accessible name.
- Preserve the optimized square crop and internal spacing from the SVG.
- Do not stretch, outline, or redraw it as a thin-line figure.
```

### Expanded launcher

- Render on every public page at the lower-left viewport edge with safe-area spacing.
- Use a native button with the approved icon.
- Accessible name: **Open accessibility preferences**.
- Minimum target: 44 by 44 CSS pixels.
- Use a cream shell and deep-teal icon button in the default theme.
- Use white icon color on deep teal, with a distinct visible focus indicator.
- Keep a separate visible minimize control beside the primary icon button.
- A visual tooltip may say **Accessibility preferences**, but it is never the only accessible name.

### Minimized launcher

- A visitor may minimize the full launcher.
- Minimization never removes every access path.
- The minimized state becomes a compact visible **Accessibility** restore tab.
- On small screens, the visual text may collapse to the approved icon, but the programmatic name remains **Show accessibility launcher**.
- Store only minimized/expanded state in local browser storage for that device.
- Do not send launcher settings to analytics, CRM, marketing, or advertising systems.

### Required interaction contract

```txt
Open launcher       → opens native preferences dialog
Minimize            → shows restore tab and moves focus to it
Restore tab         → restores launcher and moves focus to it
Escape / Close      → closes dialog and returns focus to the opener
Footer text trigger → opens the same preferences dialog
Accessibility page  → remains a permanent support and policy route
```

The launcher supports mouse, touch, Tab, Enter, Space, and Escape. It cannot depend on hover, animation, or mouse-only controls.

### Position and conflict rules

- Keep the launcher above normal content and below native modal dialogs.
- Do not cover checkout controls, cart actions, cookie banners, chat controls, vital form actions, or emergency/help controls.
- Reassess dock placement whenever a persistent third-party widget is added.
- Hide only in print styles.
- In high-contrast mode, retain distinct icon, border, tooltip, and focus states.
- The optimized square icon crop prevents excess side whitespace and keeps the symbol visually balanced in a circular control.

## Shared preferences dialog

The native dialog must offer:

- Text size: Standard, Large, Largest.
- High contrast: stronger text, borders, and controls.
- Pause animations: disables nonessential site motion.
- Readable font: uses a plain system sans-serif for content and controls.
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

- Global `:focus-visible` token with sufficient contrast on every surface.
- Focus offset that prevents clipping by borders, cards, sticky headers, or docked controls.
- Interactive targets meet at least 24 by 24 CSS pixels; use 44 by 44 for key controls and mobile actions.
- Use buttons for UI state changes and links for navigation.

### Forms and transactional tasks

- Visible labels and clear required-field indicators.
- Valid `autocomplete` values.
- Errors in text, attached to fields, plus a focus-managed error summary.
- Status announcements for submitting, success, failure, retry, saved, and unavailable states.
- Do not rely on color alone to identify errors or success.
- Checkout, account, gifting, address, cart, and library actions retain user data and provide recovery paths after errors.

### Images, media, books, and downloads

- Every image has useful alternative text or an intentional empty alternative when decorative.
- Important text is never embedded only in an image.
- Book covers, preview art, instructions, progress visuals, and illustrations require an alt-text decision during production.
- PDFs, EPUBs, and other digital books use real text, logical reading order, language metadata, accessible headings, alt text for meaningful illustrations, and bookmarks/navigation where the format supports them.
- Audio requires a text alternative; video requires captions and a transcript when applicable.
- Download links identify format, such as PDF, EPUB, audiobook, or printable activity sheet.

### Visual design

- Measure text, UI, border, icon, focus, gradient, overlay, tooltip, and disabled-state contrast before release.
- Support 200% browser zoom, 400% reflow, 320 CSS px layouts, increased text spacing, forced colors, reduced motion, and landscape mobile use.
- No essential information may require hover or animation.

## Adventures-specific task coverage

The Adventures site tests complete customer journeys, not only static pages:

```txt
Home → Catalog → Product detail → Cart → Checkout → Confirmation
Home → Account → Library → Download/read/listen
Home → Gift purchase → Gift redemption → Library entitlement
Home → Order history → Invoice/tracking → Support
Home → Parent resources → Guides/downloads → Support
```

For each task, test keyboard-only use, screen-reader flow, validation errors, empty states, loading states, failed-network states, and recovery.

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

Each issue tracks criterion, severity, affected journey, workaround, owner, target date, and verification result.

## Confirmed implementation reference

```txt
public/images/accessibility-universal-icon.svg
components/AccessibilityPreferences.tsx
components/AccessibilityPreferencesStyles.tsx
components/SiteFooterAccessible.tsx
app/accessibility-dock.css
app/accessibility/page.tsx
docs/accessibility/wcag-program.md
```

The Adventures site reuses this behavior and test contract while adapting routes, content, and store-specific transactional requirements.

## Status

```txt
Specification: CONFIRMED
Approved icon: universal-access person-in-circle SVG
Portfolio rollout: Vercel production READY (dpl_EbEX6ButzpuksGDSZjVACv9suwoE)
Verified: deployed launcher markup and approved SVG asset are available in production
Still required: manual visual, keyboard, contrast, reflow, screen-reader, and production Contact delivery validation
Adventures implementation: not started; this file is the required starting reference
```