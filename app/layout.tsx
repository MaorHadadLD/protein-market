import type { Metadata, Viewport } from "next";
import { Heebo, Karantina } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
});

// Condensed Hebrew display face: shelf signage, prices and the big numbers.
const karantina = Karantina({
  variable: "--font-karantina",
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Protein Market | חלבון ותזונת ספורט",
  description: "חנות הדגמה למוצרי חלבון ותזונת ספורט: אבקות, חטיפים, משקאות ומארזים. המחירים באתר הם מחירי הדגמה.",
};

export const viewport: Viewport = {
  themeColor: "#f3f2ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${karantina.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
