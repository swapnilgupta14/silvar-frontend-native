// src/app/(tabs)/profile.tsx
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'expo-router';

export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Additional security to prevent access even if someone bypasses tab routing
  useEffect(() => {
    if (!user) {
      router.push('/auth?type=signin' as any);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <View className="flex-1 bg-black p-6">
      <Text className="text-3xl font-bold mb-6">Profile</Text>
      
      <View className="bg-gray-50 p-6 rounded-lg mb-6">
        <Text className="text-lg font-medium text-gray-800">Username: {user.username}</Text>
        <Text className="text-gray-600 mt-2">Email: {user.email}</Text>
      </View>
      
      <TouchableOpacity 
        className="bg-cyan-600 p-4 rounded-lg mt-6" 
        onPress={signOut}
      >
        <Text className="text-white text-center font-bold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}