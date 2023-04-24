module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'standard'],
  plugins: ['import', 'vue'],
  rules: {
    'import/extensions': 0,
    'no-new': 0,
    'no-throw-literal': 0,
    'no-param-reassign': 0,
    'generator-star-spacing': 0,
    'no-tabs': 0,
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    semi: [2, 'never'],
    'space-before-function-paren': 0,
    'object-curly-spacing': 0,
    'vue/require-prop-types': 0,
    "vue/max-attributes-per-line": ["error", {
      "singleline": 3,
      "multiline": {
        "max": 3,
        "allowFirstLine": true
      }
    }]
  },
  globals: {
    Tiger: 'readonly',
    FC: "readonly",
    PREFIX: "readonly"
  }
}
