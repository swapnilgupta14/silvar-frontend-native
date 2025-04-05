import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();
const StyledSafeAreaProvider = styled(SafeAreaProvider);

function App(): React.JSX.Element {
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  return (
    <StyledSafeAreaProvider>
      <NavigationContainer>
        {!isSplashComplete ? (
          <SplashScreen onAnimationComplete={() => setIsSplashComplete(true)} />
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#111827' },
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </StyledSafeAreaProvider>
  );
}

export default App;
