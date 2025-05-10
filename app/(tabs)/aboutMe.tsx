import EditScreenInfo from "@/components/EditScreenInfo";
import { ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import i18n from "@/localization";
import { useThemeCustom } from "@/contexts/ThemeContext";
import {
  useLocalization,
  Language,
  SupportedLanguages,
} from "@/contexts/LocalizationContext"; // تأكد من أن الـcontext مضاف بشكل صحيح
import { usePathname } from "expo-router";

export default function Home() {
  const { toggleColorScheme, colorScheme } = useThemeCustom();
  const { language, setLanguage } = useLocalization(); // استخدام context لاختيار اللغة

  // اللغات المدعومة
  const pathname = usePathname();
  return (
    <Center className="flex-1">
      <Heading className="font-bold text-2xl">Expo V3</Heading>
      <Divider className="my-[30px] w-[80%]" />
      <Text className="font-saudi font-bold text-7xl">
        {i18n.t("tab.aboutMe")}
      </Text>
      <EditScreenInfo path="app/(app)/(tabs)/index.tsx" />

      <Button
        action="secondary"
        //variant="outline"
        onPress={() => {
          toggleColorScheme();
          console.log("pathname", pathname);
        }}
      >
        <ButtonText>Toggle color mode</ButtonText>
      </Button>

      <Button
        action="primary"
        onPress={() => {
          // عرض قائمة منسدلة لاختيار اللغة
          const newLanguage: Language = prompt(
            "Select a language:",
            SupportedLanguages.join(", ")
          ) as Language;
          if (newLanguage && SupportedLanguages.includes(newLanguage)) {
            setLanguage(newLanguage);
          }
        }}
      >
        <ButtonText className={"dark:text-white"}>Change language</ButtonText>
      </Button>
    </Center>
  );
}
