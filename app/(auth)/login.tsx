import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { Link } from 'expo-router';
import Input from '@/src/components/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(email, password);
    } catch (error) {
      alert('Failed to login: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-black">
      <Text className="text-3xl font-bold mb-8 text-center">Login</Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        className="bg-cyan-600 p-4 rounded-lg mt-6"
        onPress={handleLogin}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-bold">Login</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600">Don't have an account? </Text>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity>
            <Text className="text-cyan-600 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Link href="/(auth)/forgot-password" asChild>
        <TouchableOpacity className="mt-4">
          <Text className="text-cyan-600 text-center">Forgot Password?</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}