import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://iamsukhpreet.github.io/",
  author: "Sukhpreet Kaur",
  profile: "https://iamsukhpreet.github.io/",
  desc: "Certified psychological counselor specializing in individual therapy, color therapy, and mental health support. Expert in anxiety, depression, stress management, and emotional well-being.",
  title: "Sukhpreet Kaur",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/iamsukhpreet/iamsukhpreet.github.io/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "Asia/Calcutta",
} as const;

export const LOCALE = {
  main: "en", // html lang code. Set this empty and default will be "en"
  dateLocale: "en-IN", // date format
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/sukhpreetkaur25.sk/",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:support@iamsukhpreet.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/917568592988",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: true,
  },
];
