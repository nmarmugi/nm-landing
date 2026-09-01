export interface AboutSectionProps {
  /** id della sezione, bersaglio del link "Chi sono". */
  id: string;
  titleId: string;
  /**
   * Livello del titolo. `h1` quando il blocco apre la propria pagina, `h2`
   * quando è una sezione fra altre: la gerarchia non deve saltare livelli.
   */
  headingLevel?: "h1" | "h2";
}
