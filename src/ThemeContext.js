import React, { createContext, useContext, useState, useMemo } from 'react';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const value = useMemo(
    () => ({ theme, isDark, toggleTheme: () => setIsDark((d) => !d) }),
    [theme, isDark]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
  return ctx;
}
