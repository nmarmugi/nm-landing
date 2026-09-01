import { useEffect } from "react";
import { site } from "../data/site";
import type { Language } from "../i18n/i18n.types";

/**
 * Marca i tag creati da questo hook. Il sito è una single page application:
 * senza un marcatore non sapremmo quali link ripulire al cambio di rotta.
 */
const MANAGED = "data-managed-meta";

export interface DocumentMetaOptions {
  /** Percorso canonico della pagina, relativo alla radice ("/it/chi-sono"). */
  canonical?: string;
  /** Lo stesso contenuto nelle altre lingue, per gli hreflang. */
  alternates?: Partial<Record<Language, string>>;
  /** Immagine di anteprima social, relativa alla radice. */
  image?: string;
  /** Tiene la pagina fuori dagli indici dei motori di ricerca. */
  noindex?: boolean;
}

/** Da percorso relativo a URL assoluto sul dominio canonico. */
function absolute(path: string): string {
  return new URL(path, site.url).href;
}

/** Aggiorna il meta se esiste già in `index.html`, altrimenti lo crea. */
function setMeta(attribute: "name" | "property", key: string, content: string): void {
  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.append(tag);
  }

  tag.content = content;
}

/** I link cambiano da pagina a pagina: si creano sempre nuovi e si ripuliscono. */
function addLink(rel: string, href: string, hreflang?: string): void {
  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  if (hreflang) link.hreflang = hreflang;
  link.setAttribute(MANAGED, "");
  document.head.append(link);
}

/**
 * Aggiorna titolo, description, canonical, hreflang e anteprime social della
 * pagina corrente. Google esegue il JavaScript, quindi i tag scritti qui
 * vengono letti: contano però solo quelli presenti al termine del rendering,
 * per questo a ogni cambio rotta i link vecchi vanno rimossi.
 */
export function useDocumentMeta(
  title: string,
  description?: string,
  options: DocumentMetaOptions = {},
): void {
  const { canonical, image, noindex = false } = options;
  // Serializzato: un oggetto letterale cambierebbe identità a ogni render.
  const alternates = JSON.stringify(options.alternates ?? {});

  useEffect(() => {
    document.title = title;

    document.head
      .querySelectorAll(`link[${MANAGED}]`)
      .forEach((node) => node.remove());

    setMeta("property", "og:title", title);
    setMeta("name", "twitter:title", title);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }

    const preview = absolute(image ?? site.previewImage);
    setMeta("property", "og:image", preview);
    setMeta("name", "twitter:image", preview);

    if (canonical) {
      const url = absolute(canonical);
      addLink("canonical", url);
      setMeta("property", "og:url", url);
    }

    const translations: Partial<Record<Language, string>> = JSON.parse(alternates);
    for (const [lang, path] of Object.entries(translations)) {
      addLink("alternate", absolute(path), lang);
    }

    // Chi arriva senza una lingua fra quelle tradotte vede l'italiano.
    if (translations.it) addLink("alternate", absolute(translations.it), "x-default");
  }, [title, description, canonical, image, noindex, alternates]);
}
