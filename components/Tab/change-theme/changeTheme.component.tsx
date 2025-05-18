import React from "react";
import { Moon, Sun } from "lucide-react-native";
import { Pressable } from "react-native";
import { useThemeCustom } from "@/contexts/ThemeContext";
import { Icon } from "@/components/ui/icon";

const ChangeTheme: React.FC<{
  size?: "sm" | "md" | "lg" | "xl" | "2xs" | "xs";
}> = ({ size }) => {
  const { toggleColorScheme, colorScheme } = useThemeCustom();
  const isDark = colorScheme === "dark";
  return (
    <Pressable
      onPress={() => {
        toggleColorScheme();
      }}
    >
      <Icon as={isDark ? Moon : Sun} size={size ? size : "lg"} />
    </Pressable>
  );
};

export default ChangeTheme;
