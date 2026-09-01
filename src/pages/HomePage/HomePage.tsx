import { useId } from "react";
import { Hero } from "../../components/organisms/Hero";
import { ProjectList } from "../../components/organisms/ProjectList";
import { ContactCta } from "../../components/organisms/ContactCta";
import { SECTION_IDS } from "../../hooks/useNavItems";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useI18n } from "../../i18n";
import { projects } from "../../data/projects";

/** Home: presentazione, lavori selezionati, invito a scrivere. */
export function HomePage() {
  const { t } = useI18n();
  const titleId = useId();

  useDocumentMeta(t.meta.title, t.meta.description);

  return (
    <>
      <Hero titleId={titleId} />
      <ProjectList projects={projects} id={SECTION_IDS.work} />
      <ContactCta email={t.contact.email} />
    </>
  );
}
