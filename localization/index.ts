import { I18n } from "i18n-js";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import { getItem } from "@/services/StorageService";

const translations = {
  en,
  ar,
};

const i18n = new I18n(translations);
i18n.enableFallback;

export default i18n;
