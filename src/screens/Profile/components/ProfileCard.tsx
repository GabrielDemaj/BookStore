import { Image, ScrollView, Switch, View } from 'react-native';
import Text from '@components/Text';
import Button from '@components/Button';
import { useStyles } from '@hooks/useStyles';
import { useAuth } from '@store/useAuth';
import { shallow } from 'zustand/shallow';
import { useBookStoreNavigation } from '@utils/useBookStoreNavigation';
import { t } from 'i18next';
import { ThemeModeEnum, useThemeSlice } from '@store/useThemeSlice';
import useTheme from '@hooks/useTheme';
import Divider from '@components/Divider';

type Props = {};

const ProfileCard = (props: Props) => {
  const { logOut, user, loading } = useAuth(state => state, shallow);
  const { goBack, navigate } = useBookStoreNavigation();
  const { themeMode, setThemeMode } = useThemeSlice(state => state);
  const theme = useTheme();
  const { DARK, LIGHT } = ThemeModeEnum;
  const handleToggle = () => {
    setThemeMode(themeMode === DARK ? LIGHT : DARK);
  };

  const handleLogout = () => {
    logOut();
    goBack();
  };

  const s = useStyles(theme => ({
    container: {
      flex: 1,
      paddingVertical: 20,
    },
    card: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.palette.gray,
      borderRadius: 10,
      padding: 10,
      ...theme.shadows.standard,
      elevation: 1,
      backgroundColor: theme.palette.background,
    },
    btn: {
      width: theme.percentWidth(30),
      height: 40,
      marginTop: 20,
    },
    logout: {
      marginBottom: theme.insets.bottom,
      width: theme.percentWidth(30),
      height: 40,
      backgroundColor: theme.palette.error,
    },
    img: { width: 70, height: 70 },
    name: {
      fontSize: 20,
      fontFamily: theme.fonts.bold,
    },
    email: {
      fontSize: 16,
      opacity: 0.6,
    },
    switch: {
      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    aligner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    appearence: {
      fontSize: 16,
      fontFamily: theme.fonts.semiBold,
    },
  }));
  return (
    <View style={s.container}>
      <View style={s.card}>
        <Image source={require('@assets/profile.png')} style={s.img} />
        <View style={{ marginLeft: 10 }}>
          <Text style={s.name}>{user?.name}</Text>
          <Text style={s.email}>{user?.email}</Text>
        </View>
      </View>
      <Button
        text={t('createBook')}
        style={s.btn}
        onPress={() => navigate('CreateBookScreen')}
      />
      <Divider />
      <View style={s.aligner}>
        <Text style={s.appearence}>{t('appearence')}</Text>
        <Switch
          style={s.switch}
          value={themeMode === DARK}
          onValueChange={handleToggle}
          trackColor={{
            false: theme.palette.border, // Light mode track color
            true: theme.palette.primary, // Dark mode track color
          }}
          thumbColor={theme.palette.primary}
          ios_backgroundColor={theme.palette.border}
        />
      </View>
      <View style={{ flex: 1 }} />
      <Button
        text={t('logout')}
        style={s.logout}
        onPress={handleLogout}
        loading={loading}
      />
    </View>
  );
};

export default ProfileCard;
