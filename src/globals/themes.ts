import { Dimensions } from "react-native";

export const screenHeight = Dimensions.get("window").height;
export const screenWidth = Dimensions.get("window").width;

export const Fonts = {
  Regular: "HelveticaNeue",
  Bold: "HelveticaNeueBold",
  Light: "HelveticaNeueLight",
  Medium: "HelveticaNeueMedium",
  SemiBold: "HelveticaNeueMedium",
  Thin: "HelveticaNeueThin",
  SemiBoldItalic: "HelveticaNeueMediumItalic",
};

export const HALF_MEDIUM_PADDING_SIZE = 8;
export const MEDIUM_PADDING_SIZE = 16;
export const REGULAR_PADDING_SIZE = 24;
export const LARGE_PADDING_SIZE = 32;
export const XLARGE_PADDING_SIZE = 40;

export const BORDER_RADIUS_SIZE = 8;
