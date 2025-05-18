import { Button, ButtonIcon } from "@/components/ui/button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Alert, Linking } from "react-native";

interface AccountButtonProps {
  name?: string;
  icon: keyof typeof FontAwesome.glyphMap;
  link: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ icon, link }) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert("Cannot open URL:", link);
    }
  };
  return (
    <Button size="lg" action="secondary" className="w-12" onPress={handlePress}>
      <FontAwesome
        className="text-black dark:text-white"
        name={icon}
        size={20}
      />
    </Button>
  );
};

export default AccountButton;
