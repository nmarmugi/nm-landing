import type { Dictionary } from "../i18n.types";

export const it: Dictionary = {
  meta: {
    title: "Nicola Marmugi · Front end developer",
    description:
      "Landing page in React e Next.js che convertono: veloci, accessibili, curate fino all'ultimo dettaglio. Front end developer, Viareggio e da remoto.",
    routeAnnouncement: "{page} · pagina caricata",
  },
  common: {
    skipToContent: "Vai al contenuto principale",
    languageSwitchLabel: "Lingua",
    switchTo: "Passa a {language}",
    externalLink: "si apre in una nuova scheda",
    openMenu: "MENU",
    closeMenu: "CHIUDI",
    menuLabel: "Menu di navigazione",
    mainNavLabel: "Navigazione principale",
  },
  nav: {
    work: "Lavori",
    about: "Chi sono",
    contact: "Contatti",
  },
  home: {
    heroLines: ["Landing page", "che convertono.", "Non solo belle."],
    heroMutedLines: 1,
    intro:
      "Progetto e sviluppo landing page in React e Next.js: caricamento veloce, testo che porta al contatto, tutto misurabile. Front end developer su prodotti veri, dashboard ed editor visuali in start-up, con tempi di consegna decisi prima di iniziare.",
    metaStack: {
      label: "Stack",
      value: ["React · Next · TypeScript", "GSAP · Three.js · Tailwind"],
    },
    metaBase: { label: "Base", value: ["Viareggio, remoto", "UTC+2"] },
    selectedWork: "LAVORI SELEZIONATI",
    previewLabel: "anteprima",
    ctaTitle: "Parliamone.",
    ctaButton: "SCRIVIMI →",
  },
  project: {
    back: "← INDIETRO",
    counter: "{current} / {total}",
    role: "RUOLO",
    year: "ANNO",
    stack: "STACK",
    live: "LIVE",
    heroCaption: "hero · video o screenshot a tutta larghezza",
    detailCaption: "dettaglio {index}",
    nextProject: "PROGETTO SUCCESSIVO",
    notFoundTitle: "Progetto non trovato",
    notFoundBody: "Il progetto che cerchi non esiste o è stato rinominato.",
    backHome: "Torna ai lavori",
  },
  about: {
    label: "CHI SONO",
    titleLines: ["Faccio pagine", "che portano", "clienti,", "non solo visite."],
    paragraphs: [
      "Ho iniziato da freelance, su progetti in outsourcing per aziende di settori diversi: dashboard, form dinamici, autenticazione, rendering lato server. Poi il percorso Edgemony e l'ingresso in una start-up, dove ho costruito editor visuali e interfacce modulari con React, Next.js e TypeScript.",
      "Una landing page la tratto come un prodotto: un obiettivo solo, un percorso chiaro verso il contatto, tempi di caricamento sotto controllo e componenti che reggono quando il testo cambia. Le date di consegna le fissiamo prima di iniziare.",
    ],
    portraitCaption: "ritratto",
    portraitAlt: "Nicola Marmugi, ritratto in bianco e nero",
    awardsLabel: "PERCORSO",
    awards: [
      "Start-up tech · front end",
      "Edgemony · sviluppo web",
      "42 Firenze · programmazione in C",
    ],
  },
  contact: {
    label: "CONTATTI",
    titleLines: ["Hai un progetto?", "Dimmi tutto."],
    email: "nicolamarmugi1@gmail.com",
    phone: "+39 392 8710699",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/nicolamarmugi/" },
      { label: "Facebook", href: "https://www.facebook.com/nicola.marmugi.9" },
    ],
  },
  notFound: {
    title: "Pagina non trovata",
    body: "L'indirizzo che hai aperto non porta da nessuna parte.",
    cta: "Torna alla home",
  },
};
