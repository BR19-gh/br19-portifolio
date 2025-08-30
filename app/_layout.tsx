import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ThemeProviderCustom, useThemeCustom } from "@/contexts/ThemeContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "../global.css";
import i18n from "@/localization";
import { getLocales } from "expo-localization";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import { ImageBackground } from "react-native";
import { Stack } from "expo-router";
import { WindowWidthProvider } from "@/contexts/WindowWidthContext";
import { NavigationProvider } from "@/contexts/NavigationContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const defaultLocale = getLocales()[0]?.languageCode || "en";
  i18n.locale = defaultLocale;
  i18n.enableFallback = true;

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Saudi: require("../assets/fonts/Saudi-Regular.otf"),
    SaudiBold: require("../assets/fonts/Saudi-Bold.otf"),
    Handjet: require("../assets/fonts/Handjet-Regular.ttf"),
    HandjetSemiBold: require("../assets/fonts/Handjet-SemiBold.ttf"),
    HandjetBold: require("../assets/fonts/Handjet-Bold.ttf"),

    ...FontAwesome.font,
  });

  const [styleLoaded, setStyleLoaded] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      setStyleLoaded(true);
    }
  }, [loaded]);

  if (!loaded || !styleLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProviderCustom>
      <InnerLayout />
    </ThemeProviderCustom>
  );
}

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

function InnerLayout() {
  document.body.style.overflow = "auto";
  const { colorScheme } = useThemeCustom();
  useEffect(() => {
    if (typeof document !== "undefined" && document.body) {
      if (colorScheme === "dark") {
        // document.body.style.backgroundImage = `url(/assets/assets/images/backgroundDark.6af512e76c9fdefe71bd503f270d2527.jpg)`;
        document.body.style.backgroundImage = `url(/assets/assets/images/backgroundDark.jpg)`;
      } else {
        // document.body.style.backgroundImage = `url(/assets/assets/images/backgroundLight.e11d4362fa0b0722d848ac4eda377258.jpg)`;
        document.body.style.backgroundImage = `url(/assets/assets/images/backgroundLight.jpg)`;
      }
    }
  }, [colorScheme]);

  return (
    <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ImageBackground
          imageStyle={{
            resizeMode: "cover",
            position: "absolute",
            width: window.innerWidth,
            height: window.innerHeight,
          }}
        >
          <LocalizationProvider>
            <WindowWidthProvider>
              <NavigationProvider>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack>
              </NavigationProvider>
            </WindowWidthProvider>
          </LocalizationProvider>
        </ImageBackground>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
