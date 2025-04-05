import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

const ForgotPasswordScreen = () => {
  const [identifier, setIdentifier] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = () => {
    const isValidEmail = identifier.includes('@');
    const isValidPhone = identifier.startsWith('+') && identifier.length >= 10;
    
    if (isValidEmail || isValidPhone) {
      Alert.alert(
        'Reset Link Sent',
        'If an account exists with this email/phone, you will receive a password reset link.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert('Error', 'Please enter a valid email or phone number');
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-gray-900">
      <StyledView className="flex-1 p-6">
        <StyledView className="flex-1 justify-center">
          <StyledView className="mb-8">
            <StyledTextInput
              className="bg-gray-800 text-white p-4 rounded-lg mb-6"
              placeholder="Email or Phone"
              placeholderTextColor="#9CA3AF"
              value={identifier}
              onChangeText={setIdentifier}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <StyledTouchableOpacity
              className="bg-red-600 p-4 rounded-lg"
              onPress={handleResetPassword}
            >
              <StyledView className="items-center">
                <StyledText className="text-white font-bold text-lg">Reset Password</StyledText>
              </StyledView>
            </StyledTouchableOpacity>
          </StyledView>
          
          <StyledTouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <StyledView className="items-center">
              <StyledText className="text-gray-400">Back to Login</StyledText>
            </StyledView>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default ForgotPasswordScreen; 