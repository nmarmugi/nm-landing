export interface NavItem {
  /** Chiave stabile, indipendente dalla lingua. */
  key: string;
  label: string;
  /** Percorso già localizzato, eventualmente con hash. */
  to: string;
}

export interface NavListProps {
  items: readonly NavItem[];
  /** `bar` riga mono dell'header · `overlay` voci grandi del menu mobile. */
  variant?: "bar" | "overlay";
  /** Etichetta del landmark `nav`. */
  label: string;
  /**
   * Chiave della voce da accendere. Se passata (anche `null`) decide lo scroll
   * e non la rotta: nessuna voce usa più `NavLink`.
   */
  activeKey?: string | null;
  /** Chiamata dopo il click: usata dal menu per chiudersi. */
  onNavigate?: () => void;
  className?: string;
  /** Classe applicata a ogni voce, per agganciare le animazioni di stagger. */
  itemClassName?: string;
}
