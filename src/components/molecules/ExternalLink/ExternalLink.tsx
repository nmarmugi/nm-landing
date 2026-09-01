import { Text } from "../../atoms/Text";
import { VisuallyHidden } from "../../atoms/VisuallyHidden";
import { useI18n } from "../../../i18n";
import { cx } from "../../../utils/cx";
import styles from "./ExternalLink.module.css";
import type { ExternalLinkProps } from "./ExternalLink.types";

/**
 * Link esterno. `rel="noopener noreferrer"` e avviso testuale sull'apertura in
 * una nuova scheda: un cambio di contesto va annunciato, non solo suggerito
 * dalla freccia ↗.
 */
export function ExternalLink({
  href,
  children,
  variant = "mono",
  className,
}: ExternalLinkProps) {
  const { t } = useI18n();

  return (
    <Text
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      tone="inherit"
      className={cx(styles.link, className)}
    >
      {children}
      <VisuallyHidden> ({t.common.externalLink})</VisuallyHidden>
    </Text>
  );
}
