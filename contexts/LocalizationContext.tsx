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
import { Center } from "@/components/ui/center";
import ClipLoader from "react-spinners/ClipLoader";
import colors from "tailwindcss/colors";

enum LanguagesEnum {
  ar = "ar",
  en = "en",
}

export type Languages = keyof typeof LanguagesEnum;
export const SupportedLanguages = Object.values(LanguagesEnum) as string[];

interface LocalizationContextType {
  language: Languages;
  setLanguage: (lang: Languages) => void;
  isLoading: boolean;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Languages>("en");
  const [isLoading, setIsLoading] = useState(true); // <-- changed from false to true

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await getItem(LANGUAGE_STORAGE_KEY);
      let finalLang: Languages = "en";

      if (
        storedLanguage &&
        SupportedLanguages.includes(storedLanguage as Languages)
      ) {
        finalLang = storedLanguage as Languages;
      } else {
        const defaultLocale = getLocales()[0]?.languageCode as Languages;
        if (SupportedLanguages.includes(defaultLocale)) {
          finalLang = defaultLocale;
        }
      }

      i18n.locale = finalLang; // ✅ set locale first
      setLanguageState(finalLang); // then update state
      setIsLoading(false);
    };

    loadLanguage();
  }, []);

  const setLanguage = async (lang: Languages) => {
    setIsLoading(true);
    i18n.locale = lang; // ✅ apply immediately
    setLanguageState(lang);
    await saveItem(LANGUAGE_STORAGE_KEY, lang);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, isLoading }}>
      {isLoading ? (
        <Center className="flex-1 justify-center items-center">
          <ClipLoader
            color={colors.indigo[500]}
            loading={isLoading}
            size={150}
            cssOverride={{
              display: "block",
              margin: "auto",
              marginTop: "260px",
            }}
          />
        </Center>
      ) : (
        children
      )}
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
