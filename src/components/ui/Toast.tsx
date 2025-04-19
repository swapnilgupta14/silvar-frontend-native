import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming,
  Easing,
  runOnJS,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

interface ToastProps {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onHide?: () => void;
  image?: {
    type: 'icon' | 'image' | 'lottie';
    source: any;
  };
}

const Toast: React.FC<ToastProps> = ({ 
  title,
  description,
  type = 'info',
  duration = 3000,
  onHide,
  image
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-100);
  const translateX = useSharedValue(0);
  const currentY = useSharedValue(0);

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return '#22C55E';
      case 'error':
        return '#EF4444';
      default:
        return '#3B82F6';
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > 100) {
        translateX.value = withTiming(event.translationX > 0 ? 500 : -500, {
          duration: 100,
          easing: Easing.out(Easing.ease)
        });
        opacity.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(-100, { 
          duration: 200,
          easing: Easing.in(Easing.ease)
        });
        if (onHide) {
          runOnJS(onHide)();
        }
      } else {
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 100,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        {
          scale: interpolate(
            translateX.value,
            [-200, 0, 200],
            [0.8, 1, 0.8],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  useEffect(() => {
    // Show toast with smoother animation
    opacity.value = withTiming(1, { 
      duration: 500,
      easing: Easing.out(Easing.ease)
    });
    translateY.value = withSpring(10, {
      damping: 20,
      stiffness: 90,
      mass: 0.5
    }, (finished) => {
      if (finished) {
        currentY.value = translateY.value;
      }
    });

    // Hide toast after duration with smoother animation
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { 
        duration: 500,
        easing: Easing.in(Easing.ease)
      });
      translateY.value = withTiming(-100, { 
        duration: 500,
        easing: Easing.in(Easing.ease)
      });
      if (onHide) {
        runOnJS(onHide)();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const renderImage = () => {
    if (!image) return null;

    switch (image.type) {
      case 'icon':
        return (
          <View className="w-12 h-12 items-center justify-center">
            <Ionicons name={image.source} size={24} color={getIconColor()} />
          </View>
        );
      case 'image':
        return (
          <Image
            source={image.source}
            className="w-10 h-10 rounded-full"
            resizeMode="cover"
          />
        );
      case 'lottie':
        return (
          <View className="w-10 h-10">
            <LottieView
              source={image.source}
              autoPlay
              loop
              style={{ width: 40, height: 40 }}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View 
        style={[
          styles.container,
          animatedStyle,
        ]}
        className="bg-white p-4 rounded-xl shadow-lg flex-row items-center"
      >
        {renderImage()}
        <View className={`flex-1 ${image ? 'ml-3' : ''}`}>
          <Text className="text-gray-900 font-semibold text-lg">{title}</Text>
          {description && (
            <Text className="text-gray-600 text-sm mt-1">{description}</Text>
          )}
        </View>
        <TouchableOpacity 
          onPress={() => {
            opacity.value = withTiming(0, { 
              duration: 500,
              easing: Easing.in(Easing.ease)
            });
            translateY.value = withTiming(-100, { 
              duration: 500,
              easing: Easing.in(Easing.ease)
            });
            if (onHide) {
              runOnJS(onHide)();
            }
          }}
          className="ml-2"
        >
          <Ionicons name="close" size={20} color="#6B7280" />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    zIndex: 1000,
    elevation: 5,
  },
});

export default Toast; 