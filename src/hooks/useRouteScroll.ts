import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Gestisce lo scroll al cambio di rotta: in cima per una pagina nuova,
 * sull'ancora quando l'URL ne porta una. Rispetta `prefers-reduced-motion`
 * evitando lo scorrimento animato.
 */
export function useRouteScroll(): void {
  // `key` cambia a ogni navigazione, anche verso lo stesso indirizzo: senza,
  // cliccare "Lavori" una seconda volta non muoverebbe la pagina, perché
  // pathname e hash sarebbero identici a quelli di prima.
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }

    // `instant` e non `auto`: con `auto` vale lo `scroll-behavior: smooth` del
    // CSS, e la scorsa verso l'alto viene interrotta dal contenuto della pagina
    // nuova che si monta, lasciando la pagina a metà.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, key]);
}
