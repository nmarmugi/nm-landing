import type { Ref } from "react";

export interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  /** Etichetta visibile: "MENU" o "CHIUDI". */
  label: string;
  /** id dell'overlay controllato, per `aria-controls`. */
  controls: string;
  ref?: Ref<HTMLButtonElement>;
  className?: string;
}
