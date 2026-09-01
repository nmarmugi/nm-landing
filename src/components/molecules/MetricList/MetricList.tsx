import { MetricItem } from "../MetricItem";
import { useI18n } from "../../../i18n";
import { cx } from "../../../utils/cx";
import styles from "./MetricList.module.css";
import type { MetricListProps } from "./MetricList.types";

/** Riga dei risultati del progetto, sopra un filetto. */
export function MetricList({ metrics, className }: MetricListProps) {
  const { lang } = useI18n();

  return (
    <dl className={cx(styles.list, className)}>
      {metrics.map((metric) => (
        <MetricItem
          key={metric.label.en}
          value={metric.value}
          suffix={metric.suffix}
          decimals={metric.decimals}
          label={metric.label[lang]}
        />
      ))}
    </dl>
  );
}
