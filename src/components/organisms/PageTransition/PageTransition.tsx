import { useRef } from "react";
import { MOTION_QUERIES, gsap, useGSAP } from "../../../lib/gsap";
import { useTitleTransition } from "../../../context/TitleTransitionContext";
import styles from "./PageTransition.module.css";
import type { PageTransitionProps } from "./PageTransition.types";

/**
 * Animazione 11: un velo in accento scopre la pagina a ogni cambio di rotta.
 * Salta il turno quando il passaggio è già raccontato dal titolo che si sposta
 * (home → progetto): due animazioni sovrapposte si annullerebbero a vicenda.
 * È solo decorazione: `aria-hidden` e `pointer-events: none`.
 */
export function PageTransition({ pathname }: PageTransitionProps) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const { consumeOverlaySkip } = useTitleTransition();

  useGSAP(
    () => {
      const curtain = curtainRef.current;
      if (!curtain) return;
      if (consumeOverlaySkip()) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.motion, () => {
        const tween = gsap.fromTo(
          curtain,
          { scaleY: 1, transformOrigin: "top center" },
          {
            scaleY: 0,
            transformOrigin: "bottom center",
            duration: 0.5,
            ease: "power4.inOut",
          },
        );
        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { dependencies: [pathname] },
  );

  return <div ref={curtainRef} className={styles.curtain} aria-hidden="true" />;
}
