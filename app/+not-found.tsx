import { Link, router, Stack, Tabs, usePathname } from "expo-router";

import { Text } from "@/components/ui/text";
import i18n from "@/localization";
import { Image } from "@/components/ui/image";
import { Error404Dark, Error404Light } from "@/assets/images";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { CheckCircle, Globe, House, MinusCircle } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { useThemeCustom } from "@/contexts/ThemeContext";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { MenuItem, MenuItemLabel, Menu } from "@/components/ui/menu";
import CountryFlag from "react-native-country-flag";
import {
  Languages,
  SupportedLanguages,
  useLocalization,
} from "@/contexts/LocalizationContext";
import { Pressable } from "@/components/ui/pressable";
import {
  AnimatedWrapper,
  ChangeTheme,
  DrawerTabs,
  Logo,
} from "@/components/tab";
import { ms, s, vs } from "react-native-size-matters";
import useLocaleAlignment, {
  FlexAlignment,
  FlexDirection,
} from "@/hooks/useLocaleAlignment";
import React from "react";
import tabStyles from "@/app/(tabs)/styles";
import { useWindowWidth } from "@/contexts/WindowWidthContext";

export default function NotFoundScreen() {
  const { colorScheme, themedTextColor } = useThemeCustom();
  const { language, setLanguage, isLoading } = useLocalization();
  const dir = useLocaleAlignment("dir", language);
  const { isPhone } = useWindowWidth();
  const reverseFlex = useLocaleAlignment("reverseFlex", language);

  const pathname = usePathname();

  if (isLoading) return null;

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

  const content = () => (
    <VStack className="items-center gap-14 mt-7">
      <Image
        source={colorScheme === "dark" ? Error404Dark : Error404Light}
        size="2xl"
        className="scale-[2]"
      />
      <Text size="2xl">{i18n.t("404.subtitle")}</Text>
      <Button
        action="primary"
        size="xl"
        onPress={() => {
          router.navigate("/(tabs)/home");
        }}
      >
        <ButtonText className="text-white hover:text-white">
          {i18n.t("404.goHome")}
        </ButtonText>
        <ButtonIcon as={House} className="text-white" />
      </Button>
    </VStack>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: i18n.t("404.goHome"),
          headerShown: false,
          headerStyle: {},
          headerRight: () => (
            <HStack
              space="4xl"
              style={{
                padding: ms(12.5),
                flexDirection: dir as FlexDirection,
                gap: ms(45),
                alignItems: "center" as const,
              }}
            >
              <ChangeLanguage />
              <ChangeTheme />
            </HStack>
          ),
        }}
      />

      <AnimatedWrapper
        style={{
          marginTop: vs(35),
        }}
        key={pathname}
      >
        {content()}
      </AnimatedWrapper>
    </>
  );
}
