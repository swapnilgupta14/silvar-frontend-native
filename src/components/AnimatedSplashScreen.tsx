// src/components/AnimatedSplashScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';

type AnimatedSplashScreenProps = {
  children: React.ReactNode;
};

const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // Fade out animation duration
        useNativeDriver: true,
      }).start(() => {
        setIsAppReady(true);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  if (isAppReady) {
    return <>{children}</>;
  }

  return (
    <Animated.View 
      style={{ 
        opacity: fadeAnim,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff' 
      }}
    >
      <Text className="text-4xl font-bold text-cyan-600">Your App Name</Text>
      <Text className="text-gray-500 mt-2">Loading...</Text>
    </Animated.View>
  );
};

export default AnimatedSplashScreen;