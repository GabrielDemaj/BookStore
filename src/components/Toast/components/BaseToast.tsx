import React from 'react';
import {Dimensions, View} from 'react-native';
import {BaseToastProps} from '../types';
import {getTestId} from '../utils/test-id';
// import {styles} from './BaseToast.styles';
import {Touchable} from './Touchable';
import useTheme from '@hooks/useTheme';
import Text from '@components/Text';
import {useStyles} from '@hooks/useStyles';

export const HEIGHT = 60;
export const WIDTH = 340;
export const BORDER_RADIUS = 6;
const {width} = Dimensions.get('window');

export function BaseToast({
  text1,
  text2,
  onPress,
  activeOpacity,
  style,
  touchableContainerProps,
  contentContainerStyle,
  contentContainerProps,
  text1Style,
  text1NumberOfLines = 1,
  text1Props,
  text2Style,
  text2NumberOfLines = 1,
  text2Props,
  renderLeadingIcon,
  renderTrailingIcon,
}: BaseToastProps) {
  const theme = useTheme();

  const s = useStyles(theme => ({
    base: {
      flexDirection: 'row',
      height: HEIGHT,
      width: theme.percentWidth(100) - 40,
      borderRadius: 5,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.1,
      shadowRadius: BORDER_RADIUS,
      elevation: 1,
      backgroundColor: theme?.isDarkMode ? '#4D4D4D' : '#EDEDED',
      // borderTopWidth: 1,
      // borderWidth: 1,
      // borderColor: theme.palette.border,
    },
    leadingBorder: {
      // borderLeftWidth: 5,
      // borderLeftColor: '#D8D8D8',
    },
    contentContainer: {
      paddingHorizontal: 15,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start', // In case of RTL, the text will start from the right
    },
    text1: {
      fontSize: 16,
      fontFamily: theme.fonts.bold,
      marginBottom: 2,
      color: theme.palette.black,
      letterSpacing: -0.5,
      width: '100%', // Fixes: https://github.com/calintamas/react-native-toast-message/issues/130
    },
    text2: {
      fontSize: 12,
      color: theme.palette.black,
      letterSpacing: -0.5,
      width: '100%', // Fixes: https://github.com/calintamas/react-native-toast-message/issues/130
    },
  }));

  return (
    <Touchable
      testID={getTestId('TouchableContainer')}
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[s.base, s.leadingBorder, style]}
      {...touchableContainerProps}>
      {/* <View style={{paddingLeft: 20, justifyContent: 'center'}}>
        {renderLeadingIcon && renderLeadingIcon()}
      </View> */}
      <View
        testID={getTestId('ContentContainer')}
        style={[s.contentContainer, contentContainerStyle]}
        {...contentContainerProps}>
        {(text1?.length ?? 0) > 0 && (
          <Text
            testID={getTestId('Text1')}
            style={[s.text1, text1Style]}
            numberOfLines={text1NumberOfLines}
            ellipsizeMode="tail"
            {...text1Props}>
            {text1}
          </Text>
        )}
        {(text2?.length ?? 0) > 0 && (
          <Text
            testID={getTestId('Text2')}
            style={[s.text2, text2Style]}
            numberOfLines={text2NumberOfLines}
            ellipsizeMode="tail"
            {...text2Props}>
            {text2}
          </Text>
        )}
      </View>
      {renderTrailingIcon && renderTrailingIcon()}
    </Touchable>
  );
}
