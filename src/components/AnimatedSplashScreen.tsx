// src/components/AnimatedSplashScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Platform } from 'react-native';

type AnimatedSplashScreenProps = {
  children: React.ReactNode;
};

const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isAppReady, setIsAppReady] = React.useState(false);

  useEffect(() => {
    // Use native driver for better performance
    const animation = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: Platform.OS === 'ios' ? 300 : 400, // Slightly longer on Android
      useNativeDriver: true,
      isInteraction: false, // Mark as non-interactive for better performance
    });

    // Start animation in the next frame to ensure smooth start
    requestAnimationFrame(() => {
      animation.start(({ finished }) => {
        if (finished) {
          setIsAppReady(true);
        }
      });
    });

    return () => {
      animation.stop();
    };
  }, []);

  // Use simple conditional rendering instead of fragment
  if (isAppReady) {
    return children;
  }

  return (
    <Animated.View 
      style={{ 
        opacity: fadeAnim,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999
      }}
      pointerEvents="none" // Prevent touch events during animation
    >
      <View style={{ transform: [{ scale: 1 }] }}>
        <Text 
          style={{ 
            fontSize: 32,
            fontWeight: 'bold',
            color: '#60A5FA',
            textAlign: 'center'
          }}
        >
          Your App Name
        </Text>
        <Text 
          style={{ 
            color: '#9CA3AF',
            marginTop: 8,
            textAlign: 'center'
          }}
        >
          Loading...
        </Text>
      </View>
    </Animated.View>
  );
};

export default React.memo(AnimatedSplashScreen);