import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { projects } from "./src/data/projects";
import { site } from "./src/data/site";
import { LANGUAGES, type Language } from "./src/i18n/i18n.types";
import { paths } from "./src/routes/routes";

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
          "> Front end developer. Progetto e sviluppo landing page in React e Next.js:",
          "> veloci, accessibili, con il testo costruito per portare al contatto.",
          "> Base a Viareggio, in Toscana, e lavoro da remoto.",
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
          ...projects.map(
            (project) =>
              `- [${project.title}](${site.url}${paths.project("it", project.slug)}): ${project.summary.it}`,
          ),
          "",
          "## Contatti",
          "",
          `- Email: ${site.email}`,
          `- Telefono: ${site.phone}`,
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
  plugins: [react(), siteFiles()],
});
