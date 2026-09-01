import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Flip, gsap, useGSAP } from "../../lib/gsap";
import { ClockIcon, PhoneIcon, PinIcon } from "../shared/icons";
import { useCallBarReveal } from "../shared/useCallBarReveal";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { paths } from "../../routes/routes";
import styles from "./TrattoriaNardi.module.css";

/** Righe corte per scelta: la spezzatura la decidiamo qui, non il browser. */
const TITLE_LINES = ["Si mangia", "quello", "che c'è."];

/**
 * Il piatto del giorno è il motivo per cui la gente del posto torna: qui è la
 * parte interattiva della pagina, non un elenco da leggere tutto insieme.
 */
const DAYS = [
  {
    short: "Lun",
    long: "Lunedì",
    dish: "Minestra di pane",
    note: "Quella del giorno prima, ripassata. Chi la conosce viene apposta il lunedì.",
    price: "9,00",
  },
  {
    short: "Mar",
    long: "Martedì",
    dish: "Trippa alla fiorentina",
    note: "La fa la Wanda, che non ha mai voluto scrivere la ricetta da nessuna parte.",
    price: "10,00",
  },
  {
    short: "Mer",
    long: "Mercoledì",
    dish: "Peposo e fagioli al fiasco",
    note: "In forno dalle sette del mattino. Quando finisce, finisce.",
    price: "12,00",
  },
  {
    short: "Gio",
    long: "Giovedì",
    dish: "Gnudi di ricotta e spinaci",
    note: "Ricotta di Pescia, presa la mattina. Senza glutine, ma non lo scriviamo grande.",
    price: "10,00",
  },
  {
    short: "Ven",
    long: "Venerdì",
    dish: "Baccalà con i porri",
    note: "Ammollato da mercoledì. Il venerdì di magro qui vale ancora qualcosa.",
    price: "11,00",
  },
  {
    short: "Sab",
    long: "Sabato",
    dish: "Tortelli di patate al ragù",
    note: "Tirati a mano il venerdì pomeriggio, sul tavolo grande in fondo.",
    price: "11,00",
  },
];

const ALWAYS = [
  {
    name: "Crostini di fegatini",
    price: "6,00",
    note: "Cinque per porzione, con il pane raffermo di Simonetti.",
  },
  {
    name: "Pappa al pomodoro",
    price: "8,00",
    note: "D'estate la serviamo a temperatura ambiente, come va fatta.",
  },
  {
    name: "Coniglio in umido",
    price: "13,00",
    note: "Con le olive. Chiedete il pane in più, serve.",
  },
  {
    name: "Torta co' becchi",
    price: "5,00",
    note: "Solo il venerdì e il sabato, finché ce n'è.",
  },
];

/** Lunedì è 1 in `getDay`, la domenica è 0: la trattoria è chiusa, si mostra lunedì. */
function todayIndex(): number {
  const day = new Date().getDay();
  return day === 0 ? 0 : Math.min(day - 1, DAYS.length - 1);
}

/**
 * Landing dimostrativa per una trattoria di paese.
 *
 * Struttura dal pattern "Hero-Centric Design": apertura centrata che occupa la
 * prima schermata, una sola azione primaria e la stessa azione ripetuta nella
 * barra. Il cuore della pagina è il piatto del giorno, l'unica cosa che i
 * clienti abituali vogliono davvero sapere prima di uscire di casa.
 */
export function TrattoriaNardi() {
  const rootRef = useRef<HTMLDivElement>(null);
  const callBarRef = useRef<HTMLDivElement>(null);
  const pillState = useRef<Flip.FlipState | null>(null);
  const [day, setDay] = useState(todayIndex);

  useDocumentMeta(
    "Trattoria Nardi · Cucina toscana a Pescia",
    "Trattoria di famiglia dal 1961. Pranzo a prezzo fisso, piatto del giorno, cucina toscana di casa. Si prenota allo 0572 000061.",
    // Locale inventato per la dimostrazione: fuori dagli indici, o Google
    // finirebbe per proporlo come un locale vero.
    { noindex: true },
  );

  // Movimento della barra di chiamata: identico in tutte le demo.
  useCallBarReveal(rootRef, callBarRef);

  const selected = DAYS[day];

  // La pastiglia colorata vive dentro il bottone selezionato: allo scambio si
  // sposta di padre, e Flip anima quel salto invece di farla sparire e
  // ricomparire altrove.
  function selectDay(index: number) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pillState.current = reduced ? null : Flip.getState(`.${styles.dayPill}`);
    setDay(index);
  }

  useGSAP(
    () => {
      if (!pillState.current) return;

      Flip.from(pillState.current, {
        duration: 0.45,
        ease: "power3.inOut",
        absolute: true,
      });
      pillState.current = null;

      gsap.from(`.${styles.dish} > *`, {
        opacity: 0,
        y: 12,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.05,
      });
    },
    { dependencies: [day], scope: rootRef },
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Apertura: il titolo sale riga per riga, poi il resto della colonna.
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .from(q("[data-title-line] > span"), {
            yPercent: 105,
            duration: 0.7,
            stagger: 0.08,
          })
          .from(q("[data-intro]"), { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 }, 0.25)
          .from(
            q("[data-strip-shot]"),
            { opacity: 0, y: 30, duration: 0.6, stagger: 0.09 },
            0.4,
          );

        // Griglia: onda diagonale, il preset "Stagger List" della skill.
        const grid = gsap.from(q("[data-always] > *"), {
          opacity: 0,
          scale: 0.94,
          y: 16,
          duration: 0.4,
          ease: "back.out(1.4)",
          stagger: { each: 0.06, from: "start", grid: "auto" },
          scrollTrigger: { trigger: q("[data-always]")[0], start: "top 84%", once: true },
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
          grid.scrollTrigger?.kill();
          grid.kill();
          for (const tween of reveals) {
            tween.scrollTrigger?.kill();
            tween.kill();
          }
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div className={styles.page} ref={rootRef} lang="it">
      <header className={styles.bar}>
        <div className={`${styles.inner} ${styles.barInner}`}>
          <span className={styles.brand}>Trattoria Nardi</span>

          <nav className={styles.barNav} aria-label="Navigazione della pagina">
            <a href="#giorno">Piatto del giorno</a>
            <a href="#sempre">In carta</a>
            <a href="#casa">La casa</a>
          </nav>

          <a className={styles.callButton} href="tel:+390572000061">
            <PhoneIcon className={styles.icon} />
            0572 000061
          </a>
        </div>
      </header>

      <main>
        <section className={`${styles.inner} ${styles.hero}`} data-hero>
          <p className={`${styles.eyebrow} ${styles.label}`} data-intro>
            Pescia · dal 1961
          </p>

          <h1 className={styles.title}>
            {TITLE_LINES.map((line) => (
              <span key={line} className={styles.titleLine} data-title-line>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <p className={styles.lead} data-intro>
            Il menu lo scriviamo a mano ogni mattina, dopo il mercato. Cambia tutti i
            giorni tranne quattro piatti, che non abbiamo mai tolto in sessant'anni.
            A pranzo lavorano quasi tutti, quindi si mangia in fretta e bene.
          </p>

          <div className={styles.actions} data-intro>
            <a className={styles.callButton} href="tel:+390572000061">
              <PhoneIcon className={styles.icon} />
              Prenota un tavolo
            </a>
            <a className={styles.textLink} href="#giorno">
              Cosa c'è oggi
            </a>
          </div>

          <p className={styles.heroNote} data-intro>
            <ClockIcon className={styles.icon} />
            Pranzo da lunedì a sabato. La sera solo venerdì e sabato.
          </p>
        </section>

        <div className={styles.heroStrip}>
          {["la sala grande", "il banco", "la cucina"].map((caption) => (
            <div
              key={caption}
              className={`${styles.shot} ${styles.stripShot}`}
              data-strip-shot
              data-caption={caption}
              aria-hidden="true"
            />
          ))}
        </div>

        <section className={styles.strip}>
          <div className={`${styles.inner} ${styles.stripInner}`} data-reveal>
            <span className={styles.stripPrice}>14 euro</span>
            <p className={styles.stripText}>
              Pranzo completo: primo, secondo, contorno, un quarto di vino e il caffè.
              Il prezzo è questo dal 2019 e non cambia il sabato.
            </p>
          </div>
        </section>

        <section id="giorno" className={`${styles.inner} ${styles.today}`}>
          <h2 className={styles.sectionTitle} data-reveal>
            Il piatto del giorno
          </h2>
          <p className={styles.sectionNote} data-reveal>
            Sei giorni, sei piatti che non si spostano. Il resto della carta cambia con
            quello che si trova al mercato.
          </p>

          <div className={styles.days} role="group" aria-label="Giorni della settimana">
            {DAYS.map((item, index) => (
              <button
                key={item.short}
                type="button"
                className={`${styles.day} ${index === day ? styles.dayActive : ""}`}
                aria-pressed={index === day}
                onClick={() => selectDay(index)}
              >
                {index === day ? <span className={styles.dayPill} aria-hidden="true" /> : null}
                {item.short}
              </button>
            ))}
          </div>

          <div className={styles.dish} aria-live="polite">
            <p className={`${styles.dishDay} ${styles.label}`}>{selected.long}</p>
            <h3 className={styles.dishName}>{selected.dish}</h3>
            <p className={styles.dishNote}>{selected.note}</p>
            <p className={styles.dishPrice}>{selected.price} euro</p>
          </div>
        </section>

        <section id="sempre" className={`${styles.inner} ${styles.always}`}>
          <h2 className={styles.sectionTitle} data-reveal>
            Quello che c'è sempre
          </h2>
          <p className={styles.sectionNote} data-reveal>
            Quattro piatti fissi dal 1961. Se un giorno non ci fossero, ce lo direbbero
            prima i clienti che il cuoco.
          </p>

          <div className={styles.alwaysGrid} data-always>
            {ALWAYS.map((item) => (
              <div key={item.name} className={styles.alwaysItem}>
                <p className={styles.alwaysName}>
                  {item.name}
                  <span className={styles.alwaysPrice}>{item.price}</span>
                </p>
                <p className={styles.alwaysNote}>{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="casa" className={`${styles.inner} ${styles.house}`}>
          <h2 className={styles.sectionTitle} data-reveal>
            Sessant'anni nella stessa stanza
          </h2>

          <div className={styles.houseText} data-reveal>
            <p>
              Ha aperto il nonno nel 1961, quando qui davanti passava ancora il mercato
              dei fiori. Le sedie sono quelle, il bancone pure. Abbiamo cambiato solo la
              cucina, due volte, e il forno nel 2014.
            </p>
            <p>
              Ventidue coperti dentro e otto sotto il portico d'estate. Non prendiamo
              gruppi sopra le dieci persone: non ci stiamo, e servirli male non ci
              interessa.
            </p>
            <p>
              Siamo in via del Mercato a Pescia, davanti al parcheggio comunale. Si paga
              anche con la carta, nonostante quello che si dice in giro.
            </p>
          </div>

          <blockquote className={styles.houseQuote} data-reveal>
            Il menu lungo serve a nascondere il surgelato.
            <span className={styles.houseQuoteWho}>Wanda Nardi, in cucina dal 1978</span>
          </blockquote>
        </section>

        <section className={styles.book}>
          <div className={`${styles.inner} ${styles.bookInner}`}>
            <h2 className={styles.bookTitle} data-reveal>
              Ventidue coperti, si prenota
            </h2>
            <p className={styles.bookText} data-reveal>
              A pranzo dopo le 12:30 è pieno quasi sempre. Chiamate la mattina, anche
              presto: siamo qui dalle sette.
            </p>

            <div data-reveal>
              <a className={styles.bookPhone} href="tel:+390572000061">
                <PhoneIcon className={styles.icon} />
                0572 000061
              </a>
              <a className={styles.bookMail} href="mailto:tavoli@trattorianardi.it">
                Per le cene di gruppo: tavoli@trattorianardi.it
              </a>
            </div>

            <dl className={styles.hours} data-reveal>
              <div>
                <dt>Pranzo, da lunedì a sabato</dt>
                <dd>12:00 · 14:30</dd>
              </div>
              <div>
                <dt>Cena, venerdì e sabato</dt>
                <dd>19:30 · 22:00</dd>
              </div>
              <div>
                <dt>Domenica</dt>
                <dd>chiuso</dd>
              </div>
            </dl>

            <p className={styles.hoursNote}>
              <ClockIcon className={styles.icon} />
              Orari verificati il 20 agosto. Via del Mercato 12, Pescia (PT).
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.inner} ${styles.footerInner}`}>
          <span>
            Trattoria Nardi di Wanda Nardi · Via del Mercato 12, Pescia (PT) · P.IVA
            00000000000
          </span>
          <span>
            Landing dimostrativa. Design e sviluppo{" "}
            <Link to={paths.home("it")}>Nicola Marmugi</Link>
          </span>
        </div>
      </footer>

      <div className={styles.callBar} ref={callBarRef}>
        <a className={styles.callBarPhone} href="tel:+390572000061">
          <PhoneIcon className={styles.icon} />
          Prenota
        </a>
        <a
          className={styles.callBarMap}
          href="https://maps.google.com/?q=Via+del+Mercato+12+Pescia"
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
