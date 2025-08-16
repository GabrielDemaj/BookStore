import {Dimensions} from 'react-native';
import {Colors, Fonts} from './types';
const {width, height} = Dimensions.get('window');

export const percentWidth = (percentage: number): number =>
  width * (percentage / 100);
export const percentHeight = (percentage: number): number =>
  height * (percentage / 100);

export const fonts: Fonts = {
  black: 'ProximaNova-Black',
  blackItalic: 'ProximaNova-BlackIt',
  bold: 'ProximaNova-Bold',
  boldItalic: 'ProximaNova-BoldIt',
  extraBold: 'ProximaNova-Extrabld',
  extraBoldItalic: 'ProximaNova-ExtrabldIt',
  semiBold: 'ProximaNova-Semibold',
  semiBoldItalic: 'ProximaNova-SemiboldIt',
  regular: 'ProximaNova-Regular',
  regularItalic: 'ProximaNova-RegularIt',
  light: 'ProximaNova-Light',
  lightItalic: 'ProximaNova-LightIt',
  thin: 'ProximaNova-Thin',
  thinItalic: 'ProximaNova-ThinIt',
};

export const colors: Colors = {
  light: {
    // background: '#F5F5F5',
    background: '#ffffff',
    reverseBackground: '#222222',
    backgroundGray: '#F2F2F2',
    primary: '#00A3FF',
    secondary: '#DA1833',
    gray: '#00000035',
    lightGray: '#0000001F',
    lighterGray: '#00000041',
    text: '#00000059',
    textGray: '#303030',
    placeholder: '#00000026',
    divider: '#d0d1d3',
    white: '#fff',
    lightWhite: '#0000000D',
    bottom: '#A6A6A6',
    underlay: '#ccc',
    title: '#000000A6',
    black: '#000000',
    fullBlack: '#000',
    link: '#1C52A3',
    darken: '#fff',
    border: 'rgba(0, 0, 0, 0.35)',
    error: '#F82D2D',
  },
  dark: {
    background: '#222222',
    reverseBackground: '#ffffff',
    backgroundGray: '#424242',
    primary: '#00A3FF',
    secondary: '#DA1833',
    gray: '#fff',
    lightGray: '#fff',
    lighterGray: '#fff',
    text: '#FFFFFF59',
    textGray: '#fff',
    placeholder: '#ffffff50',
    divider: '#fff',
    white: '#fff',
    bottom: '#fff',
    underlay: '#ccc',
    title: '#FFFFFFA6',
    black: '#ffffff',
    fullBlack: '#000',
    link: '#fff',
    darken: '#000',
    lightWhite: '#FFFFFF0D',
    border: 'rgba(255, 255, 255, 0.35)',
    error: '#F82D2D',
  },
};

export const shadows = {
  dark: {
    light: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    standard: {
      shadowColor: '#646464',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
  },
  light: {
    light: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    standard: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
  },
};
