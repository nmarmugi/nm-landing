import { useEffect } from "react";

/**
 * Tiene l'hash dell'URL allineato alla sezione che si sta leggendo, così
 * l'indirizzo è sempre condivisibile: arrivando ai contatti diventa
 * `/it/chi-sono#contact`, tornando in cima torna `/it/chi-sono`.
 *
 * Si scrive direttamente nella history invece di navigare: una navigazione
 * rimetterebbe in moto lo scroll sull'ancora e la pagina scatterebbe da sola.
 */
export function useSectionHash(hash: string | null): void {
  useEffect(() => {
    const next = hash ?? "";
    if (window.location.hash === next) return;

    const { pathname, search } = window.location;
    // Lo stato corrente va conservato: è la chiave con cui il router ritrova
    // la posizione nella sua history.
    window.history.replaceState(window.history.state, "", `${pathname}${search}${next}`);
  }, [hash]);
}
