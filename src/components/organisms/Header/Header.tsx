import { useCallback, useEffect, useId, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "../../atoms/Container";
import { Logo } from "../../atoms/Logo";
import { LanguageSwitcher } from "../../molecules/LanguageSwitcher";
import { MenuToggle } from "../../molecules/MenuToggle";
import { NavList } from "../../molecules/NavList";
import { MobileMenu } from "../MobileMenu";
import { SECTION_IDS, useNavItems } from "../../../hooks/useNavItems";
import { useActiveSection } from "../../../hooks/useActiveSection";
import { useSectionHash } from "../../../hooks/useSectionHash";
import { useI18n } from "../../../i18n";
import { site } from "../../../data/site";
import { paths } from "../../../routes/routes";
import styles from "./Header.module.css";

/** Sezioni osservate dallo scroll-spy: gli id coincidono con le chiavi della nav. */
const SPY_SECTIONS = [SECTION_IDS.work, SECTION_IDS.about, SECTION_IDS.contact];

/**
 * Sezioni che nell'URL sono un'ancora. "Chi sono" no: è la pagina stessa,
 * quindi in cima l'indirizzo resta pulito.
 */
const HASH_SECTIONS: readonly string[] = [SECTION_IDS.work, SECTION_IDS.contact];

/**
 * Intestazione del sito. Da 768px in su mostra la nav; sotto, la nav lascia il
 * posto al pulsante MENU e all'overlay a tutta pagina.
 */
export function Header() {
  const { t, lang } = useI18n();
  const items = useNavItems();
  const menuId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const activeSection = useActiveSection(SPY_SECTIONS);

  useSectionHash(
    activeSection && HASH_SECTIONS.includes(activeSection) ? `#${activeSection}` : null,
  );

  // Cambio pagina da un link dell'overlay: il menu non deve restare aperto.
  useEffect(() => setIsMenuOpen(false), [pathname]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <Container as="header" className={styles.header}>
        <Logo
          initials={site.initials}
          href={paths.home(lang)}
          label={`${site.initials} · ${t.nav.work}`}
        />

        <NavList
          items={items}
          label={t.common.mainNavLabel}
          activeKey={activeSection}
          className={styles.nav}
        />

        <div className={styles.side}>
          <LanguageSwitcher />

          <MenuToggle
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen((open) => !open)}
            label={isMenuOpen ? t.common.closeMenu : t.common.openMenu}
            controls={menuId}
            className={styles.toggle}
          />
        </div>
      </Container>

      <MobileMenu
        id={menuId}
        isOpen={isMenuOpen}
        onClose={closeMenu}
        items={items}
        activeKey={activeSection}
      />
    </>
  );
}
