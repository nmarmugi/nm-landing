import type { ElementType } from "react";
import { cx } from "../../../utils/cx";
import styles from "./Container.module.css";
import type { ContainerProps } from "./Container.types";

/** Applica il padding orizzontale di pagina. Unico posto dove vive il gutter. */
export function Container<C extends ElementType = "div">({
  as,
  gutter = "page",
  className,
  children,
  ...rest
}: ContainerProps<C>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cx(styles.container, styles[gutter], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
