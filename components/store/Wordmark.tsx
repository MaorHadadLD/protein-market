export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span dir="ltr" className={`display inline-flex items-baseline gap-[0.22em] leading-none ${className}`}>
      <span>PROTEIN</span>
      <span className="font-normal text-ink-2">MARKET</span>
    </span>
  );
}
