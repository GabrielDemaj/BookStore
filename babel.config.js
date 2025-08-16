module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@icons': './src/icons',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@providers': './src/providers',
          '@screens': './src/screens',
          '@store': './src/store',
          '@utils': './src/utils',
          '@variables': './src/variables',
        },
      },
    ],
  ],
};
