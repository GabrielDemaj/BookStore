import useTheme from '@hooks/useTheme';
import {Theme} from '@variables/types';
import {useMemo} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

type StyleTypes = ViewStyle | TextStyle | ImageStyle;

// StyleSet is now generic
type StyleSet<T extends Record<string, StyleTypes>> = T;

// StyleCreator is also generic and returns a StyleSet of a specific shape
type StyleCreator<T extends Record<string, StyleTypes>> = (
  theme: Theme,
) => StyleSet<T>;

// useStyles is generic too
// export const useStyles = <T extends Record<string, StyleTypes>>(
//   createStyles: StyleCreator<T>,
// ): StyleSet<T> => {
//   const theme = useTheme();
//   return useMemo(() => createStyles(theme), [theme, createStyles]);
// };
export const useStyles = <T extends Record<string, StyleTypes>>(
  createStyles: StyleCreator<T> | StyleSet<T>,
): StyleSet<T> => {
  const theme = useTheme();

  // If createStyles is a function, call it with the theme.
  // Otherwise, just use it directly.
  const resolvedStyles =
    typeof createStyles === 'function'
      ? (createStyles as StyleCreator<T>)(theme)
      : createStyles;

  return useMemo(() => resolvedStyles, [theme, resolvedStyles]);
};
