import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <View className="flex-1 bg-black">
      {/* Top Logo Section */}
      <View className="h-[64%] items-center pt-12 pb-6 flex justify-center">
        <View className="w-32 h-32 bg-[#2C2C2C] rounded-full items-center justify-center shadow-lg">
          <Text className="text-white text-3xl font-bold">DEI</Text>
        </View>
      </View>

      {/* Bottom Card Section */}
      <View className="flex-1 bg-white rounded-t-[42px] px-6">
        <View className="py-6">
          <Text className="text-2xl font-bold text-center text-gray-800">
            Reset Password
          </Text>
          <Text className="text-sm text-center text-gray-500 mt-2">
            Enter your phone number to receive a reset code
          </Text>
        </View>

        <View className="flex flex-col gap-3">
          <View className="bg-gray-100 rounded-2xl p-2 flex-row items-center border border-gray-200">
            <View className="bg-white/80 p-2 rounded-xl mr-3">
              <Mail size={20} color="gray" />
            </View>
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Reset Button */}
          <TouchableOpacity className="bg-black mt-6 rounded-full p-4 shadow-sm">
            <Text className="text-white text-center font-semibold text-lg">
              Send Reset Code
            </Text>
          </TouchableOpacity>

          {/* Back to Sign In */}
          <View className="flex-row justify-center mt-5">
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text className="text-black font-semibold underline">
                Back to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
