import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from "../i18n/i18n.types";

/** Chiavi logiche delle pagine: indipendenti dalla lingua. */
export type PageKey = "home" | "work" | "about";

/** Segmenti di URL localizzati, così l'indirizzo resta leggibile in entrambe le lingue. */
export const ROUTE_SEGMENTS: Record<Language, Record<Exclude<PageKey, "home">, string>> = {
  it: { work: "lavori", about: "chi-sono" },
  en: { work: "work", about: "about" },
};

/**
 * Segmento delle landing dimostrative. Uguale in tutte le lingue: le demo sono
 * mini siti a sé, con contenuti propri, e non seguono la traduzione del sito.
 */
export const DEMO_SEGMENT = "demo";

export const paths = {
  home: (lang: Language) => `/${lang}`,
  about: (lang: Language) => `/${lang}/${ROUTE_SEGMENTS[lang].about}`,
  project: (lang: Language, slug: string) =>
    `/${lang}/${ROUTE_SEGMENTS[lang].work}/${slug}`,
  demo: (lang: Language, slug: string) => `/${lang}/${DEMO_SEGMENT}/${slug}`,
} as const;

/** True se la stringa è una lingua supportata. */
export function isLanguage(value: string | undefined): value is Language {
  return LANGUAGES.includes(value as Language);
}

/**
 * Traduce un percorso da una lingua all'altra mantenendo la pagina corrente,
 * per lo switcher di lingua (`/it/lavori/mare-sedici` → `/en/work/mare-sedici`).
 */
export function translatePath(pathname: string, to: Language): string {
  const [, maybeLang, ...rest] = pathname.split("/");
  const from = isLanguage(maybeLang) ? maybeLang : DEFAULT_LANGUAGE;
  const segments = isLanguage(maybeLang) ? rest : [maybeLang, ...rest].filter(Boolean);

  const translated = segments.map((segment) => {
    if (segment === ROUTE_SEGMENTS[from].work) return ROUTE_SEGMENTS[to].work;
    if (segment === ROUTE_SEGMENTS[from].about) return ROUTE_SEGMENTS[to].about;
    return segment;
  });

  return `/${[to, ...translated].join("/")}`;
}

/** Lingua preferita dal browser, con fallback sulla lingua di default. */
export function detectLanguage(): Language {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage?.getItem("nm-lang");
  if (isLanguage(stored ?? undefined)) return stored as Language;

  for (const candidate of navigator.languages ?? [navigator.language]) {
    const short = candidate.slice(0, 2).toLowerCase();
    if (isLanguage(short)) return short;
  }
  return DEFAULT_LANGUAGE;
}
