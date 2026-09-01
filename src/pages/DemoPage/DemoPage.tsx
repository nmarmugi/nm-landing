import { Navigate, useParams } from "react-router-dom";
import { demos } from "../../demos";
import { paths } from "../../routes/routes";
import type { DemoPageProps } from "./DemoPage.types";

/**
 * Contenitore delle landing dimostrative. Sta fuori da `SiteLayout` di
 * proposito: una demo deve sembrare il sito del cliente, senza l'header del
 * portfolio sopra. Slug sconosciuto: si torna alla home.
 */
export function DemoPage({ lang }: DemoPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const Demo = slug ? demos[slug] : undefined;

  if (!Demo) return <Navigate to={paths.home(lang)} replace />;

  return <Demo />;
}
