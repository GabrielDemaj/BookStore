import Text from '@components/Text';
import { useStyles } from '@hooks/useStyles';
import ArrowLeft from '@icons/back.svg';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@store/useAuth';
import { useBookStoreNavigation } from '@utils/useBookStoreNavigation';
import { useCallback } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { shallow } from 'zustand/shallow';
import Login from './components/Login';
import ProfileCard from './components/ProfileCard';
import useTheme from '@hooks/useTheme';

type Props = {};

const Profile = (props: Props) => {
  const { goBack } = useBookStoreNavigation();
  const theme = useTheme();
  const { isAuthenticated, handleRefresh } = useAuth(state => state, shallow);
  useFocusEffect(
    useCallback(() => {
      handleRefresh();
    }, []),
  );
  const s = useStyles(theme => ({
    container: {
      flex: 1,
      padding: 20,
    },
    aligner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icon: {
      top: 30,
      position: 'absolute',
      zIndex: 1000,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      left: 10,
    },
    title: {
      fontSize: 24,
      fontFamily: theme.fonts.bold,
      textAlign: 'center',
      color: theme.palette.primary,
      marginTop: 15,
    },
    btn: {
      marginBottom: theme.insets.bottom,
      width: theme.percentWidth(30),
      height: 40,
    },
  }));
  return (
    <ScrollView contentContainerStyle={s.container}>
      <TouchableOpacity style={s.icon} onPress={goBack}>
        <ArrowLeft fill={theme.palette.primary} />
      </TouchableOpacity>
      <Text style={s.title}>Profile</Text>
      {isAuthenticated ? <ProfileCard /> : <Login />}
    </ScrollView>
  );
};

export default Profile;
