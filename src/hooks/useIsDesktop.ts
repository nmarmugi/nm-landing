import { MOTION_QUERIES } from "../lib/gsap";
import { useMediaQuery } from "./useMediaQuery";

/**
 * True da 768px in su. Sotto questa soglia niente hover: anteprima al passaggio
 * e cursore magnetico restano spenti, come da handoff.
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(MOTION_QUERIES.desktop);
}
