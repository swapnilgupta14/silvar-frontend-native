import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Input from '@/src/components/Input';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View className="flex-1 bg-black p-6">
      <Text className="text-3xl font-bold mb-6">Search</Text>
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
      />
      <ScrollView className="mt-4">
        <Text className="text-gray-600">
          This screen is accessible to all users. Search for content here.
        </Text>
      </ScrollView>
    </View>
  );
}