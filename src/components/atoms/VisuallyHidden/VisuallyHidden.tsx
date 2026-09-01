import type { ElementType } from "react";
import { cx } from "../../../utils/cx";
import styles from "./VisuallyHidden.module.css";
import type { VisuallyHiddenProps } from "./VisuallyHidden.types";

/** Testo per screen reader: presente nell'albero di accessibilità, invisibile a schermo. */
export function VisuallyHidden<C extends ElementType = "span">({
  as,
  className,
  children,
  ...rest
}: VisuallyHiddenProps<C>) {
  const Component = (as ?? "span") as ElementType;
  return (
    <Component className={cx(styles.visuallyHidden, className)} {...rest}>
      {children}
    </Component>
  );
}
