import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useWindowWidth } from "@/contexts/WindowWidthContext";
import i18n from "@/localization";
import Head from "expo-router/head";
import { Icon } from "@/components/ui/icon";
import { Code2Icon } from "lucide-react-native";
import { Card } from "@/components/ui/card";
import PROJECTS from "@/constants/Projects";
import { VStack } from "@/components/ui/vstack";
import { Tilt } from "@jdion/tilt-react";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { FlatList, Linking, View } from "react-native";
import { Button } from "@/components/ui/button";
import styles from "./styles";

export default function Home() {
  const { isPhone, isTablet } = useWindowWidth();
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

  const CustomText = (props: any) => (
    <Text
      {...props}
      style={{
        direction: language === "ar" ? "rtl" : "ltr",
      }}
      className={`${language === "ar" ? "font-saudi" : ""} ${
        props.className || ""
      }`}
    >
      {props.children}
    </Text>
  );

  return (
    <Center>
      <HStack
        space="lg"
        reversed={language === "ar"}
        className={isPhone ? "m-1" : "m-6"}
      >
        <Head>
          <title>{i18n.t("head.projects")} | BR19.me</title>
        </Head>
        <CustomHeading size={isPhone ? "3xl" : "4xl"}>
          {i18n.t("projects.title")}
        </CustomHeading>
        <Icon as={Code2Icon} className={isPhone ? "w-11 h-11" : "w-14 h-14"} />
      </HStack>

      <FlatList
        className={isPhone ? "p-0" : "p-5"}
        contentContainerClassName="items-center"
        horizontal={false}
        ItemSeparatorComponent={() => (
          <View className={isPhone ? "-mt-10" : "mt-5"} />
        )}
        numColumns={isPhone ? 1 : 2}
        key={`flatlist-numColumns-${isPhone ? 1 : 2}`}
        data={PROJECTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Tilt>
            <Card
              style={styles.tiltStyle}
              key={item.id}
              size="lg"
              variant="filled"
              className={
                "w-[370px] rounded-xl " +
                (isPhone ? "scale-[0.8]" : isTablet ? "scale-[0.9]" : "m-5")
              }
            >
              <VStack space="lg" className="items-center">
                <View className="bg-primary-500 rounded-lg">
                  <Image
                    className="rounded-lg h-[135px] w-[340px]"
                    size="full"
                    source={
                      item.githubImg +
                      "&title_color=ffffff&text_color=ffffff&icon_color=ffffff"
                    }
                    alt={item.githubURL}
                  />
                </View>
                <Heading size="xl">{item.title}</Heading>
                <CustomText size="md" className="text-justify mx-4">
                  {language === "ar"
                    ? item.shortDescriptionAr
                    : item.shortDescription}
                </CustomText>
                <HStack space="sm" className="flex-wrap justify-center">
                  {item.skills.map((skill, index) => (
                    <Badge key={index} size="sm" variant="solid" action="info">
                      <BadgeText>{skill}</BadgeText>
                    </Badge>
                  ))}
                </HStack>
                <Button
                  size="xl"
                  action="primary"
                  className="w-44"
                  onPress={() => {
                    Linking.openURL(item.githubURL);
                  }}
                >
                  <CustomText size="xl" className={"text-white"}>
                    {i18n.t("projects.visitProject")}
                  </CustomText>
                </Button>
              </VStack>
            </Card>
          </Tilt>
        )}
      />
    </Center>
  );
}
