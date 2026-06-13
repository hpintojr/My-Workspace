---
type: playbook
project: XBeton
topic: Gemini AI Video — Product Consistency
date: 2026-06-10
author: Claude
pairs_with: "[C] Product Visual Reference & AI Prompt Kit.md"
---

# XBeton — Gemini Video Consistency Playbook

How to get Gemini (Veo) to produce **realistic, on-product video without the glitches** — warping, morphing, surface "boiling," and the block changing shape mid-clip. The realism is already there; the consistency comes from *how* you drive the model, not from a better prompt alone.

**The one principle:** never generate product video from text. Make one perfect still, then **animate that still** (image-to-video). Text-to-video lets Gemini re-invent the block on every frame — that's the source of almost every glitch you saw.

---

## The workflow (every product clip follows this)

```
1. LOCK a clean seed image  →  2. ANIMATE it (image-to-video)  →
3. CONSTRAIN motion + duration  →  4. Generate 3–4 takes, CUT the clean seconds  →
5. SAVE the winner as a reusable anchor
```

### Step 1 — Lock the seed image
- Make the hero still where you get the best image results (ChatGPT/GPT-image has worked well for you), using the **Locked Product Block** from the Prompt Kit.
- Requirements for a good seed: clean, symmetrical, **plain background**, **no text/logo** (text warps first in video — add branding in edit later), correct color/texture/proportion.
- Regenerate until one is genuinely right. Everything downstream inherits this frame, so it's worth the extra tries.

### Step 2 — Animate, don't generate
- In Gemini: **Video → upload the still → "animate this image" (image-to-video).**
- This locks appearance to your frame. It is the single biggest consistency lever — more than any wording.

### Step 3 — Constrain motion and duration
- **One motion only.** Rotation *or* a slow dolly — never camera move + subject move together.
- **Slow and steady.** Fast motion is where morphing shows.
- **5–8 seconds.** Drift compounds over time; shorter = cleaner.
- **Plain background.** Fewer elements for the model to reinvent.

### Step 4 — Treat output as raw b-roll
- Generate **3–4 takes**. Keep the cleanest **3–5 seconds**, cut before any drift starts.
- Edit the good seconds together; you rarely need a flawless full clip.

### Step 5 — Save the winner
- A clean clip's frames become seeds for sibling shots. Consistency snowballs the more you reuse approved frames.

---

## Ready-to-use prompts

### Product hero / turntable (start here — easiest win)
**Seed still (ChatGPT):**
```
Studio product photograph of a single XBeton AAC building block. Pale off-white
to light-grey autoclaved aerated concrete with a fine, uniform porous texture
(tiny air pockets, NOT gravel or aggregate). Clean factory-cut rectangular edges
with a subtle tongue-and-groove step on the long edge. Large rectangular block,
8x24 inch face — long and low, 1:3 proportion. Centered on a seamless light-grey
background, soft even studio lighting, 3/4 angle. Sharp focus, commercial product
photography. No text, no logo.
```
**Animate (Gemini, image-to-video):**
```
The block rotates slowly a full 360 degrees on a turntable, smooth and steady.
The camera stays completely still. Soft even studio lighting. The block's shape,
color, porous texture, and edges stay exactly the same the entire time.
Photorealistic. No morphing, no warping, no text.
```
Duration 5–8s · aspect 4:5 (feed) or 9:16 (Reels). If it warps: drop to 4–5s or ask for a **slow 90° turn** instead of a full 360.

### Slow reveal (alternative hero, even more stable)
```
Slow cinematic push-in toward the block, the camera drifting gently closer while
the block stays still. Soft studio light, shallow depth of field. Shape, color,
and porous texture remain identical throughout. Photorealistic, no warping.
```

### Jobsite b-roll (once turntable is dialed in)
Seed from an approved wall/install still, then:
```
Slow steady dolly moving past a wall of XBeton AAC blocks on a sunny construction
site. Gentle camera motion, everything stable and photorealistic, natural daylight.
The blocks keep the same pale color and porous texture throughout. No morphing.
```
*Avoid close-ups of hands doing fast detailed work — that's where motion artifacts are worst.*

---

## Settings checklist (Gemini app)
- [ ] **Image-to-video** selected (not text-to-video).
- [ ] Seed image is clean, symmetrical, **text-free**, plain background.
- [ ] **One** motion type only.
- [ ] Duration **5–8s**.
- [ ] Aspect ratio set for the destination (9:16 Reels/Stories, 4:5 or 1:1 feed, 16:9 YouTube).
- [ ] Generate **3–4 variations**.

## Power option — Google Flow (Veo)
If your plan includes **Flow**, it gives real control the chat UI doesn't:
- **Frames to Video:** set your approved still as the **first frame** (and optionally a second still — e.g. block turned 90° — as the **last frame**). The model interpolates between locked endpoints = far less drift.
- **Ingredients to Video:** register the block as a consistent "ingredient" reused across multiple clips for a uniform campaign look.
- **Camera controls + extend:** add deliberate, gentle moves and stitch clean clips.

---

## Using the "VEO3 Movie Scene Creator" GPT (Colton Havens)
This custom GPT writes rich, structured Veo 3 prompts (scene, subject, camera, lighting, style, **native audio**). Use it for cinematic polish — but adapt it to our consistency method, since movie-scene GPTs lean narrative/text-to-video.

**Brief to paste into the GPT (turntable example):**
```
Write a VEO3 prompt for a high-end COMMERCIAL PRODUCT shot — no characters,
no dialogue, no narrative.

SUBJECT: a single XBeton AAC building block — pale off-white to light-grey
autoclaved aerated concrete, fine uniform porous texture (tiny air pockets,
NOT gravel/aggregate), clean factory-cut rectangular edges with a subtle
tongue-and-groove step on the long edge, large 8x24 inch face, long and low
(1:3 proportion). No text or logo on it.

SCENE: the block on a turntable in a clean studio, seamless light-grey
background, slowly rotating a full 360 degrees, camera locked and still.

MOOD: premium, modern, high-tech building material — like a luxury product film.

CONSTRAINTS: the block's shape, color, and porous texture must stay perfectly
consistent the whole time; slow smooth motion; no morphing or warping.

I'm using this as image-to-video with my own seed image, so describe the LOOK
precisely and keep audio minimal (soft ambient studio tone only).
```

**Then, before you run it in Gemini:**
1. Paste the GPT's prompt as the **text**, but **upload your approved seed still and run image-to-video** (not text-to-video). This is what marries its polish to our consistency.
2. **Delete any dialogue/voiceover** it adds — Veo 3 has native audio and will generate spoken lines literally.
3. **Trim camera moves to one** — these GPTs stack dolly + crane + push-in; keep only the single slow rotation, or the drift comes back.
4. Keep **audio minimal** (soft ambient tone); add real music/VO in your editor afterward.

For other scenes (jobsite, fire demo), reuse the same brief structure — just swap the SUBJECT to the installed wall/scene and keep the CONSTRAINTS block identical.

## Glitch → fix cheat sheet
| What you see | Cause | Fix |
|---|---|---|
| Block changes shape / morphs | Text-to-video, or messy seed | Image-to-video from a clean, symmetrical seed |
| Surface "boils" / shimmers | Too much motion | Slow it down; shorten to 4–5s |
| Logo / label text warps | Text in the seed frame | Remove text from seed; add branding in edit |
| Color drifts grey↔white | Long clip, mixed lighting cues | Shorter clip; specify "soft even studio lighting" |
| Looks like a cinder block | Seed wasn't product-accurate | Re-make seed with the Locked Product Block; rule out holes/oval cells |
| Weird hands/tools on jobsite | Fast detailed human motion | Avoid close fast action; keep camera on the product/wall |

---

## Reality notes
- Google updates Gemini/Veo/Flow often, so exact button labels may shift — the **method** (lock a still → image-to-video → minimal slow motion → short clips → cut) holds regardless.
- Once the plant shoot happens, swap AI seed stills for **real product photos** as the first frame. Real reference = the most consistent results possible.

*Pairs with `[C] Product Visual Reference & AI Prompt Kit.md` (the Locked Product Block, negative prompts, and brand identity live there).*
