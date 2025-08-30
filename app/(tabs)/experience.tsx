import Experiences from "@/components/experiences/experiences.component";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useWindowWidth } from "@/contexts/WindowWidthContext";
import i18n from "@/localization";
import Head from "expo-router/head";
import { BriefcaseBusiness } from "lucide-react-native";

export default function AboutMe() {
  const { language } = useLocalization();
  const { isPhone } = useWindowWidth();

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
    <Center className="gap-10">
      <HStack
        space="lg"
        reversed={language === "ar"}
        className={isPhone ? "m-1" : "m-6"}
      >
        <Head>
          <title>{i18n.t("head.experience")} | BR19.me</title>
        </Head>
        <CustomHeading size={isPhone ? "3xl" : "4xl"}>
          {i18n.t("experience.title")}
        </CustomHeading>
        <BriefcaseBusiness size={isPhone ? 44 : 56} />
      </HStack>
      <Experiences />
    </Center>
  );
}
