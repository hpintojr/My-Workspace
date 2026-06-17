---
type: project-update
project: Benny & Penny's Adventures
date: 2026-06-16
status: accepted
updated_by: ChatGPT
---

# Admin Desktop Toggle Status — 2026-06-16

## Status

Accepted by user.

User confirmed after deploy/hard refresh:

```txt
looks good both desktop and mobile views
```

Accepted state:

- Desktop greeting spacing reads `Welcome, Hamilton Pinto!`.
- Desktop open sidebar toggle shows the dark teal heart instead of the `<` / chevron.
- Desktop collapsed/sidebar-open toggle shows the branded heart treatment instead of the basic hamburger.
- Mobile view still works and did not regress.
- The mobile grey hover square/artifact is gone from desktop view.

---

## Purpose

This note captures the late-session admin desktop sidebar toggle work for the Payload admin panel.

The user wanted the **desktop** admin sidebar controls to visually match the accepted mobile branded heart behavior:

- Desktop collapsed/open-menu hamburger should become a **red circle with a white heart**.
- Desktop open-sidebar close/collapse chevron (`<`) should become a **dark teal/black heart** with no teal/grey square hover background.
- Mobile sidebar/hamburger work must remain protected and should not regress.

---

## Website Repo

```txt
hpintojr/bennyandpennyadventures
```

---

## Important DOM Findings

The exact rendered desktop controls were inspected in Chrome DevTools.

### Desktop open-sidebar close button

```html
<div class="template-default__nav-toggler-wrapper" id="nav-toggler">
  <div class="template-default__nav-toggler-container" id="nav-toggler">
    <button aria-label="Close Menu" class="nav-toggler nav-toggler--is-open template-default__nav-toggler" tabindex="0" type="button">
      <div class="hamburger">
        <div aria-label="Collapse" class="hamburger__close-icon" title="Collapse">
          <svg class="icon icon--chevron" ... style="transform: rotate(90deg);">...</svg>
        </div>
      </div>
    </button>
  </div>
</div>
```

### Desktop collapsed/sidebar-open button

```html
<div class="template-default__nav-toggler-container" id="nav-toggler">
  <button aria-label="Open Menu" class="nav-toggler template-default__nav-toggler" tabindex="0" type="button">
    <div class="hamburger">
      <div aria-label="Open" class="hamburger__open-icon" title="Open">
        <svg class="icon icon--menu" ...>...</svg>
      </div>
    </div>
  </button>
</div>
```

### Mobile toggler that still exists in desktop DOM

```html
<button aria-label="Open Menu" class="nav-toggler app-header__mobile-nav-toggler" tabindex="-1" type="button">...</button>
```

When sidebar is open:

```html
<button aria-label="Close Menu" class="nav-toggler nav-toggler--is-open app-header__mobile-nav-toggler" tabindex="-1" type="button">...</button>
```

Important distinction:

```txt
Desktop button class: template-default__nav-toggler
Mobile button class: app-header__mobile-nav-toggler
```

The mobile toggle can still be discovered/hovered in the desktop DOM, so desktop CSS must explicitly avoid or disable it under desktop breakpoints.

---

## Debugging Notes

Earlier desktop attempts targeted the wrong layer or used selectors scoped beneath `.template-default`. The screenshots and DevTools showed that the desktop toggler wrapper can sit outside the `.template-default` shell.

That means selectors like this may not hit the real desktop toggle:

```css
.template-default .template-default__nav-toggler-container > button.template-default__nav-toggler
```

The final direction was to use global Payload toggle classes **inside a desktop media query**:

```css
@media (min-width: 901px) {
  .template-default__nav-toggler-wrapper,
  .template-default__nav-toggler-container,
  button.nav-toggler.template-default__nav-toggler:not(.app-header__mobile-nav-toggler) {
    ...
  }
}
```

---

## Website Files Changed

```txt
app/(payload)/admin-dashboard-final-polish.scss
app/(payload)/admin-desktop-nav-toggle.scss
app/(payload)/layout.tsx
app/(payload)/components/BeforeDashboard.tsx
```

A temporary runtime component was created during debugging and then removed:

```txt
app/(payload)/components/AdminNavToggleStyler.tsx
```

Do not reintroduce the runtime component unless absolutely necessary. CSS was enough once the exact DOM was known.

---

## Relevant Commits

### Wrong/experimental attempts, then rollback

```txt
1512c728ca815f448447d55a90caf8b77c53d146
Brand desktop admin nav toggles with hearts

0a3f42a3e5bd757a44cb833e458e92ec771ae9a0
Retarget desktop admin sidebar toggle hearts

ddfed79220ee964e1d7fee582c002f65600d9ff8
Add admin nav toggle styler

c1ce805b05afec2fda6e44382597913badda5b27
Mount admin nav toggle styler

7b5a2bbc878b056f5212847e53af0191ba20df6c
Replace desktop toggle CSS with runtime-marked classes

e1d6595d056ae84c5f31746c19efb0c866a4691b
Avoid repeated nav toggle class churn

31cdb98228659e3f58ae17aeb503cc7334514a6e
Restore mobile-only admin final polish

26dff6a97f158d31426d5e5aca8c148e092306eb
Remove desktop toggle styler from admin layout

1cbdaddd14cf137a638e38c1bcaa2bf8a6730d0c
Remove admin nav toggle styler experiment
```

### Accepted targeted desktop/admin greeting work

```txt
112615cb484dc319219c4b0d23c8cdb98183b25c
Target exact desktop admin nav toggles

4264fc9331a87785614301ca0e50fa543e6b5dab
Add exact desktop nav toggle override

b5f7e7ca9fc33d38945a01fd8be6f7ad06a4e060
Load desktop nav toggle override last

e678610a677948f7046eef8dadc6df1bc5df99ec
Retarget desktop nav toggles outside admin shell

f0de9ab63cbe54407b262ffed100c74b18595447
Add space after welcome comma
```

---

## Current CSS Direction

Keep desktop toggle styling isolated in:

```txt
app/(payload)/admin-desktop-nav-toggle.scss
```

Keep mobile accepted behavior isolated in:

```txt
app/(payload)/admin-dashboard-final-polish.scss
```

The desktop file should load after the final mobile polish file:

```txt
import "./admin-dashboard-final-polish.scss";
import "./admin-desktop-nav-toggle.scss";
```

---

## Final Validation Result

Accepted by user after latest patches:

```txt
looks good both desktop and mobile views
```

Validated items:

1. Desktop open sidebar:
   - Dark teal heart visible.
   - No grey/teal hover square.
   - Click still collapses sidebar.

2. Desktop collapsed sidebar:
   - Branded heart treatment visible.
   - Click still opens sidebar.

3. Mobile/iPhone:
   - Accepted mobile heart behavior still works.
   - No mobile grey hover artifact regression reported.

---

## Guardrails

Do not use broad selectors like this for desktop again:

```css
.template-default .nav-toggler
button[aria-label*='open']
button[aria-label*='close']
```

They can accidentally target generic controls, the wrong Payload layer, or mobile toggles still present in the DOM.

Preferred desktop selector pattern:

```css
@media (min-width: 901px) {
  button.nav-toggler.template-default__nav-toggler:not(.app-header__mobile-nav-toggler) {}
}
```

Preferred mobile selector area remains the existing mobile-only block in:

```txt
app/(payload)/admin-dashboard-final-polish.scss
```

---

## Next Focus

Admin toggle work is accepted. Move to:

```txt
Customer portal mobile validation and final launch cleanup.
```
