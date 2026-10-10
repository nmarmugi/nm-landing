import { dictionaries } from "../i18n/dictionaries";
import { LANGUAGES, type Language } from "../i18n/i18n.types";
import { paths } from "../routes/routes";
import { site } from "./site";
import type { Project } from "./projects.types";

/**
 * Metadati di una pagina indicizzabile. Li leggono sia le pagine React, per
 * aggiornare la testa del documento, sia il build, che li scrive nell'HTML
 * statico di ogni rotta: così chi non esegue JavaScript vede gli stessi tag.
 */
export interface PageMeta {
  title: string;
  description: string;
  /** Percorso canonico, relativo alla radice. */
  canonical: string;
  /** La stessa pagina nelle altre lingue, per gli hreflang. */
  alternates: Record<Language, string>;
  /** Immagine di anteprima social, relativa alla radice. */
  image?: string;
}

/** Stessa pagina in tutte le lingue, a partire da un costruttore di percorsi. */
function alternatesOf(path: (lang: Language) => string): Record<Language, string> {
  return Object.fromEntries(LANGUAGES.map((lang) => [lang, path(lang)])) as Record<
    Language,
    string
  >;
}

export function homeMeta(lang: Language): PageMeta {
  const { meta } = dictionaries[lang];
  return {
    title: meta.title,
    description: meta.description,
    canonical: paths.home(lang),
    alternates: alternatesOf(paths.home),
  };
}

export function aboutMeta(lang: Language): PageMeta {
  const { meta } = dictionaries[lang];
  return {
    title: meta.aboutTitle,
    description: meta.aboutDescription,
    canonical: paths.about(lang),
    alternates: alternatesOf(paths.about),
  };
}

export function projectMeta(lang: Language, project: Project): PageMeta {
  const { meta } = dictionaries[lang];
  return {
    title: meta.projectTitle.replace("{project}", project.title),
    description: project.description[lang],
    canonical: paths.project(lang, project.slug),
    alternates: alternatesOf((other) => paths.project(other, project.slug)),
    image: project.hero.src,
  };
}

/** Comuni e zone della provincia in cui il servizio è offerto, per schema.org. */
const AREA_SERVED = [
  { "@type": "City", name: "Viareggio" },
  { "@type": "City", name: "Lucca" },
  { "@type": "City", name: "Camaiore" },
  { "@type": "City", name: "Pietrasanta" },
  { "@type": "City", name: "Forte dei Marmi" },
  { "@type": "City", name: "Massarosa" },
  { "@type": "City", name: "Seravezza" },
  { "@type": "City", name: "Capannori" },
  { "@type": "AdministrativeArea", name: "Versilia" },
  { "@type": "AdministrativeArea", name: "Garfagnana" },
  { "@type": "AdministrativeArea", name: "Provincia di Lucca" },
] as const;

/**
 * Dati strutturati dell'intero sito: la persona, l'attività che offre il
 * servizio nella zona e il sito stesso. Niente via o coordinate: l'attività non
 * ha una sede aperta al pubblico, e un indirizzo inventato farebbe più danni
 * di uno assente.
 */
export function structuredData(lang: Language) {
  const { meta } = dictionaries[lang];
  const person = `${site.url}/#person`;
  const business = `${site.url}/#business`;
  const address = {
    "@type": "PostalAddress",
    addressLocality: "Viareggio",
    addressRegion: "LU",
    addressCountry: "IT",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person,
        name: "Nicola Marmugi",
        url: site.url,
        image: `${site.url}${site.previewImage}`,
        jobTitle: meta.jobTitle,
        email: `mailto:${site.email}`,
        telephone: site.phone,
        address,
        worksFor: { "@id": business },
        knowsAbout: meta.knowsAbout,
        sameAs: [...site.socials, site.portfolioUrl],
      },
      {
        "@type": "ProfessionalService",
        "@id": business,
        name: meta.businessName,
        description: meta.description,
        url: `${site.url}${paths.home(lang)}`,
        image: `${site.url}${site.previewImage}`,
        email: `mailto:${site.email}`,
        telephone: site.phone,
        address,
        areaServed: AREA_SERVED,
        founder: { "@id": person },
        knowsLanguage: ["it", "en"],
        sameAs: site.socials,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: meta.siteName,
        inLanguage: lang,
        publisher: { "@id": person },
      },
    ],
  };
}
