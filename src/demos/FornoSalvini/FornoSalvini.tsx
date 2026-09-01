import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";
import { ClockIcon, PhoneIcon, PinIcon } from "../shared/icons";
import { useCallBarReveal } from "../shared/useCallBarReveal";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { paths } from "../../routes/routes";
import styles from "./FornoSalvini.module.css";

const TITLE_LINES = [
  { text: "Il pane esce", light: false },
  { text: "alle 7:10.", light: false },
  { text: "Tutti i giorni.", light: true },
];

const FACTS = [
  { key: "Lievito", value: "Madre, rinfrescata due volte al giorno dal 1989." },
  { key: "Farine", value: "Molino a pietra di Bagni di Lucca, macinate ogni settimana." },
  { key: "Lievitazione", value: "Venti ore per il pane comune, ventiquattro per il grano duro." },
  { key: "Consegne", value: "A undici bar della zona, tra le 6:30 e le 7:00." },
];

/** La giornata del forno, che è anche l'indicatore di avanzamento del pattern. */
const DAY = [
  {
    time: "03:40",
    title: "Si accende il forno",
    text: "Serve un'ora e mezza perché la platea arrivi in temperatura. Chi apre alle sette accendendo alle sei sta scaldando aria.",
  },
  {
    time: "04:15",
    title: "Impasto e prima piega",
    text: "Solo farina, acqua, lievito madre e sale. Nessun miglioratore, nessun impasto surgelato la notte prima.",
  },
  {
    time: "06:30",
    title: "Prima infornata",
    text: "Escono le pagnotte da un chilo e mezzo. Il pane sciocco resta in forno dieci minuti in più degli altri.",
    cta: { label: "Prenota la tua pagnotta", href: "tel:+390583000089" },
  },
  {
    time: "07:10",
    title: "Si apre",
    text: "Insieme al pane escono i lievitati: cornetti, ciambelle, la schiacciata con l'uva a settembre.",
  },
  {
    time: "13:00",
    title: "Quello che resta",
    text: "Dalle 13 il pane del mattino cala del trenta per cento. Alle 14 chiudiamo e non buttiamo niente: quello che avanza va alla Caritas di San Concordio.",
    cta: { label: "Vieni prima delle 13", href: "#orari" },
  },
];

const COUNTER = [
  {
    group: "Pane",
    items: [
      { name: "Sciocco toscano, 1,5 kg", price: "4,80", note: "Cotto sulla platea, senza teglia." },
      { name: "Semola di grano duro", price: "5,60", note: "Il più adatto alle bruschette." },
      { name: "Pane di segale e noci", price: "6,20", note: "Solo mercoledì e sabato." },
    ],
  },
  {
    group: "Lievitati",
    items: [
      { name: "Cornetto vuoto o pieno", price: "1,40", note: "Sfogliati la sera prima, cotti alle sei." },
      { name: "Ciambella con lo zucchero", price: "1,60", note: "Finiscono entro le nove." },
      { name: "Schiacciata all'olio", price: "3,20 al pezzo", note: "Con l'olio di Matraia, non con lo strutto." },
    ],
  },
  {
    group: "Caffetteria",
    items: [
      { name: "Caffè al banco", price: "1,20", note: "Miscela tostata a Pisa, sempre la stessa dal 2004." },
      { name: "Cappuccino", price: "1,60", note: "Latte intero, quello scremato su richiesta." },
      { name: "Colazione salata", price: "4,50", note: "Caffè e mezza schiacciata farcita." },
    ],
  },
];

/**
 * Landing dimostrativa per un forno con caffetteria.
 *
 * Struttura dal pattern "Funnel (3-Step Conversion)": la giornata del forno è
 * la sequenza di passi, con un indicatore di avanzamento vero (la linea che si
 * riempie scorrendo) e una mini azione dentro i passi che contano. L'obiettivo
 * è farsi prenotare il pane, che per un forno vale più di una visita in più.
 */
export function FornoSalvini() {
  const rootRef = useRef<HTMLDivElement>(null);
  const callBarRef = useRef<HTMLDivElement>(null);

  useDocumentMeta(
    "Forno Salvini · Pane e caffetteria a Lucca",
    "Forno a lievito madre dal 1989. Il pane esce alle 7:10, caffetteria dalle 7. Si prenota la pagnotta allo 0583 000089.",
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
          .from(q("[data-intro]"), { opacity: 0, y: 16, duration: 0.5, stagger: 0.07 }, 0.25)
          .from(q("[data-fact]"), { opacity: 0, y: 14, duration: 0.4, stagger: 0.06 }, 0.4);

        // La linea della giornata si riempie con lo scorrimento: è l'indicatore
        // di avanzamento del pattern, agganciato alla posizione reale.
        const fill = gsap.from(q("[data-rail-fill]"), {
          scaleY: 0,
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-timeline]")[0],
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        });

        // Le tappe si accendono una alla volta, seguendo la linea.
        const steps = q("[data-step]").map((step) =>
          gsap.from(step, {
            opacity: 0,
            x: 14,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: { trigger: step, start: "top 86%", once: true },
          }),
        );

        const groups = q("[data-items]").map((list) =>
          gsap.from(list.children, {
            opacity: 0,
            y: 16,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: { trigger: list, start: "top 86%", once: true },
          }),
        );

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
          fill.scrollTrigger?.kill();
          fill.kill();
          for (const tween of [...steps, ...groups, ...reveals]) {
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
          <span className={styles.brand}>
            Forno Salvini <span>· Lucca</span>
          </span>

          <nav className={styles.barNav} aria-label="Navigazione della pagina">
            <a href="#giornata">La giornata</a>
            <a href="#banco">Al banco</a>
            <a href="#orari">Orari</a>
          </nav>

          <a className={styles.button} href="tel:+390583000089">
            <PhoneIcon className={styles.icon} />
            0583 000089
          </a>
        </div>
      </header>

      <main>
        <section className={`${styles.inner} ${styles.hero}`} data-hero>
          <div>
            <p className={`${styles.eyebrow} ${styles.label}`} data-intro>
              Forno a lievito madre · dal 1989
            </p>

            <h1 className={styles.title}>
              {TITLE_LINES.map((line) => (
                <span key={line.text} className={styles.titleLine} data-title-line>
                  <span className={line.light ? styles.titleLight : undefined}>
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>

            <p className={styles.lead} data-intro>
              Impastiamo alle quattro e cuociamo alle sei e mezza, in un forno a platea
              del 1962. Facciamo quattro tipi di pane e nient'altro, perché sono quelli
              che sappiamo fare bene.
            </p>

            <div className={styles.actions} data-intro>
              <a className={styles.button} href="tel:+390583000089">
                <PhoneIcon className={styles.icon} />
                Prenota il pane
              </a>
              <a className={`${styles.button} ${styles.buttonGhost}`} href="#banco">
                Cosa c'è al banco
              </a>
            </div>
          </div>

          <div className={styles.facts}>
            {FACTS.map((fact) => (
              <div key={fact.key} className={styles.fact} data-fact>
                <span className={`${styles.factKey} ${styles.label}`}>{fact.key}</span>
                <p className={styles.factValue}>{fact.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="giornata" className={`${styles.inner} ${styles.day}`}>
          <div className={styles.sectionHead} data-reveal>
            <h2 className={styles.sectionTitle}>Una giornata, dalle 3:40</h2>
            <p className={styles.sectionNote}>
              Se venite alle otto trovate tutto. Se venite alle dodici e mezza trovate
              quello che è rimasto, che è il modo in cui funziona un forno vero.
            </p>
          </div>

          <div className={styles.timeline} data-timeline>
            <div className={styles.timelineRail} aria-hidden="true">
              <div className={styles.timelineFill} data-rail-fill />
            </div>

            {DAY.map((step) => (
              <div key={step.time} className={styles.step} data-step>
                <span className={styles.stepTime}>{step.time}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
                {step.cta ? (
                  <a className={styles.stepCta} href={step.cta.href}>
                    {step.cta.label}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section id="banco" className={styles.counter}>
          <div className={styles.inner}>
            <div className={styles.sectionHead} data-reveal>
              <h2 className={styles.sectionTitle}>Al banco</h2>
              <p className={styles.sectionNote}>
                Prezzi di settembre. Il pane si vende anche a metà pagnotta, chiedete
                pure senza problemi.
              </p>
            </div>

            <div className={styles.counterGrid}>
              {COUNTER.map((group) => (
                <div key={group.group} className={styles.group}>
                  <h3>{group.group}</h3>
                  <ul className={styles.items} data-items>
                    {group.items.map((item) => (
                      <li key={item.name} className={styles.item}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemPrice}>{item.price}</span>
                        <span className={styles.itemNote}>{item.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="orari" className={styles.reserve}>
          <div className={`${styles.inner} ${styles.reserveInner}`}>
            <div data-reveal>
              <h2 className={styles.reserveTitle}>Prenotate il pane, si tiene da parte</h2>
              <p className={styles.reserveText}>
                Chiamate entro le nove del mattino e mettiamo via quello che volete fino
                a chiusura. Serve soprattutto il sabato, quando alle dieci le pagnotte
                grandi sono già finite.
              </p>
              <a className={styles.reservePhone} href="tel:+390583000089">
                <PhoneIcon className={styles.icon} />
                0583 000089
              </a>
              <a className={styles.reserveMail} href="mailto:forno@fornosalvini.it">
                Per bar e ristoranti: forno@fornosalvini.it
              </a>
            </div>

            <div data-reveal>
              <dl className={styles.hours}>
                <div>
                  <dt>Da martedì a sabato</dt>
                  <dd>07:00 · 14:00</dd>
                </div>
                <div>
                  <dt>Domenica</dt>
                  <dd>07:00 · 12:30</dd>
                </div>
                <div>
                  <dt>Lunedì</dt>
                  <dd>chiuso</dd>
                </div>
                <div>
                  <dt>Caffetteria</dt>
                  <dd>dalle 07:00, ultimo caffè alle 13:30</dd>
                </div>
              </dl>
              <p className={styles.hoursNote}>
                <ClockIcon className={styles.icon} />
                Orari verificati il 20 agosto. Via dei Fossi 89, Lucca. Due gradini
                all'ingresso, chi ha bisogno ci chiami e apriamo la porta sul retro.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.inner} ${styles.footerInner}`}>
          <span>
            Forno Salvini di Elio Salvini · Via dei Fossi 89, Lucca · P.IVA 00000000000
          </span>
          <span>
            Landing dimostrativa. Design e sviluppo{" "}
            <Link to={paths.home("it")}>Nicola Marmugi</Link>
          </span>
        </div>
      </footer>

      <div className={styles.callBar} ref={callBarRef}>
        <a className={styles.callBarPhone} href="tel:+390583000089">
          <PhoneIcon className={styles.icon} />
          Prenota il pane
        </a>
        <a
          className={styles.callBarMap}
          href="https://maps.google.com/?q=Via+dei+Fossi+89+Lucca"
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
