import type { Project } from "../../../data/projects.types";

export interface ProjectListProps {
  projects: readonly Project[];
  /** id della sezione, bersaglio del link "Lavori" nella nav. */
  id: string;
}
