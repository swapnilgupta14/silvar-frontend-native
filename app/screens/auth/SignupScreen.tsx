import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import Link from 'expo-router/link';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { signup, isLoading } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      await signup(email, password, name);
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center p-4">
        <Text className="text-3xl font-bold text-white-smoke mb-2">
          Create Account
        </Text>
        <Text className="text-silver-mist mb-8">
          Sign up to get started
        </Text>

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          error={errors.name}
          icon="person-outline"
        />

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

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          icon="lock-closed-outline"
          secureTextEntry
        />

        <TouchableOpacity
          className="w-full bg-deep-maroon py-3 rounded-lg mt-4"
          onPress={handleSignup}
          disabled={isLoading}
        >
          <Text className="text-white-smoke text-center font-semibold">
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-silver-mist">Already have an account? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text className="text-deep-maroon">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
} 