import { useContext } from "react";
import { I18nContext, type I18nContextValue } from "./I18nContext";

/** Accesso al dizionario della lingua attiva. Fallisce presto se manca il provider. */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n deve essere usato dentro <I18nProvider>");
  }
  return context;
}
