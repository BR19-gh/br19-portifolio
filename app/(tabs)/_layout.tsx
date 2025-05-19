import React from "react";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { Text } from "react-native";
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
import tabStyles from "@/app/(tabs)/tab.styles";
import { s, ms } from "react-native-size-matters";
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

export default function TabLayout() {
  const { language, setLanguage } = useLocalization(); // استخدام context لاختيار اللغة
  const dir = useLocaleAlignment("dir", language);
  const reverseFlex = useLocaleAlignment("reverseFlex", language);
  const { colorScheme, themedTextColor } = useThemeCustom();
  const isDark = colorScheme === "dark";
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
                className={`${language === "ar" ? "font-saudi" : ""}`}
              >
                {i18n.t(`locale.${lang}`)}
              </MenuItemLabel>
            </MenuItem>
          );
        })}
      </Menu>
    );
  };

  const TabText = ({
    color,
    text,
    pressed,
  }: {
    color: string;
    text: string;
    pressed?: boolean;
  }) => (
    <Text
      className={
        (language === "ar" ? "text-xl" : "text-2xl") +
        (pressed
          ? ` ${language === "ar" ? "font-saudi-bold" : "font-bold"}`
          : ` ${language === "ar" ? "font-saudi" : ""}`)
      }
      style={{ color: color }}
    >
      {text}
    </Text>
  );

  return (
    <Tabs>
      <TabList
        style={{
          padding: ms(7),
          flexDirection: dir as FlexDirection,
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: isDark
            ? "rgba(18, 18, 18, 0.4)"
            : "rgba(255, 255, 255, 0.15)",
          borderTopWidth: s(1),
          borderTopColor: isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(20px)",
          gap: ms(20),
        }}
      >
        <Logo />

        {isPhone ? <DrawerTabs /> : null}
        <>
          <TabTrigger
            name="home"
            href="/home"
            style={tabStyles.tabText(
              pathname === "/home",
              isPhone,
              themedTextColor()
            )}
          >
            <TabText
              color={themedTextColor()}
              text={i18n.t("tab.home")}
              pressed={pathname === "/home"}
            />
          </TabTrigger>
          <TabTrigger
            name="aboutMe"
            href="/(tabs)/aboutMe"
            style={tabStyles.tabText(
              pathname === "/aboutMe",
              isPhone,
              themedTextColor()
            )}
          >
            <TabText
              color={themedTextColor()}
              text={i18n.t("tab.aboutMe")}
              pressed={pathname === "/aboutMe"}
            />
          </TabTrigger>
          <TabTrigger
            name="projects"
            href="/(tabs)/projects"
            style={tabStyles.tabText(
              pathname === "/projects",
              isPhone,
              themedTextColor()
            )}
          >
            <TabText
              color={themedTextColor()}
              text={i18n.t("tab.projects")}
              pressed={pathname === "/projects"}
            />
          </TabTrigger>
          <TabTrigger
            name="stats"
            href="/(tabs)/stats"
            style={tabStyles.tabText(
              pathname === "/stats",
              isPhone,
              themedTextColor()
            )}
          >
            <TabText
              color={themedTextColor()}
              text={i18n.t("tab.stats")}
              pressed={pathname === "/stats"}
            />
          </TabTrigger>
          <TabTrigger
            name="resume"
            href="/(tabs)/resume"
            style={tabStyles.tabText(
              pathname === "/resume",
              isPhone,
              themedTextColor()
            )}
          >
            <TabText
              color={themedTextColor()}
              text={i18n.t("tab.resume")}
              pressed={pathname === "/resume"}
            />
          </TabTrigger>
          <HStack
            style={{
              display: isPhone ? "none" : "flex",
              width: "100%",
              justifyContent: reverseFlex as FlexAlignment,
              padding: ms(5),
            }}
          >
            <HStack
              style={{
                display: isPhone ? "none" : "flex",
                flexDirection: dir as FlexDirection,
                gap: ms(45),
                alignItems: "center",
              }}
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
