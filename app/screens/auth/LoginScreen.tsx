import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import Link from 'expo-router/link';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await login(email, password);
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center p-4">
        <Text className="text-3xl font-bold text-white-smoke mb-2">
          Welcome Back
        </Text>
        <Text className="text-silver-mist mb-8">
          Sign in to continue to your account
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

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          icon="lock-closed-outline"
          secureTextEntry
        />

        <TouchableOpacity
          className="w-full bg-deep-maroon py-3 rounded-lg mt-4"
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text className="text-white-smoke text-center font-semibold">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-silver-mist">Don't have an account? </Text>
          <Link href="/auth/signup" asChild>
            <TouchableOpacity>
              <Text className="text-deep-maroon">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Link href="/auth/forgot-password" asChild>
          <TouchableOpacity className="mt-4">
            <Text className="text-deep-maroon text-center">Forgot Password?</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
} 