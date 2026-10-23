"use client";

import { useEffect, useRef } from "react";
import { categories, type CategoryId } from "@/lib/catalog";
import { CART_LANDED } from "@/lib/fly-to-cart";
import { useCart } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { SearchField } from "./SearchField";
import { Wordmark } from "./Wordmark";

const shortLabels: Record<CategoryId, string> = { powders: "אבקות", bars: "חטיפים", drinks: "משקאות", bundles: "מארזים" };

type Props = {
  query: string;
  onQuery: (q: string) => void;
  onSearchSubmit: () => void;
  activeCategory: CategoryId | "all";
  onCategory: (id: CategoryId | "all") => void;
};

export function SiteHeader({ query, onQuery, onSearchSubmit, activeCategory, onCategory }: Props) {
  const { count, open } = useCart();
  const nav: { id: CategoryId | "all"; label: string; short: string }[] = [
    { id: "all", label: "כל המוצרים", short: "הכול" },
    ...categories.map((c) => ({ ...c, short: shortLabels[c.id] })),
  ];
  const badge = useRef<HTMLSpanElement>(null);

  // The count nudges when the flying photo lands. WAAPI cancels the previous run,
  // so rapid adds retarget instead of stacking or restarting from zero.
  useEffect(() => {
    const bump = () => {
      const el = badge.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      el.getAnimations().forEach((a) => a.cancel());
      el.animate([{ transform: "scale(1)" }, { transform: "scale(1.22)" }, { transform: "scale(1)" }], {
        duration: 280,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      });
    };
    window.addEventListener(CART_LANDED, bump);
    return () => window.removeEventListener(CART_LANDED, bump);
  }, []);

  const navButtons = (compact: boolean) =>
    nav.map((c) => {
      const on = activeCategory === c.id;
      return (
        <button
          key={c.id}
          type="button"
          aria-pressed={on}
          onClick={() => onCategory(c.id)}
          className={`relative shrink-0 px-2 py-3 text-base whitespace-nowrap transition-colors duration-150 sm:px-3 ${
            on ? "font-semibold text-ink" : "text-ink-2 hover:text-ink"
          }`}
        >
          {compact ? (
            <>
              <span className="sm:hidden">{c.short}</span>
              <span className="hidden sm:inline">{c.label}</span>
            </>
          ) : (
            c.label
          )}
          {on && <span aria-hidden="true" className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-ink sm:inset-x-3" />}
        </button>
      );
    });

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-chalk">
        <div className="mx-auto flex h-16 max-w-[80rem] items-center gap-4 px-4 sm:px-6 lg:gap-6">
          <a href="#top" className="shrink-0 text-ink no-underline" aria-label="Protein Market, לדף הבית">
            <Wordmark className="text-sign-xs" />
          </a>
          <nav aria-label="קטגוריות" className="hidden items-center lg:flex">
            {navButtons(false)}
          </nav>
          <SearchField
            id="search-desktop"
            value={query}
            onChange={onQuery}
            onSubmit={onSearchSubmit}
            className="ms-auto hidden w-full max-w-sm md:block"
          />
          <button
            type="button"
            onClick={open}
            aria-label={`פתיחת הסל, ${count} פריטים`}
            className="press ms-auto flex h-11 shrink-0 items-center gap-2 rounded-[var(--radius-control)] px-3 text-ink hover:bg-subtle md:ms-0"
          >
            <span className="relative" data-cart-target>
              <Icon name="cart" className="size-6" />
              {count > 0 && (
                <span
                  ref={badge}
                  className="num absolute -start-2 -top-1.5 grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-full bg-accent px-1 text-xs font-semibold text-surface"
                >
                  {count}
                </span>
              )}
            </span>
            <span className="hidden text-base font-medium sm:inline">סל קניות</span>
          </button>
        </div>
      </header>
      <div className="border-b border-line lg:hidden">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
          <SearchField id="search-mobile" value={query} onChange={onQuery} onSubmit={onSearchSubmit} className="pt-3 md:hidden" />
          <nav aria-label="קטגוריות" className="-mx-2 flex justify-between gap-1 sm:mx-0 sm:justify-start">
            {navButtons(true)}
          </nav>
        </div>
      </div>
    </>
  );
}
