import config from '../../astro-theme-config';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_HOMEPAGE_TITLE } from '../consts';

export function getSameAsUrls() {
  const { github, linkedin, x } = config.social;
  return [github, linkedin, x].filter((url): url is string => Boolean(url));
}

export function getTwitterHandle() {
  const socialUrl = config.social.x;
  if (!socialUrl) return undefined;

  try {
    const handle = new URL(socialUrl).pathname.replace(/^\/+/, '').split('/')[0];
    return handle ? `@${handle}` : undefined;
  } catch {
    return undefined;
  }
}

export function getDocumentTitle(title: string) {
  return title === SITE_TITLE ? SITE_HOMEPAGE_TITLE : `${title} — ${SITE_TITLE}`;
}

export function isHomePath(pathname: string) {
  return pathname === '/' || pathname === '';
}

export function buildPersonJsonLd(siteHref: string, extras?: { image?: string }) {
  const jobTitle = config.about.role.split('.')[0]?.trim() || 'Software Engineer';

  return {
    '@type': 'Person',
    '@id': `${siteHref}#person`,
    name: SITE_AUTHOR,
    url: siteHref,
    description: config.about.lead || SITE_DESCRIPTION,
    jobTitle,
    sameAs: getSameAsUrls(),
    homeLocation: config.about.location
      ? { '@type': 'Place', name: config.about.location }
      : undefined,
    knowsAbout: config.about.interests,
    ...(extras?.image ? { image: extras.image } : {}),
  };
}
