import { Fragment } from "react";
import { ExternalLink } from "../ExternalLink";
import { Text } from "../../atoms/Text";
import { cx } from "../../../utils/cx";
import styles from "./ContactDetails.module.css";
import type { ContactDetailsProps } from "./ContactDetails.types";

/**
 * Recapiti. Email e telefono sono link `mailto:` / `tel:`: su mobile partono
 * direttamente, e restano leggibili come testo altrove.
 */
export function ContactDetails({
  email,
  phone,
  socials,
  layout = "full",
  className,
}: ContactDetailsProps) {
  const isCompact = layout === "compact";

  return (
    <ul className={cx(styles.details, styles[layout], className)}>
      <li>
        <Text
          as="a"
          href={`mailto:${email}`}
          variant={isCompact ? "mono" : "monoSmall"}
          tone="inherit"
          className={styles.link}
        >
          {email}
        </Text>
      </li>

      {phone && !isCompact ? (
        <li>
          <Text
            as="a"
            href={`tel:${phone.replace(/\s/g, "")}`}
            variant="monoSmall"
            tone="inherit"
            className={styles.link}
          >
            {phone}
          </Text>
        </li>
      ) : null}

      {isCompact ? (
        <li className={styles.socials}>
          {socials.map((social, index) => (
            <Fragment key={social.href}>
              {index > 0 && (
                <span className={styles.separator} aria-hidden="true">
                  ·
                </span>
              )}
              <ExternalLink href={social.href} className={styles.link}>
                {`${social.label} ↗`}
              </ExternalLink>
            </Fragment>
          ))}
        </li>
      ) : (
        socials.map((social, index) => (
          <li key={social.href} className={index === 0 ? styles.spaced : undefined}>
            <ExternalLink
              href={social.href}
              variant="monoSmall"
              className={styles.link}
            >
              {`${social.label} ↗`}
            </ExternalLink>
          </li>
        ))
      )}
    </ul>
  );
}
