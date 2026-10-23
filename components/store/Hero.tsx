import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
import { HeroShelf } from "./HeroShelf";

const line = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      // From 768px the hero fills the first screen (up to a cap, so tall screens get no void) and the shelf lands on the fold.
      className="relative flex flex-col overflow-x-clip md:min-h-[min(calc(100svh-9rem),44rem)] lg:min-h-[min(calc(100svh-6rem),46rem)]"
    >
      <div className="mx-auto grid w-full max-w-[80rem] flex-1 gap-6 px-4 pt-6 sm:px-6 md:grid-cols-12 md:items-end md:gap-8 md:pt-10">
        <div className="md:col-span-5 md:pb-20">
          <h1 id="hero-title" className="display text-[clamp(4.25rem,21vw,6rem)] leading-[0.86] md:text-[clamp(5rem,9.2vw,8.5rem)]">
            <span className="hero-line" style={line(0)}>
              <span>המדף של</span>
            </span>
            <span className="hero-line" style={line(1)}>
              <span>מי שמתאמן</span>
            </span>
          </h1>
          <div className="hero-copy mt-4 md:mt-7">
            <p className="max-w-[34ch] text-base leading-relaxed sm:text-lg">
              אבקות, חטיפים ומשקאות חלבון ממותגים מוכרים. משקל, טעם ומחיר על כל מוצר, וחלבון כשהוא מאומת מהתווית.
            </p>
            <a href="#products" className={buttonClass("accent", "lg", "mt-5 no-underline md:mt-7")}>
              לכל המוצרים
              <Icon name="arrow" className="size-4" />
            </a>
          </div>
        </div>
        <div className="md:col-span-7">
          <HeroShelf />
        </div>
      </div>
      {/* The shelf the packs stand on: a tone step, not a line. */}
      <div aria-hidden="true" className="h-9 bg-stone md:h-14" />
    </section>
  );
}
