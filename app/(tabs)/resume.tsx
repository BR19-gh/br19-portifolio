import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Tilt } from "@jdion/tilt-react";
import { useWindowWidth } from "@/contexts/WindowWidthContext";
import { useLocaleAlignment } from "@/hooks";
import { TextDirection } from "@/hooks/useLocaleAlignment";
import i18n from "@/localization";
import { Linking, Platform, View } from "react-native";
import { FileText } from "lucide-react-native";
import Head from "expo-router/head";
import { WebView } from "react-native-webview";
import React from "react";
import { ResumePDF } from "@/assets/images";

const CompatableWebView = ({ source }: { source: string }) => {
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (Platform.OS === "web") {
      fetch(source)
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        });
    }
  }, [source]);

  if (Platform.OS === "web") {
    if (!pdfUrl) return <p>{i18n.t("resume.loadingPDF")}</p>;
    return (
      <>
        <View
          className="w-[95%] h-[95%] bg-transparent absolute rounded-md"
          style={{
            zIndex: 1,
            transform: "translateZ(60px)",
          }}
        />
        <iframe
          src={pdfUrl}
          className="w-[90%] h-[90%] rounded-md"
          style={{
            transform: "translateZ(60px)",
          }}
        />
      </>
    );
  }

  return (
    <WebView
      source={{ uri: source }}
      style={{
        width: "95%",
        height: "95%",
      }}
    />
  );
};

export default function Resume() {
  const { language } = useLocalization();
  const textDir = useLocaleAlignment("textDir", language);

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
      className={`${language === "ar" ? "font-saudi text-2xl" : "text-lg"} ${
        props.className || ""
      }`}
    >
      {props.children}
    </Text>
  );

  const { isPC, isPhone, isTablet } = useWindowWidth();

  return (
    <Center
      className="flex-1 gap-10 px-40"
      style={{ direction: textDir as TextDirection }}
    >
      <Head>
        <title>{i18n.t("tab.resume")} | BR19.me</title>
      </Head>
      <HStack className="gap-2 mt-6 items-center justify-center w-screen">
        <Icon as={FileText} className={isPhone ? "w-11 h-11" : "w-14 h-14"} />
        <CustomHeading size={isPhone ? "3xl" : "4xl"}>
          {i18n.t("resume.title")}
        </CustomHeading>
      </HStack>
      <VStack className="gap-12">
        <Tilt
          className={
            "flex h-[438.5] w-[310] content-center items-center justify-center rounded-xl bg-gradient-to-r from-primary-800 to-primary-400"
          }
          style={{
            boxShadow: "0 48px 60px 0 rgba(2,14,26,.24)",
            transformStyle: "preserve-3d",
          }}
        >
          <CompatableWebView source={ResumePDF} />
        </Tilt>
        <Button
          onPress={() => {
            Linking.openURL(ResumePDF);
          }}
          className="w-40 self-center items-center"
          action="primary"
        >
          <CustomText className="text-white">
            {i18n.t("resume.openResume")}
          </CustomText>
        </Button>
      </VStack>
    </Center>
  );
}
