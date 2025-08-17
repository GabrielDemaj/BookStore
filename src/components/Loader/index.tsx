import ActivityIndicator from '@components/ActivityIndicator';
import { useStyles } from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { View, ViewStyle } from 'react-native';

type Props = {
  containerStyle?: ViewStyle;
};

const Loader = ({ containerStyle }: Props) => {
  const theme = useTheme();

  const s = useStyles(theme => ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.background,
    },
  }));

  return (
    <View style={[s.container, containerStyle]}>
      <ActivityIndicator color={theme.palette.primary} />
    </View>
  );
};

export default Loader;
