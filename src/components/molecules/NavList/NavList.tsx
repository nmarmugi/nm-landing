import { Link, NavLink } from "react-router-dom";
import { Text } from "../../atoms/Text";
import { cx } from "../../../utils/cx";
import styles from "./NavList.module.css";
import type { NavListProps } from "./NavList.types";

/**
 * Navigazione riutilizzabile: stessa lista di voci nell'header e nell'overlay,
 * cambia solo la variante. `aria-current="page"` arriva da `NavLink`.
 */
export function NavList({
  items,
  variant = "bar",
  label,
  activeKey,
  onNavigate,
  className,
  itemClassName,
}: NavListProps) {
  // `undefined` = nessuno scroll-spy: si torna al comportamento per rotta.
  const isSpy = activeKey !== undefined;

  return (
    <nav aria-label={label} className={className}>
      <ul className={cx(styles.list, styles[variant])}>
        {items.map((item) => {
          // Le voci che puntano a un'ancora dentro una pagina non sono "la
          // pagina corrente": userebbero `aria-current` due volte sulla stessa
          // rotta. Restano link semplici.
          const isAnchor = item.to.includes("#");
          const useNavLink = !isSpy && !isAnchor;

          return (
            <li key={item.key} className={itemClassName}>
              <Text
                as={useNavLink ? NavLink : Link}
                to={item.to}
                {...(useNavLink ? { end: true } : {})}
                {...(isSpy && item.key === activeKey
                  ? // "location" e non "page": la voce indica un punto della
                    // pagina corrente, non un'altra pagina.
                    { "aria-current": "location" as const }
                  : {})}
                onClick={onNavigate}
                variant={variant === "overlay" ? "menuItem" : "mono"}
                tone="inherit"
                className={styles.link}
              >
                {item.label}
              </Text>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
