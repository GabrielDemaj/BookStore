import { useStyles } from '@hooks/useStyles';
import ArrowLeft from '@icons/back.svg';
import { use } from 'react';
import { TouchableOpacity } from 'react-native';

type Props = { onPress: () => void };

const GoBack = ({ onPress }: Props) => {
  const s = useStyles(theme => ({
    icon: {
      top: 30,
      position: 'absolute',
      backgroundColor: theme.palette.primary,
      zIndex: 1000,
      borderRadius: 2000,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      left: 20,
    },
  }));
  return (
    <TouchableOpacity style={s.icon} onPress={onPress}>
      <ArrowLeft fill="white" stroke={'white'} color={'white'} />
    </TouchableOpacity>
  );
};

export default GoBack;
