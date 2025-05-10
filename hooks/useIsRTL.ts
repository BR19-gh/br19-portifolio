import { getLocales } from "expo-localization";

export default function useIsRTL() {
  return getLocales()[0]?.textDirection === "rtl";
}
