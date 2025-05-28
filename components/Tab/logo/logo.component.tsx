import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Image } from "@/components/ui/image";
import { LogoImage } from "@/assets/images";
import { useWindowWidth } from "@/contexts/WindowWidthContext";

const Logo: React.FC = () => {
  const { isPhone } = useWindowWidth();
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate("/(tabs)/home");
      }}
    >
      <Image size={"xs"} source={LogoImage} alt="Logo" />
    </TouchableOpacity>
  );
};

export default Logo;
