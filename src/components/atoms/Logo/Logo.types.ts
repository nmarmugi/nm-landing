export interface LogoProps {
  /** Sigla mostrata (default "NM"). */
  initials?: string;
  /** Destinazione: se assente la sigla non è un link (utile nell'header della home). */
  href?: string;
  /** Etichetta accessibile del link, es. "NM · torna alla home". */
  label?: string;
  /** Chiamata dopo il click: usata dal menu mobile per chiudersi. */
  onNavigate?: () => void;
  className?: string;
}
