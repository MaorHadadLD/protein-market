export type CategoryId = "powders" | "bars" | "drinks" | "bundles";

export type Category = { id: CategoryId; label: string };

export type ImageCredit = {
  /** Path under /public */
  src: string;
  width: number;
  height: number;
  author: string;
  license: string;
  licenseUrl: string;
  /** Page the photo was taken from */
  sourceUrl: string;
};

/** How the pack is photographed, which decides how the card presents it. */
export type PackShape =
  /** Background removed (derived alpha cutout in /public/products/cutouts). */
  | "cutout"
  /** A box front photographed edge to edge: shown as a rectangle that can cast a shadow. */
  | "box"
  /** A photo on white with no clean edge to cut along: shown flat on a white tile. */
  | "photo";

export type Protein = {
  grams: number;
  /** What the figure refers to, e.g. "לחטיף" or "למנה של 25 ג׳" */
  per: string;
};

export type Product = {
  id: string;
  brand: string;
  /** Product name as printed on the pack */
  name: string;
  /** Hebrew product type */
  kind: string;
  /** Flavour in Hebrew */
  flavor: string;
  /** Net weight / volume as printed on the pack */
  size: string;
  category: CategoryId;
  /** Shared by flavours of the same product line; they share one card with a flavour choice. */
  line?: string;
  /** Sample price in ILS (demo store) */
  price: number;
  /** Only present when read from the pack's nutrition label or front panel */
  protein?: Protein;
  barcode: string;
  image: ImageCredit;
  shape: PackShape;
  /** Transparent version of `image`, present when shape is "cutout". */
  cutout?: { src: string; width: number; height: number };
};

export const categories: Category[] = [
  { id: "powders", label: "אבקות חלבון" },
  { id: "bars", label: "חטיפי חלבון" },
  { id: "drinks", label: "משקאות" },
  { id: "bundles", label: "מארזים" },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, Category>;

const OFF_LICENSE = { author: "Open Food Facts contributors", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" };

const cutout = (slug: string, width: number, height: number) => ({ src: `/products/cutouts/${slug}.webp`, width, height });

function offImage(slug: string, barcode: string, width: number, height: number): ImageCredit {
  return {
    src: `/products/${slug}.jpg`,
    width,
    height,
    ...OFF_LICENSE,
    sourceUrl: `https://world.openfoodfacts.org/product/${barcode}`,
  };
}

/**
 * Real, existing products. Brand, name, flavour and size match the photo.
 * Protein figures were read from each pack's label; where no legible label
 * was available the field is omitted. Prices are demo prices.
 */
export const products: Product[] = [
  {
    id: "myprotein-impact-whey",
    brand: "Myprotein",
    name: "Impact Whey Protein",
    kind: "אבקת חלבון מי גבינה",
    flavor: "עוגת גבינה ואוכמניות",
    size: "1 ק״ג",
    category: "powders",
    price: 189,
    protein: { grams: 20, per: "למנה של 25 ג׳" },
    barcode: "5055936800243",
    image: offImage("myprotein-impact-whey-blueberry-cheesecake-1kg", "5055936800243", 299, 384),
    shape: "photo",
  },
  {
    id: "scitec-whey-isolate",
    brand: "Scitec Nutrition",
    name: "100% Whey Isolate",
    kind: "אבקת חלבון איזולט",
    flavor: "תות",
    size: "2 ק״ג",
    category: "powders",
    price: 349,
    barcode: "2000000149791",
    image: offImage("scitec-100-whey-isolate-strawberry-2kg", "2000000149791", 635, 933),
    shape: "cutout",
    cutout: cutout("scitec-100-whey-isolate-strawberry-2kg", 635, 933),
  },
  {
    id: "nu3-performance-whey",
    brand: "nu3",
    name: "Performance Whey",
    kind: "אבקת חלבון מי גבינה",
    flavor: "תות",
    size: "1 ק״ג",
    category: "powders",
    price: 169,
    protein: { grams: 74.1, per: "ל-100 ג׳" },
    barcode: "4260289446524",
    image: offImage("nu3-performance-whey-strawberry-1kg", "4260289446524", 375, 521),
    shape: "cutout",
    cutout: cutout("nu3-performance-whey-strawberry-1kg", 375, 521),
  },
  {
    id: "weider-yippie",
    brand: "Weider",
    name: "Yippie! Bar",
    kind: "חטיף חלבון",
    flavor: "שוקולד לבה",
    size: "70 ג׳",
    category: "bars",
    price: 12.9,
    protein: { grams: 26, per: "לחטיף" },
    barcode: "4044782306178",
    image: offImage("weider-yippie-chocolate-lava-70g", "4044782306178", 1000, 710),
    shape: "cutout",
    cutout: cutout("weider-yippie-chocolate-lava-70g", 1000, 710),
  },
  {
    id: "weider-60-protein-bar",
    brand: "Weider",
    name: "60% Protein Bar",
    kind: "חטיף חלבון",
    flavor: "עוגיות ושמנת",
    size: "45 ג׳",
    category: "bars",
    price: 13.9,
    protein: { grams: 27, per: "לחטיף" },
    barcode: "4044782309476",
    image: offImage("weider-60-protein-bar-cookies-cream-45g", "4044782309476", 1000, 309),
    shape: "cutout",
    cutout: cutout("weider-60-protein-bar-cookies-cream-45g", 1000, 309),
  },
  {
    id: "fulfil-salted-caramel",
    brand: "Fulfil",
    name: "Vitamin & Protein Bar",
    kind: "חטיף חלבון וויטמינים",
    flavor: "שוקולד וקרמל מלוח",
    size: "40 ג׳",
    category: "bars",
    price: 9.9,
    protein: { grams: 15, per: "לחטיף" },
    barcode: "5391532121758",
    image: offImage("fulfil-chocolate-salted-caramel-40g", "5391532121758", 479, 174),
    shape: "cutout",
    cutout: cutout("fulfil-chocolate-salted-caramel-40g", 479, 174),
  },
  {
    id: "yfood-crazy-coconut",
    brand: "yfood",
    name: "Crazy Coconut",
    kind: "משקה ארוחה מוכן",
    flavor: "קוקוס",
    size: "500 מ״ל",
    category: "drinks",
    line: "yfood-drink",
    price: 16.9,
    protein: { grams: 34, per: "לבקבוק" },
    barcode: "4260556630397",
    image: offImage("yfood-crazy-coconut-500ml", "4260556630397", 392, 1000),
    shape: "cutout",
    cutout: cutout("yfood-crazy-coconut-500ml", 392, 999),
  },
  {
    id: "yfood-heavenly-hazelnut",
    brand: "yfood",
    name: "Heavenly Hazelnut",
    kind: "משקה ארוחה מוכן",
    flavor: "אגוזי לוז",
    size: "500 מ״ל",
    category: "drinks",
    line: "yfood-drink",
    price: 16.9,
    protein: { grams: 34, per: "לבקבוק" },
    barcode: "4260556632209",
    image: offImage("yfood-heavenly-hazelnut-500ml", "4260556632209", 392, 1000),
    shape: "cutout",
    cutout: cutout("yfood-heavenly-hazelnut-500ml", 392, 999),
  },
  {
    id: "yalla-protein-milkshake",
    brand: "Arla Yalla!",
    name: "Protein Milkshake",
    kind: "מילקשייק חלבון",
    flavor: "וניל",
    size: "500 מ״ל",
    category: "drinks",
    price: 12.9,
    protein: { grams: 28, per: "לבקבוק" },
    barcode: "5711953130403",
    image: offImage("yalla-protein-milkshake-vanilla-500ml", "5711953130403", 311, 1000),
    shape: "photo",
  },
  {
    id: "quest-bar-12",
    brand: "Quest",
    name: "Protein Bar",
    kind: "מארז חטיפי חלבון",
    flavor: "שוקולד לבן ופטל",
    size: "12 × 60 ג׳",
    category: "bundles",
    price: 179,
    protein: { grams: 20, per: "לחטיף" },
    barcode: "0888849002221",
    image: offImage("quest-white-chocolate-raspberry-12x60g", "0888849002221", 757, 1000),
    shape: "box",
  },
  {
    id: "grenade-carb-killa-12",
    brand: "Grenade",
    name: "Carb Killa",
    kind: "מארז חטיפי חלבון",
    flavor: "חמאת בוטנים",
    size: "12 × 60 ג׳",
    category: "bundles",
    price: 169,
    // The photographed box front says 21 g per bar; the label photo in the same record says 20 g. Omitted until verified.
    barcode: "5060221203760",
    image: offImage("grenade-carb-killa-peanut-nutter-12x60g", "5060221203760", 391, 481),
    shape: "box",
  },
  {
    id: "fulfil-bar-12",
    brand: "Fulfil",
    name: "Vitamin & Protein Bar",
    kind: "מארז חטיפי חלבון וויטמינים",
    flavor: "שוקולד, קרמל ובצק עוגיות",
    size: "12 × 45 ג׳",
    category: "bundles",
    price: 119,
    barcode: "5391532121406",
    image: offImage("fulfil-chocolate-caramel-cookie-dough-12x45g", "5391532121406", 773, 1000),
    shape: "box",
  },
];

export const productById = Object.fromEntries(products.map((p) => [p.id, p])) as Record<string, Product>;

export const brands = [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b));

export const heroImage: ImageCredit = {
  src: "/hero/protein-shake-kitchen.jpg",
  width: 1920,
  height: 1280,
  author: "Shixart1985",
  license: "CC BY 2.0",
  licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Woman_measures_protein_powder_into_a_shaker_cup_in_a_kitchen_setting_while_preparing_for_a_workout.jpg",
};

/** One card in the store: a product, or several flavours of the same line. */
export type ProductGroup = { key: string; variants: Product[] };

export const groupKey = (p: Product) => p.line ?? p.id;

/** Groups products into cards, keeping the order in which each group first appears. */
export function groupProducts(list: Product[]): ProductGroup[] {
  const groups = new Map<string, Product[]>();
  for (const p of list) {
    const key = groupKey(p);
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  return [...groups].map(([key, variants]) => ({ key, variants }));
}

/** Every variant of a product's line, in catalog order. */
export const lineOf = (p: Product) => products.filter((x) => groupKey(x) === groupKey(p));

export type SortKey = "featured" | "price-asc" | "price-desc";

export const sortOptions: { id: SortKey; label: string }[] = [
  { id: "featured", label: "מומלץ" },
  { id: "price-asc", label: "מחיר: מהנמוך לגבוה" },
  { id: "price-desc", label: "מחיר: מהגבוה לנמוך" },
];

export function queryCatalog(opts: {
  query: string;
  category: CategoryId | "all";
  brands: string[];
  sort: SortKey;
}): Product[] {
  const q = opts.query.trim().toLowerCase();
  const list = products.filter((p) => {
    if (opts.category !== "all" && p.category !== opts.category) return false;
    if (opts.brands.length && !opts.brands.includes(p.brand)) return false;
    if (!q) return true;
    return [p.brand, p.name, p.kind, p.flavor, categoryById[p.category].label].join(" ").toLowerCase().includes(q);
  });
  if (opts.sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (opts.sort === "price-desc") list.sort((a, b) => b.price - a.price);
  return list;
}
