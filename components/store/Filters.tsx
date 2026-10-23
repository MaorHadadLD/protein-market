"use client";

import { useId } from "react";
import { brands, categories, groupKey, products, type CategoryId } from "@/lib/catalog";

type Props = {
  category: CategoryId | "all";
  onCategory: (c: CategoryId | "all") => void;
  selectedBrands: string[];
  onBrands: (b: string[]) => void;
};

// Counts cards (a product line with several flavours is one card), matching the result count.
const countBy = (fn: (p: (typeof products)[number]) => boolean) => new Set(products.filter(fn).map(groupKey)).size;

export function Filters({ category, onCategory, selectedBrands, onBrands }: Props) {
  // Desktop and mobile each render a copy; radios need their own group name.
  const group = useId();
  const cats: { id: CategoryId | "all"; label: string; n: number }[] = [
    { id: "all", label: "כל המוצרים", n: countBy(() => true) },
    ...categories.map((c) => ({ id: c.id, label: c.label, n: countBy((p) => p.category === c.id) })),
  ];
  return (
    <div className="flex flex-col gap-7">
      <fieldset>
        <legend className="mb-2 text-base font-semibold">קטגוריה</legend>
        <ul className="flex flex-col">
          {cats.map((c) => (
            <li key={c.id}>
              <label className="flex min-h-10 cursor-pointer items-center gap-2.5 text-base">
                <input type="radio" name={`category-${group}`} checked={category === c.id} onChange={() => onCategory(c.id)} className="size-4" />
                <span className={category === c.id ? "font-medium" : "text-ink-2"}>{c.label}</span>
                <span className="num ms-auto text-sm text-ink-2">{c.n}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-base font-semibold">מותג</legend>
        <ul className="flex flex-col">
          {brands.map((b) => {
            const on = selectedBrands.includes(b);
            return (
              <li key={b}>
                <label className="flex min-h-10 cursor-pointer items-center gap-2.5 text-base">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => onBrands(on ? selectedBrands.filter((x) => x !== b) : [...selectedBrands, b])}
                    className="size-4 rounded"
                  />
                  <bdi className={on ? "font-medium" : "text-ink-2"}>{b}</bdi>
                  <span className="num ms-auto text-sm text-ink-2">{countBy((p) => p.brand === b)}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </div>
  );
}
