import { useLocalSearchParams } from "expo-router";
import Login from "../src/components/auth/login";
import SignUp from "../src/components/auth/signup";
import ForgotPassword from "../src/components/auth/forgot-password";
import { View, Text, TouchableOpacity } from "react-native";
import { Suspense } from "react";
import LoadingScreen from "../src/components/LoadingScreen";
import { ErrorBoundary } from "react-error-boundary";

const AuthComponents = {
  signin: Login,
  signup: SignUp,
  "forgot-password": ForgotPassword,
};

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  readonly error: Error;
  readonly resetErrorBoundary: () => void;
}) {
  return (
    <View className="flex-1 bg-black items-center justify-center p-4">
      <Text className="text-white text-lg mb-4">Something went wrong</Text>
      <Text className="text-gray-400 text-center mb-6">{error.message}</Text>
      <TouchableOpacity
        onPress={resetErrorBoundary}
        className="bg-white px-6 py-3 rounded-full"
      >
        <Text className="text-black font-semibold">Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Auth() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const authType = type || "signin";
  const AuthComponent =
    AuthComponents[authType as keyof typeof AuthComponents] || Login;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingScreen />}>
        <AuthComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
