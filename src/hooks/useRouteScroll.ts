import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Posizione di scorrimento per ogni voce della cronologia, tenuta fuori da
 * React perché non deve provocare render: serve solo al ritorno indietro.
 * Il ripristino automatico del browser è spento in `main.tsx`, quindi la
 * memoria è questa.
 */
const positions = new Map<string, number>();

/**
 * Gestisce lo scroll al cambio di rotta: in cima per una pagina nuova,
 * sull'ancora quando l'URL ne porta una, e dove si era rimasti quando si torna
 * indietro. Rispetta `prefers-reduced-motion` evitando lo scorrimento animato.
 */
export function useRouteScroll(): void {
  // `key` cambia a ogni navigazione, anche verso lo stesso indirizzo: senza,
  // cliccare "Lavori" una seconda volta non muoverebbe la pagina, perché
  // pathname e hash sarebbero identici a quelli di prima.
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  // Registra dove si trova la pagina corrente, una volta per frame disegnato.
  useEffect(() => {
    let frame = 0;

    const save = () => {
      frame = 0;
      positions.set(key, window.scrollY);
    };

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(save);
    };

    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      // Ultima lettura prima di lasciare la pagina: è quella che si ritroverà.
      save();
    };
  }, [key]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";

    // Tasto indietro: si riprende da dove si era, senza animazione. Un
    // ritorno che riparte dall'alto costringe a riscorrere tutta la lista.
    if (navigationType === "POP") {
      const saved = positions.get(key);
      if (saved !== undefined) {
        window.scrollTo({ top: saved, behavior: "instant" });
        return;
      }
    }

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

    // Nel primo secondo di vita la pagina si assesta: arrivano i font, le
    // immagini prendono posto, su mobile la barra degli indirizzi si ritrae. In
    // quella finestra il browser può spostare lo scorrimento, quindi si insiste
    // finché non è finita. Basta però che l'utente muova la pagina, e si smette
    // subito: da quel momento comanda lui.
    let userMoved = false;
    let frame = 0;

    const stop = () => {
      userMoved = true;
    };

    const listener = { once: true, passive: true } as const;
    window.addEventListener("wheel", stop, listener);
    window.addEventListener("touchmove", stop, listener);
    window.addEventListener("keydown", stop, { once: true });

    const startedAt = performance.now();
    const keepTop = () => {
      if (userMoved) return;
      if (window.scrollY !== 0) window.scrollTo({ top: 0, behavior: "instant" });
      if (performance.now() - startedAt < 1000) frame = requestAnimationFrame(keepTop);
    };
    frame = requestAnimationFrame(keepTop);

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [pathname, hash, key, navigationType]);
}
