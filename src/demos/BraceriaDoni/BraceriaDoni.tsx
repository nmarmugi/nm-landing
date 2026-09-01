import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";
import { FireIcon, PhoneIcon, PinIcon } from "../shared/icons";
import { useCallBarReveal } from "../shared/useCallBarReveal";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { paths } from "../../routes/routes";
import styles from "./BraceriaDoni.module.css";

/** Righe corte per scelta: la spezzatura la decidiamo qui, non il browser. */
const TITLE_LINES = [
  { text: "Fuoco,", ember: false },
  { text: "sale,", ember: false },
  { text: "tempo.", ember: true },
];

const TICKER = [
  "Fiorentina",
  "Costata di scottona",
  "Tagliata di maremmana",
  "Rosticciana",
  "Fegatelli",
  "Brace di leccio",
];

/** Giorni di frollatura raccontati per tappe, non per slogan. */
const AGING_STEPS = [
  { day: "Giorno 1", text: "La mezzena arriva dal macello di Castelnuovo, sempre lo stesso da undici anni." },
  { day: "Giorno 14", text: "La carne perde acqua e cala di peso. È il momento in cui costa di più e rende di meno." },
  { day: "Giorno 30", text: "Si forma la crosta esterna, che poi buttiamo via. Resta il cuore, più tenero." },
  { day: "Giorno 45", text: "Si taglia. Oltre questo punto il gusto diventa una cosa per pochi, e noi non ci andiamo." },
];

const CUTS = [
  {
    name: "Fiorentina",
    price: "6,50 all'etto",
    note: "Minimo 1,2 kg, si divide in due. Cotta al sangue, se la volete ben cotta ve lo diciamo prima che è uno spreco.",
  },
  {
    name: "Costata di scottona",
    price: "5,50 all'etto",
    note: "Frollata 45 giorni. Il taglio che ordina di più chi viene da solo.",
  },
  {
    name: "Tagliata di maremmana",
    price: "24,00",
    note: "Con rucola e grana, oppure niente sopra se preferite sentire la carne.",
  },
  {
    name: "Rosticciana e salsicce",
    price: "18,00",
    note: "Maiale di Zeri, cotto piano. La porzione è abbondante davvero, non ordinatene due.",
  },
  {
    name: "Menu del bosco",
    price: "22,00",
    note: "Per chi non mangia carne: farro, funghi, verdure sotto la cenere. Ci sono i cacciatori e ci sono le mogli dei cacciatori.",
  },
];

/**
 * Landing dimostrativa per una braceria di famiglia.
 *
 * Struttura dal pattern "Hero + Features + CTA" con lo stile Brutalism: bordi
 * pieni, angoli vivi, tipografia condensata pesante, nessuna ombra sfumata.
 * L'obiettivo resta uno solo, la prenotazione telefonica, ma qui il lavoro di
 * convincimento lo fa il tempo: quarantacinque giorni di frollatura raccontati
 * mentre si scorre.
 */
export function BraceriaDoni() {
  const rootRef = useRef<HTMLDivElement>(null);
  const callBarRef = useRef<HTMLDivElement>(null);

  useDocumentMeta(
    "Braceria Doni · Carne alla brace in Garfagnana",
    "Braceria di famiglia dal 1978. Carne frollata 45 giorni, brace di leccio, quaranta coperti. Si prenota allo 0583 000078.",
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
        // Apertura per righe intere, non per caratteri: il titolo è condensato
        // e pesante, spezzarlo in lettere lo farebbe vibrare.
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

        intro
          .from(q("[data-title-line] > span"), {
            yPercent: 105,
            duration: 0.75,
            stagger: 0.09,
          })
          .from(q("[data-intro]"), { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.3)
          .from(
            q("[data-hero-shot]"),
            { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.inOut" },
            0.2,
          )
          .from(q("[data-badge]"), { scale: 0.7, rotate: 24, duration: 0.45 }, 0.85);

        // Nastro infinito: due copie affiancate, la seconda prende il posto
        // della prima a fine corsa.
        const ticker = gsap.to(q("[data-ticker-track]"), {
          xPercent: -100,
          duration: 22,
          ease: "none",
          repeat: -1,
        });

        // Tessere del bento: onda diagonale, non una riga per volta.
        const bento = gsap.from(q("[data-bento] > *"), {
          opacity: 0,
          scale: 0.92,
          y: 16,
          duration: 0.4,
          ease: "back.out(1.4)",
          stagger: { each: 0.06, from: "start", grid: "auto" },
          scrollTrigger: { trigger: q("[data-bento]")[0], start: "top 82%", once: true },
        });

        // Righe dei tagli: entrano dal bordo sinistro, come un timbro.
        const cuts = gsap.from(q("[data-cut]"), {
          opacity: 0,
          x: -24,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: { trigger: q("[data-cuts]")[0], start: "top 82%", once: true },
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
          ticker.kill();
          bento.scrollTrigger?.kill();
          bento.kill();
          cuts.scrollTrigger?.kill();
          cuts.kill();
          for (const tween of reveals) {
            tween.scrollTrigger?.kill();
            tween.kill();
          }
        };
      });

      // Unica sezione bloccata della pagina, e solo da desktop: il contatore
      // della frollatura sale da 0 a 45 mentre la barra si riempie.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1000px)", () => {
        const counter = q("[data-days]")[0] as HTMLElement | undefined;
        const state = { day: 0 };

        const aging = gsap.timeline({
          scrollTrigger: {
            trigger: q("[data-aging]")[0],
            start: "top top",
            end: "+=90%",
            pin: true,
            scrub: 0.8,
          },
        });

        aging
          .to(state, {
            day: 45,
            ease: "none",
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(state.day));
            },
          })
          .from(q("[data-aging-fill]"), { scaleX: 0, ease: "none" }, 0)
          .from(q("[data-aging-step]"), { opacity: 0.25, stagger: 0.5, ease: "none" }, 0);

        return () => {
          aging.scrollTrigger?.kill();
          aging.kill();
          if (counter) counter.textContent = "45";
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
            Braceria Doni
            <span className={styles.brandYear}>Gallicano · dal 1978</span>
          </span>

          <nav className={styles.barNav} aria-label="Navigazione della pagina">
            <a href="#tagli">I tagli</a>
            <a href="#frollatura">Frollatura</a>
            <a href="#famiglia">La famiglia</a>
          </nav>

          <a className={styles.callButton} href="tel:+390583000078">
            <PhoneIcon className={styles.icon} />
            0583 000078
          </a>
        </div>
      </header>

      <main>
        <section className={`${styles.inner} ${styles.hero}`} data-hero>
          <div>
            <p className={`${styles.heroEyebrow} ${styles.label}`} data-intro>
              Braceria di famiglia · Garfagnana
            </p>

            <h1 className={styles.title}>
              {TITLE_LINES.map((line) => (
                <span key={line.text} className={styles.titleLine} data-title-line>
                  <span className={line.ember ? styles.titleEmber : undefined}>
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>

            <p className={styles.lead} data-intro>
              Niente marinature, niente salse, niente piastra. Carne di maremmana
              frollata quarantacinque giorni, brace di leccio, sale grosso alla fine.
              Quaranta coperti e un forno solo, quindi conviene chiamare.
            </p>

            <div className={styles.actions} data-intro>
              <a className={styles.callButton} href="tel:+390583000078">
                <PhoneIcon className={styles.icon} />
                Prenota un tavolo
              </a>
              <a className={styles.textLink} href="#tagli">
                Guarda i tagli e i prezzi
              </a>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <div
              className={`${styles.shot} ${styles.heroShot}`}
              data-hero-shot
              data-caption="la griglia, ore 20:40"
              aria-hidden="true"
            />
            <p className={styles.badge} data-badge>
              45
              <span>giorni di frollatura</span>
            </p>
          </div>
        </section>

        <div className={styles.ticker} aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className={styles.tickerTrack} data-ticker-track>
              {TICKER.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
          ))}
        </div>

        <section className={`${styles.inner} ${styles.bento}`} aria-label="La bottega">
          <div className={styles.sectionHead} data-reveal>
            <h2 className={styles.sectionTitle}>Come lavoriamo</h2>
            <p className={styles.sectionNote}>
              Quattro cose che potete verificare voi stessi, entrando in cucina. Lo fanno
              in molti, non diamo fastidio a nessuno.
            </p>
          </div>

          <div className={styles.bentoGrid} data-bento>
            <div className={`${styles.tile} ${styles.tileDark}`}>
              <span className={styles.tileNumber}>1</span>
              <h3 className={styles.tileTitle}>Un fornitore solo</h3>
              <p className={styles.tileText}>
                Macello di Castelnuovo, undici anni che è lo stesso. Sappiamo il nome
                dell'allevatore di ogni mezzena che entra qui.
              </p>
            </div>

            <div className={`${styles.tile} ${styles.tileShot} ${styles.tileTall}`}>
              <div
                className={`${styles.shot} ${styles.tileShotInner}`}
                data-caption="la cella di frollatura"
                aria-hidden="true"
              />
            </div>

            <div className={`${styles.tile} ${styles.tileEmber}`}>
              <span className={styles.tileNumber}>780°</span>
              <h3 className={styles.tileTitle}>Brace di leccio</h3>
              <p className={styles.tileText}>
                Legna della valle, mai carbonella. Si accende alle cinque, prima di
                aprire.
              </p>
            </div>

            <div className={`${styles.tile} ${styles.tileWide}`}>
              <h3 className={styles.tileTitle}>Il taglio ve lo mostriamo</h3>
              <p className={styles.tileText}>
                Prima di metterla sul fuoco la portiamo al tavolo. Se il pezzo non vi
                convince, si cambia senza discutere: costa meno a noi cambiarlo che
                servirvi una bistecca che non volevate.
              </p>
            </div>

            <div className={styles.tile}>
              <span className={styles.tileNumber}>40</span>
              <h3 className={styles.tileTitle}>Coperti</h3>
              <p className={styles.tileText}>
                Due turni la sera, 19:30 e 21:30. Il sabato si riempie con dieci giorni
                di anticipo.
              </p>
            </div>
          </div>
        </section>

        <section id="tagli" className={`${styles.inner} ${styles.cuts}`} data-cuts>
          <div className={styles.sectionHead} data-reveal>
            <h2 className={styles.sectionTitle}>I tagli</h2>
            <p className={styles.sectionNote}>
              I prezzi all'etto cambiano con il mercato: questi valgono da settembre.
            </p>
          </div>

          <div className={styles.cutTable}>
            {CUTS.map((cut) => (
              <div key={cut.name} className={styles.cutRow} data-cut>
                <span className={styles.cutName}>{cut.name}</span>
                <span className={styles.cutPrice}>{cut.price}</span>
                <span className={styles.cutNote}>{cut.note}</span>
              </div>
            ))}
          </div>

          <p className={styles.cutsFoot}>
            Coperto 2,50 con pane di patate e olio della Piana. Contorni 5 euro. Per i
            celiaci abbiamo griglia e taglieri separati, ditecelo quando prenotate.
          </p>
        </section>

        <section id="frollatura" className={styles.aging} data-aging>
          <div className={`${styles.inner} ${styles.agingInner}`}>
            <div>
              <h2 className={styles.agingTitle}>Quarantacinque giorni in cella</h2>
              <p className={styles.agingText}>
                La frollatura non è una moda: è tempo in cui la carne occupa spazio,
                perde peso e non frutta niente. La facciamo perché dopo si sente, e
                perché possiamo permettercelo lavorando su pochi coperti.
              </p>

              <ul className={styles.agingSteps}>
                {AGING_STEPS.map((step) => (
                  <li key={step.day} className={styles.agingStep} data-aging-step>
                    <span className={styles.agingStepDay}>{step.day}</span>
                    <p className={styles.agingStepText}>{step.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={styles.agingCounter}>
                <span data-days>45</span>
                <span className={styles.agingCounterLabel}>giorni in cella</span>
              </p>
              <div className={styles.agingBar} aria-hidden="true">
                <div className={styles.agingFill} data-aging-fill />
              </div>
            </div>
          </div>
        </section>

        <section id="famiglia" className={`${styles.inner} ${styles.family}`}>
          <div className={styles.familyGrid}>
            <div className={styles.familyText}>
              <h2 className={styles.sectionTitle} data-reveal>
                Tre generazioni, stessa stanza
              </h2>

              <div data-reveal>
                <p>
                  Ha aperto il nonno nel 1978, con quattro tavoli e la griglia che c'è
                  ancora adesso, rifatta due volte. Poi è passata a mio padre, che ha
                  aggiunto la cella di frollatura quando in valle nessuno sapeva cosa
                  fosse.
                </p>
                <p>
                  Oggi la sala la tiene mia sorella, io sto alla brace. Nostra madre fa i
                  dolci il venerdì e non accetta osservazioni sulla ricetta della
                  torta co' becchi.
                </p>
                <p>
                  Siamo a Gallicano, venti minuti da Barga e quaranta da Lucca. C'è
                  parcheggio davanti, e per chi arriva in moto un posto coperto sul
                  retro.
                </p>
              </div>

              <blockquote className={styles.familyQuote} data-reveal>
                La carne buona si rovina in trenta secondi di distrazione.
                <span>Sandro Doni, alla griglia dal 1994</span>
              </blockquote>
            </div>

            <div
              className={`${styles.shot} ${styles.familyShot}`}
              data-reveal
              data-caption="sandro alla griglia"
              aria-hidden="true"
            />
          </div>
        </section>

        <section className={styles.book}>
          <div className={`${styles.inner} ${styles.bookInner}`}>
            <div data-reveal>
              <h2 className={styles.bookTitle}>Due turni, quaranta posti</h2>
              <p className={styles.bookText}>
                Si prenota per telefono dalle 9 alle 22. Se non rispondiamo siamo alla
                brace: richiamiamo noi, lasciate suonare e basta.
              </p>
              <a className={styles.bookPhone} href="tel:+390583000078">
                <PhoneIcon className={styles.icon} />
                0583 000078
              </a>
              <a className={styles.bookMail} href="mailto:tavoli@braceriadoni.it">
                Per gruppi e cene di lavoro: tavoli@braceriadoni.it
              </a>
            </div>

            <div data-reveal>
              <dl className={styles.hours}>
                <div>
                  <dt>Da mercoledì a sabato</dt>
                  <dd>19:30 e 21:30</dd>
                </div>
                <div>
                  <dt>Domenica</dt>
                  <dd>12:30 · 15:00</dd>
                </div>
                <div>
                  <dt>Lunedì e martedì</dt>
                  <dd>chiuso</dd>
                </div>
                <div>
                  <dt>Agosto</dt>
                  <dd>chiuso le prime due settimane</dd>
                </div>
              </dl>
              <p className={styles.hoursNote}>
                <FireIcon className={styles.icon} />
                Orari verificati il 20 agosto. La griglia si spegne mezz'ora prima della
                chiusura. Via del Ponte 8, Gallicano (LU).
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.inner} ${styles.footerInner}`}>
          <span>
            Braceria Doni di Sandro Doni · Via del Ponte 8, Gallicano (LU) · P.IVA
            00000000000
          </span>
          <span>
            Landing dimostrativa. Design e sviluppo{" "}
            <Link to={paths.home("it")}>Nicola Marmugi</Link>
          </span>
        </div>
      </footer>

      <div className={styles.callBar} ref={callBarRef}>
        <a className={styles.callBarPhone} href="tel:+390583000078">
          <PhoneIcon className={styles.icon} />
          Prenota
        </a>
        <a
          className={styles.callBarMap}
          href="https://maps.google.com/?q=Via+del+Ponte+8+Gallicano+Lucca"
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
