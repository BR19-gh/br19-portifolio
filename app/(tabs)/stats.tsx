import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useWindowWidth } from "@/contexts/WindowWidthContext";
import i18n from "@/localization";
import Head from "expo-router/head";
import { Icon } from "@/components/ui/icon";
import React from "react";
import { BarChart } from "lucide-react-native";

export default function Home() {
  const { isPhone } = useWindowWidth();
  const { language } = useLocalization();

  const CustomHeading = (props: any) => (
    <Heading
      {...props}
      className={`${language === "ar" ? "font-saudi" : ""} ${
        props.className || ""
      }`}
    >
      {props.children}
    </Heading>
  );

  return (
    <Center className="flex-1">
      <Head>
        <title>{i18n.t("tab.stats")} | BR19.me</title>
      </Head>
      <HStack className="gap-2 mt-6">
        <Icon as={BarChart} className={isPhone ? "w-11 h-11" : "w-14 h-14"} />
        <CustomHeading size={isPhone ? "3xl" : "4xl"}>
          {i18n.t("aboutMe.title")}
        </CustomHeading>
      </HStack>
    </Center>
  );
}
