// src/components/Input.tsx
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  // Add any custom props here
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <View className="mb-4">
      <TextInput
        className="border border-gray-300 p-4 rounded-lg bg-gray-50"
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
};

export default Input;