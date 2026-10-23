/**
 * Sends a copy of a product photo from where it was added to the cart button.
 * Spatial consistency: the shopper sees where the item went. WAAPI, transform and
 * opacity only, so it stays smooth while React re-renders the card underneath.
 * Dispatches "cart:landed" when the copy arrives (immediately with reduced motion),
 * which is what bumps the header count.
 */
export const CART_LANDED = "cart:landed";

const land = () => window.dispatchEvent(new Event(CART_LANDED));

export function flyToCart(source: HTMLImageElement | null | undefined) {
  const target = document.querySelector<HTMLElement>("[data-cart-target]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!source || !target || reduced || !source.currentSrc) return land();

  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  if (from.width === 0 || from.bottom < 0 || from.top > window.innerHeight) return land();

  const ghost = new Image();
  ghost.src = source.currentSrc;
  ghost.alt = "";
  ghost.setAttribute("aria-hidden", "true");
  const cs = getComputedStyle(source);
  Object.assign(ghost.style, {
    position: "fixed",
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    padding: cs.padding,
    boxSizing: "border-box",
    objectFit: "contain",
    objectPosition: cs.objectPosition,
    // Flat photos sit on white and rely on multiply to drop it; keep that in flight.
    mixBlendMode: cs.mixBlendMode,
    zIndex: "60",
    pointerEvents: "none",
    margin: "0",
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.append(ghost);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const end = Math.max(0.08, 28 / from.width);
  // A slight lift on the way makes it read as thrown into the cart, not slid across.
  const anim = ghost.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 40}px) scale(${(1 + end) / 2.2})`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(${end})`, opacity: 0.2 },
    ],
    // Travel across the screen: strong ease-in-out; longer than a UI state change by necessity.
    { duration: 520, easing: "cubic-bezier(0.77, 0, 0.175, 1)" },
  );
  const done = () => {
    ghost.remove();
    land();
  };
  anim.finished.then(done, done);
}
