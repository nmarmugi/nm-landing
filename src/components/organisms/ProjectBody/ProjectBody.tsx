import { Container } from "../../atoms/Container";
import { MediaSlot } from "../../atoms/MediaSlot";
import { Text } from "../../atoms/Text";
import { MetricList } from "../../molecules/MetricList";
import { useI18n } from "../../../i18n";
import { cx } from "../../../utils/cx";
import styles from "./ProjectBody.module.css";
import type { ProjectBodyProps } from "./ProjectBody.types";

/** Corpo del case study: colonna di testo più due dettagli in colonna. */
export function ProjectBody({ project }: ProjectBodyProps) {
  const { t, lang, format } = useI18n();

  return (
    <Container gutter="inner" className={styles.body}>
      <div className={styles.text}>
        {project.paragraphs[lang].map((paragraph, index) => (
          <Text
            key={paragraph.slice(0, 32)}
            variant="bodyLg"
            tone="inherit"
            className={cx(
              styles.paragraph,
              index === 0 ? styles.primary : styles.secondary,
            )}
          >
            {paragraph}
          </Text>
        ))}

        <MetricList metrics={project.metrics} className={styles.metrics} />
      </div>

      <div className={styles.details}>
        {project.details.map((detail, index) => (
          <MediaSlot
            key={detail.alt.en}
            src={detail.src}
            fit={detail.fit}
            alt={detail.alt[lang]}
            caption={format(t.project.detailCaption, { index: index + 1 })}
            className={styles.detail}
          />
        ))}
      </div>
    </Container>
  );
}
