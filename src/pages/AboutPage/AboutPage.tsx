import { useId } from "react";
import { AboutSection } from "../../components/organisms/AboutSection";
import { ContactSection } from "../../components/organisms/ContactSection";
import { SECTION_IDS } from "../../hooks/useNavItems";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useI18n } from "../../i18n";
import { paths } from "../../routes/routes";

/** "Chi sono" e "Contatti" vivono nella stessa pagina, come nel design. */
export function AboutPage() {
  const { t, lang } = useI18n();
  const aboutTitleId = useId();
  const contactTitleId = useId();

  useDocumentMeta(`${t.nav.about} · ${t.meta.title}`, t.about.paragraphs[0], {
    canonical: paths.about(lang),
    alternates: { it: paths.about("it"), en: paths.about("en") },
  });

  return (
    <>
      <AboutSection
        id={SECTION_IDS.about}
        titleId={aboutTitleId}
        headingLevel="h1"
      />
      <ContactSection id={SECTION_IDS.contact} titleId={contactTitleId} />
    </>
  );
}
