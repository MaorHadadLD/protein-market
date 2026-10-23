"use client";

import { Icon } from "@/components/ui/Icon";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  id: string;
  className?: string;
};

export function SearchField({ value, onChange, onSubmit, id, className = "" }: Props) {
  return (
    <form
      role="search"
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <label htmlFor={id} className="sr-only">
        חיפוש מוצרים
      </label>
      <div className="flex h-11 items-center gap-2.5 rounded-[var(--radius-control)] border border-line-strong bg-surface px-3.5 transition-colors focus-within:border-ink focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink">
        <Icon name="search" className="size-[1.15rem] shrink-0 text-ink-2" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="חיפוש לפי מוצר, מותג או טעם"
          className="h-full w-full min-w-0 bg-transparent text-base placeholder:text-ink-2 focus:outline-none"
        />
        {value && (
          <button type="button" onClick={() => onChange("")} className="grid size-7 shrink-0 place-items-center rounded-full text-ink-2 hover:bg-subtle" aria-label="ניקוי החיפוש">
            <Icon name="close" className="size-4" />
          </button>
        )}
      </div>
    </form>
  );
}
