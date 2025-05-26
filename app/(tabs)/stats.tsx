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
import { VStack } from "@/components/ui/vstack";
import { CARDS_SIZE } from "@/constants";
import { StatCard } from "@/components/stats/cards";

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
        <title>{i18n.t("head.stats")} | BR19.me</title>
      </Head>
      <HStack space="sm" className="m-6">
        <Icon as={BarChart} className={isPhone ? "w-11 h-11" : "w-14 h-14"} />
        <CustomHeading size={isPhone ? "3xl" : "4xl"}>
          {i18n.t("stats.title")}
        </CustomHeading>
      </HStack>
      <VStack space="4xl" className="w-full items-center">
        <StatCard
          link={`https://github-readme-stats.vercel.app/api/top-langs/?langs_count=5&username=BR19-gh&theme=transparent&layout=donut&hide=html,css&hide_border=true&title_color=ffffff&text_color=ffffff&icon_color=ffffff&card_width=${CARDS_SIZE["CARD_WIDTH"]}&card_height=${CARDS_SIZE["CARD_HEIGHT"]}`}
        />
        <StatCard
          link={`https://github-readme-stats.vercel.app/api?username=BR19-gh&show_icons=true&theme=transparent&rank_icon=githubhide_border&hide_border=true&title_color=ffffff&text_color=ffffff&icon_color=ffffff&card_width=${CARDS_SIZE["CARD_WIDTH"]}&card_height=${CARDS_SIZE["CARD_HEIGHT"]}`}
        />
        <StatCard
          link={`https://github-readme-streak-stats.herokuapp.com?user=BR19-gh&theme=transparent&hide_border=true&mode=weekly&card_width=${CARDS_SIZE["CARD_WIDTH"]}&card_height=${CARDS_SIZE["CARD_HEIGHT"]}&hide_total_contributions=true`}
        />
      </VStack>
      {/* // TODO: change languange and titles color dark light */}
    </Center>
  );
}
