import type { ElementType } from "react";
import type { PolymorphicProps } from "../../../types/polymorphic";

/** Ruoli tipografici del sistema: corrispondono uno a uno alla tabella dell'handoff. */
export type TextVariant =
  | "hero"
  | "pageTitle"
  | "sectionTitle"
  | "aboutTitle"
  | "ctaTitle"
  | "rowTitle"
  | "nextTitle"
  | "menuItem"
  | "metric"
  | "bodyLg"
  | "body"
  | "mono"
  | "monoSmall"
  | "monoLabel"
  | "monoCaption";

/** Livello di contrasto del testo rispetto al fondo corrente. */
export type TextTone =
  | "default"
  | "body"
  | "muted"
  | "soft"
  | "faint"
  | "accent"
  | "inherit";

export interface TextOwnProps {
  variant?: TextVariant;
  tone?: TextTone;
  uppercase?: boolean;
  /** Allineamento a destra per le colonne di metadati. */
  align?: "start" | "end";
  className?: string;
}

export type TextProps<C extends ElementType = "p"> = PolymorphicProps<C, TextOwnProps>;
