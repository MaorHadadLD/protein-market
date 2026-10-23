"use client";

import { useRef } from "react";
import { categoryById, groupProducts, sortOptions, type CategoryId, type Product, type SortKey } from "@/lib/catalog";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Filters } from "./Filters";
import { ProductCard } from "./ProductCard";

type Props = {
  results: Product[];
  query: string;
  category: CategoryId | "all";
  onCategory: (c: CategoryId | "all") => void;
  selectedBrands: string[];
  onBrands: (b: string[]) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  onReset: () => void;
};

export function Catalog({ results, query, category, onCategory, selectedBrands, onBrands, sort, onSort, onReset }: Props) {
  const title = category === "all" ? "כל המוצרים" : categoryById[category].label;
  const filtered = Boolean(query) || category !== "all" || selectedBrands.length > 0;
  const activeFilters = selectedBrands.length + (category !== "all" ? 1 : 0);
  const panel = useRef<HTMLDetailsElement>(null);
  // Flavours of one product line share a card; counts are of cards, not flavours.
  const cards = groupProducts(results);
  const countLabel = (n: number) => (n === 1 ? "מוצר אחד" : <><span className="num">{n}</span> מוצרים</>);

  return (
    <section id="products" aria-labelledby="products-title" className="px-4 pt-14 pb-24 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-[80rem]">
        <div className="relative flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h2 id="products-title" className="display text-sign-md sm:text-sign-lg">
              {title}
            </h2>
            <p className="mt-1 text-base text-ink-2" aria-live="polite">
              {countLabel(cards.length)}
              {query && (
                <>
                  {" "}
                  עבור <bdi className="font-medium text-ink">״{query}״</bdi>
                </>
              )}
              {filtered && (
                <button type="button" onClick={onReset} className="ms-3 min-h-11 font-medium text-ink underline underline-offset-4">
                  ניקוי הכול
                </button>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="order-1 flex items-center gap-2 text-sm text-ink-2">
              <span className="hidden sm:inline">מיון:</span>
              <span className="sr-only sm:hidden">מיון</span>
              <select
                value={sort}
                onChange={(e) => onSort(e.target.value as SortKey)}
                className="h-11 cursor-pointer rounded-[var(--radius-control)] border border-line-strong bg-surface px-3 text-sm font-medium text-ink"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <details ref={panel} className="order-2 lg:hidden">
              <summary className="press flex h-11 cursor-pointer list-none items-center gap-2 rounded-[var(--radius-control)] border border-line-strong px-3.5 text-sm font-medium [&::-webkit-details-marker]:hidden">
                <Icon name="sliders" className="size-4" />
                סינון
                {activeFilters > 0 && (
                  <span className="num grid size-5 place-items-center rounded-full bg-accent text-xs text-surface">{activeFilters}</span>
                )}
              </summary>
              <div className="enter absolute inset-x-0 top-full z-20 mt-2 origin-top rounded-[var(--radius-card)] border border-line bg-surface p-4 shadow-[var(--shadow-raised)] sm:start-auto sm:w-80 sm:origin-top-left">
                <Filters category={category} onCategory={onCategory} selectedBrands={selectedBrands} onBrands={onBrands} />
                <Button
                  className="sticky bottom-0 mt-4 w-full"
                  onClick={() => {
                    if (panel.current) panel.current.open = false;
                    document.getElementById("products")?.scrollIntoView();
                  }}
                >
                  <span>הצגת {countLabel(cards.length)}</span>
                </Button>
              </div>
            </details>
          </div>
        </div>

        {/* The result area keeps its height while filters change, so the page never jumps under the reader. */}
        <div className="mt-8 grid gap-10 lg:min-h-[52rem] lg:grid-cols-[13rem_1fr]">
          <aside aria-label="סינון" className="hidden lg:block">
            <Filters category={category} onCategory={onCategory} selectedBrands={selectedBrands} onBrands={onBrands} />
          </aside>

          {cards.length > 0 ? (
            <div
              className="grid min-h-[40rem] w-full grid-cols-[repeat(auto-fit,minmax(min(100%,9.5rem),1fr))] content-start gap-x-3 gap-y-10 self-start sm:grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] sm:gap-x-5 sm:gap-y-12 xl:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]"
              // A short result list never stretches into empty columns or one huge card.
              style={{ maxWidth: `min(100%, ${cards.length * 18}rem)` }}
            >
              {cards.map((g, i) => (
                <ProductCard key={g.variants[0].id} product={g.variants[0]} eager={i < 4} />
              ))}
            </div>
          ) : (
            <div className="min-h-[40rem] self-start rounded-[var(--radius-card)] bg-subtle">
              <EmptyState
                icon="search"
                title="לא נמצאו מוצרים"
                body={
                  <p>
                    {query ? (
                      <>
                        אין מוצר שמתאים ל<bdi className="font-medium text-ink">״{query}״</bdi> עם הסינון הנוכחי.
                      </>
                    ) : (
                      "אין מוצר שמתאים לשילוב הסינון הזה."
                    )}{" "}
                    נסו מילה אחרת, למשל שם מותג, או נקו את הסינון.
                  </p>
                }
                action={<Button variant="secondary" onClick={onReset}>ניקוי חיפוש וסינון</Button>}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
