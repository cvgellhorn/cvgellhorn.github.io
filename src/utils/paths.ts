const externalPattern = /^[a-z][a-z0-9+.-]*:|^\/\//i;

export function withBase(path: string) {
  if (!path || externalPattern.test(path) || path.startsWith('#')) return path;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return normalizedPath ? `${normalizedBase}${normalizedPath}` : normalizedBase;
}

/** Site page URLs with a trailing slash, matching `trailingSlash: 'always'`. */
export function withPage(path: string) {
  if (!path || externalPattern.test(path) || path.startsWith('#')) return path;

  const [pathnameAndQuery, hash = ''] = path.split('#');
  const [pathname = '', query = ''] = pathnameAndQuery.split('?');
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  const slashedPath = !isFile && pathname && !pathname.endsWith('/') ? `${pathname}/` : pathname;
  const prefixed = withBase(slashedPath || '/');
  return `${prefixed}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}

export function withoutBase(path: string) {
  const base = import.meta.env.BASE_URL || '/';
  if (base === '/') return path;

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  if (!path.startsWith(normalizedBase)) return path;

  const stripped = path.slice(normalizedBase.length);
  return stripped || '/';
}
