import { useId } from "react";
import { AboutSection } from "../../components/organisms/AboutSection";
import { ContactSection } from "../../components/organisms/ContactSection";
import { SECTION_IDS } from "../../hooks/useNavItems";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useI18n } from "../../i18n";
import { aboutMeta } from "../../data/seo";

/** "Chi sono" e "Contatti" vivono nella stessa pagina, come nel design. */
export function AboutPage() {
  const { lang } = useI18n();
  const aboutTitleId = useId();
  const contactTitleId = useId();

  const meta = aboutMeta(lang);
  useDocumentMeta(meta.title, meta.description, meta);

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
