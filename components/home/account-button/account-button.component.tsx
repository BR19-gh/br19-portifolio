import { Button, ButtonIcon } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react-native";
import { Alert, Linking } from "react-native";

interface AccountButtonProps {
  name: string;
  icon: LucideIcon;
  link: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ name, icon, link }) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert("Cannot open URL:", link);
    }
  };
  return (
    <Button
      size="lg"
      action="secondary"
      className="w-12 px-0"
      onPress={handlePress}
      accessibilityLabel={name}
    >
      <ButtonIcon
        className="shrink-0 text-black dark:text-white"
        as={icon}
        width={20}
        height={20}
      />
    </Button>
  );
};

export default AccountButton;
