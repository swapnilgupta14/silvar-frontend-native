import "../src/styles/global.css";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { ToastProvider } from "../src/components/ToastProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import LoadingScreen from "../src/components/LoadingScreen";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    }}
  >
    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
      Something went wrong
    </Text>
    <Text style={{ marginBottom: 20 }}>
      {error?.message || "An unexpected error occurred"}
    </Text>
    <TouchableOpacity
      onPress={resetErrorBoundary}
      style={{ padding: 10, backgroundColor: "#007AFF", borderRadius: 5 }}
    >
      <Text style={{ color: "white" }}>Try again</Text>
    </TouchableOpacity>
  </View>
);

const RootLayoutNav = () => {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";
    const isProtectedRoute = segments[1] === "profile" || segments[1] === "community";

    if (!user && isProtectedRoute) {
      router.push("/login");
    } else if (user && inAuthGroup) {
      router.push("/(tabs)/home");
    } else if (!segments.length) {
      router.push("/(tabs)/home");
    }
  }, [user, segments, router]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => console.log("Error boundary reset")}
      >
        <ToastProvider>
          <AuthProvider>
            <RootLayoutNav />
          </AuthProvider>
        </ToastProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
