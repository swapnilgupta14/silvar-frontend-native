import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Eye, EyeOff, Lock, Phone } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { signIn, isLoading: isAuthLoading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (isSubmitting || isAuthLoading) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await signIn(phoneNumber, password);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || isAuthLoading;

  return (
    <View className="flex-1 bg-black">
      <View className="items-center h-[44%] flex justify-center pb-10">
        <View className="w-32 h-32 bg-[#2C2C2C] rounded-full items-center justify-center shadow-lg">
          <Text className="text-white text-3xl font-bold">DEI</Text>
        </View>
      </View>

      <View className="flex-1 bg-white rounded-t-[42px] px-6">
        <View className="my-8">
          <Text className="text-2xl font-bold text-center text-gray-800">
            Lets get you logged in
          </Text>
        </View>

        {error && (
          <View className="bg-red-50 p-3 rounded-lg mb-4">
            <Text className="text-red-600 text-center">{error}</Text>
          </View>
        )}

        <View className="space-y-3">
          <View className="bg-gray-100 rounded-2xl p-2 flex-row items-center border border-gray-200 mb-4">
            <View className="bg-white/80 p-2 rounded-xl mr-3">
              <Phone size={20} color="gray" />
            </View>
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Enter your phone number"
              placeholderTextColor="#9CA3AF"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              editable={!isLoading}
            />
          </View>

          <View className="bg-gray-100 rounded-2xl p-2 flex-row items-center border border-gray-200">
            <View className="bg-white/80 p-2 rounded-xl mr-3">
              <Lock size={20} color="gray" />
            </View>
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="mr-2"
              disabled={isLoading}
            >
              {showPassword ? (
                <Eye size={20} color="gray" />
              ) : (
                <EyeOff size={20} color="gray" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/auth?type=forgot-password")}
          className="mt-4"
          disabled={isLoading}
        >
          <Text className="text-right text-gray-600 font-normal">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`mt-6 rounded-full p-4 shadow-sm ${
            isLoading ? "bg-gray-400" : "bg-black"
          }`}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">
              Sign In
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="text-gray-400 mx-4 text-sm">OR</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center bg-gray-100 p-4 rounded-full border border-gray-200"
          disabled={isLoading}
        >
          <Text className="text-gray-700 font-medium">
            Continue with Google
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth?type=signup")}
            disabled={isLoading}
          >
            <Text className="text-black underline font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
