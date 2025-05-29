import { CARDS_SIZE } from "@/constants";
import { Tilt } from "@jdion/tilt-react";
import { Image } from "@/components/ui/image";
import { Card } from "@/components/ui/card";
import i18n from "@/localization";

interface CardStatProps {
  link: string;
  className?: string;
}

const StatCard: React.FC<CardStatProps> = ({ link }) => {
  return (
    <Tilt className={`justify-items-center items-center`}>
      <Card className="w-[500px] h-[250px]" variant="filled" size="lg">
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
