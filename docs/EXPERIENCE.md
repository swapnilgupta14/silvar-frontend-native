# React Native Development Guidelines

## Recommended Packages

### Core Dependencies

- `@shopify/flash-list` - Optimized, smooth lists (better than FlatList)
- `react-native-fast-image` - Fast, cached image rendering
- `react-native-haptic-feedback` - Native vibration / feedback
- `moti` - Easy animation wrapper for Reanimated

### Optional Dependencies

- `react-native-config` - Environment variables + font fallbacks
- `expo-blur` or `react-native-blurhash` - Blur/image placeholders

## Performance & UX Optimizations

### Engine Configuration

- Enable Hermes Engine for faster JS execution & lower memory
  ```gradle
  // android/app/build.gradle
  enableHermes: true
  ```

### Android Optimizations

- Enable GPU rasterization in AndroidManifest.xml:
  ```xml
  android:hardwareAccelerated="true"
  android:largeHeap="true"
  ```

### List Rendering

- Use FlashList with estimatedItemSize
- Implement useCallback and useMemo to prevent re-renders in list items

## UI Polish & Animations

### Haptic Feedback

- Add subtle haptics using react-native-haptic-feedback

### Image Handling

- Use react-native-fast-image with fade-in for posters/profile images

### Animations with Reanimated & Moti

- Button presses (scale/opacity on press)
- List item mount-in (fade + slide up)
- Modal open/close (slide + fade)
- XP/Badge pop-ups (bounce/scale)
- Tab transitions

### Navigation

```tsx
<Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}} />
```

## Smart UI Practices

- Avoid nesting too many views → use bg-black directly on parent
- Avoid overusing Context → prefer Zustand/Jotai for global state
- Lazy-load routes/screens → load only when needed

## Pro Tips

- Use react-native-screens + react-native-safe-area-context correctly
- Enable Proguard for Android release to shrink build size
- Test on low-end Android devices/emulators for real-world performance
