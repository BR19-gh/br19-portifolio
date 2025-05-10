import React, { useEffect } from "react";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { Text, View } from "react-native";
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
import { ChangeTheme } from "@/components/Tab/change-theme";
import { DrawerTabs } from "@/components/Tab/drawer-tabs";
import { Logo } from "@/components/Tab";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { Globe } from "lucide-react-native";
import CountryFlag from "react-native-country-flag";

export default function TabLayout() {
  const { language, setLanguage } = useLocalization(); // استخدام context لاختيار اللغة
  const dir = useLocaleAlignment("dir", language);
  const reverseFlex = useLocaleAlignment("reverseFlex", language);
  const reverseDir = useLocaleAlignment("reverseDir", language);
  const { colorScheme } = useThemeCustom();
  const isDark = colorScheme === "dark";
  const themedTextColor = isDark ? "white" : "black";
  const pathname = usePathname();
  const [isWindowWidthSmall, setIsWindowWidthSmall] = React.useState(
    window.innerWidth <= 768
  );

  const ChangeLanguage: React.FC = () => {
    return (
      <Menu
        placement="top"
        disabledKeys={["none"]}
        trigger={({ ...triggerProps }) => {
          return (
            <Pressable variant="link" {...triggerProps}>
              <Icon as={Globe} size={"lg"} />
            </Pressable>
          );
        }}
      >
        {(Object.values(SupportedLanguages) as Languages[]).map((lang) => {
          return (
            <MenuItem
              className="justify-between"
              onPress={() => {
                const newLanguage: Languages = lang;
                setLanguage(newLanguage);
                console.log("language", newLanguage);
              }}
              key={lang}
            >
              <CountryFlag
                isoCode={i18n.t(`locale.isoCode.${lang}`)}
                size={14}
              />
              <MenuItemLabel size="sm">
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
      className="text-lg"
      style={{ color: color, fontWeight: pressed ? "bold" : "normal" }}
    >
      {text}
    </Text>
  );

  useEffect(() => {
    const handleResize = () => {
      setIsWindowWidthSmall(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          gap: ms(15),
        }}
      >
        <Logo />

        {isWindowWidthSmall ? <DrawerTabs /> : null}
        <>
          <TabTrigger
            name="home"
            href="/(tabs)"
            style={tabStyles.tabText(
              pathname === "/",
              isWindowWidthSmall,
              themedTextColor
            )}
          >
            <TabText
              color={themedTextColor}
              text={i18n.t("tab.home")}
              pressed={pathname === "/"}
            />
          </TabTrigger>
          <TabTrigger
            name="aboutMe"
            href="/(tabs)/aboutMe"
            style={tabStyles.tabText(
              pathname === "/aboutMe",
              isWindowWidthSmall,
              themedTextColor
            )}
          >
            <TabText
              color={themedTextColor}
              text={i18n.t("tab.aboutMe")}
              pressed={pathname === "/aboutMe"}
            />
          </TabTrigger>
          <TabTrigger
            name="projects"
            href="/(tabs)/projects"
            style={tabStyles.tabText(
              pathname === "/projects",
              isWindowWidthSmall,
              themedTextColor
            )}
          >
            <TabText
              color={themedTextColor}
              text={i18n.t("tab.projects")}
              pressed={pathname === "/projects"}
            />
          </TabTrigger>
          <TabTrigger
            name="stats"
            href="/(tabs)/stats"
            style={tabStyles.tabText(
              pathname === "/stats",
              isWindowWidthSmall,
              themedTextColor
            )}
          >
            <TabText
              color={themedTextColor}
              text={i18n.t("tab.stats")}
              pressed={pathname === "/stats"}
            />
          </TabTrigger>
          <TabTrigger
            name="resume"
            href="/(tabs)/resume"
            style={tabStyles.tabText(
              pathname === "/resume",
              isWindowWidthSmall,
              themedTextColor
            )}
          >
            <TabText
              color={themedTextColor}
              text={i18n.t("tab.resume")}
              pressed={pathname === "/resume"}
            />
          </TabTrigger>
          <HStack
            style={{
              display: isWindowWidthSmall ? "none" : "flex",
              width: "100%",
              justifyContent: reverseFlex as FlexAlignment,
              padding: ms(5),
            }}
          >
            <HStack
              style={{
                display: isWindowWidthSmall ? "none" : "flex",
                flexDirection: dir as FlexDirection,
                gap: ms(50),
                alignItems: "center",
              }}
            >
              <ChangeLanguage />
              <ChangeTheme />
            </HStack>
          </HStack>
        </>
      </TabList>
      <TabSlot />
    </Tabs>
  );
}
