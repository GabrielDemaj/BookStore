import { useStyles } from '@hooks/useStyles';
import { DimensionValue, View, ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
  height?: DimensionValue | undefined;
};

const Divider = ({ style, height = 20 }: Props) => {
  const s = useStyles({
    divider: {
      height: 20,
    },
  });

  return <View style={[s.divider, style, { height }]} />;
};

export default Divider;
