import { useMemo } from "react";
import { useI18n } from "../i18n";
import { paths } from "../routes/routes";
import type { NavItem } from "../components/molecules/NavList";

/** id delle sezioni bersaglio degli ancoraggi. Uguali in tutte le lingue. */
export const SECTION_IDS = {
  work: "work",
  about: "about",
  contact: "contact",
  main: "main",
} as const;

/** Voci di navigazione tradotte e già puntate ai percorsi della lingua attiva. */
export function useNavItems(): readonly NavItem[] {
  const { lang, t } = useI18n();

  return useMemo(
    () => [
      { key: "work", label: t.nav.work, to: `${paths.home(lang)}#${SECTION_IDS.work}` },
      { key: "about", label: t.nav.about, to: paths.about(lang) },
      {
        key: "contact",
        label: t.nav.contact,
        to: `${paths.about(lang)}#${SECTION_IDS.contact}`,
      },
    ],
    [lang, t],
  );
}
