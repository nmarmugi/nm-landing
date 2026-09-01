import { useRef } from "react";
import { MediaSlot } from "../../atoms/MediaSlot";
import { MOTION_QUERIES, gsap, useGSAP } from "../../../lib/gsap";
import { useI18n } from "../../../i18n";
import { cx } from "../../../utils/cx";
import styles from "./ProjectHeroMedia.module.css";
import type { ProjectHeroMediaProps } from "./ProjectHeroMedia.types";

/**
 * Media di apertura a tutta larghezza.
 *
 * Con un'immagine: riquadro di altezza fissa, ritaglio, e animazione 7, cioè
 * `scale` da 1.1 a 1 con `yPercent -8` legati allo scroll.
 * Con un video: comanda la proporzione del file, così si vede per intero, e la
 * parallasse non parte proprio: ingrandire del dieci per cento vorrebbe dire
 * tagliare i bordi di quello che si vuole mostrare.
 */
export function ProjectHeroMedia({ media, caption }: ProjectHeroMediaProps) {
  const { lang } = useI18n();
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const isVideo = Boolean(media.video);

  useGSAP(
    () => {
      const frame = frameRef.current;
      const target = mediaRef.current;
      if (!frame || !target || isVideo) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.motion, () => {
        const tween = gsap.fromTo(
          target,
          { scale: 1.1, yPercent: -8 },
          {
            scale: 1,
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: frameRef, dependencies: [isVideo] },
  );

  return (
    <div ref={frameRef} className={cx(styles.frame, isVideo && styles.frameNatural)}>
      <div ref={mediaRef} className={styles.media}>
        <MediaSlot
          src={media.src}
          video={media.video}
          alt={media.alt[lang]}
          caption={caption}
          fit={isVideo ? "natural" : media.fit}
          radius="none"
          loading="eager"
          height={isVideo ? undefined : "100%"}
        />
      </div>
    </div>
  );
}
