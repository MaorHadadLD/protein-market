# Image sources

All images in this folder are real product photographs from **Open Food Facts** (https://world.openfoodfacts.org), contributed by the Open Food Facts community and licensed **CC BY-SA 3.0** (https://creativecommons.org/licenses/by-sa/3.0/). Attribution: *Open Food Facts contributors*.

Changes made: white margins trimmed and images resized for the web; the Quest box photo was also cropped to the box edges to remove the table behind it. No other edits. Under CC BY-SA these adapted files are shared under the same license.

| File | Product | Barcode | Source |
|---|---|---|---|
| `myprotein-impact-whey-blueberry-cheesecake-1kg.jpg` | Myprotein Impact Whey Protein (עוגת גבינה ואוכמניות, 1 ק״ג) | 5055936800243 | https://world.openfoodfacts.org/product/5055936800243 |
| `scitec-100-whey-isolate-strawberry-2kg.jpg` | Scitec Nutrition 100% Whey Isolate (תות, 2 ק״ג) | 2000000149791 | https://world.openfoodfacts.org/product/2000000149791 |
| `nu3-performance-whey-strawberry-1kg.jpg` | nu3 Performance Whey (תות, 1 ק״ג) | 4260289446524 | https://world.openfoodfacts.org/product/4260289446524 |
| `weider-yippie-chocolate-lava-70g.jpg` | Weider Yippie! Bar (שוקולד לבה, 70 ג׳) | 4044782306178 | https://world.openfoodfacts.org/product/4044782306178 |
| `weider-60-protein-bar-cookies-cream-45g.jpg` | Weider 60% Protein Bar (עוגיות ושמנת, 45 ג׳) | 4044782309476 | https://world.openfoodfacts.org/product/4044782309476 |
| `fulfil-chocolate-salted-caramel-40g.jpg` | Fulfil Vitamin & Protein Bar (שוקולד וקרמל מלוח, 40 ג׳) | 5391532121758 | https://world.openfoodfacts.org/product/5391532121758 |
| `yfood-crazy-coconut-500ml.jpg` | yfood Crazy Coconut (קוקוס, 500 מ״ל) | 4260556630397 | https://world.openfoodfacts.org/product/4260556630397 |
| `yfood-heavenly-hazelnut-500ml.jpg` | yfood Heavenly Hazelnut (אגוזי לוז, 500 מ״ל) | 4260556632209 | https://world.openfoodfacts.org/product/4260556632209 |
| `yalla-protein-milkshake-vanilla-500ml.jpg` | Arla Yalla! Protein Milkshake (וניל, 500 מ״ל) | 5711953130403 | https://world.openfoodfacts.org/product/5711953130403 |
| `quest-white-chocolate-raspberry-12x60g.jpg` | Quest Protein Bar, מארז 12 (שוקולד לבן ופטל, 12 × 60 ג׳) | 0888849002221 | https://world.openfoodfacts.org/product/0888849002221 |
| `grenade-carb-killa-peanut-nutter-12x60g.jpg` | Grenade Carb Killa, מארז 12 (חמאת בוטנים / Peanut Nutter, 12 × 60 ג׳) | 5060221203760 | https://world.openfoodfacts.org/product/5060221203760 |
| `fulfil-chocolate-caramel-cookie-dough-12x45g.jpg` | Fulfil Vitamin & Protein Bar, מארז 12 (שוקולד, קרמל ובצק עוגיות, 12 × 45 ג׳) | 5391532121406 | https://world.openfoodfacts.org/product/5391532121406 |

## Cutouts (`cutouts/*.webp`)

Seven of the photos above also exist as transparent cutouts so the packs can stand on the page's shelf: Scitec 100% Whey Isolate, nu3 Performance Whey, both yfood bottles, Weider Yippie!, Weider 60% Protein Bar and the single Fulfil bar. They are derived from the same Open Food Facts files by `scripts/cutouts.py`: the white background is removed by a flood fill from the image border (plus a two-pixel clean-up of the light JPEG halo), and the alpha edge is softened by one pixel. The packaging itself is not recoloured, retouched or cropped. As adaptations of CC BY-SA 3.0 works they are shared under the same licence, with the same attribution.

Not cut out, on purpose: the Quest, Grenade and Fulfil 12-bar boxes are already photographed edge to edge (they are shown as box fronts), and the Myprotein pouch and the Yalla bottle cap are white on white, so there is no edge to cut along without damaging the pack.

## Hero photo (no longer shown)

`/public/hero/protein-shake-kitchen.jpg`: “Woman measures protein powder into a shaker cup in a kitchen setting while preparing for a workout” by **Shixart1985**, Wikimedia Commons, licensed **CC BY 2.0** (https://creativecommons.org/licenses/by/2.0/). Source: https://commons.wikimedia.org/wiki/File:Woman_measures_protein_powder_into_a_shaker_cup_in_a_kitchen_setting_while_preparing_for_a_workout.jpg. Resized to 1920 px wide; no other edits. Since the 2026-10-23 redesign the hero is built from the product cutouts and this photo is not shown anywhere; the file is kept for reference and can be deleted.

## Data notes

- Brand, product name, flavour and net size match the photographed pack.
- Protein figures were read from each pack's nutrition label or front panel, and cross-checked against the Open Food Facts record for the same barcode (2026-10-23). Scitec 100% Whey Isolate and the Fulfil 12-bar box had no legible label in the source, so the store shows no protein figure for them.
- Grenade Carb Killa: the photographed box front says **21 g** protein per 60 g bar, while the nutrition-label photo in the same record says **20 g**. The two photos are probably different pack revisions, so the store shows no protein figure for this product until it is checked against the real pack.
- yfood Crazy Coconut and Heavenly Hazelnut are two flavours of the same 500 ml drink line. The store shows them as one card with a flavour choice; each flavour keeps its own photo, barcode and figures.
- Prices are demo prices, not real retail prices.

## Files worth replacing

These photos are usable but low resolution (under 500 px on the long side), and look soft on high-density screens. Replace them with an official packshot once you have permission to use one:

- `myprotein-impact-whey-blueberry-cheesecake-1kg.jpg` (299×384)
- `nu3-performance-whey-strawberry-1kg.jpg` (375×521)
- `grenade-carb-killa-peanut-nutter-12x60g.jpg` (391×481)
- `fulfil-chocolate-salted-caramel-40g.jpg` (479×174)
