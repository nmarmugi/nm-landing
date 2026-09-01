import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LiveRegion } from "../../atoms/LiveRegion";
import { SkipLink } from "../../atoms/SkipLink";
import { Header } from "../../organisms/Header";
import { PageTransition } from "../../organisms/PageTransition";
import { TitleTransitionProvider } from "../../../context/TitleTransitionContext";
import { I18nProvider, useI18n } from "../../../i18n";
import { SECTION_IDS } from "../../../hooks/useNavItems";
import styles from "./SiteLayout.module.css";
import type { SiteLayoutProps } from "./SiteLayout.types";

/** Struttura comune a tutte le pagine: intestazione, contenuto, velo di transizione. */
function LayoutShell() {
  const { t, format } = useI18n();
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  // Confronto sul percorso, non un flag "primo render": in StrictMode gli
  // effetti girano due volte al montaggio e un flag scatterebbe a vuoto.
  const previousPath = useRef(pathname);
  const [announcement, setAnnouncement] = useState("");

  // Cambio pagina in una SPA: niente ricaricamento, quindi nessun annuncio
  // automatico. Il focus torna al contenuto e la regione live legge il titolo.
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    // Lo scroll lo gestisce `useRouteScroll` in App: il focus non deve spostarlo.
    mainRef.current?.focus({ preventScroll: true });
    setAnnouncement(format(t.meta.routeAnnouncement, { page: document.title }));
  }, [pathname, format, t]);

  return (
    <div className={styles.shell}>
      <SkipLink targetId={SECTION_IDS.main}>{t.common.skipToContent}</SkipLink>
      <Header />

      <main id={SECTION_IDS.main} ref={mainRef} tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>

      <PageTransition pathname={pathname} />
      <LiveRegion message={announcement} />
    </div>
  );
}

/** Radice di una sezione di rotta: fissa la lingua per tutto ciò che sta sotto. */
export function SiteLayout({ lang }: SiteLayoutProps) {
  return (
    <I18nProvider lang={lang}>
      <TitleTransitionProvider>
        <LayoutShell />
      </TitleTransitionProvider>
    </I18nProvider>
  );
}
