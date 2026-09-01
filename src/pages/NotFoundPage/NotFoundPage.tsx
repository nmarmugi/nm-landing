import { Link } from "react-router-dom";
import { Button } from "../../components/atoms/Button";
import { Container } from "../../components/atoms/Container";
import { Text } from "../../components/atoms/Text";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useI18n } from "../../i18n";
import { paths } from "../../routes/routes";
import styles from "./NotFoundPage.module.css";

/** 404 nella lingua corrente. */
export function NotFoundPage() {
  const { t, lang } = useI18n();

  useDocumentMeta(`${t.notFound.title} · ${t.meta.title}`, undefined, {
    noindex: true,
  });

  return (
    <Container className={styles.page}>
      <Text as="h1" variant="aboutTitle">
        {t.notFound.title}
      </Text>
      <Text variant="body" tone="body">
        {t.notFound.body}
      </Text>
      <Button as={Link} to={paths.home(lang)} variant="accent">
        {t.notFound.cta}
      </Button>
    </Container>
  );
}
