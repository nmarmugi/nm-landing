import { useId, useRef, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SectionBar } from "../../molecules/SectionBar";
import { ProjectCard } from "../../molecules/ProjectCard";
import { ProjectRow } from "../../molecules/ProjectRow";
import { MOTION, MOTION_QUERIES, gsap, useGSAP } from "../../../lib/gsap";
import { useIsDesktop } from "../../../hooks/useIsDesktop";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { useTitleTransition } from "../../../context/TitleTransitionContext";
import { useI18n } from "../../../i18n";
import { paths } from "../../../routes/routes";
import styles from "./ProjectList.module.css";
import type { ProjectListProps } from "./ProjectList.types";

/** Durata dell'uscita della lista prima di cambiare pagina. */
const EXIT_DURATION = 0.28;

/**
 * Lista dei lavori selezionati.
 * Da 768px in su sono righe con anteprima al passaggio del cursore; sotto,
 * card verticali. Un solo `hoveredProject` per volta, come da handoff.
 * Animazione 4: ogni riga entra in viewport con ScrollTrigger, una sola volta.
 * Animazione 6: al click le altre righe escono e il titolo cliccato viene
 * passato alla pagina progetto, che lo riprende dalla stessa posizione.
 */
export function ProjectList({ projects, id }: ProjectListProps) {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { capture } = useTitleTransition();
  const headingId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;

      const items = gsap.utils.toArray<HTMLElement>(list.children);
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES.motion, () => {
        const tween = gsap.from(items, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: MOTION.ease.out,
          stagger: MOTION.stagger.rows,
          scrollTrigger: { trigger: list, start: "top 85%", once: true },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { dependencies: [isDesktop, projects] },
  );

  const handleSelect = (
    slug: string,
    titleElement: HTMLElement | null,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    const href = paths.project(lang, slug);

    // Click con modificatori o tasto centrale: comportamento nativo del link.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    capture(slug, titleElement);

    if (prefersReducedMotion || !listRef.current) return;

    event.preventDefault();

    const others = gsap.utils
      .toArray<HTMLElement>(listRef.current.children)
      .filter((item) => !item.contains(titleElement));

    gsap.to(others, {
      opacity: 0,
      y: -20,
      duration: EXIT_DURATION,
      ease: "power2.in",
      stagger: MOTION.stagger.exit,
      onComplete: () => navigate(href),
    });
  };

  return (
    <section id={id} className={styles.section} aria-labelledby={headingId}>
      <SectionBar
        id={headingId}
        label={t.home.selectedWork}
        meta={String(projects.length).padStart(2, "0")}
      />

      <ul ref={listRef} className={styles.list}>
        {projects.map((project) =>
          isDesktop ? (
            <ProjectRow
              key={project.slug}
              project={project}
              href={paths.project(lang, project.slug)}
              isActive={hoveredProject === project.slug}
              interactive={!prefersReducedMotion}
              onActivate={setHoveredProject}
              onDeactivate={() => setHoveredProject(null)}
              onSelect={handleSelect}
              previewLabel={t.home.previewLabel}
            />
          ) : (
            <ProjectCard
              key={project.slug}
              project={project}
              href={paths.project(lang, project.slug)}
              onSelect={handleSelect}
            />
          ),
        )}
      </ul>
    </section>
  );
}
