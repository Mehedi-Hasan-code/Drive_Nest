import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../../utils/localStorage';

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Initialize state from localStorage on component mount
    const savedTheme = getFromLocalStorage('theme');
    return savedTheme === 'dark';
  });

  const handleToggleTheme = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };

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