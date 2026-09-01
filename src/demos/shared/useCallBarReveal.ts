import { type RefObject } from "react";
import { ScrollTrigger, gsap, useGSAP } from "../../lib/gsap";

/**
 * Barra di chiamata delle landing: sta fuori dallo schermo finché l'apertura è
 * visibile, poi entra dal basso e ci resta.
 *
 * Il gesto principale di ogni demo è telefonare, e il numero grande sta solo in
 * cima: da lì in poi serve un appiglio sempre sotto il pollice. La logica è
 * identica in tutte e cinque, l'aspetto no, quindi qui vive solo il movimento.
 *
 * `scopeRef` è la radice della pagina, in cui viene cercata l'apertura marcata
 * `data-hero`; `barRef` è la barra da muovere.
 */
export function useCallBarReveal(
  scopeRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
): void {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      const bar = barRef.current;
      if (!scope || !bar) return;

      const hero = scope.querySelector("[data-hero]");
      if (!hero) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(bar, { yPercent: 120 });

        const trigger = ScrollTrigger.create({
          trigger: hero,
          start: "bottom top",
          onEnter: () => {
            gsap.to(bar, { yPercent: 0, duration: 0.35, ease: "power3.out" });
          },
          onLeaveBack: () => {
            gsap.to(bar, { yPercent: 120, duration: 0.3, ease: "power2.in" });
          },
        });

        return () => {
          trigger.kill();
          // Senza pulizia la barra resterebbe fuori campo al cambio di pagina.
          gsap.set(bar, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: scopeRef },
  );
}
