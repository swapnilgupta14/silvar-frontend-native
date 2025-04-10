// src/components/AnimatedSplashScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { useAuth } from '../context/AuthContext';

type AnimatedSplashScreenProps = {
  children: React.ReactNode;
};

const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const { isLoading } = useAuth();
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    if (!isLoading) {
      // Once auth is ready, trigger fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setIsAppReady(true);
      });
    }
  }, [isLoading]);

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