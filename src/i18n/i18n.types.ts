/** Lingue supportate dal sito. */
export const LANGUAGES = ["it", "en"] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "it";

/** Etichetta mostrata nello switcher di lingua. */
export const LANGUAGE_LABELS: Record<Language, string> = {
  it: "Italiano",
  en: "English",
};

/** Codice `lang` completo per l'attributo HTML e per `Intl`. */
export const LANGUAGE_TAGS: Record<Language, string> = {
  it: "it-IT",
  en: "en-GB",
};

/**
 * Dizionario di una lingua. `it` è la lingua di riferimento: il tipo viene
 * derivato da lì, così ogni altra lingua è obbligata ad avere le stesse chiavi.
 */
export interface Dictionary {
  meta: {
    title: string;
    description: string;
    /** Annuncio per screen reader al cambio pagina: "{page} · pagina caricata". */
    routeAnnouncement: string;
  };
  common: {
    skipToContent: string;
    languageSwitchLabel: string;
    switchTo: string;
    externalLink: string;
    openMenu: string;
    closeMenu: string;
    menuLabel: string;
    mainNavLabel: string;
  };
  nav: {
    work: string;
    about: string;
    contact: string;
  };
  home: {
    heroLines: readonly string[];
    /** Numero di righe finali rese in colore attenuato. */
    heroMutedLines: number;
    intro: string;
    metaStack: { label: string; value: readonly string[] };
    metaBase: { label: string; value: readonly string[] };
    selectedWork: string;
    previewLabel: string;
    ctaTitle: string;
    ctaButton: string;
  };
  project: {
    back: string;
    counter: string;
    role: string;
    year: string;
    stack: string;
    live: string;
    heroCaption: string;
    detailCaption: string;
    nextProject: string;
    notFoundTitle: string;
    notFoundBody: string;
    backHome: string;
  };
  about: {
    label: string;
    titleLines: readonly string[];
    paragraphs: readonly string[];
    portraitCaption: string;
    portraitAlt: string;
    /** Rimando al portfolio da sviluppatore, che sta su un sito separato. */
    portfolioLink: string;
    awardsLabel: string;
    awards: readonly string[];
  };
  contact: {
    label: string;
    titleLines: readonly string[];
    email: string;
    phone: string;
    socials: readonly { label: string; href: string }[];
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
}
