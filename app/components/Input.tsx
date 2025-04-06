import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function Input({ 
  label, 
  error, 
  icon, 
  style, 
  ...props 
}: InputProps) {
  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-gray-700 text-sm font-medium mb-1">
          {label}
        </Text>
      )}
      <View className="relative">
        {icon && (
          <View className="absolute left-3 top-3">
            <Ionicons name={icon} size={20} color="#6B7280" />
          </View>
        )}
        <TextInput
          className={`
            w-full px-4 py-3 rounded-lg border
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${icon ? 'pl-10' : ''}
            bg-white
            text-gray-900
          `}
          placeholderTextColor="#9CA3AF"
          style={style}
          {...props}
        />
      </View>
      {error && (
        <Text className="text-red-500 text-xs mt-1">
          {error}
        </Text>
      )}
    </View>
  );
} 