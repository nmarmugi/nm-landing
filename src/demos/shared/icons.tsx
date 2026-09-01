/**
 * Icone condivise dalle landing dimostrative.
 *
 * Sono SVG e non emoji: si colorano con `currentColor`, restano nitide a ogni
 * dimensione e non vengono lette dagli screen reader, perché accanto c'è
 * sempre un'etichetta di testo. La classe arriva da fuori: ogni demo ha la
 * propria misura e il proprio spessore di tratto.
 */
interface IconProps {
  className?: string;
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5c0-.6.4-1 1-1h3l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v3c0 .6-.4 1-1 1A16 16 0 0 1 4 5z" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function FireIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3c4 4 6 6.6 6 9.5a6 6 0 0 1-12 0C6 10 8 8.5 9 6c.6 1.8 1.6 2.6 3 3-.5-2 0-4 0-6z" />
    </svg>
  );
}
