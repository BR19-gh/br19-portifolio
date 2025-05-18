import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useWindowWidth } from "@/contexts/WindowWidthContext";

const XStack: React.FC<React.PropsWithChildren<{ className?: string }>> = (
  props
) => {
  const { isPhone, isTablet } = useWindowWidth();
  if (isPhone || isTablet) {
    return (
      <VStack
        {...props}
        className={
          props.className && isTablet
            ? `mt-32 scale-[1.4] ${props.className}`
            : ""
        }
      >
        {props.children}
      </VStack>
    );
  } else {
    return <HStack {...props}>{props.children}</HStack>;
  }
};

export default XStack;
