---
author: ChatGPT
type: project-truth
project: bennyandpenny.com — Portfolio
updated: 2026-06-20
status: AUTHORITATIVE
---

# bennyandpenny.com — Portfolio · PROJECT TRUTH

## Identity

```txt
Repository: hpintojr/bennyandpenny
Branch: main
Deployment: GitHub main to Vercel production
Preferred domain: https://www.bennyandpenny.com
Latest production deployment: dpl_EbEX6ButzpuksGDSZjVACv9suwoE
Deployment state: READY
Role: Hamilton Pinto Jr.'s personal and technology portfolio
```

This portfolio is separate from the Benny & Penny's Adventures store and the book-production project.

## Accessibility scope

The active standard is:

```txt
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
```

Target: WCAG 2.2 Level AA engineering conformance. Do not claim legal accessibility certification without independent audit and review.

## Implemented portfolio foundation

- Skip link, named main landmark, visible focus, reduced motion, forced colors, and target-size support.
- Keyboard mobile navigation with focus handling and Escape close.
- Contact labels, autocomplete, validation, error summary, inline errors, and status messages.
- Native accessibility preferences: text size, high contrast, pause motion, readable font, reset, and local persistence.
- Native floating lower-left accessibility launcher with a minimize button and a visible restore tab.
- Approved universal-access person-in-circle icon at `public/images/accessibility-universal-icon.svg`, rendered as a theme-aware CSS mask rather than the previous thin-line figure.
- Permanent footer text trigger and Accessibility page as alternate access paths.
- Smoke-test and browser-audit tooling plus WCAG program, inventory, issue register, and author guide.
- Production Neon submission storage is approved and the `contact_submissions` table is present.

## Production verification snapshot

```txt
Vercel deployment: dpl_EbEX6ButzpuksGDSZjVACv9suwoE
State: READY
Verified production output:
- Floating launcher markup
- Named open and minimize buttons
- Footer preferences trigger
- Native dialog markup
- Approved universal-icon element
- /images/accessibility-universal-icon.svg asset returns HTTP 200
```

This verifies the deployed implementation and asset availability. Visual browser review, assistive-technology testing, contrast evidence, and automated audit evidence remain open work.

## Floating launcher contract

```txt
Icon: approved universal-access person-in-circle SVG.
Open launcher: opens native preferences dialog.
Minimize: turns launcher into an Accessibility restore tab.
Restore: returns focus to the full launcher.
Close/Done/Escape: returns focus to the initiating control.
State: saved locally on the device only.
```

Never remove every access path. The footer trigger and Accessibility page remain permanent.

## Current docs in the portfolio repo

```txt
docs/accessibility/wcag-program.md
docs/accessibility/inventory.md
docs/accessibility/issues.md
docs/accessibility/manual-qa-checklist.md
docs/accessibility/browser-audit.md
docs/accessibility/content-authoring-guide.md
```

## Next actions

1. Run and retain production smoke and browser audit reports.
2. Complete visual launcher validation, contrast, zoom, reflow, text-spacing, forced-colors, and screen-reader evidence.
3. Complete image and media alternative review.
4. Run a controlled production Contact submission and validate visitor success, database persistence, Sequenzy delivery, delivery-failure messaging, and retry/help handling.
5. Apply the shared specification to the separate Adventures repository when that work begins.

## Read next

```txt
02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
01 Daily Logs/[C] 2026-06-20 Workspace Sync — Portfolio Accessibility Icon and Contact Storage.md
01 Daily Logs/[C] 2026-06-20 Universal Accessibility Icon Update.md
01 Daily Logs/[C] 2026-06-20 Portfolio Contact Submission Storage Approved and Applied.md
```