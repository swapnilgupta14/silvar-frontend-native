// src/app/[auth]/forgot-password.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { Link } from 'expo-router';
import Input from '@/src/components/Input';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { forgotPassword } = useAuth();

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    try {
      await forgotPassword(email);
    } catch (error) {
      alert('Failed to process request: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-black">
      <Text className="text-3xl font-bold mb-8 text-center">Forgot Password</Text>
      
      <Text className="text-gray-600 mb-6 text-center">
        Enter your email address to receive a password reset link
      </Text>
      
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TouchableOpacity 
        className="bg-cyan-600 p-4 rounded-lg mt-6" 
        onPress={handleForgotPassword}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-bold">Reset Password</Text>
        )}
      </TouchableOpacity>
        
        <Link href="../login" asChild>
        <TouchableOpacity className="mt-6">
          <Text className="text-cyan-600 text-center">Back to Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}