import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/templates/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProjectPage } from "./pages/ProjectPage";
import { DemoPage } from "./pages/DemoPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useRouteScroll } from "./hooks/useRouteScroll";
import { LANGUAGES } from "./i18n/i18n.types";
import { DEMO_SEGMENT, ROUTE_SEGMENTS, detectLanguage } from "./routes/routes";

/**
 * Un albero di rotte per lingua, con segmenti localizzati:
 * `/it/lavori/mare-sedici` e `/en/work/mare-sedici` sono la stessa pagina.
 * La radice reindirizza alla lingua del browser, o all'ultima scelta.
 */
export function App() {
  const preferred = detectLanguage();

  // Sta qui e non in SiteLayout perché le landing dimostrative vivono fuori da
  // quel contenitore: lì dentro non sarebbe mai stato eseguito, e le demo si
  // aprivano nel punto in cui il browser le lasciava.
  useRouteScroll();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${preferred}`} replace />} />

      {/* Le landing dimostrative stanno fuori da SiteLayout: sono mini siti a sé,
          senza l'header e le transizioni del portfolio. */}
      {LANGUAGES.map((lang) => (
        <Route
          key={`${lang}-demo`}
          path={`${lang}/${DEMO_SEGMENT}/:slug`}
          element={<DemoPage lang={lang} />}
        />
      ))}

      {LANGUAGES.map((lang) => (
        <Route key={lang} path={lang} element={<SiteLayout lang={lang} />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTE_SEGMENTS[lang].about} element={<AboutPage />} />
          <Route
            path={`${ROUTE_SEGMENTS[lang].work}/:slug`}
            element={<ProjectPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      ))}

      <Route path="*" element={<Navigate to={`/${preferred}`} replace />} />
    </Routes>
  );
}
