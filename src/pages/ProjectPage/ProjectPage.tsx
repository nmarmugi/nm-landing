import { useId } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/atoms/Button";
import { Container } from "../../components/atoms/Container";
import { Text } from "../../components/atoms/Text";
import { ProjectBody } from "../../components/organisms/ProjectBody";
import { ProjectHeader } from "../../components/organisms/ProjectHeader";
import { ProjectHeroMedia } from "../../components/organisms/ProjectHeroMedia";
import { NextProjectSection } from "../../components/organisms/NextProjectSection";
import { SECTION_IDS } from "../../hooks/useNavItems";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useI18n } from "../../i18n";
import { getNextProject, getProjectBySlug, projects } from "../../data/projects";
import { paths } from "../../routes/routes";
import styles from "./ProjectPage.module.css";

/** Case study di un progetto. Slug sconosciuto: messaggio e ritorno alla lista. */
export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const titleId = useId();

  const project = getProjectBySlug(slug);
  const backHref = `${paths.home(lang)}#${SECTION_IDS.work}`;

  useDocumentMeta(
    project ? `${project.title} · ${t.meta.title}` : t.project.notFoundTitle,
    project?.paragraphs[lang][0],
  );

  if (!project) {
    return (
      <Container gutter="inner" className={styles.notFound}>
        <Text as="h1" variant="aboutTitle">
          {t.project.notFoundTitle}
        </Text>
        <Text variant="body" tone="body">
          {t.project.notFoundBody}
        </Text>
        <Button as={Link} to={backHref} variant="accent">
          {t.project.backHome}
        </Button>
      </Container>
    );
  }

  const position = projects.findIndex((item) => item.slug === project.slug) + 1;
  const next = getNextProject(project.slug);

  return (
    <article aria-labelledby={titleId}>
      <ProjectHeader
        project={project}
        position={position}
        total={projects.length}
        backHref={backHref}
        titleId={titleId}
      />
      <ProjectHeroMedia media={project.hero} caption={t.project.heroCaption} />
      <ProjectBody project={project} />
      <NextProjectSection project={next} href={paths.project(lang, next.slug)} />
    </article>
  );
}
