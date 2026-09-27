import { defineConfig } from 'astro/config';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import cloudflare from '@astrojs/cloudflare';

// Computer Repairs Logan — static Astro site (migrated off WordPress).
// Deploys to Cloudflare Pages. Trailing-slash URLs to match the existing
// WordPress paths (e.g. /computer-repairs-woodridge/) so rankings/links carry over.
//
// output stays 'static': all 102 content pages still prerender to plain HTML
// on the CDN. The adapter exists only for Tina's on-demand visual-editing
// endpoint, so the public site keeps its current performance profile.
export default defineConfig({
  site: 'https://www.computerrepairslogan.com.au',
  // 'ignore', not 'always': Tina's bridge requests /tina-island/home without a
  // trailing slash and 'always' 404s it. Page URLs are unaffected because they
  // come from build.format 'directory', which still emits /page/index.html.
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  output: 'static',
  adapter: cloudflare(),
  integrations: [tina()],
  vite: {
    plugins: [tinaAdminDevRedirect()],
    ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] },
  },
});
