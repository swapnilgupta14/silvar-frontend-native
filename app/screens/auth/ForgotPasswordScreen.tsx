import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import Link from 'expo-router/link';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const { resetPassword, isLoading } = useAuth();
  const router = useRouter();

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
      Alert.alert('Success', 'Password reset instructions have been sent to your email');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset instructions');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center p-4">
        <Text className="text-3xl font-bold text-white-smoke mb-2">
          Forgot Password
        </Text>
        <Text className="text-silver-mist mb-8">
          Enter your email to receive reset instructions
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
          className="w-full bg-deep-maroon py-3 rounded-lg mt-4"
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          <Text className="text-white-smoke text-center font-semibold">
            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
          </Text>
        </TouchableOpacity>

        <Link href="/auth/login" asChild>
          <TouchableOpacity className="mt-4">
            <Text className="text-deep-maroon text-center">Back to Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
} 