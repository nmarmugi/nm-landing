import { useRef } from "react";
import { Link } from "react-router-dom";
import { MediaSlot } from "../../atoms/MediaSlot";
import { Text } from "../../atoms/Text";
import { useI18n } from "../../../i18n";
import styles from "./ProjectCard.module.css";
import type { ProjectCardProps } from "./ProjectCard.types";

/**
 * Versione verticale della riga progetto, usata sotto i 768px:
 * immagine alta 180px, titolo, numero a destra, metadati sotto.
 */
export function ProjectCard({ project, href, onSelect }: ProjectCardProps) {
  const { lang } = useI18n();
  const titleRef = useRef<HTMLSpanElement>(null);

  return (
    <li className={styles.card}>
      <Link
        to={href}
        className={styles.link}
        onClick={(event) => onSelect(project.slug, titleRef.current, event)}
      >
        <MediaSlot
          src={project.preview.src}
          video={project.preview.video}
          alt={project.preview.alt[lang]}
          caption={project.title}
          radius="mediaLg"
          className={styles.media}
        />
        <span className={styles.head}>
          <Text as="span" ref={titleRef} variant="rowTitle" tone="inherit">
            {project.title}
          </Text>
          <Text as="span" variant="monoSmall" tone="inherit" className={styles.index}>
            {project.index}
          </Text>
        </span>
        <Text as="span" variant="monoSmall" tone="muted" className={styles.summary}>
          {project.summary[lang]}
        </Text>
      </Link>
    </li>
  );
}
