import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function LoadingScreen() {
  return (
    <View className="flex-1 bg-black/90 items-center justify-center">
      <View className="w-64 h-64">
        <LottieView
          source={require("../../assets/lottie/ticket.json")}
          autoPlay
          loop
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
}
