import type { TextVariant } from "../../atoms/Text";

export interface ExternalLinkProps {
  href: string;
  children: string;
  variant?: TextVariant;
  /** `button`: pillola accent, per i link che sono l'azione principale del blocco. */
  appearance?: "text" | "button";
  className?: string;
}
