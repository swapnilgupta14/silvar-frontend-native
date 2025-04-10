// src/app/(tabs)/explore.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function Explore() {
  return (
    <ScrollView className="flex-1 bg-black">
      <View className="p-6">
        <Text className="text-3xl font-bold mb-6">Explore</Text>
        <Text className="text-gray-600">
          This screen is accessible to all users. Browse and discover content here.
        </Text>
      </View>
    </ScrollView>
  );
}