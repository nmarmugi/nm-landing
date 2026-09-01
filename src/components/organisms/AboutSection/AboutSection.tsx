import { useRef } from "react";
import { Container } from "../../atoms/Container";
import { MediaSlot } from "../../atoms/MediaSlot";
import { Text } from "../../atoms/Text";
import { AwardList } from "../../molecules/AwardList";
import { MOTION, MOTION_QUERIES, gsap, useGSAP } from "../../../lib/gsap";
import { useI18n } from "../../../i18n";
import styles from "./AboutSection.module.css";
import type { AboutSectionProps } from "./AboutSection.types";

/** Blocco "Chi sono": testo a sinistra, ritratto e riconoscimenti a destra. */
export function AboutSection({
  id,
  titleId,
  headingLevel = "h2",
}: AboutSectionProps) {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const blocks = root.querySelectorAll<HTMLElement>("[data-about-block]");
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES.motion, () => {
        const tween = gsap.from(blocks, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: MOTION.ease.out,
          stagger: 0.1,
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
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
      className={styles.section}
      aria-labelledby={titleId}
    >
      <div className={styles.text} data-about-block>
        <Text variant="monoLabel" tone="accent" className={styles.label}>
          {t.about.label}
        </Text>

        <Text
          as={headingLevel}
          id={titleId}
          variant="aboutTitle"
          className={styles.title}
        >
          {t.about.titleLines.map((line) => (
            <span key={line} className={styles.line}>
              {line}{" "}
            </span>
          ))}
        </Text>

        {t.about.paragraphs.map((paragraph) => (
          <Text
            key={paragraph.slice(0, 32)}
            variant="body"
            tone="inherit"
            className={styles.paragraph}
          >
            {paragraph}
          </Text>
        ))}
      </div>

      <div className={styles.side} data-about-block>
        <MediaSlot
          src="/media/nicola-marmugi-ritratto.jpg"
          alt={t.about.portraitAlt}
          caption={t.about.portraitCaption}
          loading="eager"
          className={styles.portrait}
        />
        <AwardList
          label={t.about.awardsLabel}
          items={t.about.awards}
          headingLevel={headingLevel === "h1" ? "h2" : "h3"}
        />
      </div>
    </Container>
  );
}
