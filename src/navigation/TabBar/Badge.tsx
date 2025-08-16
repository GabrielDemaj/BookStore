import {View, ViewStyle} from 'react-native';
import React from 'react';
import Text from '@components/Text';
import {useStyles} from '@hooks/useStyles';

type Props = {
  style?: ViewStyle;
  value?: number;
};

const Badge = ({style, value}: Props) => {
  const s = useStyles(theme => ({
    item: {
      direction: 'inherit',
      backgroundColor: theme.palette.primary,
      width: 15,
      height: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      overflow: 'hidden',
      marginLeft: 7,
      position: 'absolute',
      zIndex: 2000,
      top: -10,
      left: 12,
    },
    txt: {
      color: '#fff',
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      lineHeight: 15,
      paddingVertical: 2.5,
    },
  }));
  return (
    <View style={[s.item, style]}>
      <Text style={s.txt}>{value}</Text>
    </View>
  );
};

export default Badge;
