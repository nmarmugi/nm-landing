import { NextProjectLink } from "../../molecules/NextProjectLink";
import { useTitleTransition } from "../../../context/TitleTransitionContext";
import { useI18n } from "../../../i18n";
import type { NextProjectSectionProps } from "./NextProjectSection.types";

/**
 * Passaggio al progetto successivo. Misura il titolo prima di navigare, così
 * anche da progetto a progetto il titolo si sposta invece di saltare.
 */
export function NextProjectSection({ project, href }: NextProjectSectionProps) {
  const { t } = useI18n();
  const { capture } = useTitleTransition();

  return (
    <NextProjectLink
      label={t.project.nextProject}
      title={project.title}
      href={href}
      onSelect={(titleElement) => capture(project.slug, titleElement)}
    />
  );
}
