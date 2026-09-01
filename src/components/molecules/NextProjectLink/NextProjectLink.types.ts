export interface NextProjectLinkProps {
  /** Etichetta mono a sinistra: "PROGETTO SUCCESSIVO". */
  label: string;
  /** Titolo del progetto successivo, senza freccia. */
  title: string;
  href: string;
  onSelect?: (titleElement: HTMLElement | null) => void;
  className?: string;
}
