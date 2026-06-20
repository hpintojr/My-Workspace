---
author: ChatGPT
type: daily
project: bennyandpenny.com — Portfolio
date: 2026-06-20
scope: WCAG 2.2 AA accessibility automation continuation
---

# BennyAndPenny.com — Accessibility Automation and Browser Audit

## What changed

The portfolio now has two layers of automated accessibility regression coverage in `hpintojr/bennyandpenny`:

```txt
1. Server-rendered smoke test
   Script: scripts/accessibility-smoke.mjs
   Command: npm run a11y:smoke
   Workflow: .github/workflows/accessibility-smoke.yml

2. Browser WCAG audit
   Tests: tests/accessibility/wcag.spec.ts
   Config: playwright.accessibility.config.ts
   Command: npm run a11y:axe
   Workflow: .github/workflows/accessibility-axe.yml
```

The browser audit uses Playwright and axe-core in desktop and mobile Chromium. It checks WCAG 2.0, 2.1, and 2.2 A/AA rules and fails only on critical or serious violations. It also verifies Contact validation feedback and mobile-menu Escape behavior.

## Additional remediation

- The Work and Adventures visual brand lockups now expose the full name **Benny & Penny's Adventures** to screen readers.
- The 404 page now uses its own title and description while Next.js controls the standard `noindex` behavior. Duplicate robots metadata was removed.
- The browser audit and smoke-test runbooks were added under `docs/accessibility/`.

## Documentation added

```txt
Repo documentation:
docs/accessibility/browser-audit.md
docs/accessibility/phase-1-automation-addendum.md

Existing supporting files:
docs/accessibility/phase-1-baseline.md
docs/accessibility/manual-qa-checklist.md
docs/accessibility/automated-smoke-test.md
```

## Verification status

```txt
Vercel production builds for the committed accessibility changes have been completing successfully.
The latest code needs an actual manual GitHub Action or local command run before its smoke and browser-audit results can be marked passed.
```

## Required next steps

```txt
1. Run the manual GitHub Actions against https://www.bennyandpenny.com:
   - Accessibility Smoke Test
   - Browser Accessibility Audit

2. Save the generated Playwright report / failure artifacts if anything is found.

3. Complete the manual QA checklist:
   docs/accessibility/manual-qa-checklist.md

4. Perform real NVDA + Chrome/Firefox and VoiceOver + Safari tests.

5. Complete full contrast, zoom/reflow, text-spacing, reduced-motion, and forced-colors validation.

6. Do not state that the site is fully ADA compliant until the independent audit and legal review are complete.
```

## Read next

```txt
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Accessibility Phase 1.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Accessibility Automation and Browser Audit.md
```
