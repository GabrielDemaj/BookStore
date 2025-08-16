import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import api, { storage as ApiStorage } from '@utils/api';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { CommonActions } from '@react-navigation/native';
import Toast from '@components/Toast';
import i18next from 'i18next';

type State = {
  id: string;
  books: any;
  singleBook: any;
  loading: boolean;
  error?: any;
  refreshing: boolean;
};

type Actions = {
  getBooks: (page: number, limit: number) => void;
  searchBooks: (search: any, page: number, limit: number) => void;
  getSingleBook: (id: any) => void;
  createBook: (Values: any) => void;
  editBook: (Values: any) => void;
  deleteBook: (id: any) => void;
};

const initialState: State = {
  id: 'use-books',
  loading: false,
  books: [],
  error: null,
  refreshing: true,
  singleBook: null,
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

export const useBooks = createWithEqualityFn<
  Store,
  [['zustand/persist', Store]]
>(
  persist(
    (set, get) => ({
      ...initialState,

      getBooks: async (page, limit) => {
        console.log('called', api);
        try {
          const res = await api.get('/books', { data: { page, limit } });
          console.log('res.data', res.data.items);
          set({
            books: res.data.items,
            refreshing: false,
            error: null,
          });
        } catch (error: any) {
          console.log('error ', error.response.data);
          Toast.show({
            text1: i18next.t('oopsSomethingWentWrong'),
            text2: error?.response?.data?.errors?.['__all__'],
            type: 'error',
          });
          set({
            error: error?.response?.data?.errors || null,
            refreshing: false,
          });
        }
      },
      searchBooks: async values => {
        try {
          const res = await api.get('/books', values);
          console.log('res.data', res.data);
          let user = res.data.user;
          console.log('user', user);
          set({
            error: null,
            loading: false,
          });
        } catch (error: any) {
          console.log('error ', error.response.data);
          Toast.show({
            text1: i18next.t('oopsSomethingWentWrong'),
            text2: error?.response?.data?.errors?.['__all__'],
            type: 'error',
          });
          set({
            error: error?.response?.data?.errors || null,
            loading: false,
          });
        }
      },
      getSingleBook: async id => {
        try {
          const res = await api.get('/books', id);
          console.log('res.data', res.data);
          set({
            error: null,
            loading: false,
          });
        } catch (error: any) {
          console.log('error ', error.response.data);
          set({
            error: error?.response?.data?.errors || null,
            loading: false,
          });
        }
      },
      createBook: async values => {
        try {
          const res = await api.post('/books', values);
          console.log('res.data', res.data);
          set({
            error: null,
            loading: false,
          });
        } catch (error: any) {
          console.log('error ', error.response.data);
          set({
            error: error?.response?.data?.errors || null,
            loading: false,
          });
        }
      },
      editBook: async values => {
        try {
          const res = await api.put('/books', values);
          console.log('res.data', res.data);
          set({
            error: null,
            loading: false,
          });
        } catch (error: any) {
          console.log('error ', error.response.data);
          set({
            error: error?.response?.data?.errors || null,
            loading: false,
          });
        }
      },
      deleteBook: async id => {
        try {
          const res = await api.delete('/books', id);
          console.log('res.data', res.data);
          set({
            error: null,
            loading: false,
          });
        } catch (error: any) {
          console.log('error ', error.response.data);
          set({
            error: error?.response?.data?.errors || null,
            loading: false,
          });
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
