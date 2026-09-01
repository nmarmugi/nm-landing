import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Registrazione unica per tutta l'app: importare da qui, mai da "gsap" diretto,
// così nessun componente può usare un plugin non registrato.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip);

// ScrollTrigger tiene una propria memoria della posizione di scorrimento e la
// rimette al ricalcolo. Su Chrome mobile il ricalcolo scatta appena la barra
// degli indirizzi si ritrae, quindi la pagina si apriva già spostata. Su Safari
// no, perché lì quel ritiro non genera un ridimensionamento.
ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.clearScrollMemory("manual");

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };

/** Query per `gsap.matchMedia()`: chiavi condivise da tutte le animazioni. */
export const MOTION_QUERIES = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 768px)",
} as const;

/** Durate ed easing del sistema, allineate ai token CSS. */
export const MOTION = {
  duration: {
    fast: 0.35,
    base: 0.6,
    slow: 0.9,
    reduced: 0.2,
  },
  ease: {
    out: "power4.out",
    inOut: "power4.inOut",
    follow: "power3",
  },
  stagger: {
    chars: 0.02,
    rows: 0.08,
    menu: 0.07,
    exit: 0.03,
  },
} as const;
