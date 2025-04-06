import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import Link from 'expo-router/link';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center p-4">
        <Text className="text-xl text-white-smoke mb-4">Please sign in to view your profile</Text>
        <Link href="/auth/login" asChild>
          <TouchableOpacity className="bg-deep-maroon py-3 px-6 rounded-lg">
            <Text className="text-white-smoke font-semibold">Sign In</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    );
  }

  const gridItems = [
    {
      id: 'profile',
      size: 'large',
      icon: 'person' as const,
      label: 'Profile',
      color: 'bg-deep-maroon',
      borderColor: 'border-deep-maroon',
    },
    {
      id: 'security',
      size: 'small',
      icon: 'shield-checkmark' as const,
      label: 'Security',
      color: 'bg-soft-slate-gray',
      borderColor: 'border-soft-slate-gray',
    },
    {
      id: 'notifications',
      size: 'small',
      icon: 'notifications' as const,
      label: 'Notifications',
      color: 'bg-soft-slate-gray',
      borderColor: 'border-soft-slate-gray',
    },
    {
      id: 'preferences',
      size: 'large',
      icon: 'settings' as const,
      label: 'Preferences',
      color: 'bg-soft-slate-gray',
      borderColor: 'border-soft-slate-gray',
    },
    {
      id: 'help',
      size: 'small',
      icon: 'help-circle' as const,
      label: 'Help Center',
      color: 'bg-soft-slate-gray',
      borderColor: 'border-soft-slate-gray',
    },
    {
      id: 'privacy',
      size: 'small',
      icon: 'document-text' as const,
      label: 'Privacy',
      color: 'bg-soft-slate-gray',
      borderColor: 'border-soft-slate-gray',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="p-4 border-b border-soft-slate-gray">
          <View className="items-center">
            <View className="w-24 h-24 rounded-full items-center justify-center mb-4 border-2 border-deep-maroon">
              <Ionicons name="person" size={48} color="#E5E7EB" />
            </View>
            <Text className="text-2xl font-bold text-white-smoke">{user.name}</Text>
            <Text className="text-silver-mist mt-1">{user.email}</Text>
          </View>
        </View>

        {/* Bento Grid Layout */}
        <View className="p-4">
          <View className="flex-row flex-wrap -mx-2">
            {gridItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className={`w-1/2 px-2 mb-4 ${item.size === 'large' ? 'h-40' : 'h-32'}`}
              >
                <View
                  className={`${item.color} rounded-xl p-4 items-center justify-center border border-soft-slate-gray/20`}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <View className="w-12 h-12 rounded-full bg-background/20 items-center justify-center mb-2">
                    <Ionicons name={item.icon} size={24} color="#E5E7EB" />
                  </View>
                  <Text className="text-white-smoke text-center font-medium">
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="mx-4 my-8 bg-deep-maroon py-3 rounded-lg border border-deep-maroon/20"
          onPress={handleLogout}
        >
          <Text className="text-white-smoke text-center font-semibold">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
} 