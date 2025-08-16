type Fonts = {
  black: string;
  blackItalic: string;
  bold: string;
  boldItalic: string;
  extraBold: string;
  extraBoldItalic: string;
  semiBold: string;
  semiBoldItalic: string;
  regular: string;
  regularItalic: string;
  light: string;
  lightItalic: string;
  thin: string;
  thinItalic: string;
};
type Palette = {
  primary: string;
  secondary: string;
  background: string;
  reverseBackground: string;
  text: string;
  gray: string;
  divider: string;
  textGray: string;
  placeholder: string;
  white: string;
  bottom: string;
  underlay: string;
  lightGray: string;
  lighterGray: string;
  title: string;
  black: string;
  link: string;
  backgroundGray: string;
  darken: string;
  fullBlack: string;
  lightWhite: string;
  border: string;
  error: string;
};

type Colors = {
  dark: {
    background: string;
    reverseBackground: string;
    backgroundGray: string;
    primary: string;
    secondary: string;
    text: string;
    gray: string;
    lightGray: string;
    lighterGray: string;
    textGray: string;
    placeholder: string;
    divider: string;
    white: string;
    bottom: string;
    underlay: string;
    title: string;
    black: string;
    link: string;
    darken: string;
    fullBlack: string;
    lightWhite: string;
    border: string;
    error: string;
  };
  light: {
    background: string;
    reverseBackground: string;
    backgroundGray: string;
    primary: string;
    secondary: string;
    gray: string;
    lightGray: string;
    lighterGray: string;
    placeholder: string;
    text: string;
    textGray: string;
    divider: string;
    white: string;
    bottom: string;
    underlay: string;
    title: string;
    black: string;
    link: string;
    darken: string;
    fullBlack: string;
    lightWhite: string;
    border: string;
    error: string;
  };
};

type Shadows = {
  light: {
    shadowColor: string;
    shadowOffset: {
      width: number;
      height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  standard: {
    shadowColor: string;
    shadowOffset: {
      width: number;
      height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
};

type PercentHeight = (percentage: number) => number;
interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

type Theme = {
  palette: Palette;
  shadows: Shadows;
  windowHeight: number;
  fonts: Fonts;
  percentHeight: PercentHeight;
  percentWidth: PercentHeight;
  insets: EdgeInsets;
  isTablet: boolean;
  isDarkMode: boolean;
  tabHeight: number | undefined;
};

export interface CustomThemeProps {
  theme: Theme;
}

export type {Fonts, Colors, Shadows, Palette, Theme};
