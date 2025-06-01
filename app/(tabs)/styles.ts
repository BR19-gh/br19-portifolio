import {
  FlexAlignment,
  FlexDirection,
  TextDirection,
} from "@/hooks/useLocaleAlignment";
import { ms } from "react-native-size-matters";

type Display = "flex" | "none" | undefined;

const styles = {
  //   tabs

  tabText: (isWindowWidthSmall: boolean) => ({
    display: isWindowWidthSmall ? ("none" as Display) : ("flex" as Display),
  }),
  container: (colorScheme: string, dir: FlexDirection) => ({
    position: "fixed",
    zIndex: 3,
    width: "100%",
    padding: ms(7),
    flexDirection: dir,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor:
      colorScheme === "dark"
        ? "rgba(18, 18, 18, 0.4)"
        : "rgba(255, 255, 255, 0.15)",
    borderTopColor:
      colorScheme === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(20px)",
    gap: ms(20),
  }),

  optionsContainer: (isPhone: boolean, reverseFlex: FlexAlignment) => ({
    display: isPhone ? ("none" as const) : ("flex" as const),
    width: "100%" as const,
    justifyContent: reverseFlex,
    padding: ms(5),
  }),

  optionsInnerContainer: (isPhone: boolean, dir: FlexDirection) => ({
    display: isPhone ? ("none" as const) : ("flex" as const),
    flexDirection: dir as FlexDirection,
    gap: ms(45),
    alignItems: "center" as const,
  }),

  //   home

  homeContainer: (isPC: boolean, textDir: TextDirection) => ({
    marginTop: isPC ? 150 : 20,
    direction: textDir,
  }),
  tiltStyle: {
    boxShadow: "0 48px 60px 0 rgba(2,14,26,.24)",
    transformStyle: "preserve-3d" as const,
  },
  tiltImageStyle: {
    width: 280,
    height: 280,
    transform: "translateZ(60px)",
  },
  headingStyle: (textDir: TextDirection) => ({
    direction: textDir,
    fontWeight: "100" as const,
    letterSpacing: 1,
  }),
  //   aboutMe

  aboutMeContainer: (textDir: TextDirection) => ({ direction: textDir }),
};

export default styles;
