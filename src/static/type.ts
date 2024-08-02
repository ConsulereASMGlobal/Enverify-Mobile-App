import { FlatList, StyleProp, ViewStyle } from 'react-native';

export interface StyleProps {
  style?:
    | StyleProp<ViewStyle>
    | Array<StyleProp<ViewStyle>>
    | { [key: string]: string | number | React.FC<any> }
    | any;
}

export type styleKeyProps = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
export interface DimentionProps {
  width?: string | number | undefined;
  height?: string | number | undefined;
}

export interface ShadowProps {
  shadowStyle?: { [key: string]: string | number | React.FC<any> };
  Height?: number;
  Width?: number;
  innerShadow?: boolean;
}

export interface AnimationProps {
  animation?: string;
  duration?: number;
}

export interface RegularApiPayload {
  skip?: number;
  limit?: number;
}

export interface LoadMoreInterface {
  onReachEnd?: () => void;
}

export interface FlatlistListRef {
  ref: React.LegacyRef<FlatList<any>> | any;
}

export type Nullable<T> = T | null | undefined;

export interface ThemeProps {
  color?: string;
  bg?: string;
}
