import EyeIcon from '@icons/eye.svg';
import EyeOff from '@icons/eyeoff.svg';
import {useStyles} from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import React, {useState} from 'react';
import {
  KeyboardType,
  TextInput,
  TextStyle,
  View,
  TextProps,
} from 'react-native';
import Text from '../Text';
import TouchableOpacity from '@components/TouchableOpacity';

type Props = {
  placeholder?: string;
  text?: string;
  style?: object;
  iconStyle?: object;
  textStyle?: object;
  secureTextEntry?: boolean;
  startIcon?: any;
  endIcon?: any;
  hasEye?: boolean;
  value?: any;
  setValue?: any;
  error?: any;
  refInput?: any;
  errorMessage?: string;
  multiline?: boolean;
  keyboardType?: KeyboardType;
  onSubmitEditing?: any;
  inputAccessoryViewID?: any;
  errortxt?: TextStyle;
  placeholderTextColor?: any;
  textProps?: TextProps;
};

const Textinput = ({
  placeholder,
  hasEye = false,
  text,
  style,
  secureTextEntry = false,
  startIcon,
  endIcon,
  value,
  setValue,
  error,
  errorMessage,
  multiline = false,
  keyboardType,
  onSubmitEditing,
  inputAccessoryViewID,
  errortxt,
  refInput,
  placeholderTextColor,
  iconStyle,
  textStyle,
  textProps,
}: Props) => {
  const [show, setShow] = useState<boolean>(true);
  const [eye, setEye] = useState<boolean>(false);
  const theme = useTheme();

  const changeEye = () => {
    setEye(!eye);
    setShow(!show);
  };

  const s = useStyles(theme => ({
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: theme.palette.border,
      borderRadius: 8,
      paddingLeft: theme.isTablet ? 8 : theme.percentWidth(3),
      color: theme.palette.black,
    },
    bigInput: {
      flex: 1,
      height: 50,
      color: theme.palette.text,
    },
    subtitle: {
      fontFamily: theme.fonts.semiBold,
      color: theme.palette.black,
      marginBottom: 6,
    },
    icon: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 44,
      borderWidth: 1,
      borderColor: theme.palette.border,
      borderRadius: 8,
      paddingLeft: theme.isTablet ? 10 : theme.percentWidth(3),
    },
    inputIcon: {
      paddingLeft: theme.isTablet ? 8 : theme.percentWidth(3),
      paddingRight: theme.percentWidth(5),
      flex: 1,
      height: 50,
      color: theme.palette.black,
    },
    eye: {
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errortxt: {
      color: '#DE0000',
      alignSelf: 'flex-end',
      textAlign: 'right',
      marginTop: 7,
      fontSize: 15,
      opacity: 0.46,
      flex: 1,
    },
  }));

  const EyeComponent = () => {
    if (eye == true) {
      return (
        <TouchableOpacity onPress={changeEye} style={s.eye}>
          <EyeIcon fill={theme.palette.placeholder} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={changeEye} style={s.eye}>
        <EyeOff fill={theme.palette.placeholder} />
      </TouchableOpacity>
    );
  };
  let multilineStyle = {textAlignVertical: 'top', paddingTop: 10};
  return (
    <>
      {text && (
        <Text style={[s.subtitle, textStyle]} {...textProps}>
          {text}
        </Text>
      )}
      {startIcon ? (
        <>
          <View style={[s.icon, iconStyle, style]}>
            {startIcon}
            <TextInput
              placeholder={placeholder}
              ref={refInput}
              style={[s.inputIcon, style]}
              secureTextEntry={hasEye ? show : secureTextEntry}
              placeholderTextColor={
                placeholderTextColor
                  ? placeholderTextColor
                  : theme.palette.placeholder
              }
              value={value}
              onChangeText={setValue}
              autoCapitalize="none"
              keyboardType={keyboardType}
              onSubmitEditing={onSubmitEditing}
              textContentType="none"
              autoCorrect={false}
              inputAccessoryViewID={inputAccessoryViewID}
            />
            {hasEye && <EyeComponent />}
          </View>
          {error ? (
            <Text style={[s.errortxt, errortxt]}>{errorMessage}</Text>
          ) : null}
        </>
      ) : hasEye == true ? (
        <>
          <View style={[s.icon, style]}>
            <TextInput
              ref={refInput}
              placeholder={placeholder}
              style={s.bigInput}
              secureTextEntry={show}
              keyboardType={keyboardType}
              placeholderTextColor={
                placeholderTextColor
                  ? placeholderTextColor
                  : theme.palette.placeholder
              }
              value={value}
              onChangeText={setValue}
              autoCapitalize="none"
              onSubmitEditing={onSubmitEditing}
              textContentType="none"
              autoCorrect={false}
              inputAccessoryViewID={inputAccessoryViewID}
            />
            <EyeComponent />
          </View>
          {error ? (
            <Text style={[s.errortxt, errortxt]}>{errorMessage}</Text>
          ) : null}
        </>
      ) : (
        <>
          <TextInput
            placeholder={placeholder}
            ref={refInput}
            style={[s.input, multiline ? multilineStyle : null, style]}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={
              placeholderTextColor
                ? placeholderTextColor
                : theme.palette.placeholder
            }
            value={value || null}
            onChangeText={setValue}
            multiline={multiline}
            autoCapitalize="none"
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            textContentType="none"
            autoCorrect={false}
            inputAccessoryViewID={inputAccessoryViewID}
          />
          {endIcon ? endIcon : null}
          {error ? (
            <Text style={[s.errortxt, errortxt]}>{errorMessage}</Text>
          ) : null}
        </>
      )}
    </>
  );
};

export default Textinput;
