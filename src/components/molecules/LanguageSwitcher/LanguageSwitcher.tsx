import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Text } from "../../atoms/Text";
import { VisuallyHidden } from "../../atoms/VisuallyHidden";
import { useI18n } from "../../../i18n";
import { LANGUAGES, LANGUAGE_LABELS, LANGUAGE_TAGS } from "../../../i18n/i18n.types";
import { translatePath } from "../../../routes/routes";
import { cx } from "../../../utils/cx";
import styles from "./LanguageSwitcher.module.css";
import type { LanguageSwitcherProps } from "./LanguageSwitcher.types";

/**
 * Cambio lingua. Mantiene la pagina corrente traducendo il percorso
 * (`/it/lavori/mare-sedici` → `/en/work/mare-sedici`), così l'utente non
 * viene rispedito alla home.
 */
export function LanguageSwitcher({ onNavigate, className }: LanguageSwitcherProps) {
  const { lang, t, format } = useI18n();
  const { pathname } = useLocation();

  return (
    <div
      className={cx(styles.switcher, className)}
      role="group"
      aria-label={t.common.languageSwitchLabel}
    >
      {LANGUAGES.map((code, position) => {
        const isActive = code === lang;
        return (
          <Fragment key={code}>
            {position > 0 && (
              <Text as="span" variant="monoSmall" tone="inherit" className={styles.separator} aria-hidden="true">
                /
              </Text>
            )}
            <Text
              as={Link}
              to={translatePath(pathname, code)}
              hrefLang={LANGUAGE_TAGS[code]}
              lang={LANGUAGE_TAGS[code]}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              variant="monoSmall"
              tone="inherit"
              className={cx(styles.option, isActive && styles.active)}
            >
              {code}
              <VisuallyHidden>
                {" "}
                {format(t.common.switchTo, { language: LANGUAGE_LABELS[code] })}
              </VisuallyHidden>
            </Text>
          </Fragment>
        );
      })}
    </div>
  );
}
