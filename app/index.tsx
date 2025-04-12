import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';

export default function Index() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  // Always redirect to home screen (public route)
  return <Redirect href="/(tabs)/home" />;
}