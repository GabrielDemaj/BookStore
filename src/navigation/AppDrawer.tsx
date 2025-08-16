import ActivityIndicator from '@components/ActivityIndicator';
import Header from '@components/Header';
import useTheme from '@hooks/useTheme';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Home from '@screens/Home';
import Profile from '@screens/Profile';
import { useAuth } from '@store/useAuth';
import {
  navigationContainerRef,
  RootStackParamList,
} from '@utils/useBookStoreNavigation';
import { View } from 'react-native';
import { t } from 'i18next';

const RootStack = createStackNavigator<RootStackParamList>();

const Authenticated = () => {
  const theme = useTheme();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{
          cardStyle: { backgroundColor: theme.palette.background },
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <RootStack.Screen
        name="Profile"
        component={Profile}
        options={{
          cardStyle: { backgroundColor: theme.palette.background },

          ...TransitionPresets.DefaultTransition,
          animation: 'slide_from_right',
          header: () => <Header middleText={t('profile')} />,
        }}
      />
    </RootStack.Navigator>
  );
};
function Nav() {
  const theme = useTheme();
  return (
    <NavigationContainer
      ref={navigationContainerRef}
      theme={theme.isDarkMode ? DarkTheme : DefaultTheme}
      fallback={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color="blue" size="large" />
        </View>
      }
    >
      {/* {isAuthenticated ? <Authenticated /> : <NotAuthenticated />} */}
      <Authenticated />
    </NavigationContainer>
  );
}

export default Nav;
