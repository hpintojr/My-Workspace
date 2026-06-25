---
type: character-bible
date: 2026-06-25
project: Benny & Penny's Adventures Book Series
sources: Bk1 outline.pdf · Bible bp character and book format.pdf (Author Bible v2.0)
---

# Character Bible — Master Index

This is the single front door to every character lock. Any AI (Claude, ChatGPT, Gemini, Canva) or human illustrator reads this **before drawing any character**. It exists to kill the #1 problem: each page currently renders Penny, Benny, and Ivy a little differently. Lock the look here, match it everywhere.

> **Golden rule (precedence):** When an approved reference image and a text description disagree, **the approved reference image wins.** Match the reference first, then apply the written fixes in each lock.

---

## Cast roster

**This pass — the three leads (LOCKED):**

| Character | Who | Lock file | Gold-standard reference |
|---|---|---|---|
| **Penny** | Brave 2–3-yr-old toddler, the heart of the series | `PENNY-CHARACTER-LOCK.md` | Book 1 cover · `3991.png` |
| **Benny Bear** | Penny's plush teddy-bear companion | `BENNY-CHARACTER-LOCK.md` | Book 1 cover · `3991.png` |
| **Nurse Ivy** | Warm home-infusion nurse (inspired by Michelle Marie Pinto, RN) | `NURSE-IVY-CHARACTER-LOCK.md` | Book 1 **Page 6** · `0449.png` (hair) |

**Device helpers (LOCKED against `8745.png`):**

| Character | Who | Lock file | Note |
|---|---|---|---|
| **Polly Pump** | Infusion pump — gives medicine a steady push | `POLLY-PUMP-CHARACTER-LOCK.md` | purple **smartphone-shaped**, heart button, **no bow** |
| **Danny Dial-a-Flow** | Tubing device — controls drip speed (not medicine) | `DANNY-DIAL-A-FLOW-CHARACTER-LOCK.md` | purple capsule, numbered dial, built into tubing, **no bow** |
| **Ellie Infusion Ball** | Holds medicine inside, squeezes it out gently | `ELLIE-INFUSION-BALL-CHARACTER-LOCK.md` | cream round ball, **only one with the mint bow** |

> ⚠️ Art-vs-text correction: the written bible gave Polly a mint bow, but the **approved art (`8745.png`) shows no bow on Polly or Danny — only Ellie**. Per the precedence rule, the locks follow the art. Flag for Michelle if she wants Polly's bow restored.

*Other characters exist in the Author Bible (Dad Hamilton, Percy Port, Polly PICC, Sunny SubQ) for later books — not in scope for Book 1's lock-down. They live in the Author Bible PDF and will get their own locks when their books are produced.*

---

## Reference-image registry (drop files in `_reference-images/`)

| File | What it locks | Status |
|---|---|---|
| `0449.png` | Nurse Ivy **hair + likeness** (Book 1 Page 7 art) — soft wavy, low bun, NOT too curly | ✅ in repo · ☐ author sign-off |
| `3991.png` | **Penny + Benny** approved likeness (on a pink round rug; target = pink **heart** rug) | ✅ in repo · ☐ author sign-off |
| `8745.png` | The **three device helpers** together (Polly/Danny/Ellie master) | ✅ in repo · ☐ author sign-off |
| Book 1 cover | Penny + Benny series gold standard | ☐ pending final cover |
| Book 1 Page 6 | Nurse Ivy series gold standard | ☐ pending final art |

When a file lands, tick it here and in the character's own lock, and flip the lock's reference row to "Approved" once Michelle signs off.

---

## Relationships & scale

- **Penny** is a toddler; she **carries/hugs Benny** — Benny is about her torso size, clearly a held plush toy.
- **Nurse Ivy** is an adult who **lowers to Penny's eye level** (kneels/sits) in nearly every interaction — never towering.
- **Device helpers** are small, friendly characters near the IV pole/tubing; **only one is used at a time** in any scene.
- **Emotional rule:** in any medical moment at least one calm, reassuring face is visible. Penny may look nervous but is always safe; Benny is always present as comfort.

## Series visual system (from Author Bible)

- **Palette:** mint green (primary), dusty rose pink, soft lavender, warm cream backgrounds, soft teal accents, sky blue.
- **Recurring motifs:** floating **hearts & stars**; encouraging **framed wall signs**; mint bows; heart shapes (Penny's dress hearts, Benny's foot hearts).
- **Style:** soft, whimsical, cozy storybook illustration; rounded friendly forms; warm even lighting; never hyper-realistic, never scary.
- **Child-safe medical rule:** equipment is simplified and friendly; **no scary needles, no blood**; the soft catheter ("tiny bendy straw") is emphasized over the needle.
- **Text is live/editable** — never bake story wording into AI illustrations.

## Page & format standards (from Author Bible — for layout, not character art)

- **Trim:** 8.5 × 8.5 in square. Official interior format = **27 interior pages** (Front matter I–III + Story + Activity + Parent/Caregiver + closing). *Note: the current Bk1 outline runs long (~48 sections) — reconciling that draft into the 27-page interior is a separate layout task, tracked outside this bible.*
- **Front matter:** Title (I) → Copyright (II) → Dedication (III), Roman numerals, purple banner top-right + pink heart bottom-right.
- **Story/back pages:** odd pages → purple banner **top-left** + pink heart number **bottom-left**; even pages → **top-right / bottom-right**.
- **Keep numbers, hearts, and text away from edges** so art can be used as a spread later.
- **Author credit:** "Written by Michelle Marie Pinto, RN." Copyright © 2026, First Edition.
- **Covers:** upper-left lavender "BOOK N" banner + pink heart; BENNY (mint) & PENNY (dusty rose) logo + lavender ADVENTURES ribbon; mint border.

## Consistency workflow (every character, every page)

1. **Read** this master + the specific character lock(s) for the page.
2. **Attach the approved reference image** to the AI tool; generate using the lock's prompt seed.
3. **Compare to the lock** — run the DO-NOT-DRIFT checklist (especially Benny's head/muzzle and Ivy's hair/skin).
4. **Flag drift**, regenerate or fix. Never ship a page that fails the checklist.
5. **Author sign-off** before a reference is marked "Approved" and reused as canon.

## How AIs should describe each lead (quick prompt seeds)

- **Penny / Benny / Nurse Ivy:** use the "Reusable AI prompt seed" at the bottom of each character's lock file, and attach the matching reference image.

---

*Maintainer note: character lock files use the kit's UPPERCASE naming so they sit together in `01-characters/`. This master index and the reference drop-folder are AI-authored (`[C]` / `_` prefixed). Update the dashboard's **Locks** column for Book 1 as references get approved.*
