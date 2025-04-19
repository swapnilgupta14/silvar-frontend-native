import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Home, Compass, Search, Users, User } from "lucide-react-native";
import { StatusBar } from 'expo-status-bar';


export default function TabsLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#05422C",
          tabBarInactiveTintColor: "#888888",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            borderTopColor: "transparent",
            elevation: 8,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            height: 66,
            paddingBottom: 6,
            paddingTop: 3,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: "hidden",
            marginTop: -20,
          },
          headerShown: false,
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Home size={22} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <Compass size={22} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  backgroundColor: focused ? "#E0EBE3" : "#05422C",
                  padding: 10,
                  borderRadius: 50,
                  marginTop: 14,
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
              >
                <Search size={24} color={focused ? "#05422C" : "white"} strokeWidth={3} />
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: "Community",
            tabBarIcon: ({ color }) => (
              <Users size={22} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <User size={22} color={color} strokeWidth={3} />
            ),
          }}
        />
      </Tabs>
    </>

  );
}
