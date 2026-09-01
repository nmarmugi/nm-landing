export interface MetricItemProps {
  /** Valore finale del contatore. */
  value: number;
  /** Suffisso non animato: "s", "fps", "%", "k". */
  suffix?: string;
  /** Decimali da mostrare (1 per "1.4s"). */
  decimals?: number;
  label: string;
}
