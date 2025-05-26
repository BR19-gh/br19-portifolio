import { CARDS_SIZE } from "@/constants";
import { Tilt } from "@jdion/tilt-react";
import { Image } from "@/components/ui/image";
import { Card } from "@/components/ui/card";
import { useWindowWidth } from "@/contexts/WindowWidthContext";

interface CardStatProps {
  link: string;
}

const StatCard: React.FC<CardStatProps> = ({ link }) => {
  const { isPhone, isTablet } = useWindowWidth();
  const scale = isPhone ? 0.9 : isTablet ? 1.2 : 1.3;
  return (
    <Tilt
      className={`justify-items-center items-center scale-[${scale}] w-[${CARDS_SIZE["CARD_WIDTH"]}px] h-[${CARDS_SIZE["CARD_HEIGHT"]}px]`}
    >
      <Card className="w-[90%] h-[110%]" variant="filled" size="lg">
        <Image
          size="full"
          source={{
            uri: link,
          }}
        />
      </Card>
    </Tilt>
  );
};

export default StatCard;
