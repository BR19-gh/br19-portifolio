import { I18n } from "i18n-js";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const translations = {
  en,
  ar,
};

const i18n = new I18n(translations);

i18n.enableFallback = true; // ✅ this actually enables fallback
i18n.defaultLocale = "en"; // ✅ this forces "en" as the default base

export default i18n;
