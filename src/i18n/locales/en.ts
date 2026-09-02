import type { Dictionary } from "../i18n.types";

export const en: Dictionary = {
  meta: {
    title: "Nicola Marmugi · Front end developer",
    description:
      "Landing pages in React and Next.js that convert: fast, accessible, tuned down to the last detail. Front end developer, based in Viareggio and remote.",
    routeAnnouncement: "{page} · page loaded",
  },
  common: {
    skipToContent: "Skip to main content",
    languageSwitchLabel: "Language",
    switchTo: "Switch to {language}",
    externalLink: "opens in a new tab",
    openMenu: "MENU",
    closeMenu: "CLOSE",
    menuLabel: "Navigation menu",
    mainNavLabel: "Main navigation",
  },
  nav: {
    work: "Work",
    about: "About",
    contact: "Contact",
  },
  home: {
    heroLines: ["Landing pages", "that convert.", "Not just pretty."],
    heroMutedLines: 1,
    intro:
      "I design and build landing pages in React and Next.js: fast to load, copy that leads to the contact, everything measurable. Front end developer on real products, dashboards and visual editors in a start-up, with delivery dates agreed before the work starts.",
    metaStack: {
      label: "Stack",
      value: ["React · Next · TypeScript", "GSAP · Three.js · Tailwind"],
    },
    metaBase: { label: "Based in", value: ["Viareggio, remote", "UTC+2"] },
    selectedWork: "SELECTED WORK",
    previewLabel: "preview",
    ctaTitle: "Let's talk.",
    ctaButton: "EMAIL ME →",
  },
  project: {
    back: "← BACK",
    counter: "{current} / {total}",
    role: "ROLE",
    year: "YEAR",
    stack: "STACK",
    live: "LIVE",
    heroCaption: "hero · full-width video or screenshot",
    detailCaption: "detail {index}",
    nextProject: "NEXT PROJECT",
    notFoundTitle: "Project not found",
    notFoundBody: "This project does not exist or has been renamed.",
    backHome: "Back to work",
  },
  about: {
    label: "ABOUT",
    titleLines: ["I build pages", "that bring", "clients,", "not just visits."],
    paragraphs: [
      "I started freelance, on outsourced projects across very different industries: dashboards, dynamic forms, authentication, server-side rendering. Then the Edgemony programme and a move into a tech start-up, building visual editors and modular interfaces with React, Next.js and TypeScript.",
      "I treat a landing page like a product: one goal, one clear path to the contact, load times kept in check, and components that hold up when the copy changes. Delivery dates are set before the work starts.",
    ],
    portraitCaption: "portrait",
    portraitAlt: "Nicola Marmugi, black and white portrait",
    portfolioLink: "PORTFOLIO ↗",
    awardsLabel: "PATH",
    awards: [
      "Tech start-up · front end",
      "Edgemony · web development",
      "42 Firenze · C programming",
    ],
  },
  contact: {
    label: "CONTACT",
    titleLines: ["Got a project?", "Tell me everything."],
    email: "nicolamarmugi1@gmail.com",
    phone: "+39 392 8710699",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/nicolamarmugi/" },
      { label: "Facebook", href: "https://www.facebook.com/nicola.marmugi.9" },
    ],
  },
  notFound: {
    title: "Page not found",
    body: "The address you opened doesn't lead anywhere.",
    cta: "Back to home",
  },
};
