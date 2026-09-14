// @ts-check

import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import process from 'node:process';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import config from './astro-theme-config.ts';
import { toneExpressiveCodeOptions } from './src/config/expressive-code.ts';

// https://astro.build/config
const sitemapExcludedPaths = new Set(['/search/']);
const configuredSite = process.env.ASTRO_SITE_URL || config.site.url;
const configuredBaseValue = process.env.ASTRO_SITE_BASE ?? config.site.base;
const configuredBase = configuredBaseValue === '/' ? '' : configuredBaseValue.replace(/\/$/, '');

/** @param {string} pathname */
function withoutConfiguredBase(pathname) {
  if (!configuredBase) return pathname;
  if (!pathname.startsWith(configuredBase)) return pathname;

  return pathname.slice(configuredBase.length) || '/';
}

export default defineConfig({
  site: configuredSite,
  base: configuredBase || undefined,
  redirects: {
    '/blog': '/posts',
    '/blog/[...slug]': '/posts/[...slug]',
    '/projects': '/posts',
    '/projects/[...slug]': '/posts/[...slug]',
  },
  integrations: [
    expressiveCode(toneExpressiveCodeOptions),
    mdx(),
    sitemap({
      filter: (page) => !sitemapExcludedPaths.has(withoutConfiguredBase(new URL(page).pathname)),
    }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
  // Preserve Astro 6 spacing between inline elements after the Astro 7 default
  // changed to JSX whitespace rules.
  compressHTML: true,

  markdown: {
    processor: unified({
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: { ariaHidden: true, tabIndex: -1, class: 'heading-anchor' },
            content: { type: 'text', value: '#' },
          },
        ],
      ],
    }),
  },
});
