import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, useColorScheme } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface SocialButtonProps {
  label: string;
  isDarkMode: boolean;
}

const VALID_CREDENTIALS = {
  email: 'user@example.com',
  phone: '+1234567890',
  password: 'password123'
};

const LoginScreen = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleLogin = () => {
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const isValidEmail = identifier.includes('@');
      const isValidPhone = identifier.startsWith('+') && identifier.length >= 10;
      
      if ((isValidEmail && identifier === VALID_CREDENTIALS.email) ||
          (isValidPhone && identifier === VALID_CREDENTIALS.phone)) {
        if (password === VALID_CREDENTIALS.password) {
          Alert.alert('Success', 'Login successful!');
        } else {
          Alert.alert('Error', 'Invalid password');
        }
      } else {
        Alert.alert('Error', 'Invalid email or phone number');
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <StyledSafeAreaView className={`flex-1 ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      <StyledView className="flex-1 px-6">
        <StyledView className="mt-12 items-center">
          <StyledView className="w-24 h-24 bg-primary-500 rounded-full items-center justify-center mb-8 shadow-lg">
            <StyledText className="text-4xl font-bold text-white">N</StyledText>
          </StyledView>
          <StyledText className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-neutral-50' : 'text-neutral-800'}`}>
            Welcome Back
          </StyledText>
          <StyledText className={`text-center ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} text-base`}>
            Sign in to continue to your account
          </StyledText>
        </StyledView>

        {/* Login Form */}
        <StyledView className="mt-12">
          <StyledView className="mb-6">
            <StyledText className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              Email or Phone
            </StyledText>
            <StyledTextInput
              className={`${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} 
                p-4 rounded-xl border shadow-sm text-base
                ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}
              placeholder="Enter your email or phone"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#9CA3AF'}
              value={identifier}
              onChangeText={setIdentifier}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </StyledView>
          <StyledView className="mb-8">
            <StyledText className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              Password
            </StyledText>
            <StyledTextInput
              className={`${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} 
                p-4 rounded-xl border shadow-sm text-base
                ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}
              placeholder="Enter your password"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#9CA3AF'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </StyledView>
          <StyledTouchableOpacity
            className={`bg-primary-500 p-4 rounded-xl shadow-md ${isLoading ? 'opacity-70' : ''}`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <StyledView className="items-center">
              <StyledText className="text-white font-bold text-lg">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </StyledText>
            </StyledView>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Forgot Password Link */}
        <StyledTouchableOpacity
          className="mt-6"
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <StyledView className="items-center">
            <StyledText className="text-primary-500 font-medium">Forgot Password?</StyledText>
          </StyledView>
        </StyledTouchableOpacity>

        {/* Social Login Options */}
        <StyledView className="mt-auto mb-8">
          <StyledView className="flex-row items-center justify-center mb-8">
            <StyledView className={`flex-1 h-px ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
            <StyledText className={`mx-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Or continue with
            </StyledText>
            <StyledView className={`flex-1 h-px ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
          </StyledView>
          <StyledView className="flex-row justify-center space-x-4">
            <SocialButton label="G" isDarkMode={isDarkMode} />
            <SocialButton label="F" isDarkMode={isDarkMode} />
            <SocialButton label="A" isDarkMode={isDarkMode} />
          </StyledView>
          <StyledView className="flex-row justify-center mt-8">
            <StyledText className={`${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Don't have an account?
            </StyledText>
            <StyledTouchableOpacity className="ml-2">
              <StyledText className="text-primary-500 font-medium">Sign Up</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

const SocialButton = ({ label, isDarkMode }: SocialButtonProps) => (
  <StyledTouchableOpacity
    className={`${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} 
      p-4 rounded-xl border shadow-sm w-16 h-16 items-center justify-center`}
  >
    <StyledText className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
      {label}
    </StyledText>
  </StyledTouchableOpacity>
);

export default LoginScreen;
