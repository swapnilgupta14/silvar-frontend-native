import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen 
        name="signup" 
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
} 