export interface AwardListProps {
  label: string;
  items: readonly string[];
  /** Livello dell'intestazione: deve stare un gradino sotto il titolo della sezione. */
  headingLevel?: "h2" | "h3";
  className?: string;
}
