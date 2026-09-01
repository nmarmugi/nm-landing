import { VisuallyHidden } from "../VisuallyHidden";
import type { LiveRegionProps } from "./LiveRegion.types";

/**
 * Regione live per gli annunci. In una SPA il cambio di pagina non produce
 * nessun annuncio nativo: questo lo sostituisce.
 */
export function LiveRegion({ message, politeness = "polite" }: LiveRegionProps) {
  return (
    <VisuallyHidden role="status" aria-live={politeness} aria-atomic="true">
      {message}
    </VisuallyHidden>
  );
}
