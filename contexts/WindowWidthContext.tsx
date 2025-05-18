import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface WindowWidthContextProps {
  isPhone: boolean;
  isTablet: boolean;
  isPC: boolean;
}

const WindowWidthContext = createContext<WindowWidthContextProps | undefined>(
  undefined
);

export const WindowWidthProvider = ({ children }: { children: ReactNode }) => {
  const [windowSize, setWindowSize] = useState<WindowWidthContextProps>({
    isPhone: window.innerWidth <= 768,
    isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    isPC: window.innerWidth > 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowSize({
        isPhone: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isPC: width > 1024,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowWidthContext.Provider value={windowSize}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export const useWindowWidth = (): WindowWidthContextProps => {
  const context = useContext(WindowWidthContext);
  if (!context) {
    throw new Error("useWindowWidth must be used within a WindowWidthProvider");
  }
  return context;
};
