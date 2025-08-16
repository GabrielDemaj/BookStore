import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';
import { Appearance } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type State = {
  id: string;
  themeMode: ThemeModeEnum;
};

type Actions = {
  setThemeMode: (payload: ThemeModeEnum) => void;
};

export enum ThemeModeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}
// Enable dark mode sync
export const defaultMode = Appearance.getColorScheme();
// export const defaultMode = ThemeModeEnum.LIGHT;

const initialState = {
  id: 'use-theme-slice',
  themeMode: defaultMode as ThemeModeEnum,
};

export const persistStorage = new MMKV({ id: initialState.id });

export const storage: StateStorage = {
  setItem: (name, value) => {
    return persistStorage.set(name, value);
  },
  getItem: name => {
    const value = persistStorage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return persistStorage.delete(name);
  },
};

type Store = State & Actions;

export const useThemeSlice = createWithEqualityFn<
  Store,
  [['zustand/persist', Store]]
>(
  persist(
    set => ({
      ...initialState,
      setThemeMode: payload => {
        set({ themeMode: payload });
      },
    }),

    {
      name: initialState.id,
      storage: createJSONStorage(() => storage),
    },
  ),
  shallow,
);
