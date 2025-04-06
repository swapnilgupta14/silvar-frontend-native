#!/bin/bash

# Clean previous builds
rm -rf android/app/build
rm -rf android/.gradle

# Install dependencies
npm install

# Prebuild the app
npx expo prebuild

# Build Android
cd android
./gradlew assembleRelease

# Move APK to root directory
mv app/build/outputs/apk/release/app-release.apk ../app-release.apk

echo "Build complete! APK is available at app-release.apk" 