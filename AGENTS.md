# AGENTS.md

## Cursor Cloud specific instructions

This is a static Astro portfolio/blog site. No databases, backend services, or Docker containers are required.

### Node version

The project requires **Node.js v22.22.1** (specified in `.nvmrc`), matching Astro 6’s supported range. Use `nvm use` to activate it.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (serves on `http://localhost:4321`, binds to `--host`) |
| Build | `npm run build` (static output in `dist/`) |
| Lint / format | `npx prettier --check "src/**/*.{astro,js,ts,tsx,md,mdx,css}"` |

There is no dedicated `lint` or `test` npm script; Prettier is the only code-quality tool configured.

### Caveats

- The dev server uses `astro dev --host`, which binds to `0.0.0.0:4321`.
- Prettier reports pre-existing formatting issues in the repo (`src/content/projects/easyedit.md`, `src/env.d.ts`). These are not regressions.
- Blog/project content lives in `src/content/` as Markdown/MDX files managed by Astro Content Collections.
