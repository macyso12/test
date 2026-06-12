import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      complexity: ['error', 10]
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        IntersectionObserver: 'readonly',
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly'
      }
    }
  },
  {
    ignores: ['node_modules/', 'dist/', 'coverage/', '*.min.js']
  }
]
