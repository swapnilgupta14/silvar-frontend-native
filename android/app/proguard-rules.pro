# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in the Android SDK's proguard-android-optimize.txt file.

# Keep React Native and Expo Router classes
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class expo.modules.** { *; }
-keep class expo.router.** { *; }

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep Parcelables
-keepclassmembers class * implements android.os.Parcelable {
    static ** CREATOR;
}

# Keep custom exceptions
-keepclassmembers class * extends java.lang.Exception {
    <fields>;
}

# Keep AsyncStorage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# Keep Hermes
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep Expo Router
-keep class expo.router.** { *; }
-keep class expo.modules.router.** { *; }

# Keep React Navigation
-keep class com.reactnavigation.** { *; }
-keep class com.swmansion.** { *; }

# Keep React Native Reanimated
-keep class com.swmansion.reanimated.** { *; }

# Keep React Native Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }

# Keep React Native Screens
-keep class com.swmansion.rnscreens.** { *; }

# Keep React Native Safe Area Context
-keep class com.th3rdwave.safeareacontext.** { *; }

# Add any project specific keep options here:
