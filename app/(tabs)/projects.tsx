import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import i18n from "@/localization";
import Head from "expo-router/head";

export default function Home() {
  return (
    <Center className="flex-1">
      <Head>
        <title>{i18n.t("tab.projects")} | BR19.me</title>
      </Head>
      <Heading className="text-lg mt-2">Projects</Heading>
    </Center>
  );
}
