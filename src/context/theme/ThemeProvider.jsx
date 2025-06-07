import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../../utils/localStorage';

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const handleToggleTheme = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };

  useEffect(() => {
    const savedTheme = getFromLocalStorage('theme');

    if (savedTheme) {
      const isDarkTheme = savedTheme === 'dark';

      setIsDark(isDarkTheme);

      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      setIsDark(prefersDark);

      const defaultTheme = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', defaultTheme);

      setToLocalStorage('theme', defaultTheme);
    }
  }, []);

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);

    setToLocalStorage('theme', theme);
  }, [isDark]);

  const themeInfo = {
    isDark,
    setIsDark,
    handleToggleTheme,
  };
  return (
    <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
