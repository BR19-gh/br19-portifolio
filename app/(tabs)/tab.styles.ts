import { FlexDirection } from "@/hooks/useLocaleAlignment";
import { Theme } from "@react-navigation/native";
import { ms, s, vs } from "react-native-size-matters";

type Display = "flex" | "none" | undefined;

const styles = {
  tabText: (isWindowWidthSmall: boolean) => ({
    display: isWindowWidthSmall ? ("none" as Display) : ("flex" as Display),
  }),
  container: (colorScheme: string, dir: string) => ({
    padding: ms(7),
    flexDirection: dir as FlexDirection,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor:
      colorScheme === "dark"
        ? "rgba(18, 18, 18, 0.4)"
        : "rgba(255, 255, 255, 0.15)",
    borderTopWidth: s(1),
    borderTopColor:
      colorScheme === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(20px)",
    gap: ms(20),
  }),
};

export default styles;
