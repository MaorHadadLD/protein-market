"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { lineOf, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { flyToCart } from "@/lib/fly-to-cart";
import { useCart } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

type Props = {
  /** The variant shown first (the first one that matched the search and filters). */
  product: Product;
  eager?: boolean;
};

/** The photo as the card shows it: the cutout when there is one, else the original. */
export function packImage(p: Product) {
  return p.cutout ?? { src: p.image.src, width: p.image.width, height: p.image.height };
}

export function ProductCard({ product: initial, eager = false }: Props) {
  const { items, add, setQty, lastAdded } = useCart();
  const variants = lineOf(initial);
  const [selectedId, setSelectedId] = useState(initial.id);
  const product = variants.find((v) => v.id === selectedId) ?? initial;
  const qty = items.find((i) => i.product.id === product.id)?.qty ?? 0;
  const justAdded = lastAdded === product.id;
  const label = `${product.brand} ${product.name}, ${product.flavor}`;
  const titleId = `t-${initial.id}`;
  const flavorGroup = useId();
  const photo = useRef<HTMLImageElement>(null);
  const img = packImage(product);
  // Wide packs (bars) get less side padding so every product carries similar visual weight.
  const wide = img.width / img.height > 1.3;

  return (
    <article
      id={`p-${initial.id}`}
      aria-labelledby={titleId}
      style={{ viewTransitionName: `card-${initial.id}` }}
      className="card group flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface">
        {/* The shelf edge: a stone strip the pack stands on, with the price as its shelf tag. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex h-[15%] items-center bg-stone px-3">
          <span className="display num text-sign-xs sm:text-sign-sm">{formatPrice(product.price)}</span>
        </div>
        {/* Every pack stands on the shelf edge (15% of the tile's height = 18.75% of its width). */}
        <div className={`absolute inset-0 pt-[12%] pb-[18.75%] ${wide ? "px-[8%]" : "px-[14%]"}`}>
          <div className="relative h-full">
            <span aria-hidden="true" className="pack-shadow absolute inset-x-[14%] -bottom-1.5 h-3 rounded-[50%] bg-ink/25 blur-md" />
            <div className="pack absolute inset-0">
              <Image
                ref={photo}
                key={product.id}
                src={img.src}
                alt={`${product.brand} ${product.name}, ${product.flavor}, ${product.size}`}
                fill
                sizes="(min-width: 1280px) 17rem, (min-width: 1024px) 24vw, (min-width: 640px) 33vw, 50vw"
                loading={eager ? "eager" : "lazy"}
                className={`swap object-contain object-bottom ${product.shape === "photo" ? "mix-blend-multiply" : "pack-lifted"}`}
              />
            </div>
          </div>
        </div>
        {qty > 0 && (
          <span
            key={justAdded ? "added" : "in-cart"}
            className={`enter absolute start-2.5 top-2.5 inline-flex items-center gap-1 rounded-[var(--radius-control)] px-2 py-1 text-sm font-medium ${
              justAdded ? "bg-accent text-surface" : "bg-chalk text-ink"
            }`}
          >
            <Icon name="check" className="size-3.5" />
            {justAdded ? "נוסף לסל" : <>בסל: <span className="num">{qty}</span></>}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-3.5">
        <p className="text-sm leading-snug text-ink-2">
          <bdi>{product.brand}</bdi>
        </p>
        <h3 id={titleId} className="text-base leading-snug font-semibold">
          <bdi>{product.name}</bdi>
        </h3>
        <p className="mt-1 text-sm leading-snug text-ink-2">
          {product.size}
          {product.protein && (
            <>
              <span aria-hidden="true"> · </span>
              <span className="num">{product.protein.grams}</span> ג׳ חלבון {product.protein.per}
            </>
          )}
        </p>

        {variants.length > 1 ? (
          <fieldset className="mt-2.5">
            <legend className="sr-only">בחירת טעם: {product.brand}</legend>
            <div className="flex flex-wrap gap-1.5">
              {variants.map((v) => {
                const on = v.id === product.id;
                return (
                  <label
                    key={v.id}
                    className={`press flex min-h-9 cursor-pointer items-center rounded-[var(--radius-control)] border px-2.5 text-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                      on ? "border-ink bg-surface font-medium text-ink" : "border-line-strong text-ink-2 hover:border-ink-2 hover:text-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name={flavorGroup}
                      value={v.id}
                      checked={on}
                      onChange={() => setSelectedId(v.id)}
                      className="sr-only"
                    />
                    {v.flavor}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <p className="mt-2.5 text-sm leading-snug">
            <span className="text-ink-2">טעם: </span>
            {product.flavor}
          </p>
        )}

        <p className="sr-only">מחיר: {formatPrice(product.price)}</p>
      </div>

      <div className="mt-auto pt-4">
        {qty === 0 ? (
          <button
            type="button"
            onClick={() => {
              add(product.id);
              flyToCart(photo.current);
            }}
            className="press flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] bg-ink text-base font-medium text-surface hover:bg-ink-hover"
          >
            <Icon name="plus" className="size-4" />
            הוספה לסל
            <span className="sr-only">: {label}</span>
          </button>
        ) : (
          <QuantityStepper
            qty={qty}
            onChange={(n) => {
              // Steps are quick, repeated actions: the count nudges, nothing flies.
              if (n > qty) flyToCart(null);
              setQty(product.id, n);
            }}
            label={label}
            className="enter w-full"
          />
        )}
      </div>
    </article>
  );
}
