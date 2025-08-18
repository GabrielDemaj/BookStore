import Toast from '@components/Toast';
import api, { storage as ApiStorage } from '@utils/api';
import { navigationContainerRef } from '@utils/useBookStoreNavigation';
import { t } from 'i18next';
import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

type State = {
  id: string;
  isAuthenticated: boolean;
  loading: boolean;
  error?: any;
  user?: any;
  refreshing: boolean;
};

type Actions = {
  authenticate: (values: any, navigate?: any) => void;
  register: (values: any, navigate?: any) => void;
  clearErrors: () => void;
  logOut: () => void;
  handleRefresh: () => void;
  getProfile: () => void;
};

const initialState: State = {
  id: 'use-auth',
  loading: false,
  isAuthenticated: false,
  error: null,
  user: null,
  refreshing: false,
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

export const useAuth = createWithEqualityFn<
  Store,
  [['zustand/persist', Store]]
>(
  persist(
    (set, get) => ({
      ...initialState,

      authenticate: async (values, navigate) => {
        console.log('values', values);
        set({ loading: true });
        try {
          const res = await api.post('/auth/login', values);
          console.log('login', res.data);
          await ApiStorage.setItem('accessToken', res.data.accessToken);
          await ApiStorage.setItem('refreshToken', res.data.refreshToken);
          console.log('res.data.user', res.data);
          let user = res.data.user;
          console.log('user', user);
          get().getProfile();
          set({
            error: null,
            user: user,
            isAuthenticated: true,
            loading: false,
          });
          if (navigate) {
            navigationContainerRef.goBack();
          }
        } catch (error: any) {
          console.log('error login2', error.response.data);
          Toast.show({
            text1: t('oopsSomethingWentWrong'),
            text2: error?.response?.data?.message || error?.response?.data,
            type: 'error',
          });
          set({
            error: error?.response?.data?.message || error?.response?.data,
            loading: false,
          });
        }
      },
      register: async (values, navigate) => {
        try {
          const res = await api.post('/register/', values);
          console.log('register', res.data);
          set({
            error: null,
            loading: false,
          });
          if (navigate) {
            navigate?.current?.present();
          }
        } catch (error: any) {
          console.log('register', error.response.data);
          set({
            error: error.response.data.errors || null,
            loading: false,
          });
        }
      },

      updateRandom: (payload: any) => {
        const state = get();
        set({
          ...state,
          ...payload,
        });
      },
      clearErrors: () => {
        set({ error: null, loading: false });
      },
      logOut: async () => {
        set({ loading: true });
        try {
          await ApiStorage.removeItem('accessToken');
          await ApiStorage.removeItem('refreshToken');
          set({ user: null, isAuthenticated: false, loading: false });
        } catch (error: any) {
          set({ loading: false });
        }
      },

      handleRefresh: async () => {
        const refreshToken = await ApiStorage.getItem('refreshToken');
        console.log('refreshToken', refreshToken);

        try {
          const res = await api.post('/auth/refresh', { token: refreshToken });
          console.log('res.data handleRefresh', res.data);
          await ApiStorage.setItem('accessToken', res.data.accessToken);
        } catch (error: any) {
          console.log('error handleRefresh ', error.response.data);
          get().logOut();
        }
      },

      getProfile: async () => {
        set({ refreshing: true });
        try {
          const res = await api.get('/auth/profile/');
          console.log(res.data);
          set({ user: res.data, refreshing: false });
        } catch (error: any) {
          set({ refreshing: false });
        }
      },
    }),
    {
      name: initialState.id,
      storage: createJSONStorage(() => storage),
    },
  ),
  shallow,
);
