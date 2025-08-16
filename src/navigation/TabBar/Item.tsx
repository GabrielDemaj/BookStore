import Text from '@components/Text';
import { useStyles } from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import DotsIcon from '@icons/nav/dots.svg';
import HomeIcon from '@icons/nav/home.svg';
import React from 'react';
import { View } from 'react-native';

type IconProps = {
  focused: boolean;
  label: string;
};
type ItemProps = {
  isCurrent: boolean;
  label: string;
};

const Icon: React.FC<IconProps> = ({ focused, label }) => {
  const theme = useTheme();

  const s = useStyles(theme => ({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: focused ? theme.palette.primary : theme.palette.bottom,
      fontSize: 12,
      paddingTop: 5,
    },
  }));

  const color = theme.palette.primary;

  if (label === 'HomeStack') {
    return (
      <View style={s.container}>
        <HomeIcon fill={focused ? color : theme.palette.bottom} />
        <Text style={s.text}>Home</Text>
      </View>
    );
  }

  if (label === 'ProfileStack') {
    return (
      <View style={s.container}>
        <DotsIcon fill={focused ? color : theme.palette.bottom} />
        <Text style={s.text}>Profile</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>?</Text>
    </View>
  );
};

export default function Item({ isCurrent, label }: ItemProps) {
  return (
    <View
      style={{
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon label={label} focused={isCurrent} />
    </View>
  );
}
