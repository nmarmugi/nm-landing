import type { NavItem } from "../../molecules/NavList";

export interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  items: readonly NavItem[];
  /** Chiave della voce da segnare come corrente: arriva dallo scroll-spy. */
  activeKey?: string | null;
}
