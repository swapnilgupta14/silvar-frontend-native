import "../src/styles/global.css";
import React from "react";
import { Stack } from "expo-router";
import { ToastProvider } from "../src/components/ui/ToastProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native";
import useFonts from "../src/hooks/useFonts";

const RootLayoutNav = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
      }} />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="notification"
        options={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
        }}
      />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <Text>Loading fonts…</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <RootLayoutNav />
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
