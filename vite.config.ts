import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { projects } from "./src/data/projects";
import { site } from "./src/data/site";
import { LANGUAGES, type Language } from "./src/i18n/i18n.types";
import { paths } from "./src/routes/routes";

/**
 * Scrive `sitemap.xml` partendo dalle stesse rotte e dagli stessi progetti che
 * usa il sito. Generarla invece di tenerla a mano evita il caso peggiore: un
 * progetto nuovo che Google non vede perché nessuno ha aggiornato il file.
 *
 * Le landing dimostrative restano fuori: sono locali inventati.
 */
function sitemap(): Plugin {
  return {
    name: "nm-sitemap",
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
  plugins: [react(), sitemap()],
});
