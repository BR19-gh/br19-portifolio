import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { getItem, saveItem } from "@/services/StorageService";
import { useColorScheme } from "react-native";
import { THEME_STORAGE_KEY } from "@/constants/Keys";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  colorScheme: Theme;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderCustom = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<Theme>("system");
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await getItem(THEME_STORAGE_KEY);
      if (storedTheme === "light" || storedTheme === "dark") {
        setColorScheme(storedTheme as Theme);
      } else if (storedTheme === "system") {
        setColorScheme(
          systemColorScheme === "light" || systemColorScheme === "dark"
            ? systemColorScheme
            : "system"
        );
      }
    };
    loadTheme();
  }, []);

  const toggleColorScheme = useCallback(async () => {
    const newTheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newTheme);
    await saveItem(THEME_STORAGE_KEY, newTheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeCustom = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeCustom must be used within ThemeProviderCustom");
  }
  return context;
};
