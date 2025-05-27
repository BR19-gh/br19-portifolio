import { CARDS_SIZE } from "@/constants";
import { Tilt } from "@jdion/tilt-react";
import { Image } from "@/components/ui/image";
import { Card } from "@/components/ui/card";
import i18n from "@/localization";

interface CardStatProps {
  link: string;
}

const StatCard: React.FC<CardStatProps> = ({ link }) => {
  return (
    <Tilt
      className={`justify-items-center items-center w-[${CARDS_SIZE["CARD_WIDTH"]}px] h-[${CARDS_SIZE["CARD_HEIGHT"]}px]`}
    >
      <Card className="w-[87%] h-[110%]" variant="filled" size="lg">
        <Image
          size="full"
          source={{
            uri: link + (i18n.t("stats.linkSuffix") || ""),
          }}
        />
      </Card>
    </Tilt>
  );
};

export default StatCard;
