import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * True quando l'utente ha chiesto meno movimento. Serve dove la decisione non
 * è un'animazione GSAP ma un attributo del markup, ad esempio un video che
 * parte da solo oppure aspetta un comando.
 *
 * Si aggiorna se l'impostazione cambia mentre la pagina è aperta.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
