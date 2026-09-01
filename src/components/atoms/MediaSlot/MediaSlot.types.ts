import type { CSSProperties } from "react";

/** Proporzione dello slot quando non è vincolato da un'altezza esplicita. */
export type MediaRatio = "16/10" | "3/4" | "auto";

export interface MediaSlotProps {
  /** URL dell'immagine reale. Se assente resta lo slot a righe diagonali. */
  src?: string;
  /**
   * URL di un video. Ha la precedenza sull'immagine, che in quel caso diventa
   * il poster. Parte da solo e muto; con movimento ridotto resta fermo e
   * mostra i comandi.
   */
  video?: string;
  /** Testo alternativo. Obbligatorio: descrive l'immagine, non il file. */
  alt: string;
  /** Etichetta mono mostrata nel segnaposto (es. "anteprima", "dettaglio 1"). */
  caption?: string;
  /**
   * `cover` riempie lo slot ritagliando (default), `contain` mostra il file
   * intero dentro lo slot, `natural` lascia che sia il file a dare l'altezza,
   * senza ritagli né bande.
   */
  fit?: "cover" | "contain" | "natural";
  ratio?: MediaRatio;
  /** Altezza fissa in px o qualsiasi valore CSS valido. */
  height?: string;
  /** Angoli: `media` 3px (default), `mediaLg` 4px, `none` per il full-bleed. */
  radius?: "media" | "mediaLg" | "none";
  /** `lazy` di default; `eager` per l'hero della pagina progetto. */
  loading?: "lazy" | "eager";
  className?: string;
  style?: CSSProperties;
}
