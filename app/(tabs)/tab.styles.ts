import { s, vs } from "react-native-size-matters";

type Display = "flex" | "none" | undefined;

const styles = {
  tabText: (
    pressed: boolean,
    isWindowWidthSmall: boolean,
    themedTextColor: string
  ) => ({
    display: isWindowWidthSmall ? ("none" as Display) : ("flex" as Display),
  }),
};

export default styles;
