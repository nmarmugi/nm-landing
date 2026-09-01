import { useRef } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../atoms/Container";
import { Text } from "../../atoms/Text";
import { ExternalLink } from "../../molecules/ExternalLink";
import { MetaGroup } from "../../molecules/MetaGroup";
import { MOTION, MOTION_QUERIES, gsap, useGSAP } from "../../../lib/gsap";
import { useTitleTransition } from "../../../context/TitleTransitionContext";
import { useI18n } from "../../../i18n";
import styles from "./ProjectHeader.module.css";
import type { ProjectHeaderProps } from "./ProjectHeader.types";

/**
 * Apertura della pagina progetto: barra di ritorno, titolo, metadati tecnici.
 * Animazione 6 (arrivo): se si arriva dalla lista, il titolo parte dalla
 * posizione e dalla dimensione che aveva nella riga cliccata e si porta al
 * proprio posto. Arrivando da un link diretto, entra e basta.
 */
export function ProjectHeader({
  project,
  position,
  total,
  backHref,
  titleId,
}: ProjectHeaderProps) {
  const { t, lang, format } = useI18n();
  const { consume } = useTitleTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const title = titleRef.current;
      const root = rootRef.current;
      if (!title || !root) return;

      const source = consume(project.slug);
      const rest = root.querySelectorAll<HTMLElement>("[data-project-intro]");
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES.motion, () => {
        const timeline = gsap.timeline();

        if (source) {
          const target = title.getBoundingClientRect();
          const targetFontSize = Number.parseFloat(
            window.getComputedStyle(title).fontSize,
          );

          timeline.from(title, {
            x: source.left - target.left,
            y: source.top - target.top,
            scale: source.fontSize / targetFontSize,
            transformOrigin: "left top",
            duration: 0.7,
            ease: MOTION.ease.out,
          });
        } else {
          timeline.from(title, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: MOTION.ease.out,
          });
        }

        timeline.from(
          rest,
          { y: 20, opacity: 0, duration: 0.6, ease: MOTION.ease.out, stagger: 0.08 },
          0.2,
        );

        return () => timeline.kill();
      });

      mm.add(MOTION_QUERIES.reduced, () => {
        const tween = gsap.from([title, ...rest], {
          opacity: 0,
          duration: MOTION.duration.reduced,
        });
        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [project.slug] },
  );

  return (
    <div ref={rootRef}>
      <Container gutter="inner" className={styles.bar}>
        <Text as={Link} to={backHref} variant="mono" tone="inherit" className={styles.back}>
          {t.project.back}
        </Text>
        <Text as="span" variant="mono" tone="muted">
          {format(t.project.counter, {
            current: String(position).padStart(2, "0"),
            total: String(total).padStart(2, "0"),
          })}
        </Text>
      </Container>

      <Container gutter="inner" as="header" className={styles.intro}>
        <Text as="h1" id={titleId} ref={titleRef} variant="pageTitle" className={styles.title}>
          {project.titleLines.map((line, index) => (
            <span key={line} className={styles.line}>
              {line}
              {index < project.titleLines.length - 1 ? " " : ""}
            </span>
          ))}
        </Text>

        <div data-project-intro className={styles.meta}>
          <MetaGroup
            tone="accent"
            gap="project"
            entries={[
              { key: "role", label: t.project.role, value: project.role[lang] },
              { key: "year", label: t.project.year, value: project.year },
              { key: "stack", label: t.project.stack, value: project.stack },
              {
                key: "live",
                label: t.project.live,
                value: (
                  <ExternalLink href={project.live.href}>
                    {project.live.label}
                  </ExternalLink>
                ),
              },
            ]}
          />
        </div>
      </Container>
    </div>
  );
}
