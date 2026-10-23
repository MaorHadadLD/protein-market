import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "accent";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-surface hover:bg-ink-hover",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink",
  accent: "bg-accent text-surface hover:bg-accent-hover",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-base",
  lg: "h-12 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return [
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium",
    "press",
    "disabled:opacity-40 disabled:pointer-events-none select-none",
    variants[variant],
    sizes[size],
    extra,
  ].join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button type="button" className={buttonClass(variant, size, className)} {...props} />;
}
