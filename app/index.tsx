import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import Animated from 'react-native-reanimated';
import { Text } from 'react-native';

export default function Index() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Animated.View 
        className="flex-1 justify-center items-center bg-black"
      >
        <Text className="text-4xl font-bold text-cyan-600">Your App Name</Text>
        <Text className="text-gray-500 mt-2">Loading...</Text>
      </Animated.View>
    );
  }

  return <Redirect href="/(tabs)/home" />;
}