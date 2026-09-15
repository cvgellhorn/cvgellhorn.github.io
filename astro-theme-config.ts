type NavItem = {
  label: string;
  href: string;
};

/**
 * astro-theme-config.ts
 *
 * Central configuration for the Tone theme.
 * Most site-level customization should happen in this file.
 */

const config = {
  site: {
    /** Production origin, used for canonical links, sitemap, and Open Graph metadata. */
    url: 'https://cvgellhorn.com',
    /** Subpath such as '/repo-name'. Keep empty when deploying at a domain root. */
    base: '',
    lang: 'en',
    locale: 'en_US',
    dateLocale: 'en-US',
    title: 'cvgellhorn',
    logoLabel: 'cvgellhorn',
    /** Document / Open Graph title for the homepage. Inner pages append ` — {title}`. */
    homepageTitle: 'Christoph von Gellhorn — Software Engineer in Sydney',
    description:
      'Christoph von Gellhorn — Software Engineer in Sydney. Notes on Astro, Shopify, and building with AI.',
    author: 'Christoph von Gellhorn',
    /** Optional absolute or root-relative image URL for homepage/search/about social previews. */
    defaultOgImage: '/og.png',
  },

  nav: [] as NavItem[],

  footerNav: [
    { label: 'Posts', href: '/posts' },
    { label: 'About', href: '/about' },
    { label: 'Search', href: '/search' },
    { label: 'RSS', href: '/rss.xml' },
  ] as NavItem[],

  content: {
    categoryOrder: ['Projects', 'Shopify', 'Notes'],
    postsDescription:
      'Notes, Shopify work, and projects from Christoph von Gellhorn — writing on Astro, checkout extensions, and AI-assisted shipping.',
  },

  behavior: {
    smoothScroll: true,
  },

  comments: {
    mode: 'off',
    provider: 'giscus',
    giscus: {
      repo: '',
      repoId: '',
      category: '',
      categoryId: '',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '0',
      emitMetadata: '0',
      inputPosition: 'bottom',
      theme: 'preferred_color_scheme',
      customLightTheme: '/giscus-light.css',
      customDarkTheme: '/giscus-dark.css',
      lang: 'en',
      loading: 'eager',
    },
  },

  social: {
    website: 'https://cvgellhorn.com',
    email: '',
    linkedin: 'https://www.linkedin.com/in/cvgellhorn',
    github: 'https://github.com/cvgellhorn',
    x: 'https://x.com/cvgellhorn',
  },

  about: {
    profileImage: '',
    name: 'Christoph von Gellhorn',
    role: 'Software Engineer. Node.js, React, and Ruby on Rails.',
    location: 'Sydney, Australia',
    focus: 'Astro, Shopify apps, and rapid AI development',
    lead: 'Software Engineer from Germany, living in Sydney. Building products across startups since 2008.',
    headline: ['About'],
    statementLabel: 'Work',
    statementTitle: 'Notes on shipping useful software.',
    statement:
      'I work across Node.js, React, and Ruby on Rails, with a current focus on Astro sites, Shopify apps, and tools that make AI-assisted work more trustworthy.',
    careerLabel: 'Career',
    career: [
      {
        period: '2008 — now',
        title: 'Software Engineer',
        description:
          'Building products in startups around the world, from Germany to Sydney. Specialised in Node.js, React, and Ruby on Rails.',
      },
      {
        period: 'Current',
        title: 'Shopify and AI products',
        description:
          'Shipping merchant-facing Shopify apps such as EasyEdit, and tools like Tieout for verifying AI-generated reports.',
      },
      {
        period: 'Selected',
        title: 'Sturmfrei',
        description:
          'Company work including sturmfrei.com.au and other product surfaces for merchants and internal teams.',
      },
    ],
    interests: [
      'Static sites with Astro',
      'Shopify apps and checkout extensions',
      'Rapid AI-assisted development',
      'Node.js, React, and Ruby on Rails',
    ],
    interestsLabel: 'Interests',
    interestsHeading: 'What the work keeps returning to',
  },
};

export default config;
