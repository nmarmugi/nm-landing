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

    // I caratteri di sistema e quelli del titolo hanno larghezze diverse: quando
    // arriva il font vero il testo si ricompone e l'altezza cambia. Si torna in
    // cima una seconda volta, a meno che nel frattempo l'utente non abbia già
    // cominciato a scorrere: in quel caso comanda lui.
    let moved = false;
    const stop = () => {
      moved = true;
    };
    const options = { once: true, passive: true } as const;
    window.addEventListener("wheel", stop, options);
    window.addEventListener("touchmove", stop, options);
    window.addEventListener("keydown", stop, { once: true });

    void document.fonts?.ready.then(() => {
      if (!moved) window.scrollTo({ top: 0, behavior: "instant" });
    });

    return () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [pathname, hash, key, navigationType]);
}
