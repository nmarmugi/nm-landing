import type { Project } from "./projects.types";

/**
 * Sorgente dei contenuti. Sostituibile con un CMS o file MDX senza toccare i
 * componenti: la forma dei dati è quella dichiarata in `projects.types.ts`.
 */
export const projects: readonly Project[] = [
  {
    slug: "mare-sedici",
    index: "01",
    title: "Mare Sedici",
    titleLines: ["Mare", "Sedici"],
    summary: {
      it: "Ristorante di pesce · landing · 2026",
      en: "Seafood restaurant · landing page · 2026",
    },
    role: { it: "Design + sviluppo", en: "Design + development" },
    year: "2026",
    stack: "React · Next.js · TypeScript",
    live: { label: "apri la landing ↗", href: "/it/demo/mare-sedici" },
    hero: {
      src: "/media/mare-sedici-poster.jpg",
      video: "/media/mare-sedici-hero.mp4",
      alt: {
        it: "Registrazione della landing Mare Sedici mentre viene scorsa",
        en: "Screen recording of the Mare Sedici landing page being scrolled",
      },
    },
    preview: {
      src: "/media/mare-sedici-poster.jpg",
      video: "/media/mare-sedici-hero.mp4",
      alt: {
        it: "Anteprima della landing Mare Sedici",
        en: "Preview of the Mare Sedici landing page",
      },
    },
    details: [
      {
        src: "/media/mare-sedici-carta-mobile.png",
        fit: "contain",
        alt: {
          it: "La carta su mobile: prezzi in chiaro accanto a ogni piatto e la barra di chiamata fissa in basso",
          en: "The menu on mobile: prices shown next to each dish, with the call bar pinned at the bottom",
        },
      },
      {
        src: "/media/mare-sedici-apertura-mobile.png",
        fit: "contain",
        alt: {
          it: "L'apertura su mobile: numero di telefono in cima e pulsante di prenotazione sotto il titolo",
          en: "The top of the page on mobile: phone number in the header and booking button under the headline",
        },
      },
    ],
    paragraphs: {
      it: [
        "Un ristorante di pesce con trenta coperti non ha bisogno di un sito che racconti tutto: ha bisogno che il telefono squilli. La pagina ha quindi un obiettivo solo, prenotare, e ogni sezione serve a togliere un dubbio prima di quel gesto: cosa si mangia, quanto costa, quando è aperto.",
        "Il numero di telefono resta agganciato in alto su ogni schermo, con il tocco diretto da mobile. Il menu mostra i prezzi in chiaro invece di nasconderli in un PDF, perché è la prima cosa che le persone cercano e la prima che, se manca, le fa uscire.",
        "Costruita in React con contenuti separati dal codice: il menu è una lista che il locale può cambiare ogni settimana senza toccare la grafica.",
      ],
      en: [
        "A thirty-seat seafood restaurant doesn't need a site that tells the whole story: it needs the phone to ring. So the page has a single goal, booking a table, and every section removes one doubt before that step: what you eat, what it costs, when it's open.",
        "The phone number stays pinned at the top on every screen, one tap away on mobile. The menu shows prices openly instead of hiding them in a PDF, because that is the first thing people look for and the first thing that makes them leave when missing.",
        "Built in React with content kept apart from the code: the menu is a plain list the restaurant can change every week without touching the design.",
      ],
    },
    metrics: [
      { value: 99, label: { it: "Lighthouse", en: "Lighthouse" } },
      {
        value: 1.1,
        suffix: "s",
        decimals: 1,
        label: { it: "LCP mobile", en: "Mobile LCP" },
      },
      {
        value: 1,
        label: { it: "obiettivo in pagina", en: "goal on the page" },
      },
    ],
  },
  {
    slug: "braceria-doni",
    index: "02",
    title: "Braceria Doni",
    titleLines: ["Braceria", "Doni"],
    summary: {
      it: "Braceria di famiglia · landing · 2026",
      en: "Family steakhouse · landing page · 2026",
    },
    role: { it: "Design + sviluppo", en: "Design + development" },
    year: "2026",
    stack: "React · TypeScript · GSAP",
    live: { label: "apri la landing ↗", href: "/it/demo/braceria-doni" },
    hero: {
      src: "/media/braceria-doni-poster.jpg",
      video: "/media/braceria-doni-hero.mp4",
      alt: {
        it: "Registrazione della landing Braceria Doni mentre viene scorsa",
        en: "Screen recording of the Braceria Doni landing page being scrolled",
      },
    },
    preview: {
      src: "/media/braceria-doni-poster.jpg",
      video: "/media/braceria-doni-hero.mp4",
      alt: {
        it: "Anteprima della landing Braceria Doni",
        en: "Preview of the Braceria Doni landing page",
      },
    },
    details: [
      {
        src: "/media/braceria-doni-apertura-mobile.png",
        fit: "contain",
        alt: {
          it: "L'apertura su mobile: titolo in condensata pesante e pulsante di prenotazione con ombra piena",
          en: "The top of the page on mobile: heavy condensed headline and booking button with a solid shadow",
        },
      },
      {
        src: "/media/braceria-doni-tagli-mobile.png",
        fit: "contain",
        alt: {
          it: "Il listino dei tagli su mobile: prezzi all'etto in evidenza e barra di chiamata fissa in basso",
          en: "The cuts price list on mobile: per-hundred-gram prices in the open and the call bar pinned at the bottom",
        },
      },
    ],
    paragraphs: {
      it: [
        "Una braceria di paese non compete sul prezzo e non può competere sulla comodità: compete sulla fiducia. La pagina è costruita per dimostrarla prima di chiedere la prenotazione, mostrando il fornitore, la legna, i giorni di frollatura e i prezzi al pubblico.",
        "Il pezzo centrale è la sezione sulla frollatura: mentre si scorre, il contatore sale da zero a quarantacinque giorni e ogni tappa spiega cosa succede alla carne. È l'argomento di vendita più forte del locale, e in un volantino non ci starebbe.",
        "Stile volutamente ruvido, con bordi pieni e caratteri condensati: la stessa grafica delle insegne dei macellai, portata a schermo.",
      ],
      en: [
        "A village steakhouse can't compete on price and can't compete on convenience: it competes on trust. The page is built to prove it before asking for the booking, showing the supplier, the wood, the ageing days and the prices in the open.",
        "The centrepiece is the dry-ageing section: as you scroll, the counter climbs from zero to forty-five days and each stage explains what happens to the meat. It is the strongest sales argument the place has, and no leaflet could hold it.",
        "The style is deliberately rough, with solid borders and condensed type: butcher-shop signage, brought to a screen.",
      ],
    },
    metrics: [
      { value: 45, label: { it: "giorni raccontati", en: "days told" } },
      {
        value: 1.2,
        suffix: "s",
        decimals: 1,
        label: { it: "LCP mobile", en: "Mobile LCP" },
      },
      {
        value: 1,
        label: { it: "obiettivo in pagina", en: "goal on the page" },
      },
    ],
  },
  {
    slug: "trattoria-nardi",
    index: "03",
    title: "Trattoria Nardi",
    titleLines: ["Trattoria", "Nardi"],
    summary: {
      it: "Trattoria di paese · landing · 2026",
      en: "Village trattoria · landing page · 2026",
    },
    role: { it: "Design + sviluppo", en: "Design + development" },
    year: "2026",
    stack: "React · TypeScript · GSAP Flip",
    live: { label: "apri la landing ↗", href: "/it/demo/trattoria-nardi" },
    hero: {
      src: "/media/trattoria-nardi-poster.jpg",
      video: "/media/trattoria-nardi-hero.mp4",
      alt: {
        it: "Registrazione della landing Trattoria Nardi mentre viene scorsa",
        en: "Screen recording of the Trattoria Nardi landing page being scrolled",
      },
    },
    preview: {
      src: "/media/trattoria-nardi-poster.jpg",
      video: "/media/trattoria-nardi-hero.mp4",
      alt: {
        it: "Anteprima della landing Trattoria Nardi",
        en: "Preview of the Trattoria Nardi landing page",
      },
    },
    details: [
      {
        src: "/media/trattoria-nardi-apertura-mobile.png",
        fit: "contain",
        alt: {
          it: "L'apertura su mobile: titolo centrato in carattere vintage e pulsante di prenotazione",
          en: "The top of the page on mobile: centred vintage headline and booking button",
        },
      },
      {
        src: "/media/trattoria-nardi-piatto-del-giorno-mobile.png",
        fit: "contain",
        alt: {
          it: "Il selettore dei giorni con sabato scelto e il piatto corrispondente sotto",
          en: "The weekday selector with Saturday picked and the matching dish shown below",
        },
      },
    ],
    paragraphs: {
      it: [
        "I clienti di una trattoria di paese cercano una cosa sola prima di uscire di casa: cosa c'è oggi. La pagina mette quella risposta al centro, con un selettore dei sei giorni di apertura e il piatto fisso di ciascuno.",
        "Il cambio di giorno usa GSAP Flip: la pastiglia colorata si sposta davvero da un bottone all'altro invece di sparire e ricomparire. Sono bottoni veri con `aria-pressed`, quindi lo stato arriva anche a chi naviga da tastiera.",
        "Impianto centrato e tipografia vintage, distanti dalle altre demo: una trattoria del 1961 non deve somigliare a un locale di pesce contemporaneo.",
      ],
      en: [
        "Regulars of a village trattoria want one answer before leaving the house: what is on today. The page puts that answer at the centre, with a selector for the six opening days and the fixed dish of each.",
        "Switching days uses GSAP Flip: the coloured pill actually travels from one button to the next instead of disappearing and reappearing. These are real buttons with `aria-pressed`, so the state reaches keyboard users too.",
        "A centred layout and vintage type keep it far from the other demos: a trattoria from 1961 should not look like a contemporary seafood place.",
      ],
    },
    metrics: [
      { value: 6, label: { it: "giorni in pagina", en: "days on the page" } },
      {
        value: 1.0,
        suffix: "s",
        decimals: 1,
        label: { it: "LCP mobile", en: "Mobile LCP" },
      },
      {
        value: 14,
        suffix: "€",
        label: { it: "pranzo fisso", en: "fixed lunch" },
      },
    ],
  },
  {
    slug: "gelateria-bruni",
    index: "04",
    title: "Gelateria Bruni",
    titleLines: ["Gelateria", "Bruni"],
    summary: {
      it: "Gelateria artigianale · landing · 2026",
      en: "Artisan gelato shop · landing page · 2026",
    },
    role: { it: "Design + sviluppo", en: "Design + development" },
    year: "2026",
    stack: "React · TypeScript · GSAP",
    live: { label: "apri la landing ↗", href: "/it/demo/gelateria-bruni" },
    hero: {
      src: "/media/gelateria-bruni-poster.jpg",
      video: "/media/gelateria-bruni-hero.mp4",
      alt: {
        it: "Registrazione della landing Gelateria Bruni mentre viene scorsa",
        en: "Screen recording of the Gelateria Bruni landing page being scrolled",
      },
    },
    preview: {
      src: "/media/gelateria-bruni-poster.jpg",
      video: "/media/gelateria-bruni-hero.mp4",
      alt: {
        it: "Anteprima della landing Gelateria Bruni",
        en: "Preview of the Gelateria Bruni landing page",
      },
    },
    details: [
      {
        src: "/media/gelateria-bruni-apertura-mobile.png",
        fit: "contain",
        alt: {
          it: "L'apertura su mobile: titolo in carattere tondo e pulsante per ordinare una vaschetta",
          en: "The top of the page on mobile: rounded headline type and the button to order a tub",
        },
      },
      {
        src: "/media/gelateria-bruni-gusti-mobile.png",
        fit: "contain",
        alt: {
          it: "La lista dei gusti con la pagina tinta di rosa dall'amarena, la scheda che si sta leggendo",
          en: "The flavour list with the page tinted pink by the sour cherry, the card being read",
        },
      },
    ],
    paragraphs: {
      it: [
        "Una gelateria non prende prenotazioni: le sue conversioni sono la visita al banco e la vaschetta ordinata per telefono. La pagina spinge su quelle due cose e mette orari, indirizzo e numero dove si vedono senza cercarli.",
        "Non c'è una sola fotografia: il banco lo raccontano i colori. Ogni gusto tinge il fondo della pagina mentre lo si legge, animando una variabile CSS invece delle regole. È il modo più economico di far sembrare viva una pagina finché il cliente non manda le foto vere.",
        "Tipografia con terminazioni tonde e forme morbide, agli antipodi delle altre demo: un gelato non ha bisogno di bordi netti.",
      ],
      en: [
        "A gelato shop takes no bookings: its conversions are the visit to the counter and the tub ordered by phone. The page pushes those two, and puts hours, address and number where nobody has to hunt for them.",
        "There is not a single photograph: the counter is told through colour. Each flavour tints the page background as you read it, animating a CSS variable rather than the rules. It is the cheapest way to keep a page alive until the client sends real photos.",
        "Rounded terminals and soft shapes, the opposite of the other demos: gelato has no need for sharp edges.",
      ],
    },
    metrics: [
      { value: 4, label: { it: "gusti in pagina", en: "flavours on the page" } },
      {
        value: 0.9,
        suffix: "s",
        decimals: 1,
        label: { it: "LCP mobile", en: "Mobile LCP" },
      },
      { value: 0, label: { it: "foto necessarie", en: "photos needed" } },
    ],
  },
  {
    slug: "forno-salvini",
    index: "05",
    title: "Forno Salvini",
    titleLines: ["Forno", "Salvini"],
    summary: {
      it: "Forno e caffetteria · landing · 2026",
      en: "Bakery and coffee bar · landing page · 2026",
    },
    role: { it: "Design + sviluppo", en: "Design + development" },
    year: "2026",
    stack: "React · TypeScript · GSAP",
    live: { label: "apri la landing ↗", href: "/it/demo/forno-salvini" },
    hero: {
      src: "/media/forno-salvini-poster.jpg",
      video: "/media/forno-salvini-hero.mp4",
      alt: {
        it: "Registrazione della landing Forno Salvini mentre viene scorsa",
        en: "Screen recording of the Forno Salvini landing page being scrolled",
      },
    },
    preview: {
      src: "/media/forno-salvini-poster.jpg",
      video: "/media/forno-salvini-hero.mp4",
      alt: {
        it: "Anteprima della landing Forno Salvini",
        en: "Preview of the Forno Salvini landing page",
      },
    },
    details: [
      {
        src: "/media/forno-salvini-apertura-mobile.png",
        fit: "contain",
        alt: {
          it: "L'apertura su mobile: titolo su tre pesi diversi e i due inviti ad agire uno sotto l'altro",
          en: "The top of the page on mobile: headline across three weights and the two calls to action stacked",
        },
      },
      {
        src: "/media/forno-salvini-giornata-mobile.png",
        fit: "contain",
        alt: {
          it: "La linea del tempo della giornata, riempita fino alle 4:15, con la barra di prenotazione fissa in basso",
          en: "The timeline of the day, filled up to 4:15, with the booking bar pinned at the bottom",
        },
      },
    ],
    paragraphs: {
      it: [
        "Il vantaggio di un forno a lievito madre è il lavoro che nessuno vede: si comincia alle tre e quaranta di notte. La pagina lo mette in fila come una linea del tempo, con l'indicatore che si riempie mentre si scorre e due inviti ad agire piazzati nei momenti giusti.",
        "L'obiettivo non è il traffico ma la prenotazione della pagnotta: vale più di una visita in più, perché il pane invenduto è il costo che pesa davvero.",
        "Impianto svizzero con una sola famiglia di caratteri giocata sui pesi, filetti da un pixel e nessuna decorazione: un forno vende precisione, non atmosfera.",
      ],
      en: [
        "The advantage of a sourdough bakery is the work nobody sees: it starts at twenty to four in the morning. The page lays it out as a timeline, with a progress indicator that fills as you scroll and two calls to action placed at the right moments.",
        "The goal is not traffic but the reserved loaf: it is worth more than an extra visit, because unsold bread is the cost that actually hurts.",
        "A Swiss layout with a single type family played on weights, one-pixel rules and no decoration: a bakery sells precision, not atmosphere.",
      ],
    },
    metrics: [
      { value: 5, label: { it: "tappe della giornata", en: "stages of the day" } },
      {
        value: 0.8,
        suffix: "s",
        decimals: 1,
        label: { it: "LCP mobile", en: "Mobile LCP" },
      },
      {
        value: 2,
        label: { it: "inviti ad agire", en: "calls to action" },
      },
    ],
  },
];

/** Progetto per slug, o `undefined` se lo slug non esiste. */
export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}

/** Progetto successivo in lista, ciclico: dopo l'ultimo si torna al primo. */
export function getNextProject(slug: string) {
  const current = projects.findIndex((project) => project.slug === slug);
  if (current === -1) return projects[0];
  return projects[(current + 1) % projects.length];
}
