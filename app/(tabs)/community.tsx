// src/app/(tabs)/community.tsx
import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'expo-router';

export default function Community() {
  const { user } = useAuth();
  const router = useRouter();

  // Additional security to prevent access even if someone bypasses tab routing
  useEffect(() => {
    if (!user) {
      router.replace('/(auth)/login' as any);
    }
  }, [user]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="p-6">
        <Text className="text-3xl font-bold mb-6">Community</Text>
        <Text className="text-gray-600 mb-4">
          Welcome to the community section! This area is only accessible to logged-in users.
        </Text>
        <Text className="font-medium text-gray-800">
          Here you can connect with other users, join discussions, and participate in community events.
        </Text>
      </View>
    </ScrollView>
  );
}