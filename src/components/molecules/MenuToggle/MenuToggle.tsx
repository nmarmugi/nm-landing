import { Button } from "../../atoms/Button";
import type { MenuToggleProps } from "./MenuToggle.types";

/**
 * Pulsante MENU / CHIUDI. `aria-expanded` e `aria-controls` dicono agli screen
 * reader che cosa apre e in che stato si trova.
 */
export function MenuToggle({
  isOpen,
  onToggle,
  label,
  controls,
  ref,
  className,
}: MenuToggleProps) {
  return (
    <Button
      ref={ref}
      variant="outline"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={controls}
      className={className}
    >
      {label}
    </Button>
  );
}
