export interface SectionBarProps {
  /** Etichetta a sinistra, es. "LAVORI SELEZIONATI". */
  label: string;
  /** Valore a destra, es. "04". */
  meta?: string;
  /** id da collegare all'`aria-labelledby` della sezione che introduce. */
  id?: string;
  className?: string;
}
