import { useRef, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { MediaSlot } from "../../atoms/MediaSlot";
import { Text } from "../../atoms/Text";
import { MOTION, gsap, useGSAP } from "../../../lib/gsap";
import { useI18n } from "../../../i18n";
import { cx } from "../../../utils/cx";
import styles from "./ProjectRow.module.css";
import type { ProjectRowProps } from "./ProjectRow.types";

const TITLE_REST = "rgba(242, 242, 239, 0.45)";
const TITLE_ACTIVE = "rgb(242, 242, 239)";
/** Ampiezza massima dell'inseguimento del cursore, in px. */
const FOLLOW_RANGE = 18;

/**
 * Riga della lista lavori (desktop). Tutta la riga è un solo link, quindi è
 * raggiungibile con un solo Tab e annunciata una volta sola.
 * Hover e anteprima sono un di più: con `interactive={false}` (mobile o motion
 * ridotto) la riga resta una lista di link normale.
 */
export function ProjectRow({
  project,
  href,
  isActive,
  interactive,
  onActivate,
  onDeactivate,
  onSelect,
  previewLabel,
}: ProjectRowProps) {
  const { lang } = useI18n();
  const titleRef = useRef<HTMLSpanElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<{
    x: (value: number) => void;
    y: (value: number) => void;
  } | null>(null);

  // Inseguimento del cursore: fuori da React, per non fare render a ogni frame.
  useGSAP(
    () => {
      if (!interactive || !previewRef.current) {
        followRef.current = null;
        return;
      }
      followRef.current = {
        x: gsap.quickTo(previewRef.current, "x", {
          duration: 0.4,
          ease: MOTION.ease.follow,
        }),
        y: gsap.quickTo(previewRef.current, "y", {
          duration: 0.4,
          ease: MOTION.ease.follow,
        }),
      };
    },
    { dependencies: [interactive] },
  );

  // Stato hover: colore del titolo e comparsa dell'anteprima.
  useGSAP(
    () => {
      if (!interactive) return;

      gsap.to(titleRef.current, {
        color: isActive ? TITLE_ACTIVE : TITLE_REST,
        duration: MOTION.duration.fast,
        ease: "power2.out",
      });

      gsap.to(previewRef.current, {
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.9,
        duration: MOTION.duration.fast,
        ease: "power2.out",
      });

      if (!isActive) {
        gsap.to(previewRef.current, { x: 0, y: 0, duration: MOTION.duration.fast });
      }
    },
    { dependencies: [isActive, interactive] },
  );

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const follow = followRef.current;
    const preview = previewRef.current;
    if (!follow || !preview) return;

    const bounds = preview.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const ratioX = gsap.utils.clamp(-1, 1, (event.clientX - centerX) / 400);
    const ratioY = gsap.utils.clamp(-1, 1, (event.clientY - centerY) / 120);

    follow.x(ratioX * FOLLOW_RANGE);
    follow.y(ratioY * FOLLOW_RANGE);
  };

  return (
    <li className={cx(styles.row, isActive && styles.active)}>
      <Link
        to={href}
        className={styles.link}
        onPointerEnter={() => interactive && onActivate(project.slug)}
        onPointerLeave={() => interactive && onDeactivate()}
        onPointerMove={interactive ? handlePointerMove : undefined}
        onFocus={() => onActivate(project.slug)}
        onBlur={onDeactivate}
        onClick={(event) => onSelect(project.slug, titleRef.current, event)}
      >
        <Text as="span" variant="mono" tone="inherit" className={styles.index}>
          {project.index}
        </Text>

        <Text
          as="span"
          ref={titleRef}
          variant="rowTitle"
          tone="inherit"
          className={styles.title}
        >
          {project.title}
        </Text>

        <div className={styles.previewSlot} aria-hidden="true">
          <div ref={previewRef} className={styles.preview}>
            <MediaSlot
              src={project.preview.src}
              video={project.preview.video}
              alt={project.preview.alt[lang]}
              caption={previewLabel}
              height="100%"
            />
          </div>
        </div>

        <Text as="span" variant="mono" tone="inherit" className={styles.summary}>
          {project.summary[lang]}
        </Text>
      </Link>
    </li>
  );
}
