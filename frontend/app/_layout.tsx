import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { AppProvider } from '../context/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0E0F12' },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="session" />
          <Stack.Screen name="complete" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="stats" />
        </Stack>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
