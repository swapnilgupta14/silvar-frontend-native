import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

const SplashScreen = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledView className="flex-1 items-center justify-center bg-gray-900">
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}>
        <StyledView className="w-32 h-32 bg-red-600 rounded-2xl items-center justify-center">
          <StyledView className="w-24 h-24 bg-white rounded-xl items-center justify-center">
            <StyledView className="w-16 h-16 bg-red-600 rounded-lg" />
          </StyledView>
        </StyledView>
      </Animated.View>
    </StyledView>
  );
};

export default SplashScreen; 