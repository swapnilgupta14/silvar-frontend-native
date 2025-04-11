import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Eye,
  EyeOff,
  Phone,
  Lock,
  User,
  Mail,
  Check,
} from "lucide-react-native";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <View className="flex-1 bg-black">
      <View className="h-[30%] items-center py-6 flex justify-center">
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
              <Phone size={20} color="gray" />
            </View>
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Phone Number"
              placeholderTextColor="#9CA3AF"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
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
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="mr-2"
              disabled={password.length === 0}
            >
              {showPassword ? (
                <Eye size={20} color="gray" />
              ) : (
                <EyeOff size={20} color="gray" />
              )}
            </Pressable>
          </View>

          <TouchableOpacity
            className="flex-row items-center my-2"
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View
              className={`w-5 h-5 rounded border mr-2 items-center justify-center ${
                agreeToTerms ? "bg-black border-black" : "border-gray-400"
              }`}
            >
              {agreeToTerms && (
                <Check size={12} color="white" strokeWidth={3} />
              )}
            </View>
            <Text className="text-gray-600 flex-1 text-sm">
              I agree to the{" "}
              <Text className="text-black font-semibold underline">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="text-black font-semibold underline">
                Privacy Policy
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-black mt-6 rounded-full p-4 shadow-sm">
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
          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text className="text-black font-semibold underline">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
