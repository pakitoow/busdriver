// https://docs.expo.dev/guides/using-eslint/
const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  globalIgnores(['dist/*', '.expo/*', 'ios/*', 'android/*']),
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      // Screens must use the shared <Text> from @/components/ui (fonts + colors)
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-native',
              importNames: ['Text'],
              message: "Use { Text } from '@/components/ui' instead.",
            },
          ],
          patterns: [
            {
              group: ['**/services/mock-data'],
              message: "Import data through '@/services/api', not mock-data directly.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/ui/text.tsx', 'src/services/api.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },
]);
