import { cx } from "../../../utils/cx";
import styles from "./SkipLink.module.css";
import type { SkipLinkProps } from "./SkipLink.types";

/** Primo elemento focalizzabile della pagina: salta header e nav. */
export function SkipLink({ targetId, children, className }: SkipLinkProps) {
  return (
    <a className={cx(styles.skipLink, className)} href={`#${targetId}`}>
      {children}
    </a>
  );
}
