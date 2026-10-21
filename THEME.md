# THEME — Angel & David · Pearl White Christian Wedding Invitation

Companion to [PRD.md](PRD.md). This file defines the visual direction, colour palette, typography, materials, motion character, and the asset checklist. Any item marked **Proposal** is a suggestion awaiting the couple's review. Any item marked **To be provided** must come from the couple or their designer.

---

## 1. Visual direction

**Mood:** quiet luxury, sacred, bright, tactile. The invitation should feel like holding a heavy, embossed pearl-white card that has been tied with white satin and decorated with a few fresh white flowers and real pearls.

**Keywords:** pearl, satin, lace, embossed paper, white blooms, olive branch, candle-light softness (without cinematic glow), generous white space.

| Do | Avoid |
|---|---|
| Realistic materials: lustrous round pearls, white satin with soft sheen, fine lace edging, subtle blind-embossed paper | Cartoon or clip-art styling, flat emoji-like icons |
| Restrained floral clusters at corners and section breaks | Floral wallpaper, florals behind body text |
| Black / dark-charcoal text for every paragraph and label | Grey-on-white text with low contrast, gold text |
| White flowers with olive-green foliage; green kept inside the floral work | Green used for large fills, backgrounds or body text |
| Hairline rules, pearl dot dividers, small Christian cross | Heavy gold foil, glitter, lens flares, bokeh, dramatic lighting |
| Crisp, sharp, high-resolution artwork | Blurry, upscaled, or heavily compressed images |
| Calm, short animations that imitate real material (cloth, paper) | Cinematic camera moves, long intros, fast or heavy parallax (only a gentle drift of the edge flowers) |

**Christian elements:** a small, fine-line Latin cross (never oversized), a Bible verse with reference and translation, and an olive branch motif (peace) within the florals.

**Opening:** a full-screen envelope in the couple's white lace and pearl embroidery, closed with a pearl dove seal, lights up and its four flaps open onto the card; then the couple's white wedding car, seen from above, drives down a clear path between fine stems of small pearl-and-satin flowers (modelled on the couple's reference video and image).

**Whole page (modelled on the couple's reference videos):** one continuous pearl-white linen paper; small pearl flowers peeking in at the section edges and drifting slowly as guests scroll; content arriving with a soft focus-pull and small heading lines spelling themselves out letter by letter; the Welcome opens on the couple photograph in black and white, drifting slowly with a gentle parallax. At the very end, after the thank-you, the wedding car drives in and parks on a slant at the bottom left, the couple waving, beside the "A & D" monogram. Typography and colours stay as below (black ink).

---

## 2. Colour palette

Main colours are pearl white, white, soft ivory and black. Olive green appears only in the florals and foliage.

### Core tokens

| Token | Hex | Use |
|---|---|---|
| `--pearl` | `#F8F6F1` | Main page background (warm pearl white) |
| `--white` | `#FFFFFF` | Cards, envelope, dialogs, satin highlights |
| `--ivory` | `#F3EEE3` | Alternate section background, card insets, embossed paper |
| `--ivory-deep` | `#EAE3D4` | Embossing shadow, pressed states |
| `--ink` | `#121212` | Headings, primary buttons, couple's names |
| `--charcoal` | `#2B2A28` | Body text (contrast ≈ 13:1 on `--pearl`) |
| `--muted` | `#5C5852` | Secondary text, captions (contrast ≈ 6.6:1 on `--pearl`) |
| `--hairline` | `#D9D3C7` | Rules, borders, dividers |

### Pearl and satin shading (decoration only — never for text)

| Token | Hex | Use |
|---|---|---|
| `--pearl-hi` | `#FFFFFF` | Pearl specular highlight |
| `--pearl-mid` | `#EEE9E1` | Pearl body |
| `--pearl-lo` | `#D3CBBD` | Pearl edge shadow |
| `--pearl-blush` | `#F2E9E6` | Very faint rosé overtone on pearls |
| `--satin-fold` | `#E2DDD3` | Satin fold shadow |
| `--satin-deep` | `#C9C2B4` | Deepest satin crease |

### Floral greens (inside florals only)

| Token | Hex | Use |
|---|---|---|
| `--olive` | `#6B7445` | Main olive leaves |
| `--olive-deep` | `#4E5632` | Stems, leaf shadows |
| `--olive-soft` | `#A3AA7E` | Leaf highlights, flower centres, tiny accents |

### Feedback colours

| Token | Hex | Use |
|---|---|---|
| `--error` | `#8A2B2B` | Form errors, always paired with an icon and text |
| `--focus` | `#121212` | 2 px focus ring with 2 px white offset |

Success states use charcoal text with a pearl check mark, not bright green, to keep green inside the florals.

---

## 3. Typography

All fonts are free Google Fonts, loaded with `display=swap`.

| Role | Font | Weights | Where |
|---|---|---|---|
| Display serif | **Cormorant Garamond** | 500, 600, italic 500 | Section titles, large date, countdown numbers, event names |
| Calligraphy (selective) | **Pinyon Script** | 400 | "Angel & David", "January", "Thank you", monogram — never for paragraphs or labels |
| Body and UI | **Jost** | 400, 500 | Paragraphs, labels, buttons, form fields, captions |

### Type scale (mobile → desktop, fluid with `clamp()`)

| Style | Size | Notes |
|---|---|---|
| Couple's names (script) | 3.25rem → 5.5rem | `--ink`, line-height 1 |
| Section title (serif) | 2rem → 3rem | weight 500, letter-spacing 0.01em |
| Eyebrow / kicker | 0.75rem → 0.8125rem | Jost 500, uppercase, letter-spacing 0.22em |
| Body | 1rem → 1.0625rem | Jost 400, line-height 1.65, max line length ≈ 62ch |
| Invitation message | 1.25rem → 1.5rem | Cormorant italic 500, `--charcoal` |
| Date focus "27" | 6rem → 10rem | Cormorant 500, lining figures |
| Countdown numbers | 2.25rem → 3.25rem | Cormorant 600, tabular lining figures |
| Buttons | 0.875rem | Jost 500, uppercase, letter-spacing 0.14em, min height 48 px |

Rules: minimum body size 16 px; script never below 1.75rem; no all-caps paragraphs; numerals use `font-variant-numeric: lining-nums tabular-nums`.

---

## 4. Materials and ornaments

| Material | Character | Implementation in v1 | Final production asset |
|---|---|---|---|
| Round pearls | Lustrous, slightly warm, crisp specular point, soft contact shadow | CSS radial gradients and SVG radial gradients | Optional transparent WebP strands for hero areas |
| White satin ribbon and bow | Smooth sheen bands, soft folds, V-cut tails | Retired from the opening (replaced by the wedding-car drive); satin tones remain in the palette | — |
| Lace | Fine scalloped edge with small eyelets | Repeating SVG pattern on card edges | Optional lace edge PNG/WebP (transparent) |
| Embossed paper | Faint fibre texture, blind-embossed border | Inline SVG noise + inset shadows | Optional paper texture WebP (≤ 60 KB) |
| White flowers | Gardenia / jasmine / white rose style, soft grey-ivory shading | Generated SVG blooms with gradients | Recommended: transparent WebP floral corners, photographed or high-end illustrated |
| Olive foliage | Narrow olive leaves, deep olive stems | Generated SVG sprigs | Included in floral WebP above |
| Christian cross | Fine Latin cross, 1–1.5 px line | SVG | SVG (final) |

Spacing: generous. Section vertical padding 5–8 rem; cards 1.5–2.5 rem inner padding; never fewer than 24 px between interactive targets.

Corners: cards 4 px radius (paper-like), buttons fully rounded (pill), photos 2 px radius with a pearl-dot frame.

Shadows: soft and low — `0 1px 2px rgba(18,18,18,.06), 0 12px 32px -12px rgba(18,18,18,.12)`. No coloured glows.

---

## 5. Motion character

- Feels physical: satin slides and settles, paper lifts, envelope flap hinges.
- Durations: micro 150–250 ms, reveals 400–700 ms, splash total ≈ 2.2 s.
- Easing: `cubic-bezier(.22,.61,.36,1)` for settling; `cubic-bezier(.65,0,.35,1)` for cloth pulling.
- Scroll-linked, at one steady rate (no easing): the gentle drift of the edge flowers.
- Parking at the end: the car drives in from the left over 3.2 s, turning into a 32° slant and slowing to a stop (once per visit).
- Reveals: content rises slightly and comes into focus (blur → sharp) over about 1 s; small heading lines appear letter by letter (55 ms per letter) out of a soft blur, as in the couple's slideshow video.
- Welcome photo: the black-and-white couple photo drifts at one steady speed (16 s) and moves at 22 % of the scroll (parallax); the names come into focus over about 2 s. Several photos crossfade every 7 s (1.8 s fade).
- `prefers-reduced-motion: reduce` replaces every movement with a short cross-fade or an instant state change; the car is simply shown parked at the end.
- No auto-playing sound.

---

## 6. Asset checklist

Status key: **Built** = created in code for v1 · **Placeholder** = framed placeholder shown in v1 · **To be provided** = must come from the couple · **Recommended** = optional upgrade for a more realistic finish.

### 6.1 Vector assets (SVG)

| # | Asset | Used in | Format | Status |
|---|---|---|---|---|
| V1 | Fine Latin cross | Welcome, thank-you, favicon | SVG | Built |
| V2 | Monogram "A & D" | Splash card, header | SVG / live text | Built (live text) |
| V3 | Pearl dot divider | Section breaks | SVG / CSS | Built |
| V4 | Lace scallop edge | Cards, envelope card | SVG pattern | Built |
| V5 | Olive sprig and white bloom set | Florals throughout | SVG (generated) | Built — final realistic florals Recommended as WebP |
| V6 | Event illustrations (Haldi bowl, Mehendi cone, Sangeet dholak, Church, Reception cake) | Wedding events | SVG line art | Built |
| V7 | Dress-code illustrations (saree drape, suit) | Dress code | SVG line art | Built — reference photos To be provided |
| V8 | UI icons (calendar, map pin, phone, WhatsApp, close, menu, arrow up, check) | All | SVG | Built |
| V9 | Family tree connectors and floral branch | Family-tree overlay | SVG | Built |

### 6.2 Realistic raster assets (transparent PNG / WebP)

| # | Asset | Used in | Format and size | Status |
|---|---|---|---|---|
| R1 | Wedding car with couple, seen from above (supplied, transparent) | Opening | WebP with alpha, 720 × 1219, 180 KB — `wedding-car.webp` | Done |
| R1b | White net flower with pearls (supplied, background removed) | iPhone showcase page corners | WebP with alpha, 720 × 449, 137 KB — `net-flower.webp` | Done |
| R1c | Pearl-and-satin flower (supplied, background removed, gold softened to champagne, soft shadow baked in), cut into five pieces: bloom, bud, spray, pearl drops, pearl sprig | Opening flower columns (small flowers on generated SVG stems), section edges, welcome, thank-you, parking place | WebP with alpha — `pearl-bloom.webp` (463 × 509), `pearl-bud.webp`, `pearl-spray.webp` (640 × 890), `pearl-drops.webp`, `pearl-sprig.webp`; 13–90 KB each | Done |
| R1e | Pearls and crystals (cut from the couple's pearl image), composed into the Save the Date ring | Save the Date | WebP with alpha, 1000 × 1000, 225 KB — `pearl-ring.webp` | Done |
| R1f | Petals: 8 satin pearl-white petals (texture from the couple's satin-petal image) and 6 real white rose petals (from the couple's rose-petal image), shaped as rose petals with a soft shadow | Save the Date wreath and shower | WebP with alpha, ≈ 4–5 KB each — `petals/satin-1…8.webp`, `petals/rose-1…6.webp` | Done |
| R1g | Champagne-bronze glitter texture for the "Save the Date" lettering | Save the Date | WebP, 320 × 320 tile, 22 KB — `lettering-glitter.webp` | Done |
| R1h | Beaded pearl flower (modelled on the couple's photo: frosted petals with texture from it, white pearls, silver seed beads), two variations, plus a countdown version with a larger frosted centre | Countdown | WebP with alpha, 640 × 640, ≈ 90 KB each — `beaded-flower-1/2.webp`, `beaded-flower-cd-1/2.webp` | Done |
| R1i | Chain of white pearls and silver seed beads (repeating tile) | Countdown | WebP with alpha, 60 × 30 — `bead-chain.webp` | Done |
| R1d | Couple photograph, black and white (sample supplied for the design; carries a photographer's "Maab Road" tag) | Welcome | WebP, 736 × 1104, 72 KB — `couple-bw.webp` | To be replaced with Angel & David's own photograph |
| R2 | Floral corner — white flowers, olive leaves, pearls | Welcome, thank-you | WebP with alpha, 900 × 900, ≤ 120 KB | Recommended |
| R3 | Pearl strand (draped) | Countdown, dividers | WebP with alpha, 1600 × 300, ≤ 60 KB | Recommended |
| R4 | White gift envelope (front, back, flap) | Gifting | WebP with alpha, 1200 × 900 each, ≤ 100 KB | Recommended (v1 uses CSS/SVG envelope) |
| R5 | Paper texture (embossed ivory) | Backgrounds | WebP, 800 × 800 tileable, ≤ 60 KB | Recommended (v1 uses inline SVG noise) |
| R6 | Lace edge strip | Cards | WebP with alpha, 1600 × 120, ≤ 40 KB | Recommended |

### 6.3 Photographs

| # | Asset | Used in | Format and size | Status |
|---|---|---|---|---|
| P1 | Bride's family photograph | Parents and family | WebP/AVIF, 1200 × 1500 (4:5), ≤ 200 KB | To be provided |
| P2 | Groom's family photograph | Parents and family | WebP/AVIF, 1200 × 1500 (4:5), ≤ 200 KB | To be provided |
| P3 | Family-tree portraits (optional, per person) | Family-tree overlay | WebP, 400 × 400, ≤ 40 KB each | To be provided (optional) |
| P4 | Church ceremony venue photograph | Venues | WebP/AVIF, 1600 × 1000, ≤ 220 KB | To be provided |
| P5 | Reception venue photograph | Venues | WebP/AVIF, 1600 × 1000, ≤ 220 KB | To be provided |
| P6 | Other event venue photographs | Venues | WebP/AVIF, 1600 × 1000, ≤ 220 KB | To be provided (if different venues) |
| P7 | Dress-code reference images | Dress code | WebP, 800 × 1000, ≤ 100 KB each | To be provided |
| P8 | Social share image | `<meta property="og:image">` | JPG, 1200 × 630, ≤ 200 KB | To be provided |

### 6.4 Motion

| # | Asset | Used in | Format | Status |
|---|---|---|---|---|
| M1 | Car driving down the opening | Opening | Animated in code from R1 (no video needed) | Built |
| R2b | Real lace pieces from the supplied envelope (gold reduced to white): two pearl flower sprays, embroidered motif, seamless pearl-bead trim | Opening flaps | WebP with alpha — `lace-spray-left.webp`, `lace-spray-right.webp`, `lace-motif.webp`, `lace-pearl-trim.webp` | Done |
| R2c | Pearl dove wax seal (supplied, background removed) | Opening | WebP with alpha, 360 × 360 — `dove-seal.webp` | Done |
| M2b | Full-screen four-flap envelope opening: light bloom + sheen + sparkles, then sides, top (with seal) and bottom flaps fold away | Opening | CSS 3D + keyframes | Built |
| M4 | The wedding car drives in and parks on a slant beside the monogram, couple waving | Thank you (end of page) | CSS keyframes from R1, started by `js/sections/14-thank-you.js` | Built |
| M5 | Edge flowers drifting with the scroll; focus-pull reveals; letter-by-letter heading lines | Whole page | `js/decor.js`, `AD.letters` in `js/core.js`, CSS | Built |
| M8 | Countdown garland: beaded flowers open one after another, the pearl-and-bead chain is strung between them; numbers fade as they change | Countdown | CSS + `js/sections/04-countdown.js` | Built |
| M7 | Tap the petals: satin petals burst, swirl and settle into a wreath, the date appears, real rose petals shower down | Save the Date | Web Animations API, `js/sections/03-save-the-date.js` | Built |
| M6 | Black-and-white couple photo: slides down from the top into place when guests reach it, then the text appears letter by letter; slow drift and parallax; names focusing in | Welcome | CSS + `js/sections/02-welcome.js` | Built |
| M2 | Handwriting reveal "Thank you for blessing our journey." | Thank you | SVG stroke animation | Built |
| M3 | Floral branch reveal | Family-tree overlay | SVG stroke + fade | Built |

### 6.5 Design sources

| Item | Status |
|---|---|
| Figma designs | To be provided — when supplied, Figma values override this file |
| Brand or monogram artwork | To be provided (v1 uses "A & D" in Pinyon Script) |

### 6.6 Delivery rules for assets

- Put files in `site/assets/images/` (photos, raster decorations) and `site/assets/video/` (motion), then reference them from `site/content.js`.
- Provide originals at 2× the listed size; the build will use the listed size.
- Transparent decorations must have clean edges (no white halos) because they sit on pearl-white and ivory backgrounds.
- Name files in lowercase with hyphens, e.g. `family-bride.webp`, `venue-church.webp`.
