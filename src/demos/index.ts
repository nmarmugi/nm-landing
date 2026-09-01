import type { ComponentType } from "react";
import { BraceriaDoni } from "./BraceriaDoni/BraceriaDoni";
import { FornoSalvini } from "./FornoSalvini/FornoSalvini";
import { GelateriaBruni } from "./GelateriaBruni/GelateriaBruni";
import { MareSedici } from "./MareSedici/MareSedici";
import { TrattoriaNardi } from "./TrattoriaNardi/TrattoriaNardi";

/**
 * Registro delle landing dimostrative. La chiave è lo slug in URL ed è la stessa
 * del progetto che la racconta, così `/it/lavori/<slug>` e `/it/demo/<slug>`
 * restano appaiati.
 */
export const demos: Record<string, ComponentType> = {
  "mare-sedici": MareSedici,
  "braceria-doni": BraceriaDoni,
  "trattoria-nardi": TrattoriaNardi,
  "gelateria-bruni": GelateriaBruni,
  "forno-salvini": FornoSalvini,
};
