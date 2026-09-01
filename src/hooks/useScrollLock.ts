import { useEffect } from "react";

/**
 * Blocca lo scroll finché `locked` è true, compensando la larghezza della
 * scrollbar per evitare il salto del layout.
 *
 * Il blocco vive su `html`, l'elemento che scorre davvero: il suo offset resta
 * dov'è e alla riapertura non c'è niente da ripristinare. Bloccando il body,
 * invece, l'offset del viewport va perso e la pagina si ritrova altrove.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const previousPadding = body.style.paddingRight;

    documentElement.dataset.scrollLocked = "true";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      delete documentElement.dataset.scrollLocked;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
