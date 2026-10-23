"use client";

import Image from "next/image";
import type { CartItem } from "./CartProvider";
import { formatPrice } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

type Props = {
  item: CartItem;
  /** Position in the list, for the short stagger as the drawer opens. */
  index?: number;
  onQty: (qty: number) => void;
  onRemove: () => void;
};

export function CartLine({ item, index = 0, onQty, onRemove }: Props) {
  const { product, qty, lineTotal } = item;
  const label = `${product.brand} ${product.name}`;
  return (
    <li className="drawer-line grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-3 py-4" style={{ "--i": Math.min(index, 6) } as React.CSSProperties}>
      <div className="relative row-span-2 aspect-square overflow-hidden rounded-[var(--radius-control)] bg-chalk">
        <Image src={(product.cutout ?? product.image).src} alt="" fill sizes="72px" className="object-contain p-1.5 mix-blend-multiply" />
      </div>
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-base leading-snug font-semibold">
            <bdi>{label}</bdi>
          </p>
          <p className="text-sm text-ink-2">
            {product.flavor} · {product.size}
          </p>
          <p className="num text-sm text-ink-2">{formatPrice(product.price)} ליחידה</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="press grid size-10 shrink-0 place-items-center rounded-[var(--radius-control)] text-ink-2 hover:bg-subtle hover:text-ink"
          aria-label={`הסרה מהסל: ${label}`}
        >
          <Icon name="trash" className="size-[1.1rem]" />
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <QuantityStepper qty={qty} onChange={onQty} label={label} removeAtOne={false} />
        <span className="num font-semibold">{formatPrice(lineTotal)}</span>
      </div>
    </li>
  );
}
