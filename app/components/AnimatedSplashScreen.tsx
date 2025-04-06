import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useFonts } from 'expo-font';

const AnimatedSplashScreen: React.FC = () => {
  const letterSpacing = useRef(new Animated.Value(1)).current;
  const textGlow = useRef(new Animated.Value(0)).current;
  const backgroundGlow = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  const appName = "SILVAR";
  const letters = appName.split('');

  const letterAnimations = useRef(
    letters.map(() => ({
      opacity: new Animated.Value(0),
    }))
  ).current;

  const [fontsLoaded] = useFonts({
    'BrightDemo': require('../../assets/fonts/Bright DEMO.otf'),
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    Animated.sequence([
      Animated.timing(letterSpacing, {
        toValue: 2,
        duration: 600,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(textGlow, {
            toValue: 20,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(backgroundGlow, {
            toValue: 0.3,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),
        Animated.parallel([
          Animated.timing(textGlow, {
            toValue: 5,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(backgroundGlow, {
            toValue: 0.1,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),
      ])
    ).start();
  }, [fontsLoaded]);

  useEffect(() => {
    if (!fontsLoaded) return;

    setTimeout(() => {
      const letterAnimationSequences: Animated.CompositeAnimation[] = letters.map((_, index) => 
        Animated.timing(letterAnimations[index].opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      );

      Animated.sequence([
        Animated.parallel(letterAnimationSequences),
        Animated.delay(1000),
        Animated.timing(fadeOut, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
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
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          opacity: backgroundGlow,
        }}
      />
      <View className="flex-row items-center justify-center">
        {letters.map((letter, index) => (
          <Animated.View
            key={index + letter}
            style={{
              opacity: Animated.multiply(letterAnimations[index].opacity, fadeOut),
            }}
          >
            <Animated.Text
              className="text-white text-8xl font-bright"
              style={{
                fontFamily: 'BrightDemo',
                textShadowColor: 'rgba(255, 255, 255, 0.8)',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: textGlow,
                marginHorizontal: letterSpacing,
              }}
            >
              {letter}
            </Animated.Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

export default AnimatedSplashScreen;