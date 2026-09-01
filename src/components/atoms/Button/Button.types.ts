import type { ElementType } from "react";
import type { PolymorphicProps } from "../../../types/polymorphic";

/**
 * `accent` pillola piena (CTA principale) · `outline` pillola con bordo
 * (MENU / CHIUDI) · `bare` testo mono senza contenitore (nav, link di ritorno).
 */
export type ButtonVariant = "accent" | "outline" | "bare";

export interface ButtonOwnProps {
  variant?: ButtonVariant;
  /** Occupa tutta la larghezza disponibile (utile nelle card mobile). */
  block?: boolean;
  className?: string;
}

export type ButtonProps<C extends ElementType = "button"> = PolymorphicProps<
  C,
  ButtonOwnProps
>;
