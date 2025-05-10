import React from "react";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { View, ViewProps, Text } from "react-native";
import { HStack } from "@/components/ui/hstack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router"; // Import useRouter
import { useThemeCustom } from "@/contexts/ThemeContext";
import useLocaleAlignment, { FlexDirection } from "@/hooks/useLocaleAlignment";
import {
  Languages,
  SupportedLanguages,
  useLocalization,
} from "@/contexts/LocalizationContext";
import { ChangeTheme } from "../change-theme";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import CountryFlag from "react-native-country-flag";
import i18n from "@/localization";
import {
  House,
  FileText,
  BarChart,
  Code,
  LucideIcon,
  Globe,
  X,
  MenuIcon,
  User,
} from "lucide-react-native";

function DrawerTabs(
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<View> &
    Readonly<ViewProps>
) {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const { language, setLanguage } = useLocalization();
  const dir = useLocaleAlignment("dir", language);
  const reverseDir = useLocaleAlignment("reverseDir", language);
  const { colorScheme } = useThemeCustom();
  const isDark = colorScheme === "dark";
  const themedTextColor = isDark ? "white" : "black";
  const router = useRouter();

  const handleNavigate = (
    route:
      | "/(tabs)"
      | "/(tabs)/aboutMe"
      | "/(tabs)/projects"
      | "/(tabs)/stats"
      | "/(tabs)/resume"
  ) => {
    router.push(route);
    setShowDrawer(false); // Close the drawer after navigation
  };

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

  interface NavigateButtonProps {
    text: string;
    icon: LucideIcon;
    route:
      | "/(tabs)"
      | "/(tabs)/aboutMe"
      | "/(tabs)/projects"
      | "/(tabs)/stats"
      | "/(tabs)/resume";
  }

  const NavigateButton: React.FC<NavigateButtonProps> = ({
    text,
    icon,
    route,
  }) => (
    <Button
      onPress={() => handleNavigate(route)}
      className="w-full h-32 flex-wrap items-center rounded-xl p-3 justify-around"
      style={{
        flexDirection: dir as FlexDirection,
      }}
      size="xl"
      action="secondary"
    >
      <ButtonText className="text-2xl" style={{ color: themedTextColor }}>
        {i18n.t(text)}
      </ButtonText>
      <ButtonIcon
        as={icon}
        className="w-10 h-10"
        style={{ color: themedTextColor }}
      />
    </Button>
  );

  return (
    <HStack
      style={{
        width: "100%",
        flexDirection: dir as FlexDirection,
        justifyContent: "flex-end",
      }}
      {...props}
    >
      <Button
        action="secondary"
        size="sm"
        onPress={() => {
          setShowDrawer(true); // Open the drawer
        }}
      >
        <Icon as={MenuIcon} style={{ color: themedTextColor }} />
      </Button>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false); // Close the drawer
        }}
        size="lg"
        anchor={"right"}
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader style={{ flexDirection: dir as FlexDirection }}>
            <Heading size="xl">{i18n.t("tab.navigateTo")}</Heading>
            <HStack
              className="gap-10"
              style={{
                flexDirection: reverseDir as FlexDirection,
              }}
            >
              <ChangeTheme />
              <ChangeLanguage />
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <ButtonGroup
              flexDirection="row"
              className="flex-wrap justify-center gap-3"
            >
              <NavigateButton text="tab.home" icon={House} route="/(tabs)" />
              <NavigateButton
                text="tab.aboutMe"
                icon={User}
                route="/(tabs)/aboutMe"
              />
              <NavigateButton
                text="tab.projects"
                icon={Code}
                route="/(tabs)/projects"
              />
              <NavigateButton
                text="tab.stats"
                icon={BarChart}
                route="/(tabs)/stats"
              />
              <NavigateButton
                text="tab.resume"
                icon={FileText}
                route="/(tabs)/resume"
              />
            </ButtonGroup>
          </DrawerBody>

          <DrawerFooter
            style={{
              position: "sticky",
              bottom: -25,
              height: 100,
              paddingBottom: 10,
              paddingHorizontal: 20,
              overflowX: "hidden",

              backdropFilter: "blur(16px)",
            }}
            className="flex-row items-center justify-around rounded-t-xl"
          >
            <Button
              onPress={() => {
                setShowDrawer(false);
              }}
              className="flex-1 rounded-xl"
              size="xl"
            >
              <Icon className="w-10" as={X} color={themedTextColor} />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
}

export default DrawerTabs;
