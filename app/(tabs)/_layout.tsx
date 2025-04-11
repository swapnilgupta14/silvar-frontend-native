import React from "react";
import { useAuth } from "@/src/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Tabs, useRouter } from "expo-router";

interface ProtectedTabButtonProps
  extends Omit<
    TouchableOpacityProps,
    | "delayLongPress"
    | "disabled"
    | "onBlur"
    | "onFocus"
    | "onLongPress"
    | "onPressIn"
    | "onPressOut"
    | "style"
  > {
  user: any;
  onPress: () => void;
}

const ProtectedTabButton = ({
  user,
  onPress,
  ...props
}: ProtectedTabButtonProps) => (
  <TouchableOpacity {...props} onPress={onPress} />
);

type TabRoute = "community" | "profile";

const TabButton = ({ user, route, ...props }: { user: any; route: TabRoute } & Omit<ProtectedTabButtonProps, 'user' | 'onPress'>) => {
  const router = useRouter();
  
  const handlePress = () => {
    if (user) {
      router.push(`/(tabs)/${route}` as any);
    } else {
      alert("Please sign in to access this feature");
      router.push("/(auth)/login" as any);
    }
  };

  return <ProtectedTabButton {...props} user={user} onPress={handlePress} />;
};

export default function TabsLayout() {
  const { user } = useAuth();

  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: "#F0BB78",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0,
          height: 64,
          paddingBottom: 6,
          paddingTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="compass" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="users" size={24} color={color} />
          ),
          tabBarButton: (props) => (
            <TabButton {...props} user={user} route="community" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
          tabBarButton: (props) => (
            <TabButton {...props} user={user} route="profile" />
          ),
        }}
      />
    </Tabs>
  );
}
