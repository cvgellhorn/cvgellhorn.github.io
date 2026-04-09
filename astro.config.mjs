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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  integrations: [icon(), sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: "file",
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
