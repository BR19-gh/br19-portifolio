import React, { createContext, useContext, useState } from "react";
import { useRouter } from "expo-router";

export type Route =
  | "/(tabs)/home"
  | "/(tabs)/aboutMe"
  | "/(tabs)/experience"
  | "/(tabs)/projects"
  | "/(tabs)/stats"
  | "/(tabs)/resume";

type NavigationContextType = {
  activeRoute: Route;
  handleNavigate: (route: Route) => void;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeRoute, setActiveRoute] = useState<Route>("/(tabs)/home");
  const router = useRouter();

  const handleNavigate = (route: Route) => {
    setActiveRoute(route);
    router.push(route);
  };

  return (
    <NavigationContext.Provider value={{ activeRoute, handleNavigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context)
    throw new Error(
      "useNavigationContext must be used inside NavigationProvider"
    );
  return context;
};
