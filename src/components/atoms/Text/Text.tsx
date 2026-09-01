import type { ElementType } from "react";
import { cx } from "../../../utils/cx";
import styles from "./Text.module.css";
import type { TextProps, TextTone } from "./Text.types";

const toneClass: Record<TextTone, string> = {
  default: styles.toneDefault,
  body: styles.toneBody,
  muted: styles.toneMuted,
  soft: styles.toneSoft,
  faint: styles.toneFaint,
  accent: styles.toneAccent,
  inherit: styles.toneInherit,
};

/**
 * Primitiva tipografica. Ogni misura del sito passa da qui: nessun componente
 * dichiara font-size o peso per conto proprio.
 * Il tag è indipendente dallo stile (`as`), così la gerarchia semantica degli
 * heading resta corretta a prescindere dalla dimensione visiva.
 */
export function Text<C extends ElementType = "p">({
  as,
  variant = "body",
  tone = "default",
  uppercase = false,
  align = "start",
  className,
  children,
  ...rest
}: TextProps<C>) {
  const Component = (as ?? "p") as ElementType;

  return (
    <Component
      className={cx(
        styles.text,
        styles[variant],
        toneClass[tone],
        uppercase && styles.uppercase,
        align === "end" && styles.alignEnd,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
