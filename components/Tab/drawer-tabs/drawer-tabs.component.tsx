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
import { View, ViewProps } from "react-native";
import { HStack } from "@/components/ui/hstack";
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
  Code2Icon,
  Globe,
  X,
  MenuIcon,
  User,
  CheckCircle,
  MinusCircle,
} from "lucide-react-native";
import { NavigateButtonProps } from "./drawer-tabs.types";
import { useNavigationContext } from "@/contexts/NavigationContext";

function DrawerTabs(
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<View> &
    Readonly<ViewProps>
) {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const { language, setLanguage } = useLocalization();
  const dir = useLocaleAlignment("dir", language);
  const reverseDir = useLocaleAlignment("reverseDir", language);
  const { themedTextColor } = useThemeCustom();
  const { activeRoute, handleNavigate } = useNavigationContext();

  const ChangeLanguage: React.FC<{
    size?: "sm" | "md" | "lg" | "xl" | "2xs" | "xs";
  }> = ({ size }) => {
    return (
      <Menu
        placement="top"
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

  const NavigateButton: React.FC<NavigateButtonProps> = ({
    text,
    icon,
    route,
  }) => {
    const pressed = activeRoute === route;

    return (
      <Button
        onPress={() => {
          handleNavigate(route);
          setTimeout(() => {
            setShowDrawer(false);
          }, 0);
        }}
        className="w-full h-32 flex-wrap items-center rounded-xl p-3 justify-around"
        style={{
          flexDirection: dir as FlexDirection,
        }}
        size="xl"
        action={activeRoute === route ? "primary" : "secondary"}
      >
        <ButtonText
          className={
            "text-4xl " +
            (pressed
              ? `${language === "ar" ? "font-saudi-bold" : "font-bold"}`
              : `${language === "ar" && "font-saudi"}`)
          }
          style={{ color: themedTextColor(true) }}
        >
          {i18n.t(text)}
        </ButtonText>
        <ButtonIcon
          as={icon}
          className="w-12 h-12"
          style={{ color: themedTextColor(true) }}
        />
      </Button>
    );
  };

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
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          setShowDrawer(true); // Open the drawer
        }}
      >
        <Icon
          as={MenuIcon}
          size="xl"
          style={{ color: themedTextColor(true) }}
        />
      </Button>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false); // Close the drawer
        }}
        size="full"
        anchor={"right"}
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader
            className="mb-5"
            style={{ flexDirection: dir as FlexDirection }}
          >
            <Heading
              size="2xl"
              className={`${language === "ar" && "font-saudi"}`}
            >
              {i18n.t("tab.navigateTo")}
            </Heading>
            <HStack
              className="gap-10"
              style={{
                flexDirection: reverseDir as FlexDirection,
              }}
            >
              <ChangeTheme size="xl" />
              <ChangeLanguage size="xl" />
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <ButtonGroup
              flexDirection="row"
              className="flex-wrap justify-center gap-3"
            >
              <NavigateButton
                text="tab.home"
                icon={House}
                route="/(tabs)/home"
              />
              <NavigateButton
                text="tab.aboutMe"
                icon={User}
                route="/(tabs)/aboutMe"
              />
              <NavigateButton
                text="tab.projects"
                icon={Code2Icon}
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
              className="flex-1 rounded-xl h-14"
              size="xl"
            >
              <Icon
                className="w-12 h-12"
                as={X}
                color={themedTextColor(true)}
              />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
}

export default DrawerTabs;
