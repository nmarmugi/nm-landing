import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "../../atoms/Logo";
import { Button } from "../../atoms/Button";
import { ContactDetails } from "../../molecules/ContactDetails";
import { LanguageSwitcher } from "../../molecules/LanguageSwitcher";
import { NavList } from "../../molecules/NavList";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { useScrollLock } from "../../../hooks/useScrollLock";
import { MOTION, MOTION_QUERIES, gsap, useGSAP } from "../../../lib/gsap";
import { useI18n } from "../../../i18n";
import { site } from "../../../data/site";
import { paths } from "../../../routes/routes";
import styles from "./MobileMenu.module.css";
import type { MobileMenuProps } from "./MobileMenu.types";

/**
 * Overlay di navigazione sotto i 768px: fondo neon a tutta pagina.
 * Accessibilità: è un dialogo modale con focus intrappolato, chiusura con Esc
 * e focus che torna al pulsante MENU alla chiusura.
 * Animazione 10: clipPath da `inset(0 0 100% 0)` a `inset(0)`, voci in stagger.
 */
export function MobileMenu({
  id,
  isOpen,
  onClose,
  items,
  activeKey,
}: MobileMenuProps) {
  const { t, lang } = useI18n();
  const overlayRef = useRef<HTMLDivElement>(null);
  // Resta montato durante l'animazione di uscita, poi sparisce dal DOM.
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setIsMounted(true);
  }, [isOpen]);

  useScrollLock(isOpen);
  useFocusTrap(overlayRef, isOpen && isMounted, onClose);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const panels = overlay.querySelectorAll<HTMLElement>(".menu-item");
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES.motion, () => {
        if (isOpen) {
          const timeline = gsap.timeline();
          timeline
            .fromTo(
              overlay,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: MOTION.duration.base,
                ease: MOTION.ease.inOut,
              },
            )
            .from(
              panels,
              {
                y: 40,
                opacity: 0,
                duration: 0.5,
                ease: MOTION.ease.out,
                stagger: MOTION.stagger.menu,
              },
              "-=0.25",
            );
          return () => timeline.kill();
        }

        const timeline = gsap.timeline({ onComplete: () => setIsMounted(false) });
        timeline.to(overlay, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.45,
          ease: MOTION.ease.inOut,
        });
        return () => timeline.kill();
      });

      // Movimento ridotto: solo una dissolvenza breve, nessun clip.
      mm.add(MOTION_QUERIES.reduced, () => {
        const tween = gsap.fromTo(
          overlay,
          { opacity: isOpen ? 0 : 1 },
          {
            opacity: isOpen ? 1 : 0,
            duration: MOTION.duration.reduced,
            onComplete: () => {
              if (!isOpen) setIsMounted(false);
            },
          },
        );
        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { dependencies: [isOpen, isMounted], scope: overlayRef },
  );

  if (!isMounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      id={id}
      className={`${styles.overlay} on-accent`}
      role="dialog"
      aria-modal="true"
      aria-label={t.common.menuLabel}
    >
      <div>
        <div className={styles.top}>
          <Logo
            initials={site.initials}
            href={paths.home(lang)}
            label={site.initials}
            onNavigate={onClose}
          />
          <Button variant="outline" onClick={onClose}>
            {t.common.closeMenu}
          </Button>
        </div>

        <NavList
          items={items}
          variant="overlay"
          label={t.common.mainNavLabel}
          activeKey={activeKey}
          onNavigate={onClose}
          className={styles.nav}
          itemClassName="menu-item"
        />
      </div>

      <div className={styles.foot}>
        <ContactDetails
          email={t.contact.email}
          socials={t.contact.socials}
          layout="compact"
        />
        <LanguageSwitcher onNavigate={onClose} />
      </div>
    </div>,
    document.body,
  );
}
