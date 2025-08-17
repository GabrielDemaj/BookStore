import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import api, { storage as ApiStorage } from '@utils/api';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { CommonActions } from '@react-navigation/native';
import Toast from '@components/Toast';
import i18next, { t } from 'i18next';
import { navigationContainerRef } from '@utils/useBookStoreNavigation';

type State = {
  id: string;
  books: any;
  singleBook: any;
  loading: boolean;
  error?: any;
  refreshing: boolean;
  singleBookRefreshing: boolean;
  search: string;
};

type Actions = {
  getBooks: (page: number, limit: number) => void;
  searchBooks: (search: any, page?: number, limit?: number) => void;
  getSingleBook: (id: any) => void;
  createBook: (Values: any) => void;
  editBook: (Values: any) => void;
  deleteBook: (id: any) => void;
  setSearch: (value: string) => void;
  updateRandom: (payload: any) => void;
};

const initialState: State = {
  id: 'use-books',
  loading: false,
  books: [],
  error: null,
  refreshing: true,
  singleBookRefreshing: false,
  singleBook: null,
  search: '',
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
        // set({ refreshing: true });
        console.log('getBooks called', api);
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
            text2: error.response.data,
            type: 'error',
          });
          set({
            error: error.response.data || null,
            refreshing: false,
          });
        }
      },
      searchBooks: async (query: string, page = 1, limit = 20) => {
        set({ refreshing: true, loading: true }); // show spinner
        console.log('searchBooks called', query);
        try {
          const res = await api.get('/books/search', {
            params: { search: query, page, limit }, // use query params
          });
          console.log('searchBooks result', res.data.items);

          set({
            books: res.data.items, // update the book list
            error: null,
            loading: false,
            refreshing: false,
          });
        } catch (error: any) {
          console.log('error', error.response?.data);
          Toast.show({
            text1: i18next.t('oopsSomethingWentWrong'),
            text2: error.response.data,
            type: 'error',
          });
          set({
            error: error.response.data || null,
            loading: false,
            refreshing: false,
          });
        }
      },

      getSingleBook: async id => {
        try {
          const res = await api.get(`/books/${id}`);
          console.log('res.data getSingleBook', res.data);
          set({
            error: null,
            singleBook: res.data,
            singleBookRefreshing: false,
          });
        } catch (error: any) {
          console.log('error ', error.response.data);
          set({
            error: error.response.data || null,
            singleBook: [],
            singleBookRefreshing: false,
          });
        }
      },
      createBook: async values => {
        try {
          const res = await api.post('/books', values);
          console.log('res.data createBook', res.data);
          set({
            error: null,
            loading: false,
          });

          get().searchBooks(values.title, 1, 20);

          navigationContainerRef.navigate('Home');
        } catch (error: any) {
          console.log('error createBook ', error.response.data);
          Toast.show({
            text1: t('oopsSomethingWentWrong'),
            text2: error.response.data.message || error.response.data,
          });

          set({
            error: error.response.data || null,
            loading: false,
          });
        }
      },
      editBook: async values => {
        let id = values.id;
        delete values.id;
        try {
          const res = await api.put(`/books/${id}`, values);
          get().getSingleBook(id);
          console.log('res.data', res.data);
          set({
            error: null,
            loading: false,
          });
          Toast.show({
            text1: t('success'),
            text2: t('dataSuccessfullyCreated'),
          });
        } catch (error: any) {
          console.log('error ', error.response.data);
          Toast.show({
            text1: t('oopsSomethingWentWrong'),
            text2: error.response.data.message || error.response.data,
          });
          set({
            error: error.response.data || null,
            loading: false,
          });
        }
      },
      deleteBook: async id => {
        try {
          const res = await api.delete(`/books/${id}`);
          console.log('res.data', res.data);
          set({
            error: null,
            loading: false,
          });
          get().getBooks(1, 20);
          Toast.show({
            text1: t('success'),
            text2: t('dataSuccessfullyDeleted'),
          });
          navigationContainerRef.navigate('Home');
        } catch (error: any) {
          console.log('error ', error.response.data);
          Toast.show({
            text1: t('oopsSomethingWentWrong'),
            text2: error.response.data.message || error.response.data,
          });
          set({
            error: error.response.data || null,
            loading: false,
          });
        }
      },
      setSearch: (value: string) => set({ search: value }),
      updateRandom: (payload: any) => {
        const state = get();
        set({
          ...state,
          ...payload,
        });
      },
    }),
    {
      name: initialState.id,
      storage: createJSONStorage(() => storage),
    },
  ),
  shallow,
);
