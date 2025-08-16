import { useStyles } from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import ArrowLeft from '../../icons/back.svg';
import { useBookStoreNavigation } from '@utils/useBookStoreNavigation';
import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import XIcon from '@icons/x.svg';
import TouchableOpacity from '@components/TouchableOpacity';
import Text from '@components/Text';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type Props = {
  leading?: any;
  trailing?: any;
  middle?: any;
  modal?: boolean;
  arrowFill?: string;
  xTrailing?: any;
  XLeading?: boolean;
  middleText?: string;
  middleTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

export default function Header({
  leading,
  middle,
  trailing,
  modal = false,
  arrowFill,
  xTrailing = false,
  XLeading = false,
  middleText,
  middleTextStyle,
  containerStyle,
}: Props) {
  const theme = useTheme();

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  const handlePress = () => {
    ReactNativeHapticFeedback.trigger('impactLight', options);
    goBack();
  };

  const { goBack } = useBookStoreNavigation();

  const s = useStyles(theme => ({
    container: {
      paddingRight: 18,
      paddingLeft: 9,
      width: theme.percentWidth(100),
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.insets.top,
      justifyContent: 'space-between',
    },
    back: {
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    text: {
      fontFamily: theme.fonts.semiBold,
      fontSize: 17,
      flex: 1,
      lineHeight: 20.71,
    },
    icons: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    icon: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    middleText: {
      fontSize: 17,
      fontFamily: theme.fonts.bold,
    },
  }));
  let color = theme.isDarkMode ? 'white' : theme.palette.primary;

  return (
    <View
      style={[
        s.container,
        containerStyle,
        { marginTop: modal ? 10 : theme.insets.top },
      ]}
    >
      <View style={{ flex: 1 }}>
        {leading ? (
          leading
        ) : (
          <TouchableOpacity onPress={handlePress} style={s.back}>
            {XLeading ? (
              <XIcon height={20} fill={color} />
            ) : (
              <ArrowLeft fill={arrowFill ? arrowFill : color} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {middleText ? (
        <>
          <Text style={[s.middleText, middleTextStyle]}>{middleText}</Text>
          {!trailing ? <View style={{ flex: 1 }} /> : null}
        </>
      ) : null}
      {middle ? middle : null}
      {trailing ? trailing : null}
      {xTrailing ? (
        <TouchableOpacity style={s.icon} onPress={handlePress}>
          <XIcon height={20} fill={theme.palette.primary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
