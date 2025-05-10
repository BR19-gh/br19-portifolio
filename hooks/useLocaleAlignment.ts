export enum AlignmentTypesEnum {
  flex = "flex",
  text = "text",
  align = "align",
  dir = "dir",
  reverseFlex = "reverseFlex",
  reverseText = "reverseText",
  reverseAlign = "reverseAlign",
  reverseDir = "reverseDir",
}

type AlignmentTypes = keyof typeof AlignmentTypesEnum;

export type FlexAlignment = "flex-start" | "flex-end";
export type TextAlignment = "left" | "right";
export type AlignPosition = "start" | "end";
export type FlexDirection = "row-reverse" | "row";

type Alignments = {
  [key in AlignmentTypes]: {
    ltr: FlexAlignment | TextAlignment | AlignPosition | FlexDirection;
    rtl: FlexAlignment | TextAlignment | AlignPosition | FlexDirection;
  };
};

const Alignments = {
  flex: {
    ltr: "flex-start",
    rtl: "flex-end",
  },
  text: {
    rtl: "left",
    ltr: "right",
  },
  align: {
    rtl: "start",
    ltr: "end",
  },
  dir: {
    rtl: "row-reverse",
    ltr: "row",
  },
  reverseFlex: {
    ltr: "flex-end",
    rtl: "flex-start",
  },
  reverseText: {
    rtl: "right",
    ltr: "left",
  },
  reverseAlign: {
    rtl: "end",
    ltr: "start",
  },
  reverseDir: {
    rtl: "row",
    ltr: "row-reverse",
  },
};

export default function useLocaleAlignment(
  type: AlignmentTypes = "flex",
  language: string = "en"
) {
  const isRTL = language === "ar";

  return isRTL ? Alignments[type].rtl : Alignments[type].ltr;
}
