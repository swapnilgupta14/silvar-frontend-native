import "../src/styles/global.css";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { ToastProvider } from "../src/components/ToastProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import LoadingScreen from "../src/components/LoadingScreen";

function ErrorFallback({ error, resetErrorBoundary }: Readonly<FallbackProps>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Something went wrong
      </Text>
      <Text style={{ marginBottom: 20 }}>
        {error?.message || "An unexpected error occurred"}
      </Text>
      <TouchableOpacity
        onPress={resetErrorBoundary}
        style={{ padding: 10, backgroundColor: '#007AFF', borderRadius: 5 }}
      >
        <Text style={{ color: 'white' }}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
}

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    try {
      const inAuthGroup = segments[0] === "auth";
      const isProtectedRoute = segments[1] === "community" || segments[1] === "profile";

      if (!user) {
        if (isProtectedRoute) {
          router.push("/auth?type=signin");
        } else if (inAuthGroup) {
          return;
        }
      } else if (inAuthGroup) {
        router.push("/(tabs)/home");
      }

      if (!segments.length) {
        router.push("/(tabs)/home");
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [user, isLoading, segments, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="auth" 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true
        }} 
      />
      <Stack.Screen 
        name="notification" 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true
        }} 
      />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const handleReset = () => {
    console.log("Error boundary reset");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
        <AuthProvider>
          <ToastProvider>
            <RootLayoutNav />
          </ToastProvider>
        </AuthProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}