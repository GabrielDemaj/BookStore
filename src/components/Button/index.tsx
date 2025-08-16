/**
 * Button component that handles press interaction and styling.
 *
 * Accepts various props like onPress, text, icons, styles etc.
 * Renders a Pressable view with text and optional icons.
 * Handles loading state and disabled interaction.
 * Uses ReactNativeHapticFeedback for press feedback.
 * Styles based on theme and additional style props.
 */
import Pressable from '@components/Pressable';
import useTheme from '@hooks/useTheme';
import {Theme} from '@variables/types';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type Props = {
  onPress?: any;
  text: string;
  startIcon?: any;
  endIcon?: any;
  style?: ViewStyle;
  textStyles?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
};

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function Button({
  onPress,
  text,
  startIcon,
  endIcon,
  style = {},
  textStyles = {},
  loading = false,
  disabled = false,
}: Props) {
  const theme = useTheme();
  const s = styles(theme);

  const handlePress = () => {
    if (!disabled) {
      ReactNativeHapticFeedback.trigger('impactLight', options);
      if (onPress) {
        onPress();
      }
    }
  };
  return (
    <Pressable
      onPress={disabled ? () => {} : handlePress}
      style={[
        s.container,
        style,
        {
          opacity: disabled ? 0.6 : 1,
        },
      ]}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator
          size={22}
          color={
            style?.backgroundColor === theme.palette.background
              ? theme.palette.primary
              : '#fff'
          }
          style={textStyles}
        />
      ) : (
        <>
          {startIcon && (
            <View style={[s.startIcon, {marginRight: text ? 15 : 0}]}>
              {startIcon}
            </View>
          )}
          {text && (
            <Text numberOfLines={1} style={[s.text, textStyles]}>
              {text}
            </Text>
          )}
          {endIcon && <View style={s.endIcon}>{endIcon}</View>}
        </>
      )}
    </Pressable>
  );
}

const majorVersionIOS = parseInt(String(Platform.Version), 15);

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: theme.palette.primary,
    },
    text: {
      fontSize: 20,
      color: '#fff',
      alignSelf: 'center',
      textTransform: 'capitalize',
      fontFamily: theme.fonts.bold,
      lineHeight: 24,
      letterSpacing: -0.5,
    },
    startIcon: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    endIcon: {
      width: '10%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  });
