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

## Deployment (Cloudflare Pages)

The site is a **static Astro build**. GitHub Actions builds it and uploads `dist` to Cloudflare Pages. The GitHub Pages workflow has been removed so the two hosts do not compete.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Pages project name | `cvgellhorn` |
| Site URL / `base` | `https://cvgellhorn.com` at `/` (`astro-theme-config.ts`) |

### GitHub Actions secrets

Add these repository secrets under **Settings → Secrets and variables → Actions** (do not commit them):

| Secret | Purpose |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Token with permission to deploy Cloudflare Pages |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |

Pushes to `main` deploy production. Pull requests from this repository deploy Pages **preview** URLs.

### Dashboard steps after merge

1. Confirm a Cloudflare Pages project named `cvgellhorn` exists (create it in the dashboard or via API if the first deploy does not).
2. In GitHub: **Settings → Pages → Source → None**, so GitHub Pages stops serving the old site.
3. In Cloudflare Pages: add the custom domain `cvgellhorn.com` and point DNS at Pages (away from GitHub Pages `A`/`CNAME` records).
4. If you later use dashboard Git builds instead of Actions, set the same build command, output directory, and Node **24.21.0** (this repo’s `.nvmrc`).
