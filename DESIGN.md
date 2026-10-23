---
name: Protein Market
description: "The shelf": a contemporary Hebrew RTL sports-nutrition store where real packs stand on one shelf line, set in signage-scale Hebrew type.
colors:
  chalk: "#f3f2ee"
  surface: "#ffffff"
  subtle: "#e9e7e1"
  stone: "#dedbd3"
  line: "#dcd9d2"
  line-strong: "#c3c0b8"
  ink: "#121315"
  ink-2: "#53565c"
  ink-hover: "#2c2f33"
  accent: "#c8361a"
  accent-hover: "#ad2d14"
  accent-soft: "#f7e2da"
  coconut: "#cfdbe5"
  hazelnut: "#dfe3b9"
  on-ink: "#c9c7c1"
  on-ink-2: "#a9a7a1"
  on-ink-3: "#8d8b86"
  shadow-contact: "rgb(18 19 21 / 0.3)"
  backdrop: "rgb(18 19 21 / 0.36)"
typography:
  display:
    fontFamily: "Karantina, Heebo, Arial Hebrew, sans-serif"
    fontSize: "clamp(4.25rem, 21vw, 6rem) phone; clamp(5rem, 9.2vw, 8.5rem) from 768px"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "0"
  sign-max:
    fontFamily: "Karantina"
    fontSize: "14.5rem"
    fontWeight: 700
    lineHeight: 0.78
  sign-xl:
    fontFamily: "Karantina"
    fontSize: "6rem"
    fontWeight: 700
    lineHeight: 0.82
  sign-lg:
    fontFamily: "Karantina"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 0.86
  sign-md:
    fontFamily: "Karantina"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 0.9
  sign-sm:
    fontFamily: "Karantina"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "\"tnum\", \"lnum\""
  sign-xs:
    fontFamily: "Karantina"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1
  lead:
    fontFamily: "Heebo, Arial Hebrew, system-ui, sans-serif"
    fontSize: "1.125rem / 1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  product-name:
    fontFamily: "Heebo"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "Heebo"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Heebo"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
rounded:
  control: "6px"
  card: "10px"
  panel: "12px"
  full: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter: "24px"
  grid-gap-mobile: "12px"
  grid-gap: "20px"
  grid-row-gap: "40px / 48px"
  container: "80rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    height: "44px"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 28px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "44px"
  product-tile:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    aspectRatio: "4 / 5"
  quantity-stepper:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.control}"
    height: "44px"
  count-badge:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    height: "18px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.card}"
  demo-ribbon:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.ink-2}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.chalk}"
---

# Design System: Protein Market

## Overview

**Creative North Star: "The Shelf" (המדף).**

A specialist store seen the way a person who trains sees it: real packs from known brands standing side by side on one shelf, with the facts written on them in big, honest signage. The packs are the hero. Everything else is chalk wall, ink type and space.

The system has three peak moments and calm, shoppable stretches between them:

1. **The hero**: the headline "המדף של מי שמתאמן" set at signage scale beside six real packs standing on a stone shelf.
2. **The featured story**: one product line (yfood, the only line with two real flavours and verified figures) told in four beats as the page scrolls.
3. **The add to cart**: the photo travels to the cart and the count answers.

The catalog, the filters, the drawer and the footer are deliberately quiet: white tiles on chalk, no frames, no badges.

**Key characteristics:**

- Packs as objects. Seven Open Food Facts photos have alpha cutouts derived from the photo itself (`scripts/cutouts.py`). They stand on a baseline with a soft contact shadow. Box fronts stay rectangles, and white-on-white photos stay flat photos.
- Two faces: Karantina 700 (condensed Hebrew, signage) and Heebo (everything that is read).
- One signal colour, taken from the packs (Grenade's band, the Quest box), used sparingly.
- Hebrew RTL throughout: logical properties, `bdi` around Latin brand and product names.

## Colors

### Ground and ink

- **Chalk** (`#f3f2ee`): the page. A low-chroma bone grey, close to the packshot white, so the white tiles read as a tone step and not a frame.
- **Surface** (`#ffffff`): product tiles, inputs, the drawer and the buy rows.
- **Subtle** (`#e9e7e1`): the demo ribbon, the featured buy band, the no-results panel, hover fills.
- **Stone** (`#dedbd3`): the shelf: the hero shelf band and every tile's shelf edge.
- **Ink** (`#121315`): all running text, primary buttons and the footer field.
- **Ink 2** (`#53565c`): secondary notes only (brand line, size, counts). Never running text.
- **On ink** (`#c9c7c1`, `#a9a7a1`, `#8d8b86`): text on the ink footer, in three steps.

### Signal

- **Signal** (`#c8361a`, hover `#ad2d14`, 5.25:1 against white text): the hero call to action, the cart count, the "just added" pill and the filter count. Nothing else.
- **Signal soft** (`#f7e2da`): text selection.

### Story fields

- **Coconut** (`#cfdbe5`) and **Hazelnut** (`#dfe3b9`) are sampled from the two yfood bottles and used only as the fields of the featured story and its buy rows.

### Named rules

**The Signal Rule.** Signal marks the one action of the first screen and the cart's answers (count, just added). Product actions stay ink. If an element wants signal only for emphasis, it does not get it.

**The Pack Colour Rule.** Any colour beyond chalk, ink and signal must come from a pack in the catalog, and it may only fill a field behind that pack.

## Typography

**Display face:** Karantina 700 (and 400 for the dimmed half of the wordmark). Condensed Hebrew signage with a sporting energy, used only where something is meant to be seen from across the aisle.
**Text face:** Heebo, the variable font, 400 to 600.

### Hierarchy

- **Display** (`clamp(4.25rem, 21vw, 6rem)` on phones, `clamp(5rem, 9.2vw, 8.5rem)` from 768px, leading 0.86): the hero headline only, in two masked lines.
- **Story statements** (`clamp(6rem, 11vw, 10rem)`), and the big number "34" (`clamp(14rem, 24vw, 22rem)`): desktop featured story only.
- **Signage ramp** (tokens `text-sign-*`):
  - `xs` 1.75rem: the wordmark.
  - `sm` 2rem: shelf-tag prices, buy-row prices and the cart total, with tabular numerals.
  - `md` 3.5rem: section titles on phones, the buy-band title, the credits title.
  - `lg` 4.5rem: section titles from 640px, and the phone story statement.
  - `xl` 6rem: the phone story's big number and statements from 640px.
  - `max` 14.5rem: the footer name.
- **Lead** (Heebo 400, 18–20px, leading 1.625, max 34ch): the hero and story sentences.
- **Product name** (Heebo 600, 16px): card and line titles.
- **Body** (Heebo 400, 16px) and **body-sm** (14px, Ink 2): card metadata (brand, size, protein, flavour), counts and notes.

### Named rules

**The Signage Rule.** Karantina is for things you read from a distance: the headline, section titles, prices and big numbers. Sentences are never set in it, and it is never mixed with Heebo inside one heading.

**The Tabular Facts Rule.** Every price, quantity, count and protein figure uses tabular lining numerals.

## Layout

A centred container (max 80rem) with 16px gutters on phones and 24px from 640px.

- **Hero:** from 768px, a 12-column grid. Headline, sentence and call to action take 5 columns at the start (right). The shelf stage takes 7 columns at the end (aspect 720:520), standing on a full-width stone shelf band (56px). On phones the copy comes first and the stage (aspect 358:220, five packs) sits on a 36px shelf.
- **Featured:** from 1024px with scroll timelines and motion allowed, a 340vh section with a sticky 100vh stage. The text beats take 5 columns at the start, the bottles 7 at the end. Elsewhere it is a still composition: statement, two bottles side by side on their own colours, and the "34" fact. A subtle buy band always follows, with the title in 4 columns and two buy rows in 8.
- **Catalog:** a 13rem filter column from 1024px, plus an auto-fit grid (min 9.5rem on phones for two-up, 12.5rem from 640px, 14rem from 1280px) with 12/20px column gaps and 40/48px row gaps. The result area has a fixed minimum height (52rem from 1024px, 40rem for the grid), so filtering never pulls the page up under the reader.
- **Footer:** an ink field: four columns, the name at full width, attribution.

## Elevation and depth

Depth belongs to the packs, not to the interface.

- **Pack shadow:** a static `drop-shadow(0 6px 8px rgb(18 19 21 / 0.12–0.16))` on cutouts and box fronts.
- **Contact shadow:** a blurred ink ellipse (`rgb(18 19 21 / 0.3)`, blur 7–9px) where a pack meets the shelf or its tile's floor. Static blur, animated only through transform and opacity.
- **Raised** (`0 2px 6px …/0.06, 0 14px 36px -12px …/0.22`): only what floats, meaning the cart drawer, the toast and the phone filter panel.

**The Flat UI Rule.** Tiles, buttons and inputs have no shadow. Surfaces separate by tone (chalk, white, subtle, stone, ink).

## Shapes

Radii in three steps: 6px for controls, chips and pills, 10px for tiles, the toast and buy rows, 12px for panels and the phone story field. The cart count is fully round. Borders are 1px and only on controls and chrome (header, filter row, drawer separators). Icons are one stroked set (24px grid, 1.75 stroke).

**The Uncut Pack Rule.** Packs are always `object-fit: contain` and stand on the bottom of their tile (`object-position: bottom`), with padding chosen per shape. Nothing is cropped. Overlaps on the hero shelf only touch the bottom edge of a pack, never its label.

**The Source Size Rule.** A photo is never shown much larger than its source pixels. Small sources (nu3, Myprotein, Fulfil bar) are placed further back or smaller.

## Components

### Buttons
- **Accent** (hero only): signal fill, white 500 text, 48px tall, 28px inline padding, trailing arrow (it points left, which is forward in RTL).
- **Primary:** ink fill, 44px. Used for add to cart, the demo order and recovery actions.
- **Secondary:** white with a firm 1px border.
- All of them press to `scale(0.97)` (`.press`).

### Product card
- No frame. A 4:5 white tile whose bottom 15% is a stone **shelf edge**: the pack stands on it, and the price sits on it as the shelf tag (`sign-xs` on phones, `sign-sm` from 640px). Under the tile: brand (14px, Ink 2), name (16px 600), size · protein (only when verified), flavour as "טעם: …" or, for a line with several real flavours, radio chips that swap the photo, then a full-width 44px add button that becomes a stepper. Screen readers get the price as text after the name; the visual tag is hidden from them.
- Hover (fine pointers only): the pack lifts 6px off the shelf edge and its contact shadow narrows and fades.
- The "נוסף לסל" pill is signal; "בסל: n" is chalk.

### Featured buy row
White row: the bottle on its own colour, name, flavour · size, price, and the add button or stepper.

### Header
Sticky chalk bar. From 1024px it is one row: wordmark, five category tabs (active tab has an ink 2px underline), search, cart. Below that, search (phone) and short category tabs ("הכול, אבקות, חטיפים, משקאות, מארזים") sit in a second row.

### Cart drawer
A native modal `dialog` from the inline end, 28rem wide, raised. Opening it focuses the panel; Escape closes it and focus returns to the cart button. Each line has a 72px chalk tile, name, flavour · size, unit price, remove, stepper and line total. The footer holds the total in `sign-sm`, "sample prices, no charge", and the demo order button.

### Toast
Ink, 10px radius, bottom centre, check icon, the product name isolated with `bdi`, up to two lines, and a "view cart" action. It never takes focus.

### Demo ribbon
Subtle band, 14px, "חנות הדגמה · המחירים באתר הם מחירי דוגמה ולא יבוצע חיוב". Always present.

## Motion

Curves (Emil Kowalski): `--ease-out cubic-bezier(0.23, 1, 0.32, 1)` for UI, `--ease-in-out cubic-bezier(0.77, 0, 0.175, 1)` for travel, `--ease-drawer cubic-bezier(0.32, 0.72, 0, 1)` for the drawer. Transform and opacity only (plus clip-path, a 2px blur on photo swaps, and background-color on the story field).

| Moment | What moves | Values |
| --- | --- | --- |
| Hero load (once) | headline lines rise inside a mask; copy rises; packs settle on the shelf | 720ms with 80ms stagger; 600ms at +220ms; 700ms at +320ms with 60ms stagger; CSS keyframes |
| Hero pointer | pack layers drift sideways by depth (front 1.0, back 0.35), up to 14px, never up or down, so packs stay on the shelf | rAF lerp 0.09 writing `transform` directly, stops when settled; fine pointer only |
| Featured scroll | bottle eases down; "34" rises out of a mask; coconut crossfades to hazelnut while stacked field layers crossfade by opacity; the bottles part (coconut to the right, named first in RTL); captions | one CSS view timeline (`animation-range: contain`), linear, transform and opacity only, no JS |
| Add to cart | ghost photo flies to the cart with a slight lift; count bumps on landing | WAAPI 520ms ease-in-out; bump 280ms; a stepper step only bumps |
| Card hover | pack lifts 6px, shadow narrows | 260ms ease-out, fine pointer only |
| Filter / sort | cards glide to their new place | view transitions, 280ms |
| Flavour swap | photo crossfades with a 2px blur | 220ms |
| Drawer | slides in, then lines stagger in | 300ms drawer curve in, 200ms out; lines 240ms, 40ms stagger |
| Press / mount | `scale(0.97)`; fade up 4px | 100ms in / 160ms release; 200ms `@starting-style` |

**Reduced motion:** headline and packs fade only; no parallax, no fly-to-cart (the count still updates), no press scale, no view-transition glide, and the drawer fades. The featured section switches to its still composition.

## Do's and don'ts

### Do
- Let real packs carry the page: cutouts when the photo allows, box fronts as boxes, flat photos when the pack is white on white.
- Keep product facts tied to the photographed pack. Show protein only when verified, and say "according to the label" when it is a story fact.
- Use Karantina for signage and Heebo for reading.
- Keep signal for the first action and the cart's answers.
- Give every peak a calm stretch after it.

### Don't
- Don't present a flat photo as a 3D model (no rotateX/Y tilts on packs).
- Don't crop packs or cover labels; overlaps touch bottoms only.
- Don't upscale small sources; move them back on the shelf instead.
- Don't add infinite loops, floating badges, gradients for decoration, or the same entrance on every section.
- Don't invent reviews, ratings, promotions, discounts, shipping promises or health claims.
