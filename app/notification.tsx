import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../src/context/AuthContext";

export default function NotificationScreen() {
  const { user } = useAuth();

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Welcome to DEI",
      message: "Your account has been created successfully",
      time: "2 hours ago",
      icon: "checkmark-circle-outline"
    },
    {
      id: 2,
      type: "info",
      title: "New Message",
      message: "You have 3 unread messages",
      time: "5 hours ago",
      icon: "mail-outline"
    },
    {
      id: 3,
      type: "warning",
      title: "Profile Update",
      message: "Please complete your profile information",
      time: "1 day ago",
      icon: "alert-circle-outline"
    },
    {
      id: 4,
      type: "error",
      title: "Connection Error",
      message: "Failed to sync your data",
      time: "2 days ago",
      icon: "close-circle-outline"
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "info":
        return "text-blue-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="p-4 flex-row justify-between items-center">
        <Text className="text-off-white text-2xl font-bright">Notifications</Text>
        <TouchableOpacity className="bg-secondary-bg p-3 rounded-full">
          <Ionicons name="settings-outline" size={24} color="#EEEEEE" />
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            className="bg-secondary-bg mx-4 my-2 p-4 rounded-xl"
          >
            <View className="flex-row items-start">
              <View className={`${getNotificationColor(notification.type)} mr-3`}>
                <Ionicons name={notification.icon as any} size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-off-white font-bright text-lg">
                  {notification.title}
                </Text>
                <Text className="text-gray-400 mt-1">
                  {notification.message}
                </Text>
                <Text className="text-gray-500 text-xs mt-2">
                  {notification.time}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
