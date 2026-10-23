"use client";

import { useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { categories, queryCatalog, type CategoryId, type SortKey } from "@/lib/catalog";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/components/cart/CartProvider";
import { Toast } from "@/components/ui/Toast";
import { DemoRibbon } from "./DemoRibbon";
import { SiteHeader } from "./SiteHeader";
import { Hero } from "./Hero";
import { Featured } from "./Featured";
import { Catalog } from "./Catalog";
import { SiteFooter } from "./SiteFooter";

// Keyboard changes (arrowing through filter radios) fire once per key: those apply instantly.
let lastInputWasKey = false;
if (typeof window !== "undefined") {
  window.addEventListener("keydown", () => (lastInputWasKey = true), { capture: true });
  window.addEventListener("pointerdown", () => (lastInputWasKey = false), { capture: true });
}

const productsInView = () => {
  const r = document.getElementById("products")?.getBoundingClientRect();
  return !!r && r.top < window.innerHeight && r.bottom > 0;
};

/** Reorder with a view transition so cards glide to their new place, only when the grid is on screen. */
function withTransition(update: () => void) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced || lastInputWasKey || !productsInView()) return update();
  document.startViewTransition(() => flushSync(update));
}

// An instant jump: a smooth scroll from the top would scrub the pinned story on the way down.
const toProducts = () => document.getElementById("products")?.scrollIntoView({ behavior: "instant" });

export function Storefront() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");
  const { lastAdded, items, open } = useCart();

  const results = useMemo(
    () => queryCatalog({ query, category, brands: selectedBrands, sort }),
    [query, category, selectedBrands, sort],
  );
  const added = lastAdded ? items.find((i) => i.product.id === lastAdded)?.product : undefined;

  // Footer and other plain links can open a category: #products-<category id>.
  useEffect(() => {
    const apply = () => {
      const id = window.location.hash.replace("#products-", "");
      if (!window.location.hash.startsWith("#products-") || !categories.some((c) => c.id === id)) return;
      setCategory(id as CategoryId);
      history.replaceState(null, "", "#products");
      requestAnimationFrame(toProducts);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return (
    <>
      <DemoRibbon />
      <SiteHeader
        query={query}
        onQuery={setQuery}
        onSearchSubmit={toProducts}
        activeCategory={category}
        onCategory={(c) => {
          // From far up the page: jump, then show the result without a glide.
          if (productsInView()) withTransition(() => setCategory(c));
          else setCategory(c);
          toProducts();
        }}
      />
      <main>
        <Hero />
        <Featured />
        <Catalog
          results={results}
          query={query}
          category={category}
          onCategory={(c) => withTransition(() => setCategory(c))}
          selectedBrands={selectedBrands}
          onBrands={(b) => withTransition(() => setSelectedBrands(b))}
          sort={sort}
          onSort={(s) => withTransition(() => setSort(s))}
          onReset={() =>
            withTransition(() => {
              setQuery("");
              setCategory("all");
              setSelectedBrands([]);
            })
          }
        />
      </main>
      <SiteFooter />
      <CartDrawer />
      <Toast
        message={
          added && (
            <>
              נוסף לסל: <bdi>{`${added.brand} ${added.name}`}</bdi>, {added.flavor}
            </>
          )
        }
        messageKey={added?.id}
        actionLabel="לצפייה בסל"
        onAction={open}
      />
    </>
  );
}
