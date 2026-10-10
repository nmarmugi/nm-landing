import { useId } from "react";
import { Container } from "../../atoms/Container";
import { Text } from "../../atoms/Text";
import { SectionBar } from "../../molecules/SectionBar";
import { useI18n } from "../../../i18n";
import styles from "./AreaSection.module.css";

/**
 * Zona servita: Viareggio, Versilia e provincia di Lucca. È il testo che
 * collega il servizio al territorio, quello che le ricerche locali cercano.
 * Una sezione sola invece di una pagina per comune: pagine quasi identiche
 * con il nome della città cambiato Google le tratta come doorway page.
 */
export function AreaSection() {
  const { t } = useI18n();
  const titleId = useId();
  const zonesId = useId();

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <SectionBar id={titleId} label={t.area.title} />

      <Container gutter="inner" className={styles.body}>
        <div className={styles.text}>
          {t.area.paragraphs.map((paragraph) => (
            <Text key={paragraph.slice(0, 32)} variant="body" className={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </div>

        <div className={styles.zones}>
          <Text id={zonesId} variant="monoLabel" tone="accent">
            {t.area.zonesLabel}
          </Text>
          <ul className={styles.list} aria-labelledby={zonesId}>
            {t.area.zones.map((zone) => (
              <Text as="li" key={zone} variant="mono" tone="muted">
                {zone}
              </Text>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
