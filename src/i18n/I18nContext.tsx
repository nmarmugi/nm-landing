import { createContext, useCallback, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { dictionaries } from "./dictionaries";
import { LANGUAGE_TAGS, type Dictionary, type Language } from "./i18n.types";

export interface I18nContextValue {
  lang: Language;
  /** Dizionario completo della lingua attiva. */
  t: Dictionary;
  /** Interpolazione semplice: `format("{a} / {b}", { a: 1, b: 4 })`. */
  format: (template: string, values: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export interface I18nProviderProps {
  lang: Language;
  children: ReactNode;
}

export function I18nProvider({ lang, children }: I18nProviderProps) {
  const format = useCallback(
    (template: string, values: Record<string, string | number>) =>
      template.replace(/\{(\w+)\}/g, (match, key: string) =>
        key in values ? String(values[key]) : match,
      ),
    [],
  );

  // L'attributo `lang` deve seguire la lingua attiva: è quello che gli screen
  // reader usano per scegliere la pronuncia.
  useEffect(() => {
    document.documentElement.lang = LANGUAGE_TAGS[lang];
    window.localStorage?.setItem("nm-lang", lang);
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({ lang, t: dictionaries[lang], format }),
    [lang, format],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
