import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://cvgellhorn.com.au",
  image: {
    domains: ["images.unsplash.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon(), sitemap(), mdx()],
  build: {
    format: "file",
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
