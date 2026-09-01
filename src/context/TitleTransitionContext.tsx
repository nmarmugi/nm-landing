import { createContext, useCallback, useContext, useMemo, useRef } from "react";
import type { ReactNode } from "react";

/** Geometria del titolo di partenza, misurata prima della navigazione. */
export interface TitleTransitionState {
  slug: string;
  top: number;
  left: number;
  width: number;
  fontSize: number;
}

export interface TitleTransitionContextValue {
  /** Misura il titolo della riga cliccata e lo mette da parte per la pagina progetto. */
  capture: (slug: string, element: HTMLElement | null) => void;
  /** Restituisce e cancella lo stato: si usa una sola volta, al montaggio. */
  consume: (slug: string) => TitleTransitionState | null;
  /**
   * Vero una sola volta dopo una `capture`: dice all'overlay di transizione di
   * saltare il turno, perché il passaggio è già raccontato dal titolo che si
   * sposta. Le due animazioni non devono sovrapporsi.
   */
  consumeOverlaySkip: () => boolean;
}

const TitleTransitionContext = createContext<TitleTransitionContextValue | null>(null);

/**
 * Trasporta la posizione del titolo fra due pagine per la transizione in stile
 * FLIP (animazione 6 dell'handoff). Lo stato vive in un ref: cambia fra un
 * unmount e un mount, non deve provocare render.
 */
export function TitleTransitionProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<TitleTransitionState | null>(null);
  const skipOverlayRef = useRef(false);

  const capture = useCallback((slug: string, element: HTMLElement | null) => {
    if (!element) {
      stateRef.current = null;
      return;
    }
    const rect = element.getBoundingClientRect();
    stateRef.current = {
      slug,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      fontSize: Number.parseFloat(window.getComputedStyle(element).fontSize),
    };
    skipOverlayRef.current = true;
  }, []);

  const consume = useCallback((slug: string) => {
    const state = stateRef.current;
    stateRef.current = null;
    return state && state.slug === slug ? state : null;
  }, []);

  const consumeOverlaySkip = useCallback(() => {
    const skip = skipOverlayRef.current;
    skipOverlayRef.current = false;
    return skip;
  }, []);

  const value = useMemo(
    () => ({ capture, consume, consumeOverlaySkip }),
    [capture, consume, consumeOverlaySkip],
  );

  return (
    <TitleTransitionContext.Provider value={value}>
      {children}
    </TitleTransitionContext.Provider>
  );
}

/** Nessun provider: la transizione semplicemente non avviene. */
export function useTitleTransition(): TitleTransitionContextValue {
  return (
    useContext(TitleTransitionContext) ?? {
      capture: () => {},
      consume: () => null,
      consumeOverlaySkip: () => false,
    }
  );
}
