export interface LiveRegionProps {
  /** Messaggio annunciato dallo screen reader quando cambia. */
  message: string;
  /** `polite` attende una pausa nella lettura, `assertive` interrompe. */
  politeness?: "polite" | "assertive";
}
