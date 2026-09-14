# cvgellhorn.com

Personal site for [Christoph von Gellhorn](https://cvgellhorn.com), built with [Astro Tone](https://github.com/hanityx/astro-tone).

## Development

Requires Node.js 22.12.0 or newer (this repo pins **v24.21.0** in `.nvmrc`).

```sh
npm install
npm run dev
```

The local server binds to `http://localhost:4321`.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the static site and generate the Pagefind index |
| `npm run preview` | Preview the production build |
| `npm run check` | Run Astro type checks |
| `npm run lint` | Run ESLint |
| `npm run lint:css` | Run Stylelint |

Site-level settings live in `astro-theme-config.ts`. Posts live in `src/content/posts/`.
