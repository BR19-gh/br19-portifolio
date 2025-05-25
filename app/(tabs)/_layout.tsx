import React from "react";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { Text } from "@/components/ui/text";
import { useLocaleAlignment } from "@/hooks";
import {
  Languages,
  SupportedLanguages,
  useLocalization,
} from "@/contexts/LocalizationContext";
import { FlexAlignment, FlexDirection } from "@/hooks/useLocaleAlignment";
import { useThemeCustom } from "@/contexts/ThemeContext";
import { usePathname } from "expo-router";
import i18n from "@/localization";
import tabStyles from "@/app/(tabs)/styles";
import { HStack } from "@/components/ui/hstack";
import { ChangeTheme } from "@/components/tab/change-theme";
import { DrawerTabs } from "@/components/tab/drawer-tabs";
import { Logo } from "@/components/tab";
import AnimatedWrapper from "@/components/tab/animated-wrapper/animated-wrapper.screen";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { CheckCircle, Globe, MinusCircle } from "lucide-react-native";
import CountryFlag from "react-native-country-flag";
import { useWindowWidth } from "@/contexts/WindowWidthContext";
import styles from "@/app/(tabs)/styles";

export default function TabLayout() {
  const { language, setLanguage } = useLocalization(); // استخدام context لاختيار اللغة
  const dir = useLocaleAlignment("dir", language);
  const reverseFlex = useLocaleAlignment("reverseFlex", language);
  const { colorScheme, themedTextColor } = useThemeCustom();

  const pathname = usePathname();
  const { isPhone } = useWindowWidth();

  const ChangeLanguage: React.FC<{
    size?: "sm" | "md" | "lg" | "xl" | "2xs" | "xs";
  }> = ({ size }) => {
    return (
      <Menu
        placement="top"
        offset={10}
        disabledKeys={["none"]}
        trigger={({ ...triggerProps }) => {
          return (
            <Pressable variant="link" {...triggerProps}>
              <Icon as={Globe} size={size ? size : "lg"} />
            </Pressable>
          );
        }}
      >
        {(Object.values(SupportedLanguages) as Languages[]).map((lang) => {
          const isSelected = language === lang;
          return (
            <MenuItem
              className={"justify-between"}
              onPress={() => {
                const newLanguage: Languages = lang;
                setLanguage(newLanguage);
                console.log("language", newLanguage);
              }}
              key={lang}
            >
              <Icon
                as={isSelected ? CheckCircle : MinusCircle}
                className={isSelected ? "text-success-500" : ""}
                size="xs"
              />
              <CountryFlag
                isoCode={i18n.t(`locale.isoCode.${lang}`)}
                size={14}
              />

              <MenuItemLabel
                size="sm"
                className={`${language === "ar" && "font-saudi"}`}
              >
                {i18n.t(`locale.${lang}`)}
              </MenuItemLabel>
            </MenuItem>
          );
        })}
      </Menu>
    );
  };

  const TabText = ({ color, text }: { color: string; text: string }) => (
    <Text
      size="xl"
      style={{ color: color }}
      className={`${language === "ar" && "font-saudi text-2xl"}`}
    >
      {text}
    </Text>
  );

  return (
    <Tabs>
      <TabList
        style={
          tabStyles.container(
            colorScheme,
            dir as FlexDirection
          ) as import("react-native").ViewStyle
        }
      >
        <Logo />

        {isPhone ? <DrawerTabs /> : null}
        <>
          <TabTrigger
            name="home"
            href="/home"
            style={tabStyles.tabText(isPhone)}
          >
            <TabText
              color={themedTextColor(pathname === "/home")}
              text={i18n.t("tab.home")}
            />
          </TabTrigger>
          <TabTrigger
            name="aboutMe"
            href="/(tabs)/aboutMe"
            style={tabStyles.tabText(isPhone)}
          >
            <TabText
              color={themedTextColor(pathname === "/aboutMe")}
              text={i18n.t("tab.aboutMe")}
            />
          </TabTrigger>
          <TabTrigger
            name="projects"
            href="/(tabs)/projects"
            style={tabStyles.tabText(isPhone)}
          >
            <TabText
              color={themedTextColor(pathname === "/projects")}
              text={i18n.t("tab.projects")}
            />
          </TabTrigger>
          <TabTrigger
            name="stats"
            href="/(tabs)/stats"
            style={tabStyles.tabText(isPhone)}
          >
            <TabText
              color={themedTextColor(pathname === "/stats")}
              text={i18n.t("tab.stats")}
            />
          </TabTrigger>
          <TabTrigger
            name="resume"
            href="/(tabs)/resume"
            style={tabStyles.tabText(isPhone)}
          >
            <TabText
              color={themedTextColor(pathname === "/resume")}
              text={i18n.t("tab.resume")}
            />
          </TabTrigger>
          <HStack
            style={tabStyles.optionsContainer(
              isPhone,
              reverseFlex as FlexAlignment
            )}
          >
            <HStack
              style={styles.optionsInnerContainer(
                isPhone,
                dir as FlexDirection
              )}
            >
              <ChangeLanguage />
              <ChangeTheme />
            </HStack>
          </HStack>
        </>
      </TabList>
      <AnimatedWrapper key={pathname}>
        <TabSlot />
      </AnimatedWrapper>
    </Tabs>
  );
}
