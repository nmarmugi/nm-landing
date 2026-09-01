import { useRef } from "react";
import { Link } from "react-router-dom";
import { MOTION_QUERIES, ScrollTrigger, SplitText, gsap, useGSAP } from "../../lib/gsap";
import { ClockIcon, PhoneIcon, PinIcon } from "../shared/icons";
import { useCallBarReveal } from "../shared/useCallBarReveal";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { paths } from "../../routes/routes";
import styles from "./MareSedici.module.css";

/**
 * Titolo riga per riga: ogni riga è una maschera e non va mai a capo da sola.
 * Le righe sono corte apposta, così anche sul telefono più stretto la
 * spezzatura resta quella decisa qui e non una scelta del browser.
 */
const TITLE_LINES = [
  { text: "Pescato", accent: false },
  { text: "la mattina,", accent: false },
  { text: "servito", accent: true },
  { text: "la sera.", accent: true },
];

/** La lavagna cambia ogni giorno: qui resta l'ultima scritta a mano. */
const BOARD = [
  { dish: "Triglie di scoglio, sale e limone", price: "s.q." },
  { dish: "Spaghetto alle arselle", price: "17,00" },
  { dish: "Palamita marinata, cipolla di Certaldo", price: "14,00" },
  { dish: "Totani e patate come li faceva Nonna Bruna", price: "18,00" },
];

const MENU = [
  {
    group: "Per cominciare",
    dishes: [
      {
        name: "Selezione del banco",
        price: "24,00",
        note: "Sei pezzi, decide chi taglia. In due conviene ordinarne uno solo e vedere come va.",
      },
      {
        name: "Scampi e agrumi",
        price: "18,00",
        note: "Scampi di Viareggio, olio nuovo di Pietrasanta, cedro.",
      },
      {
        name: "Acciughe fritte in carta",
        price: "9,00",
        note: "Quattro euro in più se le volete anche da portare via.",
      },
    ],
  },
  {
    group: "Primi",
    dishes: [
      {
        name: "Spaghetto alle arselle",
        price: "17,00",
        note: "Non lo togliamo dalla carta da nove anni e non abbiamo intenzione di farlo.",
      },
      {
        name: "Risotto agli scampi",
        price: "19,00",
        note: "Minimo due persone, venti minuti di attesa.",
      },
      {
        name: "Tagliolini al nero, calamaretti spillo",
        price: "16,00",
        note: "Pasta tirata la mattina.",
      },
    ],
  },
  {
    group: "Dalla brace e dalla padella",
    dishes: [
      {
        name: "Pescato del giorno",
        price: "8,00 all'etto",
        note: "Ve lo portiamo al tavolo prima di cuocerlo. Se non vi convince, si cambia.",
      },
      {
        name: "Cacciucco",
        price: "26,00",
        note: "Solo il giovedì. Finisce quasi sempre entro le nove e mezza.",
      },
      {
        name: "Frittura leggera",
        price: "20,00",
        note: "Calamari, gamberi, verdure dell'orto di Massarosa.",
      },
    ],
  },
];

/** Cinque scatti del locale: su desktop scorrono in orizzontale col pin. */
const GALLERY = [
  "il banco del crudo",
  "la brace, ore 20",
  "tavolo 4, sul canale",
  "la cella del pesce",
  "darsena, ore 6",
];

/** Frase che si accende parola per parola mentre si scorre. */
const STATEMENT =
  "Se una cosa non è buona quel giorno, non la mettiamo. È tutto qui il metodo.";

const REVIEWS = [
  {
    text: "Ci hanno portato il pesce al tavolo prima di cuocerlo e ci hanno detto quale valeva la pena. Roba che non capita più.",
    who: "Elena D.",
    source: "Google, ottobre",
  },
  {
    text: "Siamo arrivati alle dieci di giovedì e il cacciucco era finito. Ce l'hanno detto al telefono, io non avevo ascoltato.",
    who: "Paolo R.",
    source: "TheFork, agosto",
  },
  {
    text: "Trenta coperti veri, si sente. Il servizio non ti mette fretta e lo spaghetto alle arselle è quello giusto.",
    who: "Chiara M.",
    source: "Google, luglio",
  },
];

/** Cinque stelle piene: decorative, il voto è scritto accanto in chiaro. */
function Stars() {
  return (
    <span className={styles.reviewStars} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => (
        <svg key={index} className={styles.star} viewBox="0 0 24 24">
          <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Landing dimostrativa per un ristorante di pesce contemporaneo.
 *
 * Struttura dal pattern "Trust & Authority + Conversion": apertura con la
 * promessa, prove concrete (lavagna, carta, locale, recensioni) e solo alla
 * fine l'invito a prenotare, con il numero sempre raggiungibile in alto e, sul
 * telefono, in una barra fissa in basso.
 *
 * Le animazioni servono a scandire la lettura, non a farsi guardare: una sola
 * sezione bloccata, stagger corti, e con `prefers-reduced-motion: reduce` non
 * parte nulla.
 */
export function MareSedici() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const callBarRef = useRef<HTMLDivElement>(null);

  useDocumentMeta(
    "Mare 16 · Ristorante di pesce a Viareggio",
    "Trenta coperti sulla darsena di Viareggio. Crudi, spaghetto alle arselle, cacciucco il giovedì. Si prenota al 0584 000016.",
    // Locale inventato per la dimostrazione: fuori dagli indici, o Google
    // finirebbe per proporlo come un ristorante vero.
    { noindex: true },
  );

  // Movimento della barra di chiamata: identico in tutte le demo.
  useCallBarReveal(rootRef, callBarRef);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES.motion, () => {
        // Apertura. I caratteri ruotano su sé stessi entrando: è il preset
        // "Stagger List / Complex" della skill, tenuto sotto le otto parole.
        const split = new SplitText(q("[data-title-line]"), { type: "chars" });
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

        intro
          .from(split.chars, {
            yPercent: 110,
            rotateX: -40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.015,
          })
          .from(
            q("[data-intro]"),
            { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 },
            0.3,
          )
          .from(
            q("[data-hero-shot]"),
            { clipPath: "inset(100% 0% 0% 0%)", duration: 1, ease: "expo.inOut" },
            0.15,
          )
          .from(
            q("[data-stamp]"),
            { scale: 0.9, rotate: -14, opacity: 0, duration: 0.5 },
            0.95,
          );

        // Reveal legati allo scorrimento: y corto, così si leggono come una
        // dissolvenza e non come uno scivolamento.
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

        // Liste in stagger: mai più di otto figli per volta, oltre si sente il
        // ritardo sugli ultimi.
        const lists = q("[data-list]").map((list) =>
          gsap.from(list.children, {
            opacity: 0,
            y: 24,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: list, start: "top 85%", once: true },
          }),
        );

        // Frase che si accende parola per parola, agganciata allo scorrimento.
        // Parte già leggibile: cambia solo il colore, mai l'opacità a zero.
        const statement = gsap.from(q("[data-word]"), {
          color: "rgba(242, 248, 249, 0.22)",
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: q("[data-statement]")[0],
            start: "top 78%",
            end: "bottom 62%",
            scrub: 0.8,
          },
        });

        // Sezione prenotazioni: il fondo sale e il contenuto lo segue.
        const book = gsap.timeline({
          scrollTrigger: { trigger: q("[data-book]")[0], start: "top 78%", once: true },
        });
        book
          .from(q("[data-book-bg]"), { scaleY: 0, duration: 0.7, ease: "expo.inOut" })
          .from(
            q("[data-book-item]"),
            { y: 24, opacity: 0, duration: 0.5, stagger: 0.08 },
            0.35,
          );

        // Barra in alto: sparisce scendendo, torna appena si risale.
        const bar = barRef.current;
        const barTrigger = ScrollTrigger.create({
          start: 120,
          end: "max",
          onUpdate: (self) => {
            if (!bar) return;
            gsap.to(bar, {
              yPercent: self.direction === 1 ? -100 : 0,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            if (bar) gsap.set(bar, { yPercent: 0 });
          },
        });


        return () => {
          intro.kill();
          split.revert();
          barTrigger.kill();
          statement.scrollTrigger?.kill();
          statement.kill();
          book.scrollTrigger?.kill();
          book.kill();
          for (const tween of [...reveals, ...lists]) {
            tween.scrollTrigger?.kill();
            tween.kill();
          }
        };
      });

      // Blocchi legati allo scorrimento, solo da desktop: il pin su mobile
      // combatte con lo scorrimento nativo, e una sola sezione lo usa.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1000px)", () => {
        // Foto e logotipo si muovono a velocità diverse: è la profondità che
        // separa i due piani.
        const parallax = gsap.timeline({
          scrollTrigger: {
            trigger: q("[data-hero]")[0],
            start: "top top",
            end: "+=60%",
            scrub: 1,
          },
        });
        parallax
          .to(q("[data-hero-shot]"), { yPercent: -14, ease: "none" }, 0)
          .to(q("[data-wordmark]"), { yPercent: 28, ease: "none" }, 0);

        // Galleria: la sezione resta ferma e il nastro scorre in orizzontale
        // per la sua larghezza reale, misurata dal DOM.
        const track = q("[data-gallery-track]")[0] as HTMLElement | undefined;
        const gallery = track
          ? gsap.to(track, {
              x: () => -(track.scrollWidth - track.clientWidth),
              ease: "none",
              scrollTrigger: {
                trigger: q("[data-gallery]")[0],
                start: "top top",
                end: () => `+=${track.scrollWidth - track.clientWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            })
          : null;

        return () => {
          parallax.scrollTrigger?.kill();
          parallax.kill();
          gallery?.scrollTrigger?.kill();
          gallery?.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div className={styles.page} ref={rootRef} lang="it">
      <header className={styles.bar} ref={barRef}>
        <div className={`${styles.inner} ${styles.barInner}`}>
          <span className={styles.brand}>
            Mare <span>16</span>
          </span>

          <div className={styles.barRight}>
            <nav className={styles.barNav} aria-label="Navigazione della pagina">
              <a href="#lavagna">La lavagna</a>
              <a href="#menu">Carta</a>
              <a href="#locale">Il locale</a>
            </nav>

            <a className={styles.barPhone} href="tel:+390584000016">
              <PhoneIcon className={styles.icon} />
              0584 000016
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className={`${styles.inner} ${styles.hero}`} data-hero>
          <div>
            <p className={`${styles.eyebrow} ${styles.label}`} data-intro>
              Darsena di Viareggio · dal 2016
            </p>

            <h1 className={styles.title}>
              {TITLE_LINES.map((line) => (
                <span key={line.text} className={styles.titleLine}>
                  <span
                    className={line.accent ? styles.titleAccent : undefined}
                    data-title-line
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>

            <p className={styles.lead} data-intro>
              Compriamo al mercato alle sei, decidiamo la carta alle undici, apriamo
              alle sette e mezza. Quello che c'è scritto sulla lavagna è quello che è
              arrivato oggi.
            </p>

            <div className={styles.actions} data-intro>
              <a className={styles.primary} href="tel:+390584000016">
                <PhoneIcon className={styles.icon} />
                Prenota al telefono
              </a>
              <a className={styles.textLink} href="#menu">
                Prima guardo la carta
              </a>
            </div>

            <p className={styles.heroNote} data-intro>
              <ClockIcon className={styles.icon} />
              Chiuso il lunedì. Ad agosto siamo aperti tutti i giorni.
            </p>
          </div>

          <div className={styles.heroMedia}>
            <p className={styles.wordmark} data-wordmark aria-hidden="true">
              Mare 16
            </p>
            <div
              className={`${styles.shot} ${styles.heroShot}`}
              data-hero-shot
              data-caption="la sala, tavolo 4"
              aria-hidden="true"
            />
            <p className={styles.stamp} data-stamp>
              Il giovedì c'è il cacciucco.
              <br />
              Meglio arrivare presto.
            </p>
          </div>
        </section>

        <section id="lavagna" className={`${styles.inner} ${styles.board}`}>
          <div className={styles.boardCard} data-reveal>
            <div className={styles.boardHead}>
              <h2 className={styles.boardTitle}>La lavagna di oggi</h2>
              <span className={styles.label}>aggiornata alle 11:20</span>
            </div>

            <ul className={styles.boardList} data-list>
              {BOARD.map((item) => (
                <li key={item.dish}>
                  <span>{item.dish}</span>
                  <span className={styles.boardPrice}>{item.price}</span>
                </li>
              ))}
            </ul>

            <p className={styles.boardNote}>
              s.q. vuol dire secondo quantità: il pescato si pesa al tavolo, otto euro
              all'etto. Se una cosa finisce, la cancelliamo e basta.
            </p>
          </div>
        </section>

        <section id="menu" className={styles.menu}>
          <div className={`${styles.inner} ${styles.menuInner}`}>
            <div className={styles.menuIntro}>
              <h2 data-reveal>La carta</h2>
              <div data-reveal>
                <p>
                  Nove piatti fissi, più quello che porta la barca. Non facciamo carne,
                  non facciamo pizza, non abbiamo il menu turistico.
                </p>
                <p>
                  Per le intolleranze diteci pure tutto quando prenotate: quasi ogni
                  piatto ha una versione senza glutine, tranne la frittura.
                </p>
              </div>
            </div>

            <div>
              {MENU.map((group) => (
                <div key={group.group} className={styles.menuGroup}>
                  <h3 className={`${styles.menuGroupTitle} ${styles.label}`} data-reveal>
                    {group.group}
                  </h3>
                  <ul className={styles.dishes} data-list>
                    {group.dishes.map((dish) => (
                      <li key={dish.name} className={styles.dish}>
                        <span className={styles.dishName}>{dish.name}</span>
                        <span className={styles.dishPrice}>{dish.price}</span>
                        <span className={styles.dishNote}>{dish.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <p className={styles.menuFoot}>
                Coperto 3 euro, pane e focaccia inclusi. Il pesce servito crudo è
                abbattuto secondo il regolamento CE 853/2004. Lista degli allergeni al
                banco, chiedetela pure.
              </p>
            </div>
          </div>
        </section>

        <section id="locale" className={`${styles.inner} ${styles.about}`}>
          <div className={styles.aboutText}>
            <h2 className={styles.aboutTitle} data-reveal>
              Trenta coperti, una cucina sola
            </h2>

            <div data-reveal>
              <p>
                Mare 16 sta in una vecchia rimessa per barche in fondo alla darsena.
                Abbiamo tenuto il pavimento com'era, tolto il controsoffitto e messo
                dentro poco altro: dieci tavoli, luce bassa, il banco del crudo davanti
                alla cucina.
              </p>
              <p>
                Trenta persone per turno è il numero oltre il quale non riusciremmo più
                a pulire il pesce al momento. Da giugno a settembre il sabato si riempie
                con una settimana di anticipo, quindi conviene chiamare.
              </p>
              <p>
                Si arriva a piedi dal molo o con il 22 dalla stazione. Parcheggio
                pubblico a duecento metri, gratis dopo le 20.
              </p>
            </div>
          </div>

          <div className={styles.aboutMedia}>
            <div
              className={`${styles.shot} ${styles.aboutShotTall}`}
              data-reveal
              data-caption="il banco del crudo"
              aria-hidden="true"
            />
            <div
              className={`${styles.shot} ${styles.aboutShotWide}`}
              data-reveal
              data-caption="darsena, ore 6"
              aria-hidden="true"
            />
          </div>
        </section>

        <section className={`${styles.inner} ${styles.statement}`} data-statement>
          <blockquote className={styles.statementText}>
            {STATEMENT.split(" ").map((word, index) => (
              <span key={`${word}-${index}`} className={styles.statementWord} data-word>
                {word}{" "}
              </span>
            ))}
            <span className={styles.statementWho}>Marco, in cucina dal 2016</span>
          </blockquote>
        </section>

        <section className={styles.gallery} aria-label="Il locale in cinque scatti" data-gallery>
          <div className={`${styles.inner} ${styles.galleryHead}`} data-reveal>
            <h2 className={styles.galleryTitle}>Cinque scatti, niente ritocchi</h2>
            <span>Foto di Sara Bertelli, marzo</span>
          </div>

          <div className={`${styles.inner}`}>
            {/* Area scorrevole col dito su mobile: con tabIndex la si scorre
                anche da tastiera, che altrimenti non potrebbe raggiungerla. */}
            <div
              className={styles.galleryTrack}
              data-gallery-track
              tabIndex={0}
              role="group"
              aria-label="Scatti del locale, striscia scorrevole"
            >
              {GALLERY.map((caption) => (
                <div
                  key={caption}
                  className={`${styles.shot} ${styles.galleryItem}`}
                  data-caption={caption}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.inner} ${styles.reviews}`} aria-label="Recensioni">
          <div className={styles.reviewsHead} data-reveal>
            <h2 className={styles.reviewsTitle}>Cosa dicono, senza filtri</h2>
            <span>4,7 su 5 · 312 recensioni tra Google e TheFork</span>
          </div>

          <ul className={styles.reviewList} data-list>
            {REVIEWS.map((review) => (
              <li key={review.who} className={styles.review}>
                <Stars />
                <p className={styles.reviewText}>{review.text}</p>
                <p className={styles.reviewWho}>
                  <span>{review.who}</span>
                  <span>{review.source}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="prenota" className={styles.book} data-book>
          <div className={styles.bookBackground} data-book-bg />

          <div className={`${styles.inner} ${styles.bookInner}`}>
            <div data-book-item>
              <h2 className={styles.bookTitle}>Si prenota telefonando</h2>
              <p className={styles.bookText}>
                Rispondiamo dalle 10 alle 22, anche il lunedì che siamo chiusi. Non
                usiamo moduli online: preferiamo sapere in quanti siete e a che ora
                arrivate.
              </p>
              <a className={styles.bookPhone} href="tel:+390584000016">
                <PhoneIcon className={styles.icon} />
                0584 000016
              </a>
              <a className={styles.bookMail} href="mailto:tavoli@mare16.it">
                Per gruppi oltre otto persone: tavoli@mare16.it
              </a>
            </div>

            <div data-book-item>
              <dl className={styles.hours}>
                <div>
                  <dt>Martedì, mercoledì, venerdì</dt>
                  <dd>19:30 · 23:00</dd>
                </div>
                <div>
                  <dt>Giovedì, giorno del cacciucco</dt>
                  <dd>19:00 · 23:00</dd>
                </div>
                <div>
                  <dt>Sabato e domenica</dt>
                  <dd>12:30 · 15:00 · 19:30 · 23:30</dd>
                </div>
                <div>
                  <dt>Lunedì</dt>
                  <dd>chiuso</dd>
                </div>
              </dl>
              <p className={styles.hoursNote}>
                <ClockIcon className={styles.icon} />
                Orari verificati il 20 agosto. La cucina chiude mezz'ora prima della
                sala. Via della Darsena 16, Viareggio.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.inner} ${styles.footerInner}`}>
          <span>
            Mare 16 di Marco Bertelli · Via della Darsena 16, Viareggio (LU) · P.IVA
            00000000000
          </span>
          <span>
            Landing dimostrativa. Design e sviluppo{" "}
            <Link to={paths.home("it")}>Nicola Marmugi</Link>
          </span>
        </div>
      </footer>

      {/* Barra di chiamata sul telefono: il gesto principale resta sotto il
          pollice per tutta la pagina. */}
      <div className={styles.callBar} ref={callBarRef}>
        <a className={styles.callBarPhone} href="tel:+390584000016">
          <PhoneIcon className={styles.icon} />
          Prenota ora
        </a>
        <a
          className={styles.callBarMap}
          href="https://maps.google.com/?q=Via+della+Darsena+16+Viareggio"
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
