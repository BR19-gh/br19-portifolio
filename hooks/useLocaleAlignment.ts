export enum AlignmentTypesEnum {
  flex = "flex",
  text = "text",
  align = "align",
  dir = "dir",
  textDir = "textDir",
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
export type TextDirection = "rtl" | "ltr";

type Alignments = {
  [key in AlignmentTypes]: {
    ltr:
      | FlexAlignment
      | TextAlignment
      | AlignPosition
      | FlexDirection
      | TextDirection;
    rtl:
      | FlexAlignment
      | TextAlignment
      | AlignPosition
      | FlexDirection
      | TextDirection;
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
  textDir: {
    rtl: "rtl",
    ltr: "ltr",
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
  language: string
) {
  const isRTL = language === "ar";

  return isRTL ? Alignments[type].rtl : Alignments[type].ltr;
}
