import { useRef } from "react";
import { Text } from "../../atoms/Text";
import { VisuallyHidden } from "../../atoms/VisuallyHidden";
import { MOTION_QUERIES, ScrollTrigger, gsap, useGSAP } from "../../../lib/gsap";
import { useI18n } from "../../../i18n";
import { LANGUAGE_TAGS } from "../../../i18n/i18n.types";
import styles from "./MetricItem.module.css";
import type { MetricItemProps } from "./MetricItem.types";

/**
 * Numero di risultato con conteggio da zero all'ingresso in viewport
 * (animazione 8 dell'handoff).
 * Il numero visibile cambia decine di volte al secondo: viene tolto
 * dall'albero di accessibilità e sostituito dal valore finale, statico.
 */
export function MetricItem({ value, suffix = "", decimals = 0, label }: MetricItemProps) {
  const { lang } = useI18n();
  const valueRef = useRef<HTMLSpanElement>(null);

  const formatter = new Intl.NumberFormat(LANGUAGE_TAGS[lang], {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const finalText = `${formatter.format(value)}${suffix}`;

  useGSAP(
    () => {
      const element = valueRef.current;
      if (!element) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.motion, () => {
        const counter = { current: 0 };
        element.textContent = `${formatter.format(0)}${suffix}`;

        const tween = gsap.to(counter, {
          current: value,
          duration: 1.2,
          ease: "power2.out",
          snap: { current: decimals > 0 ? 0.1 : 1 },
          scrollTrigger: { trigger: element, start: "top 80%", once: true },
          onUpdate: () => {
            element.textContent = `${formatter.format(counter.current)}${suffix}`;
          },
          onComplete: () => {
            element.textContent = finalText;
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          element.textContent = finalText;
        };
      });

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { dependencies: [value, suffix, decimals, lang] },
  );

  return (
    <div className={styles.item}>
      <Text as="dt" variant="monoSmall" tone="muted" className={styles.label}>
        {label}
      </Text>
      <Text as="dd" variant="metric" tone="accent" className={styles.value}>
        <span ref={valueRef} aria-hidden="true">
          {finalText}
        </span>
        <VisuallyHidden>{finalText}</VisuallyHidden>
      </Text>
    </div>
  );
}
