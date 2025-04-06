import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useFonts } from 'expo-font';

const AnimatedSplashScreen: React.FC = () => {
  const letterSpacing = useRef(new Animated.Value(1)).current;
  const textGlow = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  const appName = "SILVAR";
  const letters = appName.split('');

  const letterAnimations = useRef(
    letters.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(-20)
    }))
  ).current;

  const [fontsLoaded] = useFonts({
    'BrightDemo': require('../../assets/fonts/Bright DEMO.otf'),
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    Animated.sequence([
      Animated.timing(letterSpacing, {
        toValue: 3,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(textGlow, {
            toValue: 8,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(textGlow, {
            toValue: 2,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),
        { iterations: -1 }
      ),
    ]).start();

    setTimeout(() => {
      const letterAnimationSequences: Animated.CompositeAnimation[] = letters.map((_, index) => 
        Animated.parallel([
          Animated.timing(letterAnimations[index].opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(letterAnimations[index].translateY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );

      Animated.sequence([
        Animated.parallel(letterAnimationSequences),
        Animated.delay(2000),
        Animated.parallel([
          Animated.timing(fadeOut, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(textGlow, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(letterSpacing, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    }, 100);

  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View className="flex-1 bg-black" />;
  }

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Animated.View 
        style={{
          opacity: fadeOut,
        }}
      >
        <View className="flex-row items-center justify-center">
          {letters.map((letter, index) => (
            <Animated.View
              key={index + letter}
              style={[
                {
                  opacity: letterAnimations[index].opacity,
                  transform: [
                    { translateY: letterAnimations[index].translateY }
                  ],
                }
              ]}
            >
              <Animated.Text
                className="text-white text-8xl font-bright shadow-white shadow-lg"
                style={[
                  {
                    fontFamily: 'BrightDemo',
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: textGlow,
                    marginHorizontal: letterSpacing,
                  }
                ]}
              >
                {letter}
              </Animated.Text>
            </Animated.View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

export default AnimatedSplashScreen;