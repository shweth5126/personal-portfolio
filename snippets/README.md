# Reusable snippets

## PricingSection.astro

3-tier pricing block with a monthly/annual toggle. Self-contained — one file,
no config, no other components.

### Use it in the edibee project

1. Copy `PricingSection.astro` into that project's `src/components/`.
2. Make sure the project has **Tailwind CSS v3**. If not:
   ```bash
   npm i -D tailwindcss @astrojs/tailwind
   npx astro add tailwind
   ```
3. Import and drop it on a page:
   ```astro
   ---
   import PricingSection from "../components/PricingSection.astro";
   ---
   <PricingSection />
   ```
4. Edit the `data` object at the top of the file — plan names, prices,
   feature lists, the "Popular" flag, CTA link.

### Not an Astro project?

The markup is plain HTML + Tailwind classes and the toggle is one `<script>`.
Copy the `<section>` and `<script>` into any HTML page. Replace the
`data.plans.map(...)` loop with hard-coded cards, or keep a small JS array and
render with template strings.

### Colours

Uses `slate-*` classes so it works with zero config. To match a brand colour,
find/replace `slate-900` (dark accent) and `slate-50` (its text) with your own,
e.g. `indigo-600` / `white`.

### The 3D tilt

Outer side cards get `lg:[transform:rotateY(10deg)]`. Delete those two ternary
lines in the `class:list` if you want all three cards flat.
