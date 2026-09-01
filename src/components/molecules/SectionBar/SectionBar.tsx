import { Container } from "../../atoms/Container";
import { Text } from "../../atoms/Text";
import { cx } from "../../../utils/cx";
import styles from "./SectionBar.module.css";
import type { SectionBarProps } from "./SectionBar.types";

/**
 * Barra di sezione fra due filetti. Il titolo è un `h2` reale: visivamente è
 * un'etichetta mono, ma nella struttura del documento apre la sezione.
 */
export function SectionBar({ label, meta, id, className }: SectionBarProps) {
  return (
    <Container className={cx(styles.bar, className)}>
      <Text as="h2" id={id} variant="monoLabel" tone="soft">
        {label}
      </Text>
      {meta ? (
        <Text as="span" variant="monoLabel" tone="soft" aria-hidden="true">
          {meta}
        </Text>
      ) : null}
    </Container>
  );
}
