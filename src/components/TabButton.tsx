import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useRouter } from "expo-router";

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

export const TabButton = ({
  user,
  route,
  ...props
}: { user: any; route: TabRoute } & Omit<
  ProtectedTabButtonProps,
  "user" | "onPress"
>) => {
  const router = useRouter();

  const handlePress = () => {
    if (user) {
      router.push(`/(tabs)/${route}` as any);
    } else {
      router.push("/login");
    }
  };

  return <ProtectedTabButton {...props} user={user} onPress={handlePress} />;
};
