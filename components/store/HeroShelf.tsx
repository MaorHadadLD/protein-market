"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { groupKey, productById, products } from "@/lib/catalog";

type Spot = {
  id: string;
  /** Depth 0..1: how far the pack drifts with the pointer (front moves most). */
  depth: number;
  z: number;
  /** Phone: distance from the inline end, bottom offset, width (all % of the stage). */
  m?: [x: number, b: number, w: number];
  /** From 768px. */
  d: [x: number, b: number, w: number];
};

// Back row stands a little higher on the shelf (further away), front row lower (closer).
// Overlaps are kept to the bottom edge of a pack so no label is hidden.
const lineup: Spot[] = [
  { id: "nu3-performance-whey", depth: 0.35, z: 1, m: [2, 13, 29], d: [2, 12, 31] },
  { id: "scitec-whey-isolate", depth: 0.5, z: 2, m: [27, 8, 33], d: [28, 8, 38] },
  { id: "yfood-crazy-coconut", depth: 0.7, z: 3, m: [64, 6, 15], d: [65, 5, 14.5] },
  { id: "yfood-heavenly-hazelnut", depth: 0.7, z: 3, m: [81, 8, 15], d: [81, 7, 14.5] },
  { id: "weider-60-protein-bar", depth: 1, z: 5, m: [6, -10, 44], d: [6, -7, 40] },
  { id: "fulfil-salted-caramel", depth: 1, z: 5, d: [52, -6, 27] },
];

/** The card a shelf item links to: the first variant of its line. */
const cardFor = (id: string) => products.find((p) => groupKey(p) === groupKey(productById[id]))!.id;

export function HeroShelf() {
  const stage = useRef<HTMLDivElement>(null);

  // Pointer parallax: decorative, so fine pointers only and never with reduced motion.
  // Written straight to each layer's style in a rAF loop that stops once it settles.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;
    const layers = [...el.querySelectorAll<HTMLElement>("[data-depth]")].map((node) => ({
      node,
      depth: Number(node.dataset.depth),
    }));
    let tx = 0;
    let x = 0;
    let frame = 0;
    const tick = () => {
      // Critically damped follow: momentum without overshoot.
      x += (tx - x) * 0.09;
      for (const { node, depth } of layers) {
        // Horizontal only: the packs never leave the shelf they stand on.
        node.style.transform = `translate3d(${(x * depth * 14).toFixed(2)}px, 0, 0)`;
      }
      frame = Math.abs(tx - x) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const section = el.closest("section") ?? el;
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      // Packs lean away from the pointer, like objects seen from a moving eye.
      tx = -((e.clientX - r.left) / r.width - 0.5) * 2;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      kick();
    };
    section.addEventListener("pointermove", onMove as EventListener);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove as EventListener);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={stage} className="shelf-stage">
      {lineup.map((spot, i) => {
        const p = productById[spot.id];
        const cut = p.cutout!;
        const [mx, mb, mw] = spot.m ?? spot.d;
        return (
          <div
            key={spot.id}
            className={`ln ${spot.m ? "" : "ln-mobile-hidden"}`}
            style={
              {
                "--x": `${mx}%`,
                "--b": `${mb}%`,
                "--w": `${mw}%`,
                "--x-md": `${spot.d[0]}%`,
                "--b-md": `${spot.d[1]}%`,
                "--w-md": `${spot.d[2]}%`,
                "--z": spot.z,
                "--i": i,
              } as React.CSSProperties
            }
          >
            <span className="ln-depth" data-depth={spot.depth}>
              <span className="ln-rise">
                <span className="contact" aria-hidden="true" />
                <a href={`#p-${cardFor(spot.id)}`} className="block" aria-label={`${p.brand} ${p.name}, ${p.flavor}: למוצר`}>
                  <Image
                    src={cut.src}
                    width={cut.width}
                    height={cut.height}
                    alt=""
                    sizes={`(min-width: 1280px) ${Math.round(spot.d[2] * 7.2)}px, (min-width: 768px) ${Math.round(spot.d[2] * 0.55)}vw, ${mw}vw`}
                    loading="eager"
                    fetchPriority={spot.id === "scitec-whey-isolate" ? "high" : "auto"}
                    draggable={false}
                  />
                </a>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
