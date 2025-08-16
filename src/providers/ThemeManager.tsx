import { ThemeModeEnum, useThemeSlice } from '@store/useThemeSlice';
import React, { useEffect } from 'react';
import { Appearance, Platform, StatusBar } from 'react-native';
import debounce from 'lodash/debounce';

export const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const { setThemeMode, themeMode } = useThemeSlice(state => state);
  const { DARK } = ThemeModeEnum;

  const initAppearanceListener = () => {
    const listener: Appearance.AppearanceListener = debounce(
      () => {
        setThemeMode(Appearance.getColorScheme() as ThemeModeEnum);
      },
      200,
      { leading: false, trailing: true },
    );
    const changeListener = Appearance.addChangeListener(listener);
    return () => changeListener.remove();
  };

  useEffect(() => {
    initAppearanceListener();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={Platform.select({
          android: themeMode === DARK ? 'light-content' : 'dark-content',
          ios: 'default',
        })}
        backgroundColor="transparent"
        translucent
      />
      {children}
    </>
  );
};
