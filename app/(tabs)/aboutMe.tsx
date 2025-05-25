import { Button, ButtonIcon } from "@/components/ui/button";
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
    <Center
      className="flex-1 gap-10 px-40"
      style={styles.aboutMeContainer(textDir as TextDirection)}
    >
      <Head>
        <title>{i18n.t("tab.aboutMe")} | BR19.me</title>
      </Head>
      <HStack className="gap-2 mt-6">
        <Icon as={User} className={isPhone ? "w-11 h-11" : "w-14 h-14"} />
        <CustomHeading size={isPhone ? "3xl" : "4xl"}>
          {i18n.t("aboutMe.title")}
        </CustomHeading>
      </HStack>
      <VStack className="gap-6">
        <VStack className="gap-2">
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
          className={
            "text-justify " +
            (language === "ar" ? "font-saudi-bold" : "font-bold")
          }
        >
          {i18n.t("aboutMe.body")}
        </Text>
        <VStack className="gap-4">
          <VStack>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("mailto:ibrahim-abdalaziz@hotmail.com");
              }}
            >
              <HStack>
                <Text
                  size="lg"
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
                size="lg"
                className={`${
                  language === "ar" ? "font-saudi-bold" : "font-bold"
                } text-primary-700`}
              >
                {i18n.t("aboutMe.locationTitle") + ":  "}
              </Text>
              <CustomText size="lg">
                {i18n.t("aboutMe.locationValue")}
              </CustomText>
            </HStack>
          </VStack>
          <HStack className="gap-4">
            <Button
              action="primary"
              size="lg"
              onPress={() => {
                handleNavigate(`/(tabs)/resume`);
              }}
            >
              <Text
                size="2xl"
                className={`${
                  language === "ar" ? "font-saudi" : ""
                } text-white `}
              >
                {i18n.t("aboutMe.resume")}
              </Text>
              <ButtonIcon size="xl" as={FileText} color="white" />
            </Button>
            <Button
              action="primary"
              size="lg"
              onPress={() => {
                handleNavigate(`/(tabs)/projects`);
              }}
            >
              <Text
                size="2xl"
                className={`${
                  language === "ar" ? "font-saudi" : ""
                } text-white `}
              >
                {i18n.t("aboutMe.projects")}
              </Text>
              <ButtonIcon size="xl" as={Code2Icon} color="white" />
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Center>
  );
}
