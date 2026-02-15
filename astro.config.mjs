// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { remarkObsidianLinks } from './src/utils/remark-obsidian-links.ts';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://ccnaprep.netlify.app',
  output: 'server',
  integrations: [mdx(), sitemap(), react()],

  markdown: {
      remarkPlugins: [remarkObsidianLinks],
	},

  vite: {
      plugins: [tailwindcss()],
      resolve: {
          alias: {
              '@': new URL('./src', import.meta.url).pathname,
          },
      },
	},

  adapter: netlify(),
});