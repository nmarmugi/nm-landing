import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Quota del viewport a cui una sezione prende il posto della precedente.
 * È la stessa soglia dello ScrollTrigger dei contatti (`top 70%`): la voce di
 * nav si accende nello stesso istante in cui il blocco entra in scena.
 */
const ACTIVATION = 0.7;

/**
 * id della sezione che si sta leggendo. Serve alla nav per accendere la voce
 * giusta mentre si scorre: la rotta da sola non basta, perché "Chi sono" e
 * "Contatti" vivono nella stessa pagina.
 *
 * Vince l'ultima sezione che ha superato la linea di attivazione, così
 * scendendo si passa alla successiva e risalendo si torna alla precedente.
 * Gli id assenti dalla pagina corrente vengono ignorati.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const { pathname } = useLocation();
  const [active, setActive] = useState<string | null>(null);
  // Le dipendenze di un effetto si confrontano per identità: l'array di id
  // cambierebbe a ogni render.
  const idList = ids.join(",");

  useEffect(() => {
    const sections = idList
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      setActive(null);
      return;
    }

    let frame = 0;

    const read = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVATION;

      let current: HTMLElement | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section;
      }

      setActive(current ? current.id : null);
    };

    // Lo scroll emette molti più eventi dei frame disegnati: una lettura per
    // frame basta e evita layout thrashing.
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [idList, pathname]);

  return active;
}
