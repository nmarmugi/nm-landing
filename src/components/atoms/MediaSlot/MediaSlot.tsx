import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { cx } from "../../../utils/cx";
import styles from "./MediaSlot.module.css";
import type { MediaSlotProps } from "./MediaSlot.types";

const radiusClass = {
  media: styles.radiusMedia,
  mediaLg: styles.radiusMediaLg,
  none: styles.radiusNone,
} as const;

const ratioClass = {
  "16/10": styles.ratio1610,
  "3/4": styles.ratio34,
  auto: undefined,
} as const;

/**
 * Slot media. Con `video` rende un `<video>`, con `src` una `<img>` descritta
 * da `alt`; senza nessuno dei due resta il segnaposto a righe diagonali,
 * marcato `aria-hidden` perché non porta informazione: è impalcatura di layout
 * in attesa dell'asset reale.
 */
export function MediaSlot({
  src,
  video,
  alt,
  caption,
  fit = "cover",
  ratio = "auto",
  height,
  radius = "media",
  loading = "lazy",
  className,
  style,
}: MediaSlotProps) {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  /**
   * Un video "pigro" non scarica nulla finché non serve: in home ce ne sono
   * cinque, e partire tutti insieme vorrebbe dire decine di megabyte prima
   * ancora che l'utente scorra.
   */
  const lazyVideo = Boolean(video) && loading === "lazy" && !reducedMotion;

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !lazyVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.preload = "auto";
          // Il browser può rifiutare la riproduzione: non è un errore da urlare.
          void element.play().catch(() => undefined);
        } else {
          element.pause();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [lazyVideo]);

  const classes = cx(
    styles.slot,
    radiusClass[radius],
    ratioClass[ratio],
    fit === "contain" && styles.fitContain,
    fit === "natural" && styles.fitNatural,
    className,
  );
  const inlineStyle = height ? { height, ...style } : style;

  if (video) {
    // Muto e in ciclo: un video che parte da solo con l'audio è la cosa che
    // fa chiudere la pagina. Con movimento ridotto non parte affatto e
    // compaiono i comandi, così resta comunque guardabile.
    return (
      <div className={classes} style={inlineStyle}>
        <video
          ref={videoRef}
          className={styles.image}
          src={video}
          poster={src}
          aria-label={alt}
          muted
          playsInline
          autoPlay={!reducedMotion && !lazyVideo}
          loop={!reducedMotion}
          controls={reducedMotion}
          preload={lazyVideo ? "none" : "metadata"}
        />
      </div>
    );
  }

  if (src) {
    return (
      <div className={classes} style={inlineStyle}>
        <img className={styles.image} src={src} alt={alt} loading={loading} decoding="async" />
      </div>
    );
  }

  return (
    <div className={classes} style={inlineStyle} aria-hidden="true">
      {caption ? <span className={styles.caption}>{caption}</span> : null}
    </div>
  );
}
