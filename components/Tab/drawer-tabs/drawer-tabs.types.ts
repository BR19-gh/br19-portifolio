import { Route } from "@/contexts/NavigationContext";
import { LucideIcon } from "lucide-react-native";

export interface NavigateButtonProps {
  text: string;
  icon: LucideIcon;
  route: Route;
}
