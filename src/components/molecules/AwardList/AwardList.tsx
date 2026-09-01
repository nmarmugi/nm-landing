import { useId } from "react";
import { Text } from "../../atoms/Text";
import { cx } from "../../../utils/cx";
import styles from "./AwardList.module.css";
import type { AwardListProps } from "./AwardList.types";

/** Elenco dei riconoscimenti, con l'intestazione collegata alla lista. */
export function AwardList({
  label,
  items,
  headingLevel = "h3",
  className,
}: AwardListProps) {
  const labelId = useId();

  return (
    <div className={cx(styles.wrapper, className)}>
      <Text as={headingLevel} id={labelId} variant="mono" className={styles.label}>
        {label}
      </Text>
      <ul className={styles.list} aria-labelledby={labelId}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
