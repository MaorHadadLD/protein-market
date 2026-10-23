import Link from "next/link";
import { categories } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer id="service" className="bg-ink text-chalk">
      <div className="mx-auto max-w-[80rem] px-4 pt-14 pb-8 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <p className="max-w-[36ch] text-base leading-relaxed text-on-ink">
            חנות הדגמה למוצרי חלבון ותזונת ספורט. המוצרים קיימים, המחירים לדוגמה ולא מתבצעות הזמנות אמיתיות.
          </p>
          <div>
            <h2 className="mb-2 text-base font-semibold">קטגוריות</h2>
            <ul>
              {categories.map((c) => (
                <li key={c.id}>
                  <a href={`#products-${c.id}`} className="inline-flex min-h-9 items-center text-on-ink no-underline hover:text-chalk hover:underline">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-base font-semibold">שירות לקוחות</h2>
            <p className="max-w-[30ch] leading-relaxed text-on-ink">
              זו חנות הדגמה: אין משלוחים, החזרות או מוקד שירות. הזמנות באתר אינן מחייבות.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-base font-semibold">מידע</h2>
            <Link href="/credits" className="inline-flex min-h-9 items-center text-on-ink underline hover:text-chalk">
              מקורות התמונות והנתונים
            </Link>
          </div>
        </div>

        {/* The name returns at full width as the close of the page. */}
        <p dir="ltr" aria-hidden="true" className="display mt-14 text-center text-[17.5vw] leading-[0.78] lg:text-sign-max">
          PROTEIN <span className="font-normal text-on-ink-3">MARKET</span>
        </p>

        <div className="mt-8 flex max-w-[75ch] flex-col gap-1 text-sm leading-relaxed text-on-ink-2">
          <p>
            צילומי מוצרים: Open Food Facts contributors, ברישיון{" "}
            <a href="https://creativecommons.org/licenses/by-sa/3.0/" className="underline hover:text-chalk" target="_blank" rel="noreferrer">
              CC BY-SA 3.0
            </a>
            . חלק מהצילומים הוצגו ללא הרקע הלבן (גזירה מתוך הצילום עצמו). שמות המותגים שייכים לבעליהם; אין קשר בין החנות לבין
            היצרנים.
          </p>
          <p>© 2026 Protein Market · חנות הדגמה</p>
        </div>
      </div>
    </footer>
  );
}
