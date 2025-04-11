import '../src/styles/global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import AnimatedSplashScreen from '../src/components/AnimatedSplashScreen';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AnimatedSplashScreen>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </AnimatedSplashScreen>
    </AuthProvider>
  );
}