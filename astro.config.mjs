import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Static site — deploys to Vercel with zero extra config.
export default defineConfig({
  // Update to your real domain after deploy (used for sitemap / canonical URLs).
  site: 'https://personal-portfolio.vercel.app',
  integrations: [tailwind({ applyBaseStyles: false })],
});
