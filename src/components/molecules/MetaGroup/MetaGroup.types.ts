import type { ReactNode } from "react";

export interface MetaEntry {
  key: string;
  label: string;
  /** Una riga per elemento: il valore va a capo dove è stato pensato. */
  value: ReactNode | readonly string[];
}

export interface MetaGroupProps {
  entries: readonly MetaEntry[];
  /** `plain` etichetta in bianco (hero) · `accent` etichetta in neon (pagina progetto). */
  tone?: "plain" | "accent";
  /** Distanza fra i gruppi: 44px nell'hero, 52px nella pagina progetto. */
  gap?: "hero" | "project";
  className?: string;
}
