import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Eye, EyeOff, Lock, User, Mail } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setError(null);
    try {
      await signUp(email, password, fullName);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to sign up");
    }
  };

  return (
    <View className="flex-1 bg-black">
      <View className="h-[42%] items-center py-6 flex justify-center">
        <View className="w-32 h-32 bg-[#2C2C2C] rounded-full items-center justify-center shadow-lg">
          <Text className="text-white text-3xl font-bold">DEI</Text>
        </View>
      </View>

      <View className="flex-1 bg-white rounded-t-[42px] p-6">
        <View className="pb-6">
          <Text className="text-2xl font-bold text-center text-gray-800">
            Create your account
          </Text>
        </View>

        {error && (
          <View className="bg-red-50 p-3 rounded-lg mb-4">
            <Text className="text-red-600 text-center">{error}</Text>
          </View>
        )}

        <View className="flex flex-col gap-4">
          <View className="bg-gray-100 rounded-2xl p-2 flex-row items-center border border-gray-200">
            <View className="bg-white/80 p-2 rounded-xl mr-3">
              <User size={20} color="gray" />
            </View>
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <View className="bg-gray-100 rounded-2xl p-2 flex-row items-center border border-gray-200">
            <View className="bg-white/80 p-2 rounded-xl mr-3">
              <Mail size={20} color="gray" />
            </View>
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Email Address"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="bg-gray-100 rounded-2xl p-2 flex-row items-center border border-gray-200">
            <View className="bg-white/80 p-2 rounded-xl mr-3">
              <Lock size={20} color="gray" />
            </View>
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Create Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="mr-2"
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
          className="bg-black mt-6 rounded-full p-4 shadow-sm"
          onPress={handleSignUp}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Create Account
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="text-gray-400 mx-4 text-sm">OR</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        <TouchableOpacity className="flex-row items-center justify-center bg-gray-100 p-4 rounded-2xl border border-gray-200">
          <Text className="text-gray-700 font-medium">
            Continue with Google
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-5">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="text-black font-semibold underline">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
