import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://marcosverdejobosch.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: page => new URL(page).pathname !== '/contact/' })],
  build: { format: 'directory' },
});
