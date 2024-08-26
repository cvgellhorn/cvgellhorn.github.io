import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "cvgellhorn.com",
  DESCRIPTION: "Christoph von Gellhorn - Portfolio",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Christoph von Gellhorn - Portfolio",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "X (Twitter)",
    HREF: "https://twitter.com/cvgellhorn",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/cvgellhorn",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/cvgellhorn",
  },
];
