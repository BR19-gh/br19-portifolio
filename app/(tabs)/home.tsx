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
import { Button, ButtonIcon } from "@/components/ui/button";
import {
  LucideArrowLeftCircle,
  LucideArrowRightCircle,
} from "lucide-react-native";
import { AccountButton } from "@/components/home/account-button";
import { ACCOUNTS } from "@/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useWindowWidth } from "@/contexts/WindowWidthContext";
import Head from "expo-router/head";
import styles from "@/app/(tabs)/styles";
import { useNavigationContext } from "@/contexts/NavigationContext";

export default function Home() {
  const { language } = useLocalization();
  const { isPC, isPhone, isTablet } = useWindowWidth();
  const textDir = useLocaleAlignment("textDir", language);
  const { handleNavigate } = useNavigationContext();

  const CustomHeading = (props: any) => (
    <Heading {...props} className={`font-saudi ${props.className || ""}`}>
      {props.children}
    </Heading>
  );

  const CustomText = (props: any) => (
    <Text
      {...props}
      className={`${language === "ar" ? "font-saudi text-2xl" : "text-md"} ${
        props.className || ""
      }`}
    >
      {props.children}
    </Text>
  );

  return (
    <Center
      className={isPhone ? "scale-90" : "scale-100"}
      style={styles.homeContainer(isPC, textDir as TextDirection)}
    >
      <Head>
        <title>{i18n.t("head.home")} | BR19.me</title>
      </Head>
      <XStack className={isPC ? "gap-48 scale-125" : "gap-20"}>
        <VStack space={"md"}>
          <CustomHeading size="5xl" className={isPhone ? "-mt-5" : "mt-1"}>
            {i18n.t("home.header")}
          </CustomHeading>
          <CustomHeading size="3xl">{i18n.t("home.title")}</CustomHeading>
          <HStack space="sm">
            <CustomHeading size="xl">{i18n.t("home.subtitle")}</CustomHeading>
            <Heading
              id="typewriter"
              size="lg"
              style={styles.headingStyle(textDir as TextDirection)}
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
              handleNavigate(`/(tabs)/aboutMe`);
            }}
          >
            <CustomText className="text-white">
              {i18n.t("home.aboutMe")}
            </CustomText>
            <ButtonIcon
              as={
                language === "ar"
                  ? LucideArrowLeftCircle
                  : LucideArrowRightCircle
              }
              color={"white"}
            />
          </Button>
          <HStack space="sm">
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
            (isPhone ? " mt-8" : "")
          }
          style={styles.tiltStyle}
        >
          <Image source={Sticker} style={styles.tiltImageStyle} />
        </Tilt>
      </XStack>
    </Center>
  );
}
