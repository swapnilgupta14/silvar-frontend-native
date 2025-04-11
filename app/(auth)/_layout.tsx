import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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