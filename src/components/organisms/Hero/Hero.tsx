import { useRef } from "react";
import { Container } from "../../atoms/Container";
import { Text } from "../../atoms/Text";
import { MetaGroup } from "../../molecules/MetaGroup";
import { MOTION, MOTION_QUERIES, SplitText, gsap, useGSAP } from "../../../lib/gsap";
import { useI18n } from "../../../i18n";
import { cx } from "../../../utils/cx";
import styles from "./Hero.module.css";
import type { HeroProps } from "./Hero.types";

/**
 * Apertura della home.
 * Animazioni 1 e 2: caratteri del titolo che salgono dentro la maschera di riga
 * (SplitText, stagger 0.02), poi paragrafo e metadati in ritardo di 0.45s.
 * Il titolo è annunciato dal suo `aria-label`: i caratteri spezzati restano
 * fuori dall'albero di accessibilità, altrimenti verrebbero letti uno a uno.
 */
export function Hero({ titleId }: HeroProps) {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);

  const lines = t.home.heroLines;
  const firstMutedLine = lines.length - t.home.heroMutedLines;
  const fullTitle = lines.join(" ");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const lineElements = gsap.utils.toArray<HTMLElement>(`.${styles.line}`, root);
      const delayed = root.querySelectorAll<HTMLElement>("[data-hero-delayed]");
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES.motion, () => {
        // Le parole vanno spezzate anche in `words`: senza i contenitori di
        // parola il ritorno a capo cadrebbe fra due lettere qualsiasi.
        const split = SplitText.create(lineElements, {
          type: "words,chars",
          charsClass: "hero-char",
        });

        const timeline = gsap.timeline();
        timeline
          .from(split.chars, {
            yPercent: 120,
            duration: MOTION.duration.slow,
            ease: MOTION.ease.out,
            stagger: MOTION.stagger.chars,
          })
          .from(
            delayed,
            { y: 20, opacity: 0, duration: 0.7, ease: MOTION.ease.out, stagger: 0.08 },
            0.45,
          );

        return () => {
          timeline.kill();
          split.revert();
        };
      });

      mm.add(MOTION_QUERIES.reduced, () => {
        const tween = gsap.from([...lineElements, ...delayed], {
          opacity: 0,
          duration: MOTION.duration.reduced,
        });
        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [lines] },
  );

  return (
    <Container as="section" ref={rootRef} className={styles.hero}>
      <Text as="h1" id={titleId} variant="hero" className={styles.title} aria-label={fullTitle}>
        <span aria-hidden="true">
          {lines.map((line, index) => (
            <span key={line} className={styles.lineMask}>
              <span className={cx(styles.line, index >= firstMutedLine && styles.muted)}>
                {line}
              </span>
            </span>
          ))}
        </span>
      </Text>

      <div className={styles.meta}>
        <Text variant="body" className={styles.intro} data-hero-delayed>
          {t.home.intro}
        </Text>

        <div data-hero-delayed>
          <MetaGroup
            entries={[
              {
                key: "stack",
                label: t.home.metaStack.label,
                value: t.home.metaStack.value,
              },
              {
                key: "base",
                label: t.home.metaBase.label,
                value: t.home.metaBase.value,
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
