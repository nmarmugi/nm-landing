import { useId } from "react";
import { Hero } from "../../components/organisms/Hero";
import { ProjectList } from "../../components/organisms/ProjectList";
import { ContactCta } from "../../components/organisms/ContactCta";
import { AreaSection } from "../../components/organisms/AreaSection";
import { SECTION_IDS } from "../../hooks/useNavItems";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useI18n } from "../../i18n";
import { projects } from "../../data/projects";
import { homeMeta } from "../../data/seo";

/** Home: presentazione, lavori selezionati, zona servita, invito a scrivere. */
export function HomePage() {
  const { t, lang } = useI18n();
  const titleId = useId();

  const meta = homeMeta(lang);
  useDocumentMeta(meta.title, meta.description, meta);

  return (
    <>
      <Hero titleId={titleId} />
      <ProjectList projects={projects} id={SECTION_IDS.work} />
      <AreaSection />
      <ContactCta email={t.contact.email} />
    </>
  );
}
