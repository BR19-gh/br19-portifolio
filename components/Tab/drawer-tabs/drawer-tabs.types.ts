import { LucideIcon } from "lucide-react-native";

export interface NavigateButtonProps {
  text: string;
  icon: LucideIcon;
  route:
    | "/(tabs)/home"
    | "/(tabs)/aboutMe"
    | "/(tabs)/projects"
    | "/(tabs)/stats"
    | "/(tabs)/resume";
}
