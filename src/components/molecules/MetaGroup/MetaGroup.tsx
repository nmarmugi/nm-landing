import { Fragment } from "react";
import { Text } from "../../atoms/Text";
import { cx } from "../../../utils/cx";
import styles from "./MetaGroup.module.css";
import type { MetaGroupProps } from "./MetaGroup.types";

/**
 * Colonne di metadati in mono. Rese come lista di descrizioni (`dl`), così la
 * relazione etichetta → valore esiste anche per gli screen reader.
 */
export function MetaGroup({
  entries,
  tone = "plain",
  gap = "hero",
  className,
}: MetaGroupProps) {
  return (
    <dl
      className={cx(
        styles.group,
        gap === "hero" ? styles.gapHero : styles.gapProject,
        className,
      )}
    >
      {entries.map((entry) => (
        <Fragment key={entry.key}>
          <div className={styles.entry}>
            <Text
              as="dt"
              variant="mono"
              tone={tone === "accent" ? "accent" : "default"}
              className={styles.label}
            >
              {entry.label}
            </Text>
            <Text as="dd" variant="mono" tone="muted" className={styles.value}>
              {Array.isArray(entry.value)
                ? (entry.value as readonly string[]).map((line, index) => (
                    <Fragment key={line}>
                      {index > 0 && <br />}
                      {line}
                    </Fragment>
                  ))
                : entry.value}
            </Text>
          </div>
        </Fragment>
      ))}
    </dl>
  );
}
