import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getLocales } from "expo-localization";
import i18n from "../localization";
import { getItem, saveItem } from "@/services/StorageService";
import { LANGUAGE_STORAGE_KEY } from "@/constants/Keys";

enum LanguagesEnum {
  ar = "ar",
  en = "en",
}

export type Languages = keyof typeof LanguagesEnum;
export const SupportedLanguages = Object.values(LanguagesEnum) as string[];

interface LocalizationContextType {
  language: Languages;
  setLanguage: (lang: Languages) => void;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Languages>("en");

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await getItem(LANGUAGE_STORAGE_KEY);
      if (
        storedLanguage &&
        SupportedLanguages.includes(storedLanguage as Languages)
      ) {
        setLanguageState(storedLanguage as Languages);
        i18n.locale = storedLanguage as Languages;
      } else {
        const defaultLocale = getLocales()[0]?.languageCode as Languages;
        const initialLang = SupportedLanguages.includes(defaultLocale)
          ? defaultLocale
          : "en";
        setLanguageState(initialLang);
        i18n.locale = initialLang;
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: Languages) => {
    setLanguageState(lang);
    i18n.locale = lang;
    await saveItem(LANGUAGE_STORAGE_KEY, lang);
    window.location.reload();
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};
