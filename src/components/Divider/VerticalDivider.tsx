import { useStyles } from '@hooks/useStyles';
import { View, ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
};

const VerticalDivider = ({ style }: Props) => {
  const s = useStyles(theme => ({
    divider: {
      height: '100%',
      width: 1,
      backgroundColor: theme.palette.gray,
    },
  }));

  return <View style={[s.divider, style]} />;
};

export default VerticalDivider;
