import type { MouseEvent } from "react";
import type { Project } from "../../../data/projects.types";

export interface ProjectCardProps {
  project: Project;
  /** Percorso già localizzato della pagina progetto. */
  href: string;
  /** Come in `ProjectRow`: titolo misurato per la transizione FLIP più l'evento. */
  onSelect: (
    slug: string,
    titleElement: HTMLElement | null,
    event: MouseEvent<HTMLAnchorElement>,
  ) => void;
}
