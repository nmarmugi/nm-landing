import type { TextVariant } from "../../atoms/Text";

export interface ExternalLinkProps {
  href: string;
  children: string;
  variant?: TextVariant;
  className?: string;
}
