import type { Project } from "../../../data/projects.types";

export interface ProjectHeaderProps {
  project: Project;
  /** Posizione nell'elenco, a partire da 1. */
  position: number;
  total: number;
  /** Percorso di ritorno alla lista lavori. */
  backHref: string;
  titleId: string;
}
