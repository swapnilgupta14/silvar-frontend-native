import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const { resetPassword, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    try {
      await resetPassword(email);
      Alert.alert(
        'Success',
        'Password reset instructions have been sent to your email'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset instructions');
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Forgot Password
        </Text>
        <Text className="text-gray-600 mb-8">
          Enter your email to reset your password
        </Text>

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          icon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          className="w-full bg-blue-600 py-3 rounded-lg mt-4"
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-semibold">
            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-4">
          <Text className="text-blue-600 text-center">Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 