import useTheme from '@hooks/useTheme';
import React from 'react';
import {TextStyle} from 'react-native';
import {Text as NativeText, TextProps} from 'react-native';

type Props = {
  children: any;
  style?: TextStyle;
  numberOfLines?: number;
};

export default function Text({
  children,
  style = {},
  numberOfLines,
  ...rest
}: Props | TextProps) {
  const theme = useTheme();

  return (
    <NativeText
      numberOfLines={numberOfLines}
      style={[
        {
          color: theme.palette.black,
          fontFamily: theme.fonts.regular,
          fontSize: 14,
          minHeight: 20,
        },
        style,
      ]}
      {...rest}>
      {children}
    </NativeText>
  );
}
