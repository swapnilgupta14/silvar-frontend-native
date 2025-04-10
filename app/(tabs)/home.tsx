import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Link from "expo-router/link";
import { useAuth } from "@/src/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="p-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-white-smoke text-xl font-semibold mt-2">
              {user ? `Hello, ${user?.username}!` : "Sign in to access your profile"}
            </Text>
            <Link
              href={(user ? "/(tabs)/profile" : "/(auth)/login") as any}
              asChild
            >
              <TouchableOpacity className="bg-soft-slate-gray p-2 rounded-full">
                <Ionicons name="person-outline" size={24} color="#E5E7EB" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Featured Section */}
        <View className="pt-2 px-4">
          <Text className="text-xl font-semibold text-white-smoke mb-4">
            Featured
          </Text>
          <View className="bg-accent rounded-xl shadow-sm overflow-hidden">
            <Image
              source={{ uri: "https://picsum.photos/400/200" }}
              className="w-full h-48"
            />
            <View className="p-4">
              <Text className="text-lg font-semibold text-white-smoke">
                Featured Item
              </Text>
              <Text className="text-silver-mist mt-2">
                Discover amazing features and benefits
              </Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View className="p-4">
          <Text className="text-xl font-semibold text-white-smoke mb-4">
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["Category 1", "Category 2", "Category 3", "Category 4"].map(
              (category, index) => (
                <TouchableOpacity
                  key={index + category}
                  className="bg-accent rounded-lg p-4 mr-4 shadow-sm"
                >
                  <Ionicons name="grid-outline" size={24} color="#E5E7EB" />
                  <Text className="text-white-smoke mt-2">{category}</Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>

        {/* Recent Items */}
        <View className="p-4">
          <Text className="text-xl font-semibold text-white-smoke mb-4">
            Recent Items
          </Text>
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              className="bg-accent rounded-lg p-4 mb-4 shadow-sm flex-row items-center"
            >
              <View className="w-16 h-16 bg-soft-slate-gray rounded-lg mr-4" />
              <View className="flex-1">
                <Text className="text-white-smoke font-medium">
                  Item {item}
                </Text>
                <Text className="text-silver-mist mt-1">
                  Description of item {item}
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={24} color="#E5E7EB" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
