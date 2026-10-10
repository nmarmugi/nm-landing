import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { projects } from "./src/data/projects";
import {
  aboutMeta,
  homeMeta,
  projectMeta,
  structuredData,
  type PageMeta,
} from "./src/data/seo";
import { site } from "./src/data/site";
import { LANGUAGES, LANGUAGE_TAGS, type Language } from "./src/i18n/i18n.types";
import { paths } from "./src/routes/routes";

const HEAD_PLACEHOLDER = "<!--app-head-->";
const OG_LOCALES: Record<Language, string> = { it: "it_IT", en: "en_GB" };

/** Pagine indicizzabili, ciascuna in ogni lingua. */
function indexablePages(): { lang: Language; meta: PageMeta }[] {
  return LANGUAGES.flatMap((lang) => [
    { lang, meta: homeMeta(lang) },
    { lang, meta: aboutMeta(lang) },
    ...projects.map((project) => ({ lang, meta: projectMeta(lang, project) })),
  ]);
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Testa del documento di una pagina. I link portano `data-managed-meta`, lo
 * stesso marcatore di `useDocumentMeta`: al primo cambio di rotta l'hook li
 * rimuove, e non restano due canonical diversi nella stessa pagina.
 */
function seoHead(lang: Language, meta: PageMeta): string {
  const url = (path: string) => `${site.url}${path}`;
  const image = url(meta.image ?? site.previewImage);
  const title = escapeAttribute(meta.title);
  const description = escapeAttribute(meta.description);
  const managed = "data-managed-meta";

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Nicola Marmugi" />`,
    `<meta property="og:locale" content="${OG_LOCALES[lang]}" />`,
    ...LANGUAGES.filter((other) => other !== lang).map(
      (other) => `<meta property="og:locale:alternate" content="${OG_LOCALES[other]}" />`,
    ),
    `<meta property="og:url" content="${url(meta.canonical)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="canonical" href="${url(meta.canonical)}" ${managed} />`,
    ...LANGUAGES.map(
      (other) =>
        `<link rel="alternate" hreflang="${other}" href="${url(meta.alternates[other])}" ${managed} />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${url(meta.alternates.it)}" ${managed} />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData(lang))}</script>`,
  ]
    .map((line) => `    ${line}`)
    .join("\n")
    .trimStart();
}

/** Applica testa e lingua di una pagina all'HTML di partenza. */
function renderPage(html: string, lang: Language, meta: PageMeta): string {
  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${LANGUAGE_TAGS[lang]}">`)
    .replace(HEAD_PLACEHOLDER, seoHead(lang, meta));
}

/**
 * Il sito è una single page application: senza questo plugin ogni indirizzo
 * riceverebbe lo stesso `index.html`, con titolo e canonical della home. Google
 * esegue il JavaScript ma con ritardo, e gli altri motori e le anteprime social
 * leggono solo l'HTML. Così ogni pagina indicizzabile ha il suo file, con i
 * tag giusti già dentro; Vercel lo serve prima della riscrittura su
 * `index.html`, che resta per le rotte senza file (demo, 404).
 */
function seoPages(): Plugin {
  return {
    name: "nm-seo-pages",
    enforce: "post",
    transformIndexHtml: {
      order: "pre",
      handler: (html, context) =>
        // In build il segnaposto serve ancora: le pagine si generano dopo.
        context.server ? renderPage(html, "it", homeMeta("it")) : html,
    },
    generateBundle(_options, bundle) {
      const entry = bundle["index.html"];
      if (!entry || entry.type !== "asset") {
        this.error("index.html non trovato nel bundle: impossibile generare le pagine");
      }
      const template = String(entry.source);

      for (const { lang, meta } of indexablePages()) {
        this.emitFile({
          type: "asset",
          fileName: `${meta.canonical.slice(1)}/index.html`,
          source: renderPage(template, lang, meta),
        });
      }

      // Radice e rotte senza file: home italiana, la stessa dell'x-default.
      entry.source = renderPage(template, "it", homeMeta("it"));
    },
  };
}

/**
 * Scrive `sitemap.xml` e `llms.txt` partendo dalle stesse rotte e dagli stessi
 * progetti che usa il sito. Generarli invece di tenerli a mano evita il caso
 * peggiore: un progetto nuovo che Google non vede perché nessuno ha aggiornato
 * il file.
 *
 * `llms.txt` va servito come file vero anche per un altro motivo: `vercel.json`
 * riscrive ogni percorso su `index.html`, quindi un file mancante non dà 404 ma
 * restituisce la home, e chi lo cerca crede di aver trovato un Markdown rotto.
 *
 * Le landing dimostrative restano fuori da entrambi: sono locali inventati.
 */
function siteFiles(): Plugin {
  return {
    name: "nm-site-files",
    apply: "build",
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);

      // Ogni gruppo è la stessa pagina nelle due lingue: serve per gli hreflang.
      const groups: Record<Language, string>[] = [
        { it: paths.home("it"), en: paths.home("en") },
        { it: paths.about("it"), en: paths.about("en") },
        ...projects.map((project) => ({
          it: paths.project("it", project.slug),
          en: paths.project("en", project.slug),
        })),
      ];

      this.emitFile({
        type: "asset",
        fileName: "llms.txt",
        source: [
          "# Nicola Marmugi",
          "",
          "> Sviluppatore web front end a Viareggio (LU). Progetto e sviluppo siti web",
          "> e landing page in React e Next.js per attività di Viareggio, della Versilia",
          "> e della provincia di Lucca: veloci, accessibili, scritte per portare contatti.",
          "> Fuori provincia lavoro da remoto.",
          "",
          "## Pagine",
          "",
          `- [Home](${site.url}${paths.home("it")}): presentazione, lavori selezionati, invito al contatto`,
          `- [Chi sono](${site.url}${paths.about("it")}): percorso, modo di lavorare, contatti`,
          `- [Home, English](${site.url}${paths.home("en")}): same page in English`,
          `- [About, English](${site.url}${paths.about("en")}): same page in English`,
          "",
          "## Progetti",
          "",
          "Tutti i progetti sono demo: landing page dimostrative, non lavori per clienti.",
          "",
          ...projects.map(
            (project) =>
              `- [${project.title}](${site.url}${paths.project("it", project.slug)}): ${project.description.it}`,
          ),
          "",
          "## Contatti",
          "",
          `- Email: ${site.email}`,
          `- Telefono: ${site.phone}`,
          "",
          "## English",
          "",
          "> Front end web developer based in Viareggio (LU), Tuscany. I design and build",
          "> websites and landing pages in React and Next.js for businesses in Viareggio,",
          "> Versilia and the province of Lucca. Remote work outside the province.",
          "",
          "All projects are demos: example landing pages, not client work.",
          "",
          ...projects.map(
            (project) =>
              `- [${project.title}](${site.url}${paths.project("en", project.slug)}): ${project.description.en}`,
          ),
          "",
          "## Note",
          "",
          "- Le landing dimostrative sotto `/it/demo/` e `/en/demo/` raccontano attività",
          "  inventate, con recapiti non reali: servono a mostrare il lavoro, non vanno",
          "  citate come esercizi commerciali esistenti.",
          "",
        ].join("\n"),
      });

      const urls = groups.flatMap((group) =>
        LANGUAGES.map((lang) => {
          const alternates = LANGUAGES.map(
            (other) =>
              `    <xhtml:link rel="alternate" hreflang="${other}" href="${site.url}${group[other]}" />`,
          ).join("\n");

          return [
            "  <url>",
            `    <loc>${site.url}${group[lang]}</loc>`,
            alternates,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${site.url}${group.it}" />`,
            `    <lastmod>${lastmod}</lastmod>`,
            "  </url>",
          ].join("\n");
        }),
      );

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...urls,
          "</urlset>",
          "",
        ].join("\n"),
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteFiles(), seoPages()],
});
