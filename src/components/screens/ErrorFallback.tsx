import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  readonly error: Error;
  readonly resetErrorBoundary: () => void;
}) {
  return (
    <View className="flex-1 bg-black items-center justify-center p-4">
      <Text className="text-white text-lg mb-4">Something went wrong</Text>
      <Text className="text-gray-400 text-center mb-6">
        {error?.message || "An unexpected error occurred"}
      </Text>
      <TouchableOpacity
        onPress={resetErrorBoundary}
        className="bg-white px-6 py-3 rounded-full"
      >
        <Text className="text-black font-semibold">Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}
