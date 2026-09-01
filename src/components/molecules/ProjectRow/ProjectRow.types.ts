import type { MouseEvent } from "react";
import type { Project } from "../../../data/projects.types";

export interface ProjectRowProps {
  project: Project;
  /** Percorso già localizzato della pagina progetto. */
  href: string;
  /** True quando questa riga è quella puntata dal cursore o col focus. */
  isActive: boolean;
  /** Sotto 768px l'hover non esiste: anteprima e inseguimento del cursore restano spenti. */
  interactive: boolean;
  onActivate: (slug: string) => void;
  onDeactivate: () => void;
  /**
   * Click sulla riga. Riceve l'elemento del titolo (misurato per la transizione
   * FLIP) e l'evento, così chi lo gestisce può rimandare la navigazione.
   */
  onSelect: (
    slug: string,
    titleElement: HTMLElement | null,
    event: MouseEvent<HTMLAnchorElement>,
  ) => void;
  previewLabel: string;
}
