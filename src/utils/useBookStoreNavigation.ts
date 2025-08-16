import {
  createNavigationContainerRef,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export function useBookStoreNavigation() {
  return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
}

export const navigationContainerRef =
  createNavigationContainerRef<RootStackParamList>();
