export interface ContactSocial {
  label: string;
  href: string;
}

export interface ContactDetailsProps {
  email: string;
  phone?: string;
  socials: readonly ContactSocial[];
  /** `full` recapiti + social (sezione contatti) · `compact` solo email e social (menu). */
  layout?: "full" | "compact";
  className?: string;
}
