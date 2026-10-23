"use client";

import Image from "next/image";
import { useRef } from "react";
import { productById, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { flyToCart } from "@/lib/fly-to-cart";
import { useCart } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

// The one product line in the catalog with two real flavours, each with its own photo.
const coconut = productById["yfood-crazy-coconut"];
const hazelnut = productById["yfood-heavenly-hazelnut"];
const flavours = [coconut, hazelnut];
// Only say "34 g in each bottle" if the catalog says so for both flavours.
const protein = coconut.protein?.grams === hazelnut.protein?.grams ? coconut.protein : undefined;

const fields: Record<string, string> = {
  [coconut.id]: "bg-coconut",
  [hazelnut.id]: "bg-hazelnut",
};

function Bottle({ product, className = "", sizes }: { product: Product; className?: string; sizes: string }) {
  const cut = product.cutout!;
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden="true" className="contact" />
      <Image src={cut.src} width={cut.width} height={cut.height} alt="" sizes={sizes} className="relative h-full w-auto" />
    </div>
  );
}

function BuyRow({ product }: { product: Product }) {
  const { items, add, setQty } = useCart();
  const qty = items.find((i) => i.product.id === product.id)?.qty ?? 0;
  const photo = useRef<HTMLImageElement>(null);
  const cut = product.cutout!;
  const label = `${product.brand} ${product.name}, ${product.flavor}`;
  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 rounded-[var(--radius-card)] bg-surface p-4">
      <div className={`row-span-2 grid h-32 w-20 place-items-center rounded-[var(--radius-control)] ${fields[product.id]}`}>
        <Image ref={photo} src={cut.src} width={cut.width} height={cut.height} alt="" sizes="40px" className="h-[84%] w-auto" />
      </div>
      <div className="min-w-0">
        <p className="text-base leading-snug font-semibold">
          <bdi>{product.name}</bdi>
        </p>
        <p className="text-sm text-ink-2">
          {product.flavor} · {product.size}
        </p>
      </div>
      <div className="flex items-end justify-between gap-3">
        <p className="display num text-sign-sm">{formatPrice(product.price)}</p>
        <div className="w-40 shrink-0">
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
                if (n > qty) flyToCart(null);
                setQty(product.id, n);
              }}
              label={label}
              className="enter w-full"
            />
          )}
        </div>
      </div>
    </li>
  );
}

export function Featured() {
  const intro = `${coconut.brand} הוא ${coconut.kind} לשתייה: בקבוק של ${coconut.size}, בשני טעמים.`;

  return (
    <section id="featured" aria-label={`${coconut.brand}: ארוחה בבקבוק`}>
      {/* Desktop: a pinned stage whose beats are driven by the scroll timeline in CSS
          (no scroll listeners). The beats are visual; the same facts are in the sr-only copy. */}
      <div className="feature-scroll">
        <div className="feature-stage">
          <div className="feature-field" aria-hidden="true">
            <span className="field-coconut beat" />
            <span className="field-hazelnut beat" />
            <span className="field-rest beat" />
          </div>
          <div className="sr-only">
            <h2>
              {coconut.brand}: ארוחה בבקבוק
            </h2>
            <p>{intro}</p>
            {protein && (
              <p>
                {protein.grams} ג׳ חלבון {protein.per}, בשני הטעמים.
              </p>
            )}
            <p>
              {coconut.name} בטעם {coconut.flavor}, {hazelnut.name} בטעם {hazelnut.flavor}.
            </p>
          </div>
          <div aria-hidden="true" className="relative mx-auto grid h-full max-w-[80rem] grid-cols-12 gap-8 px-6">
            <div className="relative col-span-5">
              <div className="say say-1 beat">
                <p className="display text-[clamp(6rem,11vw,10rem)] leading-[0.82]">
                  ארוחה
                  <br />
                  בבקבוק.
                </p>
                <p className="mt-6 max-w-[30ch] text-xl leading-relaxed">{intro}</p>
              </div>
              {protein && (
                <div className="say say-2 beat">
                  <p className="display num text-[clamp(14rem,24vw,22rem)] leading-[0.78]">
                    <span className="mask-34">
                      <span className="reveal-34 beat">{protein.grams}</span>
                    </span>
                  </p>
                  <p className="display mt-2 text-[clamp(2.5rem,4vw,3.75rem)] leading-none">ג׳ חלבון {protein.per}</p>
                  <p className="mt-4 text-lg text-ink-2">לפי התווית, בשני הטעמים.</p>
                </div>
              )}
              <div className="say say-3 beat">
                <p className="display text-[clamp(6rem,11vw,10rem)] leading-[0.82]">שני טעמים.</p>
                <p className="mt-6 max-w-[32ch] text-xl leading-relaxed">
                  <bdi className="whitespace-nowrap">{coconut.name}</bdi> בטעם {coconut.flavor},{" "}
                  <bdi className="whitespace-nowrap">{hazelnut.name}</bdi> בטעם {hazelnut.flavor}.
                </p>
              </div>
            </div>
            <div className="relative col-span-7">
              <div className="bottle bottle-a beat">
                <Bottle product={coconut} sizes="260px" className="h-full" />
                <p className="bottle-caption beat text-base">
                  <span className="font-semibold">{coconut.flavor}</span>
                </p>
              </div>
              <div className="bottle bottle-b beat">
                <Bottle product={hazelnut} sizes="260px" className="h-full" />
                <p className="bottle-caption beat text-base">
                  <span className="font-semibold">{hazelnut.flavor}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone (and any browser without scroll timelines, or with reduced motion):
          one still composition, both flavours side by side on their own colour. */}
      <div className="feature-simple mx-auto max-w-[80rem] px-4 pt-16 sm:px-6">
        <h2 className="display text-sign-lg sm:text-sign-xl">ארוחה בבקבוק.</h2>
        <p className="mt-4 max-w-[34ch] text-lg leading-relaxed">{intro}</p>
        <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-[var(--radius-panel)]">
          {flavours.map((p) => (
            <figure key={p.id} className={`flex flex-col items-center px-3 pt-8 pb-4 ${fields[p.id]}`}>
              <Bottle product={p} sizes="(min-width: 640px) 120px, 90px" className="h-64 sm:h-80" />
              <figcaption className="mt-4 text-center text-sm font-semibold">{p.flavor}</figcaption>
            </figure>
          ))}
        </div>
        {protein && (
          <p className="mt-6 flex items-baseline gap-3">
            <span className="display num text-sign-xl">{protein.grams}</span>
            <span className="text-lg">
              ג׳ חלבון {protein.per}
              <span className="block text-sm text-ink-2">לפי התווית, בשני הטעמים.</span>
            </span>
          </p>
        )}
      </div>

      {/* After the story: a calm place to buy, always in the flow and reachable by keyboard. */}
      <div className="bg-subtle">
        <div className="mx-auto grid max-w-[80rem] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:items-center lg:py-14">
          <div className="lg:col-span-4">
            <h3 className="display text-sign-md">
              <bdi>{coconut.brand}</bdi>, {coconut.size}
            </h3>
            <p className="mt-2 text-base text-ink-2">בחרו טעם והוסיפו לסל.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {flavours.map((p) => (
              <BuyRow key={p.id} product={p} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
