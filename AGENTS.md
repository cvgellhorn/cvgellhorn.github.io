# AGENTS.md

## Cursor Cloud specific instructions

This is a static Astro portfolio/blog site using the [Astro Tone](https://github.com/hanityx/astro-tone) theme. No databases, backend services, or Docker containers are required.

### Node version

The project uses **Node.js v24.21.0** (current Active LTS, specified in `.nvmrc`), which satisfies Astro 7's supported range. Use `nvm use` to activate it.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (serves on `http://localhost:4321`, binds to `--host`) |
| Build | `npm run build` (static output in `dist/`, then Pagefind index) |
| Type check | `npm run check` |
| Lint | `npm run lint` and `npm run lint:css` |
| Format | `npm run format` |

### Caveats

- The dev server uses `astro dev --host`, which binds to `0.0.0.0:4321`.
- Site-level settings live in `astro-theme-config.ts`.
- Blog posts and projects live together in `src/content/posts/` as Markdown/MDX, with `category` (`Notes`, `Shopify`, `Projects`) and optional `demoURL` / `repoURL`.
- Legacy `/blog` and `/projects` URLs redirect to `/posts`.
