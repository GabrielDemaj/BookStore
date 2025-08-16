import {colors, shadows, fonts} from '../variables/index';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Dimensions, Platform, useWindowDimensions} from 'react-native';
import {useThemeSlice} from '@store/useThemeSlice';
import {Theme} from '../variables/types';

const screen = Dimensions.get('screen');
export default function useTheme(): Theme {
  const {themeMode} = useThemeSlice(state => state);

  const insets = useSafeAreaInsets();
  const {height, width} = useWindowDimensions();

  const percentWidth = (percentage: number) => width * (percentage / 100);
  const percentHeight = (percentage: number) => height * (percentage / 100);
  const isTablet = width > 500;
  const tabHeight = Platform.select({android: 60, ios: 80});
  const windowHeight = screen.height - 80;
  const isDarkMode = themeMode === 'dark';

  return {
    palette: colors[themeMode],
    shadows: shadows[themeMode],
    windowHeight,
    fonts,
    insets,
    percentHeight,
    percentWidth,
    isTablet,
    isDarkMode,
    tabHeight,
  };
}
