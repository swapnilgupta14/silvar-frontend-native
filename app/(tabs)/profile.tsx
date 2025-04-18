// src/app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Profile() {

  return (
    <View className="flex-1 bg-black p-6">
      <Text className="text-3xl font-bold mb-6">Profile</Text>
      
      <View className="bg-gray-50 p-6 rounded-lg mb-6">
        <Text className="text-lg font-medium text-gray-800">Username: hb</Text>
        <Text className="text-gray-600 mt-2">Email: vbhb</Text>
      </View>
      
      <TouchableOpacity 
        className="bg-cyan-600 p-4 rounded-lg mt-6" 
      >
        <Text className="text-white text-center font-bold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}