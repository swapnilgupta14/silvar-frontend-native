import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Link from "expo-router/link";

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push("/notification");
  };

  const str = ["Category 1", "Category 2", "Category 3", "Category 4"];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="p-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-off-white text-2xl font-bright">
              {user ? `Hello, ${user?.username}!` : "Welcome"}
            </Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={handleNotificationPress}
                className="bg-secondary-bg p-3 rounded-full"
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#EEEEEE"
                />
              </TouchableOpacity>
              <Link
                href={(user ? "/(tabs)/profile" : "/login") as any}
                asChild
              >
                <TouchableOpacity className="bg-secondary-bg p-3 rounded-full">
                  <Ionicons name="person-outline" size={24} color="#EEEEEE" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>

        {/* Featured Section */}
        <View className="pt-2 px-4">
          <Text className="text-xl font-bright text-off-white mb-4">
            Featured
          </Text>
          <View className="bg-secondary-bg rounded-xl overflow-hidden">
            <Image
              source={{ uri: "https://picsum.photos/400/200" }}
              className="w-full h-48"
            />
            <View className="p-4">
              <Text className="text-lg font-bright text-off-white">
                Featured Item
              </Text>
              <Text className="text-accent mt-2">
                Discover amazing features and benefits
              </Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View className="p-4">
          <Text className="text-xl font-bright text-off-white mb-4">
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {str.map((category, index) => (
              <TouchableOpacity
                key={index + category}
                  className="bg-secondary-bg rounded-lg p-4 mr-4 w-32 items-center"
                >
                  <Ionicons name="grid-outline" size={24} color="#76ABAE" />
                  <Text className="text-off-white mt-2 text-center">
                    {category}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>

        <View className="p-4">
          <Text className="text-xl font-bright text-off-white mb-4">
            Recent Items
          </Text>
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              className="bg-secondary-bg rounded-lg p-4 mb-4 flex-row items-center"
            >
              <View className="w-16 h-16 bg-accent rounded-lg mr-4" />
              <View className="flex-1">
                <Text className="text-off-white font-bright">Item {item}</Text>
                <Text className="text-accent mt-1">
                  Description of item {item}
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={24} color="#76ABAE" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
