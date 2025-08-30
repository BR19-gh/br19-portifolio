import EXPERIENCES_EN, {
  Experience,
  EXPERIENCES_AR,
} from "@/constants/Experiences";
import useLocaleAlignment, { TextDirection } from "@/hooks/useLocaleAlignment";
import { BriefcaseBusiness, GraduationCap, Star } from "lucide-react-native";
import React from "react";
import { VStack } from "../ui/vstack";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Text } from "../ui/text";
import { Heading } from "../ui/heading";
import styles from "./experiences.styles";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { BadgeText, Badge } from "../ui/badge";
import { HStack } from "../ui/hstack";

const Experiences = () => {
  const { language } = useLocalization();
  const textDir = useLocaleAlignment("textDir", language);

  const data: Experience[] =
    language === "ar" ? EXPERIENCES_AR : EXPERIENCES_EN;

  const CustomHeading = (props: any) => (
    <Heading
      {...props}
      className={`${
        language === "ar" ? "font-saudi text-white" : "text-white"
      } ${props.className || ""}`}
    >
      {props.children}
    </Heading>
  );

  const CustomText = (props: any) => (
    <Text
      {...props}
      className={`${
        language === "ar" ? "font-saudi text-white" : "text-white"
      } ${props.className || ""}`}
    >
      {props.children}
    </Text>
  );

  return (
    <VerticalTimeline layout="2-columns" lineColor="grey">
      {data.map((experience, index) => (
        <VerticalTimelineElement
          key={index}
          intersectionObserverProps={{
            rootMargin: "0px 0px -40px 0px",
            triggerOnce: false,
          }}
          contentStyle={{
            ...(experience.experienceType === "work"
              ? styles.workBackground
              : styles.educationBackground),
            ...(experience.current ? styles.currentBorder : {}),
          }}
          contentArrowStyle={{
            ...(experience.experienceType === "work"
              ? styles.workArrow
              : styles.educationArrow),
            ...(experience.current ? styles.currentArrow : {}),
          }}
          date={`${experience.startDate} - ${
            experience.current
              ? language === "ar"
                ? "الآن"
                : "Present"
              : experience.endDate || ""
          }`}
          iconStyle={{
            ...(experience.experienceType === "work"
              ? styles.workBackground
              : styles.educationBackground),
            ...(experience.current ? styles.currentBackground : {}),
          }}
          icon={
            experience.experienceType === "work" ? (
              <BriefcaseBusiness color={"white"} />
            ) : (
              <GraduationCap color={"white"} />
            )
          }
        >
          <VStack space="lg" style={{ direction: textDir as TextDirection }}>
            <VStack>
              <CustomHeading size="xl">{experience.position}</CustomHeading>
              <HStack space="lg">
                <CustomHeading size="lg">
                  {experience.institution}
                </CustomHeading>
                <CustomText size="md" className="self-center">
                  {experience.location}
                </CustomText>
              </HStack>
            </VStack>
            <HStack
              space="sm"
              className="flex-wrap justify-center"
              reversed={language === "ar"}
            >
              {experience.skills?.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-white"
                  size="sm"
                  variant="solid"
                  action={"muted"}
                >
                  <BadgeText className="text-black">{skill}</BadgeText>
                </Badge>
              ))}
            </HStack>
            <CustomText>{experience.description}</CustomText>
          </VStack>
        </VerticalTimelineElement>
      ))}
      <VerticalTimelineElement iconStyle={styles.start} icon={<Star />} />
    </VerticalTimeline>
  );
};

export default Experiences;
