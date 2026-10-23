"use client";

import { MAX_QTY } from "@/lib/cart-store";
import { Icon } from "./Icon";

type Props = {
  qty: number;
  onChange: (qty: number) => void;
  label: string;
  /** When false, minus stops at 1 (a separate remove control exists). */
  removeAtOne?: boolean;
  className?: string;
};

export function QuantityStepper({ qty, onChange, label, removeAtOne = true, className = "" }: Props) {
  const btn =
    "grid w-11 place-items-center text-ink transition-colors duration-150 hover:bg-subtle active:bg-line disabled:text-line-strong disabled:hover:bg-transparent";
  return (
    <div
      role="group"
      aria-label={`כמות: ${label}`}
      className={`inline-flex h-11 items-stretch overflow-hidden rounded-[var(--radius-control)] border border-line-strong bg-surface ${className}`}
    >
      <button type="button" className={btn} onClick={() => onChange(qty + 1)} disabled={qty >= MAX_QTY} aria-label={`הוספת יחידה: ${label}`}>
        <Icon name="plus" className="size-4" />
      </button>
      <output aria-live="polite" className="num grid min-w-9 flex-1 place-items-center border-x border-line text-base font-medium">
        {qty}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(qty - 1)}
        disabled={!removeAtOne && qty <= 1}
        aria-label={removeAtOne && qty === 1 ? `הסרה מהסל: ${label}` : `הפחתת יחידה: ${label}`}
      >
        <Icon name={removeAtOne && qty === 1 ? "trash" : "minus"} className="size-4" />
      </button>
    </div>
  );
}
