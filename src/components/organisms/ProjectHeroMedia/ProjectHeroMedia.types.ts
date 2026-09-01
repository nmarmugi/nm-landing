import type { ProjectMedia } from "../../../data/projects.types";

export interface ProjectHeroMediaProps {
  media: ProjectMedia;
  /** Etichetta mono del segnaposto finché non c'è l'immagine reale. */
  caption: string;
}
