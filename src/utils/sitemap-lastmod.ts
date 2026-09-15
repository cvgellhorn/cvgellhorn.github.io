import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const postsDir = join(dirname(fileURLToPath(import.meta.url)), '../content/posts');

function parseFrontmatterDate(raw: string, key: string) {
  const match = raw.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?`, 'm'));
  if (!match?.[1]) return undefined;

  const date = new Date(match[1].trim());
  return Number.isNaN(date.valueOf()) ? undefined : date;
}

export function getLastmodByPathname() {
  const lastmodByPath = new Map<string, Date>();
  let latestPost: Date | undefined;

  for (const file of readdirSync(postsDir)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

    const raw = readFileSync(join(postsDir, file), 'utf8');
    if (/^draft:\s*true/m.test(raw)) continue;

    const slug = file.replace(/\.mdx?$/, '');
    const lastmod =
      parseFrontmatterDate(raw, 'updatedDate') ?? parseFrontmatterDate(raw, 'pubDate');
    if (!lastmod) continue;

    lastmodByPath.set(`/posts/${slug}/`, lastmod);
    if (!latestPost || lastmod > latestPost) latestPost = lastmod;
  }

  if (latestPost) {
    lastmodByPath.set('/', latestPost);
    lastmodByPath.set('/posts/', latestPost);
  }

  return lastmodByPath;
}
