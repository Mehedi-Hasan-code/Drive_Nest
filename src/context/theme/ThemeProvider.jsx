import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../../utils/localStorage';

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false); // Start with a consistent default
  const [isClient, setIsClient] = useState(false); // Track if we're on client side

  // Set isClient to true after mount to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    // Now safely access localStorage
    const savedTheme = getFromLocalStorage('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };

  useEffect(() => {
    if (isClient) {
      // Only run on client side
      const theme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      setToLocalStorage('theme', theme);
    }
  }, [isDark, isClient]);

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
