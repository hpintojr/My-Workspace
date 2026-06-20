---
author: ChatGPT
type: daily
project: bennyandpenny.com — Portfolio
date: 2026-06-20
scope: WCAG 2.2 AA accessibility remediation phase one
---

# BennyAndPenny.com — Accessibility Phase 1

## Objective

Begin code-level accessibility remediation for the portfolio site using the shared **Accessibility, ADA & WCAG 2.2 AA Design + Engineering Specification**. This phase establishes shared accessibility foundations and addresses high-impact keyboard, focus, form, link-purpose, and pointer-target issues.

This is an engineering effort toward WCAG 2.2 Level AA. Do not claim legal ADA compliance, zero defects, or full accessibility without an independent audit and legal review.

## Canonical source

```txt
Repository: hpintojr/bennyandpenny
Branch: main
Deployment: Vercel production
Latest phase-one deployment: dpl_9mRWUEagMwvvNq3SatfYbyZhCjHd
Latest deployment status: READY
```

## Implemented

### Shared accessibility foundation

- Added `app/accessibility.css` with:
  - WCAG-oriented focus, error, success, warning, and text tokens
  - global `:focus-visible` treatment
  - white focus treatment on dark teal surfaces
  - visually-hidden utility
  - keyboard skip-link styling
  - scroll padding for sticky header / focus targets
  - forced-colors focus support
  - global reduced-motion fallback
  - `prefers-contrast: more` enhancements for borders, text, and controls
  - reusable contact-form error styling
  - minimum shared hit-target sizes for desktop navigation, footer links, and card links
- Added `components/SkipLink.tsx`.
- Updated root layout with:
  - skip link before header
  - `<main id="main-content" tabIndex={-1}>`
  - programmatic focus to main content after skip-link use

### Navigation

- Updated `components/SiteHeader.tsx`:
  - mobile menu trigger uses accurate expanded state
  - opening the menu moves focus to the first menu item
  - Escape closes the menu and returns focus to the trigger
  - menu is hidden from keyboard users while closed
  - current page is exposed through `aria-current="page"`

### Contact form

- Updated `components/ContactForm.tsx`:
  - visible required-fields notice
  - programmatic required state and field-specific error state
  - custom validation for name, email, and project details
  - focus-managed error summary with jump links to invalid fields
  - inline error messages tied to fields via `aria-describedby`
  - announced success state and clearer submission status
  - honeypots remain hidden from keyboard and assistive technology

### Links, content structure, and images

- Footer venture links announce that they open in a new tab.
- Home and Work card links now identify their destination, such as `Visit XBeton`, and announce the new-tab behavior.
- Adventures storefront links now identify their destination and new-tab behavior.
- Adventures book-list markup was corrected so headings and paragraphs are contained in valid block content rather than a `span`.
- Footer BP monogram is decorative because adjacent real text already identifies the brand.
- About signature is decorative while adjacent visually hidden text provides its accessible text equivalent, avoiding duplicate screen-reader output.

### Accessibility statement, discovery, and mirrors

- Added live statement page: `/accessibility`.
- Added footer link to the statement.
- Added `/accessibility.md` Markdown mirror.
- Added the route to `sitemap.xml`.
- Updated `llm.txt`, `llms.txt`, and `llms-full.txt` to index the new statement and its Markdown mirror.
- Added `docs/accessibility/phase-1-baseline.md` in the portfolio repo with initial route inventory, remediation register, outstanding issues, and QA requirements.

## Important verification completed

```txt
Latest Vercel production deployment completed successfully.
Accessibility route, global skip link, accessible mobile-navigation markup,
Adventures link changes, and shared accessibility CSS were confirmed in rendered production HTML.
```

## Not yet complete

- This is not a completed audit or accessibility certification.
- Contrast has been checked for several shared brand pairs; a full route-by-route visual contrast audit remains open.
- Manual keyboard, screen-reader, zoom/reflow, text-spacing, forced-colors, and reduced-motion tests still need to be completed and logged.
- Automated axe / Playwright / Lighthouse accessibility coverage has not yet been added to CI.
- All image alternatives and all remaining external links need a full route-by-route review.
- The portfolio domain currently redirects `bennyandpenny.com` to `www.bennyandpenny.com`; canonical metadata still uses the non-www form. This is an SEO/domain-alignment issue, not an accessibility fix, and should be resolved separately before final SEO signoff.

## Next actions

1. Manually test keyboard flow on Home, Work, Adventures, About, Contact, Privacy, Terms, Accessibility, and 404.
2. Test the mobile menu at desktop, tablet, and phone widths with Tab, Shift+Tab, Enter, Space, and Escape.
3. Test Contact validation with NVDA + Chrome/Firefox and VoiceOver + Safari.
4. Run a full contrast audit and fix any remaining brand color-pair failures.
5. Test 200% browser zoom, 400% narrow reflow, text-spacing overrides, reduced motion, and forced-colors mode.
6. Add automated accessibility testing with axe and Playwright in a dedicated follow-up.
7. Begin a full content/image-alt inventory.
8. Resolve the preferred-domain / canonical mismatch separately.

## Read next

```txt
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Accessibility Phase 1.md
```
