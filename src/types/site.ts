export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  iconName?: string;
  isExternal?: boolean;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  author: {
    name: string;
    url: string;
  };
  links: {
    github: string;
    twitter?: string;
    contact: string;
    privacy: string;
    terms: string;
  };
}

export interface GuideItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
}
