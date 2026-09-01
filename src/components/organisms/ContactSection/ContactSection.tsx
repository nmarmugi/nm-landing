import { useRef } from "react";
import { Container } from "../../atoms/Container";
import { Text } from "../../atoms/Text";
import { ContactDetails } from "../../molecules/ContactDetails";
import { MOTION_QUERIES, gsap, useGSAP } from "../../../lib/gsap";
import { useI18n } from "../../../i18n";
import styles from "./ContactSection.module.css";
import type { ContactSectionProps } from "./ContactSection.types";

/**
 * Sezione contatti: l'unico blocco in cui l'accento riempie lo schermo.
 * Animazione 9: entrando in viewport (top 70%) il fondo passa da scuro a neon
 * e il testo da chiaro a scuro, in 0.6s. Uscendo dall'alto l'animazione si
 * riavvolge, così tornando in cima la pagina è com'era all'inizio.
 * Lo stato finale è quello dichiarato in CSS: senza JS la sezione è già neon.
 */
export function ContactSection({ id, titleId }: ContactSectionProps) {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const background = backgroundRef.current;
      if (!root || !background) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.motion, () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            // Risalendo, la sezione torna scura ripercorrendo la stessa
            // animazione al contrario: stessa durata, stessa curva.
            toggleActions: "play none none reverse",
          },
        });

        timeline
          .from(background, { scaleY: 0, duration: 0.6, ease: "power3.inOut" })
          .from(root, { color: "#f2f2ef", duration: 0.6, ease: "none" }, 0);

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <Container
      as="section"
      gutter="inner"
      id={id}
      ref={rootRef}
      className={`${styles.section} on-accent`}
      aria-labelledby={titleId}
    >
      <div ref={backgroundRef} className={styles.background} aria-hidden="true" />

      <div className={styles.content}>
        <div>
          <Text variant="monoLabel" tone="inherit" className={styles.label}>
            {t.contact.label}
          </Text>
          <Text as="h2" id={titleId} variant="sectionTitle" tone="inherit">
            {t.contact.titleLines.map((line) => (
              <span key={line} className={styles.line}>
                {line}{" "}
              </span>
            ))}
          </Text>
        </div>

        <ContactDetails
          email={t.contact.email}
          phone={t.contact.phone}
          socials={t.contact.socials}
        />
      </div>
    </Container>
  );
}
