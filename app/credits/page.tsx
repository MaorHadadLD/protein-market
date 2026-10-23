import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/catalog";
import { Wordmark } from "@/components/store/Wordmark";

export const metadata: Metadata = {
  title: "מקורות התמונות | Protein Market",
};

export default function CreditsPage() {
  return (
    <div className="mx-auto max-w-[56rem] px-4 py-10 sm:px-6">
      <Link href="/" className="text-ink no-underline">
        <Wordmark className="text-sign-sm" />
      </Link>
      <h1 className="display mt-8 text-sign-md">מקורות התמונות</h1>
      <p className="mt-2 max-w-[60ch] leading-relaxed text-ink-2">
        כל צילומי המוצרים הם צילומים אמיתיים מ-Open Food Facts, ברישיון CC BY-SA 3.0. השינויים: חיתוך שוליים לבנים (ובצילום של
        Quest גם חיתוך הרקע סביב הקופסה), הקטנה לאינטרנט, ובשבעה צילומים הסרת הרקע הלבן כדי שהמוצר יעמוד על המדף. האריזה עצמה לא
        נערכה. הגרסאות המעובדות משותפות באותו רישיון. ערכי החלבון נקראו מהתווית שעל האריזה; כשהתווית לא הייתה קריאה או כשהיו
        נתונים סותרים, הערך לא מוצג.
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {products.map((p) => ({ key: p.id, title: `${p.brand} ${p.name}`, sub: `${p.flavor} · ${p.size} · ברקוד ${p.barcode}${p.cutout ? " · מוצג גם ללא רקע" : ""}`, img: p.image })).map((row) => (
          <li key={row.key} className="flex items-center gap-4 py-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-[var(--radius-control)] bg-surface">
              <Image src={row.img.src} alt="" fill sizes="64px" className="object-contain p-1 mix-blend-multiply" />
            </div>
            <div className="min-w-0 text-sm">
              <p className="font-semibold">
                <bdi>{row.title}</bdi>
              </p>
              <p className="text-ink-2">{row.sub}</p>
              <p className="text-ink-2">
                {row.img.author} ·{" "}
                <a href={row.img.licenseUrl} className="underline" target="_blank" rel="noreferrer">
                  {row.img.license}
                </a>{" "}
                ·{" "}
                <a href={row.img.sourceUrl} className="underline" target="_blank" rel="noreferrer">
                  מקור
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
