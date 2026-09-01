import { useRef } from "react";
import { Link } from "react-router-dom";
import { ScrollTrigger, gsap, useGSAP } from "../../lib/gsap";
import { ClockIcon, PhoneIcon, PinIcon } from "../shared/icons";
import { useCallBarReveal } from "../shared/useCallBarReveal";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { paths } from "../../routes/routes";
import styles from "./GelateriaBruni.module.css";

const TITLE_LINES = ["Gelato", "fatto qui,", "ogni giorno."];

/**
 * I gusti tingono la pagina: `tint` è il fondo che prende la pagina quando la
 * scheda entra in scena, `dot` il colore della pallina.
 */
const FLAVOURS = [
  {
    name: "Pistacchio di Bronte",
    dot: "#6f9c53",
    tint: "#eef3e6",
    note: "Solo pistacchi, zucchero e un pizzico di sale. Niente pasta pronta, per questo è grigio e non verde acceso.",
  },
  {
    name: "Amarena e panna",
    dot: "#b8203f",
    tint: "#fbeaec",
    note: "Le amarene le mette sotto spirito la mamma a luglio, in barattoli da tre chili.",
  },
  {
    name: "Cioccolato d'acqua",
    dot: "#5a3620",
    tint: "#f3ebe4",
    note: "Senza latte: si sente solo il cacao. È il gusto che comprano quasi tutti i nonni.",
  },
  {
    name: "Crema del Bruni",
    dot: "#e8b33d",
    tint: "#fdf3df",
    note: "Uova del Cerruglio e limone grattugiato al momento. La ricetta è del 1972 e non l'abbiamo toccata.",
  },
];

const HOW = [
  {
    title: "Latte a venti chilometri",
    text: "Arriva ogni due giorni dalla stalla dei Grandi, a Porcari. Se non arriva, quel giorno facciamo solo sorbetti.",
    dark: false,
  },
  {
    title: "Niente basi pronte",
    text: "Nessun preparato in polvere, nessun colorante. Il pistacchio è grigio e la menta è bianca: è così che devono essere.",
    dark: true,
  },
  {
    title: "Vaschette piccole",
    text: "Mantechiamo tre volte al giorno invece di riempire i pozzetti la mattina. Costa più tempo, ma il gelato non si stanca.",
    dark: false,
  },
];

const TUBS = [
  { name: "Vaschetta 500 g", price: "12,00" },
  { name: "Vaschetta 750 g", price: "17,00" },
  { name: "Vaschetta 1 kg", price: "22,00" },
  { name: "Torta gelato, 8 fette", price: "32,00" },
];

/**
 * Landing dimostrativa per una gelateria artigianale di famiglia.
 *
 * Qui non si prenota un tavolo: le azioni sono venire al banco e ordinare una
 * vaschetta per telefono, quindi la pagina spinge su orari, indirizzo e
 * numero. Il gesto distintivo è il fondo che si tinge del gusto che stai
 * leggendo: racconta il banco senza una sola fotografia.
 */
export function GelateriaBruni() {
  const rootRef = useRef<HTMLDivElement>(null);
  const callBarRef = useRef<HTMLDivElement>(null);

  useDocumentMeta(
    "Gelateria Bruni · Gelato artigianale a Lucca",
    "Gelateria di famiglia dal 1972. Latte di Porcari, niente basi pronte, vaschette e torte gelato su ordinazione allo 0583 000072.",
  );

  // Movimento della barra di chiamata: identico in tutte le demo.
  useCallBarReveal(rootRef, callBarRef);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .from(q("[data-title-line] > span"), {
            yPercent: 105,
            duration: 0.7,
            stagger: 0.08,
          })
          .from(q("[data-intro]"), { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 }, 0.25)
          .from(
            q("[data-scoop]"),
            { scale: 0, duration: 0.7, ease: "back.out(1.6)", stagger: 0.1 },
            0.15,
          );

        // Il fondo della pagina prende il colore del gusto che si sta leggendo.
        // Si anima la variabile CSS, non le regole: un solo valore da cambiare.
        const tints = q("[data-tint]").map((card) => {
          const tint = card.dataset.tint ?? "#fdf6ec";
          return ScrollTrigger.create({
            trigger: card,
            start: "top 62%",
            end: "bottom 38%",
            onToggle: (self) => {
              if (!self.isActive) return;
              gsap.to(root, { "--gb-bg": tint, duration: 0.6, ease: "power2.out" });
            },
          });
        });

        // Tornando sopra la lista dei gusti si recupera il colore di partenza.
        const resetTint = ScrollTrigger.create({
          trigger: q("[data-flavours]")[0],
          start: "top bottom",
          onLeaveBack: () => {
            gsap.to(root, { "--gb-bg": "#fdf6ec", duration: 0.6, ease: "power2.out" });
          },
        });

        const cards = gsap.from(q("[data-cards] > *"), {
          opacity: 0,
          scale: 0.94,
          y: 18,
          duration: 0.45,
          ease: "back.out(1.4)",
          stagger: { each: 0.07, from: "start", grid: "auto" },
          scrollTrigger: { trigger: q("[data-cards]")[0], start: "top 84%", once: true },
        });

        const reveals = q("[data-reveal]").map((element) =>
          gsap.from(element, {
            opacity: 0,
            y: 14,
            duration: 0.4,
            ease: "power1.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }),
        );


        return () => {
          intro.kill();
          cards.scrollTrigger?.kill();
          cards.kill();
          resetTint.kill();
          for (const trigger of tints) trigger.kill();
          for (const tween of reveals) {
            tween.scrollTrigger?.kill();
            tween.kill();
          }
        };
      });

      // Pulsante magnetico: solo dove c'è un puntatore vero, quindi mai sul
      // tocco, dove non esiste il passaggio del mouse.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const phone = q("[data-magnetic]")[0] as HTMLElement | undefined;
          if (!phone) return;

          const moveX = gsap.quickTo(phone, "x", { duration: 0.4, ease: "power3" });
          const moveY = gsap.quickTo(phone, "y", { duration: 0.4, ease: "power3" });

          const onMove = (event: MouseEvent) => {
            const box = phone.getBoundingClientRect();
            moveX((event.clientX - (box.left + box.width / 2)) * 0.25);
            moveY((event.clientY - (box.top + box.height / 2)) * 0.35);
          };
          const onLeave = () => {
            moveX(0);
            moveY(0);
          };

          phone.addEventListener("mousemove", onMove);
          phone.addEventListener("mouseleave", onLeave);

          return () => {
            phone.removeEventListener("mousemove", onMove);
            phone.removeEventListener("mouseleave", onLeave);
            gsap.set(phone, { clearProps: "transform" });
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div className={styles.page} ref={rootRef} lang="it">
      <header className={styles.bar}>
        <div className={`${styles.inner} ${styles.barInner}`}>
          <span className={styles.brand}>Bruni</span>

          <nav className={styles.barNav} aria-label="Navigazione della pagina">
            <a href="#gusti">I gusti</a>
            <a href="#come">Come lo facciamo</a>
            <a href="#vaschette">Vaschette</a>
          </nav>

          <a className={styles.pillButton} href="tel:+390583000072">
            <PhoneIcon className={styles.icon} />
            0583 000072
          </a>
        </div>
      </header>

      <main>
        <section className={`${styles.inner} ${styles.hero}`} data-hero>
          <div>
            <p className={`${styles.eyebrow} ${styles.label}`} data-intro>
              Lucca · via Fillungo · dal 1972
            </p>

            <h1 className={styles.title}>
              {TITLE_LINES.map((line) => (
                <span key={line} className={styles.titleLine} data-title-line>
                  <span>{line}</span>
                </span>
              ))}
            </h1>

            <p className={styles.lead} data-intro>
              Mantechiamo tre volte al giorno in un laboratorio di quindici metri
              quadri, dietro il banco. Dodici gusti fissi e quattro che cambiano con la
              frutta di stagione.
            </p>

            <div className={styles.actions} data-intro>
              <a className={styles.pillButton} href="#vaschette">
                Ordina una vaschetta
              </a>
              <a className={styles.textLink} href="#gusti">
                Guarda i gusti di oggi
              </a>
            </div>

            <p className={styles.heroNote} data-intro>
              <ClockIcon className={styles.icon} />
              Aperti tutti i giorni fino a mezzanotte, da marzo a ottobre.
            </p>
          </div>

          <div className={styles.scoops} aria-hidden="true">
            <span className={`${styles.scoop} ${styles.scoopOne}`} data-scoop />
            <span className={`${styles.scoop} ${styles.scoopTwo}`} data-scoop />
            <span className={`${styles.scoop} ${styles.scoopThree}`} data-scoop />
          </div>
        </section>

        <section id="gusti" className={`${styles.inner} ${styles.flavours}`} data-flavours>
          <h2 className={styles.sectionTitle} data-reveal>
            I gusti di oggi
          </h2>
          <p className={styles.sectionNote} data-reveal>
            Questi ci sono sempre. Gli altri quattro dipendono dal mercato: a settembre
            di solito fico e uva fragola.
          </p>

          <ul className={styles.flavourList}>
            {FLAVOURS.map((flavour) => (
              <li
                key={flavour.name}
                className={styles.flavour}
                data-tint={flavour.tint}
                data-reveal
              >
                <span
                  className={styles.flavourDot}
                  style={{ background: flavour.dot }}
                  aria-hidden="true"
                />
                <h3 className={styles.flavourName}>{flavour.name}</h3>
                <p className={styles.flavourNote}>{flavour.note}</p>
              </li>
            ))}
          </ul>

          <p className={styles.flavourFoot}>
            Coni e coppette da 2,50. Panna montata gratis, come è giusto che sia.
            Abbiamo sempre due gusti senza latte e uno senza glutine certificato.
          </p>
        </section>

        <section id="come" className={`${styles.inner} ${styles.how}`}>
          <h2 className={styles.sectionTitle} data-reveal>
            Come lo facciamo
          </h2>
          <p className={styles.sectionNote} data-reveal>
            Tre cose che si vedono dal banco, se guardate dietro il vetro.
          </p>

          <div className={styles.howGrid} data-cards>
            {HOW.map((card) => (
              <div
                key={card.title}
                className={`${styles.howCard} ${card.dark ? styles.howCardDark : ""}`}
              >
                <h3 className={styles.howTitle}>{card.title}</h3>
                <p className={styles.howText}>{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="vaschette" className={`${styles.inner} ${styles.tubs}`}>
          <div className={styles.tubsCard} data-reveal>
            <h2 className={styles.sectionTitle}>Vaschette e torte</h2>
            <p className={styles.tubsNote}>
              Si ordinano al banco o per telefono. Per le torte serve un giorno di
              anticipo, due nei fine settimana d'agosto.
            </p>

            <ul className={styles.tubsGrid}>
              {TUBS.map((tub) => (
                <li key={tub.name} className={styles.tub}>
                  <span className={styles.tubName}>{tub.name}</span>
                  <span className={styles.tubPrice}>{tub.price}</span>
                </li>
              ))}
            </ul>

            <p className={styles.tubsNote}>
              Nel prezzo c'è il ghiaccio secco per due ore di viaggio. Se dovete andare
              più lontano ditecelo, ne mettiamo di più senza farlo pagare.
            </p>
          </div>
        </section>

        <section className={`${styles.inner} ${styles.shop}`}>
          <div className={styles.shopCard}>
            <div data-reveal>
              <h2 className={styles.shopTitle}>Passate dal banco</h2>
              <p className={styles.shopText}>
                Siamo in via Fillungo 72, sotto il portico. Per gli ordini chiamate la
                mattina: dopo le cinque il telefono lo sentiamo poco.
              </p>
              <a className={styles.shopPhone} href="tel:+390583000072" data-magnetic>
                <PhoneIcon className={styles.icon} />
                0583 000072
              </a>
            </div>

            <div data-reveal>
              <dl className={styles.hours}>
                <div>
                  <dt>Da marzo a ottobre</dt>
                  <dd>11:00 · 24:00</dd>
                </div>
                <div>
                  <dt>Da novembre a febbraio</dt>
                  <dd>13:00 · 20:00</dd>
                </div>
                <div>
                  <dt>Martedì d'inverno</dt>
                  <dd>chiuso</dd>
                </div>
              </dl>
              <p className={styles.hoursNote}>
                <ClockIcon className={styles.icon} />
                Orari verificati il 20 agosto. Il laboratorio lavora dalle sei del
                mattino, ma la porta sul retro non è un ingresso.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.inner} ${styles.footerInner}`}>
          <span>
            Gelateria Bruni di Anna Bruni · Via Fillungo 72, Lucca · P.IVA 00000000000
          </span>
          <span>
            Landing dimostrativa. Design e sviluppo{" "}
            <Link to={paths.home("it")}>Nicola Marmugi</Link>
          </span>
        </div>
      </footer>

      <div className={styles.callBar} ref={callBarRef}>
        <a className={styles.callBarPhone} href="tel:+390583000072">
          <PhoneIcon className={styles.icon} />
          Ordina
        </a>
        <a
          className={styles.callBarMap}
          href="https://maps.google.com/?q=Via+Fillungo+72+Lucca"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PinIcon className={styles.icon} />
          Mappa
        </a>
      </div>
    </div>
  );
}
