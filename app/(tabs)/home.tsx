import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useLocaleAlignment } from "@/hooks";
import { TextDirection } from "@/hooks/useLocaleAlignment";
import i18n from "@/localization";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Tilt } from "@jdion/tilt-react";
import { Sticker } from "@/assets/images";
import { Image } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { XStack } from "@/components/common";
import { s, vs } from "react-native-size-matters";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  LucideArrowLeftCircle,
  LucideArrowRightCircle,
} from "lucide-react-native";
import { router } from "expo-router";
import { AccountButton } from "@/components/tab";
import { ACCOUNTS } from "@/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useWindowWidth } from "@/contexts/WindowWidthContext";
import Head from "expo-router/head";

const CustomHeading = (props: any) => (
  <Heading {...props} className={`font-saudi ${props.className || ""}`}>
    {props.children}
  </Heading>
);

export default function Home() {
  const { language } = useLocalization();
  const { isPC, isPhone, isTablet } = useWindowWidth();
  const textDir = useLocaleAlignment("textDir", language);
  return (
    <Center
      className={isPC ? "scale-125" : "scale-100"}
      style={{
        marginTop: isPC ? 150 : 20,
        direction: textDir as TextDirection,
      }}
    >
      <Head>
        <title>{i18n.t("tab.home")} | BR19.me</title>
      </Head>
      <XStack className={isPC ? "gap-48" : "gap-20"}>
        <VStack className={isPhone || isTablet ? "gap-3" : "gap-4"}>
          <CustomHeading size="5xl">{i18n.t("home.header")}</CustomHeading>
          <CustomHeading size="3xl">{i18n.t("home.title")}</CustomHeading>
          <HStack className="gap-2">
            <CustomHeading size="xl">{i18n.t("home.subtitle")}</CustomHeading>
            <Heading
              id="typewriter"
              size="lg"
              style={{
                direction: textDir as TextDirection,
                fontWeight: 100,
                letterSpacing: 1,
              }}
              className="font-handjet-bold text-primary-400 mt-0.5"
            >
              <Typewriter
                words={[i18n.t("home.position1"), i18n.t("home.position2")]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={30}
                delaySpeed={1000}
              />
            </Heading>
          </HStack>
          <Button
            size="xl"
            action="primary"
            className="w-40 gap-3 rounded-lg  hover:text-white "
            onPress={() => {
              router.navigate(`/(tabs)/aboutMe`);
            }}
          >
            <Text size="2xl" className="font-saudi text-white hover:text-white">
              {i18n.t("home.aboutMe")}
            </Text>
            <ButtonIcon
              as={
                language === "ar"
                  ? LucideArrowLeftCircle
                  : LucideArrowRightCircle
              }
              color={"white"}
            />
          </Button>
          <HStack className="gap-3">
            {ACCOUNTS.map((account) => (
              <AccountButton
                key={account.name}
                link={account.link}
                icon={account.icon as keyof typeof FontAwesome.glyphMap}
              />
            ))}
          </HStack>
        </VStack>
        <Tilt
          className={
            "flex h-72 w-72 content-center items-center justify-center rounded-xl bg-gradient-to-r from-primary-800 to-primary-400" +
            (isPhone ? " mt-16" : "")
          }
          style={{
            boxShadow: "0 48px 60px 0 rgba(2,14,26,.24)",
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            source={Sticker}
            style={{
              width: 280,
              height: 280,
              transform: "translateZ(60px)",
            }}
          />
        </Tilt>
      </XStack>
    </Center>
  );
}
