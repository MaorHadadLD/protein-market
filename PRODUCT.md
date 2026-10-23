# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
People who train (gym-goers, runners, home workouts) and anyone looking for protein products that taste good at accessible prices. They shop on their phone most of the time: between sets, on the bus, after a workout.

## Product Purpose
Protein Market is an online store for protein products: powders, bars, drinks and bundles. Success means a shopper finds a product that fits their taste, protein target and budget fast, and gets it into the cart without friction.

Current stage: a prototype that will grow into a real store. Code and components must be reusable and ready to extend (real catalog, checkout, payment).

## Positioning
Real products from known brands, clear facts, honest comparison. Weight and price are always visible; protein is shown when it is verified.

## Operating Context
Hebrew-speaking Israeli market. Full Hebrew, RTL, prices in shekels (₪). Mobile-first use.

## Capabilities and Constraints
- Stack: Next.js (App Router), TypeScript, Tailwind.
- Catalog: 4 categories (protein powders, bars, drinks, multipacks), 12 products.
- Products are real, existing international sports-nutrition products (confirmed 2026-10-16). Brand, name, flavour and net weight match the photographed product. Protein figures appear only when verified against the label or source data; otherwise they are omitted. Prices remain sample prices.
- Every product shows a real photo, name, flavour, weight, price and add-to-cart.
- Search, category filter, sort by price.
- Cart: add, change quantity, remove, side cart with total, persisted in localStorage.
- Checkout is a demo: there is no real payment. A "complete sample order" button shows a confirmation with no charge.

## Brand Commitments
- Name: Protein Market.
- Voice: clear, calm and professional; short sentences, informal second person, no hype.
- Standing preference (2026-10-16): a mature, trustworthy commercial look, benchmarked against specialist sports-nutrition stores (Myprotein, Bulk, Optimum Nutrition). Not playful, not childish.
- Updated 2026-10-23: a contemporary brand with strong presence, product photography at the centre, careful Hebrew typography and a distinct art direction, with energy and character, still mature and professional. Peak moments (hero, one featured product story, the add-to-cart) separated by calm, shoppable zones.

## Evidence on Hand
- Product photos: Open Food Facts contributors, CC BY-SA (attribution shown on the site; per-file sources in `public/products/SOURCES.md`). Seven also exist as alpha cutouts derived from the same photo (`scripts/cutouts.py`, same licence). Never replace them with illustrations, CSS packaging or AI images posing as photos; when a photo is missing, list the missing file instead.
- The hero is composed from the product cutouts; the earlier Wikimedia Commons lifestyle photo is no longer shown.
- Prices are sample prices and must be labeled as a demo. No reviews, ratings, promotions, discounts, shipping promises or health claims may be invented.

## Product Principles
1. Product facts are true to the photographed product: weight and price always visible, protein only when verified.
2. The demo nature is unmistakable; never imply a real purchase.
3. Phone first: every flow works with one thumb.
4. Build components as the base of the real store, not throwaway mockups.

## Accessibility & Inclusion
Correct RTL semantics (`dir="rtl"`, `lang="he"`), keyboard-operable cart and filters, WCAG AA contrast.
