import { Button } from "../../atoms/Button";
import { Container } from "../../atoms/Container";
import { Text } from "../../atoms/Text";
import { useI18n } from "../../../i18n";
import styles from "./ContactCta.module.css";
import type { ContactCtaProps } from "./ContactCta.types";

/** Chiusura della home: una frase e un solo bottone. */
export function ContactCta({ email }: ContactCtaProps) {
  const { t } = useI18n();

  return (
    <Container as="section" className={styles.cta}>
      <Text as="h2" variant="ctaTitle">
        {t.home.ctaTitle}
      </Text>
      <Button as="a" href={`mailto:${email}`} variant="accent">
        {t.home.ctaButton}
      </Button>
    </Container>
  );
}
