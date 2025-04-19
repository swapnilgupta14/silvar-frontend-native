import React, { useCallback, useEffect, useState } from 'react';
import "./styles/global.css"
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import AnimatedSplashScreen from './components/AnimatedSplashScreen';
import AuthProvider from './context/AuthContext';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore errors */
});

export default function RootLayout(): JSX.Element {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [showAnimatedSplash, setShowAnimatedSplash] = useState<boolean>(true);
  
  const [fontsLoaded] = useFonts({
    'BrightDemo': require('../assets/fonts/Bright DEMO.otf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise<void>((resolve) => {
          if (fontsLoaded) {
            resolve();
          }
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (appIsReady) {
      const timer = setTimeout(() => {
        setShowAnimatedSplash(false);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View className="flex-1" />;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <View className="flex-1" onLayout={onLayoutRootView}>
          {showAnimatedSplash ? (
            <AnimatedSplashScreen />
          ) : (
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'black' },
              }}
            />
          )}
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );
}