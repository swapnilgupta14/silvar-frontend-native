module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['nativewind/babel', { mode: 'compileOnly' }],
    'react-native-reanimated/plugin',
  ],
};
