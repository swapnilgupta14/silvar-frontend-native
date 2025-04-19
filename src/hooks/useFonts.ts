import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useFonts(): boolean {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'RedRose-Regular': require('../../assets/fonts/branding.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
