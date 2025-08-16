import { NavigatorScreenParams } from '@react-navigation/native';

type HomeStackParams = {
  Home: undefined;
};

type ProfileStackParams = {
  Profile: undefined;
};

type TabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParams>;
  ProfileStack: NavigatorScreenParams<ProfileStackParams>;
};

export type { HomeStackParams, ProfileStackParams, TabParamList };
