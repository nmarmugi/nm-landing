import type { Language } from "../i18n/i18n.types";

/** Valore tradotto: una stringa per lingua. */
export type Localized<T = string> = Record<Language, T>;

export interface ProjectMetric {
  /** Valore numerico animato dal contatore (es. 98, 1.4, 60). */
  value: number;
  /** Suffisso non animato attaccato al numero (es. "s", "fps"). */
  suffix?: string;
  /** Decimali da mostrare durante e dopo il conteggio. */
  decimals?: number;
  label: Localized;
}

export interface ProjectMedia {
  /** URL dell'immagine reale; se assente viene mostrato lo slot a righe. */
  src?: string;
  /** URL di un video, che prende il posto dell'immagine. `src` fa da poster. */
  video?: string;
  /** `contain` per le schermate verticali, che ritagliate perderebbero senso. */
  fit?: "cover" | "contain";
  alt: Localized;
}

export interface Project {
  slug: string;
  /** Numerazione mostrata in lista: "01" … "04". */
  index: string;
  title: string;
  /** Riga per riga, come va spezzato il titolo nella pagina progetto. */
  titleLines: readonly string[];
  /** Metadati brevi mostrati nella riga della home. */
  summary: Localized;
  role: Localized;
  year: string;
  stack: string;
  live: { label: string; href: string };
  hero: ProjectMedia;
  preview: ProjectMedia;
  details: readonly ProjectMedia[];
  paragraphs: Localized<readonly string[]>;
  metrics: readonly ProjectMetric[];
}
