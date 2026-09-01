import type { ProjectMetric } from "../../../data/projects.types";

export interface MetricListProps {
  metrics: readonly ProjectMetric[];
  className?: string;
}
