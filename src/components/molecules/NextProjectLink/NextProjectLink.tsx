import { useRef } from "react";
import { Link } from "react-router-dom";
import { Text } from "../../atoms/Text";
import { cx } from "../../../utils/cx";
import styles from "./NextProjectLink.module.css";
import type { NextProjectLinkProps } from "./NextProjectLink.types";

/** Riga "progetto successivo": cliccabile per intero, un solo stop di tastiera. */
export function NextProjectLink({
  label,
  title,
  href,
  onSelect,
  className,
}: NextProjectLinkProps) {
  const titleRef = useRef<HTMLSpanElement>(null);

  return (
    <Link
      to={href}
      className={cx(styles.link, className)}
      onClick={() => onSelect?.(titleRef.current)}
    >
      <Text as="span" variant="mono" tone="muted">
        {label}
      </Text>
      <Text as="span" ref={titleRef} variant="nextTitle" tone="inherit" className={styles.title}>
        {title}{" "}
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </Text>
    </Link>
  );
}
