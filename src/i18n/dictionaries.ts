import type { Dictionary, Language } from "./i18n.types";
import { en } from "./locales/en";
import { it } from "./locales/it";

export const dictionaries: Record<Language, Dictionary> = { it, en };
