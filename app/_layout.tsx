import "../src/styles/global.css";
import React from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import AnimatedSplashScreen from "../src/components/AnimatedSplashScreen";
import { ToastProvider } from "../src/components/ToastProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";
    const isProtectedRoute = segments[1] === "community" || segments[1] === "profile";

    if (!user && isProtectedRoute) {
      // Redirect to login if trying to access protected routes
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth screens
      router.replace("/(tabs)/home");
    }

    // Mark navigation as ready after initial checks
    setIsNavigationReady(true);
  }, [user, isLoading, segments]);

  // Show splash screen while loading or navigation not ready
  if (isLoading || !isNavigationReady) {
    return (
      <AnimatedSplashScreen>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </AnimatedSplashScreen>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ToastProvider>
          <RootLayoutNav />
        </ToastProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
