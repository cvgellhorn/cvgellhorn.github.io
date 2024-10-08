import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://cvgellhorn.com.au",
  integrations: [tailwind(), icon(), sitemap(), mdx()],
  build: {
    format: "file",
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
