import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useWindowWidth } from "@/contexts/WindowWidthContext";
import { useLocaleAlignment } from "@/hooks";
import { TextDirection } from "@/hooks/useLocaleAlignment";
import i18n from "@/localization";
import Head from "expo-router/head";
import { Code2Icon, FileText, User } from "lucide-react-native";
import { Linking, TouchableOpacity } from "react-native";
import { Typewriter } from "react-simple-typewriter";
import styles from "@/app/(tabs)/styles";
import { useNavigationContext } from "@/contexts/NavigationContext";

export default function AboutMe() {
  const { language } = useLocalization();
  const textDir = useLocaleAlignment("textDir", language);
  const { isPhone } = useWindowWidth();
  const { handleNavigate } = useNavigationContext();

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
      className={`${language === "ar" ? "font-saudi" : ""} ${
        props.className || ""
      }`}
    >
      {props.children}
    </Text>
  );

  return (
    <Center className="gap-10">
      <Head>
        <title>{i18n.t("head.aboutMe")} | BR19.me</title>
      </Head>
      <HStack space="sm" className={isPhone ? "m-1" : "m-6"}>
        <Head>
          <title>{i18n.t("head.aboutMe")} | BR19.me</title>
        </Head>
        <CustomHeading size={isPhone ? "3xl" : "4xl"}>
          {i18n.t("aboutMe.title")}
        </CustomHeading>
        <Icon as={User} className={isPhone ? "w-11 h-11" : "w-14 h-14"} />
      </HStack>

      <VStack space="lg" className={"px-36"}>
        <VStack space="sm">
          <CustomHeading size="2xl">{i18n.t("aboutMe.name")}</CustomHeading>
          <HStack>
            <Heading
              id="typewriter"
              size="md"
              style={styles.headingStyle(textDir as TextDirection)}
              className="font-handjet-bold mt-0.5"
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
        </VStack>
        <Text
          size={isPhone ? "sm" : "md"}
          className={
            "text-justify " +
            (language === "ar" ? "font-saudi-bold" : "font-bold")
          }
        >
          {i18n.t("aboutMe.body")}
        </Text>
        <VStack space="lg">
          <VStack>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("mailto:ibrahim-abdalaziz@hotmail.com");
              }}
            >
              <HStack>
                <Text
                  size="md"
                  className={`${
                    language === "ar" ? "font-saudi-bold" : "font-bold"
                  } text-primary-700`}
                >
                  {i18n.t("aboutMe.emailTitle") + ":  "}
                </Text>
                <Text>Ibrahim-abdalaziz@hotmail.com</Text>
              </HStack>
            </TouchableOpacity>
            <HStack>
              <Text
                size="md"
                className={`${
                  language === "ar" ? "font-saudi-bold" : "font-bold"
                } text-primary-700`}
              >
                {i18n.t("aboutMe.locationTitle") + ":  "}
              </Text>
              <CustomText>{i18n.t("aboutMe.locationValue")}</CustomText>
            </HStack>
          </VStack>
          <HStack space="lg">
            <Button
              action="primary"
              size="lg"
              onPress={() => {
                handleNavigate(`/(tabs)/resume`);
              }}
            >
              <CustomText
                size="lg"
                className={`${
                  language === "ar" ? "font-saudi" : ""
                } text-white`}
              >
                {i18n.t("aboutMe.resume")}
              </CustomText>
              <ButtonIcon size="xl" as={FileText} color="white" />
            </Button>
            <Button
              action="primary"
              size="lg"
              onPress={() => {
                handleNavigate(`/(tabs)/projects`);
              }}
            >
              <CustomText
                size="lg"
                className={`${
                  language === "ar" ? "font-saudi" : ""
                } text-white`}
              >
                {i18n.t("aboutMe.projects")}
              </CustomText>
              <ButtonIcon size="xl" as={Code2Icon} color="white" />
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Center>
  );
}
