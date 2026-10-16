import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useAppTheme } from './src/ThemeContext';
import { HabitsProvider } from './src/HabitsContext';
import Navigation from './src/Navigation';

function Root() {
  const { isDark } = useAppTheme();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Navigation />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <HabitsProvider>
          <Root />
        </HabitsProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
