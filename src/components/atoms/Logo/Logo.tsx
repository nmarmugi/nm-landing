import { Link } from "react-router-dom";
import { cx } from "../../../utils/cx";
import styles from "./Logo.module.css";
import type { LogoProps } from "./Logo.types";

/** Sigla del sito. Diventa link solo quando `href` è passato. */
export function Logo({
  initials = "NM",
  href,
  label,
  onNavigate,
  className,
}: LogoProps) {
  if (!href) {
    return <span className={cx(styles.logo, className)}>{initials}</span>;
  }

  return (
    <Link
      className={cx(styles.logo, className)}
      to={href}
      aria-label={label ?? initials}
      onClick={onNavigate}
    >
      {initials}
    </Link>
  );
}
