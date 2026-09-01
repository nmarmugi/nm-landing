import type { ElementType } from "react";
import { cx } from "../../../utils/cx";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

/**
 * Elemento interattivo del sistema. Polimorfico: `as="a"` per link esterni,
 * `as={Link}` per la navigazione interna, `button` (default) per le azioni.
 * `type="button"` è impostato di default per non inviare form per sbaglio.
 */
export function Button<C extends ElementType = "button">({
  as,
  variant = "accent",
  block = false,
  className,
  children,
  ...rest
}: ButtonProps<C>) {
  const Component = (as ?? "button") as ElementType;
  const nativeType =
    Component === "button" ? { type: (rest as { type?: string }).type ?? "button" } : {};

  return (
    <Component
      className={cx(styles.button, styles[variant], block && styles.block, className)}
      {...nativeType}
      {...rest}
    >
      {children}
    </Component>
  );
}
